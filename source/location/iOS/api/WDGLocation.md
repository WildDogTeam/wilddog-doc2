title: WDGLocation
---

WilddogLocation的主入口，使用`WDGLocation`实例进行位置同步、范围监听、轨迹查询。

## 属性

### syncReference

##### 定义

```objectivec
@property (nonatomic, strong, readonly) WDGSyncReference *syncReference;
```

##### 说明
`WDGSyncReference`实例，`WDGLocation`的数据读写将在这个实例所表示的路径下进行。

---

### delegate

##### 定义

```objectivec
@property (nonatomic, weak, nullable) id<WDGLocationDelegate> delegate;
```

##### 说明
遵守`WDGLocationDelegate`协议的代理。


---


## 方法

### - initWithSyncReference:

##### 定义

```objectivec
- (instancetype)initWithSyncReference:(WDGSyncReference *)syncReference;
```

##### 说明
通过一个`WDGSyncReference`实例进行初始化。`WDGLocation`实例。

##### 参数

参数名         | 说明
------------- | -------------
syncReference | 一个`WDGSyncReference`实例，后续的数据读写都在这个实例所在的路径下进行。

##### 返回值
初始化成功的`WDGLocation`实例。

---

### - startTracingPositionForKey:

##### 定义

```objectivec
- (void)startTracingPositionForKey:(NSString *)key;
```

##### 说明
开启自动位置同步，SDK 自动将 locationProvider 提供的位置数据上传到 key 名下，使用默认的LocationProvider，采样间隔为5s。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将上传到这个 key 名下。

---

### - startTracingPositionForKey:withCompletionBlock:

##### 定义

```objectivec
- (void)startTracingPositionForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
开启自动位置同步，SDK 自动将 locationProvider 提供的位置数据上传到 key 名下，使用默认的LocationProvider，采样间隔为5s。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将上传到这个 key 名下。
block         | 完成后执行的回调。

---

### - startTracingPositionForKey:withLocationProvider:

##### 定义

```objectivec
- (void)startTracingPositionForKey:(NSString *)key withLocationProvider:(WDGAMapLocationProvider *)locationProvider;
```

##### 说明
开启自动位置同步，SDK 自动将 locationProvider 提供的位置数据上传到 key 名下。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
locationProvider | `WDGLocationProvider`实例，位置数据的提供者
block            | 完成后执行的回调。

---

### - startTracingPositionForKey:withLocationProvider:withCompletionBlock:

##### 定义

```objectivec
- (void)startTracingPositionForKey:(NSString *)key withLocationProvider:(WDGAMapLocationProvider *)locationProvider withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
开启自动位置同步，SDK 自动将 locationProvider 提供的位置数据上传到 key 名下。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
locationProvider | `WDGLocationProvider`实例，位置数据的提供者

---

### - stopTracingPositionForKey:

##### 定义

```objectivec
- (void)stopTracingPositionForKey:(NSString *)key;
```

##### 说明
终止针对 key 的自动位置同步。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要终止自动位置同步的 key。

---

### - stopTracingPositionForKey:withCompletionBlock:

##### 定义

```objectivec
- (void)stopTracingPositionForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
终止针对 key 的自动位置同步。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要终止自动位置同步的 key。
block         | 完成后执行的回调。

---

### - setPosition:forKey:

##### 定义

```objectivec
- (void)setPosition:(WDGPosition *)position forKey:(NSString *)key;
```

##### 说明
手动将位置数据写入。

##### 参数

参数名         | 说明
------------- | -------------
position      | 要写入的位置数据。
key           | 位置数据将写入 key 名下。

---

### - setPosition:forKey:withCompletionBlock:

##### 定义

```objectivec
- (void)setPosition:(WDGPosition *)position forKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
手动将位置数据写入。

##### 参数

参数名         | 说明
------------- | -------------
position      | 要写入的位置数据。
key           | 位置数据将写入 key 名下。
block         | 写入操作的回调函数。

---

### - getPositionForKey:withBlock:

##### 定义

```objectivec
- (void)getPositionForKey:(NSString *)key withBlock:(WDGLocationCallbackBlock)block;
```

##### 说明
获取某个 key 最新位置。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要获取其位置的 key。
block         | 包含位置信息或错误信息的回调函数。

---

### - observePositionForKey:withBlock:

##### 定义

```objectivec
- (WilddogHandle)observePositionForKey:(NSString *)key withBlock:(WDGLocationCallbackBlock)block;
```

##### 说明
持续监听指定 key 的位置。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要获取其位置的 key。
block         | 包含位置信息或错误信息的回调函数。

##### 返回值
代表当前监听的编号，可用于稍后取消监听。

---

### - removeObserverWithHandle:

##### 定义

```objectivec
- (void)removeObserverWithHandle:(WilddogHandle)handle;
```

##### 说明
取消指定的位置监听。

##### 参数

参数名         | 说明
------------- | -------------
handle        | 要取消的监听的编号。

---

### - removeAllObserversForKey:

##### 定义

```objectivec
- (void)removeAllObserversForKey:(NSString *)key;
```

##### 说明
取消对指定key的位置监听。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要取消监听的key。

---

### - removeAllObservers

##### 定义

```objectivec
- (void)removeAllObservers;
```

##### 说明
取消所有位置监听。

---

### - removePositionForKey:

##### 定义

```objectivec
- (void)removePositionForKey:(NSString *)key;
```

##### 说明
移除指定key下的位置数据。

##### 参数

参数名         | 说明
------------- | -------------
key           | 需要移除的节点。

---

### - removePositionForKey:withCompletionBlock:

##### 定义

