
title:  QQ 登录
---

本篇文档介绍在 Wilddog Auth 中如何使用 QQ 对用户进行身份认证。


## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [QQ 互联](https://connect.qq.com)—我的应用 中获取应用的 **APP ID** 和 **APP KEY**。请参考 [网站接入流程](http://wiki.connect.qq.com/网站接入流程)。
3. 在 QQ 互联—我的应用 中，填写应用的回调地址:` https://auth.wilddog.com/v2/{wilddog-appId}/auth/qq/callback`。
4. 在控制面板 身份认证—登录方式 中打开 QQ 登录方式，配置 QQ 帐号 **APP ID** 和 **APP KEY**。

## 实现 QQ 登录
1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
var config = {
    authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);
```

3.Wilddog Auth 提供两种方式进行 QQ 认证，你可以任选其一：

- popup

```js
var provider = new wilddog.auth.QQAuthProvider();
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
var provider = new wilddog.auth.QQAuthProvider();
var auth = wilddog.auth();
// 直接使用 signInWithRedirect 会造成重复登录。
auth.onAuthStateChanged(function (user) {
  if (user == null) {
    auth.signInWithRedirect(provider).then(function (user) {
         console.log(user);
    }).catch(function (error) {
         // 错误处理
         console.log(error);
         // ...
    });
  } else {
    console.log(user);
  }
})
```



## 退出登录

`signOut()` 方法用于用户退出登录：

```js
 wilddog.auth().signOut().then(function() {
     // 退出成功
     console.log("sign-out")
 }).catch(function(error) {
     // 发生错误
     console.log("sign-out-error")
 });
```

## 更多使用

- 通过 `Wilddog.auth().currentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Web/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Web/index.html) 无缝集成：使用 QQ 登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Web/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/Web/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。
