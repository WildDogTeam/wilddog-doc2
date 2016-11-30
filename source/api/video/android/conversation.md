title: Conversation
---

会话类，实现一对一的会话功能。

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

### setConversationListener(Conversation.Listener)

**定义**   

```java
void setConversationListener(Conversation.Listener listener)
```

**说明**

为会话设置会话状态监听,当被邀请者接受或拒绝时会改变会话的状态, Wilddog Video SDK 会触发 `Conversation.Listener` 的回调方法通知监听者。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|聊天会话监听[Conversation.Listener](/api/video/android/conversation-listener.html),参与者连接成功后会触发 onParticipantConnected 事件|


**示例**

```java
 @Override

    mConversation.setConversationListener(new Conversation.Listener() {
        @Override
        public void onConnected(Conversation conversation) {
                            
        }

        @Override
        public void onConnectFailure(Conversation conversation, VideoException exception) {

        }

        @Override
        public void onDisconnected(Conversation conversation, VideoException exception) {
        
        }

        @Override
        public void onParticipantConnected(Conversation conversation, Participant participant) {

        }

        @Override
        public void onParticipantDisconnected(Conversation conversation, Participant participant) {

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
	//需要离开会话时调用此方法，释放会话持有的相关资源
	mConversation.disconnect();
```
