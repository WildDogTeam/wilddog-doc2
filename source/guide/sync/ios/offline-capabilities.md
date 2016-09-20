
title:  离线功能
---
本篇文档介绍离线功能的相关特性和具体实现。

离线功能让应用在无网环境下仍可以操作数据。它包括数据持久化、离线事件、监控连接状态等特性。

## 数据持久化

数据持久化是针对移动网络开发的功能特性，它在每个设备上维护一个数据副本，当数据被更改时，优先对本地数据进行操作，再同步到云端。即使设备在无网环境下，也可以操作数据。

数据持久化包含以下三个特性

| 特性     | 说明                      |
| ------ | ----------------------- |
| 离线查询   | 应用在无网环境时仍然可以查询数据。       |
| 发送离线数据 | 应用在无网环境时操作的数据会在重新连接时发送。 |
| 提前同步   | 应用在查询数据前自动同步指定节点下的数据。   |



使用  `setPersistenceEnabled` 方法开启数据持久化

Objective-C

```objectivec
[WDGSync sync].persistenceEnabled = YES;
```

Swift

```swift
WDGSync.sync().persistenceEnabled = true
```

**注意**：必须在创建第一个 Wilddog Sync 实例之前开启持久化。 



### 离线查询

开启数据持久化，Wilddog Sync 会将查询到的数据存储到设备。在无网环境时，应用仍然可以查询之前存储的数据。

例如，有网络时，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com/) 中查询得分最高的四条恐龙

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

然后网络断开，重新启动应用去查询得分最高的两条恐龙

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

如上例所示，在离线情况下，仍然成功的查询到了数据。



### 发送离线数据

开启数据持久化，在无网环境下，应用的所有数据操作都会自动保存，当应用重新连接网络，这些数据将自动发送到云端。

### 提前同步

Wilddog Sync 可以在查询数据前同步指定节点下的数据，并将数据存储到设备中，以此提升访问速度。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com/scores) 中提前同步 `scores` 节点下的数据

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



## 监听连接状态

Sync 提供了一个保留路径：`/.info/connected`，用于存储客户端与云端的连接状态。监听这个路径，客户端可以监测是否连接到云端。

Objective-C

```objectivec
//初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://samplechat.wilddogio.com"];
[WDGApp configureWithOptions:option];

//创建一个 WDGSyncReference 实例
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
//初始化 
let options = WDGOptions.init(syncURL: "https://samplechat.wilddogio.com")
WDGApp.configureWithOptions(options)

//创建一个 WDGSyncReference 实例
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
**注意：** `/.info/connected` 的值是 BOOL 类型。

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

例如，当用户的网络连接中断时，使用 `onDisconnectSetValue` 方法，记录这个用户已经离线

Objective-C

```objectivec
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

通过回调方法判断离线事件是否被云端成功记录

Objective-C

```objectivec
[presenceRef onDisconnectRemoveValueWithCompletionBlock:^(NSError* error, WDGSyncReference* ref) {
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

`cancel` 方法用于取消离线事件

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

更多离线事件的方法，请参考 [API 文档](/api/sync/ios/api.html#–-onDisconnectSetValue)。

## 手动建立或断开连接
Wilddog Sync 提供手动建立或者断开连接的方法，分别为 `goOnline`方法、`goOffline`方法，如下

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

**注意**：一个应用可以创建多个 Wilddog  Sync 实例，但多个实例只会复用同一个长连接。 并且 `goOffline`方法 和 `goOnline`方法会控制全局的在线和离线。 



