title: WDGVideoMeetingCast
---

用于控制视频会议的直播状态。

## 属性

### status

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoMeetingCastStatus status;
```

**说明**

表明当前直播的状态。

</br>

---

### castingParticipantID

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) NSString *castingParticipantID;
```

**说明**

表明当前正在直播的参与者的 Wilddog ID 。若当前没在直播，该属性为 nil 。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoMeetingCastDelegate>delegate;
```

**说明**

符合 [WDGVideoMeetingCastDelegate](../Protocols/WDGVideoMeetingCastDelegate.html) 协议的代理，负责处理直播相关的事件。

</br>

---

## 方法

### -startWithParticipantID:

**定义**

```objectivec
- (void)startWithParticipantID:(nonnull NSString *)participantID;
```

**说明**

开启直播。

**参数**

 参数名 | 说明 
---|---
participantID|开启直播，并直播 Wilddog ID 为 participantID 的参与者的音视频流。

</br>

---

### -startWithParticipantID:completion:

**定义**

```objectivec
- (void)startWithParticipantID:(nonnull NSString *)participantID completion:(nonnull void (^)(NSError *_Nullable))completionHandler;
```

**说明**

开启直播。

**参数**

 参数名 | 说明 
---|---
participantID|开启直播，并直播 Wilddog ID 为 participantID 的参与者的音视频流。
completionHandler|操作完成时通过回调返回操作状态，若失败则通过 NSError 对象说明原因。

</br>

---

### -switchToParticipantID:

**定义**

```objectivec
- (void)switchToParticipantID:(nonnull NSString *)participantID;
```

**说明**

在直播开启后，切换直播视频流。

**参数**

 参数名 | 说明 
---|---
participantID|直播 Wilddog ID 为 participantID 的参与者的音视频流。

</br>

---

### -switchToParticipantID:completion:

**定义**

```objectivec
- (void)switchToParticipantID:(nonnull NSString *)participantID completion:(nonnull void (^)(NSError *_Nullable))completionHandler;
```

**说明**

在直播开启后，切换直播视频流。

**参数**

 参数名 | 说明 
---|---
participantID|直播 Wilddog ID 为 participantID 的参与者的音视频流。
completionHandler|操作完成时通过回调返回操作状态，若失败则通过 NSError 对象说明原因。

</br>

---

### -stop

**定义**

```objectivec
- (void)stop;
```

**说明**

关闭直播。

</br>

---

### -stopWithCompletion:

**定义**

```objectivec
- (void)stopWithCompletion:(nonnull void (^)(NSError *_Nullable))completionHandler;
```

**说明**

关闭直播。

**参数**

 参数名 | 说明 
---|---
completionHandler|操作完成时通过回调返回操作状态，若失败则通过 NSError 对象说明原因。

</br>

---

## 常量

### WDGVideoMeetingCastStatus

**说明**

代表当前直播状态

- WDGVideoMeetingCastStatusClosed: 表示直播未开启或已关闭
- WDGVideoMeetingCastStatusOpen: 表示直播正在进行中
