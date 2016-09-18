title: iOS API 文档
---
## WDGSync (*Methods*)

### + sync

 定义

`+ (WDGSync *) sync NS_SWIFT_NAME(sync())`

 说明

用默认的 WDGApp 获取这个 WDGSync 实例。

 返回值

一个 WDGSync 实例

----
### + syncForApp:

 定义

`+ (WDGSync *) syncForApp:(WDGApp*)app NS_SWIFT_NAME(sync(app:))`

 说明

用特定的 WDGApp 获取这个 WDGSync 实例。

 参数

app 用于得到 WDGSync 的 WDGApp

 返回值

一个 WDGSync 实例

----
### app

 定义

`@property (weak, readonly, nonatomic) WDGApp *app`

 说明

WDGSync 拥有的 WDGApp 实例。

----
### reference

 定义

`- (WDGSyncReference *)reference`

 说明

得到一个 Wilddog Sync 根路径的 WDGSyncReference 引用。

----
### - referenceWithPath:

 定义

`- (WDGSyncReference *) referenceWithPath:(NSString *)path`

 说明

用有效的路径去获得一个 WDGSyncReference 引用。

 参数

path 指向 Wilddog Sync 数据库节点的一个路径

 返回值

指定路径节点的 WDGSyncReference 引用

----
### - referenceFromURL:

 定义

`- (WDGSyncReference *)referenceFromURL:(NSString *)syncUrl`

 说明

用这个有效的 URL 获得一个 WDGSyncReference 引用。
这个 URL 必须是指向默认 Wilddog Sync 数据库完整路径（如'https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts'）。
若要创建一个指向不同 Sync 数据库的 WDGSyncReference, 可以先用配置好 URL 的 WDGOptions 对象去创建一个WDGApp 。

 参数

path 指向 Wilddog Sync 数据库节点的一个路径

 返回值

指定路径节点的 WDGSyncReference 引用

----
### – goOffline

 定义

`- (void)goOffline`

 说明

断开与 Wilddog Sync 后台服务器的连接，可以用 `goOnline` 恢复连接。

----
### – goOnline

 定义

`- (void)goOnline`

 说明

恢复与 Wilddog Sync 后台服务器的连接，可以用 `goOffline` 断开连接。

----
### persistenceEnabled

 定义

`@property (nonatomic) BOOL persistenceEnabled`

 说明

默认情况下，在你的应用程序正在运行时，Wilddog Sync 客户端会将数据保存在内存中，当应用被重新启动时数据就没有了。把这个值设置为 YES 时，数据将被保存到设备，并且当应用程序重新启动时（即使在重新启动程序时没有网络连接），这些存储的数据也是可以用的。请注意，此属性必须在创建第一个 Sync 引用之前设置，并且每次启用应用程序只需要调用一次即可。  

----
### callbackQueue

 定义

`@property (nonatomic, strong) dispatch_queue_t callbackQueue`

 说明

设置所有被触发事件的队列。默认队列为主队列。

----
### + setLoggingEnabled:

 定义

`+ (void) setLoggingEnabled:(BOOL)enabled`

 说明

打印程序相关信息。

 参数

enabled 设为 YES 为打印。默认为 NO，不打印

----
### + sdkVersion

 定义

`+ (NSString *) sdkVersion`

 说明

获取 Wilddog Sync SDK 版本号。

 返回值

Wilddog Sync SDK 版本号

----
## WDGSyncReference (*Methods*)

### – child:
 
 定义

`- (WDGSyncReference *)child:(NSString *)pathString`

 说明

获得一个在指定路径节点处的 WDGSyncReference 对象。
相对路径可以是一个简单的节点名字（例如，'fred'），或者是一个更深的路径（例如，'fred/name/first'）

 参数

pathString 从这个节点到要设定的子节点的相对路径

 返回值

指定节点位置的 WDGSyncReference 对象

----
### – childByAppendingPath:
 
 定义

`- (WDGSyncReference *)childByAppendingPath:(NSString *)pathString`

 说明

childByAppendingPath: 已废弃, 使用 child: 代替。

 参数

pathString 从这个节点到要设定的子节点的相对路径

 返回值

指定节点位置的 WDGSyncReference 对象

----
### – childByAutoId

 定义

`- (WDGSyncReference *) childByAutoId`

 说明

生成一个唯一名字的子节点，并且返回一个 WDGSyncReference 对象。

 返回值

