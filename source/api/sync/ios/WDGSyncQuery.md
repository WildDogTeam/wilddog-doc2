title: WDGSyncQuery
---

查询指定路径和指定条件下的数据。


## 属性

### ref

**定义**

<div class="swift-lan">Swift</div>```swift
var ref: WDGSyncReference { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) WDGSyncReference *ref;
```

**说明**

这个 WDGSyncQuery 所在路径下的 WDGSyncReference 实例。

</br>

---





## 方法

### - observeEventType:withBlock:

**定义**

<div class="swift-lan">Swift</div>```swift
func observe(_ eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void) -> WDGSyncHandle
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block;
```

**说明**

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
可使用 `removeObserverWithHandle:` 方法移除监听。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。




**返回值**

`WDGSyncHandle` 值，用于调用方法 `removeObserverWithHandle:` 移除这个监听。


</br>

---

### - observeEventType:andPreviousSiblingKeyWithBlock:

**定义**

```swift
Swift
func observe(_ eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void) -> WDGSyncHandle
```
```objectivec
Objective-C
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block;
```

**说明**

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有当前排序下前一节点的 key 值。
可使用 `removeObserverWithHandle:` 方法移除监听。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个节点的 key 值。




**返回值**

`WDGSyncHandle` 值，用于调用方法 `removeObserverWithHandle:` 移除这个监听。


</br>

---

### - observeEventType:withBlock:withCancelBlock:

**定义**

```swift
Swift
func observe(_ eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil) -> WDGSyncHandle
```
```objectivec
Objective-C
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

**说明**

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
当客户端失去对该节点的读取权限时会调用 `cancelBlock`。导致失去读取权限的原因包括：规则表达式限制，数据限制，套餐限制超出等。
可使用 `removeObserverWithHandle:` 方法移除监听。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
cancelBlock|当客户端失去对该节点的读取权限时会调用 `cancelBlock`。




**返回值**

`WDGSyncHandle` 值，用于调用方法 `removeObserverWithHandle:` 移除这个监听。


</br>

---

### - observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```swift
Swift
func observe(_ eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil) -> WDGSyncHandle
```
```objectivec
Objective-C
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

**说明**

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有当前排序下前一节点的 key 值。
当客户端失去对该节点的读取权限时会调用 `cancelBlock`。导致失去读取权限的原因包括：规则表达式限制，数据限制，套餐限制超出等。
可使用 `removeObserverWithHandle:` 方法移除监听。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。
cancelBlock|当客户端失去对该节点的读取权限时会调用 `cancelBlock`。




**返回值**

`WDGSyncHandle` 值，用于调用方法 `removeObserverWithHandle:` 移除这个监听。


</br>

---

### - observeSingleEventOfType:withBlock:

**定义**

```swift
Swift
func observeSingleEvent(of eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void)
```
```objectivec
Objective-C
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block;
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调方法只被触发一次，之后会自动取消监听。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。




</br>

---

### - observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

**定义**

```swift
Swift
func observeSingleEvent(of eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void)
```
```objectivec
Objective-C
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block;
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。
此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。




</br>

---

### - observeSingleEventOfType:withBlock:withCancelBlock:

**定义**

```swift
Swift
func observeSingleEvent(of eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil)
```
```objectivec
Objective-C
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。
当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。
cancelBlock|当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。




</br>

---

### - observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```swift
Swift
func observeSingleEvent(of eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil)
```
```objectivec
Objective-C
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

**说明**

同 `observeEventType:withBlock:` 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调函数只被执行一次。
此外，对于 `WDGDataEventTypeChildAdded`, `WDGDataEventTypeChildMoved` 和 `WDGDataEventTypeChildChanged` 事件，回调 block 将带有 priority 排序下前一节点的 key 值。
当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。
 


**参数**

 参数名 | 说明 
---|---
eventType|`WDGDataEventType` 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。block 将传输一个 `WDGDataSnapshot` 类型的数据和前一个子节点的 key 值。
cancelBlock|当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。




</br>

---

### - removeObserverWithHandle:

**定义**

```swift
Swift
func removeObserver(withHandle handle: WDGSyncHandle)
```
```objectivec
Objective-C
- (void)removeObserverWithHandle:(WDGSyncHandle)handle;
```

**说明**

移除监听事件。移除使用 `observeEventType:withBlock:` 方法设置的数据监听。
 


**参数**

 参数名 | 说明 
---|---
handle|由 `observeEventType:withBlock:` 返回的 `WDGSyncHandle`。




</br>

---

### - removeAllObservers

**定义**

```swift
Swift
func removeAllObservers()
```
```objectivec
Objective-C
- (void)removeAllObservers;
```

**说明**

移除当前节点下使用 `observeEventType:withBlock:` 方法注册的所有的监听事件。



</br>

---

### - keepSynced:

**定义**

```swift
Swift
func keepSynced(_ keepSynced: Bool)
```
```objectivec
Objective-C
- (void)keepSynced:(BOOL)keepSynced;
```

**说明**

在某一节点处通过调用 `keepSynced:YES` 方法，即使该节点处没有进行过监听，此节点处的数据也将自动下载存储并与云端保持同步。
 


**参数**

 参数名 | 说明 
---|---
keepSynced|参数设置为 YES，则在此节点处同步数据；设置为 NO，停止同步。




</br>

---

### - queryLimitedToFirst:

**定义**

