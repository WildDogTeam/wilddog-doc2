
title:  微博登录
---


本篇文档介绍在 Wilddog Auth 中如何使用新浪微博对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 **App Key** 和 **App Secret**。
3. 在控制面板 身份认证—登录方式 中打开微博登录方式，配置 **App Key** 和 **App Secret**。

## 实现微博认证
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

3.参考 [新浪微博 iOS 接入指南](https://github.com/sinaweibosdk/weibo_ios_sdk) 将新浪微博登录集成到你的应用中。在 AppDelegate 的 `application: openURL: options:` 方法中设置 delegate 来接收网络事件:

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
 - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options
 {
     if([url.absoluteString hasPrefix:@"wb"]) {
        return [WeiboSDK handleOpenURL:url delegate:self];
     }
     return NO;
 }
```
</div>
<div class="slide-content">
```swift
func application(app: UIApplication, openURL url: NSURL, options: [String : AnyObject]) -> Bool {
    if url.absoluteString.hasPrefix("wb") {
        return WeiboSDK.handleOpenURL(url, delegate: self)
    }
}
```
</div>
</div>

调用新浪微博的授权代码：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
 WBAuthorizeRequest *request = [WBAuthorizeRequest request];
 request.redirectURI = @"https://api.weibo.com/oauth2/default.html";
 request.scope = @"all";
 request.userInfo = @{@"SSO_From": @"SendMessageToWeiboViewController",
                      @"Other_Info_1": [NSNumber numberWithInt:123],
                      @"Other_Info_2": @[@"obj1", @"obj2"],
                      @"Other_Info_3": @{@"key1": @"obj1", @"key2": @"obj2"}};
    
 [WeiboSDK sendRequest:request];
```
</div>
<div class="slide-content">
```swift
let request = WBAuthorizeRequest.request() as! WBAuthorizeRequest
request.redirectURI = "https://api.weibo.com/oauth2/default.html"
request.scope = "all"
request.userInfo = ["SSO_From": "SendMessageToWeiboViewController",
                    "Other_Info_1": NSNumber(int: Int32(123)),
                    "Other_Info_2": ["obj1", "obj2"],
                    "Other_Info_3": ["key1": "obj1", "key2": "obj2"]]
WeiboSDK.sendRequest(request)
```
</div>
</div>

在你的 delegate 中，实现 `didReceiveWeiboResponse:` 方法，并从中获取用户登录的 accessToken 和 userID：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
 - (void)didReceiveWeiboResponse:(WBBaseResponse *)response
{
    if ([response isKindOfClass:WBAuthorizeResponse.class])
    {
        WBAuthorizeResponse *authResponse = (WBAuthorizeResponse *)response;
        NSString *accessToken = authResponse.accessToken;
        NSString *openId = authResponse.userID;
    }
}
```
</div>
<div class="slide-content">
```swift
func didReceiveWeiboResponse(response: WBBaseResponse!){
    if response is WBAuthorizeResponse{
        let authResponse = response as! WBAuthorizeResponse
        let accessToken = authResponse.accessToken
        let openId = authResponse.userID
    }
}
```
</div>
</div>

4.新浪微博登录成功后，在 `didReceiveWeiboResponse:` 方法中得到的 accessToken 和 userID 生成 credential：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = 
[WDGSinaAuthProvider credentialWithAccessToken:sinaOAuth.accessToken userID:userID];
```
</div>
<div class="slide-content">
```swift
let credential = WDGSinaAuthProvider.credential(withAccessToken: sinaOAuth.accessToken, userID: sinaOAuth?.userID)
```
</div>
</div>

5.使用 credential 进行 Auth 用户认证：

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


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/iOS/index.html) 无缝集成：使用微博登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/iOS/guide/concept.html)。Wilddog ID 结合 [规则表达式](/sync/iOS/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。
