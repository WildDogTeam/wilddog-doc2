title: WDGIMClient 
---
WDGIMClient 是 Wilddog IM SDK 各个功能模块的入口。一个 appID 对应一个 Wilddog 应用。

## 属性

### delegate

**定义**

```objectivec
@property (nonatomic, weak) id <WDGIMClientDelegate> delegate
```

**说明**

Client 的代理。

</br>

------

### isConnecting

**定义**

```objectivec
@property (nonatomic, readonly) BOOL isConnecting
```

**说明**

正在连接 Wilddog IM 服务器。

</br>

------

### isConnected

**定义**

```objectivec
@property (nonatomic, readonly) BOOL isConnected
```

**说明**

已连接 Wilddog IM 服务器。

</br>

------

### currentUser

**定义**

```objectivec
@property (nonatomic, strong) WDGIMUser *currentUser
```

**说明**

当前登录用户。

</br>

------


## 方法

### + defaultClient

**定义**

```objective-c
+ (instancetype)defaultClient
```

**说明**

获取 Client 单例。

**返回值**

WDGIMClient 单例对象

</br>

------

### + clientWithAppID:delegate:

**定义**

```objective-c
+ (instancetype)clientWithAppID:(NSString *)appID delegate:(id<WDGIMClientDelegate>)delegate
```
 
**说明**

用于配置初始化时的必要参数，如：appID。
 
**参数**

参数名 | 描述
-----|------
appID | Wilddog appID
delegate | 代理 

**返回值**

WDGIMClient 单例对象

</br>

------

### - connectWithCompletion:

**定义**

```objective-c
- (void)connectWithCompletion:(nullable void (^) (BOOL success, NSError *_Nullable error))completion
```

**说明**

连接 Wilddog IM 服务器。
  
**参数**

参数名 | 描述
-----|------
completion | 连接结果回调

</br>

------

### - disconnect

**定义**

```objective-c
- (void)disconnect
```

**说明**

断开 Wilddog IM 服务器。
  
</br>

------

### - signInWithCustomToken:completion:

**定义**

```objective-c
- (void)signInWithCustomToken:(NSString *)token completion:(void (^) (WDGIMUser* _Nullable currentUser, NSError * _Nullable error))completion
```
  
**说明**

用户服务器生成的 token 登录 Wilddog IM 服务器。

**参数**

参数名 | 描述
-----|------
token | Wilddog 指定 token
completion | 结果回调
	
</br>

------

### - signOut:

**定义**

```objective-c
- (BOOL)signOut:(NSError *_Nullable *_Nullable)error
```
  
**说明**

登出 Wilddog IM 服务器。

**参数**

参数名 | 描述
-----|------
error | 错误信息
	
</br>

------

### - updateRemoteNotificationDeviceToken:error:

**定义**

```objective-c
- (BOOL)updateRemoteNotificationDeviceToken:(nullable NSData *)deviceToken error:(NSError * _Nullable __autoreleasing *)error
```
  
**说明**

远程推送，给 Wilddog IM 服务器上传 deviceToken。

**参数**

参数名 | 描述
-----|------
deviceToken | deviceToken
error | 错误信息
	
**返回值**

上传状态，YES 为成功。

</br>

------

### - synchronizeWithRemoteNotification:completion:

**定义**

```objective-c
- (BOOL)synchronizeWithRemoteNotification:(NSDictionary *)userInfo completion:(void (^) (WDGIMConversation * _Nullable conversation, WDGIMMessage * _Nullable message, NSError * _Nullable error))completion
```
  
**说明**

接收远程推送来的消息。

**参数**

参数名 | 描述
-----|------
userInfo | 推送消息体
completion | 结果回调
	
**返回值**

接收推送消息的状态， YES 为接收成功。

</br>

------

### - newConversationWithMembers:completion:

**定义**

```objective-c
- (void)newConversationWithMembers:(NSArray<NSString *> *)members completion:(void (^) (WDGIMConversation * _Nullable conversation, NSError * _Nullable * _Nullable error))completion
```
  
**说明**

创建一个聊天会话。members 的数量两个人为单聊（包括登录用户），三个人及以上都为群聊。。

**参数**

参数名 | 描述
-----|------
members | 聊天成员（默认包含已登录用户 ID）
completion | 结果回调
	
</br>

------

### - getConversations

**定义**

```objective-c
- (nullable NSArray *)getConversations
```
  
**说明**

获取所有会话。

**返回值**

会话数组
	
</br>

------


### - getConversation:

**定义**

```objective-c
- (nullable WDGIMConversation *)getConversation:(NSString *)conversationID
```
  
**说明**

获取指定会话。

**参数**

参数名 | 描述
-----|------
conversationID | 会话 ID
	
**返回值**

会话对象

