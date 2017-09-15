title: 基础概念
---

## Room

表示视频会议，以 roomId 为唯一标识。加入视频会议后，可以发布／订阅媒体流。


## Stream

WilddogRoom SDK 用 `Stream` 来表示视频会议的参与者。包含 `LocalStream` 和 `RoomStream`:

- LocalStream: 本地媒体流。包括音频流和视频流，需要在加入视频会议前进行配置。
- RoomStream: 远端媒体流。其他用户发布的媒体流，从 Room 中获取。


## VideoView

使用 VideoView 播放本地／远端视频流，LocalStream 和 RoomStream 只能与 VideoView 绑定来播放。


## Publish & Subscribe

视频会议采用了发布／订阅机制：

- Publish: 用户将本地媒体流发布到 Room 中，发布成功后其他用户将收到通知。
- Subscribe: 用户从 Room 中获取远端媒体流的信息，需要订阅后，才能接收到媒体数据。
