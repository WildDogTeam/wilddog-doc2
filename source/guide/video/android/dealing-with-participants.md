
title: 管理其他参与者
---

成功发起会话后，对方接收邀请后即可建立视频会话。
此时如想建立多人会话，可以在会话中邀请其他人加入。
以下展示了如何邀请其他人加入并处理连接事件，并在得到参与者发送的视频流后将其展示到页面上。

### 邀请其他 Client 加入会话

会话建立成功后，会话的参与者都可以邀请其他 Client 作为新参与者加入。

示例：

```java
        Set<String> participantSet = new HashSet<>();
        participantSet.add("参与者1");
        conversation.invite(participantSet);

```

### 处理参与者的连接事件

通过监听参与者加入或离开的事件，来获得参与者的状态通知。

示例：

```java
    //会话监听，监听被邀请者加入状态
    private Conversation.Listener conversationListener = new Conversation.Listener() {
        @Override
        public void onParticipantConnected(Conversation conversation, Participant participant) {
            //当被邀请者成功加入会话后触发此方法
            RemoteStream remoteStream = participant.getRemoteStream();
        }

        @Override
        public void onFailedToConnectParticipant(Conversation conversation, Participant participant,
                                                 ConversationException exception) {
            //当会话连接建立失败时触发此方法
        }

        @Override
        public void onParticipantDisconnected(Conversation conversation, Participant participant) {
            //被邀请者离开会话后触发此方法
        }

        @Override
        public void onConversationEnded(Conversation conversation, ConversationException exception) {
            //当所有其他参与者离开会话时，判定会话已经结束，触发此方法
        }
    };
    mConversation.setConversationListener(conversationListener);

```

### 播放其他参与者的视频

想观看会话中其他参与者的媒体流，需要将媒体流展示到屏幕上。

示例：

```java
//视频展示控件
//VideoRenderer.Callbacks remoteCallback = VideoRendererGui.createGuiRenderer(50, 75, 25, 25, RendererCommon.ScalingType.SCALE_ASPECT_FILL, false);
//在会话Conversation.Listener监听中，通过onParticipantConnected可获取其他参与者的媒体流
@Override public void onParticipantConnected(Conversation conversation, Participant participant) { 

    //获取到远端视频流  

    RemoteStream remoteStream = participant.getRemoteStream();  

    //播放远端视频流  

    remoteStream.attach(remoteCallbacks); 

}
```
