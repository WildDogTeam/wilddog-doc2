title:  完整 API 文档
---

# Wilddog (*Methods*)

## – initWithUrl:

 定义

`- (id)initWithUrl:(NSString *)url`

 说明

用一个完整的 URL 初始化 Wilddog 对象。

 参数

url  WilddogURL(例如: `https://<appId>.wilddogio.com`)



## – childByAppendingPath:
 
 定义

`- (Wilddog *)childByAppendingPath:(NSString *)pathString`

 说明

获得一个在指定路径节点处的 Wilddog 对象。
相对路径可以是一个简单的节点名字（例如，‘fred’），或者是一个更深的路径（例如，'fred/name/first'）

 参数

pathString 从这个节点到要设定的子节点的相对路径

 返回值

指定节点位置的 Wilddog 对象


## – childByAutoId

 定义

`- (Wilddog *) childByAutoId`

 说明

生成一个唯一名字的子节点，并且返回一个 Wilddog 对象。

 返回值

指定节点位置的 Wilddog 对象


## – setValue:

 定义

`- (void)setValue:(id)value`

 说明

设置一个节点的值。
   
往 Wilddog 当前路径写入一个值，这将会覆盖当前路径和子路径的所有数据。
 
 支持的数据类型:
 
 - NSString -- @"Hello World"
 - NSNumber (包括 BOOL 类型) -- @YES, @43, @4.333
 - NSDictionary -- @{@"key": @"value", @"nested": @{@"another": @"value"} }
 - NSArray
 
 传送一个 nil 或者 null 对象相当于调用 `removeValue`;
 这个路径的所有数据和子路径的数据都将被删除.
 
 `setValue:` 将会删除先前保存的 priority，所以如果要保留先前 priority，必须调用 setValue:andPriority:
 
 `Server Timestamps:` Wilddog 服务器提供一种机制来获取服务器时间。比如我们可以结合 *onDisconnect* 来记录一个客户端的下线时间。
 
`#define kWilddogServerValueTimestamp @{ @".sv": @"timestamp" }`

``` 
Wilddog *userLastOnlineRef = [[Wilddog alloc] initWithUrl:@"https://<YOUR-WILDDOG-APP>.wilddogio.com/users/joe/lastOnline"];
[userLastOnlineRef onDisconnectSetValue:kWilddogServerValueTimestamp];

```
 
 参数

value 将被写入的值

## – setValue:withCompletionBlock:

 定义

`- (void) setValue:(id)value withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

同 setValue 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

 参数
value 将被写入的值  
block 写操作提交到 Wilddog 服务器后回调的 block

## – setValue:andPriority:

 定义

`- (void) setValue:(id)value andPriority:(id)priority`

 说明

和 setValue: 方法类似，只是为要写入的数值添加了一个优先级。

 参数
value 要写入的数值  
priority 这个数值的优先级

## – setValue:andPriority:withCompletionBlock:

 定义

`- (void) setValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

同 setValue 方法类似：增加了一个 block，当写操作完成之后，会回调这个 block。

 参数
value 要写入的数值  
priority 这个数值的优先级  
block 当写操作被提交到服务器，将被触发的 block

## – removeValue

 定义

`- (void) removeValue`

 说明

删除当前节点，效果等同于 setValue:nil；  
如果当前节点有子节点，子节点会被全部删除。
当删除被提交到 Wilddog 数据库后，删除的效果会立即显现。


## – removeValueWithCompletionBlock:

 定义

`- (void) removeValueWithCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

同 remove 方法类似：增加了一个 block，当删除操作完成之后，会回调这个 block。

 参数

block 删除操作提交到 Wilddog 服务器后，这个 block 会被回调


## – setPriority:

 定义

`- (void) setPriority:(id)priority`

 说明

设置 Wilddog 当前节点的优先级。  
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


## – setPriority:withCompletionBlock:

 定义

`- (void) setPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

和 setPriority: 方法类似，增加了一个 block，当 priority 操作被提交到 Wilddog 服务器之后，会回调这个 block。

 参数

priority 指定节点的优先级  
block 当 priority 操作被提交到 Wilddog 服务器之后，回调的 block


## – updateChildValues:

 定义

`- (void) updateChildValues:(NSDictionary *)values`

 说明

将输入对象的子节点合并到当前数据中。

