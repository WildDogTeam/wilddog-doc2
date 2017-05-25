title: 视频通话
---

本篇文档介绍开发视频通话的主要环节，包括 [创建视频通话](/video/Android/guide/conversation.html#创建视频通话)、[管理其他参与者](/video/Android/guide/conversation.html#管理其他参与者)、[加入视频通话相关](/video/Android/guide/conversation.html#加入视频通话相关) 和 [数据安全性](/video/Android/guide/conversation.html#数据安全性)。

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。



### 配置和预览本地媒体流

本地媒体流( [Local Stream](/video/Android/guide/core.html#Local-Stream) )包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```java
    //获取视频播放控件
    WilddogVideoView localView = (WilddogVideoView) findViewById(R.id.local_video_view);
    // 如果没有获得摄像头权限或无摄像头，则无法展示。
    LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
    LocalStreamOptions options = builder.height(240).width(320).build();
    localStream = video.createLocalStream(options, new CompleteListener() {
        @Override
        public void onCompleted(VideoException e) {

        }
    });
    //为视频流绑定播放控件
    localStream.attach(localView);
```
展示视频流需要使用 [WilddogVideoView](../api/wilddog-video-view.html) 和 [WilddogVideoViewLayout](../api/wilddog-video-view-layout.html) 两个控件，详细使用方法参见 API 文档。
### 发起视频通话

只有另一个 [Client](/video/Android/guide/core.html#Client) 接受了一方的邀请，通话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为避免影响视频通话功能的使用，请勿操作该节点。
</blockquote>


例如，发起一对一视频通话：

```java
    //创建连接参数对象
    //localStream 为video.createLocalStream()获取的本地视频流
    //第二个参数为用户自定义的数据，类型为字符串,可以在邀请时传递自定义信息，例如传递邀请者姓名、会议主题等
    //对方在 IncomingInvite 回调中可以获取该数据
    ConnectOptions options = new ConnectOptions(localStream, <Your-Data>);
    //inviteToConversation 方法会返回一个OutgoingInvite对象，
    //通过OutgoingInvite对象可以进行取消邀请操作
    outgoingInvite = client.inviteToConversation(participant,options, new ConversationCallback() {
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

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。


### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开的日志：

```java
    mConversation.setConversationListener(new Conversation.Listener() {
        @Override
        public void onParticipantConnected(Conversation conversation, Participant participant) {
        //监听参与者接受邀请并加入视频通话的事件
            Log.d(TAG, "onParticipantConnected :" + participant.getParticipantId());
        }

        @Override
        public void onParticipantDisconnected(Conversation conversation, Participant participant) {
        //监听参与者离开事件
            Log.d(TAG, "onParticipantDisconnected :" + participant.getParticipantId());
            mConversation.disconnect();
        }
    });
```

### 播放其他参与者的媒体流

通过展示其他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入视频通话时展示参与者的媒体流：

```java
    //在参与者加入时获得到加入的参与者，并设置监听
    participant.setListener(new Participant.Listener() {
        @Override
        public void onStreamAdded(RemoteStream remoteStream) {
            //其他客户端的媒体流可用,播放其他客户端的媒体流
            remoteStream.attach(remoteView);
        }

        @Override
        public void onStreamRemoved(RemoteStream remoteStream) {

        }

        @Override
        public void onError(VideoException e) {

        }
    });
```

## 加入视频通话相关

视频通话相关操作包括接受或拒绝邀请、离开视频通话。

### 接受或拒绝邀请

初始化 Client 之后，监听邀请事件接收另一个 Client 发起的邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请后，接受邀请：

```java
    this.client.setInviteListener(new WilddogVideoClient.Listener() {
        @Override
        public void onIncomingInvite(WilddogVideoClient wilddogVideoClient, IncomingInvite incomingInvite) {
            //获取邀请者发送的自定义信息
            String userData = incomingInvite.getUserData();            
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

### 离开视频通话

离开一个正在进行的视频通话并释放媒体资源。可以直接释放媒体资源或通过监听离开通话事件在成功离开通话后释放媒体资源。

例如，断开视频通话并释放不使用的资源：

```java
    @Override
    protected void onDestroy() {
        super.onDestroy();
        //需要离开视频通话时调用此方法，并做资源释放和其他自定义操作
        localStream.detach();
        localStream.close();
        if (localView != null) {
            localView.release();
            localView = null;
        }
        if (remoteView != null) {
            remoteView.release();
            remoteView = null;
        }
        if (mConversation != null) {
            mConversation.disconnect();
        }

        client.dispose();
        video.dispose();
    }
```

### 使用获取原始视频流接口

在 `LocalStream` 中可以通过调用 `setOnFrameListener()` 方法来获取原始的视频流帧数据。
在回调方法 `onByteFrame` 中获取的帧数据为 NY21 格式的 byte 数组。
注意，此数组为原始帧数据的引用，修改此数组会对视频流的数据产生影响（展示和传输的数据会被同时修改）。
```java
localStream.setOnFrameListener(new WilddogVideo.CameraFrameListener() {
    @Override
    public void onByteFrame(byte[] bytes, int width, int height) {
        //Log.e(TAG, "onByteFrame ");
    }
});
```

### 使用统计接口

`Conversation` 对象提供了视频通话统计功能，可以在通话过程中获取到通话的统计信息。
主要统计信息请查看 `LocalStats` 和 `RemoteStats` 说明。
通过在的 `Converstion` 实例中调用 `setRTCStatsListener()` 方法，在 `onLocalStats` 方法中返回本地的统计信息，在 `onRemoteStats` 方法中返回对端参与者的统计信息。
统计信息的获取需要等待连接正式建立完毕，会有一定时间的延迟（秒级），开始统计后，会以 2 秒为周期不间断回调上述方法。

```java
mConversation.setRTCStatsListener(new RTCStatsListener() {
    @Override
    public void onLocalStats(LocalStats localStats) {
        //返回本地统计信息
    }

    @Override
    public void onRemoteStats(RemoteStats remoteStats) {
        //返回对端参与者统计信息
    }
});
```



