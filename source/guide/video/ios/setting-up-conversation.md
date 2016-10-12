title: 建立会话
---

本篇文档介绍如何初始化 Client、配置本地媒体流，以及发起会话。

## 初始化 Client

发起会话之前需要通过初始化 Client 来连接客户端和野狗服务器。初始化 Client 时需要指定 Video SDK 的交互路径，客户端和服务器以及客户端之间都是通过该路径进行交互，只有相同交互路径下的 Client 能够发起或加入会话。建议该路径下不要存储其他数据。

选择 `Server-based` 会话时，初始化 Client 时的交互路径应和控制面板中的交互路径保持一致。

需要注意的是，初始化 Client 之前，要先经过身份认证。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式。

例如，以匿名方式登录后创建 Client ：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 初始化 Wilddog Sync 与 Wilddog Auth
[WDGApp configureWithOptions:[[WDGOptions alloc] initWithSyncURL:@"你的应用ID.wilddog.com"]];
WDGSyncReference *videoReference = [[WDGSync sync] referenceWithPath:@"你的自定义路径"];
WDGAuth *auth = [WDGAuth auth];

// 初始化 Video Client 之前，要先经过身份认证。这里采用匿名登录的方式，开发者可以根据需要选择邮箱密码、第三方或自定义方式。
__weak __typeof__(self) weakSelf = self;
[[WDGAuth auth] signInAnonymouslyWithCompletion:^(WDGUser *user, NSError *error) {
    __strong __typeof__(self) strongSelf = weakSelf;
    if (strongSelf == nil) {
        return;
    }

    if (error != nil) {
        NSLog(@"登录错误: %@", error);
        return;
    }

    // 登录成功，初始化 `WDGVideoClient` 对象
    WDGVideoClient *videoClient = [[WDGVideoClient alloc] initWithSyncReference:videoReference user:user];

    if (videoClient == nil) {
        NSLog(@"创建 WDGVideoClient 失败");
        return;
    }

    // 使用 videoClient
    strongSelf.wilddogVideoClient?.delegate = strongSelf
}
```
  </div>
  <div class="slide-content">
```swift
// 初始化 Wilddog Sync 与 Wilddog Auth
WDGApp.configure(with: WDGOptions(syncURL: "你的应用ID.wilddog.com"))
let wilddogSyncReference = WDGSync.sync().reference(withPath: "你的自定义路径")
let wilddogAuth = WDGAuth.auth()

// 初始化 Video Client 之前，要先经过身份认证。这里采用匿名登录的方式，开发者可以根据需要选择邮箱密码、第三方或自定义方式。
wilddogAuth.signInAnonymously { [weak self] (user, error) in
    guard let strongSelf = self else { return }
    guard let user = user, user.uid != "" else {
        NSLog("登录错误: \(error)")
        return
    }
    // 登录成功，初始化 `WDGVideoClient` 对象
    guard let wilddogVideoClient = WDGVideoClient(syncReference: wilddogSyncReference, user: user) else {
        NSLog("创建 WDGVideoClient 失败")
        return
    }
    // 使用 videoClient   
    strongSelf.wilddogVideoClient?.delegate = strongSelf
}
```
  </div>
</div>

## 配置本地媒体流

本地媒体流包括音频和视频。需要在发起会话前配置本地媒体流。会话建立后该媒体流会发给其他 Clients。

例如，可以创建一个只有视频且分辨率为 640X480 的流，并展示到页面上：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 创建本地媒体流
WDGVideoLocalStreamConfiguration *configuration = [[WDGVideoLocalStreamConfiguration alloc] initWithVideoOption:WDGVideoConstraintsStandard audioOn:NO];
WDGVideoLocalStream *localStream = [self.videoClient localStreamWithConfiguration:configuration];

// 将本地媒体流绑定到 `WDGVideoView` 实例中展示
self.localStreamPreviewView = [[WDGVideoView alloc] init];
[localStream attach:self.localStreamPreviewView];
```
  </div>
  <div class="slide-content">
```swift
// 创建本地媒体流
let localStreamConfiguration = WDGVideoLocalStreamConfiguration(videoOption: .standard, audioOn: false)
let localStream = wilddogVideoClient.localStream(with: localStreamConfiguration)

// 将本地媒体流绑定到 `WDGVideoView` 实例中展示
self.localStreamPreviewView = WDGVideoView()
localStream.attach(self.localStreamPreviewView)

```
  </div>
</div>

## 发起会话

会话的建立基于邀请机制，只有另一个 Client 接受了会话邀请，会话才能建立成功。

例如，邀请指定用户进行 P2P 模式的会话：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
__weak __typeof__(self) weakSelf = self;
WDGVideoOutgoingInvite *outgoingInvite = [self.videoClient inviteUser:@"被邀请者的Wilddog ID" localStream:localStream conversationMode:WDGVideoConversationModeP2P completion:^(WDGVideoConversation *conversation, NSError *error) {
    __strong __typeof__(self) strongSelf = weakSelf;
    if (strongSelf == nil) {
        return;
    }

    if (error != nil) {
        // 邀请失败，进行错误处理
        NSLog(@"邀请失败，错误信息: %@", error);
        return;
    }

    // 邀请成功，使用 `conversation` 对象进行后续操作
    strongSelf.conversation = conversation;
    conversation.delegate = strongSelf;
}];
```
  </div>
  <div class="slide-content">
```swift
let outgoingInvitation = wilddogVideoClient.inviteUser("被邀请者的Wilddog ID", localStream: localStream, conversationMode: .P2P) { [weak self] (conversation, error) in
    guard let strongSelf = self else { return }

    guard let conversation = conversation else {
        // 邀请失败，进行错误处理
        NSLog("\(error)")
        return
    }

    // 邀请成功，使用 `conversation` 对象进行后续操作
    strongSelf.conversation = conversation
    conversation.delegate = strongSelf
}
```
  </div>
</div>
