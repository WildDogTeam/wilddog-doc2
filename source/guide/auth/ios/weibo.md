title: 微博登录
---

通过集成新浪微博登录，你可以让你的用户使用他们的新浪微博帐号来进行 Wilddog 身份认证。

认证的用户可以访问野狗实时数据同步中用户登录受限的数据。

## 开始前的准备工作
1. 创建野狗应用。将下面 pod 添加到 `Podfile` 文件中：
```
pod 'Wilddog/Auth'
```
2. 在 [新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 **App Key** 和 **App Secret**。
3. 在野狗控制面板中打开新浪微博登录方式:
  * 在野狗控制面板中选择 ”身份认证“->登录方式。
  * 点击微信登录开关，点击配置，输入微信帐号 **APP ID** 和 **App Secret**。

## Wilddog 身份认证
1、 参考 [新浪微博 iOS 接入指南](https://github.com/sinaweibosdk/weibo_ios_sdk) 将新浪微博登录集成到你的应用中。在 AppDelegate 的 `application: openURL: options:` 方法中设置 delegate 来接收网络事件:

Objective-C
```objectivec
 - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options
 {
     if([url.absoluteString hasPrefix:@"wb"]) {
        return [WeiboSDK handleOpenURL:url delegate:self];
     }
     return NO;
 }
```

Swift
```swift
func application(app: UIApplication, openURL url: NSURL, options: [String : AnyObject]) -> Bool {
    if url.absoluteString.hasPrefix("wb") {
        return WeiboSDK.handleOpenURL(url, delegate: self)
    }
}
```

调用新浪微博的授权代码：

Objective-C
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
Swift
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

在你的 delegate 中，实现 `didReceiveWeiboResponse:` 方法，并从中获取用户登录的 accessToken 和 userID：

Objective-C
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
Swift
```swift
func didReceiveWeiboResponse(response: WBBaseResponse!){
    if response is WBAuthorizeResponse{
        let authResponse = response as! WBAuthorizeResponse
        let accessToken = authResponse.accessToken
        let openId = authResponse.userID
    }
}
```

2、 导入 WilddogAuth 模块：

Objective-C
```objectivec
@import WilddogAuth;
```
Swift
```swift
import WilddogAuth
```

3、 初始化 WDGApp:

Objective-C
```objectivec
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<your-wilddog-appid>.wilddogio.com"];
[WDGApp configureWithOptions:option];
```
Swift
```swift
let options = WDGOptions.init(syncURL: "https://<your-wilddog-appid>.wilddogio.com")
WDGApp.configureWithOptions(options)
```

4、 新浪微博登录成功后，在 `didReceiveWeiboResponse:` 方法中得到的 accessToken 和 userID 来生成 Wilddog 凭据：

Objective-C
```objectivec
WDGAuthCredential *credential = 
[WDGSinaAuthProvider credentialWithAccessToken:sinaOAuth.accessToken userID:userID];
```
Swift
```swift
let credential = WDGSinaAuthProvider.credentialWithAccessToken(sinaOAuth.accessToken, userID: sinaOAuth?.userID)
```

5、 最后，使用 Wilddog 凭据来进行 Wilddog 用户认证：

Objective-C
```objectivec
[[WDGAuth auth] signInWithCredential:credential
                completion:^(WDGUser *user, NSError *error) {
                            // ...
                          }];
```
Swift
```swift
WDGAuth.auth()?.signInWithCredential(credential){(user, error) in
    // ...
}
```

## 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。

* 在你的应用中，你可以通过 WDGUser 来获取用户的基本属性。参考 [管理用户](/guide/auth/ios/manageuser.html)。
* 在你的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

你还可以通过 [链接多种登录方式](/guide/auth/ios/link.html) 来实现不同的登录方式登录同一个帐号。

调用 [signOut:](/api/auth/ios.html#WDGAuth-Methods#-signOut:) 退出登录：

Objective-C
```objectivec
NSError *error;
[[WDGAuth auth] signOut:&error];
if (!error) {
    // 退出登录成功
}

```
Swift
```swift
try! WDGAuth.auth()!.signOut()

```
可能发生的错误，请参考 [处理错误](/guide/auth/ios/errorcode.html)。