title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-ios-conference) 来快速了解 WilddogVideoRoom SDK 的用法。

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

<img src='/images/video_quickstart_create.png' alt="video_quickstart_create">

### 1.2 配置应用

- 在 `身份认证` 标签页中，选择 `登录方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

- 2 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。

<img src='/images/video_quickstart_openVideo.png' alt="video_quickstart_openVideo">


## 2. 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 WilddogVideoRoom SDK 以及其依赖的 WilddogAuth SDK。

* 在 Xcode 中创建一个工程，并在 Terminal 中用 `cd` 命令进入到工程所在文件夹内，执行 `pod init` 命令；
* 打开生成的 `Podfile` 文件，在第一行声明开发平台和版本（如 iOS 8.0），并在随后写入要引入的库：

```ruby
platform :ios, '8.0'
target 'your-target-name' do
  pod 'WilddogRoom', '2.0.0-beta'
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

### 4.2 初始化 WilddogVideoRoom SDK

使用 WilddogAuth SDK 进行身份认证，身份认证成功后，初始化 WilddogVideoRoom SDK。

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


## 5. 加入 Room

使用 `-[WDGRoom initWithRoomId:delegate:]` 方法创建 [WDGRoom](/conference/iOS/api/WDGRoom.html) 实例并加入到 Room 中。

```objectivec
self.room = [[WDGRoom alloc] initWithRoomId:_roomId delegate:self];
[self.room connect]
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
在发布／订阅媒体流之前必须先连接到某个 Room。
</blockquote>


## 6. 发布／订阅媒体流

本地客户端会触发 `-[WDGRoomDelegate wilddogRoomDidConnect:]` 事件通知用户已成功加入 Room 。
加入后即可发布或订阅当前 Room 中的媒体流。

### 6.1 发布本地媒体流

使用 `+[WDGLocalStream localStreamWithOptions:]` 方法创建本地媒体流。

```objectivec
WDGLocalStreamOptions *localStreamOptions = [[WDGLocalStreamOptions alloc] init];
localStreamOptions.shouldCaptureAudio = YES;
localStreamOptions.dimension = WDGVideoDimensions360p;
self.localStream = [WDGLocalStream localStreamWithOptions:localStreamOptions];
```

使用 `-[WDGRoom publishLocalStream:]` 方法发布本地媒体流。

```objectivec
[self.room publishLocalStream:self.localStream];
```

### 6.2 订阅远端媒体流

SDK 通过 `-[WDGRoomDelegate wilddogRoom:didStreamAdded:]` 事件通知用户当前 Room 中已发布的媒体流，可以根据需要订阅感兴趣的媒体流。

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamAdded:(WDGRoomStream *)roomStream {
    [self subscribeRoomStream:roomStream];
    [self.room subscribeRoomStream:roomStream];
}
```
订阅成功后会触发本地客户端 `-[WDGRoomDelegate wilddogRoom:didStreamReceived:]` 事件返回远端媒体流。

使用 `-[WDGRoomStream attach:]` 方法播放远端媒体流

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamReceived:(WDGRoomStream *)roomStream {
    [roomStream attach:self.roomVideoView];
}
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 发布媒体流需要在 WDGRoomDelegate 的 wilddogRoomDidConnect: 回调方法被触发后进行。
 </blockquote>


## 7. 更多使用

- 了解 WilddogVideoRoom 更多使用方式，请参考 [完整指南](/conference/iOS/guide/0-concepts.html) 和 [API 文档](/conference/iOS/api/WDGVideoInitializer.html)。
