title: WDGVideoConversation
---

表示加入的会话，同一时间只能加入一个会话。

## 属性

### ID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull ID;
```

**说明**

表示当前会话的编号。

</br>

---

### status

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoConnectionStatus status;
```

**说明**

`WDGVideoConnectionStatus` 类型，表示会话的状态。

</br>

---

### localParticipant

**定义**

```objectivec
@property (readonly, strong, nonatomic) WDGVideoLocalParticipant *_Nonnull localParticipant;
```

**说明**

[WDGVideoLocalParticipant](../Classes/WDGVideoLocalParticipant.html) 类型，表示当前视频会话所使用的本地视频、音频流。

</br>

---

### participant

**定义**

```objectivec
@property (readonly, strong, nonatomic) WDGVideoParticipant *_Nonnull participant;
```

**说明**

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 对象，视频会话的对方。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoConversationDelegate>delegate;
```

**说明**

符合 [WDGVideoConversationDelegate](../Protocols/WDGVideoConversationDelegate.html) 协议的代理。

</br>

---

## 方法

### -disconnect

**定义**

```objectivec
- (void)disconnect;
```

**说明**

断开当前会话的连接。

</br>

---

## 常量

### WDGVideoConnectionStatus 

**说明**

表示会话或会议的连接状态。

- WDGVideoConnectionStatusConnecting: 表示会话或会议正在连接中。
- WDGVideoConnectionStatusConnected: 表示会话或会议已连接。
- WDGVideoConnectionStatusDisconnected: 表示会话或会议已断开连接。