```swift
Swift
func queryLimited(toFirst limit: UInt) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryLimitedToFirst:(NSUInteger)limit;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，获取当前排序下从第一个节点开始的最多 (limit) 条数据。
 


**参数**

 参数名 | 说明 
---|---
limit|能够获取的子节点的最大数量。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryLimitedToLast:

**定义**

```swift
Swift
func queryLimited(toLast limit: UInt) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryLimitedToLast:(NSUInteger)limit;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，获取当前排序下，从最后一个节点开始向前的最多 (limit) 条数据。
 


**参数**

 参数名 | 说明 
---|---
limit|能够获取的子节点的最大数量。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryOrderedByChild:

**定义**

```swift
Swift
func queryOrdered(byChild key: String) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryOrderedByChild:(NSString *)key;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，按子节点下指定的 key 对应的 value 对结果进行排序。
此方法可以与 `queryStartingAtValue:`、`queryEndingAtValue:` 或 `queryEqualToValue:` 方法联合使用。
 


**参数**

 参数名 | 说明 
---|---
key|指定用来排序的子节点的 key。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryOrderedByKey

**定义**

```swift
Swift
func queryOrderedByKey() -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryOrderedByKey;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，按子节点的 key 对结果以字典序进行排序。
此方法可以与 `queryStartingAtValue:`、`queryEndingAtValue:` 或 `queryEqualToValue:` 方法联合使用。
 



**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryOrderedByValue

**定义**

```swift
Swift
func queryOrderedByValue() -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryOrderedByValue;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，按节点的 value 对结果排序。
此方法可以与 `queryStartingAtValue:`、`queryEndingAtValue:` 或 `queryEqualToValue:` 方法联合使用。
 



**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryOrderedByPriority

**定义**

```swift
Swift
func queryOrderedByPriority() -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryOrderedByPriority;
```

**说明**

 创建一个新的 `WDGSyncQuery` 实例，按节点的 priority 对结果排序。
 节点按照如下优先级规则升序排列：nil 
<
 NSNumber 
<
 NSString。
- priority 为 nil 的排最先；
- priority 为数值的次之，按照数值从小到大排序；
- priority 为字符串的排最后，按照字典序排列；
- 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。
注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，Key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。
此方法可以与 `queryStartingAtValue:`、`queryEndingAtValue:` 或 `queryEqualToValue:` 方法联合使用。
 



**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryStartingAtValue:

**定义**

```swift
Swift
func queryStarting(atValue startValue: Any?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryStartingAtValue:(nullable id)startValue;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询所有大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByKey:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
 


**参数**

 参数名 | 说明 
---|---
startValue|query 查询返回值的下界，所有返回值均大于等于 startValue。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryStartingAtValue:childKey:

**定义**

```swift
Swift
func queryStarting(atValue startValue: Any?, childKey: String?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryStartingAtValue:(nullable id)startValue childKey:(nullable NSString *)childKey;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询所有大于或等于指定的 value 或 priority 的节点，具体取决于所选的排序方法。
当查询到的 value 与 startValue 相等时，则只保留 key 大于等于 childKey 的节点。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
该方法可用于分页。
 


**参数**

 参数名 | 说明 
---|---
startValue|query 查询返回值的下界，所有返回值均大于等于 startValue。
childKey|当 query 查询到的值和 startValue 相等时，返回其中 key 大于等于 childKey 的节点。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryEndingAtValue:

**定义**

```swift
Swift
func queryEnding(atValue endValue: Any?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryEndingAtValue:(nullable id)endValue;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询所有小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByKey:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
 


**参数**

 参数名 | 说明 
---|---
endValue|query 查询返回值的上界，所有返回值均小于等于 endValue。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryEndingAtValue:childKey:

**定义**

```swift
Swift
func queryEnding(atValue endValue: Any?, childKey: String?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryEndingAtValue:(nullable id)endValue childKey:(nullable NSString *)childKey;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询所有小于或等于指定的 value 或 priority 的节点，具体取决于所选的排序方法。
当查询到的 value 与 endValue 相等时，则只保留 key 小于等于 childKey 的节点。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
该方法可用于分页。
 


**参数**

 参数名 | 说明 
---|---
endValue|query 查询返回值的上界，所有返回值均小于等于 endValue。
childKey|当 query 查询到的值和 endValue 相等时，返回其中 key 小于等于 childKey 的节点。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryEqualToValue:

**定义**

```swift
Swift
func queryEqual(toValue value: Any?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryEqualToValue:(nullable id)value;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByKey:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
 


**参数**

 参数名 | 说明 
---|---
value|query 查询到的值都等于 value。




**返回值**

`WDGSyncQuery` 实例。


</br>

---

### - queryEqualToValue:childKey:

**定义**

```swift
Swift
func queryEqual(toValue value: Any?, childKey: String?) -> WDGSyncQuery
```
```objectivec
Objective-C
- (WDGSyncQuery *)queryEqualToValue:(nullable id)value childKey:(nullable NSString *)childKey;
```

**说明**

创建一个新的 `WDGSyncQuery` 实例，可以查询等于指定的 value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。
并且 query 查询到的 key 都等于 childKey。由于 key 是唯一的，查询最多返回一个节点。
此方法应与 `queryOrderedByPriority:`、`queryOrderedByValue:` 或 `queryOrderedByChildKey:` 方法联合使用。
 


**参数**

 参数名 | 说明 
---|---
value|query 查询到的值都等于 value。
childKey|query 查询到的 key 都等于 childKey。




**返回值**

`WDGSyncQuery` 实例。


</br>

---



