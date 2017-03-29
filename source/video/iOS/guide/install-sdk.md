title: 安装和初始化 SDK
---

本篇文档介绍如何安装 SDK。


### 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Sync 和 Auth SDK。

在 Podfile 文件中添加以下语句，同时添加 Sync, Auth 和 Video SDK。

```ruby
pod 'WilddogVideo'
```

然后运行 `pod install` 将上述依赖安装到你的工程。

### 初始化 Video SDK

客户端在使用 Video SDK 前需要初始化 Client 来连接客户端和野狗服务器。

初始化 Client 之前，要先经过 [野狗身份认证](/overview/auth.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。

例如，以匿名方式登录后初始化 Client ：

```objectivec
[WDGApp configureWithOptions:[[WDGOptions alloc] initWithSyncURL:@"https://<#appId#>.wilddogio.com"]];
[[WDGAuth auth] signOut:nil];

__weak __typeof__(self) weakSelf = self;
[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
    __strong __typeof__(self) strongSelf = weakSelf;
    if (strongSelf == nil) {
        return;
    }
    if (error) {
        NSLog(@"请在控制台为您的AppID开启匿名登录功能，错误信息: %@", error);
        return;
    }
    strongSelf.wilddogVideoClient = [[WDGVideoClient alloc] initWithApp:[WDGApp defaultApp]];
    strongSelf.wilddogVideoClient.delegate = self;
}];
```
