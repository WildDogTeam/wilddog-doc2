title: WDGLocalStream
---

表示用户设备采集的本地媒体流。继承自 [WDGStream](/conference/iOS/api/WDGStream.html) ，具有父类所有的属性和方法。

## 属性

### delegate

**定义**

```objectivec
@property (weak, nonatomic, nullable) id<WDGLocalStreamDelegate> delegate;
```

**说明**

符合 [WDGLocalStreamDelegate](/conference/iOS/api/WDGLocalStreamDelegate.html) 协议的代理，可以对本地视频流进行处理。

</br>

---

## 方法

### + localStreamWithOptions:

**定义**

```objectivec
+ (instancetype)localStreamWithOptions:(WDGLocalStreamOptions *)options;
```

**说明**

创建 `WDGLocalStream` 实例。

**参数**

参数名             | 说明
------------------|------------------
options           | `WDGLocalStream` 的配置选项。请参考 [WDGLocalStreamOptions](/conference/iOS/api/WDGLocalStreamOptions.html)

</br>

**返回值**

`WDGLocalStream` 实例。

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
