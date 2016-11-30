title: Participant
---

<span id="Participant" />

## 构造方法

### Participant(String, RemoteStream)

**定义**   

```java
Participant(String participantId, RemoteStream remoteStream) 
```

**说明**

参与者对象,包含两个属性参与者 ID 和远端视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,参与者 Wilddog ID|
|remoteStream|[RemoteStream](/api/video/android/remote-stream.html),参与者发送的远端视频流|

**示例**

```java
	Participant participant=new Participant("<Wilddog ID>",new RemoteStream());
```

</br>

---

## 属性

### getParticipantId()

**定义**   

```java
String getParticipantId()
```

**说明**

获取参与者 Wilddog ID

**返回值**

`String` 参与者 Wilddog ID 字符串

</br>

---

### getRemoteStream()

**定义**   

```java
RemoteStream getRemoteStream()
```

**说明**

获取远端视频流。

**返回值**

[RemoteStream](/api/video/android/remote-stream.html)