不存在的子节点将会被新增，存在子节点将会被替换。
与 set 操作不同，update 不会直接覆盖原来的节点，而是将 value 中的所有子节点插入到已有的节点中，如果已有的节点中已经有同名子节点，则覆盖原有的子节点。  
例如： update 之前 {"l1":"on","l3":"off"} ,value={"l1":"off","l2":"on"} update 后的数据是 {"l1":"off","l2":"on","l3":"off"}。

 参数

values 包含要合并子节点的对象

## – updateChildValues:withCompletionBlock:

 定义

`- (void) updateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

同 updateChildValues 方法类似：增加了一个 block，当更新操作完成之后，会回调这个 block。

 参数

values 包含要合并子节点的对象  
block updateChildValues操作提交到 Wilddog 服务器后，返回的 block

## – observeEventType:withBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog 服务器读取数据的主要方式  
在任何时刻，只要被监听的数据发生变化，这个 block 就会被触发。

可以用 removeObserverWithHandle: 方法停止监听数据的变化。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:andPreviousSiblingKeyWithBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。    
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

 参数

eventType 监听的事件类型  
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:withBlock:withCancelBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog 服务器读取数据的主要方式  
如果你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。 

用 removeObserverWithHandle: 方法去停止接受数据更新的监听。  

 参数

eventType   监听的事件类型    
block       当监听到初始数据和初始数据发生变化时，这个 block 将被回调。 block 将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key   
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeSingleEventOfType:withBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block`

 说明

同 observeEventType:withBlock: 类似，不同之处在于  observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

 参数

eventType 监听的事件类型    
block     当监听到某事件时，回调 block


## – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的key值。

 参数

eventType 监听的事件类型    
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key


## – observeSingleEventOfType:withBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

同 observeSingleEventOfType:withBlock: 类似，如果你没有在这个节点读取数据的权限，cancelBlock 将会被回调。

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock


## – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType   监听的事件类型    
block       将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock


## – removeObserverWithHandle:

 定义

`- (void) removeObserverWithHandle:(WilddogHandle)handle`

 说明

取消监听事件。取消之前用 observeEventType:withBlock: 方法注册的监听事件。

 参数

handle 由 observeEventType:withBlock:返回的 WilddogHandle

 
## – removeAllObservers

 定义

`- (void) removeAllObservers`

 说明

取消之前由 observeEventType:withBlock:方法注册的监听事件。

## – onDisconnectSetValue:

 定义

`- (void) onDisconnectSetValue:(id)value`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。  
onDisconnectSetValue: 方法对实现在线系统是很有用的，这个在线系统可理解为：当用户失去连接时，一个数值被改变或者被清除，在别人的角度看，他的状态会显示“离线”。

 参数

value 断开连接后要设置的值

## – onDisconnectSetValue:withCompletionBlock:

 定义

`- (void) onDisconnectSetValue:(id)value withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值。

 参数

value 断开连接后要设置的值    
block 当设置值的操作成功排队到 Wilddog 服务器上，这个 block 就会被触发

## – onDisconnectSetValue:andPriority:

 定义

`- (void) onDisconnectSetValue:(id)value andPriority:(id)priority`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。  

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

 参数

value 断开连接后要设置的值  
priority 断开连接后要设置的优先级

## – onDisconnectSetValue:andPriority:withCompletionBlock:

 定义

`- (void) onDisconnectSetValue:(id)value andPriority:(id)priority withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被设置成我们未离线前设定的值和优先级。

 参数

value 连接断开后要设置的值  
priority 连接断开后要设置的优先级  
block 当设置值的操作成功排队到Wilddog服务器上，这个 block 就会被触发

## – onDisconnectRemoveValue

 定义

`- (void) onDisconnectRemoveValue`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValue 对实施在线系统很有用

## – onDisconnectRemoveValueWithCompletionBlock:

 定义

`- (void) onDisconnectRemoveValueWithCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭 app，导航一个新的页面，或者网络出现问题）时，确保在该节点的数据被删除。onDisconnectRemoveValueWithCompletionBlock: 对实施在线系统很有用

 参数

block 当删除值的操作成功排队到 Wilddog 服务器上，这个 block 就会被触发

## – onDisconnectUpdateChildValues:

 定义

`- (void) onDisconnectUpdateChildValues:(NSDictionary *)values`

 说明

离线操作的含义是客户端的推送的数据并非立刻生效,而是当客户端离线的时候才生效。    

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

 参数

values 在连接断开之后，一个包含子节点键和值的字典

## – onDisconnectUpdateChildValues:withCompletionBlock:

 定义

`- (void) onDisconnectUpdateChildValues:(NSDictionary *)values withCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

