
title: WilddogVideoCall
---

wilddogVideo是访问WilddogVideoCall SDK的入口。不能直接创建`WilddogVideoCall`实例，必须通过`wilddogVideo.call()`方式获取。
`WilddogVideoCall`负责创建 Conversation 对象。在使用 WilddogVideoCall SDK 前,需要对 WilddogVideoCall 对象进行初始化。



</br>

---

## 方法

### call

**定义**

```js
call(remoteUid,localStream,data)
```

**说明**

呼叫其他人加入一对一视频通话，对方接受邀请将创建一个新的一对一视频通话 。

**参数**

| 参数名 | 说明 |
|---|---|
| remoteUid  | `String` 类型，用户身份的唯一表示。 |
| localStream| 本地创建的媒体流对象|
| options    | `Object` 类型，可选参数<br>代表呼叫的相关设置，`data`代表需要携带的信息，`iceTransportPolicy`可开启强制Relay。|

**返回值**
Conversation

**示例**

```js
video.call(uid,localStream,{'data':'test','iceTransportPolicy':'relay'});
```

</br>

---

### start

**定义**

```js
start()
```

**说明**

与服务器建立连接，会进行token验证，常在调用stop()之后调用，默认初始化会自动调用。

**示例**

```js
video.start();
```

</br>

---

### stop

**定义**

```js
stop()
```

**说明**

与服务器断开连接，不在收到一对一视频通话邀请 。

**示例**

```js
video.stop();
```

</br>

---

## 常量

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| called   | WilddogVideo接收到一对一视频通话呼叫时触发此方法。 |
| token_error    | 一对一视频通话token错误回调，一般由于token过期等原因。 |

</br>

---

#### called

**参数**

| 参数名 | 说明 |
|---|---|
| conversation | [Conversation](/conversation/Web/api/conversation.html) 类型。其中包括呼叫方携带的附加信息。|

**示例**

```js
//监听邀请事件
video.on('called', function(conversation){
    //接受到邀请
    console.log('Accepted an invite from ' + conversation.remoteUid);
});
```

</br>

---

#### token_error

**参数**

| 参数名 | 说明 |
|---|---|
| error | `Error` 类型。|

**示例**

```js
//监听token错误事件
video.on('token_error', function(error){
    //接受到错误
    console.log('Accepted an error ' + error);
});
```
