var creatIframe = function(cb) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.wilddog.com/wwwapi/iframe/dociframe';
    iframe.style.opacity = 0;
    iframe.width = 1;
    iframe.height = 1;
    document.body.appendChild(iframe);
    cb();
};

var getClass = function(className) {
    return [].slice.call(document.getElementsByClassName(className))
};

var getSiblings = function(element) {
    var siblings = [].slice.call(element.parentElement.children);
    siblings.splice(siblings.indexOf(element), 1);
    return siblings;
};

var addClass = function(ele, className) {
    if (ele.className.indexOf(className) === -1) {
        ele.className += (' ' + className)
    }
};

var removeClass = function(ele, className) {
    var classCurrent = ele.className;
    var classReplace = classCurrent.replace(' ' + className, '');
    ele.className = classReplace;
};

var toggleClass = function(ele, className) {
    if (ele.className.indexOf(className) === -1) {
        addClass(ele, className)
    } else {
        removeClass(ele, className)
    }
};

function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURIComponent(result[1]);
}

function ajax(options) {
    var xmlreq;
    if (window.ActiveXObject) { //如果是IE浏览器
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) { //非IE浏览器
        xmlreq = new XMLHttpRequest();
    };
    xmlreq.onreadystatechange = function() {
        if (xmlreq.readyState == 4) {
            var res = xmlreq.responseText;
            if (xmlreq.status == 200) {
                options.success(JSON.parse(res), null)
            } else {
                options.failed(xmlreq)
            }
        }
    }
    xmlreq.open(options.type, options.url, true);
    xmlreq.send(options.data)
}

var user;
var currentPath = window.location.href;
getClass('register')[0].setAttribute('href', 'https://www.wilddog.com/my-account/signup?next=' + currentPath);
getClass('register-link')[0].setAttribute('href', 'https://www.wilddog.com/my-account/signup?next=' + currentPath);
getClass('login')[0].setAttribute('href', 'https://www.wilddog.com/my-account/login?next=' + currentPath);
getClass('logout-btn')[0].setAttribute('href', 'https://www.wilddog.com/wwwapi/account/logout?next=' + currentPath);

//是否显示底部注册入口
var novice = getClass('novice');
var showNovice = sessionStorage.getItem('ssn');

novice.forEach(function(ele, index) {
    var close = ele.getElementsByClassName('close-novice')[0];
    close.addEventListener('click', function() {
        ele.style.display = 'none';
        sessionStorage.setItem('ssn', false);
    });
});
//是否显示底部意见反馈
// var feedBack = getClass('feed-back')[0];
// var showFeedBack = sessionStorage.getItem('sfb');
// if (feedBack) {
//     if (showFeedBack == undefined || showFeedBack == true) {
//         feedBack.style.display = 'block';
//     } else {
//         feedBack.style.display = 'none';
//     }
//     /*用户反馈点击关闭*/
//     getClass('close-feed')[0].addEventListener('click', function() {
//         feedBack.style.display = 'none';
//         sessionStorage.setItem('sfb', false);
//     });
// }
//登录信息
var userProfile = getClass('header-user')[0];
var loginTab = getClass('header-info')[0];
creatIframe(function() {
    window.addEventListener('message', function(event) {
        if (event.origin === "https://www.wilddog.com") {
            user = event.data;
            if (showNovice == undefined || showNovice == true) {
                if (user.email && user.avatar) {
                    getClass('novice-register')[0].style.display = 'none';
                    getClass('novice-help')[0].style.display = 'block';
                } else {
                    getClass('novice-register')[0].style.display = 'block';
                    getClass('novice-help')[0].style.display = 'none';
                }
            } else {
                novice.forEach(function(ele) {
                    ele.style.display = 'none';
                });
            }
            if (user.email && user.avatar) {
                getClass('user-email')[0].textContent = user.email;
                getClass('profile-avatar')[0].setAttribute('src', user.avatar);
                loginTab.style.display = 'block';
                userProfile.style.display = 'none';
            } else {
                loginTab.style.display = 'none';
                userProfile.style.display = 'block';

            }
        }
    })
});

