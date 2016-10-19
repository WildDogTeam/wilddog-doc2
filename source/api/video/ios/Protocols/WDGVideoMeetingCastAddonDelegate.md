title: WDGVideoMeetingCastAddonDelegate
---

[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 的代理方法。

## 方法

### -wilddogVideoMeetingCastAddon:didStartedWithParticipantID:castURLs:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddon didStartedWithParticipantID:(nonnull NSString *)castingParticipantIDcastURLs:(nonnull NSDictionary<NSString *, NSString *> *)castURLs;
```

**说明**

当前会话的直播状态切换为开启直播后，通过该代理方法返回当前直播参与者的 Wilddog ID 与直播流的 URL 地址。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前 [WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 实例。 
castingParticipantID|当前直播中的参与者的 Wilddog ID 。
castURLs|包含直播流的 URL 地址，字典的 Key 为直播流的种类，目前包含 `pull-rtmp-url` 和 `pull-hls-url` 两类，字典的 Value 为该直播流种类对应的地址。

</br>

---

### -wilddogVideoMeetingCastAddon:didSwitchedToParticipantID:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddon didSwitchedToParticipantID:(nonnull NSString *)castingParticipantID;
```

**说明**

当前会话的直播状态为开启直播时，若直播的参与者发生了切换，通过该代理方法返回切换后直播参与者的 Wilddog ID 。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前 [WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 实例。 
castingParticipantID|切换后直播的参与者的 Wilddog ID 。

</br>

---

### -wilddogVideoMeetingCastAddonDidStopped:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddonDidStopped:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddon;
```

**说明**

当前会话的直播状态由开启变为关闭后，通过该代理方法返回该状态变化。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前 [WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 实例。

</br>

---

### -wilddogVideoMeetingCastAddon:didFailedToChangeCastStatusWithError:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddon didFailedToChangeCastStatusWithError:(nonnull NSError *)error;
```

**说明**

当直播命令若由于网络等原因失败，通过该代理方法进行处理。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前 [WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 实例。
error|发生的错误详细信息。