指定节点位置的 WDGSyncReference 对象

----
### – setValue:

 定义

`- (void)setValue:(id)value`

 说明

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

 参数

value 将被写入的值

----
### – setValue:withCompletionBlock:

 定义

`- (void) setValue:(id)value withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block`

 说明

同 setValue 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

 参数
value 将被写入的值  
block 写操作提交到 Wilddog Sync 数据库服务器后回调的 block

----
### – setValue:andPriority:

 定义

`- (void) setValue:(id)value andPriority:(id)priority`

 说明

和 setValue: 方法类似，只是为要写入的数值添加了一个优先级。

 参数
value 要写入的数值  
priority 这个数值的优先级

----
### – setValue:andPriority:withCompletionBlock:

 定义

`- (void) setValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block`

 说明

同 setValue 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

 参数
value 要写入的数值  
priority 这个数值的优先级  
block 当写操作被提交到服务器，将被触发的 block

----
### – removeValue

 定义

`- (void) removeValue`

 说明

删除当前节点，效果等同于 setValue:nil；  
如果当前节点有子节点，子节点会被全部删除。
当删除被提交到 Wilddog Sync 数据库后，删除的效果会立即显现。

----
### – removeValueWithCompletionBlock:

 定义

`- (void) removeValueWithCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block`

 说明

同 remove 方法类似：增加了一个 block，当删除操作完成之后，会回调这个 block。

 参数

block 删除操作提交到 Wilddog Sync 数据库服务器后，这个 block 会被回调

----
### – setPriority:

 定义

`- (void) setPriority:(id)priority`

 说明

设置 Wilddog Sync 当前节点的优先级。  
优先级被用来排序（如果没有指定优先级，子节点按照key排序）。  

你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用 setValue:andPriority: ，当为已存在的数据指定优先级的时候，使用 setPriority:。
节点按照如下规则排序：  
没有 priority 的排最先。  
有数字 priority 的次之，按照数值排序(从小到大)。  
有字符串 priority 的排最后，按照字母表的顺序排列。  
当两个子节点有相同的 priority（包括没有 priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。  
注意：数值优先级被作为 IEEE 754双精度浮点型数字进行解析和排序，Key 以 String 类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。  

 参数

priority  指定节点的优先级。

----
### – setPriority:withCompletionBlock:

 定义

`- (void) setPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block`

 说明

和 setPriority: 方法类似，增加了一个 block，当 priority 操作被提交到 Wilddog Sync 数据库服务器之后，会回调这个 block。

 参数

priority 指定节点的优先级  
block 当 priority 操作被提交到 Wilddog Sync 数据库服务器之后，回调的 block

----
### – updateChildValues:

 定义

`- (void) updateChildValues:(NSDictionary *)values`

 说明

将输入对象的子节点合并到当前数据中。

不存在的子节点将会被新增，存在子节点将会被替换。
与 set 操作不同，update 不会直接覆盖原来的节点，而是将 value 中的所有子节点插入到已有的节点中，如果已有的节点中已经有同名子节点，则覆盖原有的子节点。  
例如： update 之前 {"l1":"on","l3":"off"} ,value={"l1":"off","l2":"on"} update 后的数据是 {"l1":"off","l2":"on","l3":"off"}。

 参数

values 包含要合并子节点的对象

----
### – updateChildValues:withCompletionBlock:

 定义

`- (void) updateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, WDGSyncReference* ref))block`

 说明

同 updateChildValues 方法类似：增加了一个 block，当更新操作完成之后，会回调这个 block。

 参数

values 包含要合并子节点的对象  
block updateChildValues操作提交到 Wilddog Sync 数据库服务器后，返回的 block

----
### – observeEventType:withBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog Sync 数据库服务器读取数据的主要方式  
在任何时刻，只要被监听的数据发生变化，这个 block 就会被触发。

可以用 removeObserverWithHandle: 方法停止监听数据的变化。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:andPreviousSiblingKeyWithBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。    
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

 参数

eventType 监听的事件类型  
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:withBlock:withCancelBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog Sync 数据库服务器读取数据的主要方式  
如果你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。 

用 removeObserverWithHandle: 方法去停止接受数据更新的监听。  

 参数

