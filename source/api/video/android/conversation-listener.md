title: Conversation.Listener
---

会话状态回调,当会议处于不同状态时触发不同回调方法。

## 方法

### onParticipantConnected(Conversation, Participant)

**定义**   

```java
void onParticipantConnected(Conversation conversation, Participant participant)
```

**说明**

被邀请加入会话的参与者接受邀请后,创建会话并成功连接后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/conversation.html),被邀请加入会话的参与者接受邀请后,建立的会话对象|
|participant|[Participant](/api/video/android/participant.html),接受邀请的会话参与者|

</br>

---

### onFailedToConnectParticipant(Conversation, Participant, ConversationException)

**定义**   

```java
void onFailedToConnectParticipant(Conversation conversation, Participant participant, ConversationException exception)
```

**说明**

接受邀请后,客户端建立视频通话连接失败时调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/conversation.html),被邀请者接受邀请后建立的会话对象|
|participant|[Participant](/api/video/android/participant.html),接收邀请的被邀请者|
|exception|[ConversationException](/api/video/android/conversation-exception.html),会话建立连接失败信息|

</br>

---

### onParticipantDisconnected(Conversation, Participant)

**定义**   

```java
void onParticipantDisconnected(Conversation conversation, Participant participant)
```

**说明**

被邀请人断开会话连接后调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/conversation.html),被邀请者接受邀请后建立的会话对象|
|participant|[Participant](/api/video/android/participant.html),接收邀请的被邀请者|

</br>

---

### onConversationEnded(Conversation, ConversationException)

**定义**   

```java
void onConversationEnded(Conversation conversation, ConversationException exception)
```

**说明**

会话结束后调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/conversation.html),已经结束的会话对象|
|exception|[ConversationException](/api/video/android/conversation-exception.html),会话结束异常信息|