当客户端失去连接（因为关闭浏览器，导航一个新的页面，或者网络出现问题）时，确保拥有子节点的数据被更新。

 参数

values 在连接断开之后，一个包含子节点键和值的字典  
block 当更新值的操作成功排队到 Wilddog 服务器上，这个 block 就会被触发

## – cancelDisconnectOperations

 定义

`- (void) cancelDisconnectOperations`

 说明

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue:, 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

##– cancelDisconnectOperationsWithCompletionBlock:

 定义

`- (void) cancelDisconnectOperationsWithCompletionBlock:(void (^)(NSError* error, Wilddog* ref))block`

 说明

取消运行在离线状态设置的所有操作。  
如果你之前调用了 onDisconnectSetValue:,onDisconnectRemoveValue:, 或者 onDisconnectUpdateChildValues: 方法, 并且当连接断开时，不想再更新数值，这时候就调用 cancelDisconnectOperations:方法。

 参数

block 当 Wilddog 服务器接受到 cancel 请求，触发的 block


## + goOffline

 定义

`+ (void) goOffline`

 说明

手动建立连接，开启自动重连。


## + goOnline

 定义

`+ (void) goOnline`

 说明

手动断开连接，关闭自动重连。


## – runTransactionBlock:

 定义

`- (void) runTransactionBlock:(WTransactionResult* (^) (WMutableData* currentData))block`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WTransactionResult 中。
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WTransactionResult abort] 可以取消这次操作。事例:
 
```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://<your-appid>.wilddogio.com"];
[[ref childByAppendingPath:@"followNumber"] runTransactionBlock:^WTransactionResult *(WMutableData *currentData)  {
NSNumber *value = currentData.value;
if (currentData.value == nil) {
    value = @1;
}else{
    [currentData setValue:[NSNumber numberWithInt:(1 + [value intValue])]];
}
return [WTransactionResult successWithValue:currentData];
}]; 

```

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WTransactionResult对象

## – runTransactionBlock:andCompletionBlock:

 定义

`- (void) runTransactionBlock:(WTransactionResult* (^) (WMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDataSnapshot* snapshot))completionBlock`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WTransactionResult 中。
  
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WTransactionResult abort] 可以取消这次操作。 

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WTransactionResult对象    
completionBlock 当事务完成时这个块将被触发，无论成功与否

## – runTransactionBlock:andCompletionBlock:withLocalEvents:

 定义

`- (void) runTransactionBlock:(WTransactionResult* (^) (WMutableData* currentData))block andCompletionBlock:(void (^) (NSError* error, BOOL committed, WDataSnapshot* snapshot))completionBlock withLocalEvents:(BOOL)localEvents`

 说明

更新当前路径下的数据。服务器数据将会在 block 中返回，我们所要做的就是在 block 中把数据改成你要想要的，然后返回到 WTransactionResult 中。 
 
如果这个节点数据发送到服务器上时已经被其他人修改过，那么这个 block 将会获取服务器最新数据再次执行。
 
 调用 [WTransactionResult abort] 可以取消这次操作。

 参数

block 块(block)接收的当前数据(currentData)，然后返回一个WTransactionResult对象    
completionBlock 当事务完成时这个块将被触发，无论成功与否  
localEvents  将其设置为 NO 来阻止触发中间状态的事件，只触发最终状态事件


## – description

 定义

`- (NSString *) description`

 说明

获取当前 Wilddog 数据库节点的绝对 URL。

 返回值

当前 Wilddog 数据库节点的绝对 URL


## + setLoggingEnabled:

 定义

`+ (void) setLoggingEnabled:(BOOL)enabled`

 说明

打印程序相关信息。

 参数

enabled 设为 YES 为打印。默认为 NO，不打印


## + sdkVersion

 定义

`+ (NSString *) sdkVersion`

 说明

返回 Wilddog SDK 版本号。

 返回值

Wilddog SDK 版本号

## + defaultConfig

 定义

`+ (WConfig *)defaultConfig`

 说明

返回默认的配置对象，用于配置客户端。

 返回值

