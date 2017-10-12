title: WilddogVideoRoom
---

`wilddogVideo` 是 WilddogVideoRoom SDK 的主入口，不能直接创建 WilddogVideoRoom 实例，必须要通过 `wilddogVideo.room(roomId)` 方式获取。
WilddogVideoRoom 表示一个多人的视频会话，多个用户可以加入同一个 Room 进行音视频通话。

## 属性

### roomId

**定义**

```javascript
var roomInstance = wilddogVideo.room(roomId)
```

**说明**

Room 的唯一标识。

</br>

---

## 方法

### connect

**定义**

```javascript
	roomInstance.connect();
```

**说明**

加入 Room。

</br>

---

### disconnect

**定义**

```javascript
	roomInstance.disconnect();
```

**说明**

离开 Room。

</br>

---

### publish

**定义**

```javascript
roomInstance.publish(localStream,function(error){
     if(error == null){
     	console.log('publish success');
     	localStream.attach(localEl);
     }
});
```

**说明**

发布本地媒体流。发布成功后会触发其他客户端的 `stream_added` 事件。

**参数**

参数名             | 说明 
------------------|-------------
localStream       | 本地媒体流。[LocalStream](/conference/Web/api/localStream.html)

</br>

---

### unpublish

**定义**

```javascript
roomInstance.unsubscribe(roomStream,function (error) {
     if(error == null){
          console.log('unpublish success');
     }
})
```

**说明**

取消发布本地媒体流。取消发布成功会触发其他客户端的 `stream_removed` 事件。

**参数**

参数名             | 说明 
------------------|------------------
roomStream       | 远端媒体流。 [RoomStream](/conference/Web/api/roomStream.html)

</br>

---

### subscribe

**定义**

```javascript
roomInstance.subscribe(roomStream,function (error) {
            if(error == null){
                console.log('subscribe success');
            }
        })
```

**说明**

订阅在 `stream_added` 事件中获取的远端媒体流。订阅成功会触发本地的 `stream_received` 事件。

**参数**

参数名             | 说明 
------------------|------------------
roomStream        | 远端媒体流 [RoomStream](/conference/Web/api/roomStream.html)

</br>

---

### unsubscribe

**定义**

```javascript
roomInstance.unsubscribe(roomStream,function (error) {
            if(error == null){
                console.log('unsubscribe success');
            }
        })
```

**说明**

取消订阅指定的远端媒体流。

**参数**

参数名             | 说明 
------------------|------------------
roomStream        | 远端媒体流 [RoomStream](/conference/Web/api/roomStream.html)

</br>

---

### startRecording()

**定义**

```javascript
roomInstance.stopRecording(callback);
```

**说明**

使用默认录制布局并且开始服务端录制功能。

### startRecording(options)

**定义**

```javascript
var options = {
    "fps":10,
    "canvasWidth":1000,
    "canvasHeight":1000,
    "streams":{
        "627620748239984100":{"left":0,"top":100,"width":100,"height":100,"zOrder":1},
        "627620748239984101":{"left":0,"top":100,"width":100,"height":100,"zOrder":2}
    }
}
roomInstance.startRecording(options,callback);
```

**说明**

设置录制布局并且开始服务端录制功能。

**参数**

选项               | 类型              | 说明                    | 示例
------------------|------------------|------------------|------------------
fps               | Integer         | 视频帧率 (fps)    | 15
bitrate           | Integer         | 比特率 (bps)      | 300
canvasWidth       | Integer         | 视频宽度 (<=1920) | 960
canvasHeight      | Integer         | 视频高度 (<=1080) | 640
bgColor           | Integer         | 背景颜色 (十六进制) | xffffff
streams           | Object          | 媒体流布局         | { "627620748239984100": {"left": 0 , "top": 100, "width": 100, "height": 100, "zOrder": 0-255}


### stopRecording

**定义**

```javascript
room.stopRecording(callback);
```

**说明**

结束服务端录制功能。

## 事件

WilddogVideoRoom 事件用于监听 Room 连接状态以及媒体流变化。

|事件类型|事件|说明|
|--|--|--|
|连接事件|connected|成功连接到 Room。|
|连接事件|disconnected|断开到 Room 的连接。|
|媒体流事件|stream_added|有远端流加入到 Room，此时的RoomStream 中不包含真正的媒体流，需要使用 subscribe 方法进行订阅方可获取真正的媒体流。|
|媒体流事件|stream_removed|有远端流停止发布。|
|媒体流事件|stream_received|成功订阅远端流，此时获取到真正的媒体流对象，可以进行播放。|
|错误事件|error|错误事件。|

---
### connected

**示例**

```javascript
	roomInstance.on('connected',function(){
    	console.log('connected success');
    })
```
### disconnected

**示例**

```javascript
	roomInstance.on('disconnected',function(){
    	console.log('disconnected success');
    })
```

### stream_added
**参数**

| 参数名 | 说明 |
|---|---|
| roomStream | [RoomStream](/conference/Web/api/roomStream.html) 类型远端参与者发送的媒体流|
**示例**

```javascript
	roomInstance.on('stream_added',function(roomStream){
    	console.log('rommStream added' + roomStream);
    })
```
### stream_removed
**参数**

| 参数名 | 说明 |
|---|---|
| roomStream | [RoomStream](/conference/Web/api/roomStream.html) 类型远端参与者发送的媒体流|
**示例**

```javascript
	roomInstance.on('stream_removed',function(roomStream){
    	console.log('rommStream removed' + roomStream);
    })
```

### stream_received
**参数**

| 参数名 | 说明 |
|---|---|
| roomStream | [RoomStream](/conference/Web/api/roomStream.html) 类型远端参与者发送的媒体流|
**示例**

```javascript
	roomInstance.on('stream_received',function(roomStream){
    	console.log('rommStream received' + roomStream);
    })
```

### error
**示例**

```javascript
	//错误信息回调
	roomInstance.on('error',function(error){
    	console.log('error is' + error);
    })
```