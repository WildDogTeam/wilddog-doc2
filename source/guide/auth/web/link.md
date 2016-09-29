
title:  绑定多种登录方式
---

本篇文档介绍如何让一个账号同时绑定多种登录方式。

绑定多种登录方式之后，你可以使用不同的方式来登录同一个账号。Wilddog Auth 通过用户的 Wilddog ID 来标识用户身份。


## 开始前的准备工作

在野狗控制面板的**身份认证—登录方式**中打开多种登录方式。



## 给帐号链接多种登录方式

添加多种登录方式需要以下三个步骤：

1. 以任意一种登录方式登录一个帐号。

2. 准备另一个未在您的应用上登录过的登录方式。

3. 进行登录关联。

### 关联QQ登录
```javascript
    var provider = new wilddog.auth.QQAuthProvider();

    //popup关联

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {

         // Handle Errors here.

         console.log(errorCode);

         // ...

    });



    //redirect关联

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

        console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });

```

### 关联微信登录


```javascript
    var provider = new wilddog.auth.WeixinAuthProvider();
    //popup

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {、
         // Handle Errors here. 
        console.log(errorCode);
         // ...
    });

    //redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });



```

### 关联微博登录

```javascript



    var provider = new wilddog.auth.WeiboAuthProvider();



    //popup

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {、 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });



    //redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });
```
### 关联微信公众账号登录

```javascript

    var provider = new wilddog.auth.WeixinmpAuthProvider();
    
    //popup
    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
         console.log(result);
     }).catch(function (error) {、
          // Handle Errors here.
           console.log(errorCode);
           // ...

    });



    //redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { // Handle Errors here. console.log(errorCode); // ...});

```

### 关联邮箱登录


```javascript

     var credentialEmail = wilddog.auth.EmailAuthProvider.credential(email, password);

     var user = wilddog.auth().currentUser;

     user.link(credentialEmail).then(function (user) {

         console.log("Account linking1 success", user);

     }, function (error) {

         console.log("Account linking1 error", error);

     });



```
> **注意：**若使用 customToken 登录时,若 customToken 中 admin 属性为 true,则不能进行关联操作.



## 解除一种登录方式

如果不想再使用某种登录方式，您可以使用 ulink() 方法解除该登录方式。

为帐号解除登录方式，通过传递参数 provider ID 给 `unlinkFromProvider:completion:` 方法，

您可以从 `providerData` 属性中获取到 provider ID。

```javascript
for example : unlink 微信登录方式
var user = wilddog.auth().currentUser;
     user.unlink("weixin").then(function () {
     console.log("unlink")
     console.log(provider);
 }, function (error) {
     console.log(error);
 });
```
