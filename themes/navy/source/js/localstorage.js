if (!window.localStorage) {
    Object.defineProperty(window, "localStorage", new(function() {
        var aKeys = [],
            oStorage = {};
        Object.defineProperty(oStorage, "getItem", {
            value: function(sKey) {
                return sKey ? this[sKey] : null;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "key", {
            value: function(nKeyId) {
                return aKeys[nKeyId];
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "setItem", {
            value: function(sKey, sValue) {
                if (!sKey) {
                    return;
                }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "length", {
            get: function() {
                return aKeys.length;
            },
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, "removeItem", {
            value: function(sKey) {
                if (!sKey) {
                    return;
                }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        this.get = function() {
            var iThisIndx;
            for (var sKey in oStorage) {
                iThisIndx = aKeys.indexOf(sKey);
                if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); } else { aKeys.splice(iThisIndx, 1); }
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
localStorage.removeItem('navsrc');
localStorage.removeItem('class');

var currentL = window.location.pathname.split('/')[1];
// var currentNav = window.location.pathname.split('/')[2];

var srcs = [{
    overview: '/overview/index.html',
    sync: '/sync/Web/index.html',
    conversation: '/conversation/Web/index.html',
    conference: '/conference/Web/index.html',
    location: '/location/Web/index.html',
    sms: '/sms/index.html',
    auth: '/auth/Web/index.html',
    console: '/console/creat.html'
}];

var currentUrls = {
    overview: '',
    sync: '',
    conversation: '',
    conference: '',
    location: '',
    sms: '',
    auth: '',
    console: ''
};

currentUrls = JSON.parse(sessionStorage.getItem('navsrc')) || currentUrls;
console.log(currentUrls)

var navlinks = ['overview', 'sync', 'conversation', 'conference', 'location', 'sms', 'auth', 'console'];

//左侧每个链接单元
var links = [].slice.call(document.getElementsByClassName('sidebar-link'));

//顶部导航栏
var navs = [].slice.call(document.getElementsByClassName('main-nav-link'));
// var platformLinks = [].slice.call(document.getElementsByClassName('platform-links'));

links.forEach(function(element, index) {
    element.addEventListener('click', function(e) {
        currentUrls[currentL] = this.href;
        sessionStorage.setItem('navsrc', JSON.stringify(currentUrls));
        window.location.href = this.href;
    })
});

navs.forEach(function(ele, index) {
    var href;
    if (currentUrls[navlinks[index]] === '') {
        href = srcs[0][navlinks[index]];
        // console.log('navs1111+++' + href)
    } else {
        href = currentUrls[navlinks[index]];
        // console.log('navs222+++' + href)
    }
    ele.setAttribute('href', href);
});
