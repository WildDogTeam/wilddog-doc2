title: 安装和初始化
---

本篇文档介绍如何安装 SDK 并初始化 WilddogVideo。


## 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Auth SDK。

* 在 Xcode 中创建一个工程，并在 terminal 中用 `cd` 命令进入到工程所在文件夹内，执行 `pod init` 命令；
* 打开生成的 `Podfile` 文件，在第一行声明开发平台和版本（如iOS 8.0），并在随后写入要引入的库：

```ruby
platform :ios, '8.0'
target 'your-target-name' do
  pod 'WilddogVideo', '~> 2.0.0'
end
```
* 保存 `Podfile`，并执行 `pod install` 命令，将上述依赖安装到你的工程。
* 双击生成的 `your-project-name.xcworkspace` 文件打开工程。


## 初始化

[WDGVideo](/conversation/iOS/api/WDGVideo.html) 是 WilddogVideo SDK 功能的主入口。用户在使用 SDK 之前，要初始化 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 实例，以连接野狗服务器。

初始化之前，打开控制面板 - 应用 - 视频通话 - 配置，获取 VideoAppID。

用户需要通过 [野狗身份认证](/auth/iOS/index.html) 服务来认证身份并登录服务器。开发者可以根据需要选择匿名登录、手机登录、邮箱密码、第三方或自定义认证等多种方式进行身份认证。

成功通过身份认证后，用户将获得 `uid` 以及 `token`。以匿名方式登录后初始化 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 为例：

```objectivec
[WDGApp configureWithOptions:[[WDGOptions alloc] initWithSyncURL:@"https://<#VideoAppID#>.wilddogio.com"]];
[[WDGAuth auth] signOut:nil];

[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
    if (!error) {
        [user getTokenWithCompletion:^(NSString * _Nullable idToken, NSError * _Nullable error) {
            self.uid = user.uid;
            // 配置 WDGvideo。
            [[WDGVideo sharedVideo] configureWithVideoAppId:@"your-video-appid" token:idToken];
        }];
    }
}];
```

## 设置代理

设置 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 的代理 <[WDGVideoDelegate](/conversation/iOS/api/WDGVideoDelegate.html)> 用于监听通话请求：

```objectivec
[[WDGVideo sharedVideo].delegate = self;
```

实现代理方法 `-[WDGVideoDelegate wilddogVideo:didReceiveCallWithConversation:data:]`，当收到远端通话请求时，会触发该方法：

```objectivec
- (void)wilddogVideo:(WDGVideo *)video didReceiveCallWithConversation:(WDGConversation *)conversation data:(NSString *)data {
    // 处理通话请求。
}
```

实现代理方法 `-[WDGVideoDelegate wilddogVideo:didFailWithTokenError:]`，当 `token` 错误或过期时，会触发该方法：

```objectivec
- (void)wilddogVideo:(WDGVideo *)video didFailWithTokenError:(NSError *)error {
    // 处理 token 错误。
}
```