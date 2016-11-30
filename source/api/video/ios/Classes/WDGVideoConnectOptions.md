title: WDGVideoConnectOptions
---

发起视频通话或连接到会议时使用的配置选项。

## 属性

### localStream

**定义**

```objectivec
@property (readwrite, strong, nonatomic)WDGVideoLocalStream *_Nonnull localStream;
```

**说明**

发起视频通话或连接到会议时使用的本地媒体流。

</br>

---

### userData

**定义**

```objectivec
@property (readwrite, strong, nonatomic, nullable) NSString *userData;
```

**说明**

可选，自定义字符串。发起视频通话时，被邀请者将在 [WDGVideoIncomingInvite](../Classes/WDGVideoIncomingInvite.html) 对象中得到该数据。连接会议时，该数据发往后端服务器。

</br>

---

## 方法

### -initWithLocalStream:

**定义**

```objectivec
- (nonnull instancetype)initWithLocalStream:(nonnull WDGVideoLocalStream *)localStream;
```

**说明**

初始化 `WDGVideoConnectOptions` 对象。

**参数**

 参数名 | 说明 
---|---
localStream|[WDGVideoLocalStream](../Classes/WDGVideoLocalStream.html) 类型的本地媒体流对象。

**返回值**

`WDGVideoConnectOptions` 对象。
