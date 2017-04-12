
title:  QQ 登录
---

本篇文档介绍在 Wilddog Auth 中如何使用 QQ 对用户进行身份认证。


## 前期准备
1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [QQ 互联](https://connect.qq.com)-我的应用 中，获取应用的 **APP ID** 和 **APP KEY**。
3. 在控制面板 身份认证—登录方式 中打开 QQ 登录方式，配置 QQ 帐号 **APP ID** 和 **APP KEY**。

## 实现 QQ 登录
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
WDGApp.configure(with: options)
```
</div>
</div>

3.参考 [QQ API 调用说明](http://wiki.open.qq.com/wiki/IOS_API%E8%B0%83%E7%94%A8%E8%AF%B4%E6%98%8E) 将 QQ 登录集成到应用中。当初始化 `TencentOAuth` 对象时，设置 delegate 来接收登录和登出事件:

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
_qqOAuth = [[TencentOAuth alloc] initWithAppId:@"your QQ App ID"
                                   andDelegate:self];
NSArray *permissions =  [NSArray arrayWithObjects:@"get_user_info", @"get_simple_userinfo", @"add_t", nil];
[_qqOAuth authorize:permissions inSafari:NO];
```
</div>
<div class="slide-content">
```swift
let qqOAuth = TencentOAuth(appId:"your QQ App ID", andDelegate: self)
let permissions = ["get_user_info", "get_simple_userinfo", "add_t"]
qqOAuth.authorize(permissions, inSafari: false)
```
</div>
</div>

在你的 delegate 中，实现 `tencentDidLogin` 方法。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
- (void)tencentDidLogin {
    // ...
}
```
</div>
<div class="slide-content">
```swift
func tencentDidLogin() {
   // ...     
}
```
</div>
</div>

4.QQ 登录成功后，在 `tencentDidLogin` 方法中通过 _qqOAuth 对象获取 accessToken 来生成 credential：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = 
[WDGQQAuthProvider credentialWithAccessToken:_qqOAuth.accessToken];
```
</div>
<div class="slide-content">
```swift
let credential = WDGQQAuthProvider.credential(withAccessToken: qqOAuth?.accessToken)
```
</div>
</div>

5.最后，使用 credential 来进行 Auth 用户认证：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[WDGAuth auth] signInWithCredential:credential
                completion:^(WDGUser *user, NSError *error) {
                            // ...
                          }];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.signIn(with: credential){(user, error) in
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

- 通过 `[WDGAuth auth].currentUser` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/iOS/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/iOS/index.html) 无缝集成：使用 QQ 登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/iOS/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/iOS/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。
