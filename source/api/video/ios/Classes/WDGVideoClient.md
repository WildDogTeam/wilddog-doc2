title: WDGVideoClient
---

用于创建本地流，邀请其他用户进行会话。

## 属性

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoClientDelegate> delegate;
```

**说明**

符合 [WDGVideoClientDelegate](../Protocols/WDGVideoClientDelegate.html) 协议的代理，用于处理视频会话邀请消息。

</br>

---

## 方法

### -initWithSyncReference:user:

**定义**

```objectivec
- (nullable instancetype)initWithSyncReference:(nonnull WDGSyncReference *)syncReferenceuser:(nonnull WDGUser *)user;
```

**说明**

初始化 `WDGVideoClient` 实例。初始化时会从野狗服务器获取控制台配置信息，若控制台未开启实时视频及网络穿越开关，返回 nil 。

**参数**

 参数名 | 说明 
---|---
syncReference|用于数据交换的 [WDGSyncReference](../../../sync/ios/WDGSyncReference.html) 节点。如果后面使用 `Server-based` 模式建立会话，需要保证该路径和控制面板中的交互路径一致。
user|代表已登录用户的[WDGUser](../../../auth/ios/WDGUser.html)实例。

**返回值**

`WDGVideoClient` 实例，若初始化失败返回nil。

</br>

---

### -inviteUser:conversationMode:completion:

**定义**

```objectivec
- (WDGVideoOutgoingInvite *_Nullable)inviteUser:(nonnull NSString *)userIDconversationMode:(WDGVideoConversationMode)conversationModecompletion:(nonnull WDGVideoInviteAcceptanceBlock)completionHandler;
```

**说明**

邀请其他用户进行视频会话。

**参数**

 参数名 | 说明 
---|---
userID|被邀请的用户的uid。 
conversationMode|视频会话的通信模式，分为 `P2P` 和 `Server-based` 两种模式。若要使用 `Server-based` 模式，需在野狗控制台中开启服务器中转功能，同时配置交互路径和超级密钥。 
completionHandler|当邀请得到回应后，SDK通过该闭包通知邀请结果，若对方接受邀请，将以默认配置创建本地流，并在闭包中返回 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例，否则将在闭包中返回 `NSError` 说明邀请失败的原因。

**返回值**

[WDGVideoOutgoingInvite](../Classes/WDGVideoOutgoingInvite.html) 实例，可用于取消此次邀请。

</br>

---

### -inviteUser:localStream:conversationMode:completion:

**定义**

```objectivec
- (WDGVideoOutgoingInvite *_Nullable)inviteUser:(nonnull NSString *)userIDlocalStream:(nonnull WDGVideoLocalStream *)localStreamconversationMode:(WDGVideoConversationMode)conversationModecompletion:(nonnull WDGVideoInviteAcceptanceBlock)completionHandler;
```

**说明**

邀请其他用户进行视频会话。创建会话时使用指定的本地视频流。

**参数**

 参数名 | 说明 
---|---
userID|被邀请的用户的uid。 
localStream|邀请成功时使用该视频流创建会话。 
conversationMode|视频会话的通信模式，分为 `P2P` 和 `Server-based` 两种模式。若要使用 `Server-based` 模式，需在野狗控制台中开启服务器中转功能，同时配置交互路径和超级密钥。 
completionHandler|当邀请得到回应后，SDK通过该闭包通知邀请结果，若对方接受邀请，将以默认配置创建本地流，并在闭包中返回 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例，否则将在闭包中返回 `NSError` 说明邀请失败的原因。

**返回值**

[WDGVideoOutgoingInvite](../Classes/WDGVideoOutgoingInvite.html) 实例，可用于取消此次邀请。

</br>

---

### -localStreamWithConfiguration:

**定义**

```objectivec
- (nonnull WDGVideoLocalStream *)localStreamWithConfiguration:(nonnull WDGVideoLocalStreamConfiguration *)configuration;
```

**说明**

依照配置创建一个本地视频流。同一时刻只能存在一个本地视频流，若此时已经创建其他视频流，会自动将其他视频流关闭。

**参数**

 参数名 | 说明 
---|---
configuration|[WDGVideoLocalStreamConfiguration](../Classes/WDGVideoLocalStreamConfiguration.html) 实例。

**返回值**

创建的本地视频流 [WDGVideoLocalStream](../Classes/WDGVideoLocalStream.html) 实例。

</br>

---

### -meetingCastAddonWithConversation:delegate:

**定义**

```objectivec
- (WDGVideoMeetingCastAddon *_Nullable)meetingCastAddonWithConversation:(nonnull WDGVideoConversation *)conversationdelegate:(nonnull id<WDGVideoMeetingCastAddonDelegate>)delegate;
```

**说明**

创建直播插件，直播插件只适用于 `Server-based` 模式的会话，通过直播插件查看并控制当前视频会话的直播状态。

**参数**

 参数名 | 说明 
---|---
conversation|需要进行直播的会话，该会话必须为 `Server-based` 模式。
delegate|符合 [WDGVideoMeetingCastAddonDelegate](../Protocols/WDGVideoMeetingCastAddonDelegate.html) 的代理，用于处理直播状态变更消息。

**返回值**

[WDGVideoMeetingCastAddon](../Classes/WDGVideoMeetingCastAddon.html) 实例。
