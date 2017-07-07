title: AMapLocationProvider
---

对高德定位 SDK 进行封装，使其可以作为位置信息的数据源。


## 方法

### getSampleType()

##### 定义

```android
double getSampleType()
```

##### 说明
采样的方式，基于时间间隔采样或者基于移动距离采样。


##### 返回值
`ProviderType` 枚举类型

---

### getTimeInterval()

##### 定义

```android
int getTimeInterval()
```

##### 说明
得到时间间隔。


##### 返回值
`int`

---

### getDistaneInterval()

##### 定义

```android
int getDistaneInterval()
```

##### 说明
得到距离间隔。


##### 返回值
`int`

---
