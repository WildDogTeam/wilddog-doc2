title: WDGSyncReference
---

`WDGSyncReference` 实例表示要操作的特定数据节点，可以通过 `WDGSyncReference` 实例操作和读取数据。
`WDGSyncReference` 是 `WDGSyncQuery` 的子类。


## 属性

### parent

**定义**

```swift
Swift
var parent: WDGSyncReference? { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic, nullable) WDGSyncReference *parent;
```

**说明**

当前节点的父节点引用。注意：根节点的 parent 为 nil。

</br>

---

### root

**定义**

```swift
Swift
var root: WDGSyncReference { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) WDGSyncReference *root;
```

**说明**

根结点的引用。

</br>

---

### key

**定义**

```swift
Swift
var key: String { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) NSString *key;
```

**说明**

当前节点的 key 值。

</br>

---

### URL

**定义**

```swift
Swift
var url: String { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) NSString *URL;
```

**说明**

这个引用所属的指向 Wilddog 数据库节点的 URL。

</br>

---

### sync

**定义**

```swift
Swift
var sync: WDGSync { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) WDGSync *sync;
```

**说明**

当前 `SyncReference` 实例相关的 `WilddogSync` 实例。

</br>

---





## 方法

### - child:

**定义**

```swift
Swift
func child(_ pathString: String) -> WDGSyncReference
```
```objectivec
Objective-C
- (WDGSyncReference *)child:(NSString *)pathString;
```

**说明**

获得一个在当前节点下指定路径节点处的 `WDGSyncReference` 实例。
根据相对路径 `path`，来获取当前节点下 `path` 子节点的引用。
相对路径可以是一个简单的节点路径（例如: "fred"），或者是一个更深的路径（例如: "fred/name/first"）。
 
 


**参数**

 参数名 | 说明 
---|---
pathString|从这个节点到要设定的子节点的相对路径，深层路径多层级间需要使用 `/` 分隔，例如 `a/b` 。如果 path 为空字符串则返回当前引用。如果定位的 path 不存在，依然可以定位，将在后续数据操作时创建不存在的路径节点引用。




**返回值**

指定节点位置的 `WDGSyncReference` 实例。


</br>

---

### - childByAppendingPath:

**定义**

```swift
Swift
func child(byAppendingPath pathString: String) -> WDGSyncReference
```
```objectivec
Objective-C
- (WDGSyncReference *)childByAppendingPath:(NSString *)pathString;
```

**说明**

`childByAppendingPath:` 已废弃, 使用 `child:` 代替。



</br>

---

### - childByAutoId

**定义**

```swift
Swift
func childByAutoId() -> WDGSyncReference
```
```objectivec
Objective-C
- (WDGSyncReference *)childByAutoId;
```

**说明**

向当前节点添加子节点。新增子节点的 key 自动生成并保证唯一（例如：-KdzI7I-AsBST9NlasJM）。
新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。
 



**返回值**

`WDGSyncReference` 新增子节点的实例。


</br>

---

### - setValue:

**定义**

```swift
Swift
func setValue(_ value: Any?)
```
```objectivec
Objective-C
- (void)setValue:(nullable id)value;
```

**说明**

往 WDGSyncReference 当前路径写入一个值。
这将会覆盖当前路径和子路径的所有数据。
支持的数据类型:
- NSString -- "Hello World"
- NSNumber (包括BOOL类型) -- YES, 43, 4.333
- NSDictionary -- {"key": "value", "nested": {"another": "value"}}
- NSArray -- ["a", "b", "c"]
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ）之间，n+1 个元素中超过一半以上有值，数据将被转换为 NSArray 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 NSDictionary 类型。
当 value 为 nil 或者 NSNull 实例时相当于调用 `removeValue:`，这个路径的所有数据和子路径的数据都将被删除。
`setValue:` 将会删除先前保存的 priority，所以如果要保留先前 priority，必须调用 `setValue:andPriority:`。
 


**参数**

 参数名 | 说明 
---|---
value|将被写入的数据。




</br>

---

