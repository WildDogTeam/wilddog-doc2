title: 创建视频会议
---

创建视频会议包括配置和预览本地媒体流、发起/加入视频会议。

## 配置和预览本地媒体流

本地媒体流( [Local Stream](/conference/iOS/guide/core.html#Local-Stream) )包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

例如，创建一个只有视频且分辨率为 640X480 的流，并展示出来：

```objectivec
// 设置本地媒体流选项
WDGVideoLocalStreamOptions *localStreamOptions = [[WDGVideoLocalStreamOptions alloc] init];
localStreamOptions.audioOn = NO;
localStreamOptions.videoOption = WDGVideoConstraintsStandard;
// 创建本地媒体流
self.localStream = [[WDGVideoLocalStream alloc] initWithOptions:localStreamOptions];
// 预览本地媒体流
// 如果没有获得摄像头权限或无摄像头，则无法展示。
[self.localStream attach:self.localVideoView];
```

## 发起/加入视频会议

通过 Conference ID 发起/加入一个视频会议。如果该会议不存在，系统会以你作为第一个参与者发起该会议。

例如，加入 Conference ID 为 '123456' 的视频会议：

```objectivec
WDGVideoConnectOptions *connectOptions = [[WDGVideoConnectOptions alloc] initWithLocalStream:self.localStream];
self.conference = [self.wilddogVideoClient connectToConferenceWithID:@"123456" options:connectOptions delegate:self];
```