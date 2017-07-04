title: WDGPosition
---

`WDGPosition`实例代表一个WilddogLocation SDK存储的位置信息。

## 属性

### latitude

##### 定义

```objectivec
@property (nonatomic, assign, readonly) double latitude;
```

##### 说明
位置信息的经度。


---

### longitude

##### 定义

```objectivec
@property (nonatomic, assign, readonly) double longitude;
```

##### 说明
位置信息的纬度。


---

### timestamp

##### 定义

```objectivec
@property (nonatomic, strong, readonly) NSDate *timestamp;
```

##### 说明
位置信息在设备上创建时的时间戳。


---

### customAttributes

##### 定义

```objectivec
@property (nonatomic, strong, readonly, nullable) NSDictionary *customAttributes;
```

##### 说明
随位置信息一同上传的附加信息。



---





## 方法

### - initWithLatitude:longitude:

##### 定义

```objectivec
- (instancetype)initWithLatitude:(double)latitude longitude:(double)longitude;
```

##### 说明
通过直接指定纬度和经度初始化 `WDGPosition` 实例。时间戳会自动根据设备当前时间生成。

##### 参数

参数名         | 说明
------------- | -------------
latitude      | 纬度
longitude     | 经度

##### 返回值
`WDGPosition` 实例。

---

### - initWithLatitude:longitude:timestamp:

##### 定义

```objectivec
- (instancetype)initWithLatitude:(double)latitude longitude:(double)longitude timestamp:(NSDate *)timestamp;
```

##### 说明
通过直接指定纬度、经度和时间戳初始化 `WDGPosition` 实例。

##### 参数

参数名         | 说明
------------- | -------------
latitude      | 纬度
longitude     | 经度
timestamp     | 指定的时间戳

##### 返回值
`WDGPosition` 实例。

---

### - initWithLatitude:longitude:timestamp:customAttributes:

##### 定义

```objectivec
- (instancetype)initWithLatitude:(double)latitude longitude:(double)longitude timestamp:(NSDate *)timestamp customAttributes:(NSDictionary *_Nullable)customAttributes;
```

##### 说明
通过直接指定纬度、经度、时间戳和自定义属性字典初始化 `WDGPosition` 实例。

##### 参数

参数名            | 说明
---------------- | -------------
latitude         | 纬度
longitude        | 经度
timestamp        | 指定的时间戳
customAttributes | 自定义属性字典

##### 返回值
`WDGPosition` 实例。

---

### - initWithCLLocation:

##### 定义

```objectivec
- (instancetype)initWithCLLocation:(CLLocation *)location;
```

##### 说明
通过Objective-C定义的`CLLocation`位置信息初始化 `WDGPosition` 实例。

##### 参数

参数名            | 说明
---------------- | -------------
location         | 位置信息

##### 返回值
`WDGPosition` 实例。

---

### - initWithCLLocation:customAttributes:

##### 定义

```objectivec
- (instancetype)initWithCLLocation:(CLLocation *)location customAttributes:(NSDictionary *_Nullable)customAttributes;
```

##### 说明
通过Objective-C定义的`CLLocation`位置信息和自定义属性字典初始化 `WDGPosition` 实例。

##### 参数

参数名            | 说明
---------------- | -------------
location         | 位置信息
customAttributes | 自定义属性字典

##### 返回值
`WDGPosition` 实例。
