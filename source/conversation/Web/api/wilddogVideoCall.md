
title: wilddogVideo
---

wilddogVideo是访问WilddogVideoCall SDK的入口。不能直接创建`WilddogVideoCall`实例，必须通过`wilddogVideo.call()`方式获取。
wilddogVideo是 WilddogVideoCall SDK 的核心，负责创建Conversation对象和本地视频流。
在使用 WilddogVideoCall SDK前，需要对 WilddogVideoCall 进行初始化。

</br>

---

## 方法

### initialize

**定义**

```js
initialize({'appId':'<videoAppId>','token':'token'})
```

**说明**

初始化 WilddogVideoCall 。

**返回**

[WilddogVideoCall](/conversation/Web/api/wilddogVideoCall.html)

**示例**

```js
//初始化wilddogVideo
var video = wilddogVideo.initialize('appId':<videoAppId>,'token':token);
```

**注意**

wilddogVideo 对象的使用需要依赖野狗的 Auth，初始化时必须配置 authDomain ，并且 Auth 认证完成后才能获取！

</br>

---

### call

**定义**

```js
call(remoteUid,localStream,data)
```

**说明**

呼叫其他人加入视频通话，对方接受邀请将创建一个新的视频通话 。

**参数**

| 参数名 | 说明 |
|---|---|
| remoteUid  | `String` 类型，用户身份的唯一表示。 |
| localStream| 本地创建的媒体流对象|
| data       | 通话时附加信息     |

**返回值**
Conversation

**示例**

```js
video.call(uid,localStream,'data');
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

与服务器断开连接，不在收到视频通话邀请 。

**示例**

```js
video.stop();
```

</br>

---

### createLocalStream

**定义**

```js
createLocalStream(options)
```

**说明**

创建本地媒体流。

**参数**

| 参数名 | 说明 |
|---|---|
| options | [StreamConstraints](/conversation/Web/api/wilddogVideoCall.html#StreamConstraints) 类型，设置将要创建的本地媒体流属性。 |

**返回**

Promise.<[wilddogVideo.LocalStream](/conversation/Web/api/localStream.html)>

**示例**

```js
//创建本地媒体流（有声音，低画质）
videoInstance.createLocalStream({
        captureAudio: true,
        captureVideo: true,
        dimension: '480p',
        maxFPS: 15
    })
    .then(function(localStream){
        //获取到localStream
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

</br>

---

## 常量

### StreamConstraints

**类型**

```js
Object
```

**说明**

设置将要创建的本地媒体流属性。

**参数**

| 参数名 | 说明 |
|---|---|
| captureAudio | `Boolean` 类型。<br>如果为 `true`，则媒体流中包含声音。<br>如果为 `false`，则媒体流中不包含声音。|
| captureVideo | `Boolean` 类型。<br>如果为 `true`，则媒体流中包含视频。<br>如果为 `false`，则媒体流中不包含视频。|
| dimension | `String` 类型。<br>可以设置的值及对应分辨率如下：<br>`360p` - 480X360<br>`480p` - 640X480<br>`720p` - 1280X720<br>`1080p` - 1920X1080 |
| maxFPS| `Integer` 类型 。 自定义传输视频的最大帧率。|

</br>

---

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| called   | WilddogVideo接收到视频通话呼叫时触发此方法。 |
| token_error    | 视频通话token错误回调，一般由于token过期等原因。 |

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
