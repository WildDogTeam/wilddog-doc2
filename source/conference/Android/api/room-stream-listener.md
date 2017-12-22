title: RoomStream.Listener
---

`RoomStream` 的回调方法，用于通知远端媒体流的变化。

## 方法

### onOwnerJoined(stream,joinedOwners)

**定义**

```java
void onOwnerJoined(RoomStream stream, List<String> joinedOwners);
```

**说明**

[RoomStream](/conference/Android/api/room-stream.html) 通过调用该方法通知媒体流中有新的参与者发布了媒体流.

注意：此方法返回列表为新增参与者信息列表，并非媒体流中的全部参与者。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 调用该方法的 `RoomStream` 实例。|
|joinedOwners            | 新加入房间的参与者列表。|

</br>

---

### onOwnerLeaved(stream, leavedOwners)

**定义**

```java
void onOwnerLeaved(RoomStream stream, List<String> leavedOwners)
```

**说明**

[RoomStream](/conference/Android/api/room-stream.html) 通过调用该方法通知代理有参与者离开媒体流。

**参数**

|参数名             | 说明 |
|------------------|------------------|
|roomStream        | 调用该方法的 `WDGRoomStream` 实例。|
|leavedOwners            | 离开房间的参与者列表。|

</br>

---