默认的配置对象


## + setDispatchQueue:

 定义

`+ (void)setDispatchQueue:(dispatch_queue_t)queue`

 说明

为事件 blocks 设置默认队列。

 参数

queue 给所有的 Wilddog 事件类型设置的默认队列


## parent

 定义

`@property (strong, readonly, nonatomic) Wilddog *parent`

 说明

获取父节点的引用。如果当前节点就是 root 节点，方法执行后返回的依然是 root 节点的引用。


## root

 定义

`@property (strong, readonly, nonatomic) Wilddog *root`

 说明

获得 Wilddog 根结点的引用。


## key

 定义

`@property (strong, readonly, nonatomic) NSString *key`

 说明

获得当前路径下节点的名称。


## app

 定义

`@property (strong, readonly, nonatomic) WilddogApp *app`

 说明

根据引用获得 WilddogApp 实例。


# WDataSnapshot (*Methods*)

## – childSnapshotForPath:
 定义

`- (WDataSnapshot *) childSnapshotForPath:(NSString *)childPathString`

 说明

根据指定的相对路径，来获取当前节点下的 WDataSnapshot。

childPathString 为相对路径  
相对路径可以是一个简单的节点名字（例如，‘fred’）  
也可以是一个更深的路径，（例如，'fred/name/first'）多层级间需要使用"/"分隔  
如果节点的位置没有数据，则返回一个空的 WDataSnapshot

 参数

childPathString 节点数据的相对路径

 返回值

指定节点位置的 WDataSnapshot


## – hasChild:

 定义

`- (BOOL) hasChild:(NSString *)childPathString`

 说明

如果指定路径下存在子节点，返回 YES。

 参数

childPathString 相对路径

 返回值

如果指定路径下存在子节点，返回 YES，否则返回 NO


## – hasChildren

 定义

`- (BOOL) hasChildren`

 说明

如果这个 Datasnapshot 有任何子节点返回 YES，否则 NO。

 返回值

如果这个 Datasnapshot 有任何子节点返回 YES



## – exists

 定义

`- (BOOL)exists`

 说明

如果 DataSnapshot中包含非空数据，返回 YES。

 返回值

如果 DataSnapshot 包含一个非空数据，就返回 YES 


## – valueInExportFormat

 定义

`- (id) valueInExportFormat`

 说明

返回该节点的原始数据


## value

 定义

`@property (strong, readonly, nonatomic) id value`

 说明

从 snapshot 中获得当前节点的数据。

返回的数据类型有:NSDictionary、NSArray、NSNumber (包含 Bool 类型)、NSString

## childrenCount

 定义

`@property (readonly, nonatomic) NSUInteger childrenCount`

 说明

获得 DataSnapshot 的子节点的总数。


## ref

 定义

`@property (nonatomic, readonly, strong) Wilddog* ref`

 说明

从 DataSnapshot 中，获得当前节点的引用。


## key

 定义

`@property (strong, readonly, nonatomic) NSString* key`

 说明

从 DataSnapshot 中，获取当前节点的名称。


## children

 定义

`@property (strong, readonly, nonatomic) NSEnumerator* children`

 说明

获取当前 DataSnapshot 中，所有子节点的迭代器。

```
for (WDataSnapshot* child in snapshot.children) {  
     ...  
}

```

## priority

 定义

`@property (strong, readonly, nonatomic) id priority`

 说明

获取该 WDataSnapshot 对象的优先级。

 返回值

优先级是一个字符串，若没有设置优先级，则返回 nil


# WConfig (*Methods*)

## persistenceEnabled

 定义

`@property (nonatomic) BOOL persistenceEnabled`

 说明

默认情况下，在你的应用程序正在运行时，Wilddog 客户端会将数据保存在内存中，当应用被重新启动时数据就没有了。把这个值设置为 YES 时，数据将被保存到设备，并且当应用程序重新启动时（即使在重新启动程序时没有网络连接），这些存储的数据也是可以用的。请注意，此属性必须在创建第一个Wilddog 引用之前设置，并且每次启用应用程序只需要调用一次即可。  
  
如果你的应用使用了 Wilddog 认证，客户端将自动保存用户的身份验证 token ，即使没有启用数据持久化。但是，如果身份验证令牌在离线的时候过期，并且你打开了数据持久化，客户端将暂停写入操作，直到你成功地重新进行身份验证。这样做是因为防止写入的数据被发送给未经验证的用户和因安全规则的改变造成写入数据失败。


