title: WDGSyncReference
---

`WDGSyncReference` 实例表示要操作的特定数据节点，可以通过 `WDGSyncReference` 实例操作和读取数据。
`WDGSyncReference` 是 [WDGSyncQuery](WDGSyncQuery.html) 的子类。


## 属性

### parent

##### 定义

<div class="swift-lan">Swift</div>```swift
var parent: WDGSyncReference? { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic, nullable) WDGSyncReference *parent;
```

##### 说明

当前节点的父节点引用。
 
<blockquote class="warning">
<p><strong>注意：</strong></p>

根节点的 parent 为 nil。

</blockquote>

</br>

---

### root

##### 定义

<div class="swift-lan">Swift</div>```swift
var root: WDGSyncReference { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) WDGSyncReference *root;
```

##### 说明

根结点的引用。

</br>

---

### key

##### 定义

<div class="swift-lan">Swift</div>```swift
var key: String { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) NSString *key;
```

##### 说明

当前节点的 key 值。

</br>

---

### URL

##### 定义

<div class="swift-lan">Swift</div>```swift
var url: String { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) NSString *URL;
```

##### 说明

这个引用所属的指向 Wilddog 数据库节点的 URL。

</br>

---

### sync

##### 定义

<div class="swift-lan">Swift</div>```swift
var sync: WDGSync { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) WDGSync *sync;
```

##### 说明

当前 `WDGSyncReference` 实例相关的 [WDGSync](WDGSync.html) 实例。

</br>

---





## 方法

### - child:

##### 定义

<div class="swift-lan">Swift</div>```swift
func child(_ pathString: String) -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)child:(NSString *)pathString;
```

##### 说明

获得一个在当前节点下指定路径节点处的 `WDGSyncReference` 实例。
根据相对路径 `path`，来获取当前节点下 `path` 子节点的引用。
相对路径可以是一个简单的节点路径（例如：`fred`），或者是一个更深的路径（例如：`fred/name/first`）。
 
 


##### 参数

 参数名 | 说明 
---|---
pathString|从这个节点到要设定的子节点的相对路径，深层路径多层级间需要使用 `/` 分隔，例如 `a/b` 。如果 path 为空字符串则返回当前引用。如果定位的 path 不存在，依然可以定位，将在后续数据操作时创建不存在的路径节点引用。




##### 返回值

指定节点位置的 `WDGSyncReference` 实例。

</br>

---

### - childByAppendingPath:

##### 定义

<div class="swift-lan">Swift</div>```swift
func child(byAppendingPath pathString: String) -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)childByAppendingPath:(NSString *)pathString;
```

##### 说明

