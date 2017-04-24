
title: wilddog.video.MeetingCast
---

MeetingCast 插件，为 Conference 提供直播功能。

## 属性

### isStarted

**类型**

```js
String
```

**说明**

当前 Conference 是否正在直播。

| 状态 | 说明 |
|---|---|
| on | 正在直播。 |
| off | 未直播。 |

</br>

---

### anchor

**类型**

```js
String
```

**说明**

当前 Conference 中正在直播的 Participant 的 ID。

</br>

---

### play

**类型**

```js
Object
```

**说明**

包含直播拉流的地址。

| 属性 | 说明 |
|---|---|
| rtmp | String类型。 RTMP 格式的拉流地址，在 H5 页面中播放的视频流格式。 |
| hls | String类型。 HLS 格式的拉流地址，在移动端播放的视频流格式。 |

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

`Promise`

**示例**

```js
//使用获取到的meetingCast开启直播，直播者为会议中ID为'123456789'的参与者
meetingCast.start('123456789')
    .then(function(){
        //成功开启直播
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

### onStateChanged

**定义**

```js
onStateChanged()
```

**说明**

监听 Conference 中直播状态的改变。

**返回**

Promise.<meetingCast>

**示例**

```js
//监听 conference 中直播状态的变化
meetingCast.onStateChanged(function(meetingCast) {
    console.log('meetingCast status changed:');
    console.log('isStarted:', meetingCast.isStarted);
    console.log('anchor:', meetingCast.anchor);
    console.log('play address: rtmp:', meetingCast.play.rtmp, ' hls:', meetingCast.play.hls);
})
```

</br>

---
