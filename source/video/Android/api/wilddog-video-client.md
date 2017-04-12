title: WilddogVideoClient
---

每个 WilddogVideo SDK 客户端全局只存在唯一单例 `WilddogVideoClient` 对象。根据不同的场景，用户可以使用`inviteToConversation()` 方法邀请其他用户进行一对一视频通话，或者使用 `connectToConference()` 方法进行多对多视频会议。

## 方法


### setInviteListener(WilddogVideoClient.Listener)

**定义**   

```java
void setInviteListener(WilddogVideoClient.Listener listener) 
```

**说明**

设置视频通话邀请监听。在使用 `inviteToConversation` 方法前需要先设置邀请监听,否则使用邀请功能会抛出 `IllegalStateException` 异常。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[WilddogVideoClient.Listener](/video/Android/api/wilddog-video-client-listener.html),视频通话邀请监听,监听当前邀请状态|

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

邀请其他人加入视频通话,对方接受邀请将创建一个新视频通话并在 `ConversationCallback` 回调中返回创建的视频通话。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|被邀请者的 Wilddog ID ,唯一标识被邀请者的身份|
|options|[ConnectOptions](/video/Android/api/connect-options.html) 对象,提供邀请加入视频通话相关参数|
|callback|[ConversationCallback](/video/Android/api/conversation-callback.html) 视频通话回调，视频通话建立成功后在 `onConversation` 方法中返回视频通话对象|

**返回值**

[OutgoingInvite](/video/Android/api/outgoing-invite.html)

**示例**

```java
    //participants 为传入的用户Wilddog ID 列表,目前预览版仅支持单人邀请
	ConnectOptions options = new ConnectOptions(localStream, "user data");
	OutgoingInvite outgoingInvite = client.inviteToConversation(participant, options, new ConversationCallback() {
        @Override
        public void onConversation(Conversation conversation, ConversationException exception) {
			if (conversation != null) {
				//对方接受邀请并成功建立视频通话，conversation不为空，exception为空
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
|options|[ConnectOptions](/video/Android/api/connect-options.html) 对象,提供邀请加入会议相关参数|
|listener|[Conference.Listener](/video/Android/api/conference-listener.html) 视频会议回调，返回会议相关状态，在回调方法中处理会议连接/连接失败/断连/用户加入/用户离开等事件|

**返回值**

[Conference](/video/Android/api/conference.html)

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
---

### dispose()

**定义**   

```java
public void dispose()
```

**说明**

释放WilddogVideoClient 持有的资源。


**示例**

```java
        client.dispose();

```

