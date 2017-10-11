title: 发布和订阅
---

使用发布／订阅 API 能够实现向 Room 发布媒体流	、取消发布／订阅媒体流、停止订阅等操作。

只有在 [onConnected()](/conference/Android/api/wilddog-video-room-listener.html#onConnected-room) 事件被触发后才能调用发布／订阅相关的 API 。


### 发布本地媒体流
使用 [publish()](/conference/Android/api/wilddog-video-room.html#publish-localStream) 方法向 Room 发布本地媒体流，本地媒体流的创建与配置参考[媒体流](/conference/Android/guide/1-media-stream.html))。
发布成功后会触发其他客户端的 `onStreamAdded` 事件。

```java
	room.publish(localStream);
```


### 取消发布
使用 [unpublish()](/conference/Android/api/wilddog-video-room.html#unpublish) 方法取消发布本地媒体流。取消成功后会触发其他客户端的 [onStreamRemoved](/conference/Android/api/wilddog-video-room-listener.html#onStreamRemoved-room-roomStream) 事件。

```java
	room.unpublish(localStream);
```

### 订阅远端媒体流
加入 Room 成功后，会触发 [onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件返回 Room 中已发布的远端流。使用 [`subscribe()`](/conference/Android/api/wilddog-video-room.html#subscribe-roomStream) 方法订阅某个远端媒体流。

订阅成功后会触发本地 [onStreamReceived](/conference/Android/api/wilddog-video-room-listener.html#onStreamReceived-room-roomStream) 事件。

注意：[onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件会被触发多次，每次只返回一个远端媒体流。

```java
    void onStreamAdded(wilddogVideoRoom room, RoomStream roomStream) {
		room.subscribe(roomStream);
    }
```
 

### 取消订阅

使用 [unsubscribe](/conference/Android/api/wilddog-video-room.html#unsubscribe-roomStream) 方法取消订阅远端媒体流。

```java
	room.unsubscribe(roomStream);
```
