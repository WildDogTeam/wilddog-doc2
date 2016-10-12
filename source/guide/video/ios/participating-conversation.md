title: 加入会话相关
---

以下展示了如何预览本地画面，处理会话邀请和离开当前会话。

### 预览本地视频画面

有时你想在加入会话前预览本地的视频画面。没问题，每个端的 SDK 都提供了预览本地视频画面的方法。 

示例：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 创建一个同时有音频和视频的媒体流
WDGVideoLocalStreamConfiguration *configuration = [[WDGVideoLocalStreamConfiguration alloc] initWithVideoOption:WDGVideoConstraintsStandard audioOn:YES];
WDGVideoLocalStream *localStream = [self.videoClient localStreamWithConfiguration:configuration];

// 将本地媒体流绑定到 `WDGVideoView` 实例中展示
self.localStreamPreviewView = [[WDGVideoView alloc] init];
[localStream attach:self.localStreamPreviewView];
```
  </div>
  <div class="slide-content">
```swift
// 创建一个同时有音频和视频的媒体流
let localStreamConfiguration = WDGVideoLocalStreamConfiguration(videoOption: .standard, audioOn: true)
let localStream = wilddogVideoClient.localStream(with: localStreamConfiguration)

// 将本地媒体流绑定到 `WDGVideoView` 实例中展示
self.localStreamPreviewView = WDGVideoView()
localStream.attach(self.localStreamPreviewView)

```
  </div>
</div>

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他客户端发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

示例：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
- (void)wilddogVideoClient:(WDGVideoClient *)videoClient didReceiveInvite:(WDGVideoIncomingInvite *)invite
{
    // 收到邀请，展示弹窗让用户选择是否接受
    NSString *message = [NSString stringWithFormat:@"%@\n邀请你加入会话", invite.fromUserID];
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"" message:message preferredStyle:UIAlertControllerStyleAlert];

    [alertController addAction:[UIAlertAction actionWithTitle:@"拒绝" style:UIAlertActionStyleDestructive handler:^(UIAlertAction *action) {
        // 用户选择拒绝邀请
        [invite reject];
    }]];

    __weak __typeof__(self) weakSelf = self;
    [alertController addAction:[UIAlertAction actionWithTitle:@"接受" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
        // 用户选择接受邀请
        [invite acceptWithLocalStream:localStream completion:^(WDGVideoConversation *conversation, NSError *error) {
            __strong __typeof__(self) strongSelf = weakSelf;
            if (strongSelf == nil) {
                return;
            }
            if (error != nil) {
                // 进行错误处理
                NSLog(@"%@", error);
                return;
            }

            // 使用 `conversation` 对象进行后续操作
            strongSelf.conversation = conversation;
            conversation.delegate = strongSelf;
        }];
    }]];

    [self presentViewController:alertController animated:YES completion:NULL];
}
```
  </div>
  <div class="slide-content">
```swift
func wilddogVideoClient(_ videoClient: WDGVideoClient, didReceive invite: WDGVideoIncomingInvite) {
    // 收到邀请，展示弹窗让用户选择是否接受
    let alertController = UIAlertController(title: invite.conversationID, message: "\(invite.fromUserID) 邀请你进行视频通话", preferredStyle: .alert)

    alertController.addAction(UIAlertAction(title: "拒绝", style: .destructive, handler: { (action) in
        // 用户选择拒绝邀请
        invite.reject()
    }))

    alertController.addAction(UIAlertAction(title: "接受", style: .default, handler: { [weak self] (action) in
        // 用户选择接受邀请
        invite.accept(with: localStream, completion: { [weak self] (conversation, error) in
            guard let strongSelf = self else { return }
            guard let conversation = conversation else {
                // 进行错误处理
                NSLog("\(error)")
                return
            }
            // 使用 `conversation` 对象进行后续操作
            strongSelf.conversation = conversation
            conversation.delegate = strongSelf
        })
    }))

    present(alertController, animated: true, completion: nil)
}
```
  </div>
</div>

### 离开会话

离开一个正在进行的会话并释放资源。

示例：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 调用 disconnect 方法结束会话
[conversation disconnect];

// 释放不使用的资源
self.localStream = nil;
self.conversation = nil;
```
  </div>
  <div class="slide-content">
```swift
// 调用 disconnect 方法结束会话
conversation.disconnect()

// 释放不使用的资源
self.localStream = nil
self.conversation = nil
```
  </div>
</div>
