
title: WDGSyncQuery
---

用于查询指定路径和指定条件下的数据。

## 属性

### ref

**定义**

```objectivec
@property (nonatomic, readonly, strong) WDGSyncReference *ref
```

**说明**

获取这个 WDGSyncQuery 所在路径下的 WDGSyncReference 实例。

</br>

--- 
## 方法

### – observeEventType:withBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

用于监听指定节点的数据变化。

这是从 Wilddog Sync 云端读取数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，指定事件对应的回调 block 会被触发。

可使用 `removeObserverWithHandle:` 方法去停止接受数据变化。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。

**返回值**

一个 `WDGSyncHandle` 值，用于调用函数 `removeObserverWithHandle:` 去注销这个监听。
</br>

--- 
### – observeEventType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block
```

**说明**

用于监听指定节点的数据变化。

这是从 Wilddog Sync 云端读取数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，指定事件对应的回调 block 会被触发。

此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。

可使用 `removeObserverWithHandle:` 方法去停止接受数据变化。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。

**返回值**

一个 `WDGSyncHandle` 值，用于调用函数 `removeObserverWithHandle:` 去注销这个监听。

</br>

--- 
### – observeEventType:withBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

用于监听指定节点的数据变化。

这是从 Wilddog Sync 云端读取数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，指定事件对应的回调 block 会被触发。

当客户端不再拥有对该节点的访问权限时 `cancelBlock` 会被调用。

可使用 `removeObserverWithHandle:` 方法去停止接受数据变化。


**返回值**

一个 `WDGSyncHandle` 值，用于调用函数 `removeObserverWithHandle:` 去注销这个监听。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。
cancelBlock | 当客户端不再拥有对该节点的访问权限时 `cancelBlock` 会被调用。

</br>

--- 
### – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

用于监听指定节点的数据变化。

这是从 Wilddog Sync 云端读取数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，指定事件对应的回调 block 会被触发。

此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。

当客户端不再拥有对该节点的访问权限时 `cancelBlock` 会被调用。

可使用 `removeObserverWithHandle:` 方法去停止接受数据变化。


**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。
cancelBlock | 当客户端不再拥有对该节点的访问权限时 `cancelBlock` 会被调用。

**返回值**

一个 `WDGSyncHandle` 值，用于调用函数 `removeObserverWithHandle:` 去注销这个监听。

</br>

--- 
### – observeSingleEventOfType:withBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当从云端获取到结果时，这个 block 将被回调。

</br>

--- 
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。

此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当从云端获取到结果时，这个 block 将被回调。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。

</br>

----
### – observeSingleEventOfType:withBlock:withCancelBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。

当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当从云端获取到结果时，这个 block 将被回调。
cancelBlock | 当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。

</br>

----

### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。

此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。

当客户端不再拥有对该节点的访问权限时 `cancelBlock` 会被调用。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型。
block | 当从云端获取到结果时，这个 block 将被回调。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。
cancelBlock | 当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。

</br>

----
### – removeObserverWithHandle:

**定义**

```objectivec
- (void)removeObserverWithHandle:(WDGSyncHandle)handle
```

**说明**

取消监听事件。取消之前用 `observeEventType:withBlock:` 注册的回调 block。

**参数**

参数名 | 描述
--- | ---
handle | 由 `observeEventType:withBlock:` 返回的 WDGSyncHandle。

</br>

----
### – removeAllObservers

**定义**

```objectivec
- (void)removeAllObservers
```

**说明**

取消当前节点下之前由 `observeEventType:withBlock:` 注册的所有的监听事件。 

</br>

----
### – keepSynced:

**定义**

```objectivec
- (void)keepSynced:(BOOL)keepSynced
```

**说明**

在某一节点处通过调用 `keepSynced:YES` 方法，即使该节点处没有进行过监听，此节点处的数据也将自动下载存储并与云端保持同步。

**参数**

参数名 | 描述
--- | ---
keepSynced | 参数设置为 YES，则在此节点处同步数据；设置为 NO，停止同步。

</br>

----
### – queryLimitedToFirst:

**定义**

```objectivec
- (WDGSyncQuery *)queryLimitedToFirst:(NSUInteger)limit
```

**说明**

用于创建一个新 WDGSyncQuery 实例，获取从第一条开始的指定数量的数据。

返回的 WDGSyncQuery 实例将响应从第一个开始，到最多 (limit) 个节点的数据。

**参数**

参数名 | 描述
--- | ---
limit | 这次查询能够获取的子节点的最大数量

**返回值**

返回一个 WDGSyncQuery 实例，查询最多前 (limit) 个数据。

</br>

----
### – queryLimitedToLast:

**定义**

```objectivec
- (WDGSyncQuery *)queryLimitedToLast:(NSUInteger)limit
```

**说明**

用于创建一个新 WDGSyncQuery 实例，获取从最后一条开始向前指定数量的数据。

返回的 WDGSyncQuery 查询器类将响应从最后一个开始，最多指定(limit)个数的数据。

**参数**

参数名 | 描述
--- | ---
limit | 这次查询能够获取的子节点的最大数量

**返回值**

返回一个 WDGSyncQuery 查询器类，最多指定(limit)个数的数据

</br>

----
### – queryOrderedByChild:

**定义**

```objectivec
- (WDGSyncQuery *)queryOrderedByChild:(NSString *)key
```

**说明**

用于产生一个新 WDGSyncQuery 实例，是按照特定子节点的值进行排序的。

此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

**参数**

参数名 | 描述
--- | ---
key | 指定用来排序的子节点的 key

**返回值**

返回一个按指定的子节点 key 排序生成的 WDGSyncQuery 查询器类

</br>

----
### – queryOrderedByKey

**定义**

```objectivec
- (WDGSyncQuery *)queryOrderedByKey
```

**说明**

用于产生一个新 WDGSyncQuery 实例，是按照特定子节点的 key 进行排序的。

此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

**返回值**

返回一个按指定的子节点 key 排序生成的 WDGSyncQuery 查询器类

</br>

----
### – queryOrderedByValue

**定义**

```objectivec
- (WDGSyncQuery *)queryOrderedByValue
```

**说明**

用于产生一个新 WDGSyncQuery 实例，是按照当前节点的值进行排序的。

此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

**返回值**

返回一个按指定的子节点值排序生成的 WDGSyncQuery 查询器类

</br>

----
### – queryOrderedByPriority

**定义**

```objectivec
- (WDGSyncQuery *)queryOrderedByPriority
```

**说明**

用于产生一个新 WDGSyncQuery 实例，是按照当前节点的优先级排序的。 

此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

**返回值**

返回一个按指定的子节点优先级排序生成的 WDGSyncQuery 查询器类

</br>

----
### – queryStartingAtValue:

**定义**

```objectivec
- (WDGSyncQuery *)queryStartingAtValue:(nullable id)startValue
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值均大于或等于 startValue。

