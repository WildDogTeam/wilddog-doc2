title: 媒体流
---

本篇文档介绍如何创建、配置和播放媒体流（包括摄像头采集的视频流和麦克风采集的音频流以及接收到的远端媒体流）。

## 本地媒体流 (LocalStream)

### 创建本地媒体流

本地媒体流包含了本地设备所采集的音频、视频信息，是视频会议所需要的基本数据。在加入视频会议之前，需要创建 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html) 实例：

```objectivec
WDGLocalStream *localStream = [[WDGLocalStream alloc] initWithOptions:options];
```

### 配置本地媒体流

创建本地媒体流需传入 [WDGLocalStreamOptions](/conference/iOS/api/WDGLocalStreamOptions.html) 对象，用于确定本地视频流的音频、视频开关、最大尺寸和最大帧率：
* shouldCaptureAudio / shouldCaptureVideo 为音／视频采集的开关，设置为 NO 表示关闭音／视频采集，默认为 YES；
* dimension 用来设置视频的最大尺寸，默认为 480p，如果网络条件较差，会自动降低尺寸大小；
* maxFPS 用来设置视频的最大帧率，默认为 16 帧／秒，如果网络条件较差，会自动降低帧率。

```objectivec
WDGLocalStreamOptions *localStreamOption = [[WDGLocalStreamOptions alloc] init];
localStreamOption.shouldCaptureAudio = YES;
localStreamOption.shouldCaptureVideo = YES;
localStreamOptions.dimension = WDGVideoDimensions720p;
localStreamOptions.maxFPS = 20;
```

### 播放本地媒体流

本地媒体流包括音频和视频。默认不播放音频，使用 [WDGVideoView](/conference/iOS/api/WDGVideoView.html) 播放视频。

使用 `-[WDGLocalStream attach:]` 方法播放本地视频流：

```objectivec
[localStream attach:self.localVideoView];
```

使用 `-[WDGLocalStream detach:]` 方法停止播放本地视频流：

```objectivec
[localStream detach:self.localVideoView];
```

可以设定 `audioEnabled` 和 `videoEnabled` 两个属性来控制是否播放音频、视频，默认都为开启。

```objectivec
// 设置不播放媒体流的视频
localStream.videoEnabled = NO;
```

## 远端媒体流 (RoomStream)

### 获取远端媒体流

通过 `-[WDGRoomDelegate wilddogRoom:didStreamReceived:]` 回调方法获取远端媒体流。

### 播放远端媒体流

远端媒体流包括音频和视频。默认播放音频，使用 [WDGVideoView](/conference/iOS/api/WDGVideoView.html) 播放视频。

使用 `-[WDGRoomStream attach:]` 方法播放远端视频流：

```objectivec
[remoteStream attach:self.remoteVideoView];
```

使用 `-[WDGRoomStream detach:]` 方法停止播放远端视频流：

```objectivec
[remoteStream detach:self.remoteVideoView];
```

可以设定 `audioEnabled` 和 `videoEnabled` 两个属性来控制是否播放音频、视频，默认都为开启。

```objectivec
// 设置不播放媒体流的视频
remoteStream.videoEnabled = NO;
```
