var creatIframe = function(cb) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.wilddog.com/iframe/dociframe';
    iframe.style.opacity = 0;
    iframe.width = 1;
    iframe.height = 1;
    document.body.appendChild(iframe);
    cb();
};

var getClass = function (className) {
  return [].slice.call(document.getElementsByClassName(className))
};

var getSiblings = function (element) {
  var siblings = [].slice.call(element.parentElement.children);
  siblings.splice(siblings.indexOf(element), 1);
  return siblings;
};

var addClass = function (ele, className) {
  if (ele.className.indexOf(className) === -1) {
    ele.className += (' ' + className)
  }
};

var removeClass = function (ele, className) {
  var classCurrent = ele.className;
  var classReplace = classCurrent.replace(' ' + className, '');
  ele.className = classReplace;
};

var toggleClass = function (ele, className) {
  if (ele.className.indexOf(className) === -1) {
    addClass(ele, className)
  } else {
    removeClass(ele, className)
  }
};
var user;

var novice = getClass('novice');
var showNovice = sessionStorage.getItem('ssn');

novice.forEach(function (ele, index) {
  var close = ele.getElementsByClassName('close-novice')[0];
  close.addEventListener('click', function () {
    ele.style.display = 'none';
    sessionStorage.setItem('ssn', false);
  });
});

creatIframe(function () {
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
        novice.forEach(function (ele) {
          ele.style.display = 'none';
        });
      }
      if (user.email && user.avatar) {
        getClass('user-email')[0].textContent = user.email;
        getClass('profile-avatar')[0].setAttribute('src', user.avatar);
        getClass('header-info')[0].style.display = 'block';
        getClass('header-user')[0].style.display = 'none';
      } else {
        getClass('header-info')[0].style.display = 'none';
        getClass('header-user')[0].style.display = 'block';
      }
    }
  })
});
window.onload = function () {
  var currentPath = window.location.href;
  getClass('register')[0].setAttribute('href', 'https://www.wilddog.com/my-account/signup?next=' + currentPath);
  getClass('register-link')[0].setAttribute('href', 'https://www.wilddog.com/my-account/signup?next=' + currentPath);
  getClass('login')[0].setAttribute('href', 'https://www.wilddog.com/my-account/login?next=' + currentPath);
  getClass('logout-btn')[0].setAttribute('href', 'https://www.wilddog.com/account/logout?next=' + currentPath);


//右侧目录判断是否显示
  var airticleContent = document.querySelector('.article .inner');
  var toc = getClass('toc-content')[0];

  if(getClass('toc-item').length < 1 && airticleContent) {
    airticleContent.removeChild(toc)
  }

//  切换头部选中状态
  var type = window.location.pathname.split('/')[1];
  var headerNavs = getClass('main-nav-link');
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
  var sidebarTitle = getClass('sidebar-title');

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
  var headings = getClass('article-heading');
  var tocLinks = getClass('toc-link');
  var tocLinksHref = [];
  var headingTops = [];
  var titleContent = document.getElementsByClassName('toc-link-title')[0];
  tocLinks.forEach(function (ele, index) {
    var id = ele.getAttribute('href').replace('#', '');
    ele.setAttribute('title', ele.textContent);
    tocLinksHref.push(id);
    ele.addEventListener('mouseenter', function (e) {
      var title = ele.getAttribute('title');
      titleContent.textContent = title;
      titleContent.style.display = 'block';
      titleContent.style.left = e.clientX + 'px';
      titleContent.style.top = e.clientY - 40 + 'px';
    });
    ele.addEventListener('mousemove', function (e) {
      titleContent.style.left = e.clientX + 'px';
      titleContent.style.top = e.clientY - 40 + 'px';
    });
    ele.addEventListener('mouseleave', function (e) {
      titleContent.style.display = 'none';
    })
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

  var jsVersionContent = getClass('js-version');
  var androidSyncVersionContent = getClass('android-sync-version');
  var androidAuthVersionContent = getClass('android-auth-version');
  var iosDownLoadSync = getClass('ios-download-sync');
  var iosDownLoadAuth = getClass('ios-download-auth');
  var iosDownLoadCore = getClass('ios-download-core');
  var videoWebVersionContent = getClass('video-web-version');
  var videoAndroidVersionContent = getClass('video-android-version');
  var videoIosVersionContent = getClass('video-ios-version');
  var videoAndroidDownloadSrc = getClass('video-android-download');
  var videoIosDownloadSrc = getClass('video-ios-download');

    var config = {
      authDomain: "wd-download.wilddog.com",
      syncURL: "https://wd-download.wilddogio.com"
    };

    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();
    ref.once('value', function (snap) {
      var jsVersion = snap.val().WilddogJavaScript.version;
      var iosAuthVersion = snap.val().WilddogAuthiOS.version;
      var iosSyncVersion = snap.val().WilddogSynciOS.version;
      var androidSyncVersion = snap.val().WilddogSyncAndroid.version;
      var androidAuthVersion = snap.val().WilddogAuthAndroid.version;
      var videoWebVersion = snap.val().WilddogVideoWeb.version;
      var videoAndroidVersion = snap.val().WilddogVideoAndroid.version;
      var videoIosVersion = snap.val().WilddogVideoiOS.version;
      var videoAndroidDownload = snap.val().WilddogVideoAndroid.downUrl;
      var videoIosDownload = snap.val().WilddogVideoiOS.downUrl;
      jsVersionContent.forEach(function (ele) {
        ele.textContent = jsVersion;
      });
      androidSyncVersionContent.forEach(function (ele) {
        ele.textContent = androidSyncVersion;
      });
      androidAuthVersionContent.forEach(function (ele) {
        ele.textContent = androidAuthVersion;
      });
      videoWebVersionContent.forEach(function (ele) {
        ele.textContent = videoWebVersion;
      });
      videoAndroidVersionContent.forEach(function (ele) {
        ele.textContent = videoAndroidVersion;
      });
      videoIosVersionContent.forEach(function (ele) {
        ele.textContent = videoIosVersion;
      });
      iosDownLoadSync.forEach(function (ele) {
        ele.setAttribute('href', snap.val().WilddogSynciOS.cdn);
      });
      iosDownLoadAuth.forEach(function (ele) {
        ele.setAttribute('href', snap.val().WilddogAuthiOS.cdn);
      });
      iosDownLoadCore.forEach(function (ele) {
        ele.setAttribute('href', snap.val().WilddogCoreiOS.cdn);
      });
      videoAndroidDownloadSrc.forEach(function (ele) {
        ele.setAttribute('href', videoAndroidDownload);
      });
      videoIosDownloadSrc.forEach(function (ele) {
        ele.setAttribute('href', videoIosDownload);
      });
    });

    var slides = getClass('slide');
    slides.forEach(function (ele) {
      var tabs = [].slice.call(ele.getElementsByClassName('slide-tab'), 0);
      var contents = [].slice.call(ele.getElementsByClassName('slide-content'), 0);
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          getSiblings(tab).forEach(function (sibling) {
            removeClass(sibling, 'tab-current')
          });
          var index = tabs.indexOf(this);
          addClass(this, 'tab-current');
          contents.forEach(function (content) {
            removeClass(content, 'slide-content-show')
          });
          addClass(contents[index], 'slide-content-show');
        })
      })
    })

};
