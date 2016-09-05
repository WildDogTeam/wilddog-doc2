title:  匿名登录
---

你可以在 Wilddog 身份认证中创建和使用临时匿名帐号来进行身份认证。如果你在应用中使用了规则表达式来保护数据的访问权限，即使用户未登录，使用临时匿名帐号也能正常访问数据。如果想长期保留临时匿名帐号，[可以绑定其它登录方式](/guide/auth/web/link.html)。

## 开始前的准备工作

1. 在 Wilddog 控制面板中创建一个应用.

2. 打开匿名登录方式:

 * 在野狗控制面板中选择身份认证选项。

 * 在｀登录方式｀标签中打开匿名登录方式。

## 使用 Wilddog 匿名登录认证

当一个未登录的用户想想使用一个 Wilddog 必须登录才能使用的特性，可以利用匿名登录，完成下面步骤：

1. 导入 Wilddog Auth 模块:
    ```
<script type="text/javascript" src="https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-auth.js"></script>
    ```

2. 以 Wilddog AppId 初始化 Wilddog 应用。
    ```
 var config = {
     authDomain: "<appId>.wilddog.com",
     syncURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");

    ```

3. 调用 `signInAnonymously()`方法：
    ```
   wilddog.auth().signInAnonymously().then(function(res){
         console.log(res);
   }).catch(function (error) {
         // Handle Errors here.
         console.log(error);
         // ...
   });
    ```

4. 如果signInAnonymously方法调用成功并且没有返回错误信息，你可以在 当前用户 对象中获取用户数据：
```
var isAnonymous = user.anonymous; 
var uid = user.uid;
```

## 将匿名帐号转变成永久帐号

当使用匿名登录时，你可能想下次在其它设备上还能登录这个帐号。比如你有一个新闻类的应用，用户在使用应用时，收藏了很多新闻，但是当换一个设备时，却访问不到这些数据。完成下面步骤可以将其转换为永久帐号：

准备一个未在你的应用上登录过的邮箱或者第三方登录方式。

#### 关联QQ登录

```
var provider = new wilddog.auth.QQAuthProvider();

popup关联
wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
    console.log(result);
}).catch(function (error) {
     // Handle Errors here.
    console.log(errorCode);
     // ...
});

redirect关联
wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {
     // Handle Errors here.  
     console.log(errorCode);     
     // ...
});
```

#### 关联微信登录

```
var provider = new wilddog.auth.WeixinAuthProvider();

popup
wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {
     // Handle Errors here.     
    console.log(errorCode);    
     // ...
});

redirect
wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {
     // Handle Errors here.     
    console.log(errorCode);  
    // ...
});

```

#### 关联微博登录

```

var provider = new wilddog.auth.WeiboAuthProvider();

popup
wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
      console.log(result);
}).catch(function (error) {
      // Handle Errors here.   
      console.log(errorCode);     
     // ...
});

redirect
wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {     
     // Handle Errors here.   
     console.log(errorCode);  
    // ...
});

```

#### 关联微信公众账号登录

```
var provider = new wilddog.auth.WeixinmpAuthProvider();

popup
wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {、
     // Handle Errors here.
     console.log(errorCode);
     // ...
});

redirect
wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {
     console.log(result);
}).catch(function (error) {  
     // Handle Errors here.  
     console.log(errorCode); 
     // ...
});
```

#### 关联邮箱登录

```
 var credentialEmail = wilddog.auth.EmailAuthProvider.credential("22443311@qq.com", "12345678");
 var user = wilddog.auth().currentUser;
 user.link(credentialEmail).then(function (user) {
     console.log("Account linking1 success", user);
 }, function (error) {
     console.log("Account linking1 error", error);
 });

```


## 后续步骤

现在我们已经学会了使用野狗进行用户认证，你可以配置 [规则表达式](/guide/sync/rules/introduce.html) 来控制野狗实时数据的访问权限。
