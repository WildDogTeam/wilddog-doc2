title:  微信登录
---

通过集成微信登录，你可以让你的用户使用他们的微信帐号来进行 Wilddog 身份验证。

登录的用户可以访问野狗实时数据库中用户登录受限的数据。

## 开始前的准备工作

1. 在 [微信开放平台管理中心](https://open.weixin.qq.com/)，获取应用的 **App ID** 和 **App Secret**。

2. 在野狗控制面板中打开微信登录方式:

 * 在野狗控制面板中选择 ”身份认证“->登录方式。

 * 点击微信登录开关，点击配置，输入微信帐号 **APP ID** 和 **App Secret**。


## Wilddog 身份验证

1. 导入 WilddogAuth 模块：
    ```
<script type="text/javascript" src="https://cdn.wilddog.com/js/client/v2/wilddog-web-auth.js"></script>
    ```

2. 初始化 `Wilddog` 应用实例：
 
 ```
 var config = {
     authDomain: "<appId>.wilddog.com",
     databaseURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");

    ```

3.微信登录(popup or redirect)

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


## 后续步骤
无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 [规则表达式](/sync/rules/introduce-rule.html)，`auth` 还可以控制野狗实时数据库的用户访问权限。


* 在你的应用中，你可以通过 wilddog.auth().currentUser 来获取用户的基本属性。参考 [管理用户]()。

* 在你的野狗实时数据库 [规则表达式](/sync/rules/introduce-rule.html) 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。



你还可以通过 [链接多种登录方式](/auth/web/link.html) 来实现不同的登录方式登录同一个帐号。



#### 调用 [signOut]() 退出登录：

```
wilddog.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("sign-out")
 }, function(error) {
     // An error happened.
     console.log("sign-out-error")
 });

```

