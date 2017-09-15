title: 安装和初始化
---

本篇文档介绍如何安装 SDK 并初始化 WilddogRoom。


## 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 Room SDK 以及其依赖的 Auth SDK。

* 在 Xcode 中创建一个工程，并在 Terminal 中用 `cd` 命令进入到工程所在文件夹内，执行 `pod init` 命令；
* 打开生成的 `Podfile` 文件，在第一行声明开发平台和版本（如 iOS 8.0），并在随后写入要引入的库：

```ruby
platform :ios, '8.0'
target 'your-target-name' do
  pod 'WilddogRoom'
  pod 'WilddogVideoBase'
end
```

* 保存 `Podfile`，并执行 `pod install` 命令，将上述依赖安装到你的工程。
* 双击生成的 `your-project-name.xcworkspace` 文件打开工程。


## 初始化

[WDGVideoInitializer](/conference/iOS/api/WDGVideoInitializer.html) 是 WilddogRoom 和 WilddogVideo 共享的初始化类，在使用视频通话或者视频会议之前，需要先初始化 [WDGVideoInitializer](/conference/iOS/api/WDGVideoInitializer.html) 实例。

[WDGVideoInitializer](placeholder) 的初始化需要 VideoAppId 和 token：

- VideoAppId 是用户在野狗控制台创建的应用的唯一标识。打开控制面板 - 应用 - 视频通话 - 配置，获取 VideoAppID。
- Token（身份认证令牌）是用户在 WilddogRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。

用户需要通过 [野狗身份认证](/auth/iOS/index.html) 服务来认证身份并登录服务器。开发者可以根据需要选择匿名登录、手机登录、邮箱密码、第三方或自定义认证等多种方式进行身份认证。

成功通过身份认证后，用户将获得 `uid` 以及 `token`。以匿名方式登录后初始化 [WDGVideoInitializer](/conference/iOS/api/WDGVideoInitializer.html) 为例：

```objectivec
[WDGApp configureWithOptions:[[WDGOptions alloc] initWithSyncURL:@"https://your-video-appid.wilddogio.com"]];
[[WDGAuth auth] signOut:nil];
// 匿名登录
[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
    if (!error) {
        // 获取 Token
        [user getTokenWithCompletion:^(NSString * _Nullable idToken, NSError * _Nullable error) {
            self.uid = user.uid;
            // 初始化 WDGVideoInitializer
            [[WDGVideoInitializer sharedInstancce] configureWithVideoAppId:@"your-video-appid" token:idToken];
        }];
    }
}];
```