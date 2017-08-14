title: 管理其他参与者
---

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。

## 处理其他参与者的连接事件

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

## 播放其他参与者的媒体流

通过展示他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入视频会议时展示参与者的媒体流：

```objectivec
- (void)participant:(WDGVideoParticipant *)participant didAddStream:(WDGVideoRemoteStream *)stream
{
    // 参与者成功加入会议，将参与者的视频流展示出来
    NSLog(@"receive stream %@ from participant %@", stream, participant);
    self.remoteStream = stream;
    // 每个 WDGVideoView 只能展示一个 WDGVideoStream，这里假设会议只有一个参与者
    [self.remoteStream attach:self.remoteVideoView];
}
```
