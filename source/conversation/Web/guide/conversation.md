title: 一对一视频通话
---

本篇文档介绍如何建立一对一视频通话。在主叫的一方，这个过程包括发起通话请求，收到回应，关闭通话；在被叫的一方，这个过程包括收到一对一视频通话请求，接受／拒绝通话请求，关闭通话。

## 创建一对一视频通话

创建一对一视频通话包括配置和预览本地媒体流、发起一对一视频通话。

### 配置和预览本地媒体流

本地媒体流( [Local Stream](/conversation/Web/guide/core.html#Local-Stream) )包括音频和视频，发起或加入通话前需要进行配置，成功加入一个通话后，该媒体流会发送给其他参与者。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有通过 HTTPS 服务加载的页面才可以成功获取本地摄像头和麦克风等资源。
</blockquote>

创建媒体流时需要传入4个参数，包括：
* captureAudio / captureVideo 为音／视频采集的开关，设置为 false 表示关闭音／视频采集，默认为 true；
* dimension 表示分辨率，默认为480p；
* maxFPS 用来设置视频的最大帧率，默认为 15 帧／秒。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```javascript
// 获取html中id为'local'的video元素;
var localElement = document.getElementById('local');
//获取wilddogVideo对象并初始化，在初始化之前需要通过auth获取的用户的token
var video = wilddogVideo.getInstance().initialize(videoAppId,token);
//创建一个同时有音频和视频的媒体流
video.createLocalStream(
    {
        captureAudio:true,
        captureVideo:true,
        dimension:'480p',
        maxFPS: 15
    })
    .then(function(localStream){
        // 获取到localStream,将媒体流绑定到页面的video类型的标签上
        // 如果没有获得摄像头权限或无摄像头，则无法展示。
        localStream.attach(localElement);
    });
```

### 发起通话请求

使用 `call(remoteUid,localStream,data)` 来发起通话请求，该方法需要传递三个参数：

* remoteUid: 通话接收方的 `uid`，`uid` 是 WilddogAuth 为认证用户分配的唯一身份标识；
* localStream: 通话发起方的本地媒体流；
* data: 用户自定义信息，可以为空。

调用该方法返回 [Conversation](/conversation/web/api/conversation.html) 实例，用于控制本次一对一视频通话。

```javascript
mConversation = video.call(remoteUid,localStream,"userData");
//监听参与者的stream_received事件，将对端的流媒体绑定到页面的video中
mConversation.on('stream_received',function(stream){
    console.log('Receive stream' + stream);
})
```

> 注：每个客户端同一时间只能存在一个通话。发起电话请求时，默认会挂断前一次通话。

### 收到通话请求

其他用户发来通话请求时，监听邀请时间接受另一个Video 发起的邀请：

例如，收到邀请后接受邀请

```javascript

var remoteVideo = wilddogVideo.getInstance().initialize(videoAppId,token);
remoteVideo.on('called',function(incomingConversation){
    incomingConversation.accept(localStream)
        .then(function(conversation){
            //接受邀请成功，加入一对一视频通话
        });
})
```

## 接受／拒绝通话请求

使用 `accept(localStream)` 来接受通话请求，该方法需要传入本地媒体流

```javascript
mConversation.accept(localStream);
```

使用 `reject()` 来拒绝通话请求：

```javascript
mConversation.reject();
```

接受／拒绝对方的通话请求后，对方会通过 `mConversation.on('response',callback)` 收到 ACCEPT / REJECT 状态的通知：

```javascript

mConversation.on('response',function(callStatus) {
    switch (callStatus){
        case 'ACCEPTED':
            Log.d("log","通话被接受");
            break;
        case 'REJECTED':
            Log.d("log","通话被拒绝");
            break;
        case 'BUSY':
            Log.d("log","正忙");
            break;
        case 'TIMEOUT':
            Log.d("log","超时");
            break;
        default:
            Log.d("log","状态未识别");
            break;
    }
})
```

### 关闭一对一视频通话

使用 `close()` 来取消呼叫或者结束通话。

```javascript
mConversation.close();
mConversation=null;
```

通话被关闭后，对方会通过 `mConversation.on('closed',callback)` 收到通话结束的通知：

```javascript

mConversation.on('closed',function(){
    //释放资源
})
```

