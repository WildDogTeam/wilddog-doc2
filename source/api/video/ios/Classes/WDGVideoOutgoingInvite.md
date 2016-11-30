title: WDGVideoOutgoingInvite
---

表示自己发出的会话邀请。

## 属性

### toParticipantID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull toParticipantID;
```

**说明**

被邀请者的 Wilddog ID 。

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

### -cancel

**定义**

```objectivec
- (void)cancel;
```

**说明**

调用此方法取消当前邀请。

</br>

---

## 常量

### WDGVideoInviteStatus

**说明**

表示邀请的状态。

- WDGVideoInviteStatusPending: 邀请刚刚被发送或接收
- WDGVideoInviteStatusAccepting: 被邀请方接受邀请
- WDGVideoInviteStatusAccepted: 邀请方确认邀请被接收，双方建立视频通话
- WDGVideoInviteStatusRejected: 邀请被本地客户端拒绝
- WDGVideoInviteStatusCancelled: 邀请被邀请方撤销
- WDGVideoInviteStatusFailed: 邀请被接受但无法建立视频通话
