
title:  离线功能
---
本篇文档介绍离线功能的相关特性和具体实现。它是 Sync 应对复杂网络的一种机制，包括数据持久化、离线事件、监控连接状态和离线时间等功能。

## 数据持久化

数据持久化会在每个设备上维护一个数据副本。当数据被更改时，优先对本地数据进行操作，再同步到云端。它具有以下特性：

| 特性     | 说明                      |
| ------ | ----------------------- |
| 离线查询   | 应用在无网环境时依然可以查询数据。       |
| 发送离线数据 | 应用在无网情况下操作的数据会在重新连接时发送。 |
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

**注意**：必须在创建第一个 Sync 实例之前开启持久化。 



### 离线查询

开启数据持久化，Sync 会将查询到的数据存储到设备。在无网环境时，应用仍然可以查询之前存储的数据。

例如，有网络时，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com/) 中查询得分最高的四条恐龙。

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

然后网络断开，重新启动应用去查询得分最高的两条恐龙。

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



### 发送离线数据

当打开数据持久化功能，在无网环境下，客户端的所有数据操作都会自动保存，即使重启应用，这些数据操作依然有效，当客户端重新连接网络，这些数据将重新发送到云端。

### 提前同步

Sync 可以在查询数据前同步指定节点下的数据，并将数据存储到设备中，以此提升访问速度。

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

Sync 提供了一个保留路径：`/.info/connected`，用于存储客户端与云端的连接状态。监听这个路径，客户端可以感知是否连接到服务器。

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
**注意：** `/.info/connected` 的值是 BOOL 类型。

## 离线事件

云端监听到客户端断开连接后会自动触发事件，称为离线事件。例如，当用户的网络连接中断时，云端自动标记这个用户为“离线”状态。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持 `setValue: `，`updateValues:`，`removeValue:` 方法。

使用 `onDisconnectSetValue` 方法，设置离线事件

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

通过回调方法判断离线事件是否被云端成功记录

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

## 处理时间延迟

### 云端时间戳

Sync 提供了 [云端时间戳](/api/sync/ios/api.html#+timestamp) 机制，它可以将云端时间写入到指定节点。结合离线事件的方法，很容易记录客户端的离线时间。

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

时钟偏差是本地时间和云端时间的差值，保存在 ` /.info/serverTimeOffset` 节点下。

例如，利用时钟偏差获取服务端的时间

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
Sync 也提供手动建立或者断开连接的方法，分别为 `goOnline`方法、`goOffline`方法，如下：

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

**注意**：一个客户端可以创建多个 Sync 实例，但多个实例不会创建多个连接，会复用同一个长连接。 并且 `goOffline`方法 和 `goOnline`方法会控制全局的在线和离线。 



