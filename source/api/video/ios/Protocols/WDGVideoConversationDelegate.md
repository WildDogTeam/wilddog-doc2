title: WDGVideoConversationDelegate
---

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 的代理方法。

## 方法

### -conversationDidConnected:

**定义**

```objectivec
- (void)conversationDidConnected:(nonnull WDGVideoConversation *)conversation;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 通过调用该方法通知代理当前视频会话已建立连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例。

</br>

---

### -conversation:didFailedToConnectWithError:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversation didFailedToConnectWithError:(nonnull NSError *)error;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 通过调用该方法通知代理当前视频会话未能建立连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例。
error|错误信息，描述未能建立连接的原因。

</br>

---

### -conversation:didDisconnectWithError:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversation didDisconnectWithError:(NSError *_Nullable)error;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 通过调用该方法通知代理当前视频会话已断开连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例。
error|错误信息，描述连接断开的原因。本地主动断开连接时为 nil 。

</br>

---

### -conversation:didConnectParticipant:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversation didConnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 通过调用该方法通知代理当前视频会话有新的参与者加入。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例。
participant|代表新的参与者的 [WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 实例。

</br>

---

### -conversation:didDisconnectParticipant:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversation didDisconnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html) 通过调用该方法通知代理当前视频会话某个参与者断开了连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例。
participant|代表已断开连接的参与者的 [WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 实例。

</br>

---

## 常量
