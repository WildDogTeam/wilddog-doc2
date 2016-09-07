title:  完整 API 文档
---

# Auth

## createUserWithEmailAndPassword()

创建邮箱密码登录

`wilddog.auth().createUserWithEmailAndPassword(email, pwd) returns `[wilddog.Promise](/api/auth/web.html#wilddog-Promise)

示例：

```js
wilddog.auth().createUserWithEmailAndPassword(email, pwd).then(function (user) {
     console.info("user created.", user);
 }).catch(function (err, more) { 
     console.info("create user failed.", err, more);
 });
```

## signInAnonymously()

匿名用户登录

`wilddog.auth().signInAnonymously() returns` [wilddog.Promise](/api/auth/web.html#wilddog-Promise)

示例：

```js
    wilddog.auth().signInAnonymously().then(function (result){
            console.info("signInAnouymously success", result)
        }).catch(function(err){
            console.info("signInAnouymously failed",err)
        })
    }
```

## signInWithEmailAndPassword()

邮箱密码登录 

`wilddog.auth().signInWithEmailAndPassword(email, pwd) returns` [wilddog.Promise](/api/auth/web.html#wilddog-Promise)

示例：

```js
for example:
wilddog.auth().signInWithEmailAndPassword(email,pwd).then(function (a, b) { 
    console.info("login success->", a, b);    
    console.info("currentUser->",wilddog.auth().currentUser);
}).catch(function (a, b) {
    console.info('login failed ->', a, b);
});
```

## signInWithPopup()

OAuth登录\(popup\)

`wilddog.auth().signInWithPopup(provider) returns `[wilddog.Promise](/api/auth/web.html#wilddog-Promise)

示例:

```js
//for example: weibo OAuth

var weiboProvider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithPopup(weiboProvider).then(function () {

 });
```
## signInWithRedirect()

OAuth登录\(redirect\)

`wilddog.auth().signInWithRedirect(provider) return `[wilddog.Promise](/api/auth/web.html#wilddog-Promise)

示例：

```js
//for example : weibo OAuth
var weiboProvider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().signInWithRedirect(weiboProvider).then(function () {
 console.info("signInWithRedirect success.")
 });

```

## signInWithCustomToken()

通过customToken登录

`wilddog.auth().signInWithCustomToken(token) return` [wilddog.Promise](/api/auth/web.html#wilddog-Promise)

* 监听用户状态

`wilddog.auth().onAuthStateChanged`

示例：

```js
//for example: 

wilddog.auth().onAuthStateChanged(function (user) {
 console.info("onAuthStateChanged",user);
 });

```

## sendPasswordResetEmail()

重置密码

`wilddog.auth().sendPasswordResetEmail(email) returns ` [wilddog.Promise](/api/auth/web.html#wilddog-Promise)

## signInWithCredential()

通过[credential](/api/auth/web.html#Credential)登录

`wilddog.auth().signInWithCredential(credential) returns`
[wilddog.Promise](/api/auth/web.html#wilddog-Promise)

credential为用户凭证,是使用的凭证
目前有两种凭证:

    1:账号密码登录方式中的账号和密码
    2:OAuth登录中的accessToken

示例：

```js

//for example : 
var credential = wilddog.auth.WeiboAuthProvider.credential(accessToken);
wilddog.auth().signInWithCredential(credential)

```
## signOut()

登出

```js
wilddog.auth().signOut();
```
示例:

```js
if (wilddog.auth().currentUser) {
     wilddog.auth().signOut();
}
```

# auth().currentUser


## currentUser.link()

通过credential关联登录方式

`wilddog.auth().currentUser.link(wilddog.auth.EmailAuthProvider.credential(email, pwd)`

示例：

```js
wilddog.auth().currentUser.link(wilddog.auth.EmailAuthProvider.credential(email, pwd)).then(function (user) { 
    console.info("link email.", user);
}).catch(function (err, more) {
    console.info("link email failed.", err.code, err, user);
});

```
## currentUser.linkWithPopup()

通过Oauth的popup关联登录方式

`wilddog.auth().currentUser.linkWithPopup(provider)`

示例：

```js
for example : Weibo OAuth
wilddog.auth().currentUser.linkWithPopup(weiboProvider).then(function (res) {
 console.info("link weibo->", res);
}).catch(function (err) {
 console.info(err);
});


```
## currentUser.linkWithRedirect()

通过Oauth的redirect关联登录方式

`wilddog.auth().currentUser.linkWithRedirect(provider)`

示例：

```js
for example : Weibo OAuth
wilddog.auth().currentUser.linkWithPopup(weiboProvider).then(function (res) {
 console.info("link weibo->", res);
}).catch(function (err) {
 console.info(err);
});

```

## currentUser.unlink()

取消账户的登录方式

`wilddog.auth().currentUser.unlink(providerId)`

示例：

```js
providerId目前一共有5种,包括password(账号密码登录),weibo(微博OAuth),weixin(微信),qq,weixinmp
wilddog.auth().currentUser.unlink('weibo').then(function (res) {
 console.info("unlink weibo->", res);
}).catch(function (err) {
 console.info(err);
});

```
## currentUser.delete() 

删除用户

`wilddog.auth().currentUser.delete()`

- 更新账户信息

`wilddog.auth().currentUser.updateProfile();`

示例：

```js
//修改用户的属性,目前包括displayName和photoUrl
//for example :
wilddog.auth().currentUser.updateProfile({
 'photoURL': photoUrl,
 'displayName': displayName,
}).then(function (res) {
 console.info('update user ->', res);
}).catch(function (err) {
 console.info("update user info failed.", err);
});

```
## currentUser.updateEmail()

更新邮箱

`wilddog.auth().currentUser.updateEmail(email);`

## currentUser.updatePassword()

更新密码

`wilddog.auth().currentUser.updatePassword(password)`

## currentUser.reauthenticate()

更新认证

`wilddog.auth().currentUser.reauthenticate(credential)`

## currentUser.sendEmailVerification()

发送邮箱确认邮件

`wilddog.auth().currentUser.sendEmailVerification()`

## wilddog.Promise

*class static*
  ```A Promise represents an eventual (asynchronous) value. A Promise should (eventually) either resolve or reject. When it does, it will call all the callback functions that have been assigned via the .then() or .catch() methods.```

Constructor    
- new Promise(resolver)

Main Methods
- catch
    Assign a callback when the Promise rejects.
- then
    Assign callback functions called where the Promise eather resolves, or is reject.

## Credential

本次Auth增加Credential的概念

credential有两种形式
- 账号密码
- OAuth

例如email登录方式

`var credential = wilddog.auth.EmailAuthProvider.credential(email,password)`

例如微博登录方式

`var credentail = wilddog.auth.WeiboAuthProvider.credential(Weibo.access_token)` 