title: 管理一对一视频通话
---

本篇文档介绍如何建立一对一视频通话。在主叫的一方，这个过程包括发起通话请求，收到回应，关闭通话；在被叫的一方，这个过程包括收到一对一视频通话请求，接受／拒绝通话请求，关闭通话。


## 发起通话请求

使用 `call(String remoteUid, LocalStream localStream, WilddogVideoCallOption option)` 来发起通话请求，该方法需要传递三个参数：

* remoteUid: 通话接收方的 `uid`，`uid` 是 WilddogAuth 为认证用户分配的唯一身份标识；
* localStream: 通话发起方的本地媒体流；
* option: 包括视频通话用户自定义信息、是否强制relay。

调用该方法返回 [Conversation](/conversation/Android/api/conversation.html) 实例，用于控制本次一对一视频通话。

```java
WilddogVideoCallOptions option = new WilddogVideoCallOptions.Builder()
                .iceTransportsPolicy(WilddogVideoCallOptions.IceTransportPolicy.ALL)
                .data("conversationDemo")
                .build();
mConversation = video.call(remoteUid,localStream,option);
```

> 注：每个客户端同一时间只能存在一个通话。发起电话请求时，默人会挂断前一次通话。

## 收到通话请求

其他用户发来通话请求时，用户可以从 [WilddogVideoCall](/conversation/Android/api/wilddog-video-call.html) 的listener得到通知，并获得 [Conversation](/conversation/Android/api/conversation.html) 实例：

```java

public void onCalled(Conversation conversation, String s) {
     mConversation = conversation;
     Log.d("log",s);
}

}
```

## 设置通话代理

设置 [Conversation](/conversation/Android/api/conversation.html) 的代理[Conversation.Listener](/conversation/Android/api/conversation-listener.html)用于监听通话状态。

```java
conversation.setConversationListener(new Conversation.Listener() {
    @Override
    public void onCallResponse(CallStatus callStatus) {
                       
    }

    @Override
    public void onStreamReceived(RemoteStream remoteStream) {

    }

    @Override
    public void onClosed() {

    }

    @Override
    public void onError(WilddogVideoError wilddogVideoError) {

    }
});
```

[Conversation.Listener](/conversation/Android/api/conversation-listener.html) 包含四个方法：

方法名  | 说明
------ | ------
`onCallResponse(CallStatus callStatus)` | 发起通话请求后，通话状态发生变化会触发该方法。通话状态包含接收、拒绝、繁忙和请求超时。
`onStreamReceived(RemoteStream remoteStream)`   | 收到远端媒体流时，触发该方法。
`onError(WilddogVideoError wilddogVideoError)` | 通话发生错误时，触发该方法。
`onClosed()`           | 通话被关闭时，触发该方法。

## 接受／拒绝通话请求

使用 `accept(final LocalStream localStream)` 来接受通话请求，该方法需要传入本地媒体流，本地流的创建请参考 [创建媒体流](/conversation/Android/guide/2-mediaStream.html)：

```java
mConversation.accept(localStream);
```

使用 `reject()` 来拒绝通话请求：

```java
mConversation.reject();
```

接受／拒绝对方的通话请求后，对方会通过 `onCallResponse(CallStatus callStatus)` 收到 ACCEPT / REJECT 状态的通知：

```java

public void onCallResponse(CallStatus callStatus) {
            switch (callStatus){
                case ACCEPTED:
                    Log.d("log","通话被接受");
                    break;
                case REJECTED:
                    Log.d("log","通话被拒绝");
                    break;
                case BUSY:
                    Log.d("log","正忙");
                    break;                
                case TIMEOUT:
                    Log.d("log","超时");
                    break;                
                default:
                    Log.d("log","状态未识别");
                    break;
                    

            }
        }
```

## 关闭一对一视频通话

使用 `close()` 来取消呼叫或者结束通话。

```java
mConversation.close();
mConversation=null;
```

通话被关闭后，对方会通过 `onClosed()` 收到通话结束的通知：

```
public void onClosed() {
    mConversation.close();
    mConversation=null;
}
```
