'use strict';

var pathFn = require('path');
var _ = require('lodash');
var url = require('url');
var cheerio = require('cheerio');
var lunr = require('lunr');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
    return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('page_nav', function() {
    var type = this.page.canonical_path.split('/')[0];
    var sidebar = this.site.data.sidebar[type];
    var path = '/' + this.page.path;
    var list = {};
    var prefix = 'sidebar.' + type + '.';
    for (var i in sidebar) {
        
        for (var j in sidebar[i]) {
            if (typeof sidebar[i][j] === 'string') {
                list[sidebar[i][j]] = j;
            } else {
                for (var k in sidebar[i][j]) {
                    list[sidebar[i][j][k]] = k;
                }
            }
        }
    }
    var keys = Object.keys(list);
    var index = keys.indexOf(path);
    var result = '';

    // console.log(keys)

    if (type != 'sms') {
        if (index > 0) {
            result += '<a href="' + keys[index - 1] + '" class="article-footer-prev" title="' + this.__(list[keys[index - 1]]) + '">' +
                '<img src=\'\/images\/arr-left.svg\' class=\'arr-icon\'><div class=\'page-title\'><div>上一节：</div>' + this.__(list[keys[index - 1]]) + ' </div></a>';
        }

        if (index < keys.length - 1) {
            result += '<a href="' + keys[index + 1] + '" class="article-footer-next" title="' + this.__(list[keys[index + 1]]) + '">' +
                '<div class=\'page-title\'><div class=\'text-right\'>下一节：</div>' + this.__(list[keys[index + 1]]) + '</div><img src=\'\/images\/arr-right.svg\' class=\'arr-icon\'></a>';
        }
    }

    return result;

});
hexo.extend.helper.register('doc_sidebar', function(className) {
    var type = this.page.canonical_path.split('/')[0];
    var sidebar = this.site.data.sidebar[type];
    var path = "/" + this.path
    var result = '<ul class=\'sidebar-nav\'>';
    var self = this;
    var prefix = 'sidebar.' + type + '.';
    var listStart = '';

    //短信和overview 因为sidebar-title部分是下一级,必须显示出来,最外层ul加一个类名
    var Flag = type == 'sms' || type == 'overview' || type == 'console'
    if (Flag) {
        var result = '<ul class=\'sidebar-nav show-title\'>';
    }
    _.each(sidebar, function(menu, title) {
        if (typeof menu === 'object') {
            listStart += '<li class=\'sidebar-nav-item\'><strong class="' + className + '-title">' + title + '</strong>';
            var subList = '<ul class=\'sublist\'>';

            if (title == path.split('/')[2]) {
                listStart = listStart.replace('sidebar-nav-item', 'sidebar-nav-item sidebar-nav-item-show');
            }
            _.each(menu, function(link, text) {
                var itemClass = className + '-link';
                if (link === path) {
                    //大标题 strong 标签加上类名
                    listStart = listStart.replace('-title', '-title select current');
                    //ul 默认的display none
                    subList = subList.replace('sublist', 'sublist current');
                    //当前小标题加上；类名
                    itemClass += ' current';
                }

                //三级
                if (typeof link === 'object') {
                    var thirList = '<ul class=\'sublist\'>';
                    var thirListStart = '<li class=\'sublist-item\'><strong class="' + className + '-title">' + text + '</strong>';
                    _.each(link, function(url, content) {
                        var currentClass = itemClass.replace(' current', '');
                        if (url === path) {
                            listStart = listStart.replace('-title', '-title current select');
                            subList = subList.replace('sublist', 'sublist current');
                            thirListStart = thirListStart.replace('-title', '-title select');
                            thirList = thirList.replace('sublist', 'sublist current');
                            currentClass += ' current';
                        }

                        //第四层级嵌套
                        if (typeof url === 'object') {
                            var fourthList = '<ul class=\'subsublist\'>';
                            var fourthListStart = '<li class=\'sublist-item\'><strong class="' + className + '-title">' + content + '</strong>';
                            _.each(url, function(fourthUrl, fourthContent) {
                                var fourthClass = currentClass.replace(' current', '');
                                if (fourthUrl == path) {
                                    listStart = listStart.replace('-title', '-title current select');
                                    subList = subList.replace('sublist', 'sublist current');
                                    thirListStart = thirListStart.replace('-title', '-title select');
                                    thirList = thirList.replace('sublist', 'sublist current');
                                    fourthListStart = fourthListStart.replace('-title', '-title select');
                                    fourthList = fourthList.replace('subsublist', 'subsublist current');
                                    fourthClass += ' current';
                                }
                                fourthList += '<li class=\'subsublist-item\'><a href="' + fourthUrl + '" class="' + fourthClass + '" title= ' + fourthContent + '><span class="sidebar-link-text">' + (fourthContent) + '</span>' + '</a><\/li>';
                            })
                            fourthList += '<\/ul>';
                            fourthListStart += (fourthList + '<\/li>');
                            thirList += fourthListStart;
                            thirList += '<\/li>';
                        } else {
                            thirList += '<li class=\'sublist-item\'><a href="' + url + '" class="' + currentClass + '" title= ' + content + '><span class="sidebar-link-text">' + (content) + '</span>' + (content === '微信小程序' ? '<img src="/images/new.svg" class="icon-new" width="34" height="15">' : (content === '即时通讯' ? '<img src="/images/preview.svg" class="icon-preview" width="34" height="8">' : (content === '短信' ? '' : ''))) + '</a><\/li>';
                        }
                        //第四层级嵌套结束
                    })

                    thirList += '<\/ul>';
                    thirListStart += (thirList + '<\/li>');
                    subList += thirListStart;
                    subList += '<\/li>';
                } else {
                    subList += '<li class=\'sublist-item\'><a href="' + link + '" class="' + itemClass + '" title= ' + text + '><span class="sidebar-link-text">' + (text) + '</span>' + (text === '微信小程序' ? '<img src="/images/new.svg" class="icon-new" width="34" height="15">' : (text === '即时通讯' ? '<img src="/images/preview.svg" class="icon-preview" width="34" height="8">' : (text === '短信' ? '' : ''))) + '</a>';
                }
            })
            subList += '<\/ul><\/li>'
        } else {
            listStart += '<li class=\'sidebar-nav-item\'><strong class="' + className + '-title single-title"><a href="' + menu + '" class="' + className + '-link' + (menu === path ? ' current' : '') + '" alt= ' + title + '>' + title + '</a></strong><\/li>';
        }
        result += listStart;
        result += subList || '';
        listStart = '';
    });
    result += '<\/ul>'

    if (type !== 'overview' && type !== 'console') {
        result += '<div class=\'console\'><a href=\'/console/creat.html\' class=\'console-link\'>控制面板指南</a></div>'
    }
    return result;

});


