title: WDGVideoConferenceDelegate
---

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 的代理方法。

## 方法

### -conferenceDidConnected:

**定义**

```objectivec
- (void)conferenceDidConnected:(nonnull WDGVideoConference *)conference;
```

**说明**

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 通过调用该方法通知代理已与当前视频会议建立连接。

**参数**

 参数名 | 说明 
---|---
conference|调用该方法的 [WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 实例。

</br>

---

### -conference:didFailedToConnectWithError:

**定义**

```objectivec
- (void)conference:(nonnull WDGVideoConference *)conference didFailedToConnectWithError:(nonnull NSError *)error;
```

**说明**

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 通过调用该方法通知代理未能与当前视频会议建立连接。

**参数**

 参数名 | 说明 
---|---
conference|调用该方法的 [WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 实例。
error|错误信息，描述未能建立连接的原因。

</br>

---

### -conference:didDisconnectWithError:

**定义**

```objectivec
- (void)conference:(nonnull WDGVideoConference *)conference didDisconnectWithError:(NSError *_Nullable)error;
```

**说明**

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 通过调用该方法通知代理已与当前视频会议断开连接。

**参数**

 参数名 | 说明 
---|---
conference|调用该方法的 [WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 实例。
error|错误信息，描述连接断开的原因。本地主动断开连接时为 nil。

</br>

---

### -conference:didConnectParticipant:

**定义**

```objectivec
- (void)conference:(nonnull WDGVideoConference *)conference didConnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 通过调用该方法通知代理当前视频会议有新的参与者加入。

**参数**

 参数名 | 说明 
---|---
conference|调用该方法的 [WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 实例。
participant|代表新的参与者的 [WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 实例。

</br>

---

### -conference:didDisconnectParticipant:

**定义**

```objectivec
- (void)conference:(nonnull WDGVideoConference *)conference didDisconnectParticipant:(nonnull WDGVideoParticipant *)participant;
```

**说明**

[WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 通过调用该方法通知代理当前视频会议某个参与者断开了连接。

**参数**

 参数名 | 说明 
---|---
conference|调用该方法的 [WDGVideoConference](/conference/iOS/api/WDGVideoConference.html) 实例。
participant|代表已断开连接的参与者的 [WDGVideoParticipant](/conference/iOS/api/WDGVideoParticipant.html) 实例。
