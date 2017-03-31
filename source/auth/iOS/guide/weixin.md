
title:  微信登录
---

本篇文档介绍在 Wilddog Auth 中如何使用微信对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [微信开放平台管理中心](https://open.weixin.qq.com/)，获取应用的 **AppID** 和 **AppSecret**。
3. 在 控制面板 身份认证—登录方式 中打开微信登录方式，配置微信帐号 **AppID** 和 **AppSecret**。

## 实现微信登录
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

3.参考 [微信 iOS 接入指南](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=1417694084&token=202bb3157581f30a1fd92c713f9f9fc2356fc860&lang=zh_CN) 将微信登录集成到你的应用中。在 AppDelegate 的 `application: openURL: options:` 方法中设置 delegate 来接收网络事件:

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
 - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options
 {
     if ([url.absoluteString hasPrefix:@"wx"]) {
         return [WXApi handleOpenURL:url delegate:self];
     }
     return NO;
 }
```
</div>
<div class="slide-content">
```swift
func application(app: UIApplication, openURL url: NSURL, options: [String : AnyObject]) -> Bool {
    if url.absoluteString.hasPrefix("wx") {
        return WXApi.handleOpenURL(url, delegate: self)
    }
}
```
</div>
</div>

调用微信的授权代码：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
SendAuthReq *req = [SendAuthReq new];
req.scope = @"snsapi_userinfo" ;
req.state = @"osc_wechat_login" ;
// 第三方向微信终端发送一个 SendAuthReq 消息结构
[WXApi sendReq:req];
```
</div>
<div class="slide-content">
```swift
let req = SendAuthReq()
req.scope = "snsapi_userinfo"
req.state = "osc_wechat_login"
// 第三方向微信终端发送一个 SendAuthReq 消息结构
WXApi.sendReq(req)
```
</div>
</div>

在你的 delegate 中，实现 `onResp:` 方法，并从中获取用户登录的 code：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
 -(void)onResp:(BaseResp*)resp
 {
     SendAuthResp *response = (SendAuthResp*)resp;
     NSString *code = response.code;
 }
```
</div>
<div class="slide-content">
```swift
func onResp(resp: BaseResp!) {
    let response = resp as? SendAuthResp
    let code = response?.code
}
```
</div>
</div>

4.微信登录成功后，在 `onResp:` 方法中得到的 code 来生成 credential：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = 
[WDGWeiXinAuthProvider credentialWithCode:code];
```
</div>
<div class="slide-content">
```swift
let credential = WDGWeiXinAuthProvider.credential(withCode: weixinOAuth.code)
```
</div>
</div>

5.使用 credential 来进行 Auth 用户认证：

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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/iOS/index.html) 无缝集成：使用微信登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/iOS/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/iOS/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。