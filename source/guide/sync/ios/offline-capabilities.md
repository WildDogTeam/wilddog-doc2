title:  离线功能
---
本篇文档介绍离线功能的实现。

Sync 会为每一个初始化后的客户端建立一个长连接。任何操作和通信都基于这个连接。

Sync 内部的实现机制使你的应用在弱网环境下仍能继续工作。此外，还能监听客户端的连接状态，以及设置离线事件。

## 数据持久化

Sync 会保存应用数据到设备中，来应对应用在没网或者弱网情况下数据读取。

### 持久化操作

默认情况下，在你的应用程序正在运行时，Sync 客户端会将数据保存在内存中，当重新启动应用时数据就没有了。这个值设置为 YES 时，Sync 会将数据保存到设备，并且当应用程序重新启动时（即使在重新启动程序时没有网络连接），这些存储的数据也是可以用的。

打开数据持久化：

Objective-C

```objectivec
[WDGSync sync].persistenceEnabled = YES;

```

Swift

```swift
WDGSync.sync().persistenceEnabled = true

```

**注意**：此属性必须在创建第一个 Sync 引用之前设置，并且每次启用应用程序只需要调用一次即可。 

### 同步最新数据

在没有设置监听的情况下，Sync 提供一种方法可以自动地同步某个节点下的数据，并且将同步的数据保存到设备中。
例如，自动同步 [恐龙实例应用](https://dinosaur-facts.wilddogio.com/scores) scores 节点下的数据

Objective-C

```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[scoresRef keepSynced:YES];

```

Swift

```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.keepSynced(true)

```

用下面方法关闭同步最新数据：

Objective-C

```objectivec
[scoresRef keepSynced:NO];

```

Swift

```swift
scoresRef.keepSynced(false)

```

### 查询离线数据

在离线情况下，设置查询条件，Sync 监听回调会返回本地存储的相应查询数据。

例如，有网络时，返回后四个恐龙的分数数据：

Objective-C

```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[[[scoresRef queryOrderedByValue] queryLimitedToLast:4]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];

```

Swift

```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().queryLimitedToLast(4).observeEventType(.ChildAdded, withBlock: { snapshot in
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})

```

假定，现在关了网络，重新启动应用去取最后两个恐龙的分数数据：

Objective-C

```objectivec
[[[scoresRef queryOrderedByValue] queryLimitedToLast:2]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];

```

Swift

```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().queryLimitedToLast(4).observeEventType(.ChildAdded, withBlock: { snapshot in
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})

```

正如上面的例子所示，在离线情况下，通过本地持久化，成功的取到了离线数据。

## 监控连接状态

Sync 客户端提供了一个特殊的路径：`/.info/connected`，用于存储客户端与云端的连接状态。连接状态发生改变时，都会更新这个路径的值。  

Objective-C

```objectivec
//初始化 WDGApp，同一个 appID 初始化一次即可 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://samplechat.wilddogio.com"];
[WDGApp configureWithOptions:option];

//创建一个指向根节点的 WDGSyncReference 实例
WDGSyncReference *connectedRef = [[WDGSync sync] referenceWithPath:@".info/connected"];

[connectedRef observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    if([snapshot.value boolValue]) {
        NSLog(@"connected");
    } else {
        NSLog(@"not connected");
    }
}];

```

Swift

```swift
//初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://samplechat.wilddogio.com")
WDGApp.configureWithOptions(options)

//创建一个指向根节点的 WDGSyncReference 实例
let connectedRef = WDGSync.sync().referenceWithPath(".info/connected")

connectedRef.observeEventType(.Value, withBlock: {snapshot in
    let connected = snapshot.value as? Bool
    if connected != nil && connected! {
        print("connected")
    } else {
        print("not connected")
    }
})

```
`/.info/connected` 的值是 BOOL 类型的，它不会和云端进行同步。

## 离线事件

云端监听到客户端断开连接后自动触发一些事件，称为离线事件。例如，当一个用户的网络连接中断时，自动标记这个用户为“离线”状态。

断开连接包括客户端主动断开连接，或者意外的网络中断，比如客户端应用崩溃等。触发事件可以理解为执行特定的数据操作。数据操作支持所有数据写入动作，包括 `set`，`update`，`remove`。

使用 `onDisconnectSetValue` 方法，设置离线事件：

Objective-C

```objectivec
//创建一个指向根节点的 WDGSyncReference 实例
WDGSyncReference *presenceRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/disconnectmessage"];
// 当客户端连接中断时，写入一个字符串
[presenceRef onDisconnectSetValue:@"I disconnected!"];

```

Swift

```swift
var presenceRef = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com/disconnectmessage")
// 当客户端连接中断时，写入一个字符串
presenceRef.onDisconnectSetValue("I disconnected!")

```

通过数据操作的回调方法，判断离线事件是否被云端成功记录：

Objective-C

```objectivec
[presenceRef onDisconnectRemoveValueWithCompletionBlock:^(NSError* error, Wilddog* ref) {
    if (error != nil) {
        NSLog(@"Could not establish onDisconnect event: %@", error);
    }
}];

```

Swift

```swift
presenceRef.onDisconnectRemoveValueWithCompletionBlock({ error, ref in
    if error != nil {
        print("Could not establish onDisconnect event: \(error)")
    }
})

```

使用`cancel`方法，取消离线事件：

Objective-C

```objectivec
[presenceRef onDisconnectSetValue:@"I disconnected"];
// 取消离线事件
[presenceRef cancelDisconnectOperations];

```

Swift

```swift
presenceRef.onDisconnectSetValue("I disconnected")
// 取消离线事件
presenceRef.cancelDisconnectOperations()

```

## 延迟处理

### 云端时间戳
Sync 提供了一个将 [云端时间戳](/api/sync/ios/api.html#+timestamp) 作为值写入节点的功能：

Objective-C

```objectivec
WDGSyncReference *userLastOnlineRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/users/joe/lastOnline"];
//存入当前云端时间戳
[userLastOnlineRef setValue:[WDGServerValue timestamp]];

```

Swift

```swift
var userLastOnlineRef = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com/users/joe/lastOnline")
//存入当前云端时间戳
userLastOnlineRef.setValue(WDGServerValue.timestamp())

```

### 时钟偏差
本地时间和云端的时间差保存在 /.info/serverTimeOffset 节点下，获取方法如下：

Objective-C

```objectivec
WDGSyncReference *offsetRef = [[WDGSync sync] referenceWithPath:@".info/serverTimeOffset"];
[offsetRef observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
  offset = [(NSNumber *)snapshot.value doubleValue];
  double estimatedServerTimeMs = [[NSDate date] timeIntervalSince1970] * 1000.0 + offset;
}];

```

Swift

```swift
let offsetRef = WDGSync.sync().referenceWithPath(".info/serverTimeOffset")
offsetRef.observeEventType(.Value, withBlock: { snapshot in
    if let offset = snapshot.value as? Double {
        let estimatedServerTimeMs = NSDate().timeIntervalSince1970 * 1000.0 + offset
    }
})

```

## 手动建立或断开连接
Sync 也提供了手动建立或者断开连接的方法，分别为 `goOnline`，`goOffline`，如下：

Objective-C

```objectivec
WDGSyncReference *ref = [[WDGSync sync] reference];
[ref goOnline];
```

Swift

```swift
let ref = WDGSync.sync().reference
ref.goOnline()
```

**注意**：一个客户端可以实例化多个 Sync 对象，但多个对象不会创建多个连接，会复用同一个长连接。 并且 `goOffline` 和 `goOnline` 会控制全局的在线和离线。 

## 离线功能的实现机制

客户端每隔 20s 给云端发一个心跳包，云端用此检测与客户端的连接是否正常。

一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，云端只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果设置的有）等。

另一方面，客户端在网络恢复正常后，会自动尝试与云端建连，一旦成功，之前设置的监听仍然有效。

