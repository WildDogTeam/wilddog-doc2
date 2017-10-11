title: WilddogVideoRoom.Listener
---

[WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html) 的回调，用于通知 Room 相关的事件。

## 方法 

### onConnected(room)

**定义**

```java
	void onConnected(WilddogVideoRoom room)
```

**说明**

加入 Room 成功后的回调。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|

</br>

---

### onDisconnected(room)

**定义**

```java
	void onDisconnected(WilddogVideoRoom room)
```

**说明**

离开 Room 后的回调。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|

</br>

---

### onStreamAdded(room,roomStream)

**定义**

```java
	void onStreamAdded(WilddogVideoRoom room, RoomStream roomStream)
```

**说明**

Room 中有远端媒体流加入。回调中的 `RoomStream` 对象只包含描述流的基本信息，不包含媒体数据，需要调用 `subscribe()` 方法获取媒体数据。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|
|roomStream        | Room 中新加入的远端媒体流，只包含描述流的基本信息，不包含媒体数据。请参考 [RoomStream](/conference/Android/api/room-stream.html)。|

</br>

---

### onStreamRemoved(room,roomStream)

**定义**

```java
	void onStreamRemoved(WilddogVideoRoom room, RoomStream roomStream)
```

**说明**

Room 中有远端媒体流停止发布。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|
|roomStream        | Room 中停止发布的远端媒体流。请参考 [RoomStream](/conference/Android/api/room-stream.html)。|

</br>

---

### onStreamReceived(room,roomStream)

**定义**

```java
	void onStreamReceived(WilddogVideoRoom room, RoomStream roomStream)
```

**说明**

收到远端媒体流数据。调用 [RoomStream.attach()](/conference/Android/api/room-stream.html#attach-videoView) 方法在 [`WilddogVideoView`](/conference/Android/api/wilddog-video-view.html) 中预览媒体流。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|
|roomStream        | 收到数据的远端媒体流。请参考 [RoomStream](/conference/Android/api/room-stream.html)。|

</br>

---

### onError(room,error)

**定义**

```java
	void onError(WilddogVideoRoom room, WilddogVideoError error)
```

**说明**

Room 中发生错误。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|room       | 调用该方法的 `WilddogVideoRoom` 实例。请参考 [WilddogVideoRoom](/conference/Android/api/wilddog-video-room.html)。|
|error             | 错误信息，通过错误码区分错误类型。请参考 [ErrorCode](/conference/Android/api/error-code.html)。|

</br>

---
