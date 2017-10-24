title: 发布和订阅
---

使用发布／订阅 API 能够实现向 Room 发布媒体流／取消发布／订阅媒体流／停止订阅等操作。

> 注意：只有在 `-[WDGRoomDelegate wilddogRoomDidConnected:]` 事件被触发后才能调用发布／订阅相关的 API 。


## 发布本地媒体流

使用 `-[WDGRoom publishLocalStream:withCompletionBlock:`] 方法向 Room 发布本地媒体流，本地媒体流的创建与配置参考 [媒体流](/conference/iOS/guide/2-mediaStream.html)。

```objectivec
[self.room publishLocalStream:self.localStream withCompletionBlock:^(NSError *error) {
    // 发布完成后执行该 Block
}];
```

发布成功后会触发其他客户端的 `-[WDGRoomDelegate wilddogRoom:didStreamAdded:]` 事件。


## 取消发布

使用 `-[WDGRoom unpublishLocalStream:withCompletionBlock:]` 方法取消发布本地媒体流。

```objectivec
[self.room unpublishLocalStream:self.localStream withCompletionBlock:^(NSError *error) {
    // 取消发布完成后执行该 Block
}];
```

取消成功后会触发其他客户端的 `-[WDGRoomDelegate wilddogRoom:didStreamRemoved:]` 事件。


## 订阅远端媒体流

在新加入一个多人视频通话，或者多人视频通话进行中有其他用户加入时，[WDGRoom](/conference/iOS/api/WDGRoom.html) 的代理会通过 `-[WDGRoomDelegate wilddogRoom:didStreamAdded:]` 回调方法来通知客户端有远端媒体流可以订阅：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamAdded:(WDGRoomStream *)roomStream {
    // 获取该视频流信息，决定是否订阅
}

> 注意：`-[WDGRoomDelegate wilddogRoom:didStreamAdded:]` 回调会被触发多次，每次只返回一个远端媒体流。

此时的远端媒体流只包含了描述信息，要想获取和预览该远端流的媒体信息，必须订阅该媒体流。使用 `-[WDGRoom subscribeRoomStream:withCompletionBlock:]` 方法订阅某个远端媒体流：

```objectivec
[self.room subscribeRoomStream:roomStream withCompletionBlock:^(NSError * _Nullable error) {
    // 在订阅完成后执行该 Block
}];
```

订阅成功后，[WDGRoom](/conference/iOS/api/WDGRoom.html) 的代理会通过 `-[WDGRoomDelegate wilddogRoom:didStreamReceived:]` 回调方法来将媒体信息发送给客户端，客户端此时可以预览该媒体流：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamReceived:(WDGRoomStream *)roomStream {
    // 展示收到的媒体流
}
```


## 取消订阅

使用 `-[WDGRoom unsubscribeRoomStream:withCompletionBlock:]` 方法取消订阅远端媒体流。

```objectivec
[self.room unsubscribeRoomStream:roomStream withCompletionBlock:^(NSError * _Nullable error) {
    // 完成后执行该 Block
}];
```

