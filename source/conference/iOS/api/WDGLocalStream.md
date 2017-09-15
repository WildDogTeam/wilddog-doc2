title: WDGLocalStream
---

表示用户设备采集的本地媒体流。

## 属性

### delegate

**定义**

```objectivec
@property (weak, nonatomic, nullable) id<WDGLocalStreamDelegate> delegate;
```

**说明**

符合 [WDGLocalStreamDelegate](/conversation/iOS/api/WDGLocalStreamDelegate.html) 协议的代理，可以对本地视频流进行处理。

</br>

---

## 方法

### + localStreamWithOptions:

**定义**

```objectivec
+ (void)localStreamWithOptions:(WDGLocalStreamOptions *)options;
```

**说明**

创建 `WDGLocalStream` 实例。

**参数**

参数名             | 说明 
------------------|------------------
options           | `WDGLocalStream` 的配置选项。

</br>

---


### - close

**定义**

```objectivec
- (void)close;
```

**说明**

关闭媒体流采集，媒体流被关闭后不能继续使用。

</br>

---

### - switchCamera:

**定义**

```objectivec
- (void)switchCamera;
```

**说明**

切换摄像头。
