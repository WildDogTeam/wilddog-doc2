title: WDGVideoCall
---

`WDGVideoCall` 是程序的主入口，用于创建并配置本地媒体流，发起一对一视频通话。

## 属性

### delegate

**定义**

```objectivec
@property (nonatomic, weak) id<WDGVideoCallDelegate> delegate;
```

**说明**

符合 [WDGVideoCallDelegate](/conversation/iOS/api/WDGVideoCallDelegate.html) 协议的代理，用于接收一对一视频通话邀请、在 token 错误时接收错误信息。

</br>

---

## 方法

### + sharedInstance

**定义**

```objectivec
+ (instancetype)sharedInstance;
```

**说明**

用于获取 `WDGVideoCall`的单例。

**返回值**

`WDGVideoCall`实例。

</br>

---

### - start

**定义**

```objectivec
- (void)start;
```

**说明**

开启或者重置与一对一视频通话相关的 WebSocket 连接。执行 `- configureWithVideoAppId:token:` 时默认会自动开启 WebSocket 连接。

</br>

---

### - stop

**定义**

```objectivec
- (void)stop;
```

**说明**

断开与一对一视频通话相关的 WebSocket 连接。

</br>

---

### - callWithUid: localStream: data:

**定义**

```objectivec
- (WDGConversation *)callWithUid:(NSString *)uid localStream:(WDGLocalStream *)localStream data:(NSString * _Nullable)data;
```

**说明**

发起一对一视频通话邀请，需要指定被叫方的 uid，并且添加本地的媒体流。

**参数**

参数名             | 说明
------------------|------------------
uid               | 被叫方的 [User ID](/auth/iOS/api/WDGUserInfo.html#uid)。
localStream       | 代表主叫方的本地媒体流。请参考 [WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html)。
data              | 随邀请传递的字符串类型的数据，可以为空。

**返回值**

[WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例，代表主叫方创建的一对一视频通话。

</br>

---
