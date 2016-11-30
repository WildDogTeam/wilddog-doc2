title: WilddogVideoClient
---

每个 WilddogVideo SDK 客户端全局只存在唯一单例 `WilddogVideoClient` 对象。根据不同的场景，用户可以使用`inviteToConversation()` 方法邀请其他用户进行一对一会话，或者使用 `connectToConference()` 方法进行多对多会议。

## 方法


### setInviteListener(WilddogVideoClient.Listener)

**定义**   

```java
void setInviteListener(WilddogVideoClient.Listener listener) 
```

**说明**

设置邀请会话监听。在使用 `inviteToConversation` 方法前需要先设置会话邀请监听,否则使用邀请功能会抛出 `IllegalStateException` 异常。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[WilddogVideoClient.Listener](/api/video/android/wilddog-video-client.html),会话邀请监听,监听当前会话邀请状态|

**示例**

```java
    //为client对象设置InviteListener ，监听邀请事件变化，在使用inviteToConversation 前必须先设置监听
    client.setInviteListener(new WilddogVideoClient.Listener() {
        @Override
        public void onIncomingInvite(WilddogVideoClient client, final IncomingInvite invite) {
                    
        }

        @Override
        public void onIncomingInviteCanceled(WilddogVideoClient client, IncomingInvite invite) {
                  
        }
    });


```

</br>

---

### inviteToConversation(String，InviteOptions, ConversationCallback)

**定义**   

```java
OutgiongInvite inviteToConversation(String participantId, ConnectOptions options, ConversationCallback callBack)
```

**说明**

邀请其他人加入会话,对方接受邀请将创建一个新会话并在 `ConversationCallback` 回调中返回创建的会议。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|被邀请者的 Wilddog ID ,唯一标识被邀请者的身份|
|options|[ConnectOptions](/api/video/android/connect-options.html) 对象,提供邀请加入会话相关参数|
|callback|[ConversationCallback](/api/video/android/conversation-callback.html) 会话回调，会话建立成功后在 `onConversation` 方法中返回会话对象|

**返回值**

[OutgoingInvite](/api/video/android/outgoing-invite.html)

**示例**

```java
    //participants 为传入的用户Wilddog ID 列表,目前预览版仅支持单人邀请
	ConnectOptions options = new ConnectOptions(localStream, "user data");
	OutgoingInvite outgoingInvite = client.inviteToConversation(participant, options, new ConversationCallback() {
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

</br>

---

### connectToConference(String, ConnectOptions, Conference.Listener)

**定义**   

```java
public Conference connectToConference(String conferenceId, ConnectOptions options, Conference.Listener listener)
```

**说明**

加入会议，异步返回会议对象，在 'Conference.Listener' 回调中返回会议状态。

**参数**

| 参数名 | 描述 |
|---|---|
|conferenceId|要加入的 Conference ID ,唯一标识加入的会议|
|options|[ConnectOptions](/api/video/android/connect-options.html) 对象,提供邀请加入会议相关参数|
|listener|[Conference.Listener](/api/video/android/conference-listener.html) 会话回调，返回会议相关状态，在回调方法中处理会议连接/连接失败/断连/用户加入/用户离开等事件|

**返回值**

[Conference](/api/video/android/conference.html)

**示例**

```java
	ConnectOptions options = new ConnectOptions(localStream, <用户自定义数据>);
	Conference conference = client.connectToConference(conversationId, options, new Conference.Listener() {
            @Override
            public void onConnected(Conference conference) {
                Log.e(TAG, "onConnected:" + conference);
            }

            @Override
            public void onConnectFailed(Conference conference, VideoException exception) {
                Log.e(TAG, "onConnectFailed:" + exception);
            }

            @Override
            public void onDisconnected(Conference conference, VideoException exception) {
                Log.e(TAG, "onDisconnected:" + exception);
            }

            @Override
            public void onParticipantConnected(Conference conference, final Participant participant) {
                Log.e(TAG, "onParticipantConnected:" + participant.getParticipantId());
            }

            @Override
            public void onParticipantDisconnected(Conference conference, Participant participant) {
                Log.e(TAG, "onParticipantDisconnected:" + participant.getParticipantId());
            }
        });

```

</br>


