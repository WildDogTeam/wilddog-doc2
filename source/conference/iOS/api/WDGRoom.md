title: WDGRoom
---

`WDGRoom` 是视频会议的主入口，表示一个多人的视频会话，多个用户可以加入同一个 Room 进行音视频通话。

## 属性

### roomId

**定义**

```objectivec
@property (nonatomic, strong) NSString *roomId;
```

**说明**

Room 的唯一标识。

</br>

---

## 方法

### - initWithRoomId: delegate:

**定义**

```objectivec
- (instancetype)initWithRoomId:(NSString *)roomId delegate:(id<WDGRoomDelegate>)delegate;
```

**说明**

使用 roomId 初始化 Room，同时指定接收 Room 事件的代理。如果 Room 不存在，则服务端创建新 Room；否则加入已有 Room。

**参数**

参数名             | 说明
------------------|------------------
roomId            | 字符串类型，代表一个 Room 的唯一标识。
delegate          | 接收 Room 事件的代理。请参考 [WDGRoomDelegate](/conference/iOS/api/WDGRoomDelegate.html)。

**返回值**

`WDGRoom` 实例。

</br>

---

### - connect

**定义**

```objectivec
- (void)connect;
```

**说明**

加入 Room。

</br>

---

### - disconnect

**定义**

```objectivec
- (void)disconnect;
```

**说明**

离开 Room。

</br>

---

### - publishLocalStream:

**定义**

```objectivec
- (void)publishLocalStream:(WDGLocalStream *)localStream;
```

**说明**

发布本地媒体流。发布成功后会触发其他客户端的 `-[WDGRoomDelegate didStreamAdded:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
localStream       | 本地媒体流。请参考 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html)。

</br>

---

### - publishLocalStream: withCompletionBlock:

**定义**

```objectivec
- (void)publishLocalStream:(WDGLocalStream *)localStream withCompletionBlock:(void(^)(NSError *error))block;
```

**说明**

发布本地媒体流，操作完成执行 block。发布成功会触发其他客户端的 `-[WDGRoomDelegate didStreamAdded:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
localStream       | 本地媒体流。请参考 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html)。
block             | 发布操作完成执行的 block。

</br>

---

### - unpublishLocalStream:

**定义**

```objectivec
- (void)unpublishLocalStream:(WDGLocalStream *)localStream;
```

**说明**

取消发布本地媒体流。取消发布成功会触发其他客户端的 `-[WDGRoomDelegate didStreamRemoved:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
localStream       | 本地媒体流。请参考 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html)。

</br>

---

### - unpublishLocalStream: withCompletionBlock:

**定义**

```objectivec
- (void)unpublishLocalStream:(WDGLocalStream *)localStream withCompletionBlock:(void(^)(NSError *error))block;
```

**说明**

取消发布本地媒体流，操作完成执行 block。取消发布成功会执行 block 并触发其他客户端的 `-[WDGRoomDelegate didStreamRemoved:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
localStream       | 本地媒体流。请参考 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html)。
block             | 取消发布操作完成执行的 block。

</br>

---

### - subscribeRoomStream:

**定义**

```objectivec
- (void)subscribeRoomStream:(WDGRoomStream *)roomStream;
```

**说明**

订阅在 `-[WDGRoomDelegate didStreamAdded:]` 事件中获取的远端媒体流。订阅成功会触发本地的 `-[WDGRoomDelegate didStreamReceived:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
roomStream        | 远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。

</br>

---

### - subscribeRoomStream: withCompletionBlock:

**定义**

```objectivec
- (void)subscribeRoomStream:(WDGRoomStream *)roomStream withCompletionBlock:(void(^)(NSError *error))block;
```

**说明**

订阅在 `-[WDGRoomDelegate didStreamAdded:]` 事件中获取的远端媒体流，操作完成执行 block。订阅成功会触发本地的 `-[WDGRoomDelegate didStreamReceived:]` 事件。

**参数**

参数名             | 说明
------------------|------------------
roomStream        | 远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。
block             | 订阅操作完成执行的 block。

</br>

---

### - unsubscribeRoomStream:

**定义**

```objectivec
- (void)unsubscribeRoomStream:(WDGRoomStream *)roomStream;
```

**说明**

取消订阅指定的远端媒体流。

**参数**

参数名             | 说明
------------------|------------------
roomStream        | 远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。

</br>

---

### - unsubscribeRoomStream: withCompletionBlock:

**定义**

```objectivec
- (void)unsubscribeRoomStream:(WDGRoomStream *)roomStream withCompletionBlock:(void(^)(NSError *error))block;
```

**说明**

取消订阅指定的远端媒体流，操作完成执行 block。

**参数**

参数名             | 说明
------------------|------------------
roomStream        | 远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。
block             | 取消订阅操作完成执行的 block。

</br>

---
