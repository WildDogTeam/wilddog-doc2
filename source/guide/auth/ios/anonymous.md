title: 匿名身份认证
---


本篇文档介绍在 Wilddog Auth 中如何使用临时匿名帐号来进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。

2. 在 控制面板 身份认证—登录方式 中打开匿名登录方式。

## 实现匿名身份认证

1.安装 Wilddog Auth SDK：

将以下 pod 包含在你的 Podfile 中：

```
  pod 'Wilddog/Auth'
```

最后安装 SDK

```
  $ pod install
```

2.创建 Wilddog Auth 实例：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<your-wilddog-appid>.wilddogio.com"];
[WDGApp configureWithOptions:option];
```
</div>
<div class="slide-content">
```swift
let options = WDGOptions.init(syncURL: "https://<your-wilddog-appid>.wilddogio.com")
WDGApp.configureWithOptions(options)
```
</div>
</div>

3、 调用 `signInAnonymouslyWithCompletion:`方法：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth signInAnonymouslyWithCompletion:^(WDGUser *_Nullable user, NSError *_Nullable error) {
   // ...
}];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth?.signInAnonymouslyWithCompletion(){(user, error) in
   //...
}
```
</div>
</div>

4、`signInAnonymouslyWithCompletion:` 方法调用成功后，可以在当前用户对象中获取用户数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
BOOL isAnonymous = user.anonymous;  // YES
NSString *uid = user.uid;
```
</div>
<div class="slide-content">
```swift
let isAnonymous = user!.anonymous  // true
let uid = user!.uid
```
</div>
</div>

## 匿名帐号转成永久帐号

匿名登录的账号数据将不会被保存，可以通过绑定邮箱认证或第三方认证方式将匿名账号转成永久账号。

### 绑定邮箱认证方式

绑定邮箱认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取邮箱认证方式的 credential。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential =
    [WDGEmailPasswordAuthProvider credentialWithEmail:email
                                             password:password];
```
</div>
<div class="slide-content">
```swift
let credential = WDGEmailPasswordAuthProvider.credentialWithEmail(email, password: password)

```
</div>
</div>

3.使用邮箱认证方式绑定。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth.currentUser linkWithCredential:credential completion:^(WDGUser *_Nullable user,NSError *_Nullable error) {
      // ...
}];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth!.currentUser?.linkWithCredential(credential) { (user, error) in
     // ...
}

```
</div>
</div>


### 绑定第三方认证方式

绑定第三方认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取需要绑定认证方式的 credential。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// QQ 认证
WDGAuthCredential *credential = [WDGQQAuthProvider credentialWithAccessToken:qqOAuth.accessToken];

// 微博认证
WDGAuthCredential *credential = [WDGSinaAuthProvider credentialWithAccessToken:sinaOAuth.accessToken 
                   userID:sinaOAuth.userID];

// 微信认证
WDGAuthCredential *credential = [WDGWeiXinAuthProvider credentialWithCode:weixinOAuth.code];

```
</div>
<div class="slide-content">
```swift
// QQ 认证
let credential = WDGQQAuthProvider.credentialWithAccessToken(qqOAuth.accessToken)

// 微博认证
let credential = WDGSinaAuthProvider.credentialWithAccessToken(sinaOAuth.accessToken, userID: sinaOAuth.userID)

// 微信认证
let credential = WDGWeiXinAuthProvider.credentialWithCode(weixinOAuth.code)

```
</div>
</div>


3.使用第三方认证方式绑定。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth.currentUser linkWithCredential:credential completion:^(WDGUser *_Nullable user,NSError *_Nullable error) {
      // ...
}];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth!.currentUser?.linkWithCredential(credential) { (user, error) in
     // ...
}

```
</div>
</div>

更多认证绑定方式，请参考 [API 文档](https://docs.wilddog.com/api/auth/ios/api.html#link)。

> **注意：**若使用 customToken 登录时，若 customToken 中 admin 属性为 true，则不能进行关联操作。


## 退出登录

`signOut` 方法用于用户退出登录：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
NSError *error;
[[WDGAuth auth] signOut:&error];
if (!error) {
    // 退出登录成功
}

```
</div>
<div class="slide-content">
```swift
try! WDGAuth.auth()!.signOut()

```
</div>
</div>

## 更多使用

- 通过 `[WDGAuth auth].currentUser` 获取当前用户并管理用户。详情请参考 [管理用户](/guide/auth/ios/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用匿名登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。

