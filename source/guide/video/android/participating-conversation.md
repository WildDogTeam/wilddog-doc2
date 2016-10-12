title: 加入会话相关
---

以下展示了如何预览本地画面，处理会话邀请和离开当前会话。

### 预览本地视频画面

有时你想在加入会话前预览自己的视频画面。每端的 SDK 都提供了提前预览本地视频画面的方法。 


示例：

```java
//初始化视频展示控件
//createGuiRenderer参数（起始x坐标,起始y坐标，控件宽，控件高，ScalingType,是否镜像），坐标以及宽高都是相对于surfaceView的百分比
VideoRenderer.Callbacks localCallbacks = VideoRendererGui.createGuiRenderer(0, 0, 100, 75, RendererCommon.ScalingType.SCALE_ASPECT_FILL, true); 
//通过video对象获取本地视频流,使用默认配置
LocalStream localStream = video.createLocalStream(LocalStreamOptions.DEFAULT_OPTIONS, new CompleteListener() { 
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

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他客户端发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

示例：

```java
client.setInviteListener(new InviteListener(){ 

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

### 离开会话

离开一个正在进行的会话。可以通过监听离开会话事件在离开会话成功后释放资源。

示例：

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

