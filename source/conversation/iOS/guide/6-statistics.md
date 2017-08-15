title: 媒体流统计
---

本篇文档介绍如何获取本地媒体流和远端媒体流的统计数据。


## 设置代理

设置 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 的代理 <[WDGConversationStatsDelegate](/conversation/iOS/api/WDGConversationStatsDelegate.html)> 用于实时获取视频流的宽、高、帧率、发送接收总大小、比特率、延迟等信息：

```objectivec
self.conversation.statsDelegate = self;
```

## 统计本地媒体流

实现代理方法 `-[WDGConversationStatsDelegate conversation:didUpdateLocalStreamStatsReport]`，持续收到本地媒体流的统计信息：

```objectivec
- (void)conversation:(WDGConversation *)conversation didUpdateLocalStreamStatsReport:(WDGLocalStreamStatsReport *)report {
    // report.width
    // report.height
    // report.FPS
    // report.bytesSent
    // report.bitsSentRate
}
```

## 统计远端媒体流

实现代理方法 `-[WDGConversationStatsDelegate conversation:didUpdateRemoteStreamStatsReport]`，持续收到远端媒体流的统计信息：

```objectivec
- (void)conversation:(WDGConversation *)conversation didUpdateRemoteStreamStatsReport:(WDGRemoteStreamStatsReport *)report {
    // report.width
    // report.height
    // report.FPS
    // report.bytesReceived
    // report.bitsReceivedRate
    // report.delay
}
```
