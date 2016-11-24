
## 初始化

使用 Wilddog IM SDK 首先需要初始化配置，初始化之后才可以进行创建对话、收发消息等一些操作。

* 1.初始化 SDK
* 2.监听连接状态
* 3.登录和监听用户登录状态

### 初始化 SDK
Wilddog IM SDK 的主要入口为 WDGIMClient，一切操作都从此入口开始。SDK 操作第一步需要创建 WDGIMClient。例如:

```objectivec
[WDGIMClient clientWithAppID:@"your appID" delegate:self];

```

### 监听连接状态

这个方法可以监听 SDK 与 Wilddog 的连接和断开状态。需要注意的是，WDGIMClient 因某种原因导致的连接错误或者连接中断，SDK 内部都有相应的容错机制和重连机制，用户无需关心。

```objectivec
[[WDGIMClient defaultClient] connectWithCompletion:^(BOOL success, NSError * _Nullable error)completion {
     //...
}];
    
```
	
### 登录和监听用户登录状态

通过 WDGIMClient 中 `- signInWithCustomToken:completion:` 方法既可以进行登录，还可以监听用户的登录状态。

```objectivec
// 用 Wilddog Auth Token 登录
[[WDGIMClient defaultClient] signInWithCustomToken:wilddogToken completion:^(WIMUser * _Nullable currentUser, NSError * _Nullable error) {
     //...   
}];

```	

登录之后，就可以在 `-wilddogClient:didRecieveMessages:` 和 `-wilddogClient:didGroupInfoChange:` 协议方法中，接收到聊天消息和群提示消息。
