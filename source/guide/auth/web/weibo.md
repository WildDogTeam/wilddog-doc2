title:  微博登录
---

通过集成新浪微博登录，您可以让您的用户使用他们的新浪微博帐号来进行 Wilddog 身份认证。


认证的用户可以访问野狗实时数据同步中用户登录受限的数据。

## 开始前的准备工作
1. 在 [新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 **App Key** 和 **App Secret**。

2. 在野狗控制面板中打开新浪微博登录方式:

 * 在野狗控制面板中选择 ”身份认证“->登录方式。

 * 点击微博登录开关，点击配置，输入微信帐号 **APP ID** 和 **App Secret**。

## Wilddog 身份认证

1. 导入 WilddogAuth 模块：

 ```
<script type="text/javascript" src="https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-auth.js"></script>

 ```
2. 初始化 `Wilddog` 应用实例：
 ```
var config = {
     authDomain: "<appId>.wilddog.com",
     syncURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");
 ```
3.新浪微博登录(popup or redirect)

```
var provider = new wilddog.auth.WeiboAuthProvider();

popup登录
wilddog.auth().signInWithPopup(provider).then(function (result) {
     console.log(result);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error);
     // ...
 });

redirect登录
wilddog.auth().signInWithRedirect(provider).then(function (result) {
     console.log(result);    
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error);
     // ...
 });
```

## 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。

* 在您的应用中，您可以通过 Wilddog.auth().currentUser() 来获取用户的基本属性。参考 [管理用户](/guide/auth/web/manageuser.html)。

* 在您的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

你还可以通过 [链接多种登录方式](/guide/auth/web/link.html) 来实现不同的登录方式登录同一个帐号。


### 调用 [signOut](/guide/auth/web/api.html#signout) 退出登录：

```
wilddog.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("sign-out")
 }, function(error) {
     // An error happened.
     console.log("sign-out-error")
 });

```



