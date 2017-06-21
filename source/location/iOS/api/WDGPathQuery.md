title: WDGPathQuery
---

代表对一个特定时间段的轨迹进行查询。当一个 `WDGPathQuery` 实例销毁时，其建立的监听将自动取消。

## 属性

### key

##### 定义

```objectivec
@property (nonatomic, strong, readonly) NSString *key;
```

##### 说明
要查询的 key。

---

### startTime

##### 定义

```objectivec
@property (nonatomic, strong, readonly) NSDate *startTime;
```

##### 说明
查询时间段的开始时间。

---

### endTime

##### 定义

```objectivec
@property (nonatomic, strong, readonly, nullable) NSDate *endTime;
```

##### 说明
查询时间段的结束时间。如果设置为`nil`，结束时间为未来无限远。


---


## 方法

### - observeWithBlock:

##### 定义

```objectivec
- (WilddogHandle)observeWithBlock:(void (^)(WDGPathSnapshot *snapshot))block;
```

##### 说明
对当前查询进行持续监听。

##### 参数

参数名         | 说明
------------- | -------------
block         | 查询操作的回调。

##### 返回值
`WilddogHandle`实例，代表当前监听的编号，可用于稍后取消监听。

---

### - observeSingleEventWithBlock:

##### 定义

```objectivec
- (void)observeSingleEventWithBlock:(void (^)(WDGPathSnapshot *snapshot))block;
```

##### 说明
对当前查询进行单次监听。

##### 参数

参数名         | 说明
------------- | -------------
block         | 查询操作的回调，每当路径有变化，将会触发回调。

---

### - removeObserverWithWilddogHandle:

##### 定义

```objectivec
- (void)removeObserverWithWilddogHandle:(WilddogHandle)handle;
```

##### 说明
取消当前查询上的指定监听。

##### 参数

参数名         | 说明
------------- | -------------
handle        | 要取消的监听的编号。

---

### - removeAllObservers

##### 定义

```objectivec
- (void)removeAllObservers;
```

##### 说明
取消当前查询上的所有监听。

