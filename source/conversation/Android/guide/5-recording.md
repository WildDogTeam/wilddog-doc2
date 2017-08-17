title: 本地视频录制
---

本篇文档介绍如何录制并保存本地媒体流。

 
## 录制本地媒体流

在视频通话中，可以将本地媒体流录制下来，并保存到本地目录中：

```java
File file = getYourFile();
mConversation.startLocalRecording(file,local,remote);
```

## 停止录制媒体流

调用 `stopLocalRecording()` 方法可以停止本地媒体流的录制：

```java
mConversation.stopLocalRecording();
```
