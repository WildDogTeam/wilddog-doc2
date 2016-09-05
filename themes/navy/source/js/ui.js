(function () {
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
  var toc = document.getElementById('article-toc');

  if(getElementsByClassName('toc-item').length < 1) {
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

  sidebarTitle.forEach(function (ele) {
    ele.addEventListener('click', function () {
      toggleClass(ele, 'select');
      if (getSiblings(ele)[0]) {
        toggleClass(getSiblings(ele)[0], 'current');
      }
    })
  })

  var backTop = document.getElementsByClassName('back-top')[0];
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    if (scrollTop >= window.innerHeight) {
      addClass(backTop, 'back-top-show')
    } else {
      removeClass(backTop, 'back-top-show')
    }
  })

  backTop.addEventListener('click', function () {
    window.scrollTo(0, 0);
  })

})();