eventType   监听的事件类型    
block       当监听到初始数据和初始数据发生变化时，这个 block 将被回调。 block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key   
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeSingleEventOfType:withBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block`

 说明

同 observeEventType:withBlock: 类似，不同之处在于  observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

 参数

eventType 监听的事件类型    
block     当监听到某事件时，回调 block

----
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的key值。

 参数

eventType 监听的事件类型    
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

----
### – observeSingleEventOfType:withBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

同 observeSingleEventOfType:withBlock: 类似，如果你没有在这个节点读取数据的权限，cancelBlock 将会被回调。

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock

----
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType   监听的事件类型    
block       将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock

----
### – removeObserverWithHandle:

 定义

`- (void) removeObserverWithHandle:(WDGSyncHandle)handle`

 说明

取消监听事件。取消之前用 observeEventType:withBlock: 方法注册的监听事件。

 参数

handle 由 observeEventType:withBlock:返回的 WDGSyncHandle

----
### – removeAllObservers

 定义

`- (void) removeAllObservers`

 说明

取消之前由 observeEventType:withBlock:方法注册的监听事件。

----
### – onDisconnectSetValue:

 定义

`- (void) onDisconnectSetValue:(id)value`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。  
onDisconnectSetValue: 方法对实现在线系统是很有用的，这个在线系统可理解为：当用户失去连接时，一个数值被改变或者被清除，在别人的角度看，他的状态会显示“离线”。

 参数

value 断开连接后要设置的值

----
### – onDisconnectSetValue:withCompletionBlock:

 定义

`- (void) onDisconnectSetValue:(id)value withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。

 参数

value 断开连接后要设置的值    
block 当设置值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

----
### – onDisconnectSetValue:andPriority:

 定义

`- (void) onDisconnectSetValue:(id)value andPriority:(id)priority`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

 参数

value 断开连接后要设置的值  
priority 断开连接后要设置的优先级

----
### – onDisconnectSetValue:andPriority:withCompletionBlock:

 定义

`- (void) onDisconnectSetValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

 参数

value 连接断开后要设置的值  
priority 连接断开后要设置的优先级  
block 当设置值的操作成功排队到 Wilddog Sync 服务器上，这个 block 就会被触发

----
### – onDisconnectRemoveValue

 定义

`- (void) onDisconnectRemoveValue`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValue 对实施在线系统很有用

----
### – onDisconnectRemoveValueWithCompletionBlock:

 定义

`- (void) onDisconnectRemoveValueWithCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValueWithCompletionBlock: 对实施在线系统很有用

 参数

block 当删除值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

----
### – onDisconnectUpdateChildValues:

 定义

`- (void) onDisconnectUpdateChildValues:(NSDictionary *)values`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

 参数

values 在连接断开之后，一个包含子节点键和值的字典

----
### – onDisconnectUpdateChildValues:withCompletionBlock:

 定义

`- (void) onDisconnectUpdateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

 参数

values 在连接断开之后，一个包含子节点键和值的字典  
block 当更新值的操作成功排队到 Wilddog Sync 数据库服务器上，这个 block 就会被触发

----
### – cancelDisconnectOperations

 定义

`- (void) cancelDisconnectOperations`

 说明

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue:, 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

----
### – cancelDisconnectOperationsWithCompletionBlock:

 定义

`- (void) cancelDisconnectOperationsWithCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue:, 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

 参数

block 当 Wilddog Sync 数据库服务器接受到 cancel 请求，触发的 block

----
### + goOffline

 定义

`+ (void) goOffline`

 说明

手动建立连接，开启自动重连。

----
### + goOnline

 定义

`+ (void) goOnline`

 说明

手动断开连接，关闭自动重连。

----
### – runTransactionBlock:

 定义

`- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WDGTransactionResult abort] 可以取消这次操作。事例:
 
```
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

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象

----
### – runTransactionBlock:andCompletionBlock:

 定义

`- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDGDataSnapshot* snapshot))completionBlock`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。
  
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WDGTransactionResult abort] 可以取消这次操作。 

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象    
completionBlock 当事务完成时这个块将被触发，无论成功与否

----
### – runTransactionBlock:andCompletionBlock:withLocalEvents:

 定义

`- (void) runTransactionBlock:(WDGTransactionResult* (^) (WDGMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDGDataSnapshot* snapshot))completionBlock withLocalEvents:(BOOL)localEvents`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WDGTransactionResult 中。 
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WDGTransactionResult abort] 可以取消这次操作。

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WDGTransactionResult对象    
completionBlock 当事务完成时这个块将被触发，无论成功与否  
localEvents  将其设置为 NO 来阻止触发中间状态的事件，只触发最终状态事件

