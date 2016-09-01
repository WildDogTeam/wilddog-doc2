title:  QQ 登录
---

通过集成 QQ 登录，您可以让您的用户使用他们的 QQ 帐号来进行 Wilddog 身份验证。

登录的用户可以访问野狗实时数据库中用户登录受限的数据。


### 开始前的准备工作

1. 在 [QQ 开放平台管理中心](http://op.open.qq.com/)，获取应用的 **App ID** 和 **App Secret**。

2. 在野狗控制面板中打开 QQ 登录方式:

 * 在野狗控制面板中选择 ”身份认证“->登录方式。

 * 点击 QQ 登录开关，点击配置，输入 QQ 帐号 **APP ID** 和 **App Secret**。


### Wilddog 身份验证
1. 导入 WilddogAuth 模块：
    ```
<script type="text/javascript" src="https://cdn.wilddog.com/js/client/v2/wilddog-web-auth.js"></script>
    ```

2. 初始化 `Wilddog` 对象：
 ```
var config = {
     authDomain: "<appId>.wilddog.com",
     databaseURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");
    ```

3.QQ登录(popup or redirect)

```
var provider = new wilddog.auth.QQAuthProvider();

popup登录
wilddog.auth().signInWithPopup(provider).then(function (result) {
    console.log(result);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error);
     // ...
 });

redirect登录
wilddog.auth().signInWithPopup(provider).then(function (result) {
     console.log(result);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error);
     // ...
 });
```

### 后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式]()，`auth` 还可以控制野狗实时数据库的用户访问权限。


* 在您的应用中，您可以通过 WDGUser 来获取用户的基本属性。参考 [管理用户]()。

* 在您的野狗实时数据库 [规则表达式]() 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。


您还可以通过 [链接多种登录方式]() 来实现不同的登录方式登录同一个帐号。



##### 调用 [signOut]() 退出登录：

```
wilddog.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("sign-out")
 }, function(error) {
     // An error happened.
     console.log("sign-out-error")
 });

```




