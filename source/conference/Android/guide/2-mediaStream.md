title: 媒体流
---

本篇文档介绍如何创建、配置和播放媒体流（包括摄像头采集的视频流、麦克风采集的音频流以及接收到的远端媒体流）。

### 本地媒体流(LocalStream)
#### 创建本地媒体流

本地媒体流包含了本地设备所采集的音频、视频信息，是视频通话所需要的基本数据。
使用 [`LocalStream.create()`](/conference/Android/api/local-stream.html#create(options))  方法创建本地媒体流：

```java
	LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
	LocalStreamOptions options = builder.build();
	LocalStream localStream = LocalStream.create(options);
```

#### 配置本地媒体流

创建本地媒体流需传入 [`LocalStreamOptions`](/conference/Android/api/local-stream-options.html) 对象，用于确定本地视频流的音频、视频开关、最大尺寸和最大帧率：

* captureAudio / captureVideo 为音／视频采集的开关，设置为 false 表示关闭音频／视频采集，默认为 true；
* dimension 用来设置视频的最大尺寸，默认为 480p，如果网络条件较差，会自动降低尺寸大小；
* maxFPS 用来设置视频的最大帧率，默认为 15 帧／秒，如果网络条件较差，会自动降低帧率。

```java
	LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
	LocalStreamOptions options = builder.captureAudio(true)
										.captureVideo(true)
										.dimension(LocalStreamOptions.Dimension.DIMENSION_720P)
										.maxFps(30)
										.build(); 
```
#### 播放本地媒体流

本地媒体流包括音频和视频。默认不播放音频，使用 [`WilddogVideoView`](/conference/Android/api/wilddog-video-view.html) 播放视频。

播放视频流：

```java
	WilddogVideView localView = (WilddogVideView)findViewById(R.id.wvv_local);
	localStream.attach(localView);
```

停止播放视频流：

```java
	localStream.detach();
```

可以设定 `enableAudio(boolean isEnable)` 和 `enableVideo(boolean isEnable)` 两个方法来控制是否播放音频、视频，默认都为开启。

```java
	// 设置不播放媒体流的音频。
	localStream.enableAudio(false);
```
### 远端媒体流（RoomStream）

#### 获取远端媒体流

通过 [`onStreamReceived`](/conference/Android/api/room-stream-listener.html#onStreamReceived(room, roomStream)) 回调方法获取远端媒体流。

#### 播放远端媒体流

远端媒体流包括音频和视频。默认播放音频，使用 [`WilddogVideoView`](/conference/Android/api/wilddog-video-view.html) 播放视频。

播放视频流：

```java
	WilddogVideView videoView = (WilddogVideView)findViewById(R.id.wvv_remote);
	roomStream.attach(videoView);
```

停止播放视频流：

```java
	roomStream.detach();
```

可以设置 `enableAudio(boolean isEnable)` 和 `enableVideo(boolean isEnable)` 两个方法来控制是否播放音频、视频，默认都为开启。

```java
	// 设置不播放媒体流的音频。
	localStream.enableAudio(false);
```
