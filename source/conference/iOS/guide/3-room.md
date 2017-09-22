title: 管理视频会议
---

本篇文档介绍如何创建或加入视频会议。

Room 表示一个多人的视频会议。多个用户可以加入同一个 Room 进行音视频通话。


## 加入 Room

加入 Room 前需要使用唯一的 roomId 创建 [`WDGRoom`](/conference/iOS/api/WDGRoom.html) 对象实例，并使用 `-[WDGRoom connect]` 方法加入 Room。
成功加入到 Room 后可以使用 `-[WDGRoom publishLocalstream:]` 或 `-[WDGRoom subscribeRoomStream:]` 方法发布或订阅媒体流。

```objectivec
WDGRoom *room = [[WDGRoom alloc] initWithRoomId:@"your-roomId"];
[room connect];
```

## 离开 Room

使用 `-[WDGRoom disconnect]` 方法离开当前 Room。离开 Room 后将会结束当前音视频通话，停止发布本地媒体流并取消订阅远端媒体流：

```objectivec
[room disconnect];
```


## 处理 Room 事件

设置 [WDGRoom](/conference/iOS/api/WDGRoom.html) 的代理 <[WDGRoomDelegate](/conference/iOS/api/WDGRoomDelegate.html)> 用于处理 Room 的事件：

```objectivec
room.delegate = self;
```

### 连接事件

实现代理方法 `-[WDGRoomDelegate wilddogRoomDidConnect:]`，当客户端与服务器成功连接时，会触发该方法：

```objectivec
- (void)wilddogRoomDidConnect:(WDGRoom *)wilddogRoom {
    // 已成功连接
}
```

实现代理方法 `-[WDGRoomDelegate wilddogRoomDidDisconnect:]`，当客户端与服务器断开连接时，会触发该方法：

```objectivec
- (void)wilddogRoomDidDisconnect:(WDGRoom *)wilddogRoom {
    // 已断开链接，可以释放资源
}
```

### 媒体流通知事件

实现代理方法 `-[WDGRoomDelegate wilddogRoom:didStreamAdded:]`，当房间中有远端媒体流加入时，会触发该方法：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamAdded:(WDGRoomStream *)roomStream {
    // 获取该视频流信息，决定是否订阅
}
```

实现代理方法 `-[WDGRoomDelegate wilddogRoom:didStreamRemoved:]`，当房间中有远端媒体流断开时，会触发该方法：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamRemoved:(WDGRoomStream *)roomStream {
    // 不再显示该视频流
}
```

### 媒体流接收事件

实现代理方法 `-[WDGRoomDelegate wilddogRoom:didStreamReceived:]`，当收到远端流的媒体数据时，会触发该方法：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamReceived:(WDGRoomStream *)roomStream {
    // 展示收到的媒体流
}
```

### 错误事件

实现代理方法 `-[WDGRoomDelegate wilddogRoom:didFailWithError:]`，当视频会议发生错误时，会触发该方法：

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didFailWithError:(NSError *)error {
    // 处理错误
}

```
