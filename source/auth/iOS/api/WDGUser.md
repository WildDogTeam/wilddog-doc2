title: WDGUser
---

Wilddog Auth 的用户对象。

## 属性

### anonymous

**定义**

```objectivec
@property(nonatomic, readonly, getter=isAnonymous) BOOL anonymous
```

**说明**

如果为 YES 则表明为匿名用户。

</br>

------

### emailVerified

**定义**

```objectivec
@property(nonatomic, readonly, getter=isEmailVerified) BOOL emailVerified
```

**说明**

如果为 YES 则表示和这个帐号关联的邮箱已经验证过。  

</br>

------

### phoneVerified

**定义**

```objectivec
@property(nonatomic, readonly, getter=isPhoneVerified) BOOL phoneVerified
```

**说明**

如果为 YES 则表示和这个帐号关联的手机号已经验证过。  

</br>

------

### providerData

**定义**

```objectivec
@property(nonatomic, readonly, nonnull) NSArray<id<WDGUserInfo>> *providerData
```

**说明**

所有登录方式的用户信息。

**参考**
不同登录方式之间可以相互绑定，绑定之后可以以任意一种登录方式登录主帐号。

</br>

------

## 方法

### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

不要初始化这个对象。

**参考**
使用 WDGAuth.currentUser 来获取用户对象。

</br>

--- 
### - updateEmail:completion:

**定义**

```objectivec
- (void)updateEmail:(NSString *)email completion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

更新帐号邮箱。如果更新成功，本地缓存也会刷新。

**参数**

参数名 | 描述
--- | ---
email | 用户的邮箱地址 
completion | 可以为空；如果邮箱更新成功，这个 block 将会被调用。block 为异步等待，会在主线程中回调

**参考**

如果这个邮箱已经创建过用户，则会更新失败。
可能发生的错误：
 
 - WDGAuthErrorCodeEmailAlreadyInUse 邮箱地址已经被其他账户使用。
 - WDGAuthErrorCodeInvalidEmail 该邮箱地址无效。
 - WDGAuthErrorCodeCredentialTooOldLoginAgain 发生这个错误表明用户在短期内没有登录过，而修改邮箱为敏感操作，必须重新登录才能继续操作。可以调用 WDGUser.reauthenticateWithCredential:completion: 方法。
 - 参见 WDGAuthErrors API 调用可能发生的所有错误。
 
 </br>

----
### - updatePassword:completion:

**定义**

```objectivec
- (void)updatePassword:(NSString *)password
            completion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

修改用户密码。如果成功，本地缓存也会被刷新。

**参数**

参数名 | 描述
--- | ---
password | 用户设置的新密码  
completion | 可以为空；如果密码修改成功会调用这个 block。block 为异步等待，会在主线程中回调

**参考**

可能发生的错误：
 
 - WDGAuthErrorCodeAuthenticationDisabled 未开启身份认证功能，请在控制台开启后重试。
 - WDGAuthErrorCodeCredentialTooOldLoginAgain 发生这个错误表明用户在短期内没有登录过，而修改密码为敏感操作，必须重新登录才能继续操作。可以调用 WDGUser.reauthenticateWithCredential:completion: 方法。
 - WDGAuthErrorCodePasswordLengthError 密码的长度必须在 6 到 32 位。
 - 参见 WDGAuthErrors API 调用可能发生的所有错误。
 
</br>

----
### - updatePhone:completion:

**定义**

```objectivec
- (void)updatePhone:(NSString *)phone completion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

更换用户手机号。如果成功，本地缓存也会被刷新。

**参数**

参数名 | 描述
--- | ---
phone | 新手机号码。  
completion | 可以为空；如果密码修改成功会调用这个 block。block 为异步等待，会在主线程中回调

**参考**

可能发生的错误：

 - 参见 WDGAuthErrors API 调用可能发生的所有错误。
 
</br>

----
### - profileChangeRequest

**定义**

```objectivec
- (WDGUserProfileChangeRequest *)profileChangeRequest
```

**说明**

创建一个可以改变用户信息的对象。

**返回值**

返回一个可以用来原子性的修改用户信息的对象。也就是说不会单独某个属性修改成功，而其它的修改失败。

**参考**

修改完这个返回对象的属性，然后调用 WDGUserProfileChangeRequest.commitChangesWithCallback: 来完成用户信息的修改。

</br>

----
### - reloadWithCompletion:

**定义**

```objectivec
- (void)reloadWithCompletion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

从服务器上获取最新的用户信息。

**参数**

参数名 | 描述
--- | --- 
completion | 可以为空；获取信息成功会调用这个 block。block 为异步等待，会在主线程中回调

**参考**

可能返回 WDGAuthErrorCodeInvalidCredential 错误。这种情况下，需要调用 WDGUser.reauthenticateWithCredential:completion: 重新登录。

可能发生的错误：

- 参见 WDGAuthErrors API 调用可能发生的所有错误。
</br>

----
### - reauthenticateWithCredential:completion:

**定义**

