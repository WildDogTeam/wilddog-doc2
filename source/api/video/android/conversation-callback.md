title: ConversationCallback
---

<span id="ConversationCallback" />


会话回调,创建会话时会通过 `onConversation`方法传递会话实例对象或错误信息。

## 方法

### onConversation(Conversation, ConversationException) 



**定义**   

void onConversation(Conversation conversation, ConversationException exception) 

**说明**

创建会话时通过此接口传递Conversation和ConversationException。

* 会话创建成功 传递 `conversation` 对象,`ConversationException` 为空

* 会话创建失败 `conversation` 为 `null`,传递错误信息对象 `ConversationException`

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/conversation.html),会话对象|
|exception|[ConversationException](/api/video/android/conversation-exception.html),会议异常对象|


**示例**

```java

	//mConversation为已经建立的会话
	mConversation.setConversationListener(new Conversation.Listener() {
		@Override
		public void onParticipantConnected(Conversation conversation, Participant participant) {
			RemoteStream remoteStream = participant.getRemoteStream();
			remoteStream.attach(remoteCallbacks);
		}

		@Override
		public void onFailedToConnectParticipant(Conversation conversation, Participant participant,ConversationException exception) {
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
