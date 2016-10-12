
title: Video
---
<span id="Video" />

`Video` 对象是 WilddogVideo SDK 的核心,负责创建 `ConversationClient` 对象以及创建本地视频流。

`Video` 对象为单例,维护着视频 SDK 全局上下文数据,每次通过 `getInstance()` 方法返回同一实例对象。在使用 WilddogVideo SDK 前,需要对 `Video` 对象进行初始化。

## 方法

### initializeWilddogVideo(Context)



**定义**   

static void initializeWilddogVideo(Context context)

**说明**

使用 Video 类之前需要对其进行初始化操作,调用 `initializeWilddogVideo` 方法初始化 `Video`。若使用前未调用初始化则抛出 `IllegalArgumentException`。

**参数**

| 参数名 | 描述 |
|---|---|
|context|Android 应用 `Application Context`,通常使用 `getApplicationContext()` 方法获取|



**示例**

```java
	Video.initializeWilddogVideo(getApplicationContext());
```

**** 

### getInstance()



**定义**   

static Video getInstance()

**说明**

负责创建 `Video` 对象,如已存在实例对象则直接返回,如不存在则创建一个新的 `Video` 对象。

**返回值**

[Video](/api/video/android/api.html#Video)

**示例**

```java
	Video video = Video.getInstance();
```

**** 

### getClient()



**定义**   

ConversationClient getClient()

**说明**

通过本方法获取全局 `ConversationClient` 对象。

**返回值**

[ConversationClient](/api/video/android/api.html#ConversationClient)

**示例**

```java
	//Video video = Video.getInstance();
	//获取client对象
	client = video.getClient();
```

****

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
		public void onError(String s) {

		}
	});
