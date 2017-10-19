title: 本地视频录制
---

本篇文档介绍如何录制并保存本地媒体流。

 
## 录制本地媒体流

在视频通话中，可以将媒体流录制下来，并保存到本地目录中：

```java
File file = getYourFile();
boolean success = mConversation.startLocalRecording(file,local,remote);
if(!success){
    //录制开启失败
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>

在 Android API level 18 以下无法使用视频录制功能。

</blockquote>


## 停止录制媒体流

调用 `stopLocalRecording()` 方法可以停止媒体流的录制：

```java
mConversation.stopLocalRecording();
```
