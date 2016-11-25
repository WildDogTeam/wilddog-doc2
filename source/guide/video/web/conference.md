title: 多人视频会议
---

## 设置会议

介绍如何初始化 [Client](/guide/video/core.html#Client)、配置本地媒体流，以及进入会议。

### 初始化 Client

发起视频会议之前需要通过初始化 Client 来连接客户端和野狗服务器。

初始化 Client 之前，要先经过身份认证。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式。

例如，以匿名方式登录后创建 Client ：

```javascript
var config = {
    authDomain: "<appId>.wilddog.com",
    syncURL: "https://<appId>.wilddogio.com"
};
// 初始化Wilddog Sync
wilddog.initializeApp(config);
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

本地媒体流包括音频和视频。需要在发起视频会议前配置本地媒体流([LocalStream](/api/video/web/localStream.html))。视频会议建立后该媒体流会发给其他 Clients。

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

### 加入视频会议

视频会议的建立基于邀请机制，只有另一个 [Client](/api/video/web/wilddogVideoClient.html) 接受了视频会议邀请，拿到 [Conference](/api/video/web/conference.html) 对象，视频会议才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频会议邀请必须在 Client 初始化完成之后来进行。邀请更多人加入视频会议，请使用 [Conference](/api/video/web/conference.html) 提供的 `invite` 方法。
</blockquote>

例如，加入会议ID为'123456'的视频会议：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 邀请他人加入视频会议
// 设置会议 Conference Id （用户自定义）;
// 并传入本地媒体流（localStream ，之前创建的本地流）;
// 可选择传入用户自定义信息 userDate;
var conference =  client.connectToConference('123456',{'stream':localStream,'userDate':'somethings'});
//监听参与者加入事件
conference.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.Id);
    var remoteEl = document.getElementById('remote');
    // 监听 streamAdded事件，将收到的stream展示到页面
    participant.on('streamAdded', function(stream){
        console.log('Receive stream!');
        stream.attach(remoteEl);
    });
});
```

## 管理其他参与者

介绍如何邀请其他 Client 加入 Conference ,处理参与者的连接事件，以及播放参与者的媒体流。

### 邀请其他 Client 建立Conference

Conference 为基于媒体服务器的多对多视频会议，可以通过 Client 的 connectToConference 加入一个视频会议。

例如，加入一个多对多视频会议：

```javascript
var conference =  client.connectToConference('conferenceId',{'stream':localStream,'userDate':'somethings'});
```

### 处理本地和参与者的连接事件

通过监听本地和参与者加入或离开的事件，来获得本地和参与者的状态通知。

例如，打印加入、离开及加入失败的日志：

```javascript
//监听本地加入事件
conference.on('connected', function(){
    console.log('You connected！');
});
//监听本地加入失败事件
conference.on('connect_failed', function(){
    console.log('You connect failed！');
});
//监听本地断开事件
conference.on('disconnected', function(){
    console.log('You disconnected！');
});
//监听参与者加入事件
conference.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.Id);
});
//监听参与者离开事件
conference.on('participant_disconnected', function(participant){
    console.log('A participant disconnected: ', participant.Id);
});
```

### 播放其他参与者的媒体流

视频会议中想播放其他参与者的媒体流，需要将媒体流展示到屏幕上。

例如，当监听到参与者加入视频会议时展示参与者的媒体流：

```javascript
var remoteEl = document.getElementById('remote');
participant.on('streamAdded', function(stream){
    console.log('Receive stream!');
    stream.attach(remoteEl);
});
```

## 加入会议相关
---

介绍如何预览本地视频画面、接受或拒绝邀请，以及离开视频会议。

### 预览本地视频画面

Wilddog Video SDK 都提供了在加入会议前预览本地的视频画面。

例如，创建一个同时有音频和视频的媒体流并展示出来：

```javascript
var localElement = document.getElementById('local');
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true})
    .then(function(localstream){
        localStream.attach(localElement);
    });
```

### 加入视频会议

初始化 Client 后，可以通过 connectToConference 加入一个视频会议。

例如，加入会议：

```javascript
var conference =  client.connectToConference('conferenceId',{'stream':localStream,'userDate':'somethings'});
```

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```javascript
conference.disconnect();
conference.on('disconnected', function(){
    //释放资源
})
```
