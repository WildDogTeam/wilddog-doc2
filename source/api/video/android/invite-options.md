title: ConnectOptions
---

## 构造方法

**定义**   

```java
InviteOptions（LocalStream localStream，String userData）
```

**说明**

视频通话和视频会议连接参数对象，包含本地视频流对象以及用户自定义数据。

**参数**

| 参数名 | 描述 |
|---|---|
|localStream|[LocalStream](/api/video/android/local-stream.html),视频通话和视频会议发起人通过 `Video.createLocalStream` 获取的本地视频流。|
|userData|String 用户自定义数据，用户可以在加入视频通话和视频会议时传递自定义字符串数据，在其他用户收到加入信息时可以解析自定义数据。|

</br>

---

## 属性

### getMode()

**定义**   

```java
ConversationMode getMode()
```

**说明**

返回 ConversationMode 。

**返回值**

[ConversationMode](/api/video/android/conversation-mode.html)枚举值

**示例**

```java
	ConversationMode mode=options.getMode();
```

</br>

---

### getParticipantId()

**定义**   

```java
Set<String> getParticipantId()
```

**说明**

返回参与者 ID 列表。

**返回值**

参与者 ID 列表,列表中的数据为不重复的 Wilddog ID。

**示例**

```java
	Set<String> participantSet=options.getParticipantId();
```

</br>

---

### getLocalStream()

**定义**   

```java
LocalStream getLocalStream()
```

**说明**

获取本地音频和视频流。

**返回值**

[LocalStream](/api/video/android/local-stream.html)

**示例**

```java
	LocalStream localStream=options.getLocalStream();
```
