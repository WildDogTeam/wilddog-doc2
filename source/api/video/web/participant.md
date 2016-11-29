title: wilddog.video.Participant
---

会话参与者。

## 属性

### Id

**类型**

```js
String
```

**说明**

Participant 的 ID。

</br>

---

### stream

**类型**

```js
wilddog.video.RemoteStream
```

**说明**

Participant 的媒体流。

</br>

---

## 常量

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| streamAdded | 收到参与者的媒体流后触发。 |
| error | 参与者发送媒体流失败时触发。 |

</br>

---

#### streamAdded

**参数**

| 参数名 | 说明 |
|---|---|
| stream | [remoteStream](/api/video/web/remoteStream.html) 类型。|

**示例**

```js
//监听邀请事件
participant.on('streamAdded', function(stream){
    //收到媒体流
    console.log('Accepted an invite from ' + incomingInvite.from);
});
```

</br>

---

#### error

**参数**

| 参数名 | 说明 |
|---|---|
| error | `Error` 类型。|

**示例**

```js
//监听错误事件
participant.on('error', function(error){
    //接受到错误
    console.log('Accepted an error ' + error.message);
});
```

</br>

---
