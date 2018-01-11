title: 安装和初始化
---

本篇文档介绍如何安装 SDK 并初始化 WilddogVideoCall。


## 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Auth SDK。

* 在 Xcode 中创建一个工程，并在 terminal 中用 `cd` 命令进入到工程所在文件夹内，执行 `pod init` 命令；
* 打开生成的 `Podfile` 文件，在第一行声明开发平台和版本（如iOS 8.0），并在随后写入要引入的库：

```ruby
platform :ios, '8.0'
target 'your-target-name' do
  pod 'WilddogVideoCall'
end
```
* 保存 `Podfile`，并执行 `pod install` 命令，将上述依赖安装到你的工程。
* 双击生成的 `your-project-name.xcworkspace` 文件打开工程。


## 初始化

在使用 WilddogVideoCall SDK 之前，需要用 VideoAppId 和 token 初始化 [WDGVideoInitializer](/conversation/iOS/api/WDGVideoInitializer.html) 实例。

- VideoAppId 是用户在野狗控制台创建的应用的唯一标识。
- Token（身份认证令牌）是用户在 WilddogRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。

### 获取 VideoAppId

打开 `控制面板 - 应用 - 实时视频通话 - 配置` 标签页，获取 VideoAppID。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 VideoAppId 为 `应用 - 实时视频通话 - 配置` 标签页中的 VideoAppID 字段值，请勿与应用的 AppID 混淆。
 VideoAppID 为 wd 开头的随机字符串，例如：wd1234567890abcdef。
</blockquote>

### 获取 Token

用户需要通过 [野狗身份认证](/auth/iOS/index.html) 服务来认证身份并登录服务器。开发者可以根据需要选择匿名登录、手机登录、邮箱密码、第三方或自定义认证等多种方式进行身份认证。成功通过身份认证后，使用 `-[WDGUser getTokenWithCompletion:]` 方法获取 `token`。

以匿名方式登录后初始化 [WDGVideoInitializer](/conversation/iOS/api/WDGVideoInitializer.html) 为例：

```objectivec
[WDGApp configureWithOptions:[[WDGOptions alloc] initWithSyncURL:@"https://your-video-appid.wilddogio.com"]];
[[WDGAuth auth] signOut:nil];
// 匿名登录
[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
    if (!error) {
        // 获取 Token
        [user getTokenWithCompletion:^(NSString * _Nullable idToken, NSError * _Nullable error) {
            // 初始化 WDGVideoInitializer
            [[WDGVideoInitializer sharedInstancce] configureWithVideoAppId:@"your-video-appid" token:idToken];
        }];
    }
}];
```


## 创建 Video 客户端

使用 `+[WDGVideoCall sharedInstance]` 方法获取 [WDGVideoCall](/conversation/iOS/api/WDGVideoCall.html) 单例，设置代理 <[WDGVideoCallDelegate](/conversation/iOS/api/WDGVideoCallDelegate.html)> 用于监听通话请求：

```objectivec
[[WDGVideoCall sharedInstance].delegate = self;
```

实现代理方法 `-[WDGVideoCallDelegate wilddogVideoCall:didReceiveCallWithConversation:data:]`，当收到远端通话请求时，会触发该方法：

```objectivec
- (void)wilddogVideoCall:(WDGVideoCall *)videoCall didReceiveCallWithConversation:(WDGConversation *)conversation data:(NSString *)data {
    // 处理通话请求。
}
```

实现代理方法 `-[WDGVideoCallDelegate wilddogVideoCall:didFailWithTokenError:]`，当 `token` 错误或过期时，会触发该方法：

```objectivec
- (void)wilddogVideoCall:(WDGVideoCall *)videoCall didFailWithTokenError:(NSError *)error {
    // 处理 token 错误。
}
```
