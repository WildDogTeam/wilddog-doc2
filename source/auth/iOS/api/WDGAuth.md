title: WDGAuth
---

为 Wilddog 应用管理用户身份认证。

## 属性

### currentUser

**定义**

```objectivec
@property(nonatomic, strong, readonly, nullable) WDGUser *currentUser
```

**说明**

同步的获取当前缓存的用户，如果没有登录用户则为 nil。

</br>

------
## 方法

### + auth

**定义**

```objectivec
+ (nullable WDGAuth *)auth NS_SWIFT_NAME(auth())
```

**说明**

获取初始化的 WDGApp 所对应的 WDGAuth。

**返回值**

WDGAuth 对象。
</br>

--- 
### + authWithApp:

**定义**

```objectivec
+ (nullable WDGAuth *)authWithApp:(WDGApp *)app
```

**说明**

用自己创建的 WDGApp 获取对应的 WDGAuth 对象。

**参数**

参数名 | 描述
--- | ---
app | WDGApp 实例。

**参考**

此方法为线程安全。

</br>

----
### - fetchProvidersForEmail:completion:

**定义**

```objectivec
- (void)fetchProvidersForEmail:(NSString *)email
                    completion:(nullable WDGProviderQueryCallback)completion
```

**说明**

通过邮箱来获取用户的所有登录方式。登录方式可能有（password，qq，weixin，weibo，custom，anonymous）。

**参数**

参数名 | 描述
--- | ---
email | 用户的邮箱。  
completion | 可以为空；返回用户的登录方式列表或者错误信息。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- WDGAuthErrorCodeInvalidEmail - 该邮箱地址无效。
- 参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - signInWithEmail:password:completion:

**定义**

```objectivec
- (void)signInWithEmail:(NSString *)email
               password:(NSString *)password
             completion:(nullable WDGAuthResultCallback)completion
             ```

**说明**

以邮箱和密码的方式登录。

**参数**

参数名 | 描述
--- | ---
email | 用户的邮箱地址。  
password | 用户的登录密码。  
completion | 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- WDGAuthErrorCodeAuthenticationDisabled 表示密码登录的方式没有打开，可以在野狗控制面板中打开这个选项。
- WDGAuthErrorCodeInvalidUser 该用户不存在。
- WDGAuthErrorCodeInvalidPassword 该密码不正确。
- 参见 WDGAuthErrors API 调用可能发生的所有错误。
</br>

----
### - signInWithPhone:password:completion:

**定义**

```objectivec
- (void)signInWithPhone:(NSString *)phone
               password:(NSString *)password
             completion:(nullable WDGAuthResultCallback)completion
             ```

**说明**

以手机和密码的方式登录。

**参数**

参数名 | 描述
--- | ---
phone | 用户的手机号。 
password | 用户的登录密码。  
completion | 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

 - WDGAuthErrorCodeInvalidUser 该用户不存在。
 - WDGAuthErrorCodeInvalidPassword 该密码不正确。
 - See WDGAuthErrors API 调用可能发生的所有错误。
</br>

----
### - signInWithCredential:completion:

**定义**

```objectivec
- (void)signInWithCredential:(WDGAuthCredential *)credential
                  completion:(nullable WDGAuthResultCallback)completion
```

**说明**

使用第三方认证方式登录（e.g. 新浪微博，qq，weixin 授权后使用它们的 Access Token 和 openId 在野狗服务器上生成用户）

**参数**

参数名 | 描述
--- | ---
credential | 第三方提供的凭证。  
completion | 可以为空；当用户登录成功或者发生错误时触发。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- WDGAuthErrorCodeInvalidCredentials 该身份认证凭证无效。
- WDGAuthErrorCodeAuthenticationDisabled 表示这种登录方式没有打开，可以在野狗控制面板中打开这个选项。
- WDGAuthErrorCodeInvalidUser 该用户不存在。
- WDGAuthErrorCodeInvalidPassword 该密码不正确。
- 参见 WDGAuthErrors API 调用可能发生的所有错误。

<br/>

----
### - signInAnonymouslyWithCompletion:

**定义**

```objectivec
- (void)signInAnonymouslyWithCompletion:(nullable WDGAuthResultCallback)completion
```

**说明**

匿名登录方式。

**参数**

参数名 | 描述
--- | ---
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

如果已经有一个匿名用户登录，那么会替换这个用户。如果已经有其他用户登录，那么会先把他退出登录。  
可能发生的错误：

-  WDGAuthErrorCodeAuthenticationDisabled 表示匿名登录方式没有打开，可以在野狗的控制面板中打开这个选项。
-  参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - signInWithCustomToken:completion:

**定义**

```objectivec
- (void)signInWithCustomToken:(NSString *)token
                   completion:(nullable WDGAuthResultCallback)completion
```

