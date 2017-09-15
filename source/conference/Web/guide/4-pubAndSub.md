title：发布 / 订阅
---
使用发布 / 订阅 API 能够实现向 Room 发布媒体流 / 取消发布 / 订阅媒体流 / 停止订阅等操作。


注意：只有在 [`roomInstance.on('connected',callback)`](/conference/Web/api/wilddogRoom.html#connected) 事件被触发后才能调用发布 / 订阅相关的 API 。

### 发布本地媒体流
使用 [`publish()`](/conference/Web/api/wilddogRoom.html#publish(localStream)) 方法向 Room 发布本地媒体流，本地媒体流的创建与配置参考[`媒体流`](/conference/Web/guide/1-media-stream.html))。
发布成功后会触发其他客户端的 `stream_added` 事件。

```javascript
roomInstance.publish(localStream,function(error){
	if(error == null){
    	console.log('publish success');
    }
});
```


### 取消发布
使用 [`unpublish`](/conference/Android/api/wilddogRoom.html#unpublish()) 方法取消发布本地媒体流。取消成功后会触发其他客户端的 [`roomInstance.on('stream_removed',callback)`](/conference/Web/api/wilddogRoomr.html#stream_received) 事件。

```javascript
roomInstance.unpublish(localStream,function(error){
	if(error == null){
    	console.log('unpublish success');
    }
});
```

### 订阅远端媒体流
加入 Room 成功后，会触发 `roomInstance.on('stream_added',callback)`(/conference/Web/api/wilddogRoom.html#stream_added) 事件返回 Room 中已发布的远端流。使用 [`subscribe`](/conference/Web/api/wilddogRoom.html#subscribe(roomStream)) 方法订阅某个远端媒体流。

订阅成功后会触发本地 `stream_receive`(/conference/Web/api/wilddogRoom.html#stream_received) 事件。

注意：[`stream_added`](/conference/Web/api/wilddogRoom.html#stream_added)  事件会被触发多次，每次只返回一个远端媒体流。

```javascript

    roomInstance.on('stream_added', function(roomStream)	{
		room.subscribe(roomStream);
    }

```
 

### 取消订阅

使用 [`subscribe`](/conference/Web/api/wilddogRoom.html#unsubscribe(roomStream)) 方法取消订阅远端媒体流。

```javascript
roomInstance.unsubscribe(roomStream);
```