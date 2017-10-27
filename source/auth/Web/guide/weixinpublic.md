title: 微信公众号登录
---

本篇文档介绍在 Wilddog Auth 中如何使用微信公众号对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [微信公众开放平台管理中心](http://mp.weixin.qq.com/)，获取应用的 **AppID ** 和 **AppSecret**。
3. 在 微信公众平台 设置—公众号设置—功能设置-网页授权域名 中填入回调地址 `auth.wilddog.com`。
4. 在控制面板 身份认证—登录方式 中打开微信公众平台登录方式，配置微信公众帐号 **AppID** 和 **AppSecret**。

## 实现微信公众号登录

1.安装 Wilddog Auth SDK：
 <figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="auth_web_v">2.5.6</span>/wilddog-auth.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
 var config = {
     authDomain: "<appId>.wilddog.com"
 };
 wilddog.initializeApp(config);

```

3.Wilddog Auth 提供两种方式进行 微信 认证，你可以任选其一：

- redirect

```js
var provider = new wilddog.auth.WeixinmpAuthProvider();
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

- 通过 `Wilddog.auth().currentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Web/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Web/index.html) 无缝集成：使用匿名登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Web/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/Web/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。
