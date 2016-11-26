title: 视频通话
---

本篇文档介绍在开发视频通话时的主要环节，包括创建视频通话、管理其他参与者和加入视频通话相关。

**需要修改为最新代码！！！**

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。

### 配置和预览本地媒体流

本地媒体流( [LocalStream](/api/video/web/localStream.html) )包括音频和视频，发起视频通话前需要配置其属性，视频通话创建成功后该媒体流会发给其他参与者。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有通过 HTTPS 服务打开的页面才可以成功获取本地摄像头和麦克等资源。
</blockquote>

例如，创建一个只有视频且分辨率为 640X480 的流，并展示到页面上：

```javascript
// 创建一个只有视频且分辨率为 640X480 的流
// 获取html中id为'local'的video元素;
var localVideoElement = document.getElementById('local');
var localStream = null;
videoInstance.createStream({
        audio: false,
        video: 'standard'
    })
    .then(function(stream){
        localStream = stream;
        // 获取到localStream,将媒体流绑定到页面的video类型的标签上
        localStream.attach(localVideoElement);
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```


配置成功后，可以在加入视频通话前预览本地画面。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```javascript
var localElement = document.getElementById('local');
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true})
    .then(function(localstream){
        localStream.attach(localElement);
    });
```

### 发起视频通话

只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了一方的邀请，通话才能建立成功。

例如，发起一对一视频通话：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 邀请他人加入通话
// 设置对方 Wilddog Id （需开发者在应用层自己实现获取方式，Wilddog Id 请参考 ClientInviteConstraints）;
// 并传入本地媒体流（localStream ，之前创建的本地流）;
client.inviteToConversation('wilddogId',{
        'stream':localStream,
        'userDate':'somethings'
    })
    // 对方接受邀请后，成功拿到 Conversation 对象
    .then(function(conversation){
        // 建立对'participant_connected'事件的监听，触发时在回调函数中拿到参与者(Participant对象)
        conversation.on('participant_connected', function(participant){
            console.log('A remote Participant connected: ' + participant.participantId);
            // 监听参与者的 streamAdded 事件，将参与者携带的媒体流绑定到页面的video类型的标签上
            participant.on('streamAdded', function(stream){
                console.log('Receive stream!');
                stream.attach(remoteEl);
            });
        });
    });
```

## 管理其他参与者

管理其他参与者包括处理参与者的连接事件和播放参与者的媒体流。


### 处理参与者的连接事件

通过监听参与者加入或离开的事件，来获得参与者的状态通知。

例如，打印加入、离开及加入失败的日志：

```javascript

//监听参与者加入事件
conversation.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.Id);
});
//监听参与者离开事件
conversation.on('participant_disconnected', function(participant){
    console.log('A participant disconnected: ', participant.Id);
});
```

### 播放其他参与者的媒体流

通过展示其他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入会话时展示参与者的媒体流：

```javascript
var remoteEl = document.getElementById('remote');
participant.on('streamAdded', function(stream){
    console.log('Receive stream!');
    stream.attach(remoteEl);
});
```

## 加入会话相关

加入会话相关包括接受或拒绝邀请、离开视频通话。

### 接受或拒绝邀请

初始化 Client 之后，监听邀请事件接收另一个 Client 发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请后，接受邀请：

```javascript
var client = wilddog.video().client();
//监听邀请事件
client.on('invite', function(incomingInvite){
    //收到邀请，接受邀请
    incomingInvite.accept(localStream)
        .then(function(conversation){
            //接受邀请成功，加入会话
        });
});
```

### 离开会话

离开一个正在进行的会话并释放媒体资源。可以直接释放媒体资源或通过监听离开会话事件在成功离开会话后释放媒体资源。

例如，断开会话并释放不使用的资源：

```javascript
conversation.disconnect();
conversation.on('disconnected', function(){
    //释放资源
})
```
