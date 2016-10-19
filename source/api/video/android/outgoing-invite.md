title : OutgoingInvite
---

<span id="OutgoingInvite" />

使用 `Conversation.inviteToConversation` 方法发起邀请时会生成 `OutgoingInvite` 对象,通过 `cancel` 方法可以取消邀请。
## 方法
### cancel()



**定义**   

void cancel()

**说明**

发起一个会话邀请后,会话发起人通过 `cancel` 方法取消邀请。

**示例**

```java
	//outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {//...});
	//取消发起会话邀请
	outgoingInvite.cancel();
```

****

