title: Conversation.Listener
---

视频通话状态回调,当视频通话连接状态改变和参与者状态改变时会触发回调方法通知使用者视频通话的状态。

## 方法

### onConnected(Conversation)

**定义**   

```java
void onConnected(Conversation conversation)
```

**说明**

本地参与者与远端参与者成功建立连接后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/video/Android/api/conversation.html),连接建立成功后创建的视频通话对象|

</br>

---

### onConnectFailed(Conversation, VideoException)

**定义**   

```java
void onConnectFailed(Conversation conversation, VideoException exception)
```

**说明**

本地参与者与远端参与者建立连接失败后触发。本方法仅会在无法与远端参与者建立连接时调用一次，如果成功建立连接后断开连接，则不会调用此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/video/Android/api/conversation.html),调用 `WilddogVideoClient.inviteToConversation()` 方法时创建的视频通话对象|
|exception|[VideoException](/video/Android/api/video-exception.html),视频通话建立连接失败信息|

</br>

---

### onDisconnected(Conversation, VideoException)

**定义**   

```java
void onDisconnected(Conversation conversation, VideoException exception)
```

**说明**

连接建立成功后断开连接会触发此方法。此方法仅会在连接建立成功后调用，如果连接建立失败则直接调用 `onConnectFailed` 方法，不会触发此方法。
本地参与者主动断开连接或者其他原因引起的连接中断都会触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/video/Android/api/conversation.html),调用 `WilddogVideoClient.inviteToConversation()` 方法时创建的视频通话对象|
|exception|[VideoException](/video/Android/api/video-exception.html),视频通话建立连接失败信息|

</br>

---

### onParticipantConnected(Conversation, Participant)

**定义**   

```java
void onParticipantConnected(Conversation conversation, Participant participant)
```

**说明**

收到远端参与者加入的信息后触发此方法，此时并未与远端参与者连接成功。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/video/Android/api/conversation.html),调用 `WilddogVideoClient.inviteToConversation()` 方法时创建的视频通话对象|
|participant|[Participant](/video/Android/api/participant.html),视频通话的远端参与者|

</br>

---

### onParticipantDisconnected(Conversation, Participant)

**定义**   

```java
void onParticipantDisconnected(Conversation conversation, Participant participant)
```

**说明**

收到远端参与者离开的消息后会触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/video/Android/api/conversation.html),调用 `WilddogVideoClient.inviteToConversation()` 方法时创建的视频通话对象|
|participant|[Participant](/video/Android/api/participant.html),视频通话的远端参与者|

</br>

