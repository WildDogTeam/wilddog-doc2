title: WDGVideoMeetingCastDelegate
---

MeetingCast 代理方法。

## 方法

### -meetingCast:didUpdatedWithStatus:castingParticipantID:castURLs:

**定义**

```objectivec
- (void)meetingCast:(nonnull WDGVideoMeetingCast *)meetingCast didUpdatedWithStatus:(WDGVideoMeetingCastStatus)status castingParticipantID:(NSString *_Nullable)participantID castURLs:(NSDictionary<NSString *, NSString *> *_Nullable)castURLs;
```

**说明**

当前会议的直播状态发生变化时，通过该代理方法返回当前直播参与者的 Wilddog ID 与直播流的 URL 地址。

**参数**

 参数名 | 说明 
---|---
meetingCast|当前 [WDGVideoMeetingCast](../Classes/WDGVideoMeetingCast.html) 实例。
status|最新的直播状态。
participantID|当前直播中的参与者的 Wilddog ID 。
castURLs|包含直播流的 URL 地址，字典的 Key 为直播流的种类，目前包含 `rtmp` 和 `hls` 两类，字典的 Value 为该直播流种类对应的地址。

</br>

---

## 常量

### WDGVideoMeetingCastStatus

**说明**

代表当前直播状态

- WDGVideoMeetingCastStatusClosed: 表示直播未开启或已关闭
- WDGVideoMeetingCastStatusOpen: 表示直播正在进行中
