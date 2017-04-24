title: WDGAuthErrors
---

Wilddog Auth 身份认证错误。

## 枚举

### WDGAuthErrorCode

**定义**

```
typedef NS_ENUM(NSInteger, WDGAuthErrorCode) {  
  
    WDGAuthErrorCodeFailure = 22001,
    
    WDGAuthErrorCodeExpiredToken = 22002,
    
    WDGAuthErrorCodeExpiredFetchToken = 22003,
    
    WDGAuthErrorCodeInvalidToken = 22004,
    
    WDGAuthErrorCodeMaxRetries = 22005,
    
    WDGAuthErrorCodeAuthenticationDisabled = 22006,
    
    WDGAuthErrorCodeInvalidConfiguration = 22007,
    
    WDGAuthErrorCodeInvalidProvider = 22008,
    
    WDGAuthErrorCodeInvalidEmail = 22009,
    
    WDGAuthErrorCodeInvalidPassword = 22010,
    
    WDGAuthErrorCodeInvalidUser = 22011,
    
    WDGAuthErrorCodeInvalidOrigin = 22012,
    
    WDGAuthErrorCodeEmailTaken = 22013,
    
    WDGAuthErrorCodeInvalidCredentials = 22014,
    
    WDGAuthErrorCodeInvalidArguments = 22015,
    
    WDGAuthErrorCodeProviderError = 22016,
    
    WDGAuthErrorCodeInvalidSecret = 22017,
    
    WDGAuthErrorCodeInvalidObbCode = 22018,
    
    WDGAuthErrorCodeAppUserNotExist = 22101,
        
    WDGAuthErrorCodeNotAdminToken = 22103,
    
    WDGAuthErrorCodeProviderAlreadyLinked = 22201,
    
    WDGAuthErrorCodeTokenVersionError = 22202,
    
    WDGAuthErrorCodeEmailAlreadyInUse = 22203,
    
    WDGAuthErrorCodeProviderAlreadyLinkedAnotherAccount = 22204,
    
    WDGAuthErrorCodeEmailMissing = 22205,
    
    WDGAuthErrorCodeUserNotFound = 22206,
    
    WDGAuthErrorCodeTokenError = 22207,
    
    WDGAuthErrorCodeProviderAlreadyLinked = 22208,
    
    WDGAuthErrorCodeCredentialTooOldLoginAgain = 22209,
      
    WDGAuthErrorCodeNoPasswordProvider = 22210,
  
    WDGAuthErrorCodePasswordLengthError = 22211,
  
    WDGAuthErrorCodeDisplayNameLengthError = 22212,
  
    WDGAuthErrorCodePhotoUrlLengthError = 22213,
  
    WDGAuthErrorCodeTokenNotForThisApp = 22214,
  
    WDGAuthErrorCodeTokenTypeError = 22215,
  
    WDGAuthErrorCodeIDTokenClaimsError = 22216,
  
    WDGAuthErrorCodeTokenUserIDNotValid = 22217,
  
    WDGAuthErrorCodeTokenWilddogError = 22218,
  
    WDGAuthErrorCodeInvalidPhone = 22219,
  
    WDGAuthErrorCodeEmailNotExist = 22220,
  
    WDGAuthErrorCodePhoneNotExist = 22221,
  
    WDGAuthErrorCodeSmsCodeNotExist = 22222,
  
    WDGAuthErrorCodeSmsSendError = 22223,
  
    WDGAuthErrorCodePhoneAlreadyInUse = 22224,
  
    WDGAuthErrorCodePhotoUrlOrDisplayNameError = 22225,
  
    WDGAuthErrorCodeSmsCodeError = 22226,
  
    WDGAuthErrorCodeSmsServerError = 22227,
  
    WDGAuthErrorCodeSmsForbiddenError = 22230,
  
    WDGAuthErrorCodeSmsSignDenyError = 22231,
  
    WDGAuthErrorCodeInvalidSmsTypeError = 22232,
  
    WDGAuthErrorCodeWeappError = 22233,
  
    WDGAuthErrorCodeWeappUserInfoSignCheckFailed = 22234,
  
    WDGAuthErrorCodeSmsFrequencyError = 22235,
  
    WDGAuthErrorCodeSmsPayLimitError = 22236,
  
    WDGAuthErrorCodeSmsPayNoMoneyError = 22237,
  
    WDGAuthErrorCodeSmsPayNoMoneyToPayError = 22238,
  
    WDGAuthErrorCodeSmsAPICheckError = 22239,
  
    WDGAuthErrorCodeUnknownError = 29999
    
};

```

**说明**

Wilddog Auth 身份认证错误。

如果在 WilddogAuth 的回调方法中收到一个非空 NSError 参数，则表示出现了错误。 要想实现正确的错误逻辑处理，请对照常见错误和下面所列的方法特定错误检查错误代码。  
有些错误可通过特定用户操作解决。例如，WDGAuthErrorCodeCredentialTooOldLoginAgain 可通过重新登录该用户解决，WDGAuthErrorCodeInvalidPassword 可通过让用户提供正确密码解决。  
除 WDGAuthErrorCodeSmsFrequencyError 之外，用相同参数重试一个失败的操作决不会成功。切勿对操作在服务器端是否生效进行任何假设。  
 
调试或打印错误时，请查阅 userInfo 字典。WDGAuthErrorNameKey 包含可用于识别错误的跨平台错误名字符串。NSLocalizedDescriptionKey 包含错误说明。此说明只适合开发者使用，不适合用户使用。  NSUnderlyingErrorKey 包含引起所述错误的基础错误（如果存在基础错误）。  
除了上面所列的主要字段外，userInfo 字典中可能还提供了一些您在诊断错误时可能觉得有用的其他字段。