## persistenceCacheSizeBytes

 定义

`@property (nonatomic) NSUInteger persistenceCacheSizeBytes`

 说明

默认情况下，Wilddog 将占用最大10MB的磁盘空间去缓存数据。如果缓存大小超出此空间，Wilddog 将开始移除最近未使用的数据。如果你发现你的应用程序缓存太少或有过多的数据，调用此方法来更改缓存空间的大小。此属性必须在创建第一个Wilddog 引用之前设置，并且每次启用应用程序只需要调用一次即可。 
   
请注意，指定缓存大小只是一个近似值，并在磁盘上的大小有时候可能会暂时超过它。


## callbackQueue

 定义

`@property (nonatomic, strong) dispatch_queue_t callbackQueue`

 说明

设置所有被触发事件的队列。默认队列为主队列。


# WQuery (*Methods*)

## – observeEventType:withBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog 服务器读取数据的主要方式  
在任何时刻，只要被监听的数据发生变化，这个 block 就会被触发。

可以用 removeObserverWithHandle: 方法停止监听数据的变化。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:andPreviousSiblingKeyWithBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。  
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。

 参数

eventType 监听的事件类型  
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:withBlock:withCancelBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:withBlock: 用于监听一个指定节点的数据变化
这是从 Wilddog 服务器读取数据的主要方式  
如果你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeEventType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

observeEventType:andPreviousSiblingKeyWithBlock: 用于监听在特定节点处的数据的变化。  
这是从 Wilddog 数据库读取数据的主要方法。block 当监听到初始数据和初始数据有改变时触发。 此外， 对于 WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。
  
由于你没有读取权限，就接受不到新的事件，这时 cancelBlock 就会被调用。 
  
用 removeObserverWithHandle: 方法去停止接受数据更新的监听。  

 参数

eventType   监听的事件类型    
block       当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key     
cancelBlock 如果客户端没有权限去接受这些事件，这个 block 将会被调用

 返回值

一个 WilddogHandle，用于调用函数 removeObserverWithHandle: 去注销这个 block


## – observeSingleEventOfType:withBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block`

 说明

同 observeEventType:withBlock: 类似，不同之处在于 observeSingleEventOfType:withBlock: 中的回调函数只被执行一次。

 参数

eventType 监听的事件类型    
block     当监听到某事件时，回调 block  


## – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType 监听的事件类型    
block     当监听到初始数据和初始数据发生变化时，这个 block 将被回调。block 将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key


## – observeSingleEventOfType:withBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

同 observeSingleEventOfType:withBlock:类似，如果你没有在这个节点读取数据的权限，cancelBlock 将会被回调。

 参数

eventType   监听的事件类型    
block       当监听到某事件时，回调 block    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock  


## – observeSingleEventOfType:andPreviousSiblingKeyWithBlock:withCancelBlock:

 定义

`- (void) observeSingleEventOfType:(WEventType)eventType andPreviousSiblingKeyWithBlock:(void (^)(WDataSnapshot* snapshot, NSString* prevKey))block withCancelBlock:(void (^)(NSError* error))cancelBlock`

 说明

这个方法和 observeEventType:withBlock: 方法类似。不同之处是：在初始数据返回后，这个 block 回调一次就被取消监听。 此外， 对于  WEventTypeChildAdded, WEventTypeChildMoved, 和 WEventTypeChildChanged 事件, block 通过 priority 排序将传输前一节点的 key 值。

 参数

eventType   监听的事件类型    
block       将传输一个 WDataSnapshot 类型的数据和前一个子节点的 key    
cancelBlock 如果您没有权限访问此数据，将调用该 cancelBlock  


## – removeObserverWithHandle:

 定义

`- (WilddogHandle) observeEventType:(WEventType)eventType withBlock:(void (^)(WDataSnapshot* snapshot))block`

 说明

取消监听事件。取消之前用 observeEventType:withBlock:注册的回调函数。

 参数

eventType 监听的事件类型  
block     当监听到某事件时，回调 block

 返回值

handle 由 observeEventType:withBlock:返回的 WilddogHandle


## – removeAllObservers

 定义

`- (void) removeAllObservers`

 说明

取消之前由 observeEventType:withBlock:注册的所有的监听事件。


