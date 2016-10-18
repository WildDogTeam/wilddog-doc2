title: WDGVideoConversation
---

表示加入的会话，同一时间只能加入一个会话。

## 属性

### mode

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoConversationMode mode;
```

**说明**

表明当前会话使用的模式。
目前包含 `P2P` 与 `Server-based` 两种模式。

</br>

---

### conversationID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull conversationID;
```

**说明**

表示当前会话的编号。

</br>

---

### userID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull userID;
```

**说明**

表示当前参加视频会话的用户 Wilddog ID 。

</br>

---

### localStream

**定义**

```objectivec
@property (readonly, strong, nonatomic) WDGVideoLocalStream *_Nonnull localStream;
```

**说明**

表示当前视频会话所使用的本地视频、音频流。

</br>

---

### participants

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSArray<WDGVideoParticipant *> *_Nonnull participants;
```

**说明**

数组中包含除自己外，已加入视频会话用户。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoConversationDelegate>delegate;
```

**说明**

符合[WDGVideoConversationDelegate](../Protocols/WDGVideoConversationDelegate.html)协议的代理。

</br>

---

## 方法

### -inviteUser:error:

**定义**

```objectivec
- (BOOL)inviteUser:(nonnull NSString *)userIDerror:(NSError *_Nullable *_Nullable)error;
```

**说明**

邀请用户加入当前会话。

**参数**

 参数名 | 说明 
---|---
userID|被邀请者的用户 Wilddog ID 。
error|若邀请未能发出则通过error返回原因。

**返回值**

YES 表示邀请成功，NO 表示邀请失败。

</br>

---

### -disconnect

**定义**

```objectivec
- (void)disconnect;
```

**说明**

命令当前会话断开连接。

</br>

---

### -getParticipant:

**定义**

```objectivec
- (WDGVideoParticipant *_Nullable)getParticipant:(nonnull NSString *)participantUserID;
```

**说明**

依据会话参与者的用户 Wilddog ID 获取对应的 [WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 模型。

**参数**

 参数名 | 说明 
---|---
participantUserID|会话参与者的用户 Wilddog ID 。

**返回值**

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 实例，若未找到相应用户，返回 nil。

</br>

---

## 常量

### WDGVideoConversationMode

**说明**

表示`WDGVideoConversation`使用的工作模式。

- WDGVideoConversationModeP2P:         表示 `P2P` 会话模式
- WDGVideoConversationModeServerBased: 表示 `Server-based` 会话模式