**说明**

以自定义 token 的方式登录。

**参数**

参数名 | 描述
--- | ---
token | 自定义的 token。    
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- WDGAuthErrorCodeInvalidCustomToken 用户提供的 token 无效。
- 参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - createUserWithEmail:password:completion:

**定义**
```objectivec
- (void)createUserWithEmail:(NSString *)email
                   password:(NSString *)password
                 completion:(nullable WDGAuthResultCallback)completion
```

**说明**

创建一个新用户，创建成功后会自动登录。

**参数**

参数名 | 描述
--- | ---
email | 用户的邮箱地址。  
password | 用户指定的密码。  
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- WDGAuthErrorCodeInvalidEmail 该邮箱地址无效。
- WDGAuthErrorCodeEmailAlreadyInUse 邮箱地址已经被其他账户使用。
- WDGAuthErrorCodeAuthenticationDisabled 表示匿名登录方式没有打开，可以在野狗的控制面板中打开这个选项。
- WDGAuthErrorCodePasswordLengthError 密码的长度必须在 6 到 32 位。
- 参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - createUserWithPhone:password:completion:

**定义**
```objectivec
- (void)createUserWithPhone:(NSString *)phone
                   password:(NSString *)password
                 completion:(nullable WDGAuthResultCallback)completion
```

**说明**

用手机号的方式创建一个新用户，创建成功后会自动登录。

**参数**

参数名 | 描述
--- | ---
phone | 用户的手机号。  
password | 用户指定的密码。  
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

 - WDGAuthErrorCodePasswordLengthError 密码的长度必须在 6 到 32 位。
 - See WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - sendPasswordResetSmsWithPhone:completion:

**定义**
```objectivec
- (void)sendPasswordResetSmsWithPhone:(NSString *)phone
                           completion:(nullable WDGSendSmsResultCallback)completion
```

**说明**

给手机发送重置密码的验证码。

**参数**

参数名 | 描述
--- | ---
phone | 用户的手机号。  
password | 用户指定的密码。  
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

 - See WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - sendPasswordResetWithEmail:completion:

**定义**

```objectivec
- (void)sendPasswordResetWithEmail:(NSString *)email
                        completion:(nullable WDGSendPasswordResetCallback)completion
```

**说明**

通过邮箱找回密码。

**参数**


参数名 | 描述
--- | ---
email | 用户的邮箱地址。  
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- 参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - confirmPasswordResetSmsWithPhone:smsCode:newPassword:completion:

**定义**

```objectivec
- (void)confirmPasswordResetSmsWithPhone:(NSString *)phone
                                 smsCode:(NSString *)code
                             newPassword:(NSString *)newPassword
                              completion:(nullable WDGSendPasswordResetCallback)completion
```

**说明**

通过手机验证码重置密码。

**参数**


参数名 | 描述
--- | ---
phone | 用户的手机号。 
code | 手机验证码。
newPassword | 新密码。
completion | 可以为空；请求成功会触发的 block。异步等待，会在主线程中回调。

**参考**

可能发生的错误：

- 参见 WDGAuthErrors API 调用可能发生的所有错误。

</br>

----
### - signOut:

**定义**

```objectivec
- (BOOL)signOut:(NSError *_Nullable *_Nullable)error
```

**说明**

退出登录。

**参数**

参数名 | 描述
--- | ---
error | 可以为空；如果发生错误，会以 NSError 的方式返回错误描述。nil 表示成功。

**返回值**

YES 表示退出登录成功。NO 表示失败

</br>

----
### - addAuthStateDidChangeListener:

**定义**

```objectivec
- (WDGAuthStateDidChangeListenerHandle)addAuthStateDidChangeListener:(WDGAuthStateDidChangeListenerBlock)listener
```

**说明**

监听用户 auth 状态。发生以下条件时会被调用：

- 第一次调用时，
- 当前用户切换时，
- 或者当前用户的 idToken 变化时。

**参数**

参数名 | 描述
--- | ---
listener | 状态变化时调用的 block。异步等待，会在主线程中回调。

**返回值**

返回这个 block 的唯一标示，用于移除这个 block。

**参考**

这个方法被调用时就会触发 block 的回调。之后会一直处于监听状态，并且 block 会被 WDGAuth 持有，直到移除这个监听。需要防止引用循环。

</br>

----
### - removeAuthStateDidChangeListener:

**定义**

```objectivec
- (void)removeAuthStateDidChangeListener:(WDGAuthStateDidChangeListenerHandle)listenerHandle
```

**说明**

移除 auth 状态变更监听。

**参数**

参数名 | 描述
--- | ---
listenerHandle | WDGAuth.addAuthStateDidChangeListener: 返回的句柄。

