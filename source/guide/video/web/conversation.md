title: 视频通话
---

本篇文档介绍如何使用 [Client](/guide/video/core.html#Client) 建立视频通话。

## 建立通话

介绍如何初始化 [Client](/guide/video/core.html#Client)、配置本地媒体流，以及发起视频通话。

### 初始化 Client

发起会话之前需要通过初始化 Client 来连接客户端和野狗服务器。

初始化 Client 时需要指定 Video SDK 的交互路径，客户端和服务器以及客户端之间都是通过该路径进行交互，只有相同交互路径下的 Client 能够发起或加入会话。建议该路径下不要存储其他数据。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  建立服务器中转模式的会话时，初始化 Client 的交互路径应和控制面板中的交互路径保持一致。
</blockquote>

初始化 Client 之前，要先经过身份认证。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式。

例如，以匿名方式登录后创建 Client ：

```javascript
var config = {
    authDomain: "<appId>.wilddog.com",
    syncURL: "https://<appId>.wilddogio.com"
};
// 初始化Wilddog Sync
wilddog.initializeApp(config);
// 创建交互路径的 Wilddog Sync 引用，该路径可以自定义
var ref = wilddog.sync().ref("你的自定义路径");
var videoInstance = wilddog.video();
var client;
// 初始化 Video Client 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        client = wilddog.video().client()
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```

### 配置本地媒体流

本地媒体流包括音频和视频。需要在发起会话前配置本地媒体流([LocalStream](/api/video/web/localStream.html))。会话建立后该媒体流会发给其他 Clients。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有通过 HTTPS 服务器打开的页面才可以成功获取本地摄像头和麦克等资源。
</blockquote>

例如，可以创建一个只有视频且分辨率为 640X480 的流，并展示到页面上：

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

### 发起视频通话

会话的建立基于邀请机制，只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了会话邀请，拿到 [Conversation](/api/video/web/conversation.html) 对象，会话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  会话邀请必须在 Client 初始化完成之后来进行。邀请更多人加入会话，请使用 [Conversation](/api/video/web/conversation.html) 提供的 `invite` 方法。
</blockquote>

例如，发起一对一的通话：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 邀请他人加入会话
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

介绍如何邀请其他 Client 加入Conversation、处理参与者的连接事件，以及播放参与者的媒体流。

### 邀请其他 Client 建立Conversation

Conversation 为一对一的通话，可以通过 Client 的 inviteToConversation 向其他 Client 发起一对一通话邀请。

例如，邀请新的参与者建立一对一通话：

```javascript
client.inviteToConversation('wilddogId',{'stream':localStream,'userDate':'somethings'});
```

### 处理本地和参与者的连接事件

通过监听本地和参与者加入或离开的事件，来获得本地和参与者的状态通知。

例如，打印加入、离开及加入失败的日志：

```javascript
//监听本地加入事件
conversation.on('connected', function(){
    console.log('You connected！');
});
//监听本地加入失败事件
conversation.on('connect_failed', function(){
    console.log('You connect failed！');
});
//监听本地断开事件
conversation.on('disconnected', function(){
    console.log('You disconnected！');
});
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

会话中想播放其他参与者的媒体流，需要将媒体流展示到屏幕上。

例如，当监听到参与者加入会话时展示参与者的媒体流：

```javascript
var remoteEl = document.getElementById('remote');
participant.on('streamAdded', function(stream){
    console.log('Receive stream!');
    stream.attach(remoteEl);
});
```

## 加入会话相关

介绍如何预览本地视频画面、接受或拒绝邀请，以及离开会话。

### 预览本地视频画面

Wilddog Video SDK 都提供了在加入会话前预览本地的视频画面。

例如，创建一个同时有音频和视频的媒体流并展示出来：

```javascript
var localElement = document.getElementById('local');
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true})
    .then(function(localstream){
        localStream.attach(localElement);
    });
```

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他 Client 发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

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
