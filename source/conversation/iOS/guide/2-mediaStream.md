title: 媒体流
---

本篇文档介绍如何创建、配置和播放本地媒体流（包括摄像头采集的视频流和麦克风采集的音频流）。


## 创建媒体流

本地媒体流包含了本地设备所采集的音频、视频信息，是一对一视频通话所需要的基本数据。开始一对一视频通话之前，需创建本地媒体流：

```objectivec
WDGLocalStream *localStream = [WDGLocalStream localStreamWithOptions:[WDGLocalStreamOptions new]];
```

## 配置媒体流

创建的时候，需要传入一个 [WDGLocalStreamOptions](/conversation/iOS/api/WDGLocalStreamOptions.html) 对象，这个参数确定了本地视频流的音频、视频开关、最大尺寸和最大帧率：
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

## 播放媒体流

媒体流包括音频流和视频流，音频流默认会自动播放，视频流需要使用 [WDGVideoView](/conversation/iOS/api/WDGVideoView.html) 来播放。

播放视频流：

```objectivec
[localStream attach:self.localVideoView];
```

停止播放视频流：

```objectivec
[localStream detach:self.localVideoView];
```

媒体流分为本地媒体流和远端媒体流，本地媒体流需要用户创建和配置，而远端媒体流由远端传输获取。

可以设定 `-[WDGStream audioEnabled]` 和 `-[WDGStream videoEnabled]` 两个属性来控制是否播放音频、视频，默认都为开启。

```objectivec
// 设置不播放媒体流的音频。
localStream.audioEnabled = NO;
```
