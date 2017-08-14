title: WDGVideo
---

`WDGVideo` 是程序的主入口，用于创建并配置本地媒体流，发起视频通话。

## 属性

### delegate

**定义**

```objectivec
@property (nonatomic, weak) id<WDGVideoDelegate> delegate;
```

**说明**

符合 [WDGVideoDelegate](/conversation/iOS/api/WDGVideoDelegate.html) 协议的代理，用于接收视频通话邀请、在 token 错误时接收错误信息。

</br>

---

## 方法

### + sharedVideo

**定义**

```objectivec
+ (instancetype)sharedVideo;
```

**说明**

用于获取 `WDGVideo`的单例。

**返回值**

`WDGVideo`实例。

</br>

---

### - configureWithVideoAppId: token: 

**定义**

```objectivec
- (void)configureWithVideoAppId:(NSString *)videoAppId token:(NSString *)token;
```

**说明**

用于配置 `WDGVideo` 单例。配置前需要通过 [WilddogAuth](https://docs.wilddog.com/auth/iOS/index.html) 登录以获取 token。

**参数**

 参数名 | 说明 
---|---
videoAppId | 在野狗控制面板创建App后分配的 Video AppID。
token      | 通过 [WilddogAuth](https://docs.wilddog.com/auth/iOS/index.html) 验证登录后获取的 Wilddog ID token。

</br>

---

### - setToken:

**定义**

```objectivec
- (void)setToken:(NSString *)token;
```

**说明**

设置 `WDGVideo` 单例的 token。配置完成后，仍然可以调用该方法来更改 token。

**参数**

 参数名 | 说明 
---|---
token | 通过 [WilddogAuth](https://docs.wilddog.com/auth/iOS/index.html) 登录的用户的 Wilddog ID token。

</br>

---

### - start

**定义**

```objectivec
- (void)start;
```

**说明**

开启或者重置与视频通话相关的 WebSocket 连接。执行 `- configureWithVideoAppId:token:` 时默认会自动开启 WebSocket 连接。

</br>

---

### - stop

**定义**

```objectivec
- (void)stop;
```

**说明**

断开与视频通话相关的 WebSocket 连接。

</br>

---

### - localStreamWithOptions: options:

**定义**

```objectivec
- (WDGLocalStream *)localStreamWithOptions:(WDGLocalStreamOptions *)options;
```

**说明**

创建本地的媒体流，通过传入一个 [WDGLocalStreamOptions](/conversation/iOS/api/WDGLocalStreamOptions.html) 实例配置媒体流。

**参数**

 参数名 | 说明 
---|---
options | [WDGLocalStreamOptions](/conversation/iOS/api/WDGLocalStreamOptions.html) 实例，用于配置本地视频和音频。

**返回值**

[WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html) 实例。

</br>

---

### - callWithUid: localStream: data:

**定义**

```objectivec
- (WDGConversation *)callWithUid:(NSString *)uid localStream:(WDGLocalStream *)localStream data:(NSString * _Nullable)data;
```

**说明**

发起视频通话邀请，需要指定被叫方的 uid，并且添加本地的媒体流。

**参数**

 参数名 | 说明 
---|---
uid         | 被叫方的 User ID。
localStream | [WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html) 实例，代表主叫方的本地媒体流。
data        | 随邀请传递的字符串类型的数据，可以为空。

**返回值**

[WDGConversation](/conversation/iOS/api/WDGConversation.html) 实例，代表主叫方创建的视频通话。

</br>

---
