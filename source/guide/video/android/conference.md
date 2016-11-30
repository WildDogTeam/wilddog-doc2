title: 多人视频会议
---

本篇文档介绍开发多人视频会议时会时的主要环节，包括创建视频会议、管理其他参与者和加入会议相关。


## 创建视频会议

创建视频会议包括配置和预览本地媒体流、发起/加入视频会议。

### 配置和预览本地媒体流

本地媒体流([LocalStream](/api/video/android/local-Stream.html))包括音频和视频，发起或加入会议前需要配置其属性，成功加入一个会议后，该媒体流会发给其他参与者。


例如，创建一个只有视频且分辨率为 320X240 的流，并展示到 `WilddogVideoView` 上：

```java
    LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();

    LocalStreamOptions options = builder.height(240).width(320).build();
    localStream = video.createLocalStream(options, eglBase.getEglBaseContext(), new
        CompleteListener() {
            @Override
            public void onCompleted(VideoException e) {

            }
    });
    
```


配置成功后，可以在加入视频通话前预览本地画面。

```java
    //为视频流绑定播放控件
    localStream.attach(localCallbacks);
```

### 发起/加入视频会议

通过 Conference ID 发起/加入一个视频会议。如果该会议不存在，系统会以你作为第一个参与者发起该会议。


例如，加入 Conference ID 为 '123456' 的视频会议：

```java
    mConference=client.connectToConference("123456", options, new Conference.Listener() {//会议事件监听});

```

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。

### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开及加入失败的日志：

```java

Conference.Listener listener = new Conference.Listener() {
        @Override
        public void onConnected(Conference conference) {
        //监听会议连接事件
        }

        @Override
        public void onConnectFailed(Conference conference, VideoException e) {
        //监听会议连接失败事件
        }

        @Override
        public void onDisconnected(Conference conference, VideoException e) {
        //监听会议断开连接事件
        }

        @Override
        public void onParticipantConnected(Conference conference, Participant participant) {
        //监听参与者加入事件
            Log.d(TAG, "onParticipantConnected :" + participant.getParticipantId());
        }

        @Override
        public void onParticipantDisconnected(Conference conference, Participant participant) {
        //监听参与者离开事件
            Log.d(TAG, "onParticipantDisconnected :" + participant.getParticipantId());
        }
};
```

### 播放其他参与者的媒体流

通过展示他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入视频会议时展示参与者的媒体流：

```java
    //在参与者加入时获得到加入的参与者，并设置监听
    participant.setListener(new Participant.Listener() {
        @Override
        public void onStreamAdded(RemoteStream remoteStream) {
            //远端参与者流可用
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

## 加入会议相关
---

介绍如何离开视频会议。

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```java
    @Override
    protected void onDestroy() {
        super.onDestroy();
        //需要离开会话时调用此方法，并做资源释放和其他自定义操作
        if (mConference != null) {
            mConference.disconnect();
        }
        localStream.detach();
        localStream.close();
        video.dispose();
    }
```
