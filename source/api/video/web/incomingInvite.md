
title: wilddog.video.IncomingInvite
---

Client 的 `invite` 事件回调函数的参数。

## 属性

### status

**类型**

```js
String
```

**说明**

邀请的状态，包括 "accepted", "rejected", "canceled", "failed", 和 "pending"。

| 状态 | 说明 |
|---|---|
| accepted | 邀请被接受。 |
| rejected | 邀请被拒绝。 |
| canceled | 邀请被取消。 |
| failed | 邀请失败。 |
| pending | 邀请中。 |

</br>

---

### from

**类型**

```js
String
```

**说明**

邀请发起方的 Wilddog ID。

</br>

---

### conversationId

**类型**

```js
String
```

**说明**

Conversation 的唯一标识 Id。

</br>

---

## 方法

### accept

**定义**

```js
accept(localStream)
```

**说明**

接受邀请。

**参数**

| 参数名 | 说明 |
|---|---|
| localStream | [wilddog.video.LocalStream](/api/video/web/localStream.html#wilddog-video-LocalStream) 类型。本地视频流。|

**示例**

```js
incomingInvite.accept(localStream)
    .then(function(conversation){
        //接受邀请成功，加入 Conversation
        ...
    });
```

</br>

---

### reject

**定义**

```js
reject()
```

**说明**

拒绝邀请。

**示例**

```js
//监听邀请事件
client.on('invite', function(incomingInvite){
    //拒绝邀请
    incomingInvite.reject();
});
```

</br>

---

## 常量

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| canceled | 邀请已被取消后触发。 |

</br>

---

#### canceled

**示例**

```js
//监听邀请事件
client.on('invite', function(incomingInvite){
    //监听邀请取消事件
    incomingInvite.on('canceled', function(){
        //邀请被取消
    });
});
```
