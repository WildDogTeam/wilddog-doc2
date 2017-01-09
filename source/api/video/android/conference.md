title: Conference
---

多人视频会议类。

## 属性

### getId()

**定义**   

```java
public String getId()
```

**说明**

获取当前视频会议 ID，此视频会议 ID 为不重复的字符串。


**返回值**

当前视频会议 ID。

---

### getLocalParticipant()

**定义**   

```java
public LocalParticipant getLocalParticipant()
```

**说明**

获取当前视频会议中的 '[LocalParticipant](/api/video/android/local-participant.html)' 对象，代表本地参与者。


**返回值**

当前视频会议中的 'LocalParticipant'。

---

### getParticipants()

**定义**   

```java
public Set<Participant> getParticipants()
```

**说明**

获取当前视频会议中的 '[Participant](/api/video/android/participant.html)' 对象,代表所有远端参与者。


**返回值**

当前视频会议中远端的'Participant'集合。

---

### getStatus()

**定义**   

```java
public ConnectStatus getStatus()
```

**说明**

获取当前的视频会议状态。


**返回值**

当前视频会议状态[ConnectStatus](/api/video/android/connect-status.html)。

---

## 方法

### getMeetingCast(MeetingCastStateListener)

**定义**   

```java
public MeetingCast getMeetingCast(MeetingCastStateListener listener)
```

**说明**

获取当前会议直播插件，通过直播插件可以控制当前视频会议的直播相关功能。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|视频会议监听[MeetingCastStateListener](/api/video/android/meeting-cast-listener.html),参与者连接成功后会触发 onParticipantConnected 事件|


**示例**

```java
	//成功建立视频会议后,设置监听
    meetingCast = mConference.getMeetingCast(new MeetingCastStateListener() {
        @Override
        public void onMeetingCastStateChanged(String state, String participantId, Map<String, String> urlMap) {

        }
    });

```

</br>

---


### disconnect()

**定义**   

```java
void disconnect()
```

**说明**

关闭视频会议

**示例**

```java
	//需要离开视频会议时调用此方法,释放 Conference 持有的资源
	mConference.disconnect();
```
