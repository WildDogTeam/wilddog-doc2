title:  iOS API 文档
---

## WDGAuth (*Methods*)

### + auth
 
 定义

`+ (nullable WDGAuth *)auth NS_SWIFT_NAME(auth())`

 说明

获取初始化的 WDGApp 所对应的 WDGAuth。

 返回值
 
WDGAuth 对象。

----
### + authWithApp:

 定义

`+ (nullable WDGAuth *)authWithApp:(WDGApp *)app`

 说明

用自己创建的 WDGApp 获取对应的 WDGAuth 对象。

 参数

WDGAuth 对象。

 描述

能确保线程安全。

----
### currentUser
 
 定义

`@property(nonatomic, strong, readonly, nullable) WDGUser *currentUser`

 说明

同步的获取当前缓存的用户，如果没有登录用户则为 null。

----
### - fetchProvidersForEmail:completion:

 定义

`- (void)fetchProvidersForEmail:(NSString *)email
                    completion:(nullable WDGProviderQueryCallback)completion`

 说明

通过邮箱来获取用户的所有登录方式。登录方式可能有（password，qq，weixin，weibo，custom，anonymous）。

 参数

email 用户的邮箱。  
completion 可以为空；返回用户的登录方式列表或者错误信息。异步等待，会在主线程中回调。

 描述
 
可能发生的错误：
 
 - WDGAuthErrorCodeInvalidEmail - 表示邮箱格式错误。
 - See WDGAuthErrors API 调用可能发生的所有错误。

----
### - signInWithEmail:password:completion:

 定义

`- (void)signInWithEmail:(NSString *)email
               password:(NSString *)password
             completion:(nullable WDGAuthResultCallback)completion`

 说明

以邮箱和密码的方式登录。

 参数

email 用户的邮箱地址。  
password 用户的登录密码。  
completion 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

 描述
 
可能发生的错误：
 
 - WDGAuthErrorCodeOperationNotAllowed 表示密码登录的方式没有打开，可以在野狗控制面板中打开这个选项。
 - WDGAuthErrorCodeUserDisabled 表示这个用户被禁止登录。
 - WDGAuthErrorCodeWrongPassword 表示邮箱或者密码错误。
 - See WDGAuthErrors API 调用可能发生的所有错误。
 
----
### - signInWithCredential:completion:

 定义

`- (void)signInWithCredential:(WDGAuthCredential *)credential
                  completion:(nullable WDGAuthResultCallback)completion`

 说明

使用第三方认证方式登录（e.g. 新浪微博，qq，weixin 授权后使用它们的 Access Token 和 openId 在野狗服务器上生成用户）

 参数

credential 第三方提供的凭证。  
completion 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

 描述
 
可能发生的错误：
 
 - WDGAuthErrorCodeInvalidCredential 表示无效的登录方式。
 - WDGAuthErrorCodeOperationNotAllowed 表示这种登录方式没有打开，可以在野狗控制面板中打开这个选项。
 - WDGAuthErrorCodeUserDisabled 表示账号被禁用。
 - WDGAuthErrorCodeWrongPassword 表示邮箱或着密码错误。
 - See WDGAuthErrors API 调用可能发生的所有错误。

----
### - signInAnonymouslyWithCompletion:

 定义

`- (void)signInAnonymouslyWithCompletion:(nullable WDGAuthResultCallback)completion`

 说明

匿名登录方式。

 参数

completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

如果已经有一个匿名用户登录，那么会替换这个用户。如果已经有其他用户登录，那么会先把他退出登录。  
可能发生的错误：
 
 -  WDGAuthErrorCodeOperationNotAllowed 表示匿名登录方式没有打开，可以在野狗的控制面板中打开这个选项。
 - See WDGAuthErrors API 调用可能发生的所有错误。
 
---- 
### - signInWithCustomToken:completion:

 定义

`- (void)signInWithCustomToken:(NSString *)token
                   completion:(nullable WDGAuthResultCallback)completion`

 说明

以自定义 token 的方式登录。

 参数

token 自定义的 token。    
completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述
 
可能发生的错误：
 
 - WDGAuthErrorCodeInvalidCustomToken 无效的 custom token。
 - WDGAuthErrorCodeCustomTokenMismatch Indicates the service account and the API key
 belong to different projects.
 - See WDGAuthErrors API 调用可能发生的所有错误。

----
### - createUserWithEmail:password:completion:

 定义
`- (void)createUserWithEmail:(NSString *)email
                   password:(NSString *)password
                 completion:(nullable WDGAuthResultCallback)completion`

 说明