## – keepSynced:

 定义

`- (void) keepSynced:(BOOL)keepSynced`

 说明

在某一节点处通过调用`keepSynced:YES`方法，即使该节点处没有设置监听者，此节点处的数据也将自动下载存储并保持同步。

 参数

keepSynced 参数设置为 YES，则在此节点处同步数据，设置为 NO，停止同步


## – queryLimitedToFirst:

 定义

`- (WQuery *) queryLimitedToFirst:(NSUInteger)limit`

 说明

queryLimitedToFirst: 用于创建一个新 WQuery 引用，获取从第一条开始的指定数量的数据。    
返回的 WQuery 查询器类将响应从第一个开始，到最多指定(limit)节点个数的数据。

 参数

limit 这次查询能够获取的子节点的最大数量

 返回值

返回一个 WQuery 查询器类，最多指定(limit)个数的数据


## – queryLimitedToLast:

 定义

`- (WQuery *) queryLimitedToLast:(NSUInteger)limit`

 说明

queryLimitedToLast: 用于创建一个新 WQuery 引用，获取从最后一条开始向前指定数量的数据。  
将返回从最后一个开始，最多指定(limit)个数的数据。

 参数

limit 这次查询能够获取的子节点的最大数量

 返回值

返回一个 WQuery 查询器类，最多指定(limit)个数的数据


## – queryOrderedByChild:

 定义

`- (WQuery *) queryOrderedByChild:(NSString *)key`

 说明

queryOrderedByChild: 用于产生一个新 WQuery 引用，是按照特定子节点的值进行排序的。   
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 参数

key 指定用来排序的子节点的 key

 返回值

返回一个按指定的子节点 key 排序生成的 WQuery 查询器类


## – queryOrderedByKey

 定义

`- (WQuery *) queryOrderedByKey`

 说明

queryOrderedByKey 用于产生一个新 WQuery 引用，是按照特定子节点的 key 进行排序的。  
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

返回一个按指定的子节点 key 排序生成的 WQuery 查询器类


## – queryOrderedByValue

 定义

`- (WQuery *) queryOrderedByValue`

 说明

queryOrderedByValue 用于产生一个新 WQuery 引用，是按照当前节点的值进行排序的。  
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

handle 由 observeEventType:withBlock:返回的 WilddogHandle


## – queryOrderedByPriority

 定义

`- (WQuery *) queryOrderedByPriority`

 说明

queryOrderedByPriority 用于产生一个新 WQuery 引用，是按照当前节点的优先级排序的。     
此方法要与 queryStartingAtValue:, queryEndingAtValue: 或 queryEqualToValue: 方法联合使用。

 返回值

handle 由observeEventType:withBlock:返回的 WilddogHandle


## – queryStartingAtValue:

 定义

`- (WQuery *) queryStartingAtValue:(id)startValue`

 说明

queryStartingAtValue: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值均大于或等于 startValue。

 参数

startValue query 查询到的值均大于等于 startValue

 返回值

返回一个 WQuery 查询器类，用于响应在数据值大于或等于 startValue 的节点事件


## – queryStartingAtValue:childKey:

 定义

`- (WQuery *) queryStartingAtValue:(id)startValue childKey:(NSString *)childKey`

 说明

queryStartingAtValue:childKey: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值大于 startValue，或者等于 startValue 并且 key 大于等于 childKey。

 参数

startValue query查询到的值均大于等于 startValue
childKey query查询到的 key 均大于等于 childKey

 返回值

返回一个 WQuery 查询器类，用于响应在数据值大于 startValue，或等于 startValue 的值并且 key 大于或等于 childKey 的节点事件


## – queryEndingAtValue:

 定义

`- (WQuery *) queryEndingAtValue:(id)endValue`

 说明

queryEndingAtValue: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值均小于或者等于 endValue。

 参数

endValue query查询到的值均小于等于 endValue  

 返回值

返回一个 WQuery 查询器类，用于响应在数据值均小于或等于 endValue 的节点事件


## – queryEndingAtValue:childKey:

 定义

`- (WQuery *) queryEndingAtValue:(id)endValue childKey:(NSString *)childKey`

 说明

queryEndingAtValue:childKey: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值小于 endValue，或者等于 endValue 并且 key 小于等于 childKey。

 参数

