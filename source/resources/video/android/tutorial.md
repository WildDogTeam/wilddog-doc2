
title: 实战教程
---
本文档将给出一些详尽的示例教程。

## 教程说明

示例说明

本教程以一对一视频通话为例，讲解如何通过 Wilddog Video SDK 实现实时视频通话功能。

在此之前需要开启控制面板中的“实时视频通话”功能。

示例的最终的展示效果如下图：

<img src='/images/video_quickstart_android_conversation.jpg' alt="video_quickstart_android_conversation" width="300">

可以[下载体验](https://github.com/WildDogTeam/video-quickstart-android/archive/master.zip)



## 具体步骤

### 1. 安装 SDK

**安装 Wilddog Sync 和 Auth Android SDK**

- 使用 Maven 安装 Sync 和 Auth SDK

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-sync-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-auth-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

- 使用 Gradle 安装 Sync 和 Auth SDK

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:<span class="android-sync-version"></span>&apos;</span></div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

如果出现由于文件重复导致的编译错误，可以在 build.gradle 中添加 packingOptions:

```
android { 
    ... 
    packagingOptions { 
        exclude 'META-INF/LICENSE' 
        exclude 'META-INF/NOTICE' 
    }
}
```

**安装 Video SDK**

<a href="" class="video-android-download">下载 Video SDK</a>，解压后将jniLibs文件夹拷贝到工程目录的main文件夹中，将`libs/wilddog-video-android-*.jar` 放入工程的 `app/libs` 中，右键点击 `addAsLibrary`，完成 jar 包引用。


### 2. 用户身份认证

视频通话的前提条件是要有可识别的用户身份。在这里使用 Auth SDK 的匿名登录实现身份认证。认证后会为每个用户分配唯一的 Wilddog ID。

``` java
//初始化WilddogApp,完成初始化之后可在项目任意位置通过getInstance()获取Sync & Auth对象
WilddogOptions.Builder builder = new WilddogOptions.Builder().setSyncUrl("http://" + mAppId + ".wilddogio.com");
WilddogOptions options = builder.build();
WilddogApp.initializeApp(getApplicationContext(), options);
//获取Sync & Auth 对象
SyncReference mRef = WilddogSync.getInstance().getReference();
WilddogAuth auth = WilddogAuth.getInstance();
//采用匿名登录方式认证
//还可以选择其他登录方式
//auth.signInWithEmailAndPassword();
//auth.signInWithCredential();
//auth.signInWithCustomToken();
auth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> task) {
		if (task.isSuccessful()) {
			//身份认证成功
		}else {
			throw  new RuntimeException("auth 失败"+task.getException().getMessage());
		}
	}
});

```


### 3. 初始化 Video SDK

用户身份认证成功后，可以初始化 Video SDK 。

```java

        //初始化Video 时需要初始化两个类，Video和ConversationClient类，分别对其进行初始化
        //初始化Video，传入Context
        Video.initializeWilddogVideo(getApplicationContext());
        //初始化视频根节点，mRef=WilddogSync.getReference().child([视频控制面板中配置的自定义根节点]);
        ConversationClient.init(mRef.child([视频控制面板中配置的自定义根节点]), new CompleteListener() {
            @Override
            public void onSuccess() {

            }

            @Override
            public void onError(String s) {

            }
        });
        //获取video对象
        video = Video.getInstance();
        //获取client对象
        client = video.getClient();

```

### 4. 实现用户列表

邀请对方加入视频通话，需要获取对方的在线状态。Video SDK 本身不提供获取在线用户列表功能，因此需要开发者使用 Sync SDK 来自己实现。用户登陆系统后将自己的 Wilddog ID 保存到用户列表中。

数据库中的数据结构如图所示：

<img src='/images/video_resources_ios_datatree.png' alt="video_resources_ios_datatree"  >

#### 4.1 存储用户的 Wilddog ID

在登录时存储用户的 Wilddog ID：

```java
//用户可以使用任意自定义节点来保存用户数据，但是不要使用 [交互路径/video]节点存放私有数据，以防和Video SDK 数据发生冲突
//本示例采用根节点下的[交互路径/users] 节点作为用户列表存储节点,

auth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> task) {
		if (task.isSuccessful()) {
			//获取Wilddog ID
			String uid = auth.getCurrentUser().getUid();

			Map<String, Object> map = new HashMap<String, Object>();
			map.put(uid, true);
			//向users节点写入数据
			mRef.child().child("users").updateChildren(map);
			mRef.child("users/" + uid).onDisconnect().removeValue();
                        //其他初始化操作...
		}else {
			throw  new RuntimeException("auth 失败"+task.getException().getMessage());
		}
	}
});
```

#### 4.2 监听在线用户

获取用户列表时，监听users节点，获取到在线用户信息

```java
private List<String> userList = new ArrayList<>();
//监听users节点
mRef.child("users").addChildEventListener(new ChildEventListener() {
	@Override
	public void onChildAdded(DataSnapshot dataSnapshot, String s) {
		if (dataSnapshot != null) {
			//获取用户Wilddog ID并添加到用户列表中
			String uid = dataSnapshot.getKey();
			if (!mUid.equals(uid)) {
				userList.add(uid);
			}
		}
	}

	@Override
	public void onChildChanged(DataSnapshot dataSnapshot, String s) {

	}

	@Override
	public void onChildRemoved(DataSnapshot dataSnapshot) {
		if (dataSnapshot != null) {
			//用户离开时，从用户列表中删除用户数据
			String key = dataSnapshot.getKey();
			if (!mUid.equals(key)) {
				userList.remove(key);
				adapter.notifyDataSetChanged();
			}
		}
	}

	@Override
	public void onChildMoved(DataSnapshot dataSnapshot, String s) {

	}

	@Override
	public void onCancelled(SyncError wilddogError) {

	}
});

```

### 5. 获取和预览本地视频

通过 Video SDK 获取本地视频流，并在视频展示控件中预览。

```java

//视频展示控件
localCallbacks = VideoRendererGui.createGuiRenderer(0, 0, 50, 100, RendererCommon.ScalingType.SCALE_ASPECT_FILL, true);
//配置本地音视频流
LocalStreamOptions.VideoOptions videoOptions=new LocalStreamOptions.VideoOptions(true);
//视频宽高以屏幕横向为准
videoOptions.setHeight(240);
videoOptions.setWidth(320);
LocalStreamOptions options=new LocalStreamOptions(videoOptions,true);
//通过video对象获取本地视频流
LocalStream localStream = video.createLocalStream(options, new CompleteListener() { 
    @Override 
    public void onSuccess() {
    } 
    @Override 
    public void onError(String Error) { 
    } 
}); 
//为视频流绑定播放控件
localStream.attach(localCallbacks);

```

### 6. 发起会话

选择用户列表中的用户，发起会话。

```java
//在使用inviteToConversation方法前需要先设置会话邀请监听，否则使用邀请功能会抛出IllegalStateException异常
client.setInviteListener(new InviteListener(){ 
	//...
});


//选取用户列表中的用户，获得其 Wilddog ID
String uid=[获得的用户 Wilddog ID];
//ConversationMode可以选择P2P和SERVER_BASED两种
//participants 为传入的用户Wilddog ID 列表，目前预览版仅支持单人邀请
InviteOptions options = new InviteOptions(ConversationMode.SERVER_BASED, participants, stream);
//inviteToConversation 方法会返回一个OutgoingInvite对象，
//通过OutgoingInvite对象可以进行取消邀请操作
outgoingInvite = client.inviteToConversation(options, new ConversationCallback() {
    @Override
    public void onConversation(Conversation conversation, ConversationException exception) {
    
        if (conversation != null) {
            //对方接受邀请并成功建立会话，conversation不为空，exception为空
            mConversation = conversation;
            mConversation.setConversationListener(conversationListener);
        } else {
            //对方拒绝时，exception不为空
        }
    }
});

```

### 7. 接受或拒绝邀请

发起会话后，被邀请人会收到邀请事件，被邀请人可以选择接受或拒绝该邀请，接受邀请则会话建立。

```java

client.setInviteListener(new InviteListener(){ 

	//省略其他监听事件
	//...

    @Override 
    public void onIncomingInvite(ConversationClient client, final IncomingInvite incomingInvite) { 
        //获取到incomingInvite对象 
        //接受邀请 
        incomingInvite.accept(localStream,new ConversationCallback(){ 
            @Override 
            public void onConversation(Conversation conversation,ConversationException exception){ 
                //获取到conversation对象，开始进行会话 
            } 
        }); 
        //拒绝邀请 
        //incomingInvite.reject(); 
    }
});



```

### 8. 展示对方视频

会话建立成功后，在会话中能够获取到对方视频流，在视频展示控件中展示。

```java
//设置视频展示控件
VideoRenderer.Callbacks remoteCallbacks = VideoRendererGui.createGuiRenderer(50, 0, 50, 100, RendererCommon.ScalingType.SCALE_ASPECT_FILL, false);
//在InviteListener获取到conversation后，设置ConversationListener
mConversation.setConversationListener(new Conversation.Listener() {
	@Override
	public void onParticipantConnected(Conversation conversation, Participant participant) {
		//有参与者成功加入会话后，会触发此方法
		//通过Participant.getRemoteStream()获取远端媒体流
		RemoteStream remoteStream = participant.getRemoteStream();
		//在视频展示控件中播放媒体流
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



### 9. 离开会话

会话过程中，调用下面方法离开会话。

```java

	//需要离开会话时调用此方法，并做资源释放和其他自定义操作
	mConversation.disconnect();

```


## 获取示例源码
点此获取完整的[示例源码](https://github.com/WildDogTeam/video-quickstart-android)。



