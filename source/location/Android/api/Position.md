title: Position
---

`Position`实例代表SDK存储的位置信息。


## 构造方法

### Position(latitude, longitude)；

##### 定义

```android
Position(double latitude, double longitude)；
```

##### 说明
通过直接指定纬度和经度初始化 `Position` 实例。时间戳会自动根据设备当前时间生成。

##### 参数

参数名         | 说明
------------- | -------------
latitude      | 纬度
longitude     | 经度

##### 返回值
`Position` 实例。

---

### Position( latitude, longitude, timestamp)

##### 定义

```android
Position(double latitude, double longitude, long timestamp)
```

##### 说明
通过直接指定纬度、经度和时间戳初始化 Position 实例。

##### 参数

参数名         | 说明
------------- | -------------
latitude      | 纬度
longitude     | 经度
timestamp     | 时间戳

##### 返回值
`Position` 实例。

---

### Position(latitude, longitude, timestamp, customAttributes)

##### 定义

```android
Position(double latitude, double longitude, long timestamp, String customAttributes)
```

##### 说明
通过直接指定纬度、经度、时间戳和自定义属性初始化 Position 实例。

##### 参数

参数名         | 说明
------------- | -------------
latitude      | 纬度
longitude     | 经度
timestamp     | 时间戳
customAttributes     | 自定义属性

##### 返回值
`Position` 实例。

---

## 方法

### getLatitude()；

##### 定义

```android
double getLatitude()；
```

##### 说明
获取维度。


##### 返回值
`double`

---

### getLongitude() ；

##### 定义

```android
double getLongitude()；
```

##### 说明
获取经度。


##### 返回值
`double`

---

### getTimestamp()；

##### 定义

```android
long getTimestamp()；
```

##### 说明
获取时间戳。


##### 返回值
`double`

---

### getCustomAttributes()

##### 定义

```android
String getCustomAttributes()
```

##### 说明
得到自定义属性。


##### 返回值
`double`

---
