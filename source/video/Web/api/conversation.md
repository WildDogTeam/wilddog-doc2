
title: wilddog.video.Conversation
---

正在进行的视频通话。

## 属性

### localParticipant

**类型**

```js
wilddog.video.LocalParticipant
```

**说明**

Conversation 中的本地参与者。

</br>

---

### participant

**类型**

```js
Map.<Participant.Id, Participant>
```

**说明**

当前 Conversation 中远端的参与者。

</br>

---

### Id

**类型**

```js
String
```

**说明**

当前 Conversation 的唯一标识 ID。

</br>

---

### status

**类型**

```js
String
```

**说明**

当前 Conversation 的状态。

**状态类型**

| 状态 | 说明 |
|---|---|
| connecting | String 类型，连接野狗实时视频服务器中。|
| connected | String 类型，连接野狗实时视频服务器成功。|
| disconnected | String 类型，与野狗实时视频服务器断开连接。|

</br>

---

## 方法

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
| connected | Client 与 Conversation 连接成功触发。 |
| connect_failed | Client 与 Conversation 连接失败触发。|
| disconnected | Client 与 Conversation 断开连接触发。 |
| participant_connected | 有新的参与者加入触发。 |
| participant_disconnected | 有参与者离开触发。 |

</br>

---

#### connected

**参数**

| 参数名 | 说明 |
|---|---|
| conversationId | String 类型。Conversation 的唯一标识 ID。|

**示例**

```js
//监听参与者加入失败事件
conversation.on('connected', function(conversationId){
    console.log('Conversation connect success, conversationId is :', conversationId);
});
```

#### connect_failed

**参数**

| 参数名 | 说明 |
|---|---|
| conversationId | String 类型。Conversation 的唯一标识 ID。|

**示例**

```js
//监听参与者加入失败事件
conversation.on('connect_failed', function(conversationId){
    console.log('Conversation connect failed, conversationId is :', conversationId);
});
```

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
    console.log('Participant ' + participant.Id + ' connected.');
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
    console.log('Participant ' + participant.Id + ' connected.');
});
```

</br>

---
