title: 视频会议相关
---

视频会议相关操作包括离开视频会议和直播视频会议。

## 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```objectivec
[self.conference disconnect];
[self.remoteStream detach:self.remoteVideoView];
self.remoteStream = nil;
self.conference = nil;
```

## 视频会议直播

视频会议直播采用野狗独有的 MeetingCast 技术，能直播视频会议中指定客户端的视频和音频，并根据需要无缝切换直播的客户端。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  MeetingCast 功能配置之前，需要开启 `控制面板-实时视频通话-多人视频会议` 下的 “视频会议直播” 开关。
</blockquote>

### 开启直播

在视频会议开始后，选择一个参与者作为直播源，打开直播功能。

例如，选择参与者 '12345' 作为直播源开启直播：

```objectivec
- (void)startMeetingCast {
    [self.conference.meetingCast startWithParticipantID:@"12345"];
}

// 随后于 WDGVideoMeetingCastDelegate 方法中获得直播地址
- (void)meetingCast:(WDGVideoMeetingCast *)meetingCast didUpdatedWithStatus:(WDGVideoMeetingCastStatus)status castingParticipantID:(NSString * _Nullable)participantID castURLs:(NSDictionary<NSString *, NSString *> * _Nullable)castURLs {
    NSLog(@"participantID: %@ castURLs: %@", participantID, castURLs);
}
```

### 切换直播者

直播进行时无缝切换直播源。

例如，切换直播源为 participant ID '99999' 的参与者：


```objectivec
- (void)switchMeetingCast {
    [self.conference.meetingCast switchToParticipantID:@"99999"];
}

// 随后于 WDGVideoMeetingCastDelegate 方法中获得直播地址
- (void)meetingCast:(WDGVideoMeetingCast *)meetingCast didUpdatedWithStatus:(WDGVideoMeetingCastStatus)status castingParticipantID:(NSString * _Nullable)participantID castURLs:(NSDictionary<NSString *, NSString *> * _Nullable)castURLs {
    NSLog(@"participantID: %@ castURLs: %@", participantID, castURLs);
}
```

### 停止直播

停止直播功能。

例如，直播开启后，停止直播：


```objectivec
- (void)stopMeetingCast {
    [self.conference.meetingCast stop];
}
```
