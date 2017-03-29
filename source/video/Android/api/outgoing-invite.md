title : OutgoingInvite
---

<span id="OutgoingInvite" />

使用 `WilddogVideoClient.inviteToConversation()` 方法发起邀请时会生成 `OutgoingInvite` 对象,通过 `cancel` 方法可以取消邀请。

## 属性
### getStatus()

**定义**

String getStatus()

**说明**

表示当前邀请的状态。

**返回值**

当前邀请的状态。

**示例**

```java
	outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {//...});
	//取消发起会话邀请
	String status = outgoingInvite.getStatus();
```

</br>

---

## 方法
### cancel()

**定义**   

void cancel()

**说明**

发起一个会话邀请后,会话发起人通过 `cancel` 方法取消邀请。

**示例**

```java
	outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {//...});
	//取消发起会话邀请
	outgoingInvite.cancel();
```

</br>

---

