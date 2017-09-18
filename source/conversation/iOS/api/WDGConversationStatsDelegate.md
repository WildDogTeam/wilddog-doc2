title: WDGConversationStatsDelegate
---

[WDGConversation](/conversation/iOS/api/WDGConversation.html) 的代理方法。用于获取视频流的统计数据。

## 方法

### - conversation: didUpdateLocalStreamStatsReport

**定义**

```objectivec
- (void)conversation:(WDGConversation *)conversation didUpdateLocalStreamStatsReport:(WDGLocalStreamStatsReport *)report;
```

**说明**

[WDGConversation](/conversation/iOS/api/WDGConversation.html) 通过调用该方法更新本地媒体流的统计信息。

**参数**

参数名             | 说明
------------------|------------------
conversation      | 调用该方法的 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例。
report            | 包含本地媒体流统计信息的 [WDGLocalStreamStatsReport](/conversation/iOS/api/WDGLocalStreamStatsReport.html) 实例。

</br>

---

### - conversation: didUpdateRemoteStreamStatsReport

**定义**

```objectivec
- (void)conversation:(WDGConversation *)conversation didUpdateRemoteStreamStatsReport:(WDGRemoteStreamStatsReport *)report;
```

**说明**

[WDGConversation](/conversation/iOS/api/WDGConversation.html) 通过调用该方法更新远端媒体流的统计信息。

**参数**

参数名             | 说明
------------------|------------------
conversation      | 调用该方法的 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例。
report            | 包含远端媒体流统计信息的 [WDGRemoteStreamStatsReport](/conversation/iOS/api/WDGRemoteStreamStatsReport.html) 实例。

</br>

---