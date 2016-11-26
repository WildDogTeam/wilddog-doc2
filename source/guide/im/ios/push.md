title: 离线推送 
---
本篇文档介绍如何使用离线推送。

用户进入应用后台或者断开与 Wilddog 服务器的连接的时候，收到的消息将通过推送通知的形式传递给用户，用户可以自定义点击推送通知之后的操作。

离线推送分为以下三个步骤：
1. 配置推送证书
2. 绑定 deviceToken。
3. 处理推送数据。

## 配置推送证书
首先，你需要在 控制面板-即时通讯-基本配置-iOS配置 中配置 APNs 证书。

![](http://ocpo37x5v.bkt.clouddn.com/2016-11-26-iOS%20push.jpg)


## 绑定 deviceToken
`-updateRemoteNotificationDeviceToken:error:` 方法用于绑定 deviceToken：

```objc
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [[WDGIMClient defaultClient] updateRemoteNotificationDeviceToken:deviceToken error:nil];
}
```

## 处理推送数据
`-synchronizeWithRemoteNotification:completion:` 方法用于将收到的消息同步给 Wilddog IM SDK：


```objc
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
    
   [[WDGIMClient defaultClient] synchronizeWithRemoteNotification:userInfo completion:^(WDGIMConversation * _Nullable conversation, WDGIMMessage * _Nullable message, NSError * _Nullable error) {
        
   }];
}
    
```