创建一个新用户，创建成功后会自动登录。

 参数

email 用户的邮箱地址。  
password 用户指定的密码。  
completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

可能发生的错误：
 
 - WDGAuthErrorCodeInvalidEmail 表示邮箱格式错误。
 - WDGAuthErrorCodeEmailAlreadyInUse 表示邮箱已经被注册。
 - WDGAuthErrorCodeOperationNotAllowed 表示匿名登录方式没有打开，可以在野狗的控制面板中打开这个选项。
 - WDGAuthErrorCodeWeakPassword 密码不符合规定。
 - See WDGAuthErrors API 调用可能发生的所有错误。
 
----
### - sendPasswordResetWithEmail:completion:

 定义

`- (void)sendPasswordResetWithEmail:(NSString *)email
                        completion:(nullable WDGSendPasswordResetCallback)completion`

 说明

通过邮箱找回密码。

 参数

email 用户的邮箱地址。  
completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

可能发生的错误：
 
- See WDGAuthErrors API 调用可能发生的所有错误。

----
### - signOut:

 定义

`- (BOOL)signOut:(NSError *_Nullable *_Nullable)error`

 说明

退出登录。

 参数

error 可以为空；如果发生错误，会以 NSError 的方式返回错误描述。nil 表示成功。

 返回值

YES 表示退出登录成功。NO 表示失败

----
### - addAuthStateDidChangeListener:

 定义

`- (WDGAuthStateDidChangeListenerHandle)addAuthStateDidChangeListener:(WDGAuthStateDidChangeListenerBlock)listener`

 说明

监听用户 auth 状态。发生以下条件时会被调用：
 
 - 第一次调用时，
 - 当前用户切换时，
 - 或者当前用户的 idToken 变化时。

 参数

listener 状态变化时调用的 block。异步等待，会在主线程中回调。

 返回值

返回这个 block 的唯一标示，用于移除这个 block。

 描述

这个方法被调用时就会触发 block 的回调。之后会一直处于监听状态，并且 block 会被 WDGAuth 持有，直到移除这个监听。需要防止引用循环。

----
### - removeAuthStateDidChangeListener:

 定义

`- (void)removeAuthStateDidChangeListener:(WDGAuthStateDidChangeListenerHandle)listenerHandle`

 说明

移除 auth 状态变更监听。

 参数

listenerHandle WDGAuth.addAuthStateDidChangeListener: 返回的句柄。

----
## WDGAuthCredential (*Methods*)

### provider

 定义

`@property(nonatomic, copy, readonly) NSString *provider`

 说明

获取凭证的 id 名。

----
## WDGEmailPasswordAuthProvider (*Methods*)

### + credentialWithEmail: password:

 定义

`+ (WDGAuthCredential *)credentialWithEmail:(NSString *)email password:(NSString *)password`

 说明

创建一个 email & password 登录方式的 WDGAuthCredential 凭证。

 参数

email 用户的 email 地址。  
password 用户的登录密码。

 返回值

WDGAuthCredential 对象，里面包含 email & password 登录方式凭证。

----
## WDGQQAuthProvider (*Methods*)

### + credentialWithAccessToken:

 定义

`+ (WDGAuthCredential *)credentialWithAccessToken:(NSString *)accessToken`

 说明

创建一个 qq 登录方式的 WDGAuthCredential 凭证。

 参数

accessToken QQ OAuth access token.

 返回值

WDGAuthCredential 对象，里面包含 qq 登录凭证。

----
## WDGSinaAuthProvider (*Methods*)

### + credentialWithAccessToken: userID:

 定义

`+ (WDGAuthCredential *)credentialWithAccessToken:(NSString *)accessToken userID:(NSString *)userID`

 说明

创建一个 Sina 登录方式的 WDGAuthCredential 凭证。

 参数

accessToken Sina OAuth access token.
userID Sina OAuth 的 userID。

 返回值

WDGAuthCredential 对象，里面包含 Sina 登录凭证。

----
## WDGWeiXinAuthProvider (*Methods*)

### + credentialWithCode:

 定义

`+ (WDGAuthCredential *)credentialWithCode:(NSString *)code`

 说明

创建一个 Weixin 登录方式的 WDGAuthCredential 凭证。

 参数

code Weixin OAuth code.

 返回值

WDGAuthCredential 对象，里面包含 WeiXin 登录凭证。

----
## WDGUser (*Methods*)

### anonymous

 定义

`@property(nonatomic, readonly, getter=isAnonymous) BOOL anonymous`

 说明

如果为 YES 则表明为匿名用户。

----
### emailVerified
 
 定义

