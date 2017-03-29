title: WDGVideoConference
---

表示连接的会议，同一时间只能连接到一个会议中。

## 属性

### ID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull ID;
```

**说明**

表示当前会议的编号。

</br>

---

### status

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoConnectionStatus status;
```

**说明**

[WDGVideoConnectionStatus](../Enums.html#/c:@E@WDGVideoConnectionStatus) 类型，表示会议的状态。

</br>

---

### localParticipant

**定义**

```objectivec
@property (readonly, strong, nonatomic) WDGVideoLocalParticipant *_Nonnull localParticipant;
```

**说明**

表示当前视频会议的本地参与者。

</br>

---

### participants

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSArray<WDGVideoParticipant *> *_Nonnull participants;
```

**说明**

表示除自己外，已加入视频会议的参与者。

</br>

---

### meetingCast

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) WDGVideoMeetingCast *meetingCast;
```

**说明**

[WDGVideoMeetingCast](../Classes/WDGVideoMeetingCast.html) 类型，用于查看并控制当前视频会议的直播状态。当野狗控制台中未开启直播推流功能时该属性为 nil。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoConferenceDelegate> delegate;
```

**说明**

符合 [WDGVideoConferenceDelegate](../Protocols/WDGVideoConferenceDelegate.html) 协议的代理。

</br>

---

## 方法

### -disconnect

**定义**

```objectivec
- (void)disconnect;
```

**说明**

命令同当前会议断开连接。

</br>

---

### -getParticipant:

**定义**

```objectivec
- (WDGVideoParticipant *_Nullable)getParticipant:(nonnull NSString *)participantID;
```

**说明**

依据会议参与者的 Wilddog ID 获取对应的 [WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 模型。

**参数**

 参数名 | 说明 
---|---
participantID|会议参与者的 Wilddog ID。

**返回值**

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 实例，若未找到相应参与者，返回 nil。

</br>

---

## 常量

### WDGVideoConnectionStatus 

**说明**

表示视频通话或会议的连接状态。

- WDGVideoConnectionStatusConnecting: 表示视频通话或会议正在连接中。
- WDGVideoConnectionStatusConnected: 表示视频通话或会议已连接。
- WDGVideoConnectionStatusDisconnected: 表示视频通话或会议已断开连接。
