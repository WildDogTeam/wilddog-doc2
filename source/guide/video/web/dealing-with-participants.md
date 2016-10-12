
title: 管理其他参与者
---

成功发起会话后，对方接收邀请后即可建立视频会话。
此时如想建立多人会话，可以在会话中邀请其他人加入。
以下展示了如何邀请其他人加入并处理连接事件，并在得到参与者发送的视频流后将其展示到页面上。

### 邀请其他 Client 加入会话

会话建立成功后，会话的参与者都可以邀请其他 Client 作为新参与者加入。

```javascript
conversation.invite(['参与者1', '参与者2']);
```

### 处理参与者的连接事件

通过监听参与者加入或离开的事件，来获得参与者的状态通知。

示例：

```javascript
//监听参与者加入事件
conversation.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.participantId);
});
//监听参与者离开事件
conversation.on('participant_disconnected', function(participant){
    console.log('A participant disconnected: ', participant.participantId);
});
//监听参与者加入失败事件
conversation.on('participant_failed', function(participant){
    console.log('A participant fail to connect: ', participant.participantId);
});
```

### 播放其他参与者的媒体流

想观看会话中其他参与者的媒体流，需要将媒体流展示到屏幕上。

示例：

```javascript
var remoteEl = document.getElementById('remote'); 
conversation.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.participantId);
    participant.stream.attach(remoteEl);
});
```