----
### – description

 定义

`- (NSString *) description`

 说明

获取当前 Wilddog Sync 数据库节点的绝对 URL。

 返回值

当前 Wilddog Sync 数据库节点的绝对 URL

----
### parent

 定义

`@property (strong, readonly, nonatomic) WDGSyncReference *parent`

 说明

获取父节点的引用。如果当前节点就是 root 节点，方法执行后返回的依然是 root 节点的引用。

----
### root

 定义

`@property (strong, readonly, nonatomic) WDGSyncReference *root`

 说明

获得 WDGSyncReference 根结点的引用。

----
### key

 定义

`@property (strong, readonly, nonatomic) NSString *key`

 说明

获得当前路径下节点的名称。

----
### URL

 定义

`@property (strong, readonly, nonatomic) NSString* URL`

 说明

获取这个引用所属的指向 Wilddog Sync 数据库节点的 URL。

----
### sync

 定义

`@property (strong, readonly, nonatomic) WDGSync *sync`

 说明

根据这个引用获得 WDGSync 实例。

----
## WDGSyncQuery (*Methods*)

### – observeEventType:withBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog Sync 数据库服务器读取数据的主要方式  
在任何时刻，只要被监听的数据发生变化，这个 block 就会被触发。

可以用 removeObserverWithHandle: 方法停止监听数据的变化。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:andPreviousSiblingKeyWithBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。  
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

 参数

eventType 监听的事件类型  
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:withBlock:withCancelBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog Sync 数据库服务器读取数据的主要方式  
如果你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (WDGSyncHandle) observeEventType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog Sync 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。
  
由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。 
  
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。  

 参数

eventType   监听的事件类型    
block       当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key     
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WDGSyncHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block

----
### – observeSingleEventOfType:withBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block`

 说明

同 observeEventType:withBlock: 类似，不同之处在于 observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

 参数

eventType 监听的事件类型    
block     当监听到某事件时，回调 block  

----
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType 监听的事件类型    
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key

----
### – observeSingleEventOfType:withBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType withBlock:(void (^)(WDGDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

同 observeSingleEventOfType:withBlock:类似，如果你没有在这个节点读取数据的权限，cancelBlock 将会被回调。

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock  

----
### – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WDGDataEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDGDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WDGDataEventTypeChildAdded, WDGDataEventTypeChildMoved, 和 WDGDataEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType   监听的事件类型    
block       将传输一个 WDGDataSnapshot 类型的数据和前一个子节点的 key    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock  

----
### – removeObserverWithHandle:

 定义

`- (void) removeObserverWithHandle:(WDGSyncHandle)handle`

 说明

取消监听事件。取消之前用 observeEventType:withBlock:注册的回调函数。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

handle 由 observeEventType:withBlock:返回的 WDGSyncHandle

----
### – removeAllObservers

 定义

`- (void) removeAllObservers`

 说明

取消之前由 observeEventType:withBlock:注册的所有的监听事件。

----
### – keepSynced:

 定义

`- (void) keepSynced:(BOOL)keepSynced`

 说明

在某一节点处通过调用`keepSynced:YES`方法，即使该节点处没有设置监听者，此节点处的数据也将自动下载存储并保持同步。

 参数

keepSynced 参数设置为 YES，则在此节点处同步数据，设置为 NO，停止同步

----
### – queryLimitedToFirst:

 定义

`- (WDGSyncQuery *) queryLimitedToFirst:(NSUInteger)limit`

 说明

queryLimitedToFirst: 用于创建一个新 WDGSyncQuery 引用，获取从第一条开始的指定数量的数据。    
返回的 WDGSyncQuery 查询器类将响应从第一个开始，到最多指定(limit)节点个数的数据。

 参数

limit 这次查询能够获取的子节点的最大数量

 返回值

返回一个 WDGSyncQuery 查询器类，最多指定(limit)个数的数据

----
### – queryLimitedToLast:

 定义

`- (WDGSyncQuery *) queryLimitedToLast:(NSUInteger)limit`

 说明

queryLimitedToLast: 用于创建一个新 WDGSyncQuery 引用，获取从最后一条开始向前指定数量的数据。  
将返回从最后一个开始，最多指定(limit)个数的数据。

 参数

limit 这次查询能够获取的子节点的最大数量

 返回值

