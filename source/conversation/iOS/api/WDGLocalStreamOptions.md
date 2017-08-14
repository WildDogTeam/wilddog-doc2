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

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGVideoDimensions) {
    WDGVideoDimensions360p,
    WDGVideoDimensions480p,
    WDGVideoDimensions720p,
    WDGVideoDimensions1080p, 
};
```

视频质量选项。

- `WDGVideoDimensions360p`: 视频尺寸 352x288
- `WDGVideoDimensions480p`: 视频尺寸 640x480
- `WDGVideoDimensions720p`: 视频尺寸 1280x720
- `WDGVideoDimensions1080p`: 暂未支持，若设置为此项，视频尺寸将使用 1920x1080
