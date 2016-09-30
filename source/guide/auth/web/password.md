
title:  邮箱认证
---

本篇文档介绍在 Wilddog Auth 中如何使用邮箱地址和密码对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在控制面板 **身份认证—登录方式** 中打开邮箱登录方式。


## 创建用户

用邮箱密码创建一个新用户，需完成以下步骤：

1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">type</span>=<span class="string">&quot;text/javascript&quot;</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

2.初始化 Wilddog Auth 实例：

```javascript
var config = {

 authDomain: "<appId>.wilddog.com"

 };

 wilddog.initializeApp(config, "DEFAULT");
```

3.使用 `createUserWithEmailAndPassword(email,password) ` 方法创建新用户：

```javascript
wilddog.auth().createUserWithEmailAndPassword("wangxiaoliang@wilddog.com", "12345678").then(function(user){
	 // 获取用户
	 console.log(user);
})catch(function (error) {
     // 错误处理
     console.log(error);
 });
```

> **注意：**如果新用户创建成功，默认会处于登录状态，并且你可以在回调方法中获取登录用户。



## 登录用户

1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">type</span>=<span class="string">&quot;text/javascript&quot;</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

2.初始化 Wilddog Auth 实例：

```javascript
    var config = {
     authDomain: "<appId>.wilddog.com"
    };
    wilddog.initializeApp(config, "DEFAULT");
```

3.将该用户的电子邮件地址和密码传递到 `signInWithEmailAndPassword(email:password)`，即可在你应用中登录此用户：

```javascript
wilddog.auth().signInWithEmailAndPassword("550690505@qq.com", "1234567").then(function(res){
     console.log(res);
 }).catch(function (error) {
     //错误处理
     console.log(error)
 });
```


> **注意：** 如果用户成功登录，你可以在回调方法中获取登录用户。



## 退出登录

 [signOut](/guide/auth/web/api.html#signout) 方法用于用户退出登录：

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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用邮箱登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。
  Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。









