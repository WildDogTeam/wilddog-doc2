title: WDGConversation
---

`WDGConversation` 代表用户参与的一对一视频通话，同一时间只能参与一个一对一视频通话。

## 属性

### remoteUid

**定义**

```objectivec
@property (nonatomic, strong) NSString *remoteUid;
```

**说明**

表示一对一视频通话对方的 uid。

</br>

---

### delegate

**定义**

```objectivec
@property (nonatomic, weak) id<WDGConversationDelegate> delegate;
```

**说明**

符合 [WDGConversationDelegate](/conversation/iOS/api/WDGConversationDelegate.html) 协议的代理，用于通知 `WDGConversation` 发生的事件。

</br>

---

### statsDelegate

**定义**

```objectivec
@property (nonatomic, weak, nullable) id<WDGConversationStatsDelegate> statsDelegate;
```

**说明**

符合 [WDGConversationStatsDelegate](/conversation/iOS/api/WDGConversationStatsDelegate.html) 协议的代理。用于获取媒体流的统计数据。

</br>

---

## 方法

### - acceptWithLocalStream:

**定义**

```objectivec
- (void)acceptWithLocalStream:(WDGLocalStream *)localStream;
```

**说明**

接受一对一视频通话邀请，并上传自己的本地媒体流。

**参数**

参数名             | 说明
------------------|------------------
localStream       | 表示本地媒体流。请参考 [WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html)。

</br>

---

### - reject

**定义**

```objectivec
- (void)reject;
```

**说明**

拒绝一对一视频通话邀请。

</br>

---

### - close

**定义**

```objectivec
- (void)close;
```

**说明**

结束当前一对一视频通话。

</br>

---

### - startLocalRecording:

**定义**

```objectivec
- (BOOL)startLocalRecording:(NSString *)filePath;
```

**说明**

开始录制本地音视频并保存到本地目录。

**参数**

参数名             | 说明
------------------|------------------
filePath          | 视频文件保存路径。

**返回值**

视频录制是否成功开启。

### - stopLocalRecording

**定义**

```objectivec
- (BOOL)stopLocalRecording;
```

**说明**

停止录制本地音视频。

**返回值**

视频录制是否成功关闭。

</br>

---
