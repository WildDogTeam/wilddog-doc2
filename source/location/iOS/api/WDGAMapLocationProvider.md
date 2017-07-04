title: WDGAMapLocationProvider
---

对高德定位 SDK 进行封装，使其可以作为位置信息的数据源。

## 属性

### sampleType

##### 定义

```objectivec
@property (nonatomic, assign) WDGLocationSampleType sampleType;
```

##### 说明
采样的方式，基于时间间隔采样或者基于移动距离采样。

---

### timeInterval

##### 定义

```objectivec
@property (nonatomic, assign) NSTimeInterval timeInterval;
```

##### 说明
若当前采样方式为时间间隔，通过这个属性控制时间间隔的大小。单位为秒，范围为 1 到 300 秒。

---

### distance

##### 定义

```objectivec
@property (nonatomic, assign) double distance;
```

##### 说明
若当前采样方式为距离，通过这个属性控制距离的大小。单位为米，范围为 0 到 100 米。


---


## 方法

### - initWithTimeInterval:

##### 定义

```objectivec
- (instancetype)initWithTimeInterval:(NSTimeInterval)timeInterval;
```

##### 说明
将采样方式设置为基于时间间隔采样并设置间隔时间。

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
- (instancetype)initWithDistance:(double)distance;
```

##### 说明
将采样方式设置为基于时间间隔采样并设置间隔时间。

##### 参数

参数名         | 说明
------------- | -------------
timeInterval  | 采样的间隔时间。单位为秒，范围为 1 到 300 秒。

##### 返回值
`WDGAMapLocationProvider` 实例。

---

### + defaultLocationProvider

##### 定义

```objectivec
+ (instancetype)defaultLocationProvider;
```

##### 说明
采用默认的采样方式，按时间间隔采样，间隔为5s。

##### 返回值
`WDGAMapLocationProvider` 实例。