title: 一对一视频通话
---

本篇文档介绍如何建立一对一视频通话。在主叫的一方，这个过程包括发起通话请求，收到回应，关闭通话；在被叫的一方，这个过程包括收到一对一视频通话请求，接受／拒绝通话请求，关闭通话。

### 发起通话请求

使用 `call(remoteUid,localStream,data)` 来发起通话请求，该方法需要传递三个参数：

* remoteUid: 通话接收方的 `uid`，`uid` 是 WilddogAuth 为认证用户分配的唯一身份标识；
* localStream: 通话发起方的本地媒体流；
* options: 包括视频通话用户自定义信息、是否强制relay。

调用该方法返回 [Conversation](/conversation/Web/api/conversation.html) 实例，用于控制本次一对一视频通话。

```javascript
//如iceTransportPolicy字段值为relay 则表示开启强制relay
var options = {'iceTransportPolicy':'','data':'userData'};
mConversation = videoInstance.call(remoteUid,localStream,options);
//监听参与者的stream_received事件，将对端的流媒体绑定到页面的video中
mConversation.on('stream_received',function(stream){
    console.log('Receive stream' + stream);
})
```

> 注：每个客户端同一时间只能存在一个通话。发起电话请求时，默认会挂断前一次通话。

### 收到通话请求

其他用户发来通话请求时，用户通过 `videoInstance.on('called',called)` 事件获得 [Conversation](/conversation/Web/api/conversation.html) 的实例：

例如，收到邀请后接受邀请

```javascript

videoInstance.on('called',function(incomingConversation){
    incomingConversation.accept(localStream)
        .then(function(conversation){
            //接受邀请成功，加入一对一视频通话
        });
})
```

## 接受／拒绝通话请求

使用 `accept(localStream)` 来接受通话请求，该方法需要传入本地媒体流

```javascript
mConversation.accept(localStream).then(function(conversation) {});
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
            console.log("log","通话被接受");
            break;
        case 'REJECTED':
            console.log("log","通话被拒绝");
            break;
        case 'BUSY':
            console.log("log","正忙");
            break;
        case 'TIMEOUT':
            console.log("log","超时");
            break;
        default:
            console.log("log","状态未识别");
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
    mConversation.close();
    mConversation = null;
})
```

