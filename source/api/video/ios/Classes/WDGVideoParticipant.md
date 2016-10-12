title: WDGVideoParticipant
---

代表除自己外会话的参与者。

## 属性

### userID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull userID;
```

**说明**

当前参与者的用户uid。

</br>

---

### stream

**定义**

```objectivec
@property (readonly, strong, nonatomic, nullable) WDGVideoRemoteStream *stream;
```

**说明**

当前参与者发布的视频、音频流。
