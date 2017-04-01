
title: wilddog.video.Conference
---

正在进行的多人视频会议。

## 属性

### localParticipant

**类型**

```js
wilddog.video.LocalParticipant
```

**说明**

Conference 中的本地参与者。

</br>

---

### participants

**类型**

```js
Map.<Participant.Id, Participant>
```

**说明**

当前 Conference 中除自身外的所有参与者。

</br>

---

### Id

**类型**

```js
String
```

**说明**

当前 Conference 的 ID。

</br>

---

### status

**类型**

```js
String
```

**说明**

当前 Conference 的状态。

**状态类型**

| 状态 | 说明 |
|---|---|
| connecting | String 类型，连接野狗实时视频服务器中。|
| connected | String 类型，连接野狗实时视频服务器成功。|
| disconnected | String 类型，与野狗实时视频服务器断开连接。|

</br>

---

### meetingCast

**类型**

```js
Object
```

**说明**

[meetingCast](/video/Web/api/meetingCast.html) 为直播推流功能的接口，拥有 start/switchParticipant/stop 三个方法。

## 方法

### disconnect

**定义**

```js
disconnect()
```

**说明**

离开当前的 Conference，会触发 `disconnected` 事件。

**示例**

```js
//离开会议
conference.disconnect();
```

</br>

---

## 常量

### 事件

| 事件类型 | 说明                            |
| -------- | ------------------------------- |
| connected | Client 与 Conference 连接成功触发。 |
| connect_failed | Client 与 Conference 连接失败触发。|
| disconnected | Client 与 Conference 断开连接触发。 |
| participant_connected | 有新的参与者加入触发。 |
| participant_disconnected | 有参与者离开触发。 |

</br>

---

#### connected

**参数**

| 参数名 | 说明 |
|---|---|
| conferenceId | String Conference 的唯一标识 ID。|

**示例**

```js
//监听参与者加入失败事件
conference.on('connected', function(conferenceId){
    console.log('Conference connect success, conferenceId is :', conferenceId);
});
```

#### connect_failed

**参数**

| 参数名 | 说明 |
|---|---|
| conferenceId | String 类型。Conference 的唯一标识 ID。|

**示例**

```js
//监听参与者加入失败事件
conference.on('connect_failed', function(conferenceId){
    console.log('Conference connect failed, conferenceId is :', conferenceId);
});
```

#### disconnected

**参数**

| 参数名 | 说明 |
|---|---|
| conferenceId | `String` 类型。断开的 Conference 的 ID。|

**示例**

```js
//监听断开事件
conference.on('disconnected', function(conferenceId){
    console.log('Conference ' + conferenceId + ' disconnected.');
});
```

</br>

---

#### participant_connected

**参数**

| 参数名 | 说明 |
|---|---|
| participant | [wilddog.video.Participant](/video/Web/api/participant.html) 类型。加入房间的 Participant 对象。|

**示例**

```js
//监听参与者加入事件
conference.on('participant_connected', function(participant){
    console.log('Participant ' + participant.Id + ' connected.');
});
```

</br>

---

#### participant_disconnected

**参数**

| 参数名 | 说明 |
|---|---|
| participant | [wilddog.video.Participant](/video/Web/api/participant.html) 类型。离开房间的 Participant 对象。|

**示例**

```js
//监听参与者的断开事件
conference.on('participant_disconnected', function(conferenceId){
    console.log('Participant ' + participant.Id + ' connected.');
});
```

</br>

---
