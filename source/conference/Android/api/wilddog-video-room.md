title: WilddogVideoRoom
---

`WilddogVideoRoom` 是视频会议的主入口，表示一个多人的视频会话，多个用户可以加入同一个 Room 进行音视频通话。

## 属性

### getRoomId()

**定义**

```java
	public String getRoomId()
```

**说明**

Room 的唯一标识。

</br>

---

## 方法

### WilddogVideoRoom(roomId,roomEvents)

**定义**

```java
	WilddogVideoRoom(String roomId, Listener roomEvents)
```

**说明**

使用 roomId 初始化 Room，同时指定接收 Room 事件的监听。

如果 Room 不存在，则服务端创建新 Room；否则加入已有 Room。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomId            | 字符串类型，代表一个 Room 的唯一标识。|
|roomEvents          | 接收 Room 事件的监听，请参考 [WilddogVideoRoom.Listener](/conference/Android/api/wilddog-video-room-listener.html)。|

**返回值**

`WilddogVideoRoom` 实例。

</br>

---

### WilddogVideoRoom(roomId,url,roomEvents)

**定义**

```java
	WilddogVideoRoom(String roomId, String url, Listener roomEvents)
```

**说明**

使用 roomId 初始化 Room，同时指定接收 Room 事件的监听。

如果 Room 不存在，则服务端创建新 Room；否则加入已有 Room。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomId            | 字符串类型，代表一个 Room 的唯一标识。|
|url            | 字符串类型，代表连接的服务器海内外节点地址。|
|roomEvents          | 接收 Room 事件的监听，请参考 [WilddogVideoRoom.Listener](/conference/Android/api/wilddog-video-room-listener.html)。|

**返回值**

`WilddogVideoRoom` 实例。

</br>

---

### connect()

**定义**

```java
	public void connect()
```

**说明**

加入 Room。成功加入 Room 会触发本地 [onConnected](/conference/Android/api/wilddog-video-room-listener.html#onConnected-room) 事件，否则触发 [`onError()`](/conference/Android/api/wilddog-video-room-listener.html#onError(room,error)) 事件。

</br>

---

### disconnect()

**定义**

```java
	public void disconnect()
```

**说明**

离开 Room。调用后触发本地 [onDisconnected](/conference/Android/api/wilddog-video-room-listener.html#onDisconnected-room) 事件。

</br>

---

### publish(localStream)

**定义**

```java
	public void publish(LocalStream localStream)
```

**说明**

发布本地媒体流。发布成功后会触发其他客户端的 [onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|localStream       | 本地媒体流，请参考 [LocalStream](/conference/Android/api/local-stream.html)。|

</br>

---

### publish(localStream,listener)

**定义**

```java
	public void publish(LocalStream localStream, CompleteListener listener)
```

**说明**

发布本地媒体流，操作完成执行完成回调。发布成功后会触发其他客户端的 [onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|localStream       | 本地媒体流，请参考 [LocalStream](/conference/Android/api/local-stream.html)。|
|listener          | 发布操作完成执行的回调监听。|

</br>

---

### unpublish()

**定义**

```java
	public void unpublish()
```

**说明**

取消发布本地媒体流。取消发布成功会触发其他客户端的 [onStreamRemoved](/conference/Android/api/wilddog-vide0-room-listener.html#onStreamRemoved-room-roomStream) 事件。


</br>

---

### unpublish(listener)

**定义**

```java
	public void unpublish(CompleteListener listener)
```

**说明**

取消发布本地媒体流，操作完成执行完成回调并触发其他客户端的 [onStreamRemoved](/conference/Android/api/wilddog-video-room-listener.html#onStreamRemoved-room-roomStream)  事件。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|block             | 取消发布操作完成执行的回调监听。|

</br>

---

### subscribe(roomStream)

**定义**

```java
	public void subscribe(RoomStream roomStream)
```

**说明**

订阅在 [onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件中获取的远端媒体流。订阅成功会触发本地的 [`onStreamReceived`](/conference/Android/api/wilddog-video-room-listener.html#onStreamReceived(room,roomStream)) 事件。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 远端媒体流，请参考 [RoomStream](/conference/Android/api/room-stream.html)。|

</br>

---

### subscribe(roomStream,listener)

**定义**

```java
	public void subscribe(RoomStream roomStream, CompleteListener listener)
```

**说明**

订阅在 [onStreamAdded](/conference/Android/api/wilddog-video-room-listener.html#onStreamAdded-room-roomStream) 事件中获取的远端媒体流，操作完成执行完成回调。订阅成功会触发本地的 [`onStreamReceived`](/conference/Android/api/wilddog-video-room-listener.html#onStreamReceived(room,roomStream)) 事件。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 远端媒体流，请参考 [RoomStream](/conference/Android/api/room-stream.html)。|
|listener             | 订阅操作完成执行的回调监听。|

</br>

---

### unsubscribe(roomStream)

**定义**

```java
	public void unsubscribe(RoomStream roomStream)
```

**说明**

取消订阅指定的远端媒体流。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 远端媒体流，请参考 [RoomStream](/conference/Android/api/room-stream.html)。|

</br>

---

### unsubscribe(roomStream,listener)

**定义**

```java
	public void unsubscribe(RoomStream roomStream, CompleteListener listener)
```

**说明**

取消订阅指定的远端媒体流，操作完成执行完成回调。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 远端媒体流，请参考 [RoomStream](/conference/Android/api/room-stream.html)。|
|listener             | 取消订阅操作完成执行的回调监听。|

</br>

---

### startRecording(listener)

**定义**

```java
	public void startRecording(RecordingListener listener)
```

**说明**

使用默认录制布局并且开始服务端录制功能。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|listener             | 开始录制操作完成执行的回调监听。|

</br>

---

### startRecording(options,listener)

**定义**

```java
	public void startRecording(Map<String,Object> options,RecordingListener listener)
```

**说明**

设置录制布局并且开始服务端录制功能。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|options        | 设置录制布局的集合对象。|
|listener             | 开始录制操作完成执行的回调监听。|

</br>

---

### stopRecording(listener)

**定义**

```java
	public void stopRecording(RecordingListener listener)
```

**说明**

结束服务端录制功能。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|listener             | 结束录制操作完成执行的回调监听。|

</br>

---