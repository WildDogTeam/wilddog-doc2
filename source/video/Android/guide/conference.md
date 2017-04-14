title: 多人视频会议
---

本篇文档介绍开发多人视频会议的主要环节，包括 [创建视频会议](/video/Android/guide/conference.html#创建视频会议)、[管理其他参与者](/video/Android/guide/conference.html#管理其他参与者) 和 [加入视频会议相关](/video/Android/guide/conference.html#加入视频会议相关)。

## 创建视频会议

创建视频会议包括配置和预览本地媒体流、发起/加入视频会议。

### 配置和预览本地媒体流

本地媒体流( [Local Stream](/video/Android/guide/core.html#Local-Stream) )包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

例如，创建一个只有视频且分辨率为 320X240 的流，并展示到 `WilddogVideoView` 上：

```java
	// 如果没有获得摄像头权限或无摄像头，则无法展示。
    LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();

    LocalStreamOptions options = builder.height(240).width(320).build();
    localStream = video.createLocalStream(options,new CompleteListener() {
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

例如，打印加入、离开的日志：

```java

Conference.Listener listener = new Conference.Listener() {
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

## 加入视频会议相关
---

视频会议相关操作包括离开视频会议和直播视频会议。

### 离开视频会议

离开一个正在进行的视频会议并释放媒体资源。可以直接释放媒体资源或通过监听离开视频会议事件在成功离开会议后释放媒体资源。

例如，断开视频会议并释放不使用的资源：

```java
    @Override
    protected void onDestroy() {
        super.onDestroy();
        //需要离开会议时调用此方法，并做资源释放和其他自定义操作
        localStream.detach();
        localStream.close();

        if (local_video_view != null) {
            local_video_view.release();
            local_video_view = null;
        }
        if (mConference != null) {
            mConference.disconnect();
        }
        client.dispose();
        video.dispose();
        videoViewManager.dispose();
    }
```

### 视频会议直播

视频会议直播采用野狗独有的 MeetingCast 技术，能直播视频会议中指定客户端的视频和音频，并根据需要无缝切换直播的客户端。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  MeetingCast 功能配置之前，需要开启 `控制面板-实时视频通话-多人视频会议` 下的 “视频会议直播” 开关。
</blockquote>

**开启直播**

在视频会议开始后，选择一个参与者作为直播源，打开直播功能。

例如，选择参与者 '12345' 作为直播源开启直播：

```java
    //获取直播插件
    meetingCast = mConference.getMeetingCast(new MeetingCastStateListener() {
        @Override
        public void onMeetingCastStateChanged(Conference.MeetingCastStatus status, String participantId, Map<String, String> urlMap) {
            //直播状态改变时会触发此方法
        }
    });
    meetingCast.start("12345", new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {
            //操作异常则会返回错误
            //操作成功会调用onMeetingCastStateChanged() 方法
        }
    });
```

**切换直播者**

直播进行时无缝切换直播源。

例如，切换直播源为 participant ID '99999' 的参与者：


```java
    meetingCast.switchParticipant("99999", new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {
            //操作异常则会返回错误
            //操作成功会调用onMeetingCastStateChanged() 方法
        }
    });
```

**停止直播**

停止直播功能。

例如，直播开启后，停止直播：


```java
    meetingCast.stop(new CompleteListener() {
        @Override
        public void onCompleted(VideoException exception) {
            //操作异常则会返回错误
            //操作成功会调用onMeetingCastStateChanged() 方法
        }
    });
```
**直播状态**

获取直播状态，通过直播状态监听获取直播地址。

```
    meetingCast = mConference.getMeetingCast(new MeetingCastStateListener() {
        @Override
        public void onMeetingCastStateChanged(Conference.MeetingCastStatus status, String participantId, Map<String, String> urlMap) {
            //status：直播状态
            //participantId:当前正在直播的参与者 ID
            //urlMap:直播地址
        }
    });
```



