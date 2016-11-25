title: 多人视频会议
---

本篇文档介绍如何加入多人视频会议。

**需要修改为最新代码！！！**

## 设置会议

介绍如何配置本地媒体流，预览本地视频画面，以及加入会议。

### 配置本地媒体流

本地媒体流包括音频和视频。需要在加入视频会议前配置本地媒体流([LocalStream](/api/video/web/localStream.html))。加入视频会议后该媒体流会发给其他 Clients。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有通过 HTTPS 服务器打开的页面才可以成功获取本地摄像头和麦克等资源。
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

### 加入视频会议

根据视频会议的 ID 加入视频会议。如果加入的视频会议还没建立，则自动建立，并作为第一个参与者加入。

**TODO：将监听自己加入会议成功与否的事件放在这里**

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频会议邀请必须在 Client 初始化完成之后来进行。
</blockquote>

例如，加入会议 ID 为 '123456' 的视频会议：

```javascript
// 获取html中id为'remote'的video元素;
var remoteVideoElement = document.getElementById('remote');
// 设置会议 Conference Id （用户自定义）;
// 并传入本地媒体流（localStream ，之前创建的本地流）;
// 可选择传入用户自定义信息 userData;
var conference =  client.connectToConference('123456',{'stream':localStream,'userData':'somethings'});

//监听本地加入事件
conference.on('connected', function(){
    console.log('You connected！');
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

介绍如何处理参与者的连接事件，以及播放其他参与者的媒体流。

### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其他参与者的状态通知。

例如，打印加入、离开及加入失败的日志：

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

视频会议中想播放其他参与者的媒体流，可以将媒体流展示到屏幕上。

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

介绍如何离开视频会议。

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```javascript
conference.disconnect();
conference.on('disconnected', function(){
    //释放资源
})
```
