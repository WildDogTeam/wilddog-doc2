title: RTCStatsListener
---

统计信息接口，在回调方法中可以获取本地视频流以及对端视频流的统计信息。

## 方法

### onLocalStats()

**定义**   

```java
void onLocalStats(LocalStats localStats);
```

**说明**

生成本地统计信息后通过此回调通知调用者本地视频流的统计信息。

**参数**

| 参数名 | 描述 |
|---|---|
|localStats|[LocalStats](/video/Android/api/local-stats.html)，本地视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等|

</br>

---


### onRemoteStats()

**定义**   

```java
void onRemoteStats(RemoteStats remoteStats);
```

**说明**

生成本地统计信息后通过此回调通知调用者对端视频流的统计信息。

**参数**

| 参数名 | 描述 |
|---|---|
|remoteStats|[RemoteStats](/video/Android/api/remote-stats.html)，对端视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等|


