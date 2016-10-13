title: 加入会话相关
---

本篇文档介绍如何预览本地视频画面、接受或拒绝邀请，以及离开会话。

### 预览本地视频画面

Wilddog Video SDK 都提供了在加入会话前预览本地的视频画面。 

例如，创建一个同时有音频和视频的媒体流并展示出来：

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

例如，收到邀请后，接受邀请：

```java
client.setInviteListener(new InviteListener(){ 

    @Override 

    public void onIncomingInvite(ConversationClient client, final IncomingInvite incomingInvite) { 
        //收到邀请，获取到incomingInvite对象 
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

离开一个正在进行的会话并释放媒体资源。可以直接释放媒体资源或通过监听离开会话事件在成功离开会话后释放媒体资源。

例如，断开会话：

```java
//断开会话
conversation.disconnect();
```

