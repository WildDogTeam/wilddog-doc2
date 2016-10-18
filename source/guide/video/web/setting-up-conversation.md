title: 建立会话
---

本篇文档介绍如何初始化 [Client](/guide/video/core.html#Client)、配置本地媒体流，以及发起会话。

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
var client = wilddog.video().client();
// 初始化 Video Client 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        client.init({ref: ref, user: user})
        .then(function(){
            console.log("Init succeed!");
        });
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
var videoInstance = wilddog.video();
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

### 发起会话

会话的建立基于邀请机制，只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了会话邀请，拿到 [Conversation](/api/video/web/conversation.html) 对象，会话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  会话邀请必须在 Client 初始化完成之后来进行。邀请更多人加入会话，请使用 [Conversation](/api/video/web/conversation.html) 提供的 `invite` 方法。
</blockquote>

例如，发起 P2P 模式的会话：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 邀请他人加入会话
// mode：选择 P2P 模式（更多选择请关注 API 文档的 Client 中对 ClientInviteConstraints 的介绍）;
// 设置对方 Wilddog Id （需开发者在应用层自己实现获取方式，Wilddog Id 请参考 ClientInviteConstraints）;
// 并传入本地媒体流（localStream ，之前创建的本地流）;
client.inviteToConversation({
        mode:'p2p',
        participantId:'Wilddog Id',
        localStream:localStream
    })
    // 对方接受邀请后，成功拿到 Conversation 对象
    .then(function(conversation){
        // 建立对'participant_connected'事件的监听，触发时在回调函数中拿到参与者(Participant对象)
        conversation.on('participant_connected', function(participant){
            console.log('A remote Participant connected: ' + participant.participantId);
            // 将参与者携带的媒体流绑定到页面的video类型的标签上
            participant.stream.attach(remoteVideoElement);
        });
    });
```
