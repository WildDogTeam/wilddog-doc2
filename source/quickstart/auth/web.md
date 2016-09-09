title: 快速入门
---

快速入门可以让你快速掌握 Wilddog 身份认证的基本用法。

## 创建应用

在使用 Wilddog 身份认证功能之前，首先需要创建你自己的应用，如果你还不知道如何创建应用，请先阅读[控制面板-创建应用](/console/creat.html)

## 引入 SDK

如果你准备开发的是一个 WEB 应用，通过野狗官方提供的 CDN 源来引入是最佳选择，我们为你提供了单独的 Auth SDK 和包含其他模块的完整 SDK，**任选其中之一引入即可**。

1. 单独引入 Auth SDK：
```javascript
<!— Wilddog Auth SDK —>
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-auth.js"></script>
```
2. 引入完整 SDK：
```js
<!— 完整的 Wilddog SDK —>
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog.js"></script>
```

`NodeJS` 或者 `ReactNative` 项目可以采用 `npm` 方式来安装最新的 Wilddog Javascript SDK:

```
npm install wilddog
```

**注意**  `npm` 安装的是完整 SDK 而非单独的 Auth 模块。
## 初始化 APP 对象

从 Wilddog 2.0 开始，使用野狗 JavaScript SDK 的任何模块之前，我们都需要首先初始化 APP，初始化代码如下：

```javascript
var config = {
  authDomain: "YOUR_APPID.wilddog.com",
  syncURL: "https://YOUR_APPID.wilddogio.com" 
};
wilddog.initializeApp(config);
```

如果你的应用中并未用到 `Sync` 模块，代码中所示的 `syncURL` 项可以忽略。
## 使邮箱密码方式登录

1. 首先在你 APP 的野狗控制面板确认邮箱登录功能已激活（默认是关闭状态）：
![](/images/openemail.png)
2. 监听用户登录状态，我们建议你始终通过监听器来获取用户的登录信息尤其是用户登录状态：
```js
wilddog.auth().onAuthStateChanged(function (userInfo) {
    if(userInfo) {
	    console.info('user login',user, wilddog.auth().currrentUser);
    }else {
	    console.info('user logout');
    }
});
```
  **提示** 你也可以通过 `wilddog.auth().currentUser` 来获取当前登录用户信息，与监听器中返回的 `userInfo` 不同的是 `wilddog.auth().currentUser` 是一个 `wd.User` 对象，它不仅包含了用户所有的基本信息，也提供了一系列方法方便你维护用户，例如绑定第三方登录、修改用户昵称等操作。
3. 调用 `createUserWithEmailAndPassword` 创建用户。 
```js
wilddog.auth().createUserWithEmailAndPassword(email,pwd)
	.then(function (user) {
    console.info("user created.", user);
	}).catch(function (err) {
    console.info("create user failed.", err);
});
```
4.  用户创建成功之后会自动登录，我们可以调用 `signOut` 登出：
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


通过邮箱登录的方式我们就介绍到这里，野狗还提供了匿名登录、OAuth 登录等其他登录方式，详细信息请参见 API 文档。
