title: Conference
---

多人会议类。

## 属性

### getId()

**定义**   

```java
public String getId()
```

**说明**

获取当前会话 ID，此会话 ID 为不重复的字符串。


**返回值**

当前会话 ID。

---

### getLocalParticipant()

**定义**   

```java
public LocalParticipant getLocalParticipant()
```

**说明**

获取当前会话中的 '[LocalParticipant](/api/video/android/local-participant.html)' 对象，代表本地参与者。


**返回值**

当前会话中的 'LocalParticipant'。

---

### getParticipant()

**定义**   

```java
public Participant getParticipant()
```

**说明**

获取当前会话中的 '[Participant](/api/video/android/participant.html)' 对象,代表远端参与者。


**返回值**

当前会话中的 'Participant'。

---

### getStatus()

**定义**   

```java
public ConnectStatus getStatus()
```

**说明**

获取当前的会话状态。


**返回值**

当前会话状态[ConnectStatus](/api/video/android/connect-status.html)。

---

## 方法

### getMeetingCast(MeetingCastStateListener)

**定义**   

```java
public MeetingCast getMeetingCast(MeetingCastStateListener listener)
```

**说明**

获取当前会议直播插件，通过直播插件可以控制当前会话的直播相关功能。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|聊天会话监听[MeetingCastStateListener](/api/video/android/meeting-cast-listener.html),参与者连接成功后会触发 onParticipantConnected 事件|


**示例**

```java
	//成功建立会话后,设置监听
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

关闭会话

**示例**

```java
	//需要离开会话时调用此方法,释放 Conference 持有的资源
	mConference.disconnect();
```
