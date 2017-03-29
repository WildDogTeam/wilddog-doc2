title: WDGIMNotify
---
WDGIMNotify 是关于 Wilddog IM SDK 推送消息类。

## 方法

### + updateRemoteNotificationDeviceToken:

**定义**

```objective-c
+ (BOOL)updateRemoteNotificationDeviceToken:(nullable NSData *)deviceToken
```

**说明**

给 Wilddog IM 服务器上传 deviceToken，同时绑定推送相关的设备和用户，登录用户开始接受推送消息。

**参数**

参数名 | 描述
-----|------
deviceToken | deviceToken

**返回值**

上传是否成功，YES 为成功

</br>

------

### + unbindDeviceTokenWithCompletion:

**定义**

```objective-c
+ (void)unbindDeviceTokenWithCompletion:(void (^)(NSError * _Nullable error))completion
```
 
**说明**

解除绑定推送相关的设备和用户，解绑成功后该用户不再收到推送消息。
 
**参数**

参数名 | 描述
-----|------
completion | 结果回调 


