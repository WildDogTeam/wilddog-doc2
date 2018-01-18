
title:  离线功能
---
本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。

## 监听连接状态

`/.info/connected` 是 Wilddog Sync 提供的一个保留路径，用于存储客户端与云端的连接状态。

例如，监测客户端是否连接到云端：
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
//初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<SyncAppID>.wilddogio.com"];
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
let options = WDGOptions.init(syncURL: "https://<SyncAppID>.wilddogio.com")
WDGApp.configure(with: options)

//创建一个 WDGSyncReference 实例
let connectedRef = WDGSync.sync().reference(withPath: ".info/connected")

connectedRef.observe(.value, with: {snapshot in
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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  `/.info/connected` 的值是 BOOL 类型。
</blockquote>

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

`onDisconnectSetValue` 方法用于在云端与客户端断开连接后执行数据操作。

例如，当用户的网络连接中断时，使用 `onDisconnectSetValue` 方法，记录这个用户已经离线：

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
let presenceRef = WDGSync.sync().reference(fromURL: "https://samplechat.wilddogio.com/disconnectmessage")
presenceRef.onDisconnectSetValue("I disconnected!")
```
</div>
</div>

通过回调方法判断离线事件是否被云端成功记录：

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
presenceRef.onDisconnectRemoveValue(completionBlock: { error, ref in
    if error != nil {
        print("Could not establish onDisconnect event: \(error)")
    }
})
```
</div>
</div>

`cancelDisconnectOperations` 方法用于取消离线事件：

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

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  通过该 <a href="/sync/iOS/guide/bestpractice/offline.html">最佳实践</a>，可以保证网络意外中断情况时，离线事件也能成功触发。
</blockquote>

更多离线事件的方法，请参考 [API 文档](/sync/iOS/api/WDGSyncReference.html#onDisconnectSetValue)。

## 手动建立或断开连接
`goOnline` 和 `goOffline` 方法用于手动建立连接和断开连接。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[WDGSyncReference goOnline];
```
</div>
<div class="slide-content">
```swift
WDGSyncReference.goOnline()
```
</div>
</div>
 
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  一个应用可以创建多个 Wilddog  Sync 实例，但多个实例只会复用同一个长连接。 并且 `goOffline`方法 和 `goOnline`方法会控制全局的在线和离线。 
</blockquote>


## 数据本地持久化

数据本地持久化是针对移动网络稳定性差而开发的功能特性。默认情况下，Wilddog Sync 的数据存储在内存中，一旦重启，内存数据将被清除。开启数据本地持久化功能，可以使设备重启后无需再同步云端。有助于节省流量和提升重启后的访问速度。

数据持久化包含以下三个特性：

| 特性     | 说明                                       |
| ------ | ---------------------------------------- |
| 离线查询   | 在无网环境时仍然可以查询数据。                          |
| 发送离线数据 | 在无网环境时操作的数据会在重新连接时发送。                    |
| 提前同步   | 在查询数据前自动同步指定[节点](/sync/iOS/guide/concept.html#Sync-的数据结构是什么？)下的数据。 |



`setPersistenceEnabled` 方法用于开启数据持久化：

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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  必须在创建第一个 Wilddog Sync 实例之前开启持久化。 
</blockquote>



### 离线查询

开启数据持久化，Wilddog Sync 会将查询到的数据存储到设备。在无网环境时，应用仍然可以查询之前存储的数据。

例如，有网络时，在 [班级示例应用](https://class-demo.wilddogio.com/) 中查询得分最高的四位学生：

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
    NSLog(@"The %@ student's score is %@", snapshot.key, snapshot.value);
}];
```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().reference(withPath: "scores")
scoresRef.queryOrderedByValue().queryLimited(toLast: 4).observe(.childAdded, with: { snapshot in
    print("The \(snapshot.key) student's score is \(snapshot.value)")
})
```
</div>
</div>

然后网络断开，重新启动应用去查询考分最高的两位学生：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[[[scoresRef queryOrderedByValue] queryLimitedToLast:2]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ student's score is %@", snapshot.key, snapshot.value);
}];
```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().reference(withPath: "scores")
scoresRef.queryOrderedByValue().queryLimited(toLast: 2).observe(.childAdded, with: { snapshot in
    print("The \(snapshot.key) student's score is \(snapshot.value)")
})
```
</div>
</div>

如上例所示，在离线情况下，仍然成功的查询到了数据。



### 发送离线数据

开启数据持久化，在无网环境下，应用的所有数据操作都会自动保存，当应用重新连接网络，这些数据将自动发送到云端。

### 提前同步

Wilddog Sync 可以在查询数据前同步指定节点下的数据，并将数据存储到设备中，以此提升访问速度。

例如，在 [班级示例应用](https://class-demo.wilddogio.com/scores) 中提前同步 `scores` 节点下的数据：

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
let scoresRef = WDGSync.sync().reference(withPath: "scores")
scoresRef.keepSynced(true)
```
</div>
</div>