`@property(nonatomic, readonly, getter=isEmailVerified) BOOL emailVerified`

 说明

如果为 YES 则表示和这个帐号关联的邮箱已经验证过。

----
### providerData
 
 定义

`@property(nonatomic, readonly, nonnull) NSArray<id<WDGUserInfo>> *providerData`

 说明

所有登录方式的用户信息。

 描述

不同登录方式之间可以相互绑定，绑定之后可以以任意一种登录方式登录主帐号

----
### - updateEmail:completion:

 定义

`- (void)updateEmail:(NSString *)email completion:(nullable WDGUserProfileChangeCallback)completion`

 说明

更新帐号邮箱。如果更新成功，本地缓存也会刷新。

 参数

email 用户的邮箱地址。  
completion 可以为空；返回用户的登录方式列表或者错误信息。异步等待，会在主线程中回调。

 描述
 
如果这个邮箱已经创建过用户，则会更新失败。
可能发生的错误：
 
 - WDGAuthErrorCodeEmailAlreadyInUse 邮箱已被另一个用户使用。
 - WDGAuthErrorCodeInvalidEmail 邮箱格式错误。
 - WDGAuthErrorCodeRequiresRecentLogin 发生这个错误表明用户在短期内没有登录过，而修改邮箱为敏感操作，必须重新登录才能继续操作。可以调用 WDGUser.reauthenticateWithCredential:completion: 方法。
 - See WDGAuthErrors API 调用可能发生的所有错误。

----
### - updatePassword:completion:

 定义

`- (void)updatePassword:(NSString *)password
            completion:(nullable WDGUserProfileChangeCallback)completion`

 说明

修改用户密码。如果成功，本地缓存也会被刷新。

 参数
  
password 用户设置的新密码。   
completion 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

 描述
 
可能发生的错误：
 
 - WDGAuthErrorCodeOperationNotAllowed 表明管理员关闭了这种登录方式。
 - WDGAuthErrorCodeRequiresRecentLogin 发生这个错误表明用户在短期内没有登录过，而修改密码为敏感操作，必须重新登录才能继续操作。可以调用 WDGUser.reauthenticateWithCredential:completion: 方法。
 - WDGAuthErrorCodeWeakPassword 密码设置不符合规定。
 - See WDGAuthErrors API 调用可能发生的所有错误。
 
----
### profileChangeRequest

 定义

`- (WDGUserProfileChangeRequest *)profileChangeRequest`

 说明

创建一个可以改变用户信息的对象。

 描述

修改完这个返回对象的属性，然后调用 WDGUserProfileChangeRequest.commitChangesWithCallback: 来完成用户信息的修改。

 返回值

返回一个可以用来原子性的修改用户信息的对象。也就是说不会单独某个属性修改成功，而其它的修改失败。

----
### - reloadWithCompletion:

 定义

`- (void)reloadWithCompletion:(nullable WDGUserProfileChangeCallback)completion`

 说明

从服务器上获取最新的用户信息。

 参数

completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

可能返回 WDGAuthErrorCodeCredentialTooOld 错误。这种情况下，需要调用 WDGUser.reauthenticateWithCredential:completion: 重新登录。
 
可能发生的错误：  

 - See WDGAuthErrors API 调用可能发生的所有错误。
 
----
### - reauthenticateWithCredential:completion:

 定义

`- (void)reauthenticateWithCredential:(WDGAuthCredential *)credential
                          completion:(nullable WDGUserProfileChangeCallback)completion`

 说明

重新登录，刷新本地 idToken。

 参数

credential 用户提供的登录凭证，服务将会认证他的正确性。这个凭证可以是第三方登录，或者密码登录方式。
completion 可以为空；重新登录成功时会被调用这个 block，block 为异步等待，会在主线程中回调。

 描述
 
如果用户提供的凭证和之前的不一样或者提供的凭证是错误的。则返回错误信息。当前用户继续保持登录状态。
可能发生的错误：

- WDGAuthErrorCodeInvalidCredential 无效的凭证。
 - WDGAuthErrorCodeOperationNotAllowed 这种登录方式被禁止，可以在野狗应用控制面板打开这个选项。
 - WDGAuthErrorCodeEmailAlreadyInUse 提供的 Email 地址已经被使用。
 - WDGAuthErrorCodeUserDisabled 用户帐号被禁用。
 - WDGAuthErrorCodeWrongPassword 邮箱或者密码错误。
 - WDGAuthErrorCodeUserMismatch 重现登录提供的凭证与当前用户不一致。
 - See WDGAuthErrors API 调用可能发生的所有错误。

----
### - getTokenWithCompletion:

 定义