```objectivec
- (void)removePositionForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
移除指定key下的位置数据。

##### 参数

参数名         | 说明
------------- | -------------
key           | 需要移除的节点。
block         | 删除操作的回调函数。

---

### - startRecordingPathForKey:

##### 定义

```objectivec
- (void)startRecordingPathForKey:(NSString *)key;
```

##### 说明
开始记录 key 的轨迹。开启成功后每次 key 的位置同步数据更新时，都将存一份副本到实时轨迹数据库中。使用默认的LocationProvider，采样间隔为5s。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要记录轨迹的 key。

---

### - startRecordingPathForKey:withCompletionBlock

##### 定义

```objectivec
- (void)startRecordingPathForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
开始记录 key 的轨迹。开启成功后每次 key 的位置同步数据更新时，都将存一份副本到实时轨迹数据库中。使用默认的LocationProvider，采样间隔为5s。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要记录轨迹的 key。
block            | 完成后执行的回调。

---

### - startRecordingPathForKey:withLocationProvider:

##### 定义

```objectivec
- (void)startRecordingPathForKey:(NSString *)key withLocationProvider:(WDGLocationProvider *)locationProvider;
```

##### 说明
开始记录 key 的轨迹。开启成功后每次 key 的位置同步数据更新时，都将存一份副本到实时轨迹数据库中。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要记录轨迹的 key。
locationProvider | `WDGLocationProvider`实例，位置数据的提供者

---

### - startRecordingPathForKey:withLocationProvider:withCompletionBlock:

##### 定义

```objectivec
- (void)startRecordingPathForKey:(NSString *)key withLocationProvider:(WDGAMapLocationProvider *)locationProvider withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
开始记录 key 的轨迹。开启成功后每次 key 的位置同步数据更新时，都将存一份副本到实时轨迹数据库中。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要记录轨迹的 key。
locationProvider | `WDGLocationProvider`实例，位置数据的提供者
block            | 完成后执行的回调。

---

### - stopRecordingPathForKey:

##### 定义

```objectivec
- (void)stopRecordingPathForKey:(NSString *)key;
```

##### 说明
终止 key 的轨迹记录。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要终止记录轨迹的 key。

---

### - stopRecordingPathForKey:withCompletionBlock:

##### 定义

```objectivec
- (void)stopRecordingPathForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
终止 key 的轨迹记录。

##### 参数

参数名            | 说明
---------------- | -------------
key              | 要终止记录轨迹的 key。
block            | 完成后执行的回调。

---

### - pathQueryForKey:startTime:endTime:

##### 定义

```objectivec
- (WDGPathQuery *)pathQueryForKey:(NSString *)key startTime:(NSDate *)startTime endTime:(NSDate *_Nullable)endTime;
```

##### 说明
初始化一个用于实时轨迹查询的 `WDGPathQuery` 实例。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要查询的 key。
startTime     | 要查询的时间段的开始时间。
endTime       | 要查询的时间段的结束时间。

##### 返回值
`WDGPathQuery` 实例。

---

### - pathQueryForKey:

##### 定义

```objectivec
- (WDGPathQuery *)pathQueryForKey:(NSString *)key;
```

##### 说明
初始化一个用于实时轨迹查询的 `WDGPathQuery` 实例，不需要开始、结束时间，查询一个key的全部记录。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要查询的 key。

##### 返回值
`WDGPathQuery` 实例。

---

### - pathQueryForKey:startTime:

##### 定义

```objectivec
- (WDGPathQuery *)pathQueryForKey:(NSString *)key startTime:(NSDate *)startTime;
```

##### 说明
初始化一个用于实时轨迹查询的 `WDGPathQuery` 实例。不设置结束时间，如果选择持续监听，将持续更新。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要查询的 key。
startTime     | 要查询的时间段的开始时间。

##### 返回值
`WDGPathQuery` 实例。

---

### - pathQueryForKey:endTime:

##### 定义

```objectivec
- (WDGPathQuery *)pathQueryForKey:(NSString *)key startTime:(NSDate *)startTime endTime:(NSDate *_Nullable)endTime;
```

##### 说明
初始化一个用于实时轨迹查询的 `WDGPathQuery` 实例。默认从最早的轨迹记录开始查询。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要查询的 key。
endTime       | 要查询的时间段的结束时间。

##### 返回值
`WDGPathQuery` 实例。

---

### - removePathForKey:

##### 定义

```objectivec
- (void)removePathForKey:(NSString *)key;
```

##### 说明
移除指定key下的轨迹记录。

##### 参数

参数名         | 说明
------------- | -------------
key           | 需要移除的节点。

---

### - removePathForKey:withCompletionBlock:

##### 定义

```objectivec
- (void)removePathForKey:(NSString *)key withCompletionBlock:(WDGLocationCompletionBlock _Nullable)block;
```

##### 说明
移除指定key下的轨迹记录。

##### 参数

参数名         | 说明
------------- | -------------
key           | 需要移除的节点。
block         | 删除操作的回调函数。

---

### - circleQueryAtPosition:withRadius:

##### 定义

```objectivec
- (WDGCircleQuery *)circleQueryAtPosition:(WDGPosition *)position withRadius:(double)radius;
```

##### 说明
初始化一个用于范围查询的 `WDGCircleQuery` 实例。

##### 参数

参数名         | 说明
------------- | -------------
position      | 范围查询的圆心。
radius        | 范围查询的半径。

##### 返回值
`WDGCircleQuery` 实例。

---

### + distanceBetweenPosition:andPosition:

##### 定义

```objectivec
+ (double)distanceBetweenPosition:(WDGPosition *)position1 andPosition:(WDGPosition *)position2;
```

##### 说明
用于计算两个位置点的距离的辅助函数。

##### 参数

参数名         | 说明
------------- | -------------
position1     | 第一个位置点。
position2     | 第二个位置点。

##### 返回值
以米为单位的距离。

---