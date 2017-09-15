title: 媒体流
---

本篇文档介绍如何创建、配置和播放媒体流（包括摄像头采集的视频流和麦克风采集的音频流以及接收到的远端媒体流）。

## 本地媒体流(LocalStream)
### 创建本地媒体流

本地媒体流包含了本地设备所采集的音频、视频信息，是视频通话所需要的基本数据。
使用 [wilddogVideo.createLocalStream(options)](/conference/Web/api/wilddogVideoInitialze.html#createLocalStream) 方法创建本地媒体流:

```javascript
wilddogVideo.createLocalStream({
     captureAudio:true,
     captureVideo:true,
     dimension:'480p',
     maxFPS: 15
})
```

### 配置本地媒体流

创建本地媒体流需传入参数用于确定本地视频流的音频、视频开关、最大尺寸和最大帧率：
* captureAudio / captureVideo 为音 / 视频采集的开关，设置为 false 表示关闭音 / 视频采集，默认为 true；
* dimension 用来设置视频的最大尺寸，默认为 480p，如果网络条件较差，会自动降低尺寸大小；
* maxFPS 用来设置视频的最大帧率，默认为 15 帧 / 秒，如果网络条件较差，会自动降低帧率。

```javascript
//创建一个同时有音频和视频的媒体流
wilddogVideo.createLocalStream(
    {
        captureAudio:true,
        captureVideo:true,
        dimension:'480p',
        maxFPS: 15
    })
    .then(function(localStream){
        // 获取到localStream,将媒体流绑定到页面的video类型的标签上
        // 如果没有获得摄像头权限或无摄像头，则无法展示。
        localStream.attach(localElement);
    });
```
### 播放本地媒体流

本地媒体流包括音频和视频。

使用 `localStream.attach()` 方法将媒体流放入video标签：

```javascript
localStream.attach(local);
```

将本地媒体流移出video标签：

```javascript
localStream.detach();
```

可以设定 `enableAudio(enable)` 和 `enableVideo(enable)` 两个方法来控制是否播放音频、视频，默认都为开启。

```javascript
// 设置不播放媒体流的音频。
localStream.enableAudio(false);
```
## 远端媒体流（RoomStream）

### 获取远端媒体流

通过 [`roomInstance.on('stream_received')`] 回调事件获取远端媒体流

### 播放远端媒体流

远端媒体流包括音频和视频。

使用 `roomStream.attach()` 方法将远端媒体流放入video标签：

```javascript
roomStream.attach(remote);
```

移出video标签：：

```javascript
roomStream.detach();
```

可以设置 `enableAudio(enable)` 和 `enableVideo(enable)` 两个方法来控制是否播放音频、视频，默认都为开启。

```javascript
// 设置不播放媒体流的音频。
roomStream.enableAudio(false);
```