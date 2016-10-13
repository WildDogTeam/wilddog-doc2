
title: Auth
---

wilddog.Auth 对象负责用户认证及密码找回等功能，它不能直接创建，只能通过 wilddog.App 实例的 [auth](/api/auth/web.html#auth) 方法获得。

## 属性

### currentUser

**定义**

```js
(wilddog.User or null)
```
**返回值**

[wilddog.User](/api/auth/web/User.html)

**说明**

同步的获取当前缓存的用户，如果没有登录用户则为 null。



</br>

------

## 方法

### onAuthStateChanged

**定义**

```objectivec
onAuthStateChanged(callback)
```

 **说明**

监听用户的状态。

**参数**

| 参数名      | 描述                                       |
| -------- | ---------------------------------------- |
| callback | 定义为function([user](/api/auth/web/User.html))，auth 状态变为登录状态时传回 user 对象，auth 状态变为登出时返回值为 null。 |


**示例**

```js
// 开始监听
var stopListen = wilddog.auth().onAuthStateChanged(function (user) {
 console.info("auth state changed ->",user);
 });
// 停止监听
stopListen();

```

</br>

----

### createUserWithEmailAndPassword

**定义**

```js
createUserWithEmailAndPassword(email, password)
```

**说明**

创建一个新用户，创建成功后会自动登录。

**参数**

| 参数名      | 描述       |
| -------- | -------- |
| email    | 用户的邮箱地址。 |
| password | 用户指定的密码。 |

**返回值**

[wilddog.User](/api/auth/web/User.html) 对象

**参考**

可能发生的错误：

- invalid_email 表示邮箱格式错误。
- email_already_in_use 表示邮箱已经被注册。
- authentication_disabled 表示邮箱登录方式没有打开，可以在野狗的控制面板中打开这个选项。
- invalid_password 密码不符合规定。
- [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

</br>

----

### signInAnonymously

**定义**

```js
signInAnonymously()
```

 **说明**

匿名登录方式。


**描述**

可能发生的错误：

- authentication_disabled 表示匿名方式没有打开，可以在野狗的控制面板中打开这个选项。

</br>

----
### signInWithEmailAndPassword

**定义**

```js
wilddog.auth().signInWithEmailAndPassword(email, password)
```

**说明**

以邮箱和密码的方式登录。

**参数**

| 参数名      | 描述       |
| -------- | -------- |
| email    | 用户的邮箱地址。 |
| password | 用户指定的密码。 |

**参考**

可能发生的错误：

- invalid_email 表示邮箱格式错误。
- email_already_in_use 表示邮箱已经被注册。
- authentication_disabled 表示邮箱登录方式没有打开，可以在野狗的控制面板中打开这个选项。
- invalid_password 密码不符合规定。
- [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

<br/>

----

### signInWithPopup

**定义**

```js
signInWithPopup(provider)
```

**说明**

通过弹出窗口的方式进行 OAuth 登录。

**参数**


| 参数名      | 描述                                       |
| -------- | ---------------------------------------- |
| provider | [provider](/api/auth/web/Provider.html)为特定身份提供商实例。 |

**参考**

```js
//微博登录
var weiboProvider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithPopup(weiboProvider).then(function () {
    console.info("login success", wilddog.auth().currentUser)
}).catch(function(err){
    console.info("login failed", err)
});
```

**参考**

使用第三方认证方式进行 Popup 登录。

可能发生的错误：

-  authentication_disabled 表示 Oauth 登录方式没有打开，可以在野狗的控制面板中打开这个选项。
-  [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。




----

### signInWithRedirect

**定义**

```js
signInWithRedirect(provider)
```

**说明**

通过浏览器跳转的方式进行 OAuth 登录。

**参数**


| 参数名      | 描述                                       |
| -------- | ---------------------------------------- |
| provider | [provider](/api/auth/web/Provider.html) 为特定身份提供商实例。 |

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
**参考**

可能发生的错误：

-  authentication_disabled 表示 Oauth 登录方式没有打开，可以在野狗的控制面板中打开这个选项。
-  [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

</br>

----


### signInWithCustomToken

**定义**

```js
signInWithCustomToken(token)
```

**说明**

以自定义 token 的方式登录。

**参数**


| 参数名   | 描述          |
| ----- | ----------- |
| token | 自定义的 token。 |

**示例**

```js
wilddog.auth().signInWithCustomToken(token).then(function () {
    console.info("login success", wilddog.auth().currentUser)
}).catch(function(err){
    console.info("login failed", err)
});

```

**参考**

可能发生的错误：

- invalid_token  无效的 custom token。
- [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

</br>

----
### signInWithCredential

**定义**

```js
signInWithCredential(credential)
```

 **说明**

使用第三方认证方式登录（e.g. 新浪微博，qq，weixin 授权后使用它们的 Access Token 和 openId 在野狗服务器上生成用户）

**参数**

| 参数名        | 描述                                       |
| ---------- | ---------------------------------------- |
| credential | [wilddog.auth.Credential](/api/auth/web/Credential.html) 第三方提供的凭证。 |

**示例**

```js
// 凭借已经获取到的微博 accessToken 来登录
var credential = wilddog.auth.WeiboAuthProvider.credential(accessToken);
wilddog.auth().signInWithCredential(credential).then(function(user){
        console.info('login success', user);
}).catch(function(err){
        console.info('login failed', err);
});

```
**参考**

可能发生的错误：

- authentication_disabled 表示这种登录方式没有打开，可以在野狗控制面板中打开这个选项。
- invalid_email 表示邮箱错误。
- invalid_password 表示密码错误。
- [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

</br>

----

### sendPasswordResetEmail

**定义**

```objectivec
sendPasswordResetEmail(email)
```

 **说明**

通过邮箱找回密码。

**参数**

| 参数名   | 描述                 |
| ----- | ------------------ |
| email | string 类型，用户的邮箱地址。 |

**参考**

可能发生的错误：
- invalid_email 表示邮箱错误。
- [See AuthErrors API](/api/auth/web/Error.html) 调用可能发生的所有错误。

</br>

----

### signOut

**定义**

```js
signOut()
```

**说明**

退出登录。

**返回值**

[wilddog.Promise](/api/auth/web/Promise.html).<[Void](/api/auth/web/Void.html)>


