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
function getQueryStringByName(name){
  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
    return "";
  }
  return decodeURIComponent(result[1]);
}

function ajax(options){
  var xmlreq;
  if(window.ActiveXObject){ //如果是IE浏览器    
    xmlreq = new ActiveXObject("Microsoft.XMLHTTP");    
  }else if(window.XMLHttpRequest){ //非IE浏览器    
    xmlreq = new XMLHttpRequest();    
  };
  xmlreq.onreadystatechange = function () {
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
getClass('logout-btn')[0].setAttribute('href', 'https://www.wilddog.com/account/logout?next=' + currentPath);

//是否显示底部注册入口
var novice = getClass('novice');
var showNovice = sessionStorage.getItem('ssn');

novice.forEach(function (ele, index) {
  var close = ele.getElementsByClassName('close-novice')[0];
  close.addEventListener('click', function () {
    ele.style.display = 'none';
    sessionStorage.setItem('ssn', false);
  });
});

//登录信息
var userProfile = getClass('header-user')[0];
var loginTab = getClass('header-info')[0];
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
        loginTab.style.display = 'block';
        userProfile.style.display = 'none';
      } else {
        loginTab.style.display = 'none';
        userProfile.style.display = 'block';
      }
    }
  })
});