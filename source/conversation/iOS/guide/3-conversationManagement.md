title: 管理视频通话
---

本篇文档介绍如何建立视频通话。在主叫的一方，这个过程包括发起通话请求，收到回应，关闭通话；在被叫的一方，这个过程包括收到视频通话请求，接受／拒绝通话请求，关闭通话。


## 发起通话请求

使用 `-[WDGVideo callWithUid:localStream:data:]` 来发起通话请求，该方法需要传递三个参数：

* remoteUid: 通话接收方的 `uid`，`uid` 是 WilddogAuth 为认证用户分配的唯一身份标识；
* localStream: 通话发起方的本地媒体流；
* data: 用户自定义信息，可以为空。

调用该方法返回 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例，用于控制本次视频通话。

```objectivec
self.conversation = [self.video callWithUid:@"remote-uid" localStream:self.localStream data:@"custom-data";
self.conversation.delegate = self;
```

> 注：每个客户端同一时间只能存在一个通话。发起电话请求时，默人会挂断前一次通话。

## 收到通话请求

其他用户发来通话请求时，用户可以从 [WDGVideo](/conversation/iOS/api/WDGVideo.html) 的代理得到通知，并获得 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例：

```objectivec
- (void)wilddogVideo:(WDGVideo *)video didReceiveCallWithConversation:(WDGConversation *)conversation data:(NSString *)data {
    self.conversation = conversation;
    self.conversation.delegate = self;
    NSLog("%@", data);
}
```

## 设置通话代理

设置 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 的代理 <[WDGConversationDelegate](/conversation/iOS/api/WDGConversationDelegate.html)> 用于监听通话状态。

```objectivec
self.conversation.delegate = self;
```

[WDGConversationDelegate](/conversation/iOS/api/WDGConversationDelegate.html) 包含四个方法：

方法名  | 说明
------ | ------
`-conversation:didReceiveResponse:` | 发起通话请求后，通话状态发生变化会触发该方法。通话状态包含接收、拒绝、繁忙和请求超时。
`-conversation:didReceiveStream:`   | 收到远端媒体流时，触发该方法。
`-conversation:didFailedWithError:` | 通话发生错误时，触发该方法。
`-conversationDidClosed:`           | 通话被关闭时，触发该方法。

## 接受／拒绝通话请求

使用 `-[WDGConversation acceptWithLocalStream:]` 来接受通话请求，该方法需要传入本地媒体流，本地流的创建请参考 [创建媒体流](/conversation/iOS/guide/2-mediaStream.html)：

```objectivec
[self.conversation acceptWithLocalStream:self.localStream];
```

使用 `-[WDGConversation reject]` 来拒绝通话请求：

```objectivec
[self.conversation reject];
```

接受／拒绝对方的通话请求后，对方会通过 `-[WDGConversationDelegate conversation:didReceiveResponse:` 收到 ACCEPT / REJECT 状态的通知：

```objectivec
- (void)conversation:(WDGConversation *)conversation didReceiveResponse:(WDGCallStatus)callStatus {
    switch (callStatus) {
        case WDGCallStatusAccepted:
            NSLog(@"通话被接受");
            break;
        case WDGCallStatusRejected:
            NSLog(@"通话被拒绝");
            break;
        case WDGCallStatusBusy:
            NSLog(@"正忙");
            break;
        case WDGCallStatusTimeout:
            NSLog(@"超时");
            break;
        default:
            NSLog(@"状态未识别");
            break;
    }
}
```

## 关闭视频通话

使用 `-[WDGConversation close]` 来取消呼叫或者结束通话。

```objectivec
[self.conversation close];
// 释放不使用的资源
self.conversation = nil;
```

通话被关闭后，对方会通过 `-[WDGConversationDelegate conversationDidClosed]` 收到通话结束的通知：

```
- (void)conversationDidClosed:(WDGConversation *)conversation {
    NSLog(@"通话已结束");
    // 释放不使用的资源
    self.conversation = nil;
}
```
