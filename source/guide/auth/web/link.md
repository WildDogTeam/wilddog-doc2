
title:  绑定多种认证方式
---

本篇文档介绍在 Wilddog Auth 中如何给同一个账号绑定多种认证方式。


## 前期准备

1. 在控制面板 身份认证—登录方式 中打开需要绑定的登录方式。
2. 配置需要绑定的登录方式。具体配置方法请参考对应文档。


## 实现绑定多种认证方式

### 绑定邮箱认证方式

绑定邮箱认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取邮箱认证方式的 credential。

```javascript
var credentialEmail = wilddog.auth.EmailAuthProvider.credential("12345678@wilddog.com", "password123");
```

3.使用邮箱认证方式绑定。

```javascript
var user = wilddog.auth().currentUser;
user.link(credentialEmail).then(function (user) {
    console.log("Account linking1 success", user);
}, function (error) {
    console.log("Account linking1 error", error);
});
```





### 绑定第三方认证方式

绑定第三方认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取需要绑定认证方式的 provider。

```javascript
// QQ 认证
var provider = new wilddog.auth.QQAuthProvider(); 

// 微博认证
var provider = new wilddog.auth.WeiboProvider();

// 微信认证
var provider = new wilddog.auth.WeixinAuthProvider();

// 微信公众账号认证
var provider = new wilddog.auth.WeixinmpAuthProvider();
```

3.使用第三方认证方式绑定。

例如，使用 linkWithPopup 进行绑定：

```javascript
wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
    console.log(result);
}).catch(function (error) {
    // 错误处理
    console.log(errorCode);
    // ...
});
```

更多认证绑定方式，请参考 [API 文档](https://docs.wilddog.com/api/auth/web/api.html#link)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  若使用 customToken 登录时，若 customToken 中 admin 属性为 true，则不能进行关联操作。
</blockquote>


## 解除已绑定认证方式

`unlink()` 方法用于解除已绑定认证方式。

例如，解除微信绑定：

```javascript
var user = wilddog.auth().currentUser;
user.unlink("weixin").then(function () {
     console.log("unlink")
     console.log(provider);
}, function (error) {
     console.log(error);
});
```
