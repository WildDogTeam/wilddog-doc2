title: 媒体流统计
---

本篇文档介绍如何获取本地视频流和远端视频流的统计数据。


### 设置代理

使用 [Conversation](/conversation/Android/api/conversation.html) 中的 [StatsListener](/conversation/Android/api/stats-listener.html) 接口可以实时获取视频的宽、高、帧率、发送接收总大小、比特率、延迟等。

```java
// VideoConversation 是邀请成功或者接受邀请成功时返回的参数。
mConversation.setStatsListener(rtcStatsListener);
```

### 统计本地视频数据

实现本地视频数据统计接口。

```java

public void onLocalStreamStatsReport(LocalStreamStatsReport localStreamStatsReport) {
    // localStreamStatsReport.getWidth()
    // localStreamStatsReport.getHeight()
    // localStreamStatsReport.getFps()
    // localStreamStatsReport.getBytesSent()
    // localStreamStatsReport.getBitsSentRate()
}
```

### 统计远程视频数据

实现远程视频数据统计接口。

```java
public void onRemoteStreamStatsReport(RemoteStreamStatsReport remoteStreamStatsReport) { 
    // remoteStreamStatsReport.getWidth()
    // remoteStreamStatsReport.getHeight()
    // remoteStreamStatsReport.getFps()
    // remoteStreamStatsReport.getBytesReceived()
    // remoteStreamStatsReport.getBitsReceivedRate()
    // remoteStreamStatsReport.getDelay()
}
```
