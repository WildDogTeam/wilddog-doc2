title: WDGVideoConversationStatsDelegate
---

[WDGVideoConversation](/video/iOS/api/WDGVideoConversation.html) 的代理方法。用于统计视频流数据。

## 方法

### -conversation:didUpdateLocalStreamStatsReport

**定义**

```objectivec
- (void)conversation:(WDGVideoConversation *)conversation didUpdateLocalStreamStatsReport:(WDGVideoLocalStreamStatsReport *)report;
```

**说明**

[WDGVideoConversation](/video/iOS/api/WDGVideoConversation.html) 通过调用该方法通知代理处理当前视频通话中本地视频流的统计信息。


**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](/video/iOS/api/WDGVideoConversation.html) 实例。
report|[WDGVideoLocalStreamStatsReport](/video/iOS/api/WDGVideoLocalStreamStatsReport.html) 实例。

</br>

---

### -conversation:didUpdateRemoteStreamStatsReport

**定义**

```objectivec
- (void)conversation:(WDGVideoConversation *)conversation didUpdateRemoteStreamStatsReport:(WDGVideoRemoteStreamStatsReport *)report;
```

**说明**

[WDGVideoConversation](/video/iOS/api/WDGVideoConversation.html) 通过调用该方法通知代理处理当前视频通话中远程视频流的统计信息。


**参数**

 参数名 | 说明 
---|---
conversation|调用该方法的 [WDGVideoConversation](/video/iOS/api/WDGVideoConversation.html) 实例。
report|[WDGVideoLocalStreamStatsReport](/video/iOS/api/WDGVideoRemoteStreamStatsReport.html) 实例。

</br>

---