### - setValue:withCompletionBlock:

**定义**

```swift
Swift
func setValue(_ value: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)setValue:(nullable id)value withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

同 `setValue:` 方法类似，增加了一个 block，当写操作完成之后，会回调这个 block。
 


**参数**

 参数名 | 说明 
---|---
value|将被写入的数据。
block|当写操作被提交到服务器，将被触发的 block。




</br>

---

### - setValue:andPriority:

**定义**

```swift
Swift
func setValue(_ value: Any?, andPriority priority: Any?)
```
```objectivec
Objective-C
- (void)setValue:(nullable id)value andPriority:(nullable id)priority;
```

**说明**

同 `setValue:` 方法类似，写入数值的同时为当前节点设置优先级，优先级被用来排序。
优先级只能是 NSNumber 或 NSString 类型，且 NSNumber 中不能存储 BOOL 类型的数据。优先级默认为 nil。
 
 


**参数**

 参数名 | 说明 
---|---
value|将被写入的数据。
priority|要设置的优先级。




</br>

---

### - setValue:andPriority:withCompletionBlock:

**定义**

```swift
Swift
func setValue(_ value: Any?, andPriority priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)setValue:(nullable id)value andPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

同 `setValue:` 方法类似，写入数值的同时为当前节点设置优先级，优先级被用来排序。
优先级只能是 NSNumber 或 NSString 类型，且 NSNumber 中不能存储 BOOL 类型的数据。优先级默认为 nil。
同时增加了一个 block，当写操作完成之后，会回调这个 block。
 


**参数**

 参数名 | 说明 
---|---
value|将被写入的数据。
priority|要设置的优先级。
block|当写操作被提交到服务器，将被触发的 block。




</br>

---

### - removeValue

**定义**

```swift
Swift
func removeValue()
```
```objectivec
Objective-C
- (void)removeValue;
```

**说明**

删除当前节点，效果等同于 `setValue:nil`。
如果父级节点只有当前节点一个子节点，会递归删除父级节点。



</br>

---

### - removeValueWithCompletionBlock:

**定义**

```swift
Swift
func removeValue(completionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)removeValueWithCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

同 `remove` 方法类似，增加了一个 block，当删除操作完成之后，会回调这个 block。
  


**参数**

 参数名 | 说明 
---|---
block|当删除操作被提交到服务器，将被触发的 block。




</br>

---

### - setPriority:

**定义**

```swift
Swift
func setPriority(_ priority: Any?)
```
```objectivec
Objective-C
- (void)setPriority:(nullable id)priority;
```

**说明**

设置当前节点的优先级，支持为每个节点设置优先级 (priority)，用于实现节点按优先级排序。优先级是节点的隐藏属性，默认为 nil。
不能为不存在的节点设置优先级。因此，新增数据需要设置优先级时，请使用 `setValue:withPriority:`；为已存在的数据设置优先级的时，使用 `setPriority:`。
 节点按照如下优先级规则升序排列：nil 
<
 NSNumber 
<
 NSString。
- priority 为 null 的排最先；
- priority 为数值的次之，按照数值从小到大排序；
- priority 为字符串的排最后，按照字典序排列。
- 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。
注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。
 


**参数**

 参数名 | 说明 
---|---
priority|指定节点的优先级。




</br>

---

### - setPriority:withCompletionBlock:

**定义**

```swift
Swift
func setPriority(_ priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)setPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

同 `setPriority:` 方法类似，增加了一个 block，当设置优先级操作被提交到服务器，将触发这个 block。
 


**参数**

 参数名 | 说明 
---|---
priority|指定节点的优先级。
block|当设置优先级操作被提交到服务器，将触发这个 block。




</br>

---

### - updateChildValues:

**定义**

```swift
Swift
func updateChildValues(_ values: [AnyHashable : Any])
```
```objectivec
Objective-C
- (void)updateChildValues:(NSDictionary *)values;
```

**说明**

