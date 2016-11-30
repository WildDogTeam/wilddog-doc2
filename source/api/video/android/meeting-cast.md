title: MeetingCast
---

会议直播插件,通过 `MeetingCast` 对象对当前会议的视频流进行直播/切换视频流/结束直播的操作。
每个操作都有一个带有 `CompleteListener` 参数的重载方法，如果执行失败则会触发回调中的 `onCompleted` 方法并返回执行失败的错误信息;执行成功时会触发 `MeetingCastStateListener` 的`onMeetingCastStateChanged`方法，不再触发 `onCompleted` 方法。
如果对执行的错误信息不敏感，可以使用不带 `CompleteListener` 参数的方法。

## 属性

### getCastUrlMap()

**定义**   

```java
Map<String, String> getCastUrlMap()
```

**说明**

获取当前 `MeetingCast` 的直播地址。

**返回值**

Map 类型对象，直播地址列表。包含 rtmp 和 hls 两种类型的直播地址，直播地址的key值分别为 `rtmp`/`hls` 。

</br>

---

### getStatus()

**定义**   

```java
public MeetingCastStatus getStatus()
```

**说明**

获取当前 `MeetingCast` 的直播状态。

**返回值**

[MeetingCastStatus](/api/video/android/meeting-cast-status.html)类型对象，代表当前直播状态。

</br>

---

### getCastingParticipantId()

**定义**   

```java
public String getCastingParticipantId()
```

**说明**

获取当前 `MeetingCast` 的直播中的视频流的发布者 Wilddog ID。

**返回值**

当前直播中的视频流的发布者 Wilddog ID 。

</br>

---


## 方法

### start(String,CompleteListener)

**定义**   

```java
void start(String participantId,CompleteListener listener)
```

**说明**

直播当前会话中某个参与者发送的视频流，如果发生错误则在回调中返回错误原因，如果执行成功则会触发 `MeetingCastStateListener` 的 `onMeetingCastStateChanged`方法，不会触发 `CompleteListener` 的回调方法。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,需要直播的视频流的发布者的 Wilddog ID|
|CompleteListener|[CompleteListener](/api/video/android/complete-listener.html),事件完成回调，事件完成后会触发 `onCompleted` 方法，如回调方法的 `VideoException` 参数不为空，则表示 `start` 操作失败，详细错误信息在 `VideoException` 中给出|


**示例**

```java
	//先获取到 `meetingCast` 对象,然后发布直播流
	meetingCast.start("<需要直播的视频发布者Wilddog ID>"，new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {

        }
    });
```

</br>

---
### start(String)

**定义**   

```java
void start(String participantId)
```

**说明**

直播当前会话中某个参与者发送的视频流,等同于调用 `start(participantId,null)`。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,需要直播的视频流的发布者的 Wilddog ID|


**示例**

```java
	//先获取到 `meetingCast` 对象,然后发布直播流
	meetingCast.start("<需要直播的视频发布者Wilddog ID>");
```

</br>

---

### switchParticipant(String，CompleteListener)

**定义**   

```java
void switchParticipant(String participantId, CompleteListener listener)
```

**说明**

切换当前直播的视频流为另一位参与者发布的视频流，如果发生错误则在回调中返回错误原因，如果执行成功则会触发 `MeetingCastStateListener` 的 `onMeetingCastStateChanged`方法，不会触发 `CompleteListener` 的回调方法。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,需要切换直播的视频流的发布者的 Wilddog ID|
|CompleteListener|[CompleteListener](/api/video/android/complete-listener.html),事件完成回调，事件完成后会触发 `onCompleted` 方法，如回调方法的 `VideoException` 参数不为空，则表示 `switchParticipant` 操作失败，详细错误信息在 `VideoException` 中给出|

**示例**


```java
	//切换直播流
	meetingCast.switchParticipant("<需要切换的视频发布者Wilddog ID>"，new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {

        }
    });
```

</br>

---

### switchParticipant(String)

**定义**   

```java
void switchParticipant(String participantId)
```

**说明**

切换当前直播的视频流为另一位参与者发布的视频流,等同于调用 `switchParticipant(participantId,null)`。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,需要切换直播的视频流的发布者的 Wilddog ID|

**示例**


```java
	//切换直播流
	meetingCast.switchParticipant("<需要切换的视频发布者Wilddog ID>");
```

</br>

---

### stop(CompleteListener)

**定义**   

```java
void stop(CompleteListener listener)
```

**说明**

结束当前直播，如果发生错误则在回调中返回错误原因，如果执行成功则会触发 `MeetingCastStateListener` 的 `onMeetingCastStateChanged`方法，不会触发 `CompleteListener` 的回调方法。

**示例**


```java
	//结束直播
	meetingCast.stop(new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {

        }
    });
```
</br>

---

### stop()

**定义**   

```java
void stop()
```

**说明**

结束当前直播，等同于调用 `stop(null)`。

**示例**

```java
	//结束直播
	meetingCast.stop();
```
