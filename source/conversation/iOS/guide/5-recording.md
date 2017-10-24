title: 本地视频录制
---

本篇文档介绍如何录制并保存本地媒体流。

 
## 录制本地媒体流

在一对一视频通话中，使用 `-[WDGConversation startLocalRecording]` 来录制本地媒体流，该方法需要传入存储路径：

```objectivec
[self.conversation startLocalRecording:@"your-local-path"];
```

## 停止录制媒体流

使用 `-[WDGConversation stopLocalRecording]` 来停止录制本地媒体流。

```objectivec
[self.conversation stopLocalRecording];
```
