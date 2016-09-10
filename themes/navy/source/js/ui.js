window.onload = function () {
	"use strict";

  function getElementsByClassName (className) {
    return [].slice.call(document.getElementsByClassName(className))
  }

	function getSiblings (element) {
    var siblings = [].slice.call(element.parentElement.children);
    siblings.splice(siblings.indexOf(element), 1);
    return siblings;
  }

  function addClass (ele, className) {
    if (ele.className.indexOf(className) === -1) {
      ele.className += (' ' + className)
    }
  }

  function removeClass (ele, className) {
    var classCurrent = ele.className;
    var classReplace = classCurrent.replace(' ' + className, '');
    ele.className = classReplace;
  }

  function toggleClass (ele, className) {
    if (ele.className.indexOf(className) === -1) {
      addClass(ele, className)
    } else {
      removeClass(ele, className)
    }
  }

//右侧目录判断是否显示
  var airticleContent = document.querySelector('.article .inner');
  var toc = getElementsByClassName('toc-content')[0];

  if(getElementsByClassName('toc-item').length < 1 && airticleContent) {
    airticleContent.removeChild(toc)
  }

//  切换头部选中状态
  var type = window.location.pathname.split('/')[1];
  var headerNavs = getElementsByClassName('main-nav-link');
  if (type === 'overview') {
    addClass(headerNavs[0], 'current')
  } else if (type === 'quickstart') {
    addClass(headerNavs[1], 'current')
  } else if (type === 'guide') {
    addClass(headerNavs[2], 'current')
  } else if (type === 'api') {
    addClass(headerNavs[3], 'current')
  } else if (type === 'resources') {
    addClass(headerNavs[4], 'current')
  } else if (type === 'console') {
    addClass(headerNavs[5], 'current')
  }

// 侧边栏收起
  var sidebarTitle = getElementsByClassName('sidebar-title');
  var sidebarItems = getElementsByClassName('sublist-item');

  sidebarTitle.forEach(function (ele) {
    ele.addEventListener('click', function () {
      toggleClass(ele, 'select');
      if (getSiblings(ele)[0]) {
        toggleClass(getSiblings(ele)[0], 'current');
      }
      getSiblings(ele.parentElement).forEach(function (item, itemIndex) {
        [].slice.call(item.getElementsByClassName('sidebar-title')).forEach(function (title) {
          removeClass(title, 'select')
        });
        [].slice.call(item.getElementsByClassName('sublist')).forEach(function (list) {
          removeClass(list, 'current')
        })
      })
    })
  });

//滚屏时右侧边栏根据当前标题高亮对应目录项
  var headings = getElementsByClassName('article-heading');
  var tocLinks = getElementsByClassName('toc-link');
  var tocLinksHref = [];
  var headingTops = [];
  tocLinks.forEach(function (ele, index) {
    var id = ele.getAttribute('href').replace('#', '');
    tocLinksHref.push(id);
  });
  headings.forEach(function (ele) {
    var actualTop = ele.offsetTop;
    var current = ele.offsetParent;
    while (current){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    actualTop -= 102;
    headingTops.push(actualTop);
  });
  var currentRangeStart = 0;
  var currentRangeEnd = headingTops[1];
  var currentIndex = 0;
  
  function getCurrentHeading (top) {
    for (var i = 0; i < headingTops.length; i++) {
      if (top >= headingTops[i] && top <= headingTops[i + 1]) {
        currentRangeStart = headingTops[i];
        currentRangeEnd = headingTops[i + 1];
        currentIndex = i;
        return headings[i]
      }
    }
  };

  function currentLinkSelect (heading) {
    var id = heading ? heading.id : tocLinksHref[0];
    var index = tocLinksHref.indexOf(id);
    if (index !== -1) {
      addClass(tocLinks[index], 'current');
    }
    tocLinks.forEach(function (ele, eleIndex) {
      if (eleIndex === index) return;
      removeClass(ele, 'current')
    })
  };

  var backTop = document.getElementsByClassName('back-top')[0];
  currentLinkSelect(headings[0]);
  function windowScrollHandle () {
    var scrollTop = window.scrollY;
    if (scrollTop >= window.innerHeight) {
      addClass(backTop, 'back-top-show')
    } else {
      removeClass(backTop, 'back-top-show')
    };

    if (scrollTop > currentRangeEnd || scrollTop < currentRangeStart) {
      var currentHeading = getCurrentHeading(scrollTop) || (scrollTop > headingTops[headingTops.length - 1] ? headings[headings.length - 1] : headings[0]);
      currentLinkSelect(currentHeading);
    } else {
      currentLinkSelect(getCurrentHeading(scrollTop))
    }
  };
  windowScrollHandle();
  window.addEventListener('scroll', windowScrollHandle);

  backTop.addEventListener('click', function () {
    window.scrollTo(0, 0);
  });

  var jsVersionContent = getElementsByClassName('js-version');

  if (jsVersionContent.length !== 0) {
    var config = {
      authDomain: "wd-download.wilddog.com",
      syncURL: "https://wd-download.wilddogio.com"
    };

    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();
    ref.child('WilddogJavaScript/version').once('value', function (snap) {
      jsVersionContent.forEach(function (ele) {
        ele.textContent = snap.val();
      })
    })
  }
};