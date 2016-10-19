title: ConversationClient.Listener
---

`ConversationClient` 状态回调,当 `ConversationClient` 状态改变时会触发相应的方法。

## 方法

### onStartListeningForInvites(ConversationClient)

**定义**   

```java
void onStartListeningForInvites(ConversationClient client)
```

**说明**

`ConversationClient` 成功监听 `IncomingInvite` 时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/conversation-client.html) 对象|

</br>

---

### onStopListeningForInvites(ConversationClient)

**定义**   

```java
void onStopListeningForInvites(ConversationClient client)
```

**说明**

`ConversationClient` 结束对 `IncomingInvite` 的监听时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/conversation-client.html) 对象|

</br>

---

### onFailedToStartListening(ConversationClient, VideoException)

**定义**   

```java
void onFailedToStartListening(ConversationClient client, VideoException exception)
```

**说明**

`ConversationClient` 对 `IncomingInvite` 建立监听失败时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/conversation-client.html) 对象|
|exception|[VideoException](/api/video/android/video-exception.html),失败错误信息|

</br>

---

### onIncomingInvite(ConversationClient, IncomingInvite)

**定义**   

```java
void onIncomingInvite(ConversationClient client, IncomingInvite incomingInvite)
```

**说明**

`ConversationClient` 接收到会话邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/conversation-client.html) 对象|
|incomingInvite|等待接受的[IncomingInvite](/api/video/android/incoming-invite.html)会话邀请对象|

</br>

---

### onIncomingInviteCanceled(ConversationClient, IncomingInvite)

**定义**   

```java
void onIncomingInviteCanceled(ConversationClient client, IncomingInvite incomingInvite)
```

**说明**

会话发起者取消会话邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/conversation-client.html) 对象|
|incomingInvite|被取消的[IncomingInvite](/api/video/android/incoming-invite.html)会话邀请对象|
