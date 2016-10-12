title: Conversation
---

<span id="Conversation" />


会话类接口,提供会话服务,使用 `Conversation` 接口创建和获取会话,根据传入的不同 `Conversation.Mode`,返回 `P2P` 模式或者 `SERVER_BASED` 模式会话实例。

## 方法

### setConversationListener(Conversation.Listener)



**定义**   

void setConversationListener(Conversation.Listener listener)

**说明**

为会话设置会话状态监听,当被邀请者接受或拒绝时会改变会话的状态,Video SDK 会触发 `Conversation.Listener` 的回调方法通知监听者。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|聊天会话监听[Conversation.Listener](/api/video/android/conversation-listener.html),参与者连接成功后会触发 onParticipantConnected 事件|


**示例**

```java
	//成功建立会话后,设置监听
	mConversation.setConversationListener(new Conversation.Listener() {
		@Override
		public void onParticipantConnected(Conversation conversation, Participant participant) {

		}

		@Override
		public void onFailedToConnectParticipant(Conversation conversation, Participant participant, ConversationException exception) {

		}

		@Override
		public void onParticipantDisconnected(Conversation conversation, Participant participant) {

		}

		@Override
		public void onConversationEnded(Conversation conversation, ConversationException exception) {

		}
	});

```

****

### invite(Set<String>)



**定义**   

void invite(Set<String> participantIdSet)

**说明**

在已建立的会话中,邀请其他人加入视频通话。

**参数**

| 参数名 | 描述 |
|---|---|
|participantIdSet| Set<String> ,受邀参与者列表,列表中的值为受邀参与者的 Wilddog ID|


**示例**

```java
	//Set<String> participants=new new HashSet<>();
	//participants.add("[被邀请者]");
	mConversation.invite(participants);
```

**** 


### disconnect()



**定义**   

void disconnect()

**说明**

关闭会话

**示例**

```java
	//需要离开会话时调用此方法,并做资源释放和其他自定义操作
	mConversation.disconnect();
```

****