**参数**

参数名 | 描述
--- | ---
WDGAuthErrorCodeFailure | 服务异常，操作失败。
WDGAuthErrorCodeExpiredToken | 该 token 已过期。
WDGAuthErrorCodeExpiredFetchToken | oauth token 已过期，获取失败，请联系 support@wilddog.com。
WDGAuthErrorCodeInvalidToken | 用户提供的 token 无效。
WDGAuthErrorCodeMaxRetries | 用户创建失败，请重试。
WDGAuthErrorCodeAuthenticationDisabled | 未开启身份认证功能，请在控制台开启后重试。
WDGAuthErrorCodeInvalidConfiguration | token 认证需要超级密钥。
WDGAuthErrorCodeInvalidProvider | 身份认证提供商调用错误，请联系 support@wilddog.com。
WDGAuthErrorCodeInvalidEmail | 该邮箱地址无效。
WDGAuthErrorCodeInvalidPassword | 该密码不正确。
WDGAuthErrorCodeInvalidUser | 该用户不存在。
WDGAuthErrorCodeInvalidOrigin | 身份认证过程中，发生了安全错误。
WDGAuthErrorCodeEmailTaken | 该邮箱地址已经使用。
WDGAuthErrorCodeInvalidCredentials | 该身份认证凭证无效。
WDGAuthErrorCodeInvalidArguments | 该身份认证参数无效。
WDGAuthErrorCodeProviderError | 第三方身份认证提供商发生错误，查看信息了解详情。
WDGAuthErrorCodeInvalidSecret | 超级密钥无效，请在控制面板重新生成。
WDGAuthErrorCodeInvalidObbCode | 本次重置密码请求无效的。
WDGAuthErrorCodeAppUserNotExist | 该野狗用户不存在，请检查 appID。
WDGAuthErrorCodeNotAdminToken | 不是管理者，没有操作权限。
WDGAuthErrorCodeProvideAlreadyLinked | 每个 oauth 身份认证提供商，用户只能绑定一次。
WDGAuthErrorCodeTokenVersionError | 用户已经升级 API，但 token 仍是旧版。
WDGAuthErrorCodeEmailAlreadyInUse | 邮箱地址已经被其他账户使用。
WDGAuthErrorCodeProviderAlreadyLinkedAnotherAccount | 该身份已经与其他账户绑定。
WDGAuthErrorCodeEmailMissing | 该账户没有绑定邮箱。
WDGAuthErrorCodeUserNotFound | 没有对应用户记录，该用户可能已经被删除。
WDGAuthErrorCodeTokenError | 该 token 解析失败。
WDGAuthErrorCodeProviderAlreadyLinked | 每个用户只能绑定一次野狗登录方式。
WDGAuthErrorCodeCredentialTooOldLoginAgain | 该用户尝试安全敏感操作，但登录时间过长，需重新登录。
WDGAuthErrorCodeNoPasswordProvider | 该用户没有 Wilddog 登录方式。
WDGAuthErrorCodePasswordLengthError | 密码的长度必须在 6 到 32 位。
WDGAuthErrorCodeDisplayNameLengthError | 昵称长度必须小于 20 位。
WDGAuthErrorCodePhotoUrlLengthError | 照片地址长度必须小于 1024 位。
WDGAuthErrorCodeTokenNotForThisApp | 此 token 不属于该应用。
WDGAuthErrorCodeTokenTypeError | 该 token 类型不正确。
WDGAuthErrorCodeIDTokenClaimsError | Wilddog ID token 自定义字段不正确。
WDGAuthErrorCodeTokenUserIDNotValid | 该 token 的 Wilddog ID 无效。
WDGAuthErrorCodeTokenWilddogError | Wilddog 属性不正确。
WDGAuthErrorCodeInvalidPhone | 该手机号码不正确。
WDGAuthErrorCodeEmailNotExist | 该邮箱不存在。
WDGAuthErrorCodePhoneNotExist | 该手机号不存在。
WDGAuthErrorCodeSmsCodeNotExist | 该手机未发送过验证码，请检查。
WDGAuthErrorCodeSmsSendError | 发送验证码发生错误，请重试。
WDGAuthErrorCodePhoneAlreadyInUse | 该手机号已被其他账户使用。
WDGAuthErrorCodePhotoUrlOrDisplayNameError | 照片地址或昵称包含非法字符。
WDGAuthErrorCodeSmsCodeError | 短信验证码错误，请重新发送验证码。
WDGAuthErrorCodeSmsServerError | 短信服务错误，请重试。
WDGAuthErrorCodeSmsForbiddenError | 短信禁止使用，请申请短信服务。
WDGAuthErrorCodeInvalidSmsTypeError | 短信类型为空。
WDGAuthErrorCodeWeappError | 微信小程序登录错误，请查看详情。
WDGAuthErrorCodeWeappUserInfoSignCheckFailed | 微信小程序用户信息签名校验失败，请重新检查后重试。
WDGAuthErrorCodeSmsFrequencyError | 短信发送过于频繁。
WDGAuthErrorCodeSmsPayLimitError | 帐户余额不足5元，不能开启短信服务。
WDGAuthErrorCodeSmsPayNoMoneyError | 账户余额不足。
WDGAuthErrorCodeSmsPayNoMoneyToPayError | 账户余额不足，本次发送无法完成，请充值。
WDGAuthErrorCodeSmsAPICheckError | 发送接口调用频繁，超过每秒 10 次，请稍后重试。
WDGAuthErrorCodeUnknownError | 发生未知错误。
