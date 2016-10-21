
title: wilddog.video.MeetingCast
---

MeetingCast 插件，为 Conversation 提供直播功能。

## 属性

### isStarted

**类型**

```js
Boolean
```

**说明**

当前 Conversation 是否正在直播。

| 状态 | 说明 |
|---|---|
| true | 正在直播。 |
| false | 停止直播。 |

</br>

---

### currentParticipant

**类型**

```js
String
```

**说明**

当前 Conversation 中正在直播的 Participant 的 ID。

</br>

---

## 方法

### start

**定义**

```js
start(participantId)
```

**说明**

开启直播。

**参数**

| 参数名 | 说明 |
|---|---|
| participantId | `String` 类型。直播者的 Wilddog ID。 |

**返回**

Promise.<[CastUrls](/api/video/web/meetingCast.html#CastUrls)>

**示例**

```js
//使用获取到的meetingCast开启直播，直播者为会议中ID为'123456789'的参与者
meetingCast.start('123456789')
    .then(function(castUrls){
        //获取直播地址集合
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

</br>

---

### switchParticipant

**定义**

```js
switchParticipant(participantId)
```

**说明**

切换直播者。

**参数**

| 参数名 | 说明 |
|---|---|
| participantId | `String` 类型。新直播者的 Wilddog ID。 |

**返回**

`Promise`

**示例**

```js
//使用获取到的meetingCast切换直播者，新直播者为会议中ID为'987654321'的参与者
meetingCast.switchParticipant('987654321')
    .then(function(){
        //切换成功
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

</br>

---

### stop

**定义**

```js
stop()
```

**说明**

关闭直播。

**参数**

| 参数名 | 说明 |
|---|---|
| participantId | `String` 类型。新直播者的 Wilddog ID。 |

**返回**

`Promise`

**示例**

```js
//使用获取到的meetingCast关闭直播
meetingCast.stop()
    .then(function(){
        //关闭直播成功
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

---

## 常量

### CastUrls

**类型**

```js
Object
```

**参数**

| 参数名 | 说明 |
|---|---|
| hlsUrl | `String` 类型。HLS 直播地址。|
| rtmpUrl | `String` 类型。RTMP 直播地址。|
