title: WDGVideoClient
---

用于创建本地流，发起、加入视频通话。

## 属性

### delegate

**定义**

```objectivec
@property (readwrite, nonatomic, nullable) id<WDGVideoClientDelegate> delegate;
```

**说明**

符合 [WDGVideoClientDelegate](../Protocols/WDGVideoClientDelegate.html) 协议的代理，用于处理视频通话邀请消息。

</br>

---

### uid

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull uid;
```

**说明**

Client 对应的 Wilddog ID。

</br>

---

## 方法

### -initWithApp:

**定义**

```objectivec
- (nullable instancetype)initWithApp:(nonnull WDGApp *)app;
```

**说明**

初始化 `WDGVideoClient` 实例。在初始化前需要先通过 `WDGAuth` 登录。

**参数**

 参数名 | 说明 
---|---
app|`WDGApp` 对象。

**返回值**

`WDGVideoClient` 实例，若初始化失败返回nil。

</br>

---

### -initWithApp:options:

**定义**

```objectivec
- (nullable instancetype)initWithApp:(nonnull WDGApp *)app options:(nonnull WDGVideoClientOptions *)options;
```

**说明**

初始化 `WDGVideoClient` 实例。在初始化前需要先通过 `WDGAuth` 登录。

**参数**

 参数名 | 说明 
---|---
app|`WDGApp` 对象。
options|配置选项。

**返回值**

`WDGVideoClient` 实例，若初始化失败返回nil。

</br>

---

### -inviteToConversationWithID:options:completion:

**定义**

```objectivec
- (WDGVideoOutgoingInvite *_Nullable)inviteToConversationWithID:(nonnull NSString *)participantID options:(nonnull WDGVideoConnectOptions *)options completion:(nonnull WDGVideoInviteAcceptanceBlock)completionHandler;
```

**说明**

邀请其他用户进行视频通话。

**参数**

 参数名 | 说明 
---|---
participantID|被邀请者的 Wilddog ID。 
options|邀请成功时使用该配置项创建通话。 
completionHandler|当邀请得到回应后，SDK 通过该闭包通知邀请结果，若对方接受邀请，在闭包中返回 [WDGVideoConversation](../Classes/WDGVideoConversation.html) 实例，否则将在闭包中返回 `NSError` 说明邀请失败的原因。

**返回值**

[WDGVideoOutgoingInvite](../Classes/WDGVideoOutgoingInvite.html) 实例，可用于取消此次邀请。

</br>

---

### -connectToConferenceWithID:options:delegate:

**定义**

```objectivec
- (nonnull WDGVideoConference *)connectToConferenceWithID:(nonnull NSString *)conferenceID options:(nonnull WDGVideoConnectOptions *)options delegate:(nonnull id<WDGVideoConferenceDelegate>)delegate;
```

**说明**

连接到 ID 为 `conferenceID` 的会议中。

**参数**

 参数名 | 说明 
---|---
conferenceID|连接的会议 ID。
options|[WDGVideoConnectOptions](../Classes/WDGVideoConnectOptions.html) 实例，用于配置连接会议所用的选项。
delegate|满足 [WDGVideoConferenceDelegate](../Protocols/WDGVideoConferenceDelegate.html) 协议的代理。

**返回值**

[WDGVideoConference](../Classes/WDGVideoConference.html) 实例。