`- (void)getTokenWithCompletion:(nullable WDGAuthTokenCallback)completion`

 说明

获取用户 token。

 参数
 
completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

可能发生的错误：

 - See WDGAuthErrors API 调用可能发生的所有错误。

---- 
### - linkWithCredential:completion:

 定义

`- (void)linkWithCredential:(WDGAuthCredential *)credential
                completion:(nullable WDGAuthResultCallback)completion`

 说明

将第三方帐号绑定到当前用户上。以实现通过不同的登录方式登录。

 参数

credential 一种登录方式的凭证。    
completion 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

 描述

可能发生的错误：
 
 - WDGAuthErrorCodeProviderAlreadyLinked 提供的登录方式已经绑定在这个帐号中。
 - WDGAuthErrorCodeCredentialAlreadyInUse 提供的登录方式凭证已经是一个用户。
 - WDGAuthErrorCodeOperationNotAllowed 提供的登录方式被禁用。可以在野狗控制面板中打开。
 - 这个方法也有可能返回 updateEmail:completion: 和 updatePassword:completion: 的错误。
 - See 更多错误请参考 WDGAuthErrors。

----
### - unlinkFromProvider:completion:

 定义

`- (void)unlinkFromProvider:(NSString *)provider
                completion:(nullable WDGAuthResultCallback)completion`

 说明

解绑第三方帐号。

 参数

provider 需要解绑的登录方式，可能为 qq、weixin、weibo。  
completion 可以为空；请求成功后会被调用的 block，异步等待，主线程中回调。

 描述

可能发生的错误：
 
 - WDGAuthErrorCodeNoSuchProvider 此帐号没有绑定需要解绑的登录方式。
 - WDGAuthErrorCodeRequiresRecentLogin 敏感操作，需要重新登录帐号来保证安全性。
 - See 更多错误请参考 WDGAuthErrors。

----
### - sendEmailVerificationWithCompletion:

 定义

`- (void)sendEmailVerificationWithCompletion:(nullable WDGSendEmailVerificationCallback)completion`

 说明

发送邮箱验证。

 参数

completion 可以为空；当请求成功或失败时会调用这个 block，异步等待，主线程中回调。

 描述

可能发生的错误：
 
 - WDGAuthErrorCodeUserNotFound 没有这个帐号。
 - See 更多错误请参考 WDGAuthErrors。
 
----
### - deleteWithCompletion:

 定义

`- (void)deleteWithCompletion:(nullable WDGUserProfileChangeCallback)completion`

 说明

删除这个帐号（如果是当前用户，则退出登录）。

 参数

completion 可以为空；删除帐号成功或失败时调用这个 block，异步等待，主线程中回调。

 描述

可能发生的错误：
 
 - WDGAuthErrorCodeRequiresRecentLogin 敏感操作，需要重新登录来确保安全性。可以调用 WDGUser.reauthenticateWithCredential:completion:
 - See 更多错误请参考 WDGAuthErrors。
 
----
## WDGUserProfileChangeRequest (*Methods*)

### displayName

 定义

`@property(nonatomic, copy, nullable) NSString *displayName`

 说明

用户名

 描述

必须在使用  WDGUserProfileChangeRequest.commitChangesWithCallback: 方法前设置这个参数。

----
### photoURL

 定义

`@property(nonatomic, copy, nullable) NSURL *photoURL`

 说明

用户头像

 描述

必须在使用  WDGUserProfileChangeRequest.commitChangesWithCallback: 方法前设置这个参数。

----
### - commitChangesWithCompletion:

 定义

`- (void)commitChangesWithCompletion:(nullable WDGUserProfileChangeCallback)completion`

 说明

提交更改

 参数

completion 可以为空；请求成功或失败时调用这个 block。异步等待，主线程中回调。

 描述

修改属性必须在这个方法调用之前。

----
## WDGUserInfo (*protocol*)

### providerID

 定义

`@property(nonatomic, copy, readonly) NSString *providerID`

 说明

用户登录方式。

----
### uid
 
 定义

`@property(nonatomic, copy, readonly) NSString *uid`

 说明

用户 id。

----
### displayName

 定义

`@property(nonatomic, copy, readonly, nullable) NSString *displayName`

 说明

用户名。

----
### photoURL
 
 定义

`@property(nonatomic, copy, readonly, nullable) NSURL *photoURL`

 说明

用户头像。

----
### email
 
 定义

`@property(nonatomic, copy, readonly, nullable) NSString *email`

 说明

用户邮箱地址。

----
## WDGAuthErrors (*Methods*)

