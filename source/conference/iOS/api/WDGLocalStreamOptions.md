title: WDGLocalStreamOptions
---

`WDGLocalStreamOption` 中包含了音／视频开关、视频尺寸、最大帧率等选项，用于配置本地媒体流。

## 属性

### shouldCaptureAudio

**定义**

```objectivec
@property (nonatomic, assign) BOOL shouldCaptureAudio;
```

**说明**

是否采集本地音频，默认为 YES。

</br>

---

### shouldCaptureVideo

**定义**

```objectivec
@property (nonatomic, assign) BOOL shouldCaptureVideo;
```

**说明**

是否采集本地视频，默认为 YES。

</br>

---

### defaultPosition

**定义**

```objectivec
@property(nonatomic, assign) WDGCaptureDevicePosition defaultPosition;
```

**说明**

控制本地流的初始摄像头朝向。默认使用前置摄像头。

</br>

---

### dimension

**定义**

```objectivec
@property (nonatomic, assign) WDGVideoDimensions dimension;
```

**说明**

视频质量选项。默认为 `WDGVideoDimensions480p`。

</br>

---

### maxFPS

**定义**

```objectivec
@property (nonatomic, assign) int maxFPS;
```

**说明**

表示最大的视频帧率，默认为 16fps。

</br>

---

### maxBiterateBps

**定义**

```objectivec
@property (nonatomic, strong) NSNumber *_Nullable maxBitrateBps;
```

**说明**

表示最大码率，不设置则使用系统默认值。最大值为 2Mbps，且不能小于最小码率。

</br>

---

### maxBiterateBps

**定义**

```objectivec
@property (nonatomic, strong) NSNumber *_Nullable minBitrateBps;
```

**说明**

表示最大码率，不设置则使用系统默认值。最小值为 50bps，且不能大于最大码率。

</br>

---

## 方法

### - init

**定义**

```objectivec
- (instancetype)init;
```

**说明**

使用默认配置初始化。默认配置为音频开启，视频质量使用 `WDGVideoDimensions480p` 选项。

**返回值**

`WDGVideoLocalStreamOptions` 实例。

</br>

---

## 常量

### WDGVideoConstraints

**说明**
视频质量选项。

- `WDGVideoDimensions120p`: 视频尺寸 192x144
- `WDGVideoDimensions240p`: 视频尺寸 352x288
- `WDGVideoDimensions360p`: 视频尺寸 480x360
- `WDGVideoDimensions480p`: 视频尺寸 640x480
- `WDGVideoDimensions720p`: 视频尺寸 1280x720
- `WDGVideoDimensions1080p`: 暂未支持，若设置为此项，视频尺寸将使用 1280x720

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGVideoDimensions) {
    WDGVideoDimensions120p,
    WDGVideoDimensions240p,
    WDGVideoDimensions360p,
    WDGVideoDimensions480p,
    WDGVideoDimensions720p,
    WDGVideoDimensions1080p, 
};
```




### WDGVideoConstraints

**说明**
摄像头位置

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGCaptureDevicePosition) {
    //前置摄像头
    WDGCaptureDevicePositionFront,
    //后置摄像头
    WDGCaptureDevicePositionBack
};
```

