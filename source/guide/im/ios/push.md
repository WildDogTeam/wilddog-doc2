title: 离线推送 
---
本篇文档介绍如何使用离线推送。

用户进入应用后台或者断开与 Wilddog 服务器的连接的时候，收到的消息将通过推送通知的形式传递给用户，用户可以自定义点击推送通知之后的操作。

离线推送分为以下两个步骤：
1. 配置推送证书
2. 绑定 deviceToken。

## 配置推送证书
首先，你需要在 控制面板-即时通讯-基本配置-iOS配置 中配置 APNs 证书。

![](http://ocpo37x5v.bkt.clouddn.com/2016-11-26-im-ios-push.png)


## 绑定 deviceToken
`+ updateRemoteNotificationDeviceToken:` 方法用于绑定 deviceToken：

```objc
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [WDGIMNotify updateRemoteNotificationDeviceToken:deviceToken];
}
```

## 解绑 deviceToken
`+ unbindDeviceTokenWithCompletion:` 方法用于解绑 deviceToken：

```objc
[WDGIMNotify unbindDeviceTokenWithCompletion:^(NSError * _Nullable error) {

}];
```
