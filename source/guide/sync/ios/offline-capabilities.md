
title:  离线功能
---
本篇文档介绍离线功能的相关特性和具体实现。

离线功能让应用在无网环境下仍可以操作数据。它包括数据持久化、离线事件、监控连接状态等特性。

## 监听连接状态

Sync 提供了一个保留路径：`/.info/connected`，用于存储客户端与云端的连接状态。监听这个[路径](/guide/reference/term.html#路径-path)，客户端可以监测是否连接到云端。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
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
</div>
<div class="slide-content">
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
</div>
</div>

>**注意：** `/.info/connected` 的值是 BOOL 类型。

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

例如，当用户的网络连接中断时，使用 `onDisconnectSetValue` 方法，记录这个用户已经离线

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *presenceRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/disconnectmessage"];
// 当客户端连接中断时，写入一个字符串
[presenceRef onDisconnectSetValue:@"I disconnected!"];
```
</div>
<div class="slide-content">
```swift
presenceRef.onDisconnectRemoveValueWithCompletionBlock({ error, ref in
    if error != nil {
        print("Could not establish onDisconnect event: \(error)")
    }
})
```
</div>
</div>

通过回调方法判断离线事件是否被云端成功记录

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[presenceRef onDisconnectRemoveValueWithCompletionBlock:^(NSError* error, WDGSyncReference* ref) {
    if (error != nil) {
        NSLog(@"Could not establish onDisconnect event: %@", error);
    }
}];

```
</div>
<div class="slide-content">
```swift
presenceRef.onDisconnectRemoveValueWithCompletionBlock({ error, ref in
    if error != nil {
        print("Could not establish onDisconnect event: \(error)")
    }
})
```
</div>
</div>

`cancelDisconnectOperations` 方法用于取消离线事件

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[presenceRef onDisconnectSetValue:@"I disconnected"];
// 取消离线事件
[presenceRef cancelDisconnectOperations];
```
</div>
<div class="slide-content">
```swift
presenceRef.onDisconnectSetValue("I disconnected")
// 取消离线事件
presenceRef.cancelDisconnectOperations()

```
</div>
</div>

更多离线事件的方法，请参考 [API 文档](/api/sync/ios/api.html#–-onDisconnectSetValue)。

## 手动建立或断开连接
Wilddog Sync 提供手动建立或者断开连接的方法，分别为 `goOnline`方法、`goOffline`方法，如下

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *ref = [[WDGSync sync] reference];
[ref goOnline];
```
</div>
<div class="slide-content">
```swift
let ref = WDGSync.sync().reference
ref.goOnline()
```
</div>
</div>

>**注意：**一个应用可以创建多个 Wilddog  Sync 实例，但多个实例只会复用同一个长连接。 并且 `goOffline`方法 和 `goOnline`方法会控制全局的在线和离线。 


## 数据本地持久化

数据本地持久化是针对移动网络稳定性差而开发的功能特性。默认情况下，Wilddog Sync 的数据存储在内存中，一旦重启，内存数据将被清除。开启数据本地持久化功能，可以使设备重启后无需再同步云端。有助于节省流量和提升重启后的访问速度。

数据持久化包含以下三个特性

| 特性     | 说明                                       |
| ------ | ---------------------------------------- |
| 离线查询   | 在无网环境时仍然可以查询数据。                          |
| 发送离线数据 | 在无网环境时操作的数据会在重新连接时发送。                    |
| 提前同步   | 在查询数据前自动同步指定[节点](/guide/reference/term.html#节点)下的数据。 |



使用  `setPersistenceEnabled` 方法开启数据持久化

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[WDGSync sync].persistenceEnabled = YES;
```
</div>
<div class="slide-content">
```swift
WDGSync.sync().persistenceEnabled = true
```
</div>
</div>

>**注意：** 必须在创建第一个 Wilddog Sync 实例之前开启持久化。 



### 离线查询

开启数据持久化，Wilddog Sync 会将查询到的数据存储到设备。在无网环境时，应用仍然可以查询之前存储的数据。

例如，有网络时，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com/) 中查询得分最高的四条恐龙

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[[[scoresRef queryOrderedByValue] queryLimitedToLast:4]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];
```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().queryLimitedToLast(4).observeEventType(.ChildAdded, withBlock: { snapshot in
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})
```
</div>
</div>

然后网络断开，重新启动应用去查询得分最高的两条恐龙

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[[scoresRef queryOrderedByValue] queryLimitedToLast:2]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];
```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().queryLimitedToLast(4).observeEventType(.ChildAdded, withBlock: { snapshot in
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})
```
</div>
</div>

如上例所示，在离线情况下，仍然成功的查询到了数据。



### 发送离线数据

开启数据持久化，在无网环境下，应用的所有数据操作都会自动保存，当应用重新连接网络，这些数据将自动发送到云端。

### 提前同步

Wilddog Sync 可以在查询数据前同步指定节点下的数据，并将数据存储到设备中，以此提升访问速度。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com/scores) 中提前同步 `scores` 节点下的数据

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[scoresRef keepSynced:YES];
```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.keepSynced(true)
```
</div>
</div>


