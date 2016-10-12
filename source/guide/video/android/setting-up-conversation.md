title: 建立会话
---

本篇文档介绍如何初始化 Client、配置本地媒体流，以及发起会话。

## 初始化 Client

发起会话之前需要通过初始化 Client 来连接客户端和野狗服务器。初始化 Client 时需要指定 Video SDK 的交互路径，客户端和服务器以及客户端之间都是通过该路径进行交互，只有相同交互路径下的 Client 能够发起或加入会话。建议该路径下不要存储其他数据。

建立服务器中转模式的会话时，初始化 Client 时的交互路径应和控制面板中的交互路径保持一致。

需要注意的是，初始化 Client 之前，要先经过身份认证。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式。

例如，以匿名方式登录后创建 Client ：

```java

@Override

public void onCreate() { 

    super.onCreate(); 

    //初始化WilddogApp实例,初始化WilddogApp后，即可在项目任意位置获取数据库地址引用
    //mAppId即野狗应用ID

    WilddogOptions.Builder builder = new WilddogOptions.Builder().setSyncUrl("http://"+ mAppId +".wilddogio.com");

    WilddogOptions options = builder.build();

    WilddogApp.initializeApp(getApplicationContext(), options);

    //获取数据库地址引用

    SyncReference mRef = WilddogSync.getInstance().getReference();

    //获取Auth对象

    WilddogAuth auth = WilddogAuth.getInstance();

    //匿名登录系统

    auth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {

        @Override

        public void onComplete(Task<AuthResult> task) {

            if (task.isSuccessful()) {
                //...
                //完成初始化工作 
            }else {
                 throw  new RuntimeException("auth 失败"+task.getException().getMessage());
            }
        }
    });

    //初始化Video SDK
    Video.initializeWilddogVideo(getApplicationContext());
    //获取video对象
    Video video＝Video.getInstance();
    //初始化ConversationClient
    //使用SERVER_BASED模式时需要传入交互路径，此处的交互路径是在 
    // 控制面板->实时视频通话->服务器中转 中配置的交互路径，否则无法使用服务器中转功能
    ConversationClient.init(mRef.child(["交互路径"]), new CompleteListener() {
            @Override
            public void onSuccess() {

            }

            @Override
            public void onError(String s) {

            }
    });
    //获取client对象
    ConversationClient client = video.getClient();
    //....
}

```


### 配置本地媒体流

本地媒体流包括音频和视频。需要在发起会话前配置本地媒体流。会话建立后该媒体流会发给其他 Client。

例如，可以创建一个 240X320 的视频流，并绑定到播放控件上：

```java
//视频展示控件
VideoRenderer.Callbacks localCallbacks = VideoRendererGui.createGuiRenderer(0, 0, 100, 75, RendererCommon.ScalingType.SCALE_ASPECT_FILL, true); 
//创建本地媒体流
LocalStreamOptions.VideoOptions videoOptions=new LocalStreamOptions.VideoOptions(true);
//设置视频宽高。视频宽高以屏幕横向为准
videoOptions.setHeight(240);
videoOptions.setWidth(320);
LocalStreamOptions options=new LocalStreamOptions(videoOptions,true);
//通过video对象获取本地媒体流
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

### 发起会话

会话的建立基于邀请机制，只有另一个 Client 接受了会话邀请，会话才能建立成功。

例如，发起 P2P 模式的会话：

```java
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


