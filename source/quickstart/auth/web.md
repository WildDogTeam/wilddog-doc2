
title: 快速入门
---

快速入门以邮箱登录为例说明野狗身份认证的基本用法。

## 1. 创建应用

首先在控制面板中创建应用，请参考[控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="comment"><!-- Wilddog Auth SDK --></span></div><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">src</span> = <span class="string">"<span>htt</span>ps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js"</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

`NodeJS` 或者 `ReactNative` 项目可以采用 `npm` 方式来安装最新的 Wilddog Javascript SDK:

```
npm install wilddog
```

## 3. 初始化 APP 对象

使用野狗 JavaScript SDK 的任何模块之前，我们都需要首先初始化 APP，初始化代码如下：

```javascript
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://YOUR_APPID.wilddogio.com" 
};
wilddog.initializeApp(config);
```

如果你的应用中并未用到 `Sync` 模块，代码中所示的 `syncURL` 项可以忽略。
## 4. 使用邮箱密码方式认证

1. 首先确认应用的邮箱登录功能已激活（默认是关闭状态）：

   ![](/images/openemail.png)

2. 监听用户登录状态:
```js
wilddog.auth().onAuthStateChanged(function (userInfo) {
    if(userInfo) {
	    console.info('user login',user, wilddog.auth().currrentUser);
    }else {
	    console.info('user logout');
    }
});
```
3. 调用 `createUserWithEmailAndPassword` 创建用户:
```js
wilddog.auth().createUserWithEmailAndPassword(email,pwd)
	.then(function (user) {
    console.info("user created.", user);
	}).catch(function (err) {
    console.info("create user failed.", err);
});
```
4.  用户创建成功之后会自动登录，可以调用 `signOut` 登出：
```js
wilddog.auth().signOut().then(function () {
    console.info("user sign out.");
});
```
5. 已经存在的用户通过 `signInWithEmailAndPassword` 登录：
```js
wilddog.auth().signInWithEmailAndPassword(email, pwd)
    .then(function () {
        console.info("login success, currentUser->",  wilddog.auth().currentUser);
    }).catch(function (err) {
        console.info('login failed ->',err);
    });
```


野狗还提供了匿名认证、第三方认证等其他认证方式，详细信息请见 [完整指南](/guide/auth/core/concept.html) 和  [API 文档](/api/auth/web.html)。
