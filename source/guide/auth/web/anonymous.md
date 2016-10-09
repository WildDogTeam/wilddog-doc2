
title:  匿名身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用临时匿名帐号来进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。

2. 在 控制面板 身份认证—登录方式 中打开匿名登录方式。

## 实现匿名身份认证

1.安装 Wilddog Auth SDK：
    <figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">type</span>=<span class="string">&quot;text/javascript&quot;</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
  var config = {
    authDomain: "<appId>.wilddog.com",
  };
  wilddog.initializeApp(config, "DEFAULT");
```

3.调用 `signInAnonymously()`方法：
```javascript
 wilddog.auth().signInAnonymously().then(function(user){
       console.log(user);
 }).catch(function (error) {
       // 错误处理
       console.log(error);
       // ...
 });
```

4.`signInAnonymously()`方法调用成功后，可以在当前用户对象中获取用户数据：

```javascript
var user = wilddog.auth().currentUser; 
var isAnonymous = user.anonymous; 
var uid = user.uid;
```
  ​
## 匿名帐号转成永久帐号

匿名登录的账号数据将不会被保存，可以通过绑定邮箱认证或第三方认证方式将匿名账号转成永久账号。

### 绑定邮箱认证方式

绑定邮箱认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取邮箱认证方式的 credential。

```javascript
var credentialEmail = wilddog.auth.EmailAuthProvider.credential(email, password);
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

例如，使用 popup 进行绑定：

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


## 退出登录

`signOut` 方法用于用户退出登录：

```javascript
 wilddog.auth().signOut().then(function() {
     // 退出成功
     console.log("sign-out")
 }, function(error) {
     // 发生错误
     console.log("sign-out-error")
 });
```

## 更多使用

- 通过 `Wilddog.auth().currentUser()` 获取当前用户并管理用户。详情请参考 [管理用户](/guide/auth/web/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用匿名登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。