```

**** 

### setInviteListener



**定义**   

 void setInviteListener(ConversationClient.Listener listener) 

**说明**

设置邀请会话监听。在使用inviteToConversation方法前需要先设置会话邀请监听,否则使用邀请功能会抛出IllegalStateException异常。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[ConversationClient.Listener](#ConversationClient.Listener),会话邀请监听,监听当前会话邀请状态|


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

### inviteToConversation



**定义**   

inviteToConversation(InviteOptions options, final ConversationCallback callback)

**说明**

邀请其他人加入会话,对方接受邀请将创建一个新会话并在 `ConversationCallback` 回调中返回创建的会议。

**参数**

| 参数名 | 描述 |
|---|---|
|options|[InviteOptions](/api/video/android/api.html#InviteOptions),InviteOptions 对象,提供会话相关参数|
|callback|[ConversationCallback](/api/video/android/api.html#ConversationCallback),详情参阅 ConversationCallback API|

**返回值**

[OutgoingInvite](/api/video/android/api.html#OutgoingInvite)

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

### getMeetingCastAddon



**定义**   

getMeetingCastAddon(Conversation conversation, MeetingCastStateListener listener)

**说明**

从 `Client` 对象中获取 `MeetingCastAddon` ,使用MeetingCastAddon可以进行直播,切流以及停止直播操作 。此时的会话模式必须为`ConversationMode.SERVER_BASED`,P2P模式不支持直播流操作。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),当前正在进行中的会话对象,会话的模式只能为 `ConversationMode.SERVER_BASED` ,否则会抛出` ClassCastException`。|
|listener|[MeetingCastStateListener](/api/video/android/api.html#MeetingCastStateListener),详情参阅 MeetingCastStateListener API|

**返回值**

[MeetingCastAddon](/api/video/android/api.html#MeetingCastAddon)

**** 

title: ConversationClient.Listener
---

<span id="ConversationClient.Listener" />


`ConversationClient` 状态回调,当 `ConversationClient` 状态改变时会触发相应的方法。
## 方法

### onStartListeningForInvites



**定义**   

void onStartListeningForInvites(ConversationClient client)

**说明**

`ConversationClient` 成功监听 `IncomingInvite` 时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/api.html#ConversationClient),`ConversationClient` 对象|


****

### onStopListeningForInvites



**定义**   

void onStopListeningForInvites(ConversationClient client)

**说明**

`ConversationClient` 结束对 `IncomingInvite` 的监听时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/api.html#ConversationClient),`ConversationClient` 对象|



****

### onFailedToStartListening



**定义**   

void onFailedToStartListening(ConversationClient client, ConversationException exception)

**说明**

`ConversationClient` 对 `IncomingInvite` 建立监听失败时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/api.html#ConversationClient),`ConversationClient` 对象|
|exception|[ConversationException](/api/video/android/api.html#ConversationException),失败错误信息|


****

### onIncomingInvite



**定义**   

void onIncomingInvite(ConversationClient client, IncomingInvite incomingInvite)

**说明**

`ConversationClient` 接收到会话邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/api.html#ConversationClient),`ConversationClient` 对象|
|incomingInvite|[IncomingInvite](/api/video/android/api.html#IncomingInvite),等待接受的会话邀请对象|


****

### onIncomingInviteCanceled



**定义**   

void onIncomingInviteCanceled(ConversationClient client, IncomingInvite incomingInvite)

**说明**

会话发起者取消会话邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[ConversationClient](/api/video/android/api.html#ConversationClient),`ConversationClient` 对象|
|incomingInvite|[IncomingInvite](/api/video/android/api.html#IncomingInvite),被取消的会话邀请对象|


****

title: ConversationCallback
---

<span id="ConversationCallback" />


会话回调,创建会话时会通过 `onConversation`方法传递会话实例对象或错误信息。

## 方法

### onConversation



**定义**   

void onConversation(Conversation conversation, ConversationException exception) 

**说明**

创建会话时通过此接口传递Conversation和ConversationException。

* 会话创建成功 传递 `conversation` 对象,`ConversationException` 为空

* 会话创建失败 `conversation` 为 `null`,传递错误信息对象 `ConversationException`

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),会话对象|
|exception|[ConversationException](/api/video/android/api.html#ConversationException),会议异常对象|


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

title: Conversation
---

<span id="Conversation" />


会话类接口,提供会话服务,使用 `Conversation` 接口创建和获取会话,根据传入的不同 `Conversation.Mode`,返回 `P2P` 模式或者 `SERVER_BASED` 模式会话实例。

## 方法

### setConversationListener



**定义**   

void setConversationListener(Conversation.Listener listener)

**说明**

为会话设置会话状态监听,当被邀请者接受或拒绝时会改变会话的状态,Video SDK 会触发 `Conversation.Listener` 的回调方法通知监听者。

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[Conversation.Listener](/api/video/android/api.html#Conversation.Listener),聊天会话监听,参与者连接成功后会触发 onParticipantConnected 事件|


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

### invite



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


### disconnect



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

title: Conversation.Listener
---
<span id="Conversation.Listener" />

会话状态回调,当会议处于不同状态时触发不同回调方法。

## 方法

### onParticipantConnected



**定义**   

void onParticipantConnected(Conversation conversation, Participant participant)

**说明**

被邀请加入会话的参与者接受邀请后,创建会话并成功连接后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),被邀请加入会话的参与者接受邀请后,建立的会话对象|
|participant|[Participant](/api/video/android/api.html#Participant),接受邀请的会话参与者|


**** 

### onFailedToConnectParticipant

接受邀请后,客户端建立视频通话连接失败时调用。

**定义**   

void onFailedToConnectParticipant(Conversation conversation, Participant participant, ConversationException exception)

**说明**

接受邀请后,客户端建立视频通话连接失败时调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),被邀请者接受邀请后建立的会话对象|
|participant|[Participant](/api/video/android/api.html#Participant),接收邀请的被邀请者|
|exception|[ConversationException](/api/video/android/api.html#ConversationException),会话建立连接失败信息|



**** 

### onParticipantDisconnected



**定义**   

void onParticipantDisconnected(Conversation conversation, Participant participant)

**说明**

被邀请人断开会话连接后调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),被邀请者接受邀请后建立的会话对象|
|participant|[Participant](/api/video/android/api.html#Participant),接收邀请的被邀请者|


**** 

### onConversationEnded



**定义**   

void onConversationEnded(Conversation conversation, ConversationException exception)

**说明**

会话结束后调用。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/api/video/android/api.html#Conversation),已经结束的会话对象|
|exception|[ConversationException](/api/video/android/api.html#ConversationException),会话结束异常信息|


**** 

title: IncomingInvite
---

<span id="IncomingInvite" />

当有人邀请其他人加入会话时,被邀请者会接受到邀请信息并返回一个 `IncomingInvite` 对象,通过 `InconmingInvite` 对象可以接受（ `accept` ）或拒绝（ `reject` ）邀请。在接受邀请的ConversationCallback中可以获取会话相关信息。

## 方法

### accpet



**定义**   

void accpet(LocalStream localStream,ConversationCallback callback)

**说明**

参与者收到加入会话邀请,接受会话邀请。

**参数**

| 参数名 | 描述 |
|---|---|
|localStream|[LocalStream](/api/video/android/api.html#LocalStream),被邀请者通过 `Video.createLocalStream` 获取的本地视频流|
|callback|[ConversationCallback](/api/video/android/api.html#ConversationCallback),会话回调函数,接受时可在 `callBack.onConversation()` 方法中获取到 `conversation` 对象|


**示例**

```java
	//接受邀请
	//localStream=video.createLocalStream(LocalStreamOptions.DEFAULT_OPTIONS, new CompleteListener(){//...});
	incomingInvite.accept(localStream, new ConversationCallback() {
        @Override
        public void onConversation(Conversation conversation, ConversationException exception) {
            //对方接受邀请并成功建立会话,conversation不为空,exception为空
            if (conversation != null) {
                mConversation = conversation;
                //获取到conversation后,设置ConversationListener
                mConversation.setConversationListener(new Conversation.Listener() {
                    //...
                });

            } else {
                //处理会话建立失败逻辑
            }
        }
    });

