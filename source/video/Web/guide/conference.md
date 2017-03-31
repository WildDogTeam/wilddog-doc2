title: 多人视频会议
---

本篇文档介绍开发多人视频会议的主要环节，包括 [创建视频会议](/video/Web/guide/conference.html#创建视频会议)、[管理其他参与者](/video/Web/guide/conference.html#管理其他参与者) 和 [加入视频会议相关](/video/Web/guide/conference.html#加入视频会议相关)。

## 创建视频会议

创建视频会议包括配置和预览本地媒体流、发起/加入视频会议。

### 配置和预览本地媒体流

本地媒体流（ [Local Stream](/video/Web/guide/core.html#Local-Stream)）包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

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

### 发起/加入视频会议

通过 Conference ID 发起/加入一个视频会议。如果该会议不存在，系统会以你作为第一个参与者发起该会议。

例如，加入 Conference ID 为 '123456' 的视频会议：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 设置会议 Conference ID （用户自定义）;
// 并传入本地媒体流（localStream ，之前创建的本地流）;
// 可选择传入用户自定义信息 userData;
var conference =  client.connectToConference('123456',{'stream':localStream,'userData':'somethings'});

//监听本地加入事件
conference.on('connected', function(){
    console.log('You connected！');
});
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
//监听本地加入失败事件
conference.on('connect_failed', function(){
    console.log('You connect failed！');
});
//监听本地断开事件
conference.on('disconnected', function(){
  console.log('You disconnected！');
});

```

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。

### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开的日志：

```javascript

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

每个其他参与者都由一个 participant 对象表示，通过绑定 participant 的视频流来观看其视频画面。

例如，当监听到参与者加入视频会议时展示参与者的媒体流：

```javascript
//div 标签，所有 video 标签都从属于该标签
var videosEl = document.getElementById('videos');
//一个 video 标签
var remoteEl = document.getElementById('remote');
//监听参与者加入事件
conference.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.Id);
      //复制一个 video 标签，用来展示新参与者的视频画面
	  var newRemote = remoteEl.cloneNode(true);
	  videosEl.appendChild(newRemote);
      //监听 streamAdded事件，将收到的stream展示到页面
    participant.on('streamAdded', function(stream){
        console.log('Receive stream!');
        stream.attach(newRemote);
    });
});
```

## 加入视频会议相关
---

视频会议相关操作包括离开视频会议和直播视频会议。

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```javascript
conference.disconnect();
conference.on('disconnected', function(){
    //释放资源
})
```

### 视频会议直播

视频会议直播采用野狗独有的 MeetingCast 技术，能直播视频会议中指定客户端的视频和音频，并根据需要无缝切换直播的客户端。


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  MeetingCast 功能配置之前，需要开启 `控制面板-实时视频通话-多人视频会议` 下的 “视频会议直播” 开关。
</blockquote>

**开启直播**

在视频会议开始后，选择一个参与者作为直播源，打开直播功能。

例如，选择参与者 '12345' 作为直播源开启直播：
```js
conference.meetingCast.start('12345')
  .then(function () {
    console.log('Open MeetingCast succeed!');
  })
  .catch(function (error) {
    console.log('Open MeetingCast failed! Error is '，error.message);
  })
```

**切换直播者**

直播进行时无缝切换直播源。

例如，切换直播源为 participant ID '99999' 的参与者：

```js
conference.meetingCast.start('99999')
  .then(function () {
    console.log('Switch participant succeed!');
  })
  .catch(function (error) {
    console.log('Switch participant failed! Error is '，error.message);
  })
```

**停止直播**

停止直播功能。

例如，直播开启后，停止直播：
```js
conference.meetingCast.stop()
  .then(function () {
    console.log('Stop MeetingCast succeed!');
  })
  .catch(function (error) {
    console.log('Stop MeetingCast failed! Error is '，error.message);
  })
```

**直播状态**

监听当前直播状态。

例如，建立监听

```js
conference.meetingCast.onStateChanged(function(meetingCast){
  //获取当前直播状态，直播者及直播地址
  var status = meetingCast.isStarted;
  var player = meetingCast.anchor;
  var rtmpAddress = meetingCast.play.rtmp;
  var hlsAddress = meetingCast.play.hls;
})
```
