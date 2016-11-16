if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      var aCouples = document.cookie.split(/\s*;\s*/);
      for (var aCouple, iKey, nIdx = 0; nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}

var currentClass = localStorage.getItem('class');
var currentNav = window.location.pathname.split('/')[2];
var currentL = window.location.pathname.split('/')[1];
localStorage.setItem('class', currentNav);
var platforms = ['sync', 'video', 'auth'];

var srcs = [{
  overview: '/overview/sync.html',
  quickstart: '/quickstart/sync/web.html',
  guide: '/guide/sync/concept.html',
  api: '/api/sync/web/App.html',
  resources: '/resources/sync/web/tutorial.html',
  console: '/console/creat.html'
},
{
  overview: '/overview/video.html',
  quickstart: '/quickstart/video/web.html',
  guide: '/guide/video/core.html',
  api: '/api/video/web/wilddogVideo.html',
  resources: '/resources/video/web/tutorial.html',
  console: '/console/creat.html'
},
{
  overview: '/overview/auth.html',
  quickstart: '/quickstart/auth/web.html',
  guide: '/guide/auth/core/concept.html',
  api: '/api/auth/web/App.html',
  resources: '/resources/auth/android/resources.html',
  console: '/console/creat.html'
}];

var currentUrls = {
  overview: '',
  quickstart: '',
  guide: '',
  api: '',
  resources: '',
  console: ''
};
currentUrls = JSON.parse(localStorage.getItem('navsrc')) || currentUrls;

var navlinks = ['overview', 'quickstart', 'guide', 'api', 'resources', 'console'];

for (var i = 0; i < navlinks.length; i++) {
  if (currentUrls[navlinks[i]]) {
    currentUrls[navlinks[i]] = (currentUrls[navlinks[i]].indexOf('undefined') === -1) ? currentUrls[navlinks[i]] : ''
  } else {
    currentUrls[navlinks[i]] = ''
  }
}
localStorage.setItem('navsrc', JSON.stringify(currentUrls));

var links = [].slice.call(document.getElementsByClassName('sidebar-link'));
var navs = [].slice.call(document.getElementsByClassName('main-nav-link'));

links.forEach(function(element, index){
  element.addEventListener('click', function (e) {
    currentUrls[currentL] = this.href;
    localStorage.setItem('navsrc', JSON.stringify(currentUrls));
    window.location.href = this.href;
  })
});

navs.forEach(function (ele, index) {
  ele.addEventListener('click', function (e) {
    var currentClass = localStorage.getItem('class');
    var href;
    if (currentUrls[navlinks[index]] === '') {
      var hrefIndex = platforms.indexOf(currentClass) === -1 ? 0 : platforms.indexOf(currentClass);
      href = srcs[hrefIndex][navlinks[index]];
    } else {
      href = currentUrls[navlinks[index]];
    }
    window.location.href = href;
  })
});
