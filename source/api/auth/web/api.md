title:  Web API 文档
---
野狗 Auth 模块的 API 按照 Promise 风格设计，如果你对 Promise 编程尚不了解，请 [参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的教程。

---

## wilddog.App

App 对象是野狗 Web SDK 的核心，它维护着应用的全局上下文数据，不同模块之间需要通过它来进行交互。同时 App 实例也是我们访问野狗各个功能模块的入口，所以初始化 App 实例是我们使用其他任何 API 接口的前提。
要使用野狗的身份认证功能，你的初始化参数中必须包含 `authDomain`， 代码如下：

```js
var config = {
  authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);
    
```

初始化多个 App 实例

```js
//上面的代码相当于如下初始化动作
var wilddog = wilddog.initializeApp(config,DEFAULT);
//我们还可以使用不同配置声明多个不同的 App 实例
var configA = {
  authDomain: "<appId-a>.wilddog.com"
};
var a = wilddog.initializeApp(configA, APP_A);
//通过 a 来访问 auth
//a.auth().signInXxx().then(...)
```
---

### auth

获取 wilddog.Auth 实例，wilddog.Auth 实例只能通过此方法获取。

**定义**

auth()

**参数**

_无_

**返回**

[wilddog.Auth](/api/auth/web.html#wilddog-Auth)

---

### sync

获取 wilddog.Sync 实例，wilddog.Sync 实例只能通过此方法获取。

**定义**

sync()

**参数**

_无_

**返回**

[wilddog.Sync](/api/sync/web.html#wilddog-Sync)

---

## wilddog.Auth

Auth 对象负责用户认证及密码找回等功能，它不能直接创建，只能通过 wilddog.App 实例的 [auth](/api/auth/web.html#auth) 方法获得。

```js
// 获取当前 app 的 auth 实例 
var auth = wilddog.auth()

```

---


### onAuthStateChanged

监听用户的登录状态。

**定义**

onAuthStateChanged(callback)

**参数** 

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| callback | [callback](/api/auth/web/api.html#callback) |  | 回调函数 |

**返回**

function 用于取消监听

**示例**：

```js
// 开始监听
var stopListen = wilddog.auth().onAuthStateChanged(function (user) {
 console.info("auth state changed ->",user);
 });
// 停止监听
stopListen();

```

---

#### callback

[onAuthStateChanged](/api/auth/web/api.html#onAuthStateChanged) 回调函数的详细说明。

**定义**

function(user)

**参数** 

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| user | [wilddog.User](/api/auth/web.html#wilddog-User) | nullable | auth 状态变为登录状态时传回 user 对象，auth 状态变为登出时返回值为 null |

**返回**

[Void](/api/auth/web.html#Void)

---

### createUserWithEmailAndPassword

根据邮箱和密码创建用户，创建成功之后自动登录。

**定义** 

createUserWithEmailAndPassword(email, password)

**参数** 

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| email | string | _non-null_ | 用户邮箱 |
| password | string | _non-null_ | 用户密码，至少需要包含字母和数字，长度6位以上 |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

**示例**

```js
wilddog.auth().createUserWithEmailAndPassword(email, pwd)
    .then(function (user) {
         console.info("user created.", user);
        })
    .catch(function (err, more) { 
         console.info("create user failed.", err.code, err);
     });
```
---

### signInAnonymously

匿名登录

**定义**

signInAnonymously()

**参数** 

_无_


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>
 
**示例**

```js
wilddog.auth().signInAnonymously()
    .then(function (result){
        console.info("signInAnouymously success", result)
        })
    .catch(function(err){
        console.info("signInAnouymously failed",err)
    });
```

---

### signInWithEmailAndPassword

通过电子邮箱和密码登录

**定义**

wilddog.auth().signInWithEmailAndPassword(email, pwd)

**参数** 

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| email | string | _non-null_ | 用户邮箱 |
| password | string | _non-null_ | 用户密码|


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

**示例**

```js
wilddog.auth().signInWithEmailAndPassword(email,pwd)
    .then(function (userInfo) { 
        console.info("login success->",userInfo);    
        console.info("currentUser->",wilddog.auth().currentUser);
    })
    .catch(function (err) {
        console.info('login failed ->', err);
    });
```
---

### signInWithPopup

通过弹出窗口的方式进行 OAuth 登录。

**定义**

signInWithPopup(provider)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| provider | [wilddog.auth.Provider](/api/auth/web.html#wilddog-auth-Provider) | _non-null_ | 特定登录方式的实例 |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>
 
**示例**

```js
//微博登录
var weiboProvider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithPopup(weiboProvider).then(function (user) {
    console.info("login success", user)
}).catch(function(err){
    console.info("login failed", err)
});
```
---

### signInWithRedirect

通过浏览器跳转的方式进行 OAuth 登录。

**定义**

signInWithRedirect(provider)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| provider | [wilddog.auth.Provider](/api/auth/web.html#wilddog-auth-Provider) | _non-null_ | 特定登录方式的实例 |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>
 
**示例**

```js
//微博登录
var weiboProvider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithPopup(weiboProvider).then(function () {
    console.info("login success", wilddog.auth().currentUser)
}).catch(function(err){
    console.info("login failed", err)
});
```
---

### signInWithCustomToken

使用自定义 token 的方式登录，token 的格式需符合野狗的规范，具体教程 [参见这里](/guide/auth/core/concept.html#身份认证令牌)。

**定义**

signInWithCustomToken(token)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| token | string | _non-null_ | 生成的 jwt_token |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>
 
**示例**

```js
wilddog.auth().signInWithCustomToken(token).then(function () {
    console.info("login success", wilddog.auth().currentUser)
}).catch(function(err){
    console.info("login failed", err)
});
```

---

### signInWithCredential

使用 [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) 实例登录

**定义**

signInWithCredential(credential)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| credential | [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) | _non-null_ | 特定登录方式的认证凭据 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>


**示例**：

```js
// 凭借已经获取到的微博 accessToken 来登录
var credential = wilddog.auth.WeiboAuthProvider.credential(accessToken);
wilddog.auth().signInWithCredential(credential)
    .then(function(user){
        console.info('login success', user);
    })
    .catch(function(err){
        console.info('login failed', err);
    });

```

---

### sendPasswordResetEmail

通过邮件重置密码

**定义**

sendPasswordResetEmail(email)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| email | string | _non-null_ | 用户邮箱 |

**返回**

 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>
 
---

### signOut

使当前用户退出登录

**定义**

signOut()

**参数**

_无_

**返回**

 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>

**示例**

```js
     wilddog.auth().signOut().then(function(){
        console.info('user sign out');
     });
```

---

## wilddog.User

User 对象包含所有维护用户个人信息的接口，我们不能直接创建此对象，只能通过 `wilddog.auth().currrentUser` 或者部分登录接口来获取 User 的实例。

```js
    // 错误代码 因为未登录时 currenUser 会返回 null
    wilddog.auth().currentUser.linkXxx()
    // 正确的代码
    if(wilddog.auth().currentUser) {
        wilddog.auth().currentUser.linkXxx()
    }

```
---

### link

使用 [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) 实例为用户关联新的登录方式。

**定义**

link(credential)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| credential | [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) | _non-null_ | 特定登录方式的认证凭据 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

**示例**

```js
wilddog.auth().currentUser
    .link(wilddog.auth.EmailAuthProvider.credential(email, pwd))
    .then(function (user) { 
        console.info("link email.", user);
    })
    .catch(function (err) {
        console.info("link email failed.", err.code, err);
    });

```

---

### linkWithPopup

通过弹出窗口的形式为用户关联新的 Oauth 登录方式。

**定义**

linkWithPopup(provider)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| provider | [wilddog.auth.Provider](/api/auth/web.html#wilddog-auth-Provider) | _non-null_ | 特定登录方式的实例 |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>


**示例**：

```js
// 关联微博登录
var provider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().currentUser
    .linkWithPopup(provider)
    .then(function (user) {
        console.info("link weibo->", user);
    })
    .catch(function (err) {
        console.info(err);
    });
```
---

### linkWithRedirect

通过浏览器跳转的形式为用户关联新的 Oauth 登录方式。

**定义** 

linkWithRedirect(provider)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| provider | [wilddog.auth.Provider](/api/auth/web.html#wilddog-auth-Provider) | _non-null_ | 特定登录方式的实例 |


**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>

**示例**

```js
// 关联微博登录
var provider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().currentUser
    .linkWithRedirect(provider)
    .then(function (user) {
        console.info("link weibo->", user);
    })
    .catch(function (err) {
        console.info(err);
    });

```
---

### unlink

取消账户的特定登录方式

**定义**

unlink(providerId)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| providerId | string| _non-null_ | 野狗当前支持的各 Provider 的 ID : weibo、weixin、weixinmq、qq 和 password |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>


**示例**：

```js
// 取消微博登录
wilddog.auth().currentUser
    .unlink('weibo')
    .then(function () {
        console.info("unlink weibo success");
    })
    .catch(function (err) {
        console.info(err);
    });

```

---

### delete

删除当前用户，删除成功之后会退出登录

**定义**

delete()

**参数**

_无_

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>

---

### updateProfile

更新用户个人信息

**定义**

updateProfile(profile)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| profile | object| _non-null_ | profile 当前仅支持 `phototURL` 和 `displayName` **参数**，这两个参数至少需要有一个不为空 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

**示例**

```js
wilddog.auth().currentUser
    .updateProfile({
     'photoURL': photoUrl,
     'displayName': displayName,
    })
    .then(function (user) {
        console.info('update user ->', user);
    })
    .catch(function (err) {
        console.info("update user info failed.", err);
    });

```

---

### updateEmail

修改当前用户的邮箱，修改成功之后会触发 [onAuthStateChanged](/api/auth/web.html#onAuthStateChanged)

**定义**

updateEmail(email)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| email | string| _non-null_ | 新邮箱地址 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

---

### updatePassword

修改当前用户的密码，修改成功之后会触发 [onAuthStateChanged](/api/auth/web.html#onAuthStateChanged)

**定义**

updatePassword(password)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| password | string| _non-null_ | 新密码 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>


---

### reauthenticate

使用 [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) 为用户重新认证，某些敏感操作（比如更新用户密码）对用户认证时间有较为严格的要求，这个时候你可以调用这个方法来刷新用户的认证信息。

**定义**

reauthenticate(credential)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| credential | [wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential) | _non-null_ | 特定登录方式的认证凭据 |

**返回**
 
 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[wilddog.User](/api/auth/web.html#wilddog-User)>

**示例**

```js
// 根据用户邮箱和密码进行重新认证
wilddog.auth().currentUser
    .reauthenticate(wilddog.auth.EmailAuthProvider.credential(email, pwd))
    .then(function (user) { 
        console.info("link email.", user);
    })
    .catch(function (err) {
        console.info("link email failed.", err.code, err);
    });

```
---

### sendEmailVerification

为当前用户发送邮箱确认邮件

**定义**

sendEmailVerification()

**参数**

_无_

**返回**

 [wilddog.Promise](/api/auth/web.html#wilddog-Promise).<[Void](/api/auth/web.html#Void)>
 
---

## wilddog.Promise

*static*

一个 Promise 对象表示一个事件（异步的）的值。Promsie 事件应当被完成（resovle）或者拒绝（reject），这个时候它会回调我们通过 then() 和 catch() 指派给它的回调函数。更多关于 Promise 编程规范的信息请 [参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 

---

### then

为当前 Promise 对象指定一个 resolved 之后的回调函数。

**定义**

then(onResolved,[onReject])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| onResolved | function | _non-null_ | Promise resolved 时的回调函数，回传参数是 Promise 事件的返回值 |
| onReject | function | optional | Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回**

wilddog.Promise

---

### catch
为当前 Promise 对象指定一个 rejected 或异常后的回调函数。

**定义**

catch(onReject)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| onReject | function | _non-null_ | Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回**

[Void](/api/auth/web.html#Void)


---

## wilddog.auth.Provider

Provider 对象是本次 Auth 新增的接口，它的不同实现代表着不同的用户登录方式。野狗目前提供以下几种 Provider 实现：

| id | 类名 | 说明 |
|---|---|---|
|password | EmailAuthProvider | 通过邮箱和密码登录 |
|weibo | WeiboAuthProvider | 通过微博登录 |
|weixin | WeixinAuthProvider | 通过微信登录 |
|weixinmq | WeixinmqAuthProvider | 微信公众号登录 |
|qq | QQAuthProvider | 通过 QQ 登录 |

---

### credential
*static*
**定义**

credential(arg1, arg2)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| arg1 | string | _non-null_ | 当实现类为 `EmailAuthProvider` 时表示 `email`，其他时候表示 `accessToken` |
| arg2 | string | _non-null_ | 当实现类为 `EmailAuthProvider` 时表示 `password`，其他时候表示 `openId` |

**返回**

[wilddog.auth.Credential](/api/auth/web.html#wilddog-auth-Credential)

**示例**
```js
// 获取一个用于微博认证的 credential 实例
// 注意 credential 是一个静态方法，我们并不需要实例化一个 provider 来调用它
var weibo_credential = wilddog.auth.WeiboAuthProvider.credential(accessToken, openId);
// 获取一个用于邮箱认证的 credential 实例
var email_credential = wilddog.auth.EmailAuthProvider.credential(email, password);

```

---

## wilddog.auth.Credential

Credential 表示特定登录方式下的用户认证凭据，我们可以通过 [wilddog.auth.Provider](/api/auth/web.html#wilddog-auth-Provider) 的 [credential](/api/auth/web.html#credential) 方法来创建它。当前的 credential有两种形式：
- 账号密码 
    通过邮箱和密码登录
- OAuth
    通过各类第三方以 OAuth 认证的方式登录，野狗当前支持的第三方有微博、微信、微信公众号以及腾讯 QQ。


---

## Void

Promise 或 callback 指向 Void 时表示无参数回传。