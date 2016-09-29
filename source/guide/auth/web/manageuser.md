
title: 用户管理
---

本篇文档介绍如何使用 Wilddog Auth 来进行用户管理。

## 创建用户

创建用户的方式有三种

- [邮箱登录](/guide/auth/web/password.html)

- 第三方认证授权

- 从 **控制面板—身份认证—用户**中手动创建用户


## 获取当前登录用户

获取当前用户有两种方法：

- Auth 对象上设置监听器
- 使用`currentUser`

推荐使用监听器，这样可以保证在你获取当前用户时 Auth 对象不会处于中间状态如初始化。

使用监听器

```
wilddog.auth().onAuthStateChanged(function(user) {
  if (user) {
     console.log("wxl");
  } else {
     console.log("no user");
  }
});
```

使用`currentUser`


```
var user = wilddog.auth().currentUser;
if (user != null) {
     // User is signed in.
} else {
     // No user is signed in.
}
```

> **注意：**如果用户没有登录，`currentUser` 则为空。如果你使用侦听器跟踪用户登录状态，你将无需处理该情况。

## 获取个人资料

使用 `User` 实例的属性可以获取用户的个人资料信息。


```
var user = wilddog.auth().currentUser;
if (user != null) {
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var uid = user.uid; 
} else {
 // No user is signed in.
}

```
## 获取第三方个人资料信息

使用`providerData`获得第三方个人信息资料。

```
var user = wilddog.auth().currentUser;
 console.log(user);
 user.providerData.forEach(function (profile) {
 console.log("Sign-in provider: " + profile.providerId);
 console.log(" Provider-specific UID: " + profile.uid);
 console.log(" Name: " + profile.displayName);
 console.log(" Email: " + profile.email);
 console.log(" Photo URL: " + profile.photoURL);
 });


```

## 更新个人资料

`updateProfile()`方法可以更新用户的个人资料。

```
wilddog.auth().currentUser.updateProfile({
     displayName: "name",
     photoURL: "https://example.com/path/photo.jpg"
 }).then(function() {
     // Update successful.
 }, function(error) {
     // An error happened.
 });
```
> **注意：**使用 customToken 登录时,若 customToken 中 admin 属性为 true，则不能进行信息修改。

## 设置邮箱地址

 `updateEmail()方法`可以更新用户的电子邮箱地址。

```
wilddog.auth().currentUser.updateEmail(email).then(function() {
     // Update successful.
 }, function(error) {
     // An error happened.
     console.log(error);
 });
```

> **注意：**
- 要设置用户的电子邮件地址，该用户必须最近登录过。请参阅对用户重新进行身份认证。
- 重要说明：使用 customToken 登录时,若 customToken 中 admin 属性为 true，则不能进行信息修改


## 设置用户密码

`updatePassword()` 方法可以设置用户密码

```
wilddog.auth().currentUser.updatePassword("12345678").then(function() {
     // Update successful.
     console.log("");
 }, function(error) {
     console.log(error);
     // An error happened. 
});
注意:使用customToken登录时,若customToken中admin属性为true,则不能进行密码修改
```

> **注意：**
- 要设置密码，该用户必须最近登录过。请参阅对用户重新进行身份认证。
- 重要说明：使用 customToken 登录时,若 customToken 中 admin 属性为 true，则不能进行信息修改


## 发送重设密码邮件

 `sendPasswordResetWithEmail()` 方法可以向用户发送一封重设密码电子邮件。

```javascript
wilddog.auth().sendPasswordResetEmail(email);
```

在 Wilddog 控制面板的**身份认证—登录方式—邮箱登录**中可以设置自定义模板。


## 删除用户

删除用户的方式有两种：

- 使用`delete()` 方法用于删除用户
- 在控制面板的**身份认证—用户**用删除用户

使用`delete()`方法

```
wilddog.auth().currentUser.delete();
```
使用控制面板

 ![](/images/deleteuser.jpg)

> **注意：**
- 要删除用户，该用户必须最近登录过。请参阅对用户重新进行身份认证。
- 重要说明：使用 customToken 登录时,若 customToken 中 admin 属性为 true，则不能进行信息修改




## 重新进行身份认证

用户长时间未登录的情况下进行下列安全敏感操作会失败：

- 删除账户
- 设置主邮箱地址
- 更改密码

此时需要重新对用户进行身份认证。

你可以从用户获取新登录凭据并将该凭据传递到 `reauthenticate`，对该用户重新进行身份认证。

```
 wilddog.auth().currentUser.reauthenticate(credential).then(function(res) {
     // Update successful.
     console.log(res);
 }, function(error) {
     // An error happened.
     console.log(error);
 });
```
