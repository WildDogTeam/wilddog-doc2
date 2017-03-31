
title: wilddog.video.Client
---

Client 实例是野狗实时视频的客户端，可以发起和加入视频通话或视频会议。

## 构造方法

**定义**

```js
wilddog.video.client()
```

**说明**

获取 [wilddog.video.Client](video/Web/api/wilddogVideoClient.html) 实例。

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
```

</br>

---

## 属性

### conversations

**类型**

```js
Map.<Conversation.Id, Conversation>
```

**说明**

Client 正在进行的 `Conversation` 集合。

</br>

---

### conferences

**类型**

```js
Map.<Conferences.Id, Conference>
```

**说明**

Client 加入的 `Conference` 集合。

</br>

---

### uid

**类型**

```js
String
```

**说明**

Client 的 Wilddog ID。

</br>

---

## 方法

### inviteToConversation

**定义**

```js
inviteToConversation(remoteUid, options)
```

**说明**

向指定的 Wilddog ID 发起 Conversation。

**参数**

| 参数名 | 说明 |
|---|---|
| remoteUid | `string` 类型。Conversation 接受方的 Wilddog ID。<br>[如何获取自身的 Wilddog ID](/video/Web/resources/tutorial.html#2-用户身份认证) |
| options | [ClientInviteConstraints](/video/Web/api/wilddogVideoClient.html#ClientConstraints) 类型。Client 发起 Conversation 需要的参数。|

**返回值**

[OutgoingInvite](video/Web/api/outgoingInvite.html)

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
//初始化 Client
client.inviteToConversation('123456789',{
    stream: lStream,
    userData: 'somethings'
}).then(function(conversation){
    // Conversation发起成功，得到 conversation 对象实例
})
```

</br>

---

### connectToConference

**定义**

```js
connectToConference(conferenceId, options)
```

**说明**

向指定的 Wilddog ID 发起 Conversation。

**参数**

| 参数名 | 说明 |
|---|---|
| conferenceId | `string` 类型。Conference 的唯一标识 ID , 由用户自由填写。 |
| options | [ClientConstraints](/video/Web/api/wilddogVideoClient.html#ClientConstraints) 类型。Client 发起 Conversation 需要的参数。|

**返回值**

[Conference](/video/Web/api/conference.html)

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
//进入 Conference
var conference = client.connectToConference('wilddogVideoRoom',{
    stream: lStream,
    userData: 'somethings'
})
```

</br>

---

## 常量

### ClientConstraints

Client 发起 Conversation 和进入 Conference 需要的参数。

**类型**

```js
Object
```

**参数**

| 参数名 | 说明 |
|---|---|
| userData | `string` 类型。可添加的自定义消息，对方在收到的邀请中可以获取。 |
| stream | [wilddog.video.LocalStream](/video/Web/api/localStream.html)类型。本地视频流对象。 |

</br>

---

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| invite   | 接收到某个 Wilddog ID 的 Conversation 邀请时触发。 |
| error    | 触发某种错误时触发。                     |

</br>

---

#### invite

**参数**

| 参数名 | 说明 |
|---|---|
| incomingInvite | [IncomingInvite](/api/video/web/incomingInvite.html) 类型。|

**示例**

```js
//监听邀请事件
client.on('invite', function(incomingInvite){
    //接受到邀请
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
client.on('error', function(error){
    //接受到错误
    console.log('Accepted an error ' + error.message);
});
```
