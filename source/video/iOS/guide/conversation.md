title: 视频通话
---

本篇文档介绍开发视频通话的主要环节，包括 [创建视频通话](/video/iOS/guide/conversation.html#创建视频通话)、[管理其他参与者](/video/iOS/guide/conversation.html#管理其他参与者)、[加入视频通话相关](/video/iOS/guide/conversation.html#加入视频通话相关) 和 [数据安全性](/video/iOS/guide/conversation.html#数据安全性)。

## 创建视频通话

创建视频通话包括配置和预览本地媒体流、发起视频通话。

### 配置和预览本地媒体流

本地媒体流( [Local Stream](/video/iOS/guide/core.html#Local-Stream) )包括音频和视频，发起或加入会议前需要进行配置，成功加入一个会议后，该媒体流会发送给其他参与者。

例如，创建一个同时有音频和视频的本地媒体流并展示出来：

```objectivec
// 设置本地媒体流选项
WDGVideoLocalStreamOptions *localStreamOptions = [[WDGVideoLocalStreamOptions alloc] init];
localStreamOptions.audioOn = YES;
localStreamOptions.videoOption = WDGVideoConstraints720p;
// 创建本地媒体流
self.localStream = [[WDGVideoLocalStream alloc] initWithOptions:localStreamOptions];
// 预览本地媒体流
// 如果没有获得摄像头权限或无摄像头，则无法展示。
[self.localStream attach:self.localVideoView];
```

### 发起视频通话

只有另一个 [Client](/video/iOS/guide/core.html#Client) 接受了一方的邀请，通话才能建立成功。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  视频通话使用实时数据库中的 `/wilddogVideo` 节点进行信令交互，为避免影响视频通话功能的使用，请勿操作该节点。
</blockquote>


例如，发起一对一视频通话：

```objectivec
WDGVideoConnectOptions *connectOptions = [[WDGVideoConnectOptions alloc] initWithLocalStream:self.localStream];
WDGVideoOutgoingInvite *outgoingInvitation = [self.wilddogVideoClient inviteToConversationWithID:wilddogID options:connectOptions completion:^(WDGVideoConversation *conversation, NSError *error) {
    __strong __typeof__(self) strongSelf = weakSelf;
    if (strongSelf == nil) {
        return;
    }

    if (error != nil) {
        NSString *errorMessage = [NSString stringWithFormat:@"邀请用户错误(%@): %@", userID, [error localizedDescription]];
        NSLog(errorMessage);
        return;
    }

    strongSelf.videoConversation = conversation;
    strongSelf.videoConversation.delegate = strongSelf;
}];
```

## 管理其他参与者

管理其他参与者包括处理其他参与者的连接事件和播放其他参与者的媒体流。


### 处理其他参与者的连接事件

通过监听其他参与者加入或离开的事件，来获得其状态通知。

例如，打印加入、离开的日志：

```objectivec
- (void)conversation:(WDGVideoConversation *)conversation didConnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog(@"Participant %@ connected", participant);
    participant.delegate = self;
}
- (void)conversation:(WDGVideoConversation *)conversation didDisconnectParticipant:(WDGVideoParticipant *)participant
{
    NSLog(@"Participant %@ disconnected", participant);
}
```

### 播放其他参与者的媒体流

通过展示其他参与者的视频流来观看其视频画面。

例如，当监听到参与者加入视频通话时展示参与者的媒体流：

```objectivec
- (void)participant:(WDGVideoParticipant *)participant didAddStream:(WDGVideoRemoteStream *)stream
{
    // 参与者成功加入会议，将参与者的视频流展示出来
    NSLog(@"receive stream %@ from participant %@", stream, participant);
    self.remoteStream = stream;
    [self.remoteStream attach:self.remoteVideoView];
}
```

## 加入视频通话相关

视频通话相关操作包括接受或拒绝邀请、离开视频通话。

### 接受或拒绝邀请

初始化 Client 之后，监听邀请事件接收另一个 Client 发起的邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请后，接受邀请：

```objectivec
- (void)wilddogVideoClient:(WDGVideoClient *)videoClient didReceiveInvite:(WDGVideoIncomingInvite *)invite
{
    __weak __typeof__(self) weakSelf = self;
    [invite acceptWithLocalStream:self.localStream completion:^(WDGVideoConversation *conversation, NSError *error) {
        __strong __typeof__(self) strongSelf = weakSelf;
        if (strongSelf == nil) {
            return;
        }
        if (error != nil) {
            NSString *errorMessage = [NSString stringWithFormat:@"接受邀请错误: %@", [error localizedDescription]];
            NSLog(errorMessage);
            return;
        }

        strongSelf.videoConversation = conversation;
        strongSelf.videoConversation.delegate = strongSelf;
    }];
}
```

### 离开视频通话

离开一个正在进行的视频通话并释放媒体资源。可以直接释放媒体资源或通过监听离开通话事件在成功离开通话后释放媒体资源。

例如，断开视频通话并释放不使用的资源：

```objectivec
[self.videoConversation disconnect];
[self.remoteStream detach:self.remoteVideoView];
self.remoteStream = nil;
self.videoConversation = nil;
```

## 处理视频流

### 美颜滤镜

设置 `WDGVideoLocalStream` 的 `delegate` 来获取本地视频流，可以对视频流做美颜处理再返回给野狗 SDK。

```objectivec
WDGVideoLocalStream *localStream = [[WDGVideoLocalStream alloc] initWithOptions:localStreamOptions];
localStream.delegate = self;

- (CVPixelBufferRef)processPixelBuffer:(CVPixelBufferRef)pixelBuffer {
    // 使用第三方 SDK 处理当前图片。
    return [BeautySDK process:pixelBuffer];
}
```
## 统计视频数据

使用 `WDGVideoConversation` 中的 `statsDelegate` 属性可以实时获取视频的宽、高、帧率、发送接收总大小、比特率、延迟等。

设置代理：

```objectivec
// videoConversation 为要请成功活着接收邀请成功返回的参数。
self.videoConversation = self;
```

### 统计本地视频数据

实现本地视频数据统计接口。

```objectivec
- (void)conversation:(WDGVideoConversation *)conversation didUpdateLocalStreamStatsReport:(WDGVideoLocalStreamStatsReport *)report {
    // report.width
    // report.height
    // report.FPS
    // report.bytesSent
    // report.bitsSentRate
}
```

### 统计远程视频数据

实现远程视频数据接口。

```objectivec
- (void)conversation:(WDGVideoConversation *)conversation didUpdateRemoteStreamStatsReport:(WDGVideoRemoteStreamStatsReport *)report {
    // report.width
    // report.height
    // report.FPS
    // report.bytesReceived
    // report.bitsReceivedRate
    // report.delay
}
```