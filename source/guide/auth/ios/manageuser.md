
title: 用户管理
---

本篇文档介绍如何使用 Wilddog Auth 管理用户。它包括：创建用户、获取用户信息、获取用户属性、更新用户信息、删除用户等。

## 创建用户

创建用户包含以下三种方法：

- 通过 [邮箱密码](/guide/auth/ios/password.html) 创建
- 通过第三方身份认证提供商授权创建
- 在 控制面板—身份认证—用户 中手动创建


## 获取用户信息

用户信息包含 [用户属性](/guide/auth/core/concept.html#用户属性) 及用户的登录信息。



### 获取当前登录用户

获取当前登录用户是管理用户的基础。

获取当前登录用户包含以下两种方法：

- 在 `Auth` 实例上设置监听器
- 使用 `currentUser` 方法

使用监听器：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[WDGAuth auth] addAuthStateDidChangeListener:^(WDGAuth *_Nonnull auth,
                                                WDGUser *_Nullable user) {
  if (user != nil) {
    // 用户已登录
  } else {
    // 没有用户登录
  }
}];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.addAuthStateDidChangeListener{ auth, user in
    if let user = user {
        // 用户已登录
    } else {
        // 没有用户登录
    }
}
```
</div>
</div>

使用 `currentUser` 方法：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;

if (user != nil) {
  // 用户已登录
} else {
  // 没有用户登录
}
```
</div>
<div class="slide-content">
```swift
if let user = WDGAuth.auth()?.currentUser {
    // 用户已登录
} else {
    // 没有用户登录
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  推荐使用监听器，这样可以保证在你获取当前用户时 Auth 实例不会处于中间状态，如用户正在登录时。
</blockquote>


### 获取用户属性

 `WDGUser` 实例可以用于获取用户属性。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;

if (user != nil) {
  NSString *name = user.displayName;
  NSString *email = user.email;
  NSURL *photoUrl = user.photoURL;
  NSString *uid = user.uid;       
} else {
  // 没有用户登录
}
```
</div>
<div class="slide-content">
```swift
if let user = WDGAuth.auth()?.currentUser {
    let name = user.displayName
    let email = user.email
    let photoUrl = user.photoURL
    let uid = user.id;  
} else {
    // 没有用户登录
}
```
</div>
</div>

### 获取 Provider 的用户属性

 `providerData` 用于获取所有 [Provider](/guide/auth/core/concept.html#Provider) 的用户属性。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;

if (user != nil) {
  for (WDGUserInfo *profile in user.providerData) {
    NSString *providerID = profile.providerID;
    NSString *uid = profile.uid;  // Provider-specific UID
    NSString *name = profile.displayName;
    NSString *email = profile.email;
    NSURL *photoURL = profile.photoURL;
  }
} else {
  // 没有用户登录
}
```
</div>
<div class="slide-content">
```swift
if let user = WDGAuth.auth()?.currentUser {
    for profile in user.providerData {
        let providerID = profile.providerID
        let uid = profile.uid;  // Provider-specific UID
        let name = profile.displayName
        let email = profile.email
        let photoURL = profile.photoURL
    }
} else {
    // 没有用户登录
}
```
</div>
</div>

## 更新用户信息

User 实例用于更新 用户属性 及用户的登录信息。

### 更新用户属性

`WDGUserProfileChangeRequest` 类用于更新用户属性。

例如，更新用户的`displayName` 和 `photoURL` 属性：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;
WDGUserProfileChangeRequest *changeRequest = [user profileChangeRequest];

changeRequest.displayName = @"JianDong. User";
changeRequest.photoURL =
    [NSURL URLWithString:@"https://example.com/jane-q-user/profile.jpg"];
[changeRequest commitChangesWithCompletion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 更新成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let user = WDGAuth.auth()?.currentUser
if let user = user {
    let changeRequest = user.profileChangeRequest()
    
    changeRequest.displayName = "Jane Q. User"
    changeRequest.photoURL =
        NSURL(string: "https://example.com/jane-q-user/profile.jpg")
    changeRequest.commitChangesWithCompletion { error in
        if let error = error {
            // 发生错误
        } else {
            // 更新成功
        }
    }
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户属性。
</blockquote>

### 更新邮箱地址

 `updateEmail:completion:` 方法用于更新用户邮箱地址。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;

[user updateEmail:@"user@example.com" completion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 更新成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let user = WDGAuth.auth()?.currentUser

user?.updateEmail("user@example.com") { error in
    if let error = error {
        // 发生错误
    } else {
        // 更新成功
    }
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要更新用户的邮箱地址，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/ios/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新邮箱地址。</li>
  </ul>
</blockquote>


### 更新用户密码

`updatePassword:completion:` 方法用于更新用户密码。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;
NSString *newPassword = [yourApp getRandomSecurePassword];

[user updatePassword:newPassword completion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 更新成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let user = WDGAuth.auth()?.currentUser
let newPassword = getRandomSecurePassword()

user?.updatePassword(newPassword) { error in
    if let error = error {
        // 发生错误
    } else {
        // 更新成功
    }
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要更新密码，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/ios/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户密码。</li>
  </ul>
</blockquote>


### 发送重设密码邮件

`sendPasswordResetWithEmail:completion:` 方法用于向用户发送重设密码邮件。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
NSString *email = @"user@example.com";

[[WDGAuth auth] sendPasswordResetWithEmail:email
                                completion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 发送成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let email = "user@example.com"

WDGAuth.auth()?.sendPasswordResetWithEmail(email) { error in
    if let error = error {
        // 发生错误
    } else {
        // 发送成功
    }
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  在控制面板 身份认证—登录方式—邮箱登录 中可以设置邮件自定义模板。
</blockquote>


## 删除用户

删除用户的方式有以下两种：

- 通过 `deleteWithCompletion:` 方法删除
- 在控制面板**身份认证—用户** 中手动删除

使用 `deleteWithCompletion:` 方法：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;

[user deleteWithCompletion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 删除成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let user = WDGAuth.auth()?.currentUser

user?.deleteWithCompletion { error in
    if let error = error {
        // 发生错误
    } else {
        // 删除成功
    }
}
```
</div>
</div>

使用控制面板：

 ![](/images/deleteuser.jpg)

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要删除用户，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/ios/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户密码。</li>
  </ul>
</blockquote>


## 重新进行身份认证

用户长时间未登录的情况下进行下列安全敏感操作会失败：

- 删除帐户
- 设置主邮箱地址
- 更改密码

此时需要重新对用户进行身份认证。

`reauthenticateWithCredential:` 方法用于对用户重新进行身份认证。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *user = [WDGAuth auth].currentUser;
WDGAuthCredential *credential; // 需要初始化

// Prompt the user to re-provide their sign-in credentials

[user reauthenticateWithCredential:credential completion:^(NSError *_Nullable error) {
  if (error) {
    // 发生错误
  } else {
    // 重新认证成功
  }
}];
```
</div>
<div class="slide-content">
```swift
let user = WDGAuth.auth()?.currentUser
var credential: WDGAuthCredential // 需要初始化

// Prompt the user to re-provide their sign-in credentials

user?.reauthenticateWithCredential(credential) { error in
    if let error = error {
        // 发生错误
    } else {
        // 重新认证成功
    }
})
```
</div>
</div>