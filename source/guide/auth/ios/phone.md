
title: 手机号登录
---

本篇文档介绍在 Wilddog Auth 中如何使用手机号和密码对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在控制面板 身份认证—登录方式 中打开手机号登录方式。

## 创建用户

用手机号密码创建一个新用户，需完成以下步骤：

1.安装 Wilddog Auth SDK：

将以下 pod 包含在你的 Podfile 中：

```
  pod 'Wilddog/Auth'
```

安装 SDK：

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

3.使用 `createUserWithPhone:password:completion: ` 方法创建新用户：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[WDGAuth auth] createUserWithPhone:@"13888888888"
                           password:@"password123"
                         completion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
   			 // ...
                         }];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.createUserWithPhone("13888888888", password: "password123") { 
  (user, error) in
  // ...
}
```
</div>
</div>


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果新用户创建成功，默认会处于登录状态，并且你可以在回调方法中获取登录用户。
</blockquote>


## 登录用户

1.安装 Wilddog Auth SDK：

将以下 pod 包含在你的 Podfile 中：

```
  pod 'Wilddog/Auth'
```

安装 SDK：

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

3.将该用户的手机号和密码传递到 `signInWithPhone:password:completion:`，即可在你应用中登录此用户：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[WDGAuth auth] signInWithPhone:@"18888888888"
                       password:@"password123"
                     completion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
                         // ...
                     }];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.signInWithPhone("18888888888", password: "password123") { (user, error) in
  // ...
}
```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果用户成功登录，你可以在回调方法中获取登录用户。
</blockquote>

## 验证用户手机号
1.发送验证用户的手机验证码：
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[user sendPhoneVerificationWithCompletion:^(NSError * _Nullable error) {
    //...
}];
```
</div>
<div class="slide-content">
```swift
user?.sendPhoneVerificationWithCompletion { (error) in
  // ...
}
```
</div>
</div>

2.确认验证用户手机验证码：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[user verifyPhoneWithSmsCode:realSms
                  completion:^(NSError * _Nullable error) {
                      //...
                  }];
```
</div>
<div class="slide-content">
```swift
user?.verifyPhoneWithSmsCode(realSms){ (error) in
  // ...
}
```
</div>
</div>

## 退出登录

`signOut:` 方法用于用户退出登录：

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




