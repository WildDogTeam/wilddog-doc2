title: 管理 Wilddog 中的用户
---

### 创建用户

通过调用 `createUserWithEmailAndPassword(email,password) 方法或首次使用第三方登录方式（如 QQ 或 Weixin）登录一个用户，就可以在您的 Wilddog 项目中创建一个新用户。

您也可以从 Wilddog 控制面板的身份“认证部分”的“用户”页面中创建新的密码验证用户。

### 获取当前登录的用户


获取当前用户的推荐方法是在 Auth 对象上设置一个侦听器：

```
wilddog.auth().onAuthStateChanged(function(user) {
  if (user) {
     console.log("wxl");
  } else {
     console.log("no user");
  }
});
```

使用侦听器可保证在您获取当前用户时 Auth 对象不会处于中间状态如初始化。


您也可以使用 `currentUser` 属性获取当前已登录的用户。 如果用户没有登录，`currentUser` 则为空：


```
var user = wilddog.auth().currentUser;
if (user != nil) {
     // User is signed in.
} else {
     // No user is signed in.
}
```

注：`currentUser` 可能为空，这是因为 auth 对象尚未完成初始化。 如果您使用侦听器跟踪用户登录状态，您将无需处理该情况。

### 获取用户个人资料

要获取用户的个人资料信息，请使用 `User` 实例的属性。 例如：


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
### 获取用户的第三方登录的个人资料信息

要从已链接至用户的第三方登录中获取检索到的个人资料信息，请使用 providerData 属性。 例如：

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

### 更新用户个人资料

您可以使用`WDGUserProfileChangeRequest` 类来更新一个用户的基本个人资料信息 — 用户的显示名称和个人资料照片网址。 例如：

```
wilddog.auth().currentUser.updateProfile({
     displayName: "Jane Q. User",
     photoURL: "https://example.com/jane-q-user/profile.jpg"
 }).then(function() {
     // Update successful.
 }, function(error) {
     // An error happened.
 });
```

### 设置用户的电子邮件地址


您可以用 `updateEmail:completion:` 方法设置用户的电子邮件地址。例如：

```
wilddog.auth().currentUser.updateEmail(email).then(function() {
     // Update successful.
 }, function(error) {
     // An error happened.
     console.log(error);
 });

```

重要说明：要设置用户的电子邮件地址，该用户必须最近登录过。请参阅对用户重新进行身份验证。


### 设置用户密码

您可以使用 `updatePassword:completion:` 方法设置用户密码。例如：

```
wilddog.auth().currentUser.updatePassword("12345678").then(function() {
     // Update successful.
     console.log("");
 }, function(error) {
     console.log(error);
     // An error happened. 
});

```

重要说明：要设置用户的电子邮件地址，该用户必须最近登录过。请参阅对用户重新进行身份验证。


### 发送重设密码电子邮件


您可以用 `sendPasswordResetWithEmail:completion:` 方法向用户发送一封重设密码电子邮件。 例如：



```
wilddog.auth().sendPasswordResetEmail(email);
```

您可以在 Wilddog 控制面板的“用户认证”部分的“邮件模版”页面中自定义使用的电子邮件模板。


您也可以从 Wilddog 控制面板中发送重设密码电子邮件。


### 删除用户

您可以使用 `delete` 方法删除用户帐户。例如：



```
wilddog.auth().currentUser.delete();
```
您可以从 Wilddog 控制面板的“用户认证”部分的“用户”页面中删除用户。

重要说明：要删除用户，该用户必须最近登录过。请参阅对用户重新进行身份验证。



### 对用户重新进行身份验证

有些安全敏感性操作—如删除帐户、设置主电子邮件地址和更改密码—需要用户最近登录过方可执行。

如果您执行这些操作之一，而该用户在很久以前登录过，该操作便会失败。

发生这种错误时，请通过从用户获取新登录凭据并将该凭据传递到 `reauthenticate`，对该用户重新进行身份验证。 例如：



```
 wilddog.auth().currentUser.reauthenticate(credential).then(function(res) {
     // Update successful.
     console.log(res);
 }, function(error) {
     // An error happened.
     console.log(error);
 });
```
