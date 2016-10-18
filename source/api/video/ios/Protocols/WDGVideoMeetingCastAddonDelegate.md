title: WDGVideoMeetingCastAddonDelegate
---

[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 的代理方法。

## 方法

### -wilddogVideoMeetingCastAddon:didCastUpWithUserID:castURLs:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddondidCastUpWithUserID:(nonnull NSString *)castingUserIDcastURLs:(nonnull NSDictionary<NSString *, NSString *> *)castURLs;
```

**说明**

当前会话的直播状态切换为开启直播后，通过该代理方法返回当前直播用户的 Wilddog ID 与直播流的URL地址。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html)实例。
castingUserID|当前直播中的用户 Wilddog ID 。 
castURLs|包含直播流的URL地址，字典的key为直播流的种类，目前包含两类`pull-rtmp-url` 和 `pull-hls-url`，字典的value为该直播流种类对应的地址。

</br>

---

### -wilddogVideoMeetingCastAddon:didCastChangeToUserID:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddondidCastChangeToUserID:(nonnull NSString *)castingUserID;
```

**说明**

当前会话的直播状态为开启直播时，若直播用户发生了切换，通过该代理方法返回切换后直播用户的 Wilddog ID 。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html)实例。
castingUserID|切换后直播用户的 Wilddog ID 。

</br>

---

### -wilddogVideoMeetingCastAddonDidCastDown:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddonDidCastDown:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddon;
```

**说明**

当前会话的直播状态由开启变为关闭后，通过该代理方法返回该状态变化。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html)实例。

</br>

---

### -wilddogVideoMeetingCastAddon:didFailedToChangeCastStatusWithError:

**定义**

```objectivec
- (void)wilddogVideoMeetingCastAddon:(nonnull WDGVideoMeetingCastAddon *)meetingCastAddondidFailedToChangeCastStatusWithError:(nonnull NSError *)error;
```

**说明**

当前用户发出的直播命令若由于网络等原因失败，通过该方法进行处理。

**参数**

 参数名 | 说明 
---|---
meetingCastAddon|当前[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html)实例。
error|发生的错误详细信息。
