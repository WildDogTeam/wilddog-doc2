title: WDGVideoParticipantDelegate
---

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 的代理方法。

## 方法

### -participant:didAddStream:

**定义**

```objectivec
- (void)participant:(nonnull WDGVideoParticipant *)participant didAddStream:(nonnull WDGVideoRemoteStream *)stream;
```

**说明**

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 通过该方法通知代理收到参与者发布的音视频流。

**参数**

 参数名 | 说明 
---|---
participant|[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 对象。
stream|[WDGVideoRemoteStream](../Classes/WDGVideoRemoteStream.html) 对象，代表收到的音视频流。

</br>

---

### -participant:didFailedToConnectWithError:

**定义**

```objectivec
- (void)participant:(nonnull WDGVideoParticipant *)participant didFailedToConnectWithError:(nonnull NSError *)error;
```

**说明**

[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 通过该方法通知代理未能收到参与者发布的音视频流或者音视频流中断。

**参数**

 参数名 | 说明 
---|---
participant|[WDGVideoParticipant](../Classes/WDGVideoParticipant.html) 对象。
error|错误信息，描述连接失败的原因。