返回一个 WDGSyncQuery 查询器类，最多指定(limit)个数的数据

----
### – queryOrderedByChild:

 定义

`- (WDGSyncQuery *) queryOrderedByChild:(NSString *)key`

 说明

queryOrderedByChild: 用于产生一个新 WDGSyncQuery 引用，是按照特定子节点的值进行排序的。   
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 参数

key 指定用来排序的子节点的 key

 返回值

返回一个按指定的子节点 key 排序生成的 WDGSyncQuery 查询器类

----
### – queryOrderedByKey

 定义

`- (WDGSyncQuery *) queryOrderedByKey`

 说明

queryOrderedByKey 用于产生一个新 WDGSyncQuery 引用，是按照特定子节点的 key 进行排序的。  
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

返回一个按指定的子节点 key 排序生成的 WDGSyncQuery 查询器类

----
### – queryOrderedByValue

 定义

`- (WDGSyncQuery *) queryOrderedByValue`

 说明

queryOrderedByValue 用于产生一个新 WDGSyncQuery 引用，是按照当前节点的值进行排序的。  
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

handle 由 observeEventType:withBlock:返回的 WDGSyncHandle

----
### – queryOrderedByPriority

 定义

`- (WDGSyncQuery *) queryOrderedByPriority`

 说明

queryOrderedByPriority 用于产生一个新 WDGSyncQuery 引用，是按照当前节点的优先级排序的。     
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

handle 由observeEventType:withBlock:返回的 WDGSyncHandle

----
### – queryStartingAtValue:

 定义

`- (WDGSyncQuery *) queryStartingAtValue:(id)startValue`

 说明

queryStartingAtValue: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值均大于或等于 startValue。

 参数

startValue query 查询到的值均大于等于 startValue

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应在数据值大于或等于 startValue 的节点事件

----
### – queryStartingAtValue:childKey:

 定义

`- (WDGSyncQuery *) queryStartingAtValue:(id)startValue childKey:(NSString *)childKey`

 说明

queryStartingAtValue:childKey: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值大于 startValue，或者等于 startValue 并且 key 大于等于 childKey。

 参数

startValue query查询到的值均大于等于 startValue
childKey query查询到的 key 均大于等于 childKey

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应在数据值大于 startValue，或等于 startValue 的值并且 key 大于或等于 childKey 的节点事件

----
### – queryEndingAtValue:

 定义

`- (WDGSyncQuery *) queryEndingAtValue:(id)endValue`

 说明

queryEndingAtValue: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值均小于或者等于 endValue。

 参数

endValue query查询到的值均小于等于 endValue  

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应在数据值均小于或等于 endValue 的节点事件

----
### – queryEndingAtValue:childKey:

 定义

`- (WDGSyncQuery *) queryEndingAtValue:(id)endValue childKey:(NSString *)childKey`

 说明

queryEndingAtValue:childKey: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值小于 endValue，或者等于 endValue 并且 key 小于等于 childKey。

 参数

endValue query查询到的值均小于等于 endValue  
childKey query查询到的 key 均小于等于 childKey

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应在查询到的数据值小于 endValue，或者数据值等于 endValue 并且 key 小于等于 childKey 的节点事件

----
### – queryEqualToValue:

 定义

`- (WDGSyncQuery *) queryEqualToValue:(id)value`

 说明

queryEqualToValue: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值都等于 value。

 参数

value query查询到的值都等于 value  

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应与 value 相等数值的节点事件

----
### – queryEqualToValue:childKey:

 定义

`- (WDGSyncQuery *) queryEqualToValue:(id)value childKey:(NSString *)childKey`

 说明

queryEqualToValue:childKey: 用于返回一个 WDGSyncQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值等于 value 并且 key 等于 childKey。返回的值肯定是唯一的，因为 key 是唯一的。

 参数

value query查询到的值都等于 value  
childKey  query查询到的 key 都等于 childKey 

 返回值

返回一个 WDGSyncQuery 查询器类，用于响应这个与之相等数值和 key 节点事件

----
### ref

 定义

`@property (nonatomic, readonly, strong) WDGSyncReference* ref`

 说明

获取这个查询节点处的 WDGSyncReference 引用。

----
## WDGDataSnapshot (*Methods*)

### – childSnapshotForPath:
 定义

`- (WDGDataSnapshot *) childSnapshotForPath:(NSString *)childPathString`

 说明

