
title: Conversation
---

一对一视频通话，实现一对一视频通话功能

## 属性

### remoteUid

**说明**

获取当前一对一视频通话远端UID，此ID为不重复的字符串。

</br>

---

## 方法

### accept

**定义**

```js
accept(localStream)
```

**说明**

被叫方接受主叫方的呼叫

**参数**

| 参数名          | 描述                      |
| ----------------| ------------------------- |
| localStream        | 接受邀请时携带的本地媒体流对象。|

**示例**

```js
//接受邀请
conversation.accept(localStream);
```

</br>

---

### reject

**定义**

```js
reject()
```

**说明**

拒绝邀请

**示例**

```js
//拒绝邀请
conversation.reject();
```

</br>

---

### close

**定义**

```js
close()
```

**说明**

挂断当前一对一视频通话

**示例**

```js
//离开一对一视频通话
conversation.close();
```

</br>

---

## 常量

### 事件

| 事件类型          | 说明                      |
| ----------------| ------------------------- |
| response        | 一对一视频通话状态变化触发。        |
| stream_received | 收到远端媒体流触发。         |
| closed          | Conversation 断开连接触发。 |
| error           | Conversation 连接失败触发。 |
| local_stats     | 获取本地媒体流统计信息。      |
| remote_stats    | 获取远端媒体流统计信息。    |

</br>

---

#### response

**参数**

| 参数名 | 说明 |
|---|---|
| callStatus | String 类型。表示一对一视频通话的状态，包括已接受(ACCEPTED)、已拒绝(REJECTED)、对方忙碌(BUSY)、请求超时(TIMEOUT)。|

**示例**

```js
//监听参与者加入失败事件
conversation.on('response', function(callStatus){
    switch (callStatus) {
        case 'ACCEPTED':
            console.log('accepted');
            break;
        case 'REJECTED':
            console.log('rejected');
            break;
        case 'BUSY':
            console.log('busy');
            break;
        case 'TIMEOUT':
            console.log('timeout');
            break;
        default:
            console.log('状态未识别');
            break;
    }
});
```

#### stream_received

**参数**

| 参数名 | 说明 |
|---|---|
| stream | [RemoteStream](/conversation/Web/api/remoteStream.html) 类型远端参与者发送的媒体流|

**示例**

```js
//监听远端参与者媒体流
conversation.on('stream_received', function(stream){
    console.log('remoteStream is :', stream);
});
```

#### closed

**示例**

```js
//监听断开事件
conversation.on('closed', function(){
    console.log('Conversation disconnected.');
});
```

</br>

---

#### error

**示例**

```js
//错误信息回调
conversation.on('error', function(error){
    console.log('Conversation error is' + error);
});
```

</br>

---

#### local_stats

**参数**

| 参数名 | 说明 |
|---|---|
| statistic | 本地视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率等|

**示例**

```js
//监听参与者加入事件
conversation.on('local_stats', function(statistic){
    console.log('local_stats is ' + statistic );
});
```

</br>

---

#### remote_stats

**参数**

| 参数名 | 说明 |
|---|---|
| statistic | 对端视频流统计信息，包括视频的宽、高、帧率、发送接收总大小、比特率、延迟等|

**示例**

```js
//监听参与者的断开事件
conversation.on('remote_stats', function(statistic){
    console.log('remote_stats is ' + statistic );
});
```

</br>

---
