
title: 实战教程
---
本文档将给出一些详尽的示例教程。

## 示例说明

本教程以一对一视频通话为例，讲解如何通过 Video SDK 实现实时视频通话功能。

在此之前需要开启控制面板中的“实时视频通话”功能。

示例的最终的展示效果如下图：

<img src='/images/video_quickstart_android_conversation.jpg' alt="video_quickstart_android_conversation" width="300">



## 具体步骤

### 1. 安装 SDK

[下载](https://cdn.wilddog.com/sdk/android/0.5.2/wilddog-video-android-0.5.2.zip) Wilddog Video SDK 的 zip 压缩包。
解压缩后将 libs 文件夹下的 .jar 文件拷贝到工程的 /libs 目录下，添加为工程的依赖库。
将 jniLibs 文件夹下的 armeabi-v7a 文件夹拷贝到 /src/main/jniLibs 目录下，完成 Video SDK 的引用。

### 2. 添加 Sync / Auth 依赖

Video SDK 依赖于 Sync 和 Auth SDK，可以使用 Maven 或 Gradle 获得 Sync/Auth SDK。

- **使用 Maven 安装 Sync/Auth SDK**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span>2.0.1<span class="tag">&lt;/<span class="name">version</span>&gt;</span></div>    <span class="tag">&lt;<span class="name">type</span>&gt;</span>pom<span class="tag">&lt;/<span class="name">type</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure><figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span>2.0.3<span class="tag">&lt;/<span class="name">version</span>&gt;</span></div>    <span class="tag">&lt;<span class="name">type</span>&gt;</span>pom<span class="tag">&lt;/<span class="name">type</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>


- **使用 Gradle 安装 Sync/Auth SDK**

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:2.0.1&apos;</span></div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:2.0.3&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

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


### 2. 用户身份认证

视频通话的前提条件是要有可识别的用户身份。在这里使用 Auth SDK 的匿名登录实现身份认证。认证后会为每个用户分配唯一的 Wilddog ID。

``` java
    //初始化 WilddogApp,完成初始化之后可在项目任意位置通过 getInstance() 获取 Sync & Auth 对象
    WilddogOptions.Builder builder = new WilddogOptions.Builder().setSyncUrl("http://" + mAppId + ".wilddogio.com");
    WilddogOptions options = builder.build();
    WilddogApp.initializeApp(getApplicationContext(), options);
    //获取 Sync & Auth 对象
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


### 3. 初始化 Wilddog Video SDK

用户身份认证成功后，可以初始化 Wilddog Video SDK 。

```java

    //初始化 WilddogVideo SDK
    WilddogVideo.initializeWilddogVideo(getApplicationContext(), <Wilddog APPID>);
    //获取 WilddogVideo对象
    WilddogVideo video＝WilddogVideo.getInstance();
    //获取client对象
    WilddogVideoClient client = video.getClient();
    //....

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

            //用户可以使用任意自定义节点来保存用户数据，但是不要使用 [wilddogVideo]节点存放私有数据
            //以防和Video SDK 数据发生冲突
            //本示例采用根节点下的[users] 节点作为用户列表存储节点
            Map<String, Object> map = new HashMap<String, Object>();
            map.put(uid, true);
            SyncReference userRef=WilddogSync.getInstance().getReference("users");
            userRef.updateChildren(map);
            userRef.child(uid).onDisconnect().removeValue();
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
    WilddogVideoView localView = (WilddogVideoView) findViewById(R.id.local_video_view);
    localView.setZOrderMediaOverlay(true);
    //本地媒体流设置镜像
    localView.setMirror(true);
    //配置本地音视频流
    LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
    LocalStreamOptions options = builder.height(240).width(320).build();
    localStream = video.createLocalStream(options, new
        CompleteListener() {
            @Override
            public void onCompleted(VideoException e) {

            }
    });
    //为视频流绑定播放控件
    localStream.attach(localView);

```

### 6. 发起视频通话

选择用户列表中的用户，发起视频通话。

```java
    //在使用 inviteToConversation 方法前需要先设置视频通话邀请监听，否则使用邀请功能会抛出IllegalStateException异常
    client.setInviteListener(new InviteListener(){
        //...
    });

    //选取用户列表中的用户，获得其 Wilddog ID
    String participantId=[获得的用户 Wilddog ID];
    //创建连接参数对象
    //localStream 为video.createLocalStream()获取的本地视频流
    //第二个参数为用户自定义的数据，类型为字符串
    ConnectOptions options = new ConnectOptions(localStream, "chaih");
    //inviteToConversation 方法会返回一个OutgoingInvite对象，
    //通过OutgoingInvite对象可以进行取消邀请操作
    outgoingInvite = client.inviteToConversation(participantId,options, new ConversationCallback() {
        @Override
        public void onConversation(Conversation conversation, VideoException exception) {
            if (conversation != null) {
                //对方接受邀请并成功建立视频通话，conversation不为空，exception为空
                mConversation = conversation;

            } else {
                //对方拒绝时，exception不为空
            }
        }
    });

```

### 7. 接受或拒绝邀请

发起视频通话后，被邀请人会收到邀请事件，被邀请人可以选择接受或拒绝该邀请，接受邀请则视频通话建立。

```java
    this.client.setInviteListener(new WilddogVideoClient.Listener() {
        @Override
        public void onIncomingInvite(WilddogVideoClient wilddogVideoClient, IncomingInvite incomingInvite) {
            //收到邀请，接受视频通话发起者的邀请
            ConnectOptions connectOptions = new ConnectOptions(localStream, "");
            incomingInvite.accept(connectOptions, new ConversationCallback() {
                @Override
                public void onConversation(@Nullable Conversation conversation, @Nullable VideoException e) {

                }
            });
        }

        @Override
        public void onIncomingInviteCanceled(WilddogVideoClient wilddogVideoClient, IncomingInvite incomingInvite) {
            //视频通话发起者取消了邀请
        }
    });
```

### 8. 展示对方视频

视频通话建立成功后，在视频通话中能够获取到对方视频流，在视频展示控件中展示。

```java
    //设置视频展示控件
    WilddogVideoView remoteView = (WilddogVideoView) findViewById(R.id.remote_video_view);
    WilddogVideoViewLayout remoteViewLayout = (WilddogVideoViewLayout) findViewById(R.id.remote_video_view_layout);
    remoteViewLayout.setPosition(REMOTE_X, REMOTE_Y, REMOTE_WIDTH, REMOTE_HEIGHT);

```
在成功建立连接后，为已建立的 `conversation` 建立监听参与者加入信息，并获取视频流。
```java

    mConversation.setConversationListener(new Conversation.Listener() {
        @Override
        public void onConnected(Conversation conversation) {
        //监听视频通话连接事件
        }

        @Override
        public void onConnectFailed(Conversation conversation, VideoException e) {
        //监听视频通话连接失败事件
        }

        @Override
        public void onDisconnected(Conversation conversation, VideoException e) {
        //监听视频通话断开连接事件
        }

        @Override
        public void onParticipantConnected(Conversation conversation, Participant participant) {
        //监听参与者接受邀请并加入视频通话的事件
        //在参与者加入时获得到加入的参与者，并设置监听
            participant.setListener(new Participant.Listener() {
                @Override
                public void onStreamAdded(RemoteStream remoteStream) {
                    //远端参与者流可用，展示远端视频流
                    remoteStream.attach(remoteView);
                }

                @Override
                public void onStreamRemoved(RemoteStream remoteStream) {

                }

                @Override
                public void onError(VideoException e) {

                }
            });
        }

        @Override
        public void onParticipantDisconnected(Conversation conversation, Participant participant) {
        //监听参与者离开事件
        }
    });

```



### 9. 离开视频通话

视频通话过程中，调用下面方法离开视频通话。

```java
    @Override
    protected void onDestroy() {
        super.onDestroy();
        //需要离开视频通话时调用此方法，并做资源释放和其他自定义操作
        if (mConversation != null) {
            mConversation.disconnect();
        }
        localStream.detach();
        localStream.close();
        video.dispose();
    }
```


## 获取示例源码
点此获取完整的 [示例源码](https://github.com/WildDogTeam/video-demo-android-conversation)。