根据指定的相对路径，来获取当前节点下的 WDGDataSnapshot。

childPathString 为相对路径  
相对路径可以是一个简单的节点名字（例如，‘fred’）  
也可以是一个更深的路径，（例如，'fred/name/first'）多层级间需要使用"/"分隔  
如果节点的位置没有数据，则返回一个空的 WDGDataSnapshot

 参数

childPathString 节点数据的相对路径

 返回值

指定节点位置的 WDGDataSnapshot

----
### – hasChild:

 定义

`- (BOOL) hasChild:(NSString *)childPathString`

 说明

如果指定路径下存在子节点，返回 YES。

 参数

childPathString 相对路径

 返回值

如果指定路径下存在子节点，返回 YES，否则返回 NO

----
### – hasChildren

 定义

`- (BOOL) hasChildren`

 说明

如果这个 Datasnapshot 有任何子节点返回 YES，否则 NO。

 返回值

如果这个 Datasnapshot 有任何子节点返回 YES

----
### – exists

 定义

`- (BOOL)exists`

 说明

如果 DataSnapshot中包含非空数据，返回 YES。

 返回值

如果 DataSnapshot 包含一个非空数据，就返回 YES 

----
### – valueInExportFormat

 定义

`- (id) valueInExportFormat`

 说明

返回该节点的原始数据

----
### value

 定义

`@property (strong, readonly, nonatomic) id value`

 说明

从 snapshot 中获得当前节点的数据。

返回的数据类型有:NSDictionary、NSArray、NSNumber (包含 Bool 类型)、NSString

----
### childrenCount

 定义

`@property (readonly, nonatomic) NSUInteger childrenCount`

 说明

获得 DataSnapshot 的子节点的总数。

----
### ref

 定义

`@property (nonatomic, readonly, strong) Wilddog* ref`

 说明

从 DataSnapshot 中，获得当前节点的引用。

----
### key

 定义

`@property (strong, readonly, nonatomic) NSString* key`

 说明

从 DataSnapshot 中，获取当前节点的名称。

----
### children

 定义

`@property (strong, readonly, nonatomic) NSEnumerator* children`

 说明

获取当前 DataSnapshot 中，所有子节点的迭代器。

```
for (WDGDataSnapshot* child in snapshot.children) {  
     ...  
}

```

----
### priority

 定义

`@property (strong, readonly, nonatomic) id priority`

 说明

获取该 WDGDataSnapshot 对象的优先级。

 返回值

优先级是一个字符串，若没有设置优先级，则返回 nil

----
## WDGMutableData (*Methods*)

### – hasChildren

 定义

`- (BOOL) hasChildren`

 说明

判断在当前 WDGMutableData 中，是否存在子节点。

 返回值

YES 为存在子节点，NO 为不存在

----
### – hasChildAtPath:

 定义

`- (BOOL) hasChildAtPath:(NSString *)path`

 说明

检查指定路径下是否存在子节点。

 参数

path 可以是类似'child'的单层级路径，也可以是类似'a/deeper/child'多层级路径

 返回值

如果在指定的相对路径下，该 WDGMutableData 包含子节点，则返回YES

----
### – childDataByAppendingPath:

 定义

`- (WDGMutableData *) childDataByAppendingPath:(NSString *)path`

 说明

用于获得一个在给定的相对路径下的 WDGMutableData 数据实例。

 参数

path 可以是类似'child'的单层级路径，也可以是类似'a/deeper/child'多层级路径

 返回值

指定路径下的 WDGMutableData 实例

----
### value

 定义

`@property (strong, nonatomic) id value`

 说明

修改 WDGMutableData 实例中的数据，value 可将其设置为 Wilddog Sync 支持的任一原生数据类型：  
 NSNumber (includes BOOL)  
 NSDictionary  
 NSArray  
 NSString  
 nil / NSNull (设置 nil / NSNull 删除该数据)  
注意修改这个 value，会覆盖这个节点的优先级  

 返回值

获得当前节点的数据

----
### priority

 定义

`@property (strong, nonatomic) id priority`

 说明

设置这个属性可以更新该节点下面的数据优先级，可以设置的值类型有：  
* NSNumber  
* NSString  
* nil / NSNull (设置 nil / NSNull 删除该数据)   

 返回值

获得当前节点的优先级

----
### childrenCount

 定义

`@property (readonly, nonatomic) NSUInteger childrenCount`

 返回值

获得子节点的总数

