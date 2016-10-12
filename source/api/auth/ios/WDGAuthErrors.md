title: WDGAuthErrors
---

Wilddog Auth 身份认证错误。

## 枚举

### WDGAuthErrorCode

**定义**

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

**说明**

Wilddog Auth 身份认证错误。

如果在 WilddogAuth 的回调方法中收到一个非空 NSError 参数，则表示出现了错误。 要想实现正确的错误逻辑处理，请对照常见错误和下面所列的方法特定错误检查错误代码。
 有些错误可通过特定用户操作解决。例如，WDGAuthErrorCodeUserTokenExpired 可通过重新登录该用户解决，WDGAuthErrorCodeWrongPassword 可通过让用户提供正确密码解决。
 除 WDGAuthErrorCodeNetworkError 或 WDGAuthErrorCodeTooManyRequests 之外，用相同参数重试一个失败的操作决不会成功。切勿对操作在服务器端是否生效进行任何假设。+
 
 调试或打印错误时，请查阅 userInfo 字典。WDGAuthErrorNameKey 包含可用于识别错误的跨平台错误名字符串。NSLocalizedDescriptionKey 包含错误说明。此说明只适合开发者使用，不适合用户使用。NSUnderlyingErrorKey 包含引起所述错误的基础错误（如果存在基础错误）。
 除了上面所列的主要字段外，userInfo 字典中可能还提供了一些您在诊断错误时可能觉得有用的其他字段。

**参数**

参数名 | 描述
--- | ---
WDGAuthErrorCodeInvalidCustomToken | 表示自定义令牌认证错误
WDGAuthErrorCodeCustomTokenMismatch | 表明服务帐号和 API key 属于不同的工程
WDGAuthErrorCodeInvalidCredential | 如果凭据到期或格式不正确，则可能发生此错误
WDGAuthErrorCodeUserDisabled | 表示用户的帐户已停用
WDGAuthErrorCodeOperationNotAllowed | 表示邮箱登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用
WDGAuthErrorCodeEmailAlreadyInUse | 表示用户的邮箱已经被占用
WDGAuthErrorCodeInvalidEmail | 表示该电子邮件地址格式不正确
WDGAuthErrorCodeWrongPassword | 表示用户用了错误密码登录
WDGAuthErrorCodeTooManyRequests | 表示从调用方设备向 Wilddog Authentication 服务器的异常请求达到一定数量后，该请求被阻止，请在稍后重试
WDGAuthErrorCodeUserNotFound | 表示未找到用户帐户。如果用户帐户已删除则可能发生此错误
WDGAuthErrorCodeAccountExistsWithDifferentCredential | 表示需要帐户链接
WDGAuthErrrorCodeAccountExistsWithDifferentCredential | 类似于`WDGAuthErrorCodeAccountExistsWithDifferentCredential`，只是拼写错误，只存在向后兼容性
WDGAuthErrorCodeRequiresRecentLogin | 此错误表示该用户近期长时间没有登录过
WDGAuthErrorCodeProviderAlreadyLinked | 表示尝试关联的登录方式的类型已经关联到此帐户
WDGAuthErrorCodeNoSuchProvider | 表示尝试取消关联的提供程序没有关联到该帐户
WDGAuthErrorCodeInvalidUserToken | 表示 token 失效，您必须提示该用户在此设备重新登录
WDGAuthErrorCodeNetworkError | 表示在操作过程中出现网络错误
WDGAuthErrorCodeUserTokenExpired | 表示当前用户的令牌已到期
WDGAuthErrorCodeInvalidAPIKey | 表示在请求中需要提供 API key 的无效
WDGAuthErrorCodeUserMismatch | 表示重新认证的这个用户不是现有用户
WDGAuthErrorCodeCredentialAlreadyInUse | 表示尝试关联的凭据已与另一个不同 Wilddog 帐户关联
WDGAuthErrorCodeWeakPassword | 表示尝试设置的密码被认为太弱
WDGAuthErrorCodeAppNotAuthorized | 表示应用程序用提供的 API 密钥去认证时
WDGAuthErrorCodeKeychainError | 表示在访问钥匙串时出错
WDGAuthErrorCodeInternalError | 表示出现内部错误。 请用整个 NSError 对象报告错误