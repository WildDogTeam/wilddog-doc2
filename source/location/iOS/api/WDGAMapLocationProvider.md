title: WDGAMapLocationProvider
---

对高德定位 SDK 进行封装，使其可以作为位置信息的数据源。

## 属性

### sampleType

##### 定义

```objectivec
@property (nonatomic, assign, readonly) WDGLocationSampleType sampleType;
```

##### 说明
采样的方式，基于时间间隔采样或者基于移动距离采样。

---

### timeInterval

##### 定义

```objectivec
@property (nonatomic, assign, readonly) NSTimeInterval timeInterval;
```

##### 说明
若当前采样方式为时间间隔，通过这个属性控制时间间隔的大小。单位为秒，范围为 1 到 300 秒。

---

### distance

##### 定义

```objectivec
@property (nonatomic, assign, readonly) double distanceInterval;
```

##### 说明
若当前采样方式为距离，通过这个属性控制距离的大小。单位为米，范围为 0 到 500 米。

---

### currentPosition

##### 定义

```objectivec
@property (nonatomic, strong, readonly, nullable) WDGPosition *currentPosition;
```

##### 说明
从这个位置数据源获得当前位置。


---


## 方法

### - initWithTimeInterval:

##### 定义

```objectivec
- (instancetype)initWithTimeInterval:(NSTimeInterval)timeInterval;
```

##### 说明
将采样方式设置为基于时间间隔采样并设置间隔时间，单位为秒。

##### 参数

参数名         | 说明
------------- | -------------
timeInterval  | 采样的间隔时间。单位为秒，范围为 1 到 300 秒。

##### 返回值
`WDGAMapLocationProvider` 实例。

---

### - initWithDistance:

##### 定义

```objectivec
- (instancetype)initWithDistanceInterval:(double)distanceInterval;
```

##### 说明
将采样方式设置为基于移动距离采样并设置两次采样之间的最小距离。

##### 参数

参数名             | 说明
----------------- | -------------
distanceInterval  | 两次采样之间的最小距离。单位为米，范围为 0 到 500 米。

##### 返回值
`WDGAMapLocationProvider` 实例。

---
