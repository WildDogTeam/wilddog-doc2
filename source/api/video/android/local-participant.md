title: LocalParticipant
---

<span id="Participant" />

## 构造方法

### LocalParticipant(String, LocalStream)

**定义**   

```java
public LocalParticipant(String participantId, LocalStream localStream)
```

**说明**

本地参与者对象,包含两个属性：参与者 ID 和本地视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,参与者 Wilddog ID|
|localStream|[LocalStream](/api/video/android/local-stream.html),本地获取的视频流|

**示例**

```java
    //localStream为通过createLocalStream方法获取的本地视频流
    LocalParticipant participant=new LocalParticipant("<Wilddog ID>",localStream);
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
