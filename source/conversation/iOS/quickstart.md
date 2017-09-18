title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-ios-conversation) 来快速了解 WilddogVideo SDK 的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Xcode 7.0 及以上版本</li>
        <li>支持 iOS 8.0 及以上版本</li>
    </ul>
</div>


## 1. 创建应用

### 1.1 创建野狗应用

在控制面板中创建野狗应用。

### 1.2 配置应用

- 1 在 `身份认证` 标签页中，选择 `登录方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；
- 2 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。


## 2. 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 WilddogVideo SDK 以及其依赖的 WilddogAuth SDK。

* 在 Xcode 中创建一个工程，并在 Terminal 中用 `cd` 命令进入到工程所在文件夹内，执行 `pod init` 命令；
* 打开生成的 `Podfile` 文件，在第一行声明开发平台和版本（如 iOS 8.0），并在随后写入要引入的库：

```ruby
platform :ios, '8.0'
target 'your-target-name' do
  pod 'WilddogVideo', '2.1.0-beta'
end
```

* 保存 `Podfile`，并执行 `pod install` 命令，将上述依赖安装到你的工程。
* 双击生成的 `your-project-name.xcworkspace` 文件打开工程。


## 3. 配置 iOS 权限

在 `info.plist` 文件中添加两个字段以获取相机和麦克风的访问权限：

Key                                    | Type   | Value
---------------------------------------|--------|-----------------
Privacy - Camera Usage Description     | String | Your Description
Privacy - Microphone Usage Description | String | Your Description


## 4. 初始化 SDK

### 4.1 初始化 WilddogAuth SDK

```objectivec
    //初始化 Auth SDK
    NSString *appID = @"your-appid";
    WDGOptions *options = [[WDGOptions alloc] initWithSyncURL:[NSString stringWithFormat:@"https://%@.wilddogio.com", appID]];
    [WDGApp configureWithOptions:options];
```

### 4.2 初始化 WilddogVideo SDK

使用 WilddogAuth SDK 进行身份认证，身份认证成功后，初始化 WilddogVideo SDK。

```objectivec
[[WDGAuth auth] signOut:nil];
[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser *user, NSError *error) {
    if (!error) {
        // 获取 token
        [user getTokenWithCompletion:^(NSString * _Nullable idToken, NSError * _Nullable error) {
            // 配置 Video Initializer
            [[WDGVideoInitializer sharedInstance] configureWithVideoAppId:appID token:idToken];
        }];
    }
}];
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 VideoAppId 为应用 `实时视频通话-配置` 标签页中的 VideoAppID 字段值，请勿与应用的 AppID 混淆。
 VideoAppID 为 wd 开头的随机字符串，例如：wd1234567890abcdef。
</blockquote>


## 5. 配置视频通话

使用 `+[WDGVideo sharedVideo]` 方法获取 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 单例，设置代理 <[WDGVideoDelegate](/conversation/iOS/api/WDGVideoDelegate.html)> 用于监听通话请求：

```objectivec
[[WDGVideo sharedVideo].delegate = self;
```

开始视频通话之前，使用 `+[WDGLocalStream localStreamWithOptions:]` 方法创建本地媒体流。

```objectivec
WDGLocalStreamOptions *localStreamOptions = [[WDGLocalStreamOptions alloc] init];
localStreamOptions.shouldCaptureAudio = YES;
localStreamOptions.dimension = WDGVideoDimensions360p;
self.localStream = [WDGLocalStream localStreamWithOptions:localStreamOptions];
```

## 6. 开始视频通话

使用 WilddogAuth 登录成功后，用户会获得唯一的 `uid`，在 WilddogVideo SDK 中，使用 `uid` 作为用户的身份标识。

### 6.1 邀请视频通话

使用 `-[WDGVideo callWithUid:localStream:data:]` 来发起通话请求：

```objectivec
self.conversation = [self.video callWithUid:@"remote-uid" localStream:self.localStream data:@"custom-data";
self.conversation.delegate = self;
```

### 6.2 接受视频通话

被邀请的用户通过 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 代理的 `-[WDGVideoDelegate wilddogVideo:didReceiveCallWithConversation:data:]` 方法收到 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例，使用 `-[WDGConversation acceptWithLocalStream:]` 接收视频通话：

```objectivec
- (void)wilddogVideo:(WDGVideo *)video didReceiveCallWithConversation:(WDGConversation *)conversation data:(NSString *)data {
    [conversation acceptWithLocalStream:self.localStream];
    conversation.delegate = self;
}
```

### 6.3 播放媒体流

视频通话链接成功后，通话双方会通过 [Conversation](/conversation/iOS/api/WDGConversation.html) 代理的 `-[WDGConversation conversation:didReceiveStream:]` 方法收到 [WDGRemoteStream](/conversation/iOS/api/WDGRemoteStream.html) 实例，使用 `-[WDGRemoteStream attach:]` 方法播放远端媒体流：

```objectivec
- (void)conversation:(WDGConversation *)conversation didReceiveStream:(WDGRemoteStream *)remoteStream {
    [remoteStream attach:self.remoteVideoView];
}
```

## 7. 更多应用

- 了解 WilddogVideo 更多使用方式，请参考 [完整指南](/conversation/iOS/guide/0-concepts.html) 和 [API 文档](/conversation/iOS/api/WDGVideoInitializer.html)。
