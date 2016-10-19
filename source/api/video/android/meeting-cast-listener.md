
title: MeetingCastStateListener
---

会话直播状态监听。

## 方法

### onStarted(String, Map<String,String >)

**定义**   

```java
void onStarted(String participantId, Map<String,String > urlMap)
```

**说明**

启用直播功能后,成功发布直播流后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,当前正在直播的流的发布者 Widdog ID|
|urlMap|Map<String,String>,直播地址,包含 rtmp 和 hls 两种类型的直播地址,rtmp地址 key 值为 "rtmp", hls地址 key 值为 "hls"|

<span id="onStarted" />
**示例**

```java
	meetingCastAddon = client.getMeetingCastAddon(mConversation, new MeetingCastStateListener() {
        @Override
        public void onStarted(String participantId, Map<String, String> urlMap) {

        }

        @Override
        public void onSwitchParticipant(String participantId) {

        }

        @Override
        public void onStopped() {

        }

        @Override
        public void onError(VideoException exception) {

        }
    });
```

</br>

---

### onSwitchParticipant(String)

**定义**   

```java
void void onSwitchParticipant(String participantId)
```

**说明**

开始直播后,切换直播中的视频流操作后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,当前正在直播的流的发布者 Widdog ID|

**示例**

参照[onStarted 示例](/api/video/android/meeting-cast-listener.html#onStarted)

</br>

---

### onCastDown()

**定义**   

```java
void onStopped()
```

**说明**

结束直播后触发。

**示例**

参照[onStarted 示例](/api/video/android/meeting-cast-listener.html#onStarted)

</br>

---

### onError(VideoException)

**定义**   

```java
void onError(VideoException exception)
```

**说明**

直播操作出现错误时调用。

**参数**

| 参数名 | 描述 |
|---|---|
|exception|String,直播操作发生错误的详细信息|


**示例**

参照[onStarted 示例](/api/video/android/meeting-cast-listener.html#onStarted)
