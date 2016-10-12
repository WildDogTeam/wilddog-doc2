
title:  自定义身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用自定义身份认证。



## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板—创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 控制面板—身份认证—登录方式—超级秘钥 中获取超级密钥。



## 实现自定义身份认证

1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
 var config = {
     syncURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");
```

3.当用户成功登录你的用户系统时，服务器通过 [Server SDK 生成 Custom Token](/guide/auth/server/server.html)，并返回给客户端。

4.客户端收到 Custom Token 后，使用 `signInWithCustomToken()` 方法进行认证：

```javascript
wilddog.auth().signInWithCustomToken(customToken).then(function (user){
     console.log(user);
 }).catch(function (error) {
     // 错误处理
     console.log(error);
     // ...
 });
```

## 退出登录

`signOut()` 方法用于用户退出登录：

```javascript
 wilddog.auth().signOut().then(function() {
     // 退出成功
     console.log("sign-out")
 }).catch(function(error) {
     // 发生错误
     console.log("sign-out-error")
 });
```

## 更多使用

- 通过 `Wilddog.auth().currentUser()` 获取当前用户并管理用户。详情请参考 [管理用户](/guide/auth/web/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用自定义登录登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。