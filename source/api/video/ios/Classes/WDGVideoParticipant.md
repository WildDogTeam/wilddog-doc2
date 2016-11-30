title: WDGVideoParticipant
---

代表会话的一个参与者。

## 属性

### ID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull ID;
```

**说明**

该参与者的 Wilddog ID 。

</br>

---

### stream

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) WDGVideoRemoteStream *stream;
```

**说明**

该参与者发布的音视频流。
