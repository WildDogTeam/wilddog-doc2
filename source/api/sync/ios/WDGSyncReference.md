
title: WDGSyncReference
---

用于 Wilddog Sync 操作数据和读取数据。

## 属性

### app

**定义**

```objectivec
@property (weak, readonly, nonatomic) WDGApp *app
```

**说明**

WDGSync 拥有的 WDGApp 实例。

</br>

------

### parent

**定义**

```objectivec
@property (strong, readonly, nonatomic) WDGSyncReference *parent
```

**说明**

获取父节点的引用。如果当前节点就是 root 节点，方法执行后返回的依然是 root 节点的引用。

</br>

------

### root

**定义**

```objectivec
@property (strong, readonly, nonatomic) WDGSyncReference *root
```

**说明**

获得 WDGSyncReference 根节点的引用。

</br>

------

### key

**定义**

```objectivec
@property (strong, readonly, nonatomic) NSString *key
```

**说明**

获得当前路径下节点的名称。

</br>

------

### URL

**定义**

```objectivec
@property (strong, readonly, nonatomic) NSString* URL
```

**说明**

获取这个引用所属的指向 Wilddog Sync 数据库节点的 URL。

</br>

------

### sync

**定义**

```objectivec
@property (strong, readonly, nonatomic) WDGSync *sync
```

**说明**

根据这个 WDGSyncReference 获得的 WDGSync 实例。

</br>

------

## 方法

### – child:

**定义**

```objectivec
- (WDGSyncReference *)child:(NSString *)pathString
```

**说明**

获得一个在指定路径节点处的 WDGSyncReference 对象。
相对路径可以是一个简单的节点名字（例如，'fred'），或者是一个更深的路径（例如，'fred/name/first'）

**参数**

参数名 | 描述
--- | ---
pathString | 从这个节点到要设定的子节点的相对路径  

**返回值**

指定节点位置的 WDGSyncReference 实例。
</br>

--- 

### – childByAppendingPath:

**定义**

```objectivec
- (WDGSyncReference *)childByAppendingPath:(NSString *)pathString
```

**说明**

childByAppendingPath: 已废弃, 使用 child: 代替。

**参数**

参数名 | 描述
--- | ---
pathString | 从这个节点到要设定的子节点的相对路径  

**返回值**

指定节点位置的 WDGSyncReference 实例。
</br>

--- 

### – childByAutoId

**定义**

```objectivec
- (WDGSyncReference *) childByAutoId
```

**说明**

生成一个唯一名字的子节点，并且返回一个 WDGSyncReference 实例。

**返回值**

生成的唯一节点位置的 WDGSyncReference 实例。

</br>

--- 

### – setValue:

**定义**

```objectivec
- (void)setValue:(id)value
```

**说明**

设置一个节点的值。
   
往当前路径写入一个值，这将会覆盖当前路径和子路径的所有数据。
 
 支持的数据类型:
 
 - NSString -- @"Hello World"
 - NSNumber (包括 BOOL 类型) -- @YES, @43, @4.333
 - NSDictionary -- @{@"key": @"value", @"nested": @{@"another": @"value"} }
 - NSArray
 
 传送一个 nil 或者 null 对象相当于调用 `removeValue`;
 这个路径的所有数据和子路径的数据都将被删除.
 
 `setValue:` 将会删除先前保存的 priority，所以如果要保留先前 priority，必须调用 `setValue:andPriority:`

**参数**

参数名 | 描述
--- | ---
value | 要写入的值 

</br>

--- 

### – setValue:withCompletionBlock:

**定义**

```objectivec
- (void) setValue:(id)value withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 setValue 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
value | 要写入的值
block | 写操作提交到 Wilddog Sync 数据库服务器后回调的 block

</br>

--- 

### – setValue:andPriority:

**定义**

```objectivec
- (void) setValue:(id)value andPriority:(id)priority
```

**说明**

和 setValue: 方法类似，只是为要写入的数值添加了一个优先级。

**参数**

参数名 | 描述
--- | ---
value | 要写入的值
priority | 这个数值的优先级

</br>

----

### – setValue:andPriority:withCompletionBlock:

**定义**

```objectivec
- (void) setValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 – setValue:andPriority: 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
value | 要写入的值
priority | 这个数值的优先级
block | 写操作提交到 Wilddog Sync 数据库服务器后回调的 block

</br>

----

### – removeValue

**定义**

```objectivec
- (void) removeValue
```

**说明**

删除当前节点，效果等同于 setValue:nil。  
如果当前节点有子节点，子节点会被全部删除。
当删除被提交到 Wilddog Sync 数据库后，删除的效果会立即显现。

</br>

----

### – removeValueWithCompletionBlock:

**定义**

