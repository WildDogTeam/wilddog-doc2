
title:  自定义身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用自定义身份认证。



## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板—创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 控制面板—身份认证—登录方式—超级秘钥 中获取超级密钥。


## 实现自定义身份认证

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

3.当用户成功登录你的用户系统时，服务器通过 [Server SDK 生成 Custom Token](/guide/auth/server/server.html)，并返回给客户端。

4.客户端收到 Custom Token 后，使用 `signInWithCustomToken:` 方法进行认证：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth signInWithCustomToken:customToken
                 completion:^(WDGUser *_Nullable user, NSError *_Nullable error) {
                        // ...
                 }];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth?.signIn(withCustomToken: customToken) { (user, error) in
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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/iOS/index.html) 无缝集成：使用自定义身份认证后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/iOS/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/iOS/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。

