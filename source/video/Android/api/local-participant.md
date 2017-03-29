title: LocalParticipant
---

代表视频通话和会议的本地参与者。

<span id="Participant" />

## 属性

### getParticipantId()

**定义**   

```java
String getParticipantId()
```

**说明**

获取参与者 Wilddog ID。

**返回值**

`String` 参与者 Wilddog ID 字符串。

</br>

---

### getLocalStream()

**定义**   

```java
LocalStream getLocalStream()
```

**说明**

获取本地视频流，此视频流是通过 `createLocalStream` 方法创建的本地视频流。

**返回值**

[LocalStream](/api/video/android/local-stream.html)
