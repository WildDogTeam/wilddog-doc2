title: WDGVideoParticipant
---

代表会话的参与者。

## 属性

### participantID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull participantID;
```

**说明**

当前参与者的 Wilddog ID 。

</br>

---

### stream

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) WDGVideoRemoteStream *stream;
```

**说明**

当前参与者发布的视频、音频流。
