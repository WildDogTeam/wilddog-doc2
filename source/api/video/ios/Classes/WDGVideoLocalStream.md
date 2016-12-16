title: WDGVideoLocalStream
---

`WDGVideoLocalStream` 继承自 [WDGVideoStream](../Classes/WDGVideoStream.html) ，具有 [WDGVideoStream](../Classes/WDGVideoStream.html) 所有的方法。

## 方法

### -initWithOptions:

**定义**

```objectivec
- (nullable instancetype)initWithOptions:(nonnull WDGVideoLocalStreamOptions *)options;
```

**说明**

依照配置创建一个本地视频流。同一时刻只能存在一个本地视频流，若此时已经创建其他视频流，会返回 nil。

**参数**

 参数名 | 说明 
---|---
options|[WDGVideoLocalStreamOptions](../Classes/WDGVideoLocalStreamOptions.html) 实例。

**返回值**

创建的本地视频流 `WDGVideoLocalStream` 实例。

</br>

---

### -switchCamera

**定义**

```objectivec
- (void)switchCamera;
```

**说明**

切换摄像头。