将输入对象的子节点合并到当前数据中。
不存在的子节点将会被新增，存在子节点将会被替换。
与set操作不同，update 不会直接覆盖原来的节点，而是将value 中的所有子节点插入到已有的节点中，如果已有的节点中已经有同名子节点，则覆盖原有的子节点。
 例如： update之前 {"l1":"on","l3":"off"} ,value={"l1":"off","l2":"on"} update 后的数据是 {"l1":"off","l2":"on","l3":"off"}。
  


**参数**

 参数名 | 说明 
---|---
values|包含要合并子节点的对象




</br>

---

### - updateChildValues:withCompletionBlock:

**定义**

```swift
Swift
func updateChildValues(_ values: [AnyHashable : Any], withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)updateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

同updateChildValues方法类似：增加了一个block，当更新操作完成之后，会回调这个block。
  


**参数**

 参数名 | 说明 
---|---
values|包含要合并子节点的对象 
block|updateChildValues 操作提交到 Wilddog Sync 服务器后，返回的block




</br>

---

### - observeEventType:withBlock:

**定义**

```swift
Swift
func observe(_ eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void) -> WDGSyncHandle
```
```objectivec
Objective-C
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

### - onDisconnectSetValue:

**定义**

```swift
Swift
func onDisconnectSetValue(_ value: Any?)
```
```objectivec
Objective-C
- (void)onDisconnectSetValue:(nullable id)value;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。
onDisconnectSetValue: 方法对实现在线系统是很有用的，这个在线系统可理解为：当用户失去连接时，一个数值被改变或者被清除，在别人的角度看，他的状态会显示“离线”。
 


**参数**

 参数名 | 说明 
---|---
value|断开连接后要设置的值




</br>

---

### - onDisconnectSetValue:withCompletionBlock:

**定义**

```swift
Swift
func onDisconnectSetValue(_ value: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)onDisconnectSetValue:(nullable id)value withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。
 


**参数**

 参数名 | 说明 
---|---
value|断开连接后要设置的值
block|当设置值的操作成功排队到Wilddog服务器上，这个block就会被触发




</br>

---

### - onDisconnectSetValue:andPriority:

**定义**

```swift
Swift
func onDisconnectSetValue(_ value: Any?, andPriority priority: Any)
```
```objectivec
Objective-C
- (void)onDisconnectSetValue:(nullable id)value andPriority:(id)priority;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。
 


**参数**

 参数名 | 说明 
---|---
value|断开连接后要设置的值
priority|断开连接后要设置的优先级




</br>

---

### - onDisconnectSetValue:andPriority:withCompletionBlock:

**定义**

```swift
Swift
func onDisconnectSetValue(_ value: Any?, andPriority priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)onDisconnectSetValue:(nullable id)value andPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。
 


**参数**

 参数名 | 说明 
---|---
value|连接断开后要设置的值
priority|连接断开后要设置的优先级
block|当设置值的操作成功排队到Wilddog服务器上，这个block就会被触发




</br>

---

### - onDisconnectRemoveValue

**定义**

```swift
Swift
func onDisconnectRemoveValue()
```
```objectivec
Objective-C
- (void)onDisconnectRemoveValue;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。
onDisconnectRemoveValue 对实施在线系统很有用



</br>

---

### - onDisconnectRemoveValueWithCompletionBlock:

**定义**

```swift
Swift
func onDisconnectRemoveValue(completionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)onDisconnectRemoveValueWithCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。
onDisconnectRemoveValueWithCompletionBlock: 对实施在线系统很有用
 


**参数**

 参数名 | 说明 
---|---
block|当删除值的操作成功排队到Wilddog服务器上，这个block就会被触发




</br>

---

### - onDisconnectUpdateChildValues:

**定义**

