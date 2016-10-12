
title: wilddog.video.Conversation
---

正在进行的会话。

## 属性

### localStream

**类型**

```js
wilddog.video.LocalStream
```

**说明**

Conversation 中的本地媒体流。

</br>

---

### participants

**类型**

```js
Map.<Participant.participantId, Participant>
```

**说明**

当前 Conversation 中除自身外的所有参与者。

</br>

---

### conversationId

**类型**

```js
String
```

**说明**

当前 Conversation 的 ID。

</br>

---

### mode

**类型**

```js
String
```

**说明**

当前 Conversation 的模式。

</br>

---

## 方法

### invite

**定义**

```js
invite(participantId)
```

**说明**

邀请其他用户加入当前的 Conversation。

**参数**

| 参数名 | 说明 |
|---|---|
| participantId | `Array.<String>` 或 `String` 类型。被邀请者的 Wilddog ID。 |

**示例**

```js
//邀请wilddog ID为'123456789' 和 '987654321'的用户加入 Conversation
conversation.invite(['123456789', '987654321']);
```

</br>

---

### disconnect

**定义**

```js
disconnect()
```

**说明**

离开当前的 Conversation，会触发 `disconnected` 事件。

**示例**

```js
//离开会议
conversation.disconnect();
```

</br>

---

## 常量

### 事件

| 事件类型 | 说明                            |
| -------- | ------------------------------- |
| disconnected | Client 与 Conversation 断开触发。 |
| participant_connected | 有新的参与者加入触发。 |
| participant_disconnected | 有参与者离开触发。 |
| participant_failed | 有参与者加入失败触发。|

</br>

---

#### disconnected

**参数**

| 参数名 | 说明 |
|---|---|
| conversationId | `String` 类型。断开的 Conversation 的 ID。|

**示例**

```js
//监听断开事件
conversation.on('disconnected', function(conversationId){
    console.log('Conversation ' + conversationId + ' disconnected.');
});
```

</br>

---

#### participant_connected

**参数**

| 参数名 | 说明 |
|---|---|
| participant | [wilddog.video.Participant](/api/video/web/participant.html) 类型。加入房间的 Participant 对象。|

**示例**

```js
//监听参与者加入事件
conversation.on('participant_connected', function(participant){
    console.log('Conversation ' + participant.participantId + ' connected.');
});
```

</br>

---

#### participant_disconnected

**参数**

| 参数名 | 说明 |
|---|---|
| participant | [wilddog.video.Participant](/api/video/web/participant.html) 类型。离开房间的 Participant 对象。|

**示例**

```js
//监听参与者的断开事件
conversation.on('participant_disconnected', function(conversationId){
    console.log('Conversation ' + participant.participantId + ' connected.');
});
```

</br>

---

#### participant_failed

**参数**

| 参数名 | 说明 |
|---|---|
| participant | [wilddog.video.Participant](/api/video/web/participant.html) 类型。尝试加入房间的 Participant 对象。|

**示例**

```js
//监听参与者加入失败事件
conversation.on('participant_failed', function(conversationId){
    console.log('Conversation ' + participant.participantId + ' connected.');
});
```


