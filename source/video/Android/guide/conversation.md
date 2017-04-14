title: 视频通话
---

本篇文档介绍开发视频通话的主要环节，包括 [创建视频通话](/video/Android/guide/conversation.html#创建视频通话)、[管理其他参与者](/video/Android/guide/conversation.html#管理其他参与者)、[加入视频通话相关](/video/Android/guide/conversation.html#加入视频通话相关) 和 [数据安全性](/video/Android/guide/conversation.html#数据安全性)。

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。



### 配置和预览本地媒体流

本地媒体流( [Local Stream](/video/Android/guide/core.html#Local-Stream) )包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```java
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
    //第二个参数为用户自定义的数据，类型为字符串
    ConnectOptions options = new ConnectOptions(localStream, "chaih");
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

## 数据安全性

### 保护信令交互的安全

视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为保护数据安全，可以针对该节点配置 [规则表达式](/sync/Android/rules/introduce.html) 。

规则表达式设置页面如下：

<img src="/images/video_guide_rule.png" alt="video_guide_rule">

例如，配置规则表达式，`wilddogVideo` 节点只允许信令交互双方读写，其他节点允许所有人读写：

```
{
  "rules": {
    "wilddogVideo": {"conversations": {"$cid": {"users": {".read": "auth != null","$user": {".write": "$user == auth.uid"}},"messages": {"$signalMail": {".write": "$signalMail.startsWith(auth.uid)",".read": "$signalMail.endsWith(auth.uid)"}}}},"invitations": {"$user": {".read": "auth.uid == $user","$invite": {".write": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)",".read": "$invite.startsWith(auth.uid)||$invite.endsWith(auth.uid)"}}}},
    "$others":{ ".read": true，".write": true}
  }
}
```
