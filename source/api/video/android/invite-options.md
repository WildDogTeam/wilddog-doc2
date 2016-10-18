title: InviteOptions
---

## 构造方法

**定义**   

```java
InviteOptions（ConversationMode mode,Set<String> participantId,LocalStream localStream）
```

**说明**

邀请加入会话的参数对象，参数为会话模式，参与者列表和本地视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|mode|[ConversationMode](/api/video/android/conversation-mode.html),会话模式,包括 `ConversationMode.P2P`,`ConversationMode.SERVER_BASED` 两种类型,P2P 模式下使用 P2P 连接方式,SERVER_BASED 模式下使用服务器中转连接方式。|
|participantId|Set<String>,参与者列表。列表内容为参与者的 Wilddog ID。|
|localStream|[LocalStream](/api/video/android/local-stream.html),会话发起人通过 `Video.createLocalStream` 获取的本地视频流。|

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

获取会话发起人的视频流。

**返回值**

[LocalStream](/api/video/android/local-stream.html)

**示例**

```java
	LocalStream localStream=options.getLocalStream();
```