`childByAppendingPath:` 已废弃, 使用 [child:](WDGSyncReference.html#child) 代替。




</br>

---

### - childByAutoId

##### 定义

<div class="swift-lan">Swift</div>```swift
func childByAutoId() -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)childByAutoId;
```

##### 说明

向当前节点添加子节点。新增子节点的 key 自动生成并保证唯一（例如：`-KdzI7I-AsBST9NlasJM`）。
新增子节点的 key 基于时间戳和随机算法生成，并按照时间先后进行排序。
 



##### 返回值

`WDGSyncReference` 新增子节点的实例。

</br>

---

### - setValue:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setValue(_ value: Any?)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setValue:(nullable id)value;
```

##### 说明

往 `WDGSyncReference` 当前路径写入一个值，这将会覆盖当前路径和子路径的所有数据。
支持的数据类型:
 - NSString -- `@"Hello World"`
 - NSNumber (包括 BOOL 类型) -- `@YES`, `@43`, `@4.333`
 - NSDictionary -- `@{@"key": @"value", @"nested": {@"another": @"value"}}`
 - NSArray -- `@[@"a", @"b", @"c"]`
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ）之间，n+1 个元素中超过一半以上有值，数据将被转换为 NSArray 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 NSDictionary 类型。
当 value 为 nil 或者 NSNull 实例时相当于调用 `removeValue:`，这个路径的所有数据和子路径的数据都将被删除。
`setValue:` 将会删除先前保存的 priority，所以如果要保留先前 priority，必须调用 [setValue:andPriority:](WDGSyncReference.html#setValue-andPriority)。
 


##### 参数

 参数名 | 说明 
---|---
value|将被写入的数据。





</br>

---

### - setValue:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setValue(_ value: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setValue:(nullable id)value withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

同 [setValue:](WDGSyncReference.html#setValue) 方法类似，增加了一个 block，当写操作完成之后，会回调这个 block。
 
 


##### 参数

 参数名 | 说明 
---|---
value|将被写入的数据。
block|当写操作被提交到云端，将触发这个 block。





</br>

---

### - setValue:andPriority:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setValue(_ value: Any?, andPriority priority: Any?)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setValue:(nullable id)value andPriority:(nullable id)priority;
```

##### 说明

同 [setValue:](WDGSyncReference.html#setValue) 方法类似，写入数值的同时为当前节点设置优先级，优先级被用来排序。
优先级只能是 NSNumber 或 NSString 类型，且 NSNumber 中不能存储 BOOL 类型的数据。优先级默认为 nil。
 
 


##### 参数

 参数名 | 说明 
---|---
value|将被写入的数据。
priority|要设置的优先级。





</br>

---

### - setValue:andPriority:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setValue(_ value: Any?, andPriority priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setValue:(nullable id)value andPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

同 [setValue:](WDGSyncReference.html#setValue) 方法类似，写入数值的同时为当前节点设置优先级，优先级被用来排序。
优先级只能是 NSNumber 或 NSString 类型，且 NSNumber 中不能存储 BOOL 类型的数据。优先级默认为 nil。
同时增加了一个 block，当写操作完成之后，会回调这个 block。
 
 


##### 参数

 参数名 | 说明 
---|---
value|将被写入的数据。
priority|要设置的优先级。
block|当写操作被提交到云端，将触发这个 block。





</br>

---

### - removeValue

##### 定义

<div class="swift-lan">Swift</div>```swift
func removeValue()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)removeValue;
```

##### 说明

删除当前节点，效果等同于 `setValue:nil`。
如果父级节点只有当前节点一个子节点，会递归删除父级节点。




</br>

---

### - removeValueWithCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func removeValue(completionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)removeValueWithCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

同 `remove` 方法类似，增加了一个 block，当删除操作完成之后，会回调这个 block。
 


##### 参数

 参数名 | 说明 
---|---
block|当删除操作被提交到云端，将触发这个 block。





</br>

---

### - setPriority:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setPriority(_ priority: Any?)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setPriority:(nullable id)priority;
```

##### 说明

设置当前节点的优先级，支持为每个节点设置优先级 (priority)，用于实现节点按优先级排序。优先级是节点的隐藏属性，默认为 nil。
不能为不存在的节点设置优先级。因此，新增数据需要设置优先级时，请使用 [setValue:andPriority:](WDGSyncReference.html#setValue-andPriority)；为已存在的数据设置优先级的时，使用 `setPriority:`。
 节点按照如下优先级规则升序排列：nil < NSNumber < NSString。
- priority 为 null 的排最先；
- priority 为数值的次之，按照数值从小到大排序；
- priority 为字符串的排最后，按照字典序排列。
- 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。
 
 

<blockquote class="warning">
<p><strong>注意：</strong></p>

数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序。Key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。

</blockquote>

##### 参数

 参数名 | 说明 
---|---
priority|指定节点的优先级。





</br>

---

### - setPriority:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func setPriority(_ priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)setPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

同 [setPriority:](WDGSyncReference.html#setPriority) 方法类似，增加了一个 block，当设置优先级操作被提交到云端，将触发这个 block。
 


##### 参数

 参数名 | 说明 
---|---
priority|指定节点的优先级。
block|当设置优先级操作被提交到云端，将触发这个 block。





</br>

---

### - updateChildValues:

##### 定义

<div class="swift-lan">Swift</div>```swift
func updateChildValues(_ values: [AnyHashable : Any])
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)updateChildValues:(NSDictionary *)values;
```

##### 说明

对当前节点进行数据合并操作，更新当前节点下的数据。 
与 [setValue:](WDGSyncReference.html#setValue) 方法覆盖当前节点下所有数据的方式不同，使用 `updateChildValues:` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。
 


##### 参数

 参数名 | 说明 
---|---
values|包含要合并的子节点的字典。





</br>

---

### - updateChildValues:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func updateChildValues(_ values: [AnyHashable : Any], withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)updateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

同 [updateChildValues:](WDGSyncReference.html#updateChildValues) 方法类似，增加了一个 block，当更新操作完成之后，会回调这个 block。
 


##### 参数

 参数名 | 说明 
---|---
values|包含要合并的子节点的字典。
block|当数据合并操作提交到 Wilddog Sync 云端，将触发这个 block。





</br>

---

### - observeEventType:withBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observe(_ eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void) -> WDGSyncHandle
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block;
```

##### 说明

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
可使用 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 方法移除监听。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。




##### 返回值

`WDGSyncHandle` 值，用于调用方法 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 移除这个监听。

</br>

---

### - observeEventType:andPreviousSiblingKeyWithBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observe(_ eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void) -> WDGSyncHandle
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block;
```

##### 说明

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
此外，对于 [WDGDataEventTypeChildAdded](WDGDataEventType.html#WDGDataEventTypeChildAdded), [WDGDataEventTypeChildMoved](WDGDataEventType.html#WDGDataEventTypeChildMoved) 和 [WDGDataEventTypeChildChanged](WDGDataEventType.html#WDGDataEventTypeChildChanged) 事件，回调 block 将带有当前排序下前一节点的 key 值。
可使用 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 方法移除监听。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。block 将传输一个 [WDGDataSnapshot](WDGDataSnapshot.html) 类型的数据和前一个节点的 key 值。




##### 返回值

`WDGSyncHandle` 值，用于调用方法 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 移除这个监听。

</br>

---

### - observeEventType:withBlock:withCancelBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observe(_ eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil) -> WDGSyncHandle
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

##### 说明

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
当客户端失去对该节点的读取权限时会调用 `cancelBlock`。导致失去读取权限的原因包括：规则表达式限制，数据限制，套餐限制超出等。
可使用 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 方法移除监听。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
cancelBlock|当客户端失去对该节点的读取权限时会调用 `cancelBlock`。




##### 返回值

`WDGSyncHandle` 值，用于调用方法 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 移除这个监听。

</br>

---

### - observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observe(_ eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil) -> WDGSyncHandle
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncHandle)observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

##### 说明

监听指定节点的数据。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。
此外，对于 [WDGDataEventTypeChildAdded](WDGDataEventType.html#WDGDataEventTypeChildAdded), [WDGDataEventTypeChildMoved](WDGDataEventType.html#WDGDataEventTypeChildMoved) 和 [WDGDataEventTypeChildChanged](WDGDataEventType.html#WDGDataEventTypeChildChanged) 事件，回调 block 将带有当前排序下前一节点的 key 值。
当客户端失去对该节点的读取权限时会调用 `cancelBlock`。导致失去读取权限的原因包括：规则表达式限制，数据限制，套餐限制超出等。
可使用 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 方法移除监听。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 block。block 将传输一个 [WDGDataSnapshot](WDGDataSnapshot.html) 类型的数据和前一个子节点的 key 值。
cancelBlock|当客户端失去对该节点的读取权限时会调用 `cancelBlock`。




##### 返回值

`WDGSyncHandle` 值，用于调用方法 [removeObserverWithHandle:](WDGSyncReference.html#removeObserverWithHandle) 移除这个监听。

</br>

---

### - observeSingleEventOfType:withBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observeSingleEvent(of eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block;
```

##### 说明

同 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 类似，不同之处在于 `observeSingleEventOfType:withBlock:` 中的回调方法只被触发一次，之后会自动取消监听。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。





</br>

---

### - observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observeSingleEvent(of eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block;
```

##### 说明

同 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 类似，不同之处在于 [observeSingleEventOfType:withBlock:](WDGSyncReference.html#observeSingleEventOfType-withBlock) 中的回调函数只被执行一次。
此外，对于 [WDGDataEventTypeChildAdded](WDGDataEventType.html#WDGDataEventTypeChildAdded), [WDGDataEventTypeChildMoved](WDGDataEventType.html#WDGDataEventTypeChildMoved) 和 [WDGDataEventTypeChildChanged](WDGDataEventType.html#WDGDataEventTypeChildChanged) 事件，回调 block 将带有 priority 排序下前一节点的 key 值。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。block 将传输一个 [WDGDataSnapshot](WDGDataSnapshot.html) 类型的数据和前一个子节点的 key 值。





</br>

---

### - observeSingleEventOfType:withBlock:withCancelBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observeSingleEvent(of eventType: WDGDataEventType, with block: @escaping (WDGDataSnapshot) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot *))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

##### 说明

同 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 类似，不同之处在于 [observeSingleEventOfType:withBlock:](WDGSyncReference.html#observeSingleEventOfType-withBlock) 中的回调函数只被执行一次。
当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。
cancelBlock|当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。





</br>

---

### - observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func observeSingleEvent(of eventType: WDGDataEventType, andPreviousSiblingKeyWith block: @escaping (WDGDataSnapshot, String?) -> Void, withCancel cancelBlock: ((Error) -> Void)? = nil)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot *, NSString *_Nullable))block withCancelBlock:(nullable void (^)(NSError *))cancelBlock;
```

##### 说明

同 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 类似，不同之处在于 [observeSingleEventOfType:withBlock:](WDGSyncReference.html#observeSingleEventOfType-withBlock) 中的回调函数只被执行一次。
此外，对于 [WDGDataEventTypeChildAdded](WDGDataEventType.html#WDGDataEventTypeChildAdded), [WDGDataEventTypeChildMoved](WDGDataEventType.html#WDGDataEventTypeChildMoved) 和 [WDGDataEventTypeChildChanged](WDGDataEventType.html#WDGDataEventTypeChildChanged) 事件，回调 block 将带有 priority 排序下前一节点的 key 值。
当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。
 


##### 参数

 参数名 | 说明 
---|---
eventType|[WDGDataEventType](WDGDataEventType.html) 类型，表示监听的事件类型。
block|当从云端获取到结果时，将回调这个 block。block 将传输一个 [WDGDataSnapshot](WDGDataSnapshot.html) 类型的数据和前一个子节点的 key 值。
cancelBlock|当客户端没有对该节点的访问权限时 `cancelBlock` 会被调用。





</br>

---

### - removeObserverWithHandle:

##### 定义

<div class="swift-lan">Swift</div>```swift
func removeObserver(withHandle handle: WDGSyncHandle)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)removeObserverWithHandle:(WDGSyncHandle)handle;
```

##### 说明

移除监听事件。移除使用 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 方法设置的数据监听。
 


##### 参数

 参数名 | 说明 
---|---
handle|由 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 返回的 `WDGSyncHandle`。





</br>

---

### - removeAllObservers

##### 定义

<div class="swift-lan">Swift</div>```swift
func removeAllObservers()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)removeAllObservers;
```

##### 说明

移除当前节点下使用 [observeEventType:withBlock:](WDGSyncReference.html#observeEventType-withBlock) 方法注册的所有的监听事件。




</br>

---

### - keepSynced:

##### 定义

<div class="swift-lan">Swift</div>```swift
func keepSynced(_ keepSynced: Bool)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)keepSynced:(BOOL)keepSynced;
```

##### 说明

在某一节点处通过调用 `keepSynced:YES` 方法，即使该节点处没有进行过监听，此节点处的数据也将自动下载存储并与云端保持同步。
 


##### 参数

 参数名 | 说明 
---|---
keepSynced|参数设置为 YES，则在此节点处同步数据；设置为 NO，停止同步。





</br>

---

### - onDisconnectSetValue:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectSetValue(_ value: Any?)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectSetValue:(nullable id)value;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，向当前的数据节点设置一个指定的值。
 


##### 参数

 参数名 | 说明 
---|---
value|在连接中断时需要写入当前位置的值。





</br>

---

### - onDisconnectSetValue:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectSetValue(_ value: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectSetValue:(nullable id)value withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，向当前的数据节点设置一个指定的值。
 


##### 参数

 参数名 | 说明 
---|---
value|在连接中断时需要写入当前位置的值。
block|当设置离线事件的操作被提交到云端，将触发这个 block。





</br>

---

### - onDisconnectSetValue:andPriority:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectSetValue(_ value: Any?, andPriority priority: Any)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectSetValue:(nullable id)value andPriority:(id)priority;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，指定的数据和优先级会被写入当前位置。
 


##### 参数

 参数名 | 说明 
---|---
value|在连接中断时需要写入当前位置的值。
priority|在连接中断时需要写入当前位置的优先级。





</br>

---

### - onDisconnectSetValue:andPriority:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectSetValue(_ value: Any?, andPriority priority: Any?, withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectSetValue:(nullable id)value andPriority:(nullable id)priority withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，指定的数据和优先级会被写入当前位置。
 


##### 参数

 参数名 | 说明 
---|---
value|在连接中断时需要写入当前位置的值。
priority|在连接中断时需要写入当前位置的优先级。
block|当设置离线事件的操作被提交到云端，将触发这个 block。





</br>

---

### - onDisconnectRemoveValue

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectRemoveValue()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectRemoveValue;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，删除当前位置上的数据。




</br>

---

### - onDisconnectRemoveValueWithCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectRemoveValue(completionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectRemoveValueWithCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，删除当前位置上的数据。
 


##### 参数

 参数名 | 说明 
---|---
block|当设置离线事件的操作被提交到云端，将触发这个 block。





</br>

---

### - onDisconnectUpdateChildValues:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectUpdateChildValues(_ values: [AnyHashable : Any])
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectUpdateChildValues:(NSDictionary *)values;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，指定的子节点将被写入到当前位置的子节点集合中。
 


##### 参数

 参数名 | 说明 
---|---
values|在连接断开之后，用来更新当前位置的包含子节点键和值的字典。





</br>

---

### - onDisconnectUpdateChildValues:withCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func onDisconnectUpdateChildValues(_ values: [AnyHashable : Any], withCompletionBlock block: @escaping (Error?, WDGSyncReference) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)onDisconnectUpdateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。
当客户端断开连接后，指定的子节点将被写入到当前位置的子节点集合中。
 


##### 参数

 参数名 | 说明 
---|---
values|在连接断开之后，用来更新当前位置的包含子节点键和值的字典。
block|当设置离线事件的操作被提交到云端，将触发这个 block。





</br>

---

### - cancelDisconnectOperations

##### 定义

<div class="swift-lan">Swift</div>```swift
func cancelDisconnectOperations()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)cancelDisconnectOperations;
```

##### 说明

取消之前在当前节点下注册的所有离线操作。




</br>

---

### - cancelDisconnectOperationsWithCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func cancelDisconnectOperations(completionBlock block: ((Error?, WDGSyncReference) -> Void)? = nil)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)cancelDisconnectOperationsWithCompletionBlock:(nullable void (^)(NSError *_Nullable, WDGSyncReference *))block;
```

##### 说明

取消之前在当前节点下注册的所有离线操作。
 


##### 参数

 参数名 | 说明 
---|---
block|当取消离线事件的操作被提交到云端，将触发这个 block。





</br>

---

### + goOffline

##### 定义

<div class="swift-lan">Swift</div>```swift
class func goOffline()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (void)goOffline;
```

##### 说明

手动断开与 Wilddog Sync 云端的连接，关闭自动重连，可以用 [goOnline](WDGSyncReference.html#goOnline) 恢复连接。




</br>

---

### + goOnline

##### 定义

<div class="swift-lan">Swift</div>```swift
class func goOnline()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (void)goOnline;
```

##### 说明

手动恢复与 Wilddog Sync 云端的连接，开启自动重连。




</br>

---

### - runTransactionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block;
```

##### 说明

用于多客户端并发写入操作时保证数据一致性，可以避免并发修改当前节点时的数据冲突。 
与 [setValue:](WDGSyncReference.html#setValue) 直接覆盖以前的数据不同，在不同客户端并发修改时，`runTransactionBlock:` 不会单纯覆盖节点数据。
客户端提交事务至云端，如果数据已被其他客户端修改，那么云端会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。 
在 `runTransactionBlock:` 的执行过程中客户端可能会重复写入直到成功，也可以在执行过程中返回 [[WDGTransactionResult abort]](WDGTransactionResult.html#abort) 手动中止事务。
 


##### 参数

 参数名 | 说明 
---|---
block|接收当前数据，返回一个 [WDGTransactionResult](WDGTransactionResult.html) 实例。





</br>

---

### - runTransactionBlock:andCompletionBlock:

##### 定义

<div class="swift-lan">Swift</div>```swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult, andCompletionBlock completionBlock: @escaping (Error?, Bool, WDGDataSnapshot?) -> Void)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block andCompletionBlock:(void (^)(NSError *_Nullable, BOOL, WDGDataSnapshot *_Nullable))completionBlock;
```

##### 说明

用于多客户端并发写入操作时保证数据一致性，可以避免并发修改当前节点时的数据冲突。
与 [setValue:](WDGSyncReference.html#setValue) 直接覆盖以前的数据不同，在不同客户端并发修改时，[runTransactionBlock:](WDGSyncReference.html#runTransactionBlock) 不会单纯覆盖节点数据。
客户端提交事务至云端，如果数据已被其他客户端修改，那么云端会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。
在 [runTransactionBlock:](WDGSyncReference.html#runTransactionBlock) 的执行过程中客户端可能会重复写入直到成功，也可以在执行过程中返回 [[WDGTransactionResult abort]](WDGTransactionResult.html#abort) 手动中止事务。
 


##### 参数

 参数名 | 说明 
---|---
block|接收当前数据，返回一个 [WDGTransactionResult](WDGTransactionResult.html) 实例。
completionBlock|无论本次事务处理结果如何，当事务完成时这个 block 将被回调。





</br>

---

### - runTransactionBlock:andCompletionBlock:withLocalEvents:

##### 定义

<div class="swift-lan">Swift</div>```swift
func runTransactionBlock(_ block: @escaping (WDGMutableData) -> WDGTransactionResult, andCompletionBlock completionBlock: ((Error?, Bool, WDGDataSnapshot?) -> Void)?, withLocalEvents localEvents: Bool)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)runTransactionBlock:(WDGTransactionResult *(^)(WDGMutableData *))block andCompletionBlock:(nullable void (^)(NSError *_Nullable, BOOL, WDGDataSnapshot *_Nullable))completionBlock withLocalEvents:(BOOL)localEvents;
```

##### 说明

用于多客户端并发写入操作时保证数据一致性，可以避免并发修改当前节点时的数据冲突。
与 [setValue:](WDGSyncReference.html#setValue) 直接覆盖以前的数据不同，在不同客户端并发修改时，[runTransactionBlock:](WDGSyncReference.html#runTransactionBlock) 不会单纯覆盖节点数据。
客户端提交事务至云端，如果数据已被其他客户端修改，那么云端会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。
在 [runTransactionBlock:](WDGSyncReference.html#runTransactionBlock) 的执行过程中客户端可能会重复写入直到成功，也可以在执行过程中返回 [[WDGTransactionResult abort]](WDGTransactionResult.html#abort) 手动中止事务。
 


##### 参数

 参数名 | 说明 
---|---
block|接收当前数据，返回一个 [WDGTransactionResult](WDGTransactionResult.html) 实例。
completionBlock|无论本次事务处理结果如何，当事务完成时这个 block 将被回调。
localEvents|若当前节点已经建立了监听，每次执行 block 都会触发一次监听事件。将其设置为 NO 来阻止本地建立的监听触发中间状态的事件，只有事务操作成功时才触发监听事件。





</br>

---

### - description

##### 定义

<div class="swift-lan">Swift</div>```swift
func description() -> String
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (NSString *)description;
```

##### 说明

获取当前 Wilddog Sync 节点的绝对 URL。
 



##### 返回值

当前 Wilddog Sync 节点的绝对 URL。



