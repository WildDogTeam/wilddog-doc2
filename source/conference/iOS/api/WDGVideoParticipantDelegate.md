title: WDGVideoParticipantDelegate
---

[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 的代理方法。

## 方法

### -participant:didAddStream:

**定义**

```objectivec
- (void)participant:(nonnull WDGVideoParticipant *)participant didAddStream:(nonnull WDGVideoRemoteStream *)stream;
```

**说明**

[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 通过该方法通知代理收到参与者发布的媒体流。

**参数**

 参数名 | 说明 
---|---
participant|[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 对象，代表当前参与者。
stream|[WDGVideoRemoteStream](/conference/iOS/api/WDGVideoRemoteStream.html) 对象，代表收到的媒体流。

</br>

---

### -participant:didFailedToConnectWithError:

**定义**

```objectivec
- (void)participant:(nonnull WDGVideoParticipant *)participant didFailedToConnectWithError:(nonnull NSError *)error;
```

**说明**

[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 通过该方法通知代理未能收到参与者发布的媒体流。

**参数**

 参数名 | 说明 
---|---
participant|[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 对象，代表当前参与者。
error|错误信息，描述连接失败的原因。

</br>

---

### -participant:didDisconnectWithError:

**定义**

```objectivec
- (void)participant:(nonnull WDGVideoParticipant *)participant didDisconnectWithError:(NSError *_Nullable)error;
```

**说明**

[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 通过该方法通知代理参与者的媒体流中断。

**参数**

 参数名 | 说明 
---|---
participant|[WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 对象，代表当前参与者。
error|错误信息，描述媒体流中断的原因。