**参数**

参数名 | 描述
--- | ---
startValue | query 查询到的值均大于等于 startValue

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应在数据值大于或等于 startValue 的节点事件

</br>

----
### – queryStartingAtValue:childKey:

**定义**

```objectivec
- (WDGSyncQuery *)queryStartingAtValue:(nullable id)startValue childKey:(nullable NSString *)childKey
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值大于 startValue，或者等于 startValue 并且 key 大于等于 childKey。

**参数**

参数名 | 描述
--- | ---
startValue | query 查询到的值均大于等于 startValue
childKey | 当 query 查询到的值和 startValue 相等时，则比较 key 的大小

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应在数据值大于 startValue，或等于 startValue 的值并且 key 大于或等于 childKey 的节点事件

</br>

----
### – queryEndingAtValue:

**定义**

```objectivec
- (WDGSyncQuery *)queryEndingAtValue:(nullable id)endValue
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值均小于或者等于 endValue。

**参数**

参数名 | 描述
--- | ---
endValue | query 查询到的值均小于等于 endValue

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应在数据值均小于或等于 endValue 的节点事件

</br>

----
### – queryEndingAtValue:childKey:

**定义**

```objectivec
- (WDGSyncQuery *)queryEndingAtValue:(nullable id)endValue childKey:(nullable NSString *)childKey
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值小于 endValue，或者等于 endValue 并且 key 小于等于 childKey。

**参数**

参数名 | 描述
--- | ---
endValue | query 查询到的值均小于等于 endValue
childKey | 当 query 查询到的值和 endValue 相等时，则比较它们 key 的大小

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应在查询到的数据值小于 endValue，或者数据值等于 endValue 并且key 小于等于 childKey 的节点事件

</br>

----
### – queryEqualToValue:

**定义**

```objectivec
- (WDGSyncQuery *)queryEqualToValue:(nullable id)value
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值都等于value。

**参数**

参数名 | 描述
--- | ---
value | query 查询到的值都等于 value

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应这个与之相等数值节点事件

</br>

----
### – queryEqualToValue:childKey:

**定义**

```objectivec
- (WDGSyncQuery *)queryEqualToValue:(nullable id)value childKey:(nullable NSString *)childKey
```

**说明**

用于返回一个 WDGSyncQuery 实例，这个实例用来监测数据的变化，这些被监测的数据的值等于 value 并且 key 等于 childKey。返回的值肯定是唯一的，因为 key 是唯一的。

**参数**

参数名 | 描述
--- | ---
value | query 查询到的值都等于 value
childKey | query 查询到的 key 都等于 childKey

**返回值**

返回一个 WDGSyncQuery 查询器类，用于响应这个与之相等数值和 key 节点事件