```

**** 

### reject



**定义**   

void reject()

**说明**

收到加入会话邀请的参与者,拒绝会话邀请。

**示例**

```java
	//拒绝邀请
	incomingInvite.reject();
```
****
<span id="OutgoingInvite" />
## OutgoingInvite (Methods)

使用 Conversation.inviteToConversation 方法发起邀请时会生成 OutgoingInvite 对象,通过 cancel 方法可以取消邀请。

### cancel



**定义**   

void cancel()

**说明**

发起一个会话邀请后,会话发起人通过 `cancel` 方法取消邀请。

**示例**

```java
	//outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {//...});
	//取消发起会话邀请
    outgoingInvite.cancel();
```

****

title: Stream
---


视频流对象。

## 属性

所有属性均有get/set方法。

### mediaStream

视频流对象中的 MediaStream 视频流

### uid

表示流发送者身份的 uid,即 Wilddog ID

### senderId

标识流身份的 senderId,由用户自定义生成,建议使用野狗mRef.push.getKey()方法获取

**** 

## 方法

### attach



**定义**   

void attach(VideoRenderer.Callbacks callbacks)

**说明**

在传入的展示控件中展示当前视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|callbacks|VideoRenderer.Callbacks,用户定义的 `VideoRenderer.Callbacks` 对象,在此范围内显示视频流|


**示例**

```java
	//VideoRenderer.Callbacks localCallbacks=VideoRendererGui
		.createGuiRenderer(0, 0, 50, 100, RendererCommon.ScalingType.SCALE_ASPECT_FILL, true);
	//为视频流绑定播放控件
	stream.attach(localCallbacks);
```

**** 

### detach()



**定义**   

void detach()

**说明**

将视频流从展示控件中解绑,停止在控件中显示当前视频流。

**示例**

```java
	//解绑视频控件
	stream.detach();
```

****

title: LocalStream
---

<Span id="LocalStream"/>

`Stream` 子类,代表本地视频流对象。

****

title: RemoteStream
---

<Span id="RemoteStream"/>

`Stream` 子类,代表远端视频流对象

****

title: Participant
---

<span id="Participant" />

## 构造方法


### Participant

**定义**   

Participant(String participantId, RemoteStream remoteStream) 

**说明**

参与者对象,包含两个属性参与者 ID 和远端视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|participantId|String,参与者 Wilddog ID|
|remoteStream|[RemoteStream](/api/video/android/api.html#RemoteStream),参与者发送的远端视频流|


**示例**

```java
	Participant participant=new Participant("<Wilddog ID>",new RemoteStream());
```

**** 

## 属性


## 方法

### getParticipantId



**定义**   

String getParticipantId()

**说明**

获取参与者 Wilddog ID

**返回值**

`String` 参与者 Wilddog ID 字符串

**** 

### getRemoteStream



**定义**   

RemoteStream getRemoteStream()

**说明**

获取远端视频流。

**返回值**

[RemoteStream](/api/video/android/api.html#RemoteStream)

****

title: InviteOptions
---

<span id="InviteOptions" />

## 构造方法

### InviteOptions

**定义**   

InviteOptions（ConversationMode mode,Set<String> participantId,LocalStream localStream）

**说明**

邀请加入会话的参数对象,参数为会话模式,参与者列表和本地视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|mode|[ConversationMode](/api/video/android/api.html#ConversationMode),会话模式,包括 `ConversationMode.P2P`,`ConversationMode.SERVER_BASED` 两种类型,P2P 模式下使用p2p连接方式,SERVER_BASED 模式下使用 p2s 连接方式|
|participantId|Set<String>,参与者列表。列表内容为参与者的 Wilddog ID|
|localStream|[LocalStream](/api/video/android/api.html#LocalStream),会话发起人通过 `Video.createLocalStream` 获取的本地视频流|

**** 

## 属性

### getMode



**定义**   

ConversationMode getMode()

**说明**

返回 ConversationMode 。

**返回值**

[ConversationMode](/api/video/android/api.html#ConversationMode)枚举值

**示例**

```java
	ConversationMode mode=options.getMode();
