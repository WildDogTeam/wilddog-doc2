title: 视频通话
---

本篇文档介绍在开发视频通话时的主要环节，包括创建视频通话、管理其他参与者、视频通话相关和数据安全性。

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。

### 配置和预览本地媒体流

本地媒体流( [LocalStream](/api/video/web/localStream.html) )包括音频和视频，发起视频通话前需要配置其属性，视频通话创建成功后该媒体流会发给其他参与者。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有通过 HTTPS 服务加载的页面才可以成功获取本地摄像头和麦克风等资源。
</blockquote>

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```javascript
// 获取html中id为'local'的video元素;
var localElement = document.getElementById('local');
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true})
    .then(function(localstream){
        // 获取到localStream,将媒体流绑定到页面的video类型的标签上
        localStream.attach(localElement);
    });
```

### 发起视频通话

只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了一方的邀请，通话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为避免影响视频通话功能的使用，请勿操作该节点。
</blockquote>


例如，发起一对一视频通话：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 邀请他人加入通话
// 设置对方 Wilddog ID （需开发者在应用层自己实现获取方式，Wilddog ID 请参考 ClientInviteConstraints）;
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

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。


### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

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

## 视频通话相关

视频通话相关操作包括接受或拒绝邀请、离开视频通话。

### 接受或拒绝邀请

初始化 Client 之后，监听邀请事件接收另一个 Client 发起的邀请，收到邀请后可以选择接受或拒绝邀请。

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

### 离开视频通话

离开一个正在进行的视频通话并释放媒体资源。可以直接释放媒体资源或通过监听离开通话事件在成功离开通话后释放媒体资源。

例如，断开视频通话并释放不使用的资源：

```javascript
conversation.disconnect();
conversation.on('disconnected', function(){
    //释放资源
})
```

## 数据安全性

### 保护信令交互的安全

视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为保护数据安全，可以针对该节点配置规则表达式。

规则表达式设置页面如下：

<img src="/images/video_guide_rule.png" alt="video_guide_rule">

例如，配置规则表达式，`wilddogVideo` 节点只允许信令交互双方读写，其他节点允许所有人读写：

```{
  "rules": {
    "wilddogVideo": {"conversations": {"$cid": {"users": {".read": "auth != null","$user": {".write": "$user == auth.uid"}},"messages": {"$signalMail": {".write": "$signalMail.startsWith(auth.uid)",".read": "$signalMail.endsWith(auth.uid)"}}}},"invitations": {"$user": {".read": "auth.uid == $user","$invite": {".write": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)",".read": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)"}}}},
    "$others":{ ".read": true，".write": true}
  }
}```

