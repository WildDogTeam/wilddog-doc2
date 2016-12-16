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

### onStreamRemoved(RemoteStream)

**定义**   

```java
void onStreamRemoved(RemoteStream remoteStream)
```

**说明**

远端参与者发送的媒体流。

**参数**

| 参数名 | 描述 |
|---|---|
|remoteStream|[RemoteStream](/api/video/android/remote-stream.html),远端参与者发送的媒体流。|

</br>

---

### onError(VideoException)

**定义**   

```java
void onError(VideoException exception)
```

**说明**

断开连接或者连接失败错误回调。

**参数**

| 参数名 | 描述 |
|---|---|
|exception|[VideoException](/api/video/android/video-exception.html),连接失败错误信息|

</br>



