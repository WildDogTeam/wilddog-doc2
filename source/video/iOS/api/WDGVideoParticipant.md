title: WDGVideoParticipant
---

代表视频通话或视频会议的一个参与者。

## 属性

### ID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull ID;
```

**说明**

该参与者的 Wilddog ID。

</br>

---

### stream

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) WDGVideoRemoteStream *stream;
```

**说明**

该参与者发布的媒体流。

</br>

---

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoParticipantDelegate> delegate;
```

**说明**

符合 [WDGVideoParticipantDelegate](/video/iOS/api/WDGVideoParticipantDelegate.html) 协议的代理。
