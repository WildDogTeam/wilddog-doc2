title: Conversation.Listener
---

远端参与者状态回调，当远端参与者的连接状态发生改变时会触发。

## 方法

### onStreamAdded(RemoteStream)

**定义**   

```java
void onStreamAdded(RemoteStream remoteStream)
```

**说明**

成功接收远端参与者发送的媒体流后触发，`Participant` 对象通过该方法通知用户收到参与者发布的音视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|remoteStream|[RemoteStream](/api/video/android/remote-stream.html),远端参与者发送的媒体流。|

</br>

---

### onConnectFailed(Participant, VideoException)

**定义**   

```java
void onConnectFailed(Participant participant,VideoException exception)
```

**说明**

本地参与者与远端参与者建立连接失败后触发。本方法仅会在无法与远端参与者建立连接时调用一次，如果成功建立连接后断开连接，则不会调用此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|participant|[Participant](/api/video/android/participant.html)连接失败的远端参与者对象|
|exception|[VideoException](/api/video/android/video-exception.html),连接失败错误信息|

</br>

---

### onDisconnected(Participant, VideoException)

**定义**   

```java
void onDisconnected(Participant participant,VideoException exception)
```

**说明**

连接建立成功后断开连接会触发此方法。此方法仅会在连接建立成功后调用，如果连接建立失败则直接调用 `onConnectFailed` 方法，不会触发此方法。
远端参与者连接中断会触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|participant|[Participant](/api/video/android/participant.html)断开连接的远端参与者对象|
|exception|[VideoException](/api/video/android/video-exception.html),连接断开错误信息|

</br>



