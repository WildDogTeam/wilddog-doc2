
title: 管理其他参与者
---

本篇文档介绍如何邀请其他 Client 加入会话、处理参与者的连接事件，以及播放其他参与者的媒体流。

### 邀请其他 Client 加入会话

会话建立成功后，会话的参与者都可以邀请其他 Client 作为新参与者加入。

示例，在会话中邀请新的参与者加入：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
NSError *error = nil;
if (![conversation inviteUser:@"被邀请者的Wilddog ID" error:&error]) {
    // 邀请失败，进行错误处理
    NSLog(@"%@", error);
}
```
  </div>
  <div class="slide-content">
```swift
do {
    try conversation.inviteUser("被邀请者的Wilddog ID")
} catch {
    // 邀请失败，进行错误处理
    NSLog("\(error)")
}
```
  </div>
</div>

### 处理参与者的连接事件

通过监听参与者加入或离开的事件，来获得参与者的状态通知。

例如，打印参与者加入、离开及加入失败的日志：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入事件
- (void)conversation:(WDGVideoConversation *)conversation didConnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog("Connected participant: %@", participant);
}

// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者离开事件
- (void)conversation:(WDGVideoConversation *)conversation didDisconnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog("Disconnected participant: %@", participant);
}

// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入失败事件
- (void)conversation:(WDGVideoConversation *)conversation didFailToConnectParticipant:(WDGVideoParticipant *)participant error:(NSError *)error
{
    NSLog("Failed to connect to participant:%@ error:%@", participant, error);
}

```
  </div>
  <div class="slide-content">
```swift
// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入事件
func conversation(_ conversation: WDGVideoConversation, didConnect participant: WDGVideoParticipant) {
    NSLog("Connected participant: %@", participant)
}

// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者离开事件
func conversation(_ conversation: WDGVideoConversation, didDisconnectParticipant participant: WDGVideoParticipant) {
    NSLog("Disconnected participant: %@", participant)
}

// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入失败事件
func conversation(_ conversation: WDGVideoConversation, didFailToConnect participant: WDGVideoParticipant, error: Error) {
    NSLog("Failed to connect to participant:%@ error:%@", participant, error)
}
```
  </div>
</div>

### 播放其他参与者的媒体流

会话中想播放其他参与者的媒体流，需要将媒体流展示到屏幕上。

例如，当监听到新参与者加入会话时展示参与者的媒体流：

<div class="slide">
  <div class='slide-title'>
    <span class="slide-tab tab-current">Objective-C</span>
    <span class="slide-tab">Swift</span>
  </div>
  <div class="slide-content slide-content-show">
```objectivec
// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入事件
- (void)conversation:(WDGVideoConversation *)conversation didConnectParticipant:(WDGVideoParticipant *)participant
{
    // 获取参与者媒体流
    WDGVideoRemoteStream *remoteStream = participant.stream;
    // 展示媒体流，其中 remoteVideoView 为 `WDGVideoView` 实例
    [remoteStream attach:remoteVideoView];
}
```
  </div>
  <div class="slide-content">
```swift
// 通过 `WDGVideoConversationDelegate` 代理方法监听参与者加入事件
func conversation(_ conversation: WDGVideoConversation, didConnect participant: WDGVideoParticipant) {
    // 获取参与者媒体流
    if let remoteStream = participant.stream {
        // 展示媒体流，其中 remoteVideoView 为 `WDGVideoView` 实例
        remoteStream.attach(remoteVideoView)
    }
}
```
  </div>
</div>
