title: 媒体流
---

本篇文档介绍如何创建、配置和播放本地媒体流（包括摄像头采集的视频流和麦克风采集的音频流）。


### 创建媒体流

本地媒体流包含了本地设备所采集的音频、视频信息，是一对一视频通话所需要的基本数据。开始一对一视频通话之前，需创建本地媒体流：

```java
LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
LocalStreamOptions options = builder.build();
LocalStream localStream = LocalStream.create(options);
```

### 配置媒体流

创建的时候，需要传入一个 [LocalStreamOptions](/conversation/Android/api/local-stream-options.html) 对象，这个参数确定了本地视频流的音频、视频开关、最大尺寸和最大帧率：
* captureAudio / captureVideo 为音／视频采集的开关，设置为 false 表示关闭音／视频采集，默认为 true；
* dimension 用来设置视频的最大尺寸，默认为 480p，如果网络条件较差，会自动降低尺寸大小；
* maxFPS 用来设置视频的最大帧率，默认为 15 帧／秒，如果网络条件较差，会自动降低帧率。

```java
LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
LocalStreamOptions options = builder.captureAudio(true).captureVideo(true).dimension(LocalStreamOptions.Dimension.DIMENSION_720P).maxFps(30).build(); 
```

### 播放媒体流

媒体流包括音频流和视频流，音频流默认会自动播放，视频流需要使用 [WilddogVideoView](/conversation/Android/api/wilddog-video-view.html) 来播放。

播放视频流：

```java
WilddogVideView localView = (WilddogVideView)findViewById(R.id.wvv_local);
localStream.attach(localView);
```

停止播放视频流：

```java
localStream.detach();
```

媒体流分为本地媒体流和远端媒体流，本地媒体流需要用户创建和配置，而远端媒体流由远端传输获取。

可以设定 `enableAudio(boolean isEnable)` 和 `enableVideo(boolean isEnable)` 两个方法来控制是否播放音频、视频，默认都为开启。

```java
// 设置不播放媒体流的音频。
localStream.enableAudio(false);
```
