
title:  微博认证
---


本篇文档介绍在 Wilddog Auth 中如何使用新浪微博对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 进入 [新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 **App Key** 和 **App Secret**。请参考 [新浪微博网站接入](http://open.weibo.com/connect)。
3. 在微博开放平台 我的应用—高级信息—OAuth2.0 授权设置中填写授权回调页地址`https://auth.wilddog.com/v2/[WILDDOG-APPID]/auth/weibo/callback`。
4. 在控制面板 身份认证—登录方式 中打开微博登录方式，配置 **App Key** 和 **App Secret**。



## 实现微博认证

1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
var config = {
     authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config, "DEFAULT");
```
3.Wilddog Auth 提供两种方式进行微博认证，你可以任选其一：

- popup

```js
var provider = new wilddog.auth.WeiboAuthProvider();
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
var provider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithRedirect(provider).then(function (user) {
    console.log(user);
}).catch(function (error) {
    // 错误处理
    console.log(error);
    // ...
});
```



## 退出登录

 `signOut()` 方法用于用户退出登录：

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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用微博登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。



