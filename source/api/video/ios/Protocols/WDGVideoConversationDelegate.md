title: WDGVideoConversationDelegate
---

[WDGVideoConversation](../Classes/WDGVideoConversation.html)的代理方法。

## 方法

### -conversation:didConnectParticipant:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversationdidConnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html)通过调用该方法通知代理当前视频会话有新的参与者加入。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的[WDGVideoConversation](../Classes/WDGVideoConversation.html)实例。
participant|代表新的参与者的[WDGVideoParticipant](../Classes/WDGVideoParticipant.html)实例。

---

### -conversation:didFailToConnectParticipant:error:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversationdidFailToConnectParticipant:(nonnull WDGVideoParticipant *)participanterror:(nonnull NSError *)error;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html)通过调用该方法通知代理当前视频会话未能与某个参与者建立连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的[WDGVideoConversation](../Classes/WDGVideoConversation.html)实例。
participant|代表尝试与其建立连接的参与者的[WDGVideoParticipant](../Classes/WDGVideoParticipant.html)实例。 
error|表示连接建立失败的原因。

---

### -conversation:didDisconnectParticipant:

**定义**

```objectivec
- (void)conversation:(nonnull WDGVideoConversation *)conversationdidDisconnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConversation](../Classes/WDGVideoConversation.html)通过调用该方法通知代理当前视频会话某个参与者断开了连接。

**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的[WDGVideoConversation](../Classes/WDGVideoConversation.html)实例。
participant|代表已断开连接的参与者的[WDGVideoParticipant](../Classes/WDGVideoParticipant.html)实例。
