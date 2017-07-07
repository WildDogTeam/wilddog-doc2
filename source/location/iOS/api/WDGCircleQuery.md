title: WDGCircleQuery
---

用于设置范围监听的查询条件。

## 属性

### center

##### 定义

```objectivec
@property (atomic, readwrite) CLLocation *center;
```

##### 说明
查询区域的中心。修改这个值将更新这个查询。

---

### radius

##### 定义

```objectivec
@property (atomic, readwrite) double radius;
```

##### 说明
查询区域的半径，以千米为单位。修改这个值将更新这个查询。

---

## 方法

### - observeEventType:withBlock:

##### 定义

```objectivec
- (WilddogHandle)observeEventType:(WDGQueryEventType)eventType withBlock:(WDGQueryResultBlock)block;
```

##### 说明
监听查询范围内发生的特定的事件。

##### 参数

参数名         | 说明
------------- | -------------
eventType     | 监听的类型，包含进入、移动、退出。
block         | 监听的回调，回调中包含 key 及其最新位置信息。

##### 返回值
`WilddogHandle` 实例，代表监听的编号，用于取消监听。

---

### - observeReadyWithBlock:

##### 定义

```objectivec
- (WilddogHandle)observeReadyWithBlock:(WDGQueryReadyBlock)block;
```

##### 说明
创建一个监听，当所有初始数据都加载完成后会调用。每当监听的参数变化后，需要重新加载初始数据，当重新加载完成后这个监听也会被调用一次。

##### 参数

参数名         | 说明
------------- | -------------
block         | 监听的回调，回调中包含 key 及其最新位置信息。

##### 返回值
`WilddogHandle` 实例，代表监听的编号，用于取消监听。

---

### - removeObserverWithHandle:

##### 定义

```objectivec
- (void)removeObserverWithHandle:(WilddogHandle)handle;
```

##### 说明
取消当前查询实例上创建的特定监听。

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
取消当前查询实例上创建的所有监听。

---