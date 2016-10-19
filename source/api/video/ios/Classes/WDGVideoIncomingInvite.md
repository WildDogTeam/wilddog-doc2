title: WDGVideoIncomingInvite
---

表示来自其它用户的会话邀请。

## 属性

### fromParticipantID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull fromParticipantID;
```

**说明**

邀请者的 Wilddog ID ，表明这个邀请来自哪个用户。

</br>

---

### conversationID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull conversationID;
```

**说明**

表示邀请参加的会议的编号。

</br>

---

### status

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoInviteStatus status;
```

**说明**

表示当前邀请的状态。

</br>

---

## 方法

### -acceptWithCompletion:

**定义**

```objectivec
- (void)acceptWithCompletion:(nonnull WDGVideoInviteAcceptanceBlock)completionHandler;
```

**说明**

接受邀请，使用当前本地视频流接受邀请，并在 `completionHandler` 中返回结果。若当前未创建本地视频流，将自动以默认配置创建本地视频流。

**参数**

 参数名 | 说明 
---|---
completionHandler|当邀请得到确认后，SDK通过该闭包通知邀请结果，若邀请成功，将在闭包中返回`WDGVideoConversation`实例，否则将在闭包中返回`NSError`说明邀请失败的原因。

</br>

---

### -acceptWithLocalStream:completion:

**定义**

```objectivec
- (void)acceptWithLocalStream:(nonnull WDGVideoLocalStream *)localStreamcompletion:(nonnull WDGVideoInviteAcceptanceBlock)completionHandler;
```

**说明**

接受邀请，使用指定视频流接受邀请，并在 `completionHandler` 中返回结果。

**参数**

 参数名 | 说明 
---|---
localStream|想要使用的视频流。 
completionHandler|当邀请得到确认后，SDK通过该闭包通知邀请结果，若邀请成功，将在闭包中返回`WDGVideoConversation`实例，否则将在闭包中返回`NSError`说明邀请失败的原因。

</br>

---

### -reject

**定义**

```objectivec
- (void)reject;
```

**说明**

调用此方法拒绝邀请。

</br>

---

## 常量

### WDGVideoInviteStatus

**说明**

表示邀请的状态。

- WDGVideoInviteStatusPending: 邀请刚刚被发送或接收
- WDGVideoInviteStatusAccepting: 被邀请方接受邀请
- WDGVideoInviteStatusAccepted: 邀请方确认邀请被接收，双方建立会话
- WDGVideoInviteStatusRejected: 邀请被本地客户端拒绝
- WDGVideoInviteStatusCancelled: 邀请被邀请方撤销
- WDGVideoInviteStatusFailed: 邀请被接受但无法建立会话
