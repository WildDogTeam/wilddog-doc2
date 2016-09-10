title:  离线功能
---
Wilddog 内部的实现机制能使你的应用在弱网环境下仍能继续工作。此外，还能监听客户端的在线状态，以及设置离线事件。

## 监控连接状态

在许多应用场景下，客户端需要知道自己是否在线。Wilddog 客户端提供了一个特殊的数据地址：`/.info/connected`。每当客户端的连接状态发生改变时，这个地址的数据都会被更新。  
Objective-C

```objectivec
//初始化 WDGApp，同一个 appID 初始化一次即可 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<appID>.wilddogio.com"];
[WDGApp configureWithOptions:option];

//创建一个指向根节点的 WDGSyncReference 实例
WDGSyncReference *connectedRef = [[WDGSync sync] referenceFromURL:@"https://<appID>.wilddogio.com/.info/connected"];

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
let options = WDGOptions.init(syncURL: "https://<appID>.wilddogio.com")
WDGApp.configureWithOptions(options)

//创建一个指向根节点的 WDGSyncReference 实例
let connectedRef = WDGSync.sync().referenceFromURL("https://<appID>.wilddogio.com/.info/connected")

connectedRef.observeEventType(.Value, withBlock: {snapshot in
    let connected = snapshot.value as? Bool
    if connected != nil && connected! {
        print("connected")
    } else {
        print("not connected")
    }
})

```

## 离线事件

如果你想在监听到客户端断线后自动触发一些事件。例如，当一个用户的网络连接中断时，希望标记这个用户为“离线”状态。Wilddog 提供的离线事件功能可以实现这一需求。

离线事件能在云端检测到客户端连接断开时，将指定的数据写入云数据库中。不论是客户端主动断开，还是意外的网络中断，甚至是客户端应用崩溃，这些数据写入动作都将会被执行。因此我们可以依靠这个功能，在用户离线的时候，做一些数据清理工作。Wilddog 支持的所有数据写入动作，包括 `set`, `update`，`remove`都可以设置在离线事件中执行。

下面是一个例子，使用`onDisconnect`方法，在离线的时候写入数据：

Objective-C

```objectivec
//创建一个指向根节点的 WDGSyncReference 实例
WDGSyncReference *presenceRef = [[WDGSync sync] referenceFromURL:@"https://<appID>.wilddogio.com/disconnectmessage"];
// 当客户端连接中断时，写入一个字符串
[presenceRef onDisconnectSetValue:@"I disconnected!"];

```

Swift

```swift
var presenceRef = WDGSync.sync().referenceFromURL("https://<appID>.wilddogio.com/disconnectmessage")
// 当客户端连接中断时，写入一个字符串
presenceRef.onDisconnectSetValue("I disconnected!")

```


**离线事件是如何工作的**

当进行了一个`onDisconnect`调用之后，这个事件将会被记录在云端。云端会监控每一个客户端的连接。如果发生了超时，或者客户端主动断开连接，云端就触发记录的离线事件。

客户端可以通过回调方法，确保离线事件被云端成功记录了：

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

要取消一个离线事件，可以使用`cancel`方法：

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

## 云端时间戳
Wilddog 提供了一种将云端时间戳作为数据写入的机制。这个机制和 `onDisconnect` 方法组合起来，很容易实现记录客户端断线时间的功能：

Objective-C

```objectivec
WDGSyncReference *userLastOnlineRef = [[WDGSync sync] referenceFromURL:@"https://<appID>.wilddogio.com/users/joe/lastOnline"];
[userLastOnlineRef onDisconnectSetValue:[WDGServerValue timestamp]];

```

Swift

```swift
var userLastOnlineRef = WDGSync.sync().referenceFromURL("https://<appID>.wilddogio.com/users/joe/lastOnline")
userLastOnlineRef.onDisconnectSetValue(WDGServerValue.timestamp())

```

## 离线功能的实现机制

Wilddog 云端会每隔 20s 发一个心跳包给客户端，用于检测与客户端的连接是否正常。如果一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，服务端无法立即感知到客户端断开，只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果你之前设置了离线事件），重试连接等。
另外，重试连接连上之后，之前设置的监听仍然有效。