hexo.extend.helper.register('doc_platform', function() {
    var type = this.page.canonical_path.split('/')[0];
    var sidebar = this.site.data.sidebar[type];
    var path = "/" + this.path;
    var platformName = path.split('/')[2];
    var result

    if (type == 'sms' || type == 'overview' || type == 'console') {
        result = ''
    } else {
        var sidebarKeys = Object.keys(sidebar);
        result = '<input type=\'hidden\' value=' + sidebarKeys + '>'
        result += '<div class=\'selected\'>' + platformName + '</div>';
        result += '<ul class=\'platforms\'>' + '</ul>'
    }
    return result

});


hexo.extend.helper.register('canonical_url', function(lang) {
    var path = this.page.canonical_path;
    if (lang && lang !== 'en') path = lang + '/' + path;
    return this.config.url + '/' + path;
});

hexo.extend.helper.register('url_for_lang', function(path) {
    var lang = this.page.lang;
    var url = this.url_for(path);
    if (lang !== 'en' && url[0] === '/') url = '/' + lang + url;
    return url;
});

hexo.extend.helper.register('raw_link', function(path) {
    //return 'https://github.com/WildDogTeam/wilddog-doc2/blob/master/source/' + path;
    return 'https://github.com/WildDogTeam/wilddog-doc2/blob/master-tab/source/' + path;
});

hexo.extend.helper.register('page_anchor', function(str) {
    var $ = cheerio.load(str, { decodeEntities: false });
    var headings = $('h1, h2, h3, h4, h5, h6');
    if (!headings.length) return str;
    headings.each(function(index) {
        var id = $(this).attr('id');
        if (index === 0 && !this.prev) {
            $(this).addClass('top-heading')
        }
        $(this).addClass('article-heading')
    });

    return $.html();
});

hexo.extend.helper.register('lunr_index', function(data) {
    var index = lunr(function() {
        this.field('name', { boost: 10 });
        this.field('tags', { boost: 50 });
        this.field('description');
        this.ref('id');
    });

    _.sortBy(data, 'name').forEach(function(item, i) {
        index.add(_.assign({ id: i }, item));
    });

    return JSON.stringify(index.toJSON());
});

hexo.extend.helper.register('canonical_path_for_nav', function() {
    var path = this.page.canonical_path;
    if (startsWith(path, 'docs/') || startsWith(path, 'api/')) {
        return path;
    } else {
        return '';
    }
});

hexo.extend.helper.register('lang_name', function(lang) {
    var data = this.site.data.languages[lang];
    return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function() {
    var lang = this.page.lang;
    var data = this.site.data.languages[lang];
    return data.disqus_lang || lang;
});