```

**** 

### getParticipantId


**定义**   

Set<String> getParticipantId()


**说明**

返回参与者 ID 列表。

**返回值**

参与者 ID 列表,列表中的数据为不重复的 Wilddog ID。

**示例**

```java
	Set<String> participantSet=options.getParticipantId();
```

**** 

### getLocalStream



**定义**   

LocalStream getLocalStream()

**说明**

获取会话发起人的视频流

**返回值**

[LocalStream](/api/video/android/api.html#LocalStream)

**示例**

```java
	LocalStream localStream=options.getLocalStream();
```

****

title: ConversationException
---

<span id="ConversationException" />

会话异常信息,有两个属性ErrorMsg与ErrorCode,分别代表错误详细信息与错误码。



## 构造方法

### ConversationException

**定义**   

ConversationException(String errorMsg, int errorCode) 

**说明**

**参数**

| 参数名 | 描述 |
|---|---|
|errorMsg|String,错误详细信息|
|errorCode|String,错误代码|


**** 

## 属性

所有属性均有get/set方法。

### errorMsg

错误详细信息。

### errorCode

错误码。

****

title: ConversationMode
---

<span id="ConversationMode" />


## enum ConversationMode

会话模式类型,目前支持两种类型的会话：P2P,SERVER_BASED。

## Constants

### P2P

基础会话类型,采用 P2P(point to point) 连接方式。
P2P模式不支持直播流操作。

**** 

### SERVER_BASED

采用 P2S（point to server) 连接方式,视频流通过中转服务器中转,使用此模式需要在控制面板中开启视频中转功能。
SERVER_BASED模式支持直播流操作。

**** 

title: MeetingCastStateListener
---

<span id="MeetingCastStateListener" />

会话直播状态监听。

## 方法

### onCastUp



**定义**   

void onCastUp(String castUid, Map<String,String > urlMap)

**说明**

启用直播功能后,成功发布直播流后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,当前正在直播的流的发布者 Widdog ID|
|urlMap|Map<String,String>,直播地址,包含 rtmp 和 hls 两种类型的直播地址,rtmp地址 key 值为 "rtmp", hls地址 key 值为 "hls"|


<span id="onCastUp" />
**示例**

```java
	meetingCastAddon = client.getMeetingCastAddon(mConversation, new MeetingCastStateListener() {
        @Override
        public void onCastUp(String castUid, Map<String, String> urlMap) {

        }

        @Override
        public void onCastChange(String castUid) {

        }

        @Override
        public void onCastDown() {

        }

        @Override
        public void onError(String message) {

        }
    });
```

**** 

### onCastChange



**定义**   

void void onCastChange(String castUid)


**说明**
开始直播后,切换直播中的视频流操作后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,当前正在直播的流的发布者 Widdog ID|


**示例**

参照[onCastUp 示例](/api/video/android/api.html#onCastUp)

**** 

### onCastDown



**定义**   

void onCastDown()

**说明**

结束直播后触发。

**示例**

参照[onCastUp 示例](/api/video/android/api.html#onCastUp)

**** 

### onError



**定义**   

void onError(String message)

**说明**

直播操作出现错误时调用。

**参数**

| 参数名 | 描述 |
|---|---|
|message|String,直播操作发生错误的详细信息|



**示例**

参照[onCastUp 示例](/api/video/android/api.html#onCastUp)

****

title: MeetingCastAddon
---

<span id="MeetingCastAddon"/>

会议直播插件,通过 `MeetingCastAddon` 对象对当前会议的视频流进行直播/切换视频流/结束直播的操作。

## 方法

### castUp



**定义**   

void castUp(String castUid)

**说明**

直播当前会话中某个参与者发送的视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,需要直播的视频流的发布者的 Wilddog ID|


**示例**

参照[onCastUp](/api/video/android/api.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//先获取到 `meetingCastAddon` 对象,然后发布直播流
	meetingCastAddon.castUp("<需要直播的视频发布者Wilddog ID>");
```

**** 

### castChange



**定义**   

void castChange(String castUid)

**说明**

切换当前直播的视频流为另一位参与者发布的视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|castUid|String,需要切换直播的视频流的发布者的 Wilddog ID|


**示例**

参照[onCastUp](/api/video/android/api.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//切换直播流
	meetingCastAddon.castChange("<需要切换的视频发布者Wilddog ID>");
```

**** 

### castDown



**定义**   

void castDown()

**说明**

结束当前直播。

**示例**

参照[onCastUp](/api/video/android/api.html#onCastUp)示例获取`meetingCastAddon` 对象的方式

```java
	//结束直播
	meetingCastAddon.castDown();
```