```swift
Swift
func onDisconnectUpdateChildValues(_ values: [AnyHashable : Any])
```
```objectivec
Objective-C
- (void)onDisconnectUpdateChildValues:(NSDictionary *)values;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。
 


**参数**

 参数名 | 说明 
---|---
values|在连接断开之后，一个包含子节点键和值的字典




</br>

---

### - onDisconnectUpdateChildValues:withCompletionBlock:

**定义**

```swift
Swift
func onDisconnectUpdateChildValues(_ values: [AnyHashable : Any], withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
```objectivec
Objective-C
- (void)onDisconnectUpdateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。
 


**参数**

 参数名 | 说明 
---|---
values|在连接断开之后，一个包含子节点键和值的字典
block|当更新值的操作成功排队到Wilddog服务器上，这个block就会被触发




</br>

---

### - cancelDisconnectOperations

**定义**

```swift
Swift
func cancelDisconnectOperations()
```
```objectivec
Objective-C
- (void)cancelDisconnectOperations;
```

**说明**

取消运行在离线状态设置的所有操作。
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue:, 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用cancelDisconnectOperations:方法。
 



</br>

---

### - cancelDisconnectOperationsWithCompletionBlock:

**定义**

```swift
Swift
func cancelDisconnectOperations(completionBlock block: ((Error?, WDGSyncReference) -> Void)? = nil)
```
```objectivec
Objective-C
- (void)cancelDisconnectOperationsWithCompletionBlock:(nullable void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

**说明**

取消运行在离线状态设置的所有操作。
如果之前调用了 onDisconnectSetValue: ,onDisconnectRemoveValue: , or onDisconnectUpdateChildValues: 方法, 并且在连接断开后，不再想要更新数据，请调用cancelDisconnectOperations:方法。
 


**参数**

 参数名 | 说明 
---|---
block|当Wilddog服务器接受到cancel请求，触发的block




</br>

---

### + goOffline

**定义**

```swift
Swift
class func goOffline()
```
```objectivec
Objective-C
+ (void)goOffline;
```

**说明**

手动断开连接，关闭自动重连。



</br>

---

### + goOnline

**定义**

```swift
Swift
class func goOnline()
```
```objectivec
Objective-C
+ (void)goOnline;
```

**说明**

手动建立连接，开启自动重连。



</br>

---

### - runTransactionBlock:

**定义**

```swift
Swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult)
```
```objectivec
Objective-C
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block;
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中
把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器
最新数据再次执行。
调用 [WDGTransactionResult abort] 可以取消这次操作。



**参数**

 参数名 | 说明 
---|---
block|块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象。




</br>

---

### - runTransactionBlock:andCompletionBlock:

**定义**

```swift
Swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult, andCompletionBlock completionBlock: @escaping (Error?, Bool, WDGDataSnapshot?) -> Void)
```
```objectivec
Objective-C
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block andCompletionBlock:(void (^)(NSError *_Nullable, BOOL, WDGDataSnapshot *_Nullable))completionBlock;
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中
把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器
最新数据再次执行。
调用 [WDGTransactionResult abort] 可以取消这次操作。
 
 


**参数**

 参数名 | 说明 
---|---
block|块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象。
completionBlock|当事务完成时这个块将被触发，无论成功与否。




</br>

---

### - runTransactionBlock:andCompletionBlock:withLocalEvents:

**定义**

```swift
Swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult, andCompletionBlock completionBlock: ((Error?, Bool, WDGDataSnapshot?) -> Void)?, withLocalEvents localEvents: Bool)
```
```objectivec
Objective-C
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block andCompletionBlock:(nullable void (^)(NSError *_Nullable, BOOL, WDGDataSnapshot *_Nullable))completionBlock withLocalEvents:(BOOL)localEvents;
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中
把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器
最新数据再次执行。
调用 [WDGTransactionResult abort] 可以取消这次操作。
 


**参数**

 参数名 | 说明 
---|---
block|块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象。 
completionBlock|当事务完成时这个块将被触发，无论成功与否。
localEvents|将其设置为 NO 来阻止触发中间状态的事件，只触发最终状态事件。




</br>

---

### - description

**定义**

```swift
Swift
func description() -> String
```
```objectivec
Objective-C
- (NSString *)description;
```

**说明**

获取当前 Wilddog Sync 节点的绝对 URL。
  



**返回值**

当前 Wilddog Sync 节点的绝对 URL。


</br>

---



