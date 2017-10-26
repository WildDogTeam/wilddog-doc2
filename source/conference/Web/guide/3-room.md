title: 管理多人视频通话
---

Room 表示一个多人的视频会话。多个用户可以加入同一个 Room 进行音视频通话。

### 加入 Room
加入 Room 前需要使用唯一的 roomId 创建 [WilddogVideoRoom](/conference/Web/api/wilddogRoom.html) 对象实例。使用 [connect()](/conference/Web/api/wilddogRoom.html#connect) 方法加入 Room。成功加入到 Room 后可以使用 [publish](/conference/Web/api/wilddogRoom.html#publish)或 [subscribe](/conference/Web/api/wilddogRoom.html#subscribe) 方法发布或订阅媒体流。

```javascript
roomInstance=wilddogVideo.room(roomId);
roomInstance.connect();
```

WilddogVideoRoom 提供了海外服务器节点，在获取`WilddogVideoRoom`对象时携带指定的服务器地址：

```javascript
roomInstance=wilddogVideo.room(roomId,url);
roomInstance.connect();
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 如需使用海外节点，请联系客服 400-616-0980。
</blockquote>

### 离开 WilddogVideoRoom

使用 [disconnect()](/conference/Web/api/wilddogRoom.html#disconnect) 方法离开当前 Room。离开 Room 后将会结束当前音视频通话，停止发布本地媒体流并取消订阅远端媒体流。

```javascript
roomInstance.disconnect();
```

### 处理 WilddogVideoRoom 事件

[WilddogVideoRoom](/conference/Web/api/wilddogRoom.html#事件) 事件用于监听 Room 连接状态以及媒体流变化。


|事件类型|事件|说明|
|--|--|--|
|连接事件|connected|成功连接到 Room。|
|连接事件|disconnected|断开到 Room 的连接。|
|媒体流事件|stream_added|有远端流加入到 Room，此时的RoomStream 中不包含真正的媒体流，需要使用 subscribe 方法进行订阅方可获取真正的媒体流。|
|媒体流事件|stream_removed|有远端流停止发布。|
|媒体流事件|stream_received|成功订阅远端流，此时获取到真正的媒体流对象，可以进行播放。|
|错误事件|error|错误事件。|

