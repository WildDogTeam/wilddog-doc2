'use strict';

var pathFn = require('path');
var _ = require('lodash');
var url = require('url');
var cheerio = require('cheerio');
var lunr = require('lunr');

var localizedPath = ['docs', 'api'];

function startsWith(str, start){
  return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('page_nav', function(){
  var type = this.page.canonical_path.split('/')[0];
  var sidebar = this.site.data.sidebar[type];
  var path = '/' + this.page.path;
  var list = {};
  var prefix = 'sidebar.' + type + '.';
  for (var i in sidebar){
    for (var j in sidebar[i]){
      if (typeof sidebar[i][j] === 'string') {
        list[sidebar[i][j]] = j;
      } else {
        for (var k in sidebar[i][j]){
          list[sidebar[i][j][k]] = k;
        }
      }
    }
  }
  
  var keys = Object.keys(list);
  var index = keys.indexOf(path);
  var result = '';

  if (index > 0){
    result += '<a href="' + keys[index - 1] + '" class="article-footer-prev" title="' + this.__(list[keys[index - 1]]) + '">' +
      '<span class=\'page-title\'><img src=\'\/images\/arr-left.svg\' class=\'arr-icon\'>' + this.__(list[keys[index - 1]]) + ' </span></a>';
  }

  if (index < keys.length - 1){
    result += '<a href="' + keys[index + 1] + '" class="article-footer-next" title="' + this.__(list[keys[index + 1]]) + '">' +
      '<span class=\'page-title\'>' + this.__(list[keys[index + 1]]) + '<img src=\'\/images\/arr-right.svg\' class=\'arr-icon\'></span></a>';
  }

  return result;
});

hexo.extend.helper.register('doc_sidebar', function(className){
  var type = this.page.canonical_path.split('/')[0];
  var sidebar = this.site.data.sidebar[type];
  var path = "/" + this.path;
  var result = '<ul class=\'sidebar-nav\'>';
  var self = this;
  var prefix = 'sidebar.' + type + '.';
  var listStart = '';

  _.each(sidebar, function(menu, title){
    if (typeof menu === 'object') {
      listStart += '<li class=\'sidebar-nav-item\'><strong class="' + className + '-title">' + title + '</strong>';
      var subList = '<ul class=\'sublist\'>';
      _.each(menu, function(link, text){
        var itemClass = className + '-link';
        if (link === path) {
          listStart = listStart.replace('-title', '-title select current');
          subList = subList.replace('sublist', 'sublist current');
          itemClass += ' current';
        }
        if (typeof link === 'object') {
          var thirList = '<ul class=\'sublist\'>';
          var thirListStart = '<li class=\'sublist-item\'><strong class="' + className + '-title">' + text + '</strong>';
          _.each(link, function (url, content) {
            var currentClass = itemClass.replace(' current', '');
            if (url === path) {
              listStart = listStart.replace('-title', '-title current select');
              subList = subList.replace('sublist', 'sublist current');
              thirListStart = thirListStart.replace('-title', '-title select');
              thirList = thirList.replace('sublist', 'sublist current');
              currentClass += ' current';
            }
            thirList += '<li class=\'sublist-item\'><a href="' + url + '" class="' + currentClass + '" title= ' + content + '>' + (content) + (content === '微信小程序' ? '<img src="/images/icon-01.svg">' : '') + '</a><\/li>';
          })
          thirList += '<\/ul>';
          thirListStart += (thirList + '<\/li>');
          subList += thirListStart;
          subList += '<\/li>';
        } else {
          subList += '<li class=\'sublist-item\'><a href="' + link + '" class="' + itemClass + '" title= ' + text + '>' + (text) + (text === '微信小程序' ? '<img src="/images/icon-01.svg">' : '') + '</a>';
        }
      })
      subList += '<\/ul><\/li>'
    } else {
      listStart += '<li class=\'sidebar-nav-item\'><strong class="' + className + '-title single-title"><a href="' + menu + '" class="' + className + '-link' + (menu === path ? ' current' : '') + '" alt= '+ title +'>' + title + '</a></strong><\/li>';
    }
    result += listStart;
    result += subList || '';
    listStart = '';
  });
  result += '<\/ul>'

  return result;
});

hexo.extend.helper.register('canonical_url', function(lang){
  var path = this.page.canonical_path;
  if (lang && lang !== 'en') path = lang + '/' + path;

  return this.config.url + '/' + path;
});

hexo.extend.helper.register('url_for_lang', function(path){
  var lang = this.page.lang;
  var url = this.url_for(path);

  if (lang !== 'en' && url[0] === '/') url = '/' + lang + url;

  return url;
});

hexo.extend.helper.register('raw_link', function(path){
  return 'https://github.com/WildDogTeam/wilddog-doc2/blob/master/source/' + path;
});

hexo.extend.helper.register('page_anchor', function(str){
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function(index){
    var id = $(this).attr('id');
    if (index === 0 && !this.prev) {
      $(this).addClass('top-heading')
    }
    $(this)
      .addClass('article-heading')
  });

  return $.html();
});

hexo.extend.helper.register('lunr_index', function(data){
  var index = lunr(function(){
    this.field('name', {boost: 10});
    this.field('tags', {boost: 50});
    this.field('description');
    this.ref('id');
  });

  _.sortBy(data, 'name').forEach(function(item, i){
    index.add(_.assign({id: i}, item));
  });

  return JSON.stringify(index.toJSON());
});

hexo.extend.helper.register('canonical_path_for_nav', function(){
  var path = this.page.canonical_path;

  if (startsWith(path, 'docs/') || startsWith(path, 'api/')){
    return path;
  } else {
    return '';
  }
});

hexo.extend.helper.register('lang_name', function(lang){
  var data = this.site.data.languages[lang];
  return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function(){
  var lang = this.page.lang;
  var data = this.site.data.languages[lang];

  return data.disqus_lang || lang;
});
