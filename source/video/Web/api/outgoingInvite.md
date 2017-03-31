
title: wilddog.video.OutgoingInvite
---

`wilddog.client.inviteToConversation` 的返回值，代表发出的 Conversation 邀请。

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

### to

**类型**

```js
String
```

**说明**

邀请接收方的 Wilddog ID。

</br>

---

### conversationId

**类型**

```js
String
```

**说明**

Conversation 的 ID。

</br>

---

### conversation

**类型**

```js
Object
```

**说明**

对方接受邀请后创建的 [wilddog.video.Conversation](/video/Web/api/conversation.html)

</br>

---

## 方法

### cancel

**定义**

```js
cancel()
```

**说明**

取消该邀请。邀请状态为 `pending` 时有效。取消后，邀请状态变为 `canceled`。

**示例**

```js
//向 Wilddog ID 为 12345678 的用户发起 Conversation，lStream 为之前调用 createStream 获得的 LocalStream 对象
var outgoing = client.inviteToConversation({mode:'p2p', participantId:'12345678', localStream: lStream});
//取消邀请
outgoing.cancel();
```

</br>

---

## 常量

### 事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| accepted | 对方已接受邀请后触发。 |
| rejected | 对方已拒绝邀请后触发。 |
| failed | 邀请失败后触发。 |
| canceled | 邀请已被取消后触发。 |

</br>

---

**accepted**

**示例**

```js
//监听接受邀请事件
outgoing.on('accepted', function(){
    //接受邀请
    console.log('An invite to ' + outgoing.to + ' accepted.');
});
```

</br>

---

**rejected**

**示例**

```js
//监听拒绝邀请事件
outgoing.on('rejected', function(){
    //拒绝邀请
    console.log('An invite to ' + outgoing.to + ' rejected.');
});
```

</br>

---

**failed**

**示例**

```js
//监听邀请失败事件
outgoing.on('failed', function(){
    //邀请失败
    console.log('An invite to ' + outgoing.to + ' failed.');
});
```

</br>

---

**canceled**

**示例**

```js
//监听取消邀请事件
outgoing.on('canceled', function(){
    //取消邀请
    console.log('An invite to ' + outgoing.to + ' canceled.');
});
```
