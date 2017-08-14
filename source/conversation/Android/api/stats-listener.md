title: StatsListener
---

统计信息接口，在回调方法中可以获取本地视频流以及对端视频流的统计信息。

## 方法

### onLocalStreamStatsReport(LocalStreamStatsReport)

**定义**   

```java
void onLocalStreamStatsReport(LocalStreamStatsReport localStreamStatsReport);
```

**说明**

生成本地统计信息后通过此回调通知调用者本地视频流的统计信息。

**参数**

| 参数名 | 描述 |
|---|---|
|localStreamStatsReport|[LocalStreamStatsReport](/conversation/Android/api/local-stream-stats-report.html)，本地视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等|

</br>

---


### onRemoteStreamStatsReport(RemoteStreamStatsReport)

**定义**   

```java
void onRemoteStreamStatsReport(RemoteStreamStatsReport remoteStreamStatsReport);
```

**说明**

生成本地统计信息后通过此回调通知调用者对端视频流的统计信息。

**参数**

| 参数名 | 描述 |
|---|---|
|remoteStreamStatsReport|[RemoteStreamStatsReport](/conversation/Android/api/remote-stream-stats-report.html)，对端视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等|


