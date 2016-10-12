
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

获取这个查询对象的 WDGSyncReference 实例。

</br>

--- 
## 方法

### – observeEventType:withBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

用于监听一个指定节点的数据变化。

这是从 Wilddog Sync 服务器读取数据的主要方式，当监听到初始数据和初始数据有改变时，指定事件相对应的 block 会被触发。
typedef NS_ENUM(NSInteger, WDGDataEventType) {
    WDGDataEventTypeChildAdded,     // 0, 当有新增子节点时触发
    WDGDataEventTypeChildRemoved,   // 1, 当有子节点被删除时触发
    WDGDataEventTypeChildChanged,   // 2, 当某个子节点发生变化时触发
    WDGDataEventTypeChildMoved,     // 3, 当有子节排序发生变化时触发
    WDGDataEventTypeValue           // 4, 当有数据请求或有任何数据发生变化时触发
};

**参数**

参数名 | 描述
--- | ---
eventType | 从这个节点到要设定的子节点的相对路径  
block | 当监听到某事件时，回调该 block

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block
</br>

--- 
### – observeEventType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block
```

**说明**

用于监听在特定节点处的数据的变化。

这是从 Wilddog Sync 服务器读取数据的主要方式，当监听到初始数据和初始数据有改变时，指定事件相对应的 block 会被触发。
此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件， block 通过 priority 排序将传输前一节点的 key 值。
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型 
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key 

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个block

</br>

--- 
### – observeEventType:withBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

用于监听一个指定节点的数据变化。

这是从 Wilddog Sync 服务器读取数据的主要方式，当监听到初始数据和初始数
发。
由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型 
block | 当监听到某事件时，回调 block
cancelBlock | 如果客户端没有权限去接受这些事件，这个 block 将会被调用

</br>

--- 
### – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

用于监听在特定节点处的数据的变化。
   
这是从 Wilddog Sync 服务器读取数据的主要方式，当监听到初始数据和初始数据有改变时，指定事件相对应的 block 会被触发。 
此外，对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件, block通过priority排序将传输前一节点的key值。
由于你没有读取权限，就接受不到新的事件，这时cancelBlock就会被调用
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型 
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key
cancelBlock | 如果客户端没有权限去接受这些事件，这个 block 将会被调用

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block。

</br>

--- 
### – observeSingleEventOfType:withBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

同 observeEventType:withBlock: 类似，不同之处在于 observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到某事件时，回调 block

</br>

--- 
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block
```

**说明**

这个方法和 observeEventType:withBlock: 方法类似。不同之处是在初始数据返回后，这个 block 回调一次就被取消监听。此外，对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

</br>

----
### – observeSingleEventOfType:withBlock:withCancelBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

同 observeSingleEventOfType:withBlock: 类似，如果你没有在这个节点读取数据的权限，cancelBlock 将会被回调。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到某事件时，回调 block
cancelBlock | 如果您没有权限访问此数据，将调用该 cancelBlock

</br>

----

### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString *__nullable prevKey))block withCancelBlock:(nullable void (^)(NSError* error))cancelBlock
```

**说明**

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。此外，对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key
cancelBlock | 如果您没有权限访问此数据，将调用该 cancelBlock

</br>

----
### – removeObserverWithHandle:

**定义**

```objectivec
- (void)removeObserverWithHandle:(WDGSyncHandle)handle
```

**说明**

取消监听事件。取消之前用 observeEventType:withBlock: 注册的回调函数。

**参数**

参数名 | 描述
--- | ---
handle | 由 observeEventType:withBlock: 返回的 WDGSyncHandle

</br>

----
### – removeAllObservers

**定义**

```objectivec
- (void)removeAllObservers
```

**说明**

取消之前由 observeEventType:withBlock: 注册的所有的监听事件。 

</br>

----
### – keepSynced:

**定义**

```objectivec
- (void)keepSynced:(BOOL)keepSynced
```

**说明**

在某一节点处通过调用 keepSynced:YES 方法，即使该节点处没有设置监听者，此节点处的数据也将自动下载存储并保持同步。

**参数**

参数名 | 描述
--- | ---
keepSynced | 参数设置为 YES，则在此节点处同步数据，设置为 NO，停止同步。

</br>

----
### – queryLimitedToFirst:

**定义**

```objectivec
- (WDGSyncQuery *)queryLimitedToFirst:(NSUInteger)limit
```

**说明**

用于创建一个新 WDGSyncQuery 实例，获取从第一条开始的指定数量的数据。

返回的 WDGSyncQuery 查询器类将响应从第一个开始，到最多指定(limit)节点个数的数据。

**参数**

参数名 | 描述
--- | ---
limit | 这次查询能够获取的子节点的最大数量

**返回值**

返回一个 WDGSyncQuery 查询器类，最多指定(limit)个数的数据

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
