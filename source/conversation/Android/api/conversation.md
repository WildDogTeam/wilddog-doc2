title: Conversation
-------------------

视频通话类，实现一对一的视频通话功能。

## 属性

### getRemoteUid()

**定义**   

```java
String getRemoteUid()
```

**说明**

获取当前视频通话远端 UID，此 ID 为不重复的字符串。


**返回值**

当前视频通话远端 UID。

---



## 方法

### accept(LocalStream)

**定义**   

```java
void accept(final LocalStream localStream)
```

**说明**

被叫方接受主叫方的呼叫。

**参数**

| 参数名 | 描述 |
|---|---|
|localStream|接受邀请时携带的本地媒体流对象。|

---

### reject()

**定义**   

```java
void reject()
```

**说明**

被叫方拒绝主叫方的呼叫。


---

### close()

**定义**   

```java
void close() 
```

**说明**

取消或挂断当前视频通话。


---

### setConversationListener(Conversation.Listener)

**定义**   

```java
void setConversationListener(Conversation.Listener listener)
```

**说明**

为视频通话设置状态监听,当被邀请者接受或拒绝时会改变视频通话的状态, Wilddog Video SDK 会触发 `Conversation.Listener` 的回调方法通知监听者。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|视频通话状态监听[Conversation.Listener](/conversation/Android/api/conversation-listener.html),参与者连接成功后会触发 onResponse 事件|


**示例**

```java
mConversation.setConversationListener(new Conversation.Listener() {
    @Override
    public void onResponse(CallStatus status) {
      //呼叫状态变更的回调                 
    }

    @Override
     public void onStreamReceived(RemoteStream stream); {
       //收到远程流的回调
     }

     @Override
     public void onError(WilddogVideoError error) {
       //错误信息的回调
     }

     @Override
     public void onClosed() {
       //会话结束的回调
     }
});
```

</br>

---
### setStatsListener(StatsListener)

**定义**   

```java
void setStatsListener(StatsListener listener)
```

**说明**

设置视频通话统计监听，用于获取视频流统计数据。
当视频通话生成统计信息后通过回调通知用户当前通话的统计信息，在连接成功后会生成统计信息（通常有 2-5 秒左右延迟），随后会以 2 秒为间隔不间断的触发回调方法返回统计信息。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[StatsListener](/conversation/Android/api/stats-listener.html)，视频通话统计监听|


**示例**

```java
mConversation.setStatsListener(new Conversation.StatsListener() {
    @Override
    public void onLocalStreamStatsReport(LocalStreamStatsReport localStreamStatsReport) {
        //获取本地视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等
    }

    @Override
    public void onRemoteStreamStatsReport(RemoteStreamStatsReport remoteStreamStatsReport) {
        //获取远程视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等
    }
});
```

</br>

---

### startLocalRecording(File,WilddogVideoView,WilddogVideoView)

**定义**   

```java
boolean startLocalRecording(File file,WilddogVideoView local, WilddogVideoView remote)
```

**说明**

开始多媒体录制,将视频存储到传入的文件对象中,需要用户自己申请读写存储设备的权限。

**参数**

| 参数名 | 描述 |
|---|---|
|file|录制多媒体存储的文件对象|
|local|录制多媒体本地视频流对象|
|remote|录制多媒体远程视频流对象|

**示例**

```java
mConversation.startLocalRecording(saveFile,local,remote);
```

</br>

---

### stopLocalRecording()

**定义**   

```java
void stopLocalRecording()
```

**说明**

结束多媒体录制。

**示例**

```java
mConversation.stopLocalRecording();
```

</br>

---
