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
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
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

currentClass = currentClass || 'sync';

var currentNav = window.location.pathname.split('/')[2];
var currentL = window.location.pathname.split('/')[1];
localStorage.setItem('class', (currentNav === 'sync' || currentNav === 'auth') ? currentNav : 'sync');

var syncSrcs = {
  overview: '/overview/index.html',
  quickstart: '/quickstart/sync/web.html',
  guide: '/guide/sync/web/save-data.html',
  api: '/api/sync/web/api.html',
  resources: '/resources/sync/web/tutorial.html',
  console: '/console/creat.html'
}

var authSrcs = {
  overview: '/overview/index.html',
  quickstart: '/quickstart/auth/web.html',
  guide: '/guide/auth/core/concept.html',
  api: '/api/auth/web/api.html',
  resources: '/resources/auth/android/resources.html',
  console: '/console/creat.html'
}

var currentUrls = {
  overview: '',
  quickstart: '',
  guide: '',
  api: '',
  resources: '',
  console: ''
}
currentUrls = JSON.parse(localStorage.getItem('navsrc')) || currentUrls;
var navlinks = ['overview', 'quickstart', 'guide', 'api', 'resources', 'console'];

var links = [].slice.call(document.getElementsByClassName('sidebar-link'));
var navs = [].slice.call(document.getElementsByClassName('main-nav-link'));

links.forEach(function(element, index){
  element.addEventListener('click', function (e) {
    e.preventDefault();
    e.returnValue = false
    currentUrls[currentL] = e.target.href;
    localStorage.setItem('navsrc', JSON.stringify(currentUrls));
    window.location.href = e.target.href;
  })
});

navs.forEach(function (ele) {
  ele.addEventListener('click', function (e) {
    e.preventDefault();
    e.returnValue = false
    var index = navs.indexOf(ele);
    window.location.href = (currentUrls[navlinks[index]] === '') ? (currentClass === 'sync' ? syncSrcs[navlinks[index]] : authSrcs[navlinks[index]]) : currentUrls[navlinks[index]];
  })
});
