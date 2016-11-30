title: 多人视频会议
---

本篇文档介绍开发多人视频会议时会时的主要环节，包括创建视频会议、管理其他参与者和加入会议相关。

## 创建视频会议

创建视频会议包括配置和预览本地媒体流、发起/加入视频会议。

### 配置和预览本地媒体流

本地媒体流 ([LocalStream](/api/video/ios/Classes/WDGVideoLocalStream.html)) 包括音频和视频，发起或加入会议前需要配置其属性，成功加入一个会议后，该媒体流会发给其他参与者。

例如，创建一个只有视频且分辨率为 640X480 的流，并展示到页面上：

```objectivec
// 设置本地媒体流选项
WDGVideoLocalStreamOptions *localStreamOptions = [[WDGVideoLocalStreamOptions alloc] init];
localStreamOptions.audioOn = NO;
localStreamOptions.videoOption = WDGVideoConstraintsStandard;
// 创建本地媒体流
self.localStream = [[WDGVideoLocalStream alloc] initWithOptions:localStreamOptions];
// 展示本地媒体流
[self.localStream attach:self.localVideoView];
```

### 发起/加入视频会议

通过 Conference ID 发起/加入一个视频会议。如果该 Conference ID 不存在，系统会以你作为第一个参与者发起该会议。

例如，加入 Conference ID 为 '123456' 的视频会议：

```objectivec
WDGVideoConnectOptions *connectOptions = [[WDGVideoConnectOptions alloc] initWithLocalStream:self.localStream];
self.conference = [self.wilddogVideoClient connectToConferenceWithID:@"123456" options:connectOptions delegate:self];
```

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。

### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开的日志：

```objectivec
- (void)conference:(WDGVideoConference *)conference didConnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog(@"Participant %@ connected", participant);
    participant.delegate = self;
}

- (void)conference:(WDGVideoConference *)conference didDisconnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog(@"Participant %@ disconnected", participant);
}
```

### 播放其他参与者的媒体流

通过展示他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入视频会议时展示参与者的媒体流：

```objectivec
- (void)participant:(WDGVideoParticipant *)participant didAddStream:(WDGVideoRemoteStream *)stream
{
    // 参与者成功加入会话，将参与者的视频流展示出来
    NSLog(@"receive stream %@ from participant %@", stream, participant);
    self.remoteStream = stream;
    [self.remoteStream attach:self.remoteVideoView];
}
```

## 视频会议相关操作
---

视频会议相关操作包括视频会议直播和离开视频会议。

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```objectivec
[self.conference disconnect];
[self.remoteStream detach:self.remoteVideoView];
self.remoteStream = nil;
self.conference = nil;
```

### 视频会议直播

视频会议直播采用野狗独有的 MeetingCast 技术，能直播视频会议中指定客户端的视频和音频，并根据需要无缝切换直播的客户端。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
MeetingCast 功能配置之前，需要开启 `控制面板-实时视频通话-多人视频会议` 下的 “视频会议直播” 开关。
</blockquote>

**开启直播**

在视频会议开始后，选择一个参与者作为直播源，打开直播功能。

例如，选择参与者 '12345' 作为直播源开启直播：

```objectivec
[self.conference.meetingCast startWithParticipantID:@"12345"];
```

**切换直播者**

直播进行时无缝切换直播源。

例如，切换直播源为参与者 '99999'：

```objectivec
[self.conference.meetingCast switchToParticipantID:@"99999"];
```

**关闭直播**

停止直播功能。

例如，直播开启后，停止直播：

```objectivec
[self.conference.meetingCast stop];
```
