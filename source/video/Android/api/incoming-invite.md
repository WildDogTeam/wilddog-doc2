title: IncomingInvite
---

当有人邀请其他人加入视频通话时,被邀请者会接受到邀请信息并返回一个 `IncomingInvite` 对象,通过 `InconmingInvite` 对象可以接受（ `accept` ）或拒绝（ `reject` ）邀请。在接受邀请的ConversationCallback中可以获取视频通话相关信息。

## 属性

### getFromParticpantId()

**定义**

```java
String getFromParticpantId()
```

**说明**

邀请者的 Wilddog ID ，表明这个邀请来自哪个用户。

**返回值**

邀请者的 Wilddog ID 的字符串。


**示例**

```java
	//获取邀请者的 Wilddog ID 。
	String fromParticpantId = incomingInvite.getFromParticpantId();
```

</br>

---
### getConversationId()

**定义**

```java
String getConversationId()
```

**说明**

表示邀请参加的会议的编号。

**返回值**

邀请参加的会议的编号的字符串。

**示例**

```java
	//获取参加的会议的编号 。
	String conversationId = incomingInvite.getConversationId();
```

</br>

---
### getStatus()

**定义**

```java
String getStatus()
```

**说明**

表示当前邀请的状态。

**返回值**

当前邀请状态的字符串。

**示例**

```java
	//获取当前邀请的状态 。
	String status = incomingInvite.getStatus();
```

</br>

---
### getUserData()

**定义**

```java
String getUserData()
```

**说明**

邀请者发送邀请时携带的自定义数据。

**返回值**

邀请者发送邀请时携带的自定义数据的字符串。

**示例**

```java
	//获取邀请者发送邀请时携带的自定义数据 。
	String userData = incomingInvite.getUserData();
```

</br>

---


## 方法

### accpet(LocalStream,ConversationCallback)

**定义**   

```java
void accpet(LocalStream localStream,ConversationCallback callback)
```

**说明**

参与者收到加入视频通话邀请并接受视频通话邀请。

**参数**

| 参数名 | 描述 |
|---|---|
|localStream|[LocalStream](/video/Android/api/local-stream.html),被邀请者通过 `Video.createLocalStream` 获取的本地视频流|
|callback|[ConversationCallback](/video/Android/api/conversation-callback.html),视频通话回调函数,接受时可在 `callBack.onConversation()` 方法中获取到 `conversation` 对象|


**示例**

```java
	//接受邀请
	//localStream=video.createLocalStream();
	incomingInvite.accept(localStream, new ConversationCallback() {
        @Override
        public void onConversation(Conversation conversation, VideoException exception) {
            //对方接受邀请并成功建立视频通话,conversation不为空,exception为空
            if (conversation != null) {
                mConversation = conversation;
                //获取到conversation后,设置ConversationListener
                mConversation.setConversationListener(new Conversation.Listener() {
                    //...
                });

            } else {
                //处理视频通话建立失败逻辑
            }
        }
    });

```

</br>

---

### reject()

**定义**   

```java
void reject()
```

**说明**

收到加入视频通话邀请的参与者,拒绝视频通话邀请。

**示例**

```java
	//拒绝邀请
	incomingInvite.reject();
```

</br>

---