----
### children

 定义

`@property (readonly, nonatomic, strong) NSEnumerator* children`

 说明

用于迭代该节点的子节点，可以用下面的这个方法：

```  
for (WDGMutableData* child in data.children) {  
    ...  
}  

```

 返回值

获取当前节点下所有子节点的 WDGMutableData 实例的迭代器

----
### key

 定义

`@property (readonly, nonatomic, strong) NSString* key`

 返回值

获取当前节点的 key，最上层的节点的 key 是 nil

----
## WDGServerValue (*Methods*)

### + timestamp:

 定义

`+ (NSDictionary *) timestamp;`

 说明

返回一个字典，通过写数据的方式将这个字典写到野狗数据库里，会在该节点处得到服务器的时间。

 返回值

这样的 @{".sv" : timestamp} 一个字典

----
# WDGTransactionResult (*Methods*)


### + successWithValue:

 定义

`+ (WDGTransactionResult *) successWithValue:(WDGMutableData *)value`

 说明

用于 runTransactionBlock: 方法中。 表明传入参数 value 应保存在这个节点处。

 返回值

返回一个 WDGTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值

----
### + abort

 定义

`+ (WDGTransactionResult *) abort`

 说明

用于 runTransactionBlock: 方法中。 使用该方法可以主动终止当前事务。

 返回值

返回一个 WDGTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值

----
## WDGApp (*Methods*)


### + configureWithOptions:

 定义

`+ (void)configureWithOptions:(WDGOptions *)options`

 说明

用有效的 options 配置默认的 Wilddog app。默认的 app 名字是 '__WDGAPP_DEFAULT'。
如果配置失败，会抛出异常。这个方法是线程安全的。

 参数

options 配置 Wilddog 应用所需的实例

----
### + configureWithName:options:

 定义

`+ (void)configureWithName:(NSString *)name options:(WDGOptions *)options`

 说明

用 options 和 name 配置一个 Wilddog app. 如果配置失败，会抛出异常。
这个方法是保证线程安全的。

 参数

name 开发者自己起名的应用名称。这个名字只能包含字母、数组和下划线
options 配置 Wilddog 应用所需的 WDGOptions 实例

----
### + defaultApp

 定义

`+ (nullable WDGApp *)defaultApp NS_SWIFT_NAME(defaultApp())`

 说明

返回一个默认的 app。如果默认 app 不存在，则返回 nil。

 返回值

返回一个默认的 WDGApp 实例。

----
### + appNamed:

 定义

`+ (nullable WDGApp *)appNamed:(NSString *)name;`

 说明

返回一个之前用 name 创建好的 WDGApp. 如果没有这个 app, 则返回 nil.
这个方法是保证线程安全的。

 参数

name 开发者自己起名的应用名称。

----
### + allApps

 定义

`+ (nullable NSDictionary *)allApps`

 说明

返回所有现存的 WDGApp 实例。如果没有 WDGApp 实例，则返回 nil.
这个方法是保证线程安全的。

 返回值

含有 WDGApp 的字典

----
### - deleteApp:

 定义

`- (void)deleteApp:(WDGAppVoidBoolCallback)completion`

 说明

清除当前的 WDGApp, 释放相关的数据，并回收它的名字以便将来使用。
这个方法是保证线程安全的。

 参数

completion 删除成功与否的回调

----
### - init

 定义

`- (nullable instancetype)init NS_UNAVAILABLE`

 说明

WDGWilddogApp 实例不能直接初始化。 请用 |WDGApp configure|, 或者  
|WDGApp configureWithOptions:|, 或者 |WDGApp configureWithNames:options| 初始化。

----
### name

 定义

`@property(nonatomic, copy, readonly) NSString *name`

 说明

获取这个 app 的 name。

----
### options

 定义

`@property(nonatomic, readonly) WDGOptions *options`

 说明

获取这个 app 的 options。

----
## WDGOptions (*Methods*)

### syncURL

 定义

`@property(nonatomic, readonly, copy) NSString *syncURL`

 说明

Sync 的根路径 URL, e.g. @"http://your-appid.wilddogio.com".

----
### - initWithSyncURL:

 定义

`- (instancetype)initWithSyncURL:(NSString *)syncURL`

 说明

初始化 WDGOptions。

 参数

syncURL Sync 的根路径 URL, e.g. @"http://your-appid.wilddogio.com"

 返回值

初始化成功的 WDGOptions 实例
