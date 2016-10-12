
title: 管理其他参与者
---

本篇文档介绍如何邀请其他 Client 加入会话、处理参与者的连接事件，以及播放其他参与者的媒体流。

### 邀请其他 Client 加入会话

会话建立成功后，会话的参与者都可以邀请其他 Client 作为新参与者加入。

例如，在会话中邀请新的参与者加入：

```javascript
conversation.invite(['参与者1', '参与者2']);
```

### 处理参与者的连接事件

通过监听参与者加入或离开的事件，来获得参与者的状态通知。

例如向控制台输出参与者加入/离开及加入失败情况的日志：

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

会话中想播放其他参与者的媒体流，需要将媒体流展示到屏幕上。

例如，当监听到新参与者加入会话时展示参与者的媒体流：

```javascript
var remoteEl = document.getElementById('remote'); 
conversation.on('participant_connected', function(participant){
    console.log('New participant connected: ', participant.participantId);
    participant.stream.attach(remoteEl);
});
```
