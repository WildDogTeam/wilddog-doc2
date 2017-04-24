
title: MeetingCastStateListener
---

视频会议直播状态监听。

## 方法

### onMeetingCastStateChanged(Conference.MeetingCastStatus,String, Map&lt; String,String &gt;)

**定义**   

```java
void onMeetingCastStateChanged(Conference.MeetingCastStatus status,String participantId, Map< String,String > urlMap)
```

**说明**

直播状态发生改变时会触发 `onMeetingCastStateChanged` 方法，当任意参与者调用 `MeetingCast.Start()` 方法和 `MeetingCast.switchParticipant()` 方法时，如果直播服务器成功响应了调用请求则会触发所有参与者的 `onMeetingCastStateChanged` 方法，通知参与者当前直播状态发生改变。

**参数**

| 参数名 | 描述 |
|---|---|
|state|Conference.MeetingCastStatus,表示当前直播状态：`ON` 表示直播进行中，`OFF` 表示当前没有直播或者直播已经结束|
|participantId|String,当前正在直播的流的发布者 Widdog ID|
|urlMap|Map&lt;String,String&gt;,直播地址,包含 rtmp 和 hls 两种类型的直播地址,rtmp地址 key 值为 "rtmp", hls地址 key 值为 "hls"|

<span id="onStarted" />
**示例**

```java
	meetingCast = mConference.getMeetingCast(new MeetingCastStateListener() {
            @Override
            public void onMeetingCastStateChanged(Conference.MeetingCastStatus status, String participantId, Map<String, String> urlMap) {

            }
        });
```

</br>