endValue query查询到的值均小于等于 endValue  
childKey query查询到的 key 均小于等于 childKey

 返回值

返回一个 WQuery 查询器类，用于响应在查询到的数据值小于 endValue，或者数据值等于 endValue 并且 key 小于等于 childKey 的节点事件


## – queryEqualToValue:

 定义

`- (WQuery *) queryEqualToValue:(id)value`

 说明

queryEqualToValue: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值都等于 value。

 参数

value query查询到的值都等于 value  

 返回值

返回一个 WQuery 查询器类，用于响应与 value 相等数值的节点事件


## – queryEqualToValue:childKey:

 定义

`- (WQuery *) queryEqualToValue:(id)value childKey:(NSString *)childKey`

 说明

queryEqualToValue:childKey: 用于返回一个 WQuery 引用，这个引用用来监测数据的变化，这些被监测的数据的值等于 value 并且 key 等于 childKey。返回的值肯定是唯一的，因为 key 是唯一的。

 参数

value query查询到的值都等于 value  
childKey  query查询到的 key 都等于 childKey 

 返回值

返回一个 WQuery 查询器类，用于响应这个与之相等数值和 key 节点事件


## ref

 定义

`@property (nonatomic, readonly, strong) Wilddog* ref`

 说明

获取这个查询的 Wilddog 引用。


# WMutableData (*Methods*)

## – hasChildren

 定义

`- (BOOL) hasChildren`

 说明

判断在当前 WMutableData 中，是否存在子节点。

 返回值

YES 为存在子节点，NO 为不存在


## – hasChildAtPath:

 定义

`- (BOOL) hasChildAtPath:(NSString *)path`

 说明

检查指定路径下是否存在子节点。

 参数

path 可以是类似'child'的单层级路径，也可以是类似'a/deeper/child'多层级路径

 返回值

如果在指定的相对路径下，该 WMutableData 包含子节点，则返回YES


## – childDataByAppendingPath:

 定义

`- (WMutableData *) childDataByAppendingPath:(NSString *)path`

 说明

用于获得一个在给定的相对路径下的 WMutableData 数据实例。

 参数

path 可以是类似'child'的单层级路径，也可以是类似'a/deeper/child'多层级路径

 返回值

指定路径下的 WMutableData 实例


## value

 定义

`@property (strong, nonatomic) id value`

 说明

修改 WMutableData 实例中的数据，value 可将其设置为 Wilddog 支持的任一原生数据类型：  
 NSNumber (includes BOOL)  
 NSDictionary  
 NSArray  
 NSString  
 nil / NSNull (设置 nil / NSNull 删除该数据)  
注意修改这个 value，会覆盖这个节点的优先级  

 返回值

获得当前节点的数据


## priority

 定义

`@property (strong, nonatomic) id priority`

 说明

设置这个属性可以更新该节点下面的数据优先级，可以设置的值类型有：  
* NSNumber  
* NSString  
* nil / NSNull (设置 nil / NSNull 删除该数据)   

 返回值

获得当前节点的优先级


## childrenCount

 定义

`@property (readonly, nonatomic) NSUInteger childrenCount`

 返回值

获得子节点的总数


## children

 定义

`@property (readonly, nonatomic, strong) NSEnumerator* children`

 说明

用于迭代该节点的子节点，可以用下面的这个方法：

```  
for (WMutableData* child in data.children) {  
    ...  
}  

```

 返回值

获取当前节点下所有子节点的 WMutabledata 实例的迭代器


## key

 定义

`@property (readonly, nonatomic, strong) NSString* key`

 返回值

获取当前节点的 key，最上层的节点的 key 是 nil


# WTransactionResult (*Methods*)


## + successWithValue:

 定义

`+ (WTransactionResult *) successWithValue:(WMutableData *)value`

 说明

用于 runTransactionBlock: 方法中。 表明传入参数 value 应保存在这个节点处。

 返回值

返回一个 WTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值


## + abort

 定义

`+ (WTransactionResult *) abort`

 说明

用于 runTransactionBlock: 方法中。 使用该方法可以主动终止当前事务。

 返回值

返回一个 WTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值


# WilddogApp (*Methods*)


## – goOffline

 定义

`- (void)goOffline`

 说明

断开与 Wilddog 服务器的连接


## – goOnline

 定义

`- (void)goOnline`

 说明

恢复与 Wilddog 服务器的连接




