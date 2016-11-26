title: 离线推送 
---
本篇文档介绍如何使用离线推送。

用户进入应用后台或者断开与 Wilddog 服务器的连接的时候，收到的消息将通过推送通知的形式传递给用户，用户可以自定义点击通知之后的操作。

### 绑定 deviceToken

首先需要绑定 deviceToken，可以使用 `-updateRemoteNotificationDeviceToken:error:` 方法 。
例如：

```objc
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [[WDGIMClient defaultClient] updateRemoteNotificationDeviceToken:deviceToken error:nil];
}
```

### 处理推送数据
`-synchronizeWithRemoteNotification:completion:` 方法用于将收到的消息同步给 Wilddog IM SDK。

例如：

```objc
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
    
   [[WDGIMClient defaultClient] synchronizeWithRemoteNotification:userInfo completion:^(WDGIMConversation * _Nullable conversation, WDGIMMessage * _Nullable message, NSError * _Nullable error) {
        
   }];
}
    
```