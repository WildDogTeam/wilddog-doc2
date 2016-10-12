
title: wilddog.video.Client
---

Client 实例可以发起和加入 Conversation。

## 构造器

**定义**

```js
wilddog.video.client()
```

**说明**

获取 [wilddog.video.Client](/api/video/web/wilddogVideoClient.html) 实例。

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
Map.<Conversation.conversationId, Conversation>
```

**说明**

Client 创建的 Conversation 集合。

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

### addons

**类型**

[wilddog.video.Addons](/api/video/web/addons.html)

**说明**

插件对象的集合。

</br>

---

## 方法

### init

**定义**

```js
init(options)
```

**说明**

Client 对象实例的初始化方法。

**参数**

| 参数名 | 说明 |
|---|---|
| options | [ClientInitConstraints](/api/video/web/wilddogVideoClient.html#ClientInitConstraints) 类型。Client 初始化需要的参数。|

**返回值**

`Promise`

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
//初始化 Client
client.init({ref:ref, user:user})
    .then(function(){
        console.log("Init success !");
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    });
```

</br>

---

### inviteToConversation

**定义**

```js
inviteToConversation(options)
```

**说明**

向指定的 Wilddog ID 发起 Conversation。

**参数**

| 参数名 | 说明 |
|---|---|
| options | [ClientInviteConstraints](/api/video/web/wilddogVideoClient.html#ClientInviteConstraints) 类型。Client 发起 Conversation 需要的参数。|

**返回值**

[OutgoingInvite](/api/video/web/outgoingInvite.html)

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
//初始化 Client
Client.init({ref:ref, user:user})
    .then(function(){
        return client.inviteToConversation({
            mode:'p2p', 
            participantId:'12345678', 
            localStream: lStream
        })
    })
    .then(function(conversation){
        // Conversation发起成功，得到 conversation 对象实例
    })
```

</br>

---

## 常量

### ClientInitConstraints

Client 初始化需要的参数。

**类型**

```js
Object
```

**参数**

| 参数名 | 说明 |
|---|---|
| ref | [wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference) 类型。`wilddog.sync.Reference` 对象实例。|
| user | [wilddog.User](/api/auth/web/api.html#wilddog-User) 类型。auth 状态变为登录状态时传回的 user 对象。|

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  只有 `wilddog.sync.Reference` 对象实例对应的路径相同的 Client 间才能发起和建立 Conversation。Server\-based 模式下，该路径需要和控制面板中设置的交互路径相同。
</blockquote>

</br>

---

### ClientInitConstraints

Client 发起 Conversation 需要的参数。

**类型**

```js
Object
```

**参数**

| 参数名 | 说明 |
|---|---|
| mode | `string` 类型。表示 Conversation 的模式，可选择 `P2P` 或 `server_based`。<br>[两种模式的区别](/guide/video/core.html#Conversation) |
| participantId | `string` 类型。Conversation 接受方的 Wilddog ID。<br>[如何获取自身的 Wilddog ID](/resources/video/web/tutorial.html#2-用户身份认证) |
| localStream | [wilddog.video.LocalStream](/api/video/web/localStream.html)类型。本地视频流对象。 |

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