### WDGAuthErrorCode

 定义

```
typedef NS_ENUM(NSInteger, WDGAuthErrorCode) {

    WDGAuthErrorCodeInvalidCustomToken = 17000,

    WDGAuthErrorCodeCustomTokenMismatch = 17002,

    WDGAuthErrorCodeInvalidCredential = 17004,

    WDGAuthErrorCodeUserDisabled = 17005,

    WDGAuthErrorCodeOperationNotAllowed = 17006,

    WDGAuthErrorCodeEmailAlreadyInUse = 17007,

    WDGAuthErrorCodeInvalidEmail = 17008,

    WDGAuthErrorCodeWrongPassword = 17009,

    WDGAuthErrorCodeTooManyRequests = 17010,

    WDGAuthErrorCodeUserNotFound = 17011,

    WDGAuthErrorCodeAccountExistsWithDifferentCredential = 17012,

    WDGAuthErrrorCodeAccountExistsWithDifferentCredential = 17012,

    WDGAuthErrorCodeRequiresRecentLogin = 17014,

    WDGAuthErrorCodeProviderAlreadyLinked = 17015,

    WDGAuthErrorCodeNoSuchProvider = 17016,

    WDGAuthErrorCodeInvalidUserToken = 17017,

    WDGAuthErrorCodeNetworkError = 17020,

    WDGAuthErrorCodeUserTokenExpired = 17021,

    WDGAuthErrorCodeInvalidAPIKey = 17023,

    WDGAuthErrorCodeUserMismatch = 17024,

    WDGAuthErrorCodeCredentialAlreadyInUse = 17025,

    WDGAuthErrorCodeWeakPassword = 17026,

    WDGAuthErrorCodeAppNotAuthorized = 17028,
    
    WDGAuthErrorCodeKeychainError = 17995,

    WDGAuthErrorCodeInternalError = 17999,
};

```


 说明

Wilddog iOS 身份认证错误。

 参数

WDGAuthErrorCodeInvalidCustomToken 表示自定义令牌认证错误

WDGAuthErrorCodeCustomTokenMismatch 表明服务账号和 API key 属于不同的工程

WDGAuthErrorCodeInvalidCredential 如果凭据到期或格式不正确，则可能发生此错误

WDGAuthErrorCodeUserDisabled 表示用户的帐户已停用

WDGAuthErrorCodeOperationNotAllowed 表示邮箱登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用

WDGAuthErrorCodeEmailAlreadyInUse 表示用户的邮箱已经被占用

WDGAuthErrorCodeInvalidEmail 表示该电子邮件地址格式不正确

WDGAuthErrorCodeWrongPassword 表示用户用了错误密码登录

WDGAuthErrorCodeTooManyRequests 表示从调用方设备向 Wilddog Authentication 服务器的异常请求达到一定数量后，该请求被阻止，请在稍后重试

WDGAuthErrorCodeUserNotFound 表示未找到用户帐户。如果用户帐户已删除则可能发生此错误

WDGAuthErrorCodeAccountExistsWithDifferentCredential 表示需要帐户链接

WDGAuthErrrorCodeAccountExistsWithDifferentCredential 类似于`WDGAuthErrorCodeAccountExistsWithDifferentCredential`，只是拼写错误，只存在向后兼容性

WDGAuthErrorCodeRequiresRecentLogin 此错误表示该用户近期长时间没有登录过

WDGAuthErrorCodeProviderAlreadyLinked 表示尝试关联的登录方式的类型已经关联到此帐户

WDGAuthErrorCodeNoSuchProvider 表示尝试取消关联的提供程序没有关联到该帐户

WDGAuthErrorCodeInvalidUserToken 表示 token 失效，您必须提示该用户在此设备重新登录

WDGAuthErrorCodeNetworkError 表示在操作过程中出现网络错误

WDGAuthErrorCodeUserTokenExpired 表示当前用户的令牌已到期

WDGAuthErrorCodeInvalidAPIKey 表示在请求中需要提供 API key 的无效

WDGAuthErrorCodeUserMismatch 表示重新认证的这个用户不是现有用户

WDGAuthErrorCodeCredentialAlreadyInUse 表示尝试关联的凭据已与另一个不同 Wilddog 帐户关联

WDGAuthErrorCodeWeakPassword 表示尝试设置的密码被认为太弱

WDGAuthErrorCodeAppNotAuthorized 表示应用程序用提供的 API 密钥去认证时
    
WDGAuthErrorCodeKeychainError 表示在访问钥匙串时出错

WDGAuthErrorCodeInternalError 表示出现内部错误。 请用整个 NSError 对象报告错误