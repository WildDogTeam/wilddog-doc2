
title:  微信认证
---

本篇文档介绍在 Wilddog Auth 中如何使用微信对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [微信开放平台管理中心](https://open.weixin.qq.com/)，获取应用的 **AppID** 和 **AppSecret**。
3. 在 微信开放平台—网站应用—网站信息 中填写回调域名 `auth.wilddog.com`。
4. 在 控制面板 身份认证—登录方式 中打开微信登录方式，配置微信帐号 **AppID** 和 **AppSecret**。

## 实现微信认证

1.安装 Wilddog Auth SDK：
 <figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">"<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js"</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
 var config = {
     authDomain: "<appId>.wilddog.com"
 };
 wilddog.initializeApp(config, "DEFAULT");
```

3.Wilddog Auth 提供多种方式进行微信认证，你可以任选其一：

- popup

```json
var provider = new wilddog.auth.WeixinAuthProvider();
wilddog.auth().signInWithPopup(provider).then(function (user) {
    console.log(user);
 }).catch(function (error) {
     // 错误处理
     console.log(error);
     // ...
 });
```

- redirect

```js
var provider = new wilddog.auth.WeixinAuthProvider();
wilddog.auth().signInWithRedirect(provider).then(function (user) {
     console.log(user);
 }).catch(function (error) {
     // 错误处理
     console.log(error);
     // ...
 });
```

更多认证绑定方式，请参考 [API 文档](https://docs.wilddog.com/api/auth/web/api.html#link)。

## 退出登录

`signOut` 方法用于用户退出登录：

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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用微信登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。