```objectivec
- (void) removeValueWithCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 removeValue 方法类似：增加了一个 block，当删除操作完成之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
block | 删除操作提交到 Wilddog Sync 数据库服务器后，这个 block 会被回调

</br>

----

### – setPriority:

**定义**

```objectivec
- (void) setPriority:(id)priority
```

**说明**

设置 Wilddog Sync 当前节点的优先级。  
优先级被用来排序（如果没有指定优先级，子节点按照key排序）。  

你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用 setValue:andPriority: ，当为已存在的数据指定优先级的时候，使用 setPriority:。
节点按照如下规则排序：  
没有 priority 的排最先。  
有数字 priority 的次之，按照数值排序(从小到大)。  
有字符串 priority 的排最后，按照字母表的顺序排列。  
当两个子节点有相同的 priority（包括没有 priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。  
注意：数值优先级被作为 IEEE 754双精度浮点型数字进行解析和排序，Key 以 String 类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。  

**参数**

参数名 | 描述
--- | ---
priority | 指定节点的优先级

</br>

----

### – setPriority:withCompletionBlock:

**定义**

```objectivec
- (void) setPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

和 setPriority: 方法类似，增加了一个 block，当 priority 操作被提交到 Wilddog Sync 数据库服务器之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
priority | 指定节点的优先级
block | 当 priority 操作被提交到 Wilddog Sync 数据库服务器之后，回调的 block

</br>

----
### – updateChildValues:

**定义**

```objectivec
- (void) updateChildValues:(NSDictionary *)values
```

**说明**

将输入对象的子节点合并到当前数据中。

不存在的子节点将会被新增，存在子节点将会被替换。
与 set 操作不同，update 不会直接覆盖原来的节点，而是将 value 中的所有子节点插入到已有的节点中，如果已有的节点中已经有同名子节点，则覆盖原有的子节点。  
例如： update 之前 {"l1":"on","l3":"off"} ,value={"l1":"off","l2":"on"} update 后的数据是 {"l1":"off","l2":"on","l3":"off"}。

**参数**

参数名 | 描述
--- | ---
values | 包含要合并子节点的对象

</br>

----
### – updateChildValues:withCompletionBlock:

**定义**

```objectivec
- (void) updateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 updateChildValues 方法类似：增加了一个 block，当更新操作完成之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
values | 包含要合并子节点的对象
block | updateChildValues 操作提交到 Wilddog Sync 数据库服务器后，返回的 block

</br>

----
### – observeEventType:withBlock:

**定义**

```objectivec
- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

observeEventType:withBlock: 用于监听一个指定节点的数据变化。
这是从 Wilddog Sync 数据库服务器读取数据的主要方式。
在任何时刻，只要被监听的数据发生变化，这个 block 就会被触发。

可以用 removeObserverWithHandle: 方法停止监听数据的变化。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到某事件时，回调 block

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

</br>

----
### – observeEventType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block
```

**说明**

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 
此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。 
   
可以用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

</br>

----
### – observeEventType:withBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock
```

**说明**

observeEventType:withBlock: 用于监听一个指定节点的数据变化。
这是从 Wilddog Sync 数据库服务器读取数据的主要方式。
如果你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到某事件时，回调 block
cancelBlock | 如果客户端没有权限去接受这些事件，这个 block 将会被调用

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

</br>

----
### – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

**定义**

```objectivec
- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock
```

**说明**

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。 

用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。 block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key
cancelBlock | 如果客户端没有权限去接受这些事件，这个 block 将会被调用

**返回值**

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

</br>

----
### – observeSingleEventOfType:withBlock:

**定义**

```objectivec
-- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block
```

**说明**

同 observeEventType:withBlock: 类似，不同之处在于  observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到某事件时，回调 block

</br>

----
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

**定义**

```objectivec
- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block
```

**说明**

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 
此外，对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

**参数**

参数名 | 描述
--- | ---
eventType | 监听的事件类型
block | 当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

</br>

----
### – observeSingleEventOfType:withBlock:withCancelBlock:

**定义**

```objectivec
- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock
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
- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock
```

**说明**

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 
此外，对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

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
- (void) removeObserverWithHandle:(WDGSyncHandle)handle
```

**说明**

取消监听事件。取消之前用 observeEventType:withBlock: 方法注册的监听事件。

**参数**

参数名 | 描述
--- | ---
handle | 由 observeEventType:withBlock:返回的 WDGSyncHandle

</br>

----
### – removeAllObservers

**定义**

```objectivec
- (void) removeAllObservers
```

**说明**

取消之前由 observeEventType:withBlock:方法注册的所有监听事件。
在父节点上调用该方法时不会移除在其子节点上添加的监听。

</br>

----
### – onDisconnectSetValue:

**定义**

```objectivec
- (void) onDisconnectSetValue:(id)value
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效，而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。  
onDisconnectSetValue: 方法对实现在线系统是很有用的，这个在线系统可理解为：当用户失去连接时，一个数值被改变或者被清除，在别人的角度看，他的状态会显示“离线”。

**参数**

参数名 | 描述
--- | ---
value | 断开连接后要设置的值

</br>

----
### – onDisconnectSetValue:withCompletionBlock:

**定义**

