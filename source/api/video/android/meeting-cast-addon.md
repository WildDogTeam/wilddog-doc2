title: MeetingCastAddon
---

<span id="MeetingCastAddon"/>

会议直播插件,通过 `MeetingCastAddon` 对象对当前会议的视频流进行直播/切换视频流/结束直播的操作。

## 方法

### castUp(String)



**定义**   

void castUp(String castUid)

**说明**

直播当前会话中某个参与者发送的视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,需要直播的视频流的发布者的 Wilddog ID|


**示例**

参照[onCastUp](/api/video/android/meeting-cast-listener.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//先获取到 `meetingCastAddon` 对象,然后发布直播流
	meetingCastAddon.castUp("<需要直播的视频发布者Wilddog ID>");
```

**** 

### castChange(String)



**定义**   

void castChange(String castUid)

**说明**

切换当前直播的视频流为另一位参与者发布的视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,需要切换直播的视频流的发布者的 Wilddog ID|


**示例**

参照[onCastUp](/api/video/android/meeting-cast-listener.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//切换直播流
	meetingCastAddon.castChange("<需要切换的视频发布者Wilddog ID>");
```

**** 

### castDown()



**定义**   

void castDown()

**说明**

结束当前直播。

**示例**

参照[onCastUp](/api/video/android/meeting-cast-listener.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//结束直播
	meetingCastAddon.castDown();
```

