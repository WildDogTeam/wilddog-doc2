title: 加入会话相关
---

本篇文档介绍如何预览本地视频画面、接受或拒绝邀请，以及离开会话。

### 预览本地视频画面

Wilddog Video SDK 都提供了在加入会话前预览本地的视频画面。 

例如，创建一个同时有音频和视频的媒体流并展示出来：

```java
//初始化视频展示控件
//createGuiRenderer参数（起始x坐标,起始y坐标，控件宽，控件高，ScalingType,是否镜像），坐标以及宽高都是相对于surfaceView的百分比
WilddogVideoView localCallbacks=(WilddogVideoView) findViewById(R.id.local_video_view);
localCallbacks.init(eglBase.getEglBaseContext(), null);
//通过video对象获取本地视频流,使用默认配置
//private EglBase eglBase = EglBase.create();
LocalStream localStream = video.createLocalStream(options,eglBase.getEglBaseContext(), new CompleteListener() { 
    @Override 
    public void onSuccess() {

    } 

    @Override 
    public void onError(VideoException exception) { 

    } 

}); 
//为视频流绑定播放控件
localStream.attach(localCallbacks);
```

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他客户端发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请时展示弹窗让用户选择是否接受：

```java
client.setInviteListener(new InviteListener(){ 

    @Override 

    public void onIncomingInvite(ConversationClient client, final IncomingInvite incomingInvite) { 

        //获取到incomingInvite对象 

        //接受邀请 

        incomingInvite.accept(localStream,new ConversationCallback(){ 

            @Override 

            public void onConversation(Conversation conversation,VideoException exception){ 

                //获取到conversation对象，开始进行会话 

            } 

        }); 

        //拒绝邀请 

        //incomingInvite.reject(); 

    }

});
```

### 离开会话

离开一个正在进行的会话并释放媒体资源。可以直接释放媒体资源或通过监听离开会话事件在成功离开会话后释放媒体资源。

例如，断开会话并释放不使用的资源：

```java
conversation.disconnect();

        // 其他用户设置会话监听，当有参与者调用disconnect()方法后，会触发onParticipantDisconnected方法
        //private Conversation.Listener conversationListener = new Conversation.Listener() {
        //    ...
        //    @Override
        //    public void onParticipantDisconnected(Conversation conversation, Participant participant) {
        //        //被邀请者离开会话，处理释放资源操作
        //    }
        //};
        //mConversation.setConversationListener(conversationListener);
        //


```