//响应式
var nav = $('#main-nav');
var searchbar = $('.searchbar');
var mask = $('.mask');
var flag = false;
var width = $(window).width();
var nav_item = $('.sidebar-nav-item');
var article_inner = $('.article-inner');
var issidebar = location.href.split('/')[3];
var sidebar_item = $('.sidebar-nav');
var sublistheight = sidebar_item.children('li');

media();

$('.menu-ctrl').on('click', function() {
    if (flag) {
        flag = false;
        nav.slideUp(function() {
            searchbar.slideDown();
        });
        $(this).removeClass('menu-ctrl-on');
        mask.addClass('fadeHide');
    } else {
        flag = true;
        $('.close-search').click();
        searchbar.hide();
        nav.slideDown();
        $(this).addClass('menu-ctrl-on');
        mask.removeClass('fadeHide');
    }
});

function media() {
    var width = $(window).width();
    if (width < 767) {
        $('.sublist').removeClass('current');
        //判断是否为短信或概述页面
        // console.log(issidebar)
        if (issidebar == 'overview' || issidebar == 'result') {
            // $('.searchbar').width('100%');
            $('.search-tips').css({
                'borderLeft': 'none',
                'height': 70,
                'border-bottom': 0
            });
            $('.article').css('margin-top', 0)
            $('#sidebar').addClass('issidebar').width(width);

            var overviewheight = sidebar_item.height() + sublistheight.height();
            articlesms();
            if (issidebar == 'overview') {
                $('.sublist').addClass('current');
            } else {

            }
            $('.sidebar-title').each(function(i, v) {
                $(this).eq(i).removeClass('select')
            })
        } else if (issidebar == 'sms') {
            var dv = $('<div class="dv" id="dv">');
            var article = $('.article');
            var colog = $('.console')
            var sublist = $('.sidebar-nav-item').children('.sublist');
            article.prepend(dv).css('margin-top', 0);
            dv.prepend(colog).prepend(sublist).children().show();
            dv.children('.console').width($(window).width());
            $('#sidebar').remove();
            $('.sidebar-title').removeClass('select')
        } else {
            wh();
            articledv();
            $('#sidebar').height(72);
        }
    }
}

//没有平台设备dom操作
function articlesms() {
    var dv = $('<div class="dv">');
    var article = $('.article');
    article.prepend(dv);
    var sublist = $('#sidebar')
    sublist.prependTo(dv);
}
//有平台设备dom操作
function articledv() {
    var dv = $('<div class="dv" id="dv">');
    var article = $('.article');
    var colog = $('.console')
    article.prepend(dv);
    $('.sidebar-nav-item').click(function() {
        window.scrollTo(0, 0);
        var sublist = $(this).children('.sublist.current');
        $(this).children('.sublist.current').hide();
        if (sublist.length == 1) {
            dv.empty().prepend(colog).prepend(sublist).children().show();
            dv.children('.console').width($(window).width());
        } else {
            dv.children().show()
        }
        if (!$('.sidebar-title').hasClass('select')) {
            dv.children().hide()
        }
    }).siblings('.sidebar-nav-item').children('.sublist.current').hide();
}
// 计算滚动宽度
function wh() {
    var num = 0
    for (var i = 0; i < $('.sidebar-nav-item').length; i++) {
        num += $('.sidebar-nav-item').eq(i).width();
    }
    $('.sidebar-nav').eq(0).width($('.sidebar-nav-item').length * 45 + num);
}
// window.onresize = function() {
//     media();
// }

$('.mask').click(function() {
    $('.close-search').click();
});

$('.searchbar-inputting .search-tips').click(function() {
    window.location.href = '/result/index.html?keyword=' + encodeURIComponent(getClass('search-input')[0].value.split('').slice(0, 19).join(''));
})