```objectivec
- (void)reauthenticateWithCredential:(WDGAuthCredential *)credential
                          completion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

重新登录，刷新本地 idToken。

**参数**

参数名 | 描述
--- | ---
credential | 用户提供的登录凭证，服务将会验证他的正确性。这个凭证可以是第三方登录，或者密码登录方式  
completion | 可以为空；重新登录成功时会被调用这个 block，block 为异步等待，会在主线程中回调  

**参考**

如果用户提供的凭证和之前的不一样或者提供的凭证是错误的。则返回错误信息。当前用户继续保持登录状态。

可能发生的错误：

 - WDGAuthErrorCodeInvalidCredentials 该身份认证凭证无效。
 - WDGAuthErrorCodeAuthenticationDisabled 这种登录方式被禁止，可以在野狗应用控制面板打开这个选项。
 - WDGAuthErrorCodeEmailAlreadyInUse 邮箱地址已经被其他账户使用。
 - WDGAuthErrorCodeInvalidUser 该用户不存在。
 - WDGAuthErrorCodeInvalidPassword 该密码不正确。
 - 参见更多错误请参考 WDGAuthErrors。
 
</br>

----
### - getTokenWithCompletion:

**定义**

```objectivec
- (void)getTokenWithCompletion:(nullable WDGAuthTokenCallback)completion
```

**说明**

获取用户 token。

**参数**

参数名 | 描述
--- | ---
completion | 可以为空；如果 token 可以被获取，则会调用这个 block

**参考**

可能发生的错误：

 - 参见 WDGAuthErrors API 调用可能发生的所有错误。
 
</br>

----
### - linkWithCredential:completion:

**定义**

```objectivec
- (void)linkWithCredential:(WDGAuthCredential *)credential
                completion:(nullable WDGAuthResultCallback)completion
```

**说明**

将第三方帐号绑定到当前用户上。以实现通过不同的登录方式登录。

**参数**

参数名 | 描述
--- | ---
credential | 一种登录方式的凭证  
completion | 可以为空；当帐号绑定成功或失败会调用这个 block。异步等待，主线程中回调 

**参考**

可能发生的错误：

 - WDGAuthErrorCodeProviderAlreadyLinked 每个用户只能绑定一次野狗登录方式。
 - WDGAuthErrorCodeAuthenticationDisabled 未开启身份认证功能，请在控制台开启后重试。
 - 这个方法也有可能返回 updateEmail:completion: 和 updatePassword:completion: 的错误。
 - 参见更多错误请参考 WDGAuthErrors。
 
</br>

----
### - unlinkFromProvider:completion:

**定义**

```objectivec
- (void)unlinkFromProvider:(NSString *)provider
                completion:(nullable WDGAuthResultCallback)completion
```

**说明**

解绑第三方帐号。

**参数**

参数名 | 描述
--- | ---
provider | 需要解绑的登录方式，可能为 qq、weixin、weibo 
completion | 可以为空；请求成功后会被调用的 block，异步等待，主线程中回调

**参考**

可能发生的错误：

 - WDGAuthErrorCodeCredentialTooOldLoginAgain 该用户尝试安全敏感操作，但登录时间过长，需重新登录。
 - 参见更多错误请参考 WDGAuthErrors。
 
</br>

----
### - sendEmailVerificationWithCompletion:

**定义**

```objectivec
- (void)sendEmailVerificationWithCompletion:(nullable WDGSendEmailVerificationCallback)completion
```

**说明**

发送邮箱验证。

**参数**

参数名 | 描述
--- | ---  
completion | 可以为空；当请求成功或失败时会调用这个 block，异步等待，主线程中回调。

**参考**

可能发生的错误：

 - WDGAuthErrorCodeUserNotFound 没有对应用户记录，该用户可能已经被删除。
 - 参见更多错误请参考 WDGAuthErrors。
</br>

----
### - sendPhoneVerificationWithCompletion:

**定义**

```objectivec
- (void)sendPhoneVerificationWithCompletion:(nullable WDGSendPhoneVerificationCallback)completion
```

**说明**

发送验证手机的验证码。

**参数**

参数名 | 描述
--- | ---  
completion | 可以为空；当请求成功或失败时会调用这个 block，异步等待，主线程中回调。

**参考**

可能发生的错误：

 - WDGAuthErrorCodeUserNotFound 没有对应用户记录，该用户可能已经被删除。
 - 参见更多错误请参考 WDGAuthErrors。
</br>

----
### - verifyPhoneWithSmsCode:completion:

**定义**

```objectivec
- (void)verifyPhoneWithSmsCode:(NSString *)code completion:(nullable WDGVerifyPhoneCallback)completion
```

**说明**

用 sendEmailVerificationWithCompletion 方法发送验证码后，收到的验证码需要用此方法验证。

**参数**

参数名 | 描述
--- | ---  
code | 手机验证码。
completion | 可以为空；当请求成功或失败时会调用这个 block，异步等待，主线程中回调。

**参考**

可能发生的错误：

 - 参见更多错误请参考 WDGAuthErrors。
</br>

----
### - deleteWithCompletion:

**定义**

```objectivec
- (void)deleteWithCompletion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

删除这个帐号（如果是当前用户，则退出登录）。

**参数**

参数名 | 描述
--- | ---  
completion | 可以为空；删除帐号成功或失败时调用这个 block，异步等待，主线程中回调。

**参考**

可能发生的错误：

 - WDGAuthErrorCodeCredentialTooOldLoginAgain 敏感操作，需要重新登录来确保安全性。可以调用 WDGUser.reauthenticateWithCredential:completion:
 - 参见更多错误请参考 WDGAuthErrors。
</br>

