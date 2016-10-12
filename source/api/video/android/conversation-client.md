title: ConversationClient
---

<span id="ConversationClient"/>

每个 WilddogVideo SDK 客户端全局只存在唯一单例 `ConversationClient` 对象, `ConversationClient` 允许用户通过 `client.inviteToConversation()` 方法邀请其他人参与会话。在 `SERVER_BASED` 模式下,允许用户通过 `getMeetingCastAddon` 获取 `MeetingCastAddon` 对象,进行媒体流直播操作。

在使用 `ConversationClient` 对象前,需要对其进行初始化。

## 方法

### init()



**定义**   

static void init(SyncReference ref, CompleteListener listener)

**说明**

初始化 `ConversationClient` 类,在使用 `inviteToConversation` 方法之前要调用 `init` 方法对 `ConversationClient` 进行初始化,否则会抛出 `IllegalStateException` 异常。

**参数**

| 参数名 | 描述 |
|---|---|
|ref|[SyncReference](/api/sync/android/api.html#SyncReference)类型,野狗应用 Url 的引用。如果建立会话时使用 `SERVER_BASED` 模式,需要保证该引用的路径和控制面板中的交互路径一致|
|listener|初始化完成回调,初始化成功调用 `listener.onSuccess` 方法,失败调用 `onError` 方法|



**示例**

```java
	//初始化ConversationClient,mRef=WilddogSync.getReference().child([视频控制面板中配置的自定义根节点]);
	ConversationClient.init(mRef, new CompleteListener() {
		@Override
		public void onSuccess() {

		}

		@Override
		public void onError(String errorMsg) {

		}
	});
```

**** 

### setInviteListener(ConversationClient.Listener)



**定义**   

 void setInviteListener(ConversationClient.Listener listener) 

**说明**

设置邀请会话监听。在使用inviteToConversation方法前需要先设置会话邀请监听,否则使用邀请功能会抛出IllegalStateException异常。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[ConversationClient.Listener](/api/video/android/conversation-client.html),会话邀请监听,监听当前会话邀请状态|


**示例**

```java
	//设置邀请监听
	this.client.setInviteListener(new ConversationClient.Listener() {
        @Override
        public void onStartListeningForInvites(ConversationClient client) {

        }

        @Override
        public void onStopListeningForInvites(ConversationClient client) {

        }

        @Override
        public void onFailedToStartListening(ConversationClient client, ConversationException e) {

        }

        @Override
        public void onIncomingInvite(ConversationClient client, final IncomingInvite invite) {

        }

        @Override
        public void onIncomingInviteCanceled(ConversationClient client, IncomingInvite invite) {

        }
    });

```

**** 

### inviteToConversation(InviteOptions, ConversationCallback)



**定义**   

inviteToConversation(InviteOptions options, final ConversationCallback callback)

**说明**

邀请其他人加入会话,对方接受邀请将创建一个新会话并在 `ConversationCallback` 回调中返回创建的会议。

**参数**

| 参数名 | 描述 |
|---|---|
|options|[InviteOptions](/api/video/android/invite-options.html) 对象,提供会话相关参数|
|callback|[ConversationCallback](/api/video/android/conversation-callback.html)会话回调|

**返回值**

[OutgoingInvite](/api/video/android/outgoing-invite.html)

**示例**

```java
	//ConversationMode可以选择P2P和SERVER_BASED两种
    //participants 为传入的用户Wilddog ID 列表,目前预览版仅支持单人邀请
	InviteOptions options = new InviteOptions(ConversationMode.SERVER_BASED, participants, stream);
	OutgoingInvite outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {
		@Override
        public void onConversation(Conversation conversation, ConversationException exception) {
			if (conversation != null) {
				//对方接受邀请并成功建立会话,conversation不为空,exception为空
				//...
			} else {
				//对方拒绝时,exception不为空
			}

		}
    });

```

**** 

### getMeetingCastAddon(Conversation, MeetingCastStateListener)



**定义**   

getMeetingCastAddon(Conversation conversation, MeetingCastStateListener listener)

**说明**

从 `Client` 对象中获取 `MeetingCastAddon` ,使用MeetingCastAddon可以进行直播,切流以及停止直播操作 。此时的会话模式必须为`ConversationMode.SERVER_BASED`,P2P模式不支持直播流操作。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|,当前正在进行中的[Conversation](/api/video/android/conversation.html)对象,会话的模式只能为 `ConversationMode.SERVER_BASED` ,否则会抛出` ClassCastException`。|
|listener|详情参阅 [MeetingCastStateListener](/api/video/android/meeting-cast-listener.html)|

**返回值**

[MeetingCastAddon](/api/video/android/meeting-cast-addon.html)

**** 