```objectivec
- (void) onDisconnectSetValue:(id)value withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。
同 onDisconnectSetValue 方法类似：增加了一个 block，当写入操作完成之后，会回调这个 block。

**参数**

参数名 | 描述
--- | ---
value | 断开连接后要设置的值    
block | 当设置值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

</br>

----
### – onDisconnectSetValue:andPriority:

**定义**

```objectivec
- (void) onDisconnectSetValue:(id)value andPriority:(id)priority
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效，而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

**参数**

参数名 | 描述
--- | ---
value | 断开连接后要设置的值  
priority | 断开连接后要设置的优先级

</br>

----
### – onDisconnectSetValue:andPriority:withCompletionBlock:

**定义**

```objectivec
- (void) onDisconnectSetValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 onDisconnectSetValue:andPriority: 方法类似：增加了一个 block，当写入操作完成之后，会回调这个 block。
当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

**参数**

参数名 | 描述
--- | ---
value | 连接断开后要设置的值  
priority | 连接断开后要设置的优先级  
block | 当设置值的操作成功排队到 Wilddog Sync 服务器上，这个 block 就会被触发

</br>

----
### – onDisconnectRemoveValue

**定义**

```objectivec
- (void) onDisconnectRemoveValue
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效，而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValue 对实施在线系统很有用

</br>

----
### – onDisconnectRemoveValueWithCompletionBlock:

**定义**

```objectivec
- (void) onDisconnectRemoveValueWithCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 onDisconnectRemoveValue 方法类似：增加了一个 block，当删除操作完成之后，会回调这个 block。

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValueWithCompletionBlock: 对实施在线系统很有用

**参数**

参数名 | 描述
--- | ---
block | 当删除值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

</br>

----
### – onDisconnectUpdateChildValues:

**定义**

```objectivec
-- (void) onDisconnectUpdateChildValues:(NSDictionary *)values
```

**说明**

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

**参数**

参数名 | 描述
--- | ---
values | 在连接断开之后，一个包含子节点键和值的字典

</br>

----
### – onDisconnectUpdateChildValues:withCompletionBlock:

**定义**

```objectivec
- (void) onDisconnectUpdateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

同 onDisconnectUpdateChildValues 方法类似：增加了一个 block，当更新操作完成之后，会回调这个 block。

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

**参数**

参数名 | 描述
--- | ---
values | 在连接断开之后，一个包含子节点键和值的字典  
block | 当更新值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

</br>

----
### – cancelDisconnectOperations

**定义**

```objectivec
- (void) cancelDisconnectOperations
```

**说明**

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue: 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

</br>

----
### – cancelDisconnectOperationsWithCompletionBlock:

**定义**

```objectivec
- (void) cancelDisconnectOperationsWithCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block
```

**说明**

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue: 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

**参数**

参数名 | 描述
--- | ---
block | 当 Wilddog Sync 数据库服务器接受到 cancel 请求，触发的 block

</br>

----
### + goOffline

**定义**

```objectivec
+ (void) goOffline
```

**说明**

手动断开连接，关闭自动重连。

</br>

----
### + goOnline

**定义**

```objectivec
+ (void) goOnline
```

**说明**

手动建立连接，开启自动重连。

</br>

----
### – runTransactionBlock:

**定义**

```objectivec
- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。

**参数**

参数名 | 描述
--- | ---
block | 块(block)接收的当前数据(currentData)，然后返回一个 WDGTransactionResult 对象

**示例**

调用 [WDGTransactionResult abort] 可以取消这次操作。事例:
 
```objectivec
[[ref child:@"followNumber"] runTransactionBlock:^WDGTransactionResult *(WDGMutableData *currentData)  {
NSNumber *value = currentData.value;
if (currentData.value == nil) {
    value = @1;
}else{
    [currentData setValue:[NSNumber numberWithInt:(1 + [value intValue])]];
}
return [WDGTransactionResult successWithValue:currentData];
}]; 

```

</br>

----
### – runTransactionBlock:andCompletionBlock:

**定义**

```objectivec
- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDGDataSnapshot* snapshot))completionBlock
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
  
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
调用 [WDGTransactionResult abort] 可以取消这次操作。 

**参数**

参数名 | 描述
--- | ---
block | 块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象    
completionBlock | 当事务完成时这个块将被触发，无论成功与否

</br>

----
### – runTransactionBlock:andCompletionBlock:withLocalEvents:

**定义**

```objectivec
- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDGDataSnapshot* snapshot))completionBlock withLocalEvents:(BOOL)localEvents
```

**说明**

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。 
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
调用 [WDGTransactionResult abort] 可以取消这次操作。

**参数**

参数名 | 描述
--- | ---
block | 块(block)接收的当前数据(currentData)，然后返回一个 WDGTransactionResult 对象
completionBlock | 当事务完成时这个块将被触发，无论成功与否  
localEvents | 将其设置为 NO 来阻止触发中间状态的事件，只触发最终状态事件

</br>

----

### – description

**定义**

```objectivec
- (NSString *) description
```

**说明**

获取当前 Wilddog Sync 数据库节点的绝对路径的 URL。

**返回值**

当前 Wilddog Sync 数据库节点的绝对路径的 URL

</br>
