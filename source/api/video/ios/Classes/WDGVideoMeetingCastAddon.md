title: WDGVideoMeetingCastAddon
---

MeetingCast 插件，用于控制会话的直播状态。

## 属性

### conversation

**定义**

```objectivec
@property (readonly, strong, nonatomic) WDGVideoConversation *_Nonnull conversation;
```

**说明**

与直播插件关联的会话实例。

</br>

---

### meetingCastStatus

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoMeetingCastStatus meetingCastStatus;
```

**说明**

表明当前直播的状态。

</br>

---

### castingUserID

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) NSString *castingUserID;
```

**说明**

表明当前正在直播的用户UserID。若当前没在直播，该属性为nil。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoMeetingCastAddonDelegate>delegate;
```

**说明**

符合[WDGVideoMeetingCastAddonDelegate](../Protocols/WDGVideoMeetingCastAddonDelegate.html)协议的代理，负责处理直播相关的事件。

</br>

---

## 方法

### -castUpWithUserID:

**定义**

```objectivec
- (void)castUpWithUserID:(nonnull NSString *)userID;
```

**说明**

开启直播。

**参数**

 参数名 | 说明 
---|---
userID|开启直播，并将uid为userID的用户设为正在直播的用户。

</br>

---

### -castChangeToUserID:

**定义**

```objectivec
- (void)castChangeToUserID:(nonnull NSString *)userID;
```

**说明**

切换直播视频流。

**参数**

 参数名 | 说明 
---|---
userID|将uid为userID的用户设为正在直播的用户。

</br>

---

### -castDown

**定义**

```objectivec
- (void)castDown;
```

**说明**

关闭直播。

</br>

---

## 常量

### WDGVideoMeetingCastStatus

**说明**

代表当前直播状态

- WDGVideoMeetingCastStatusClosed: 表示直播未开启或已关闭
- WDGVideoMeetingCastStatusOpen:   表示直播正在进行中
