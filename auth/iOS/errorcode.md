title: 处理身份认证错误
---
如果在 WilddogAuth 的回调方法中收到一个非空 `NSError` 参数，则表示出现了错误。 要想实现正确的错误逻辑处理，请对照常见错误和下面所列的方法特定错误检查错误代码。

有些错误可通过特定用户操作解决。例如，`WDGAuthErrorCodeUserTokenExpired` 可通过重新登录该用户解决，`WDGAuthErrorCodeWrongPassword` 可通过让用户提供正确密码解决。

除 `WDGAuthErrorCodeNetworkError` 或 `WDGAuthErrorCodeTooManyRequests` 之外，用相同参数重试一个失败的操作决不会成功。切勿对操作在服务器端是否生效进行任何假设。

调试或打印错误时，请查阅 userInfo 字典。WDGAuthErrorNameKey 包含可用于识别错误的跨平台错误名字符串。NSLocalizedDescriptionKey 包含错误说明。此说明只适合开发者使用，不适合用户使用。NSUnderlyingErrorKey 包含引起所述错误的基础错误（如果存在基础错误）。

除了上面所列的主要字段外，userInfo 字典中可能还提供了一些你在诊断错误时可能觉得有用的其他字段。

## 所有 API 方法通用的错误代码
代码 | 含义 
---- | -----------
WDGAuthErrorCodeNetworkError | 表示在操作过程中出现网络错误。
WDGAuthErrorCodeUserNotFound | 表示未找到用户帐户。如果用户帐户已删除则可能发生此错误。
WDGAuthErrorCodeUserTokenExpired | 表示当前用户的令牌已到期。例如，该用户可能在另一台设备上更改了帐户密码。 你必须提示该用户在此设备上重新登录。
WDGAuthErrorCodeTooManyRequests | 表示从调用方设备向 Wilddog Authentication 服务器的异常请求达到一定数量后，该请求被阻止。 请在稍后重试。
WDGAuthErrorCodeInternalError | 表示出现内部错误。 请用整个 NSError 对象报告错误。

## 方法特定错误代码

#### WDGAuth 操作常见错误

##### fetchProvidersForEmail:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeInvalidEmail | 表示电子邮件地址格式不正确。

##### signInWithEmail:password:completion:

代码 | 含义	
--- | ---
WDGAuthErrorCodeOperationNotAllowed |表示邮箱登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用。
WDGAuthErrorCodeUserDisabled	| 表示用户的帐户已停用。
WDGAuthErrorCodeWrongPassword | 表示用户尝试用错误密码登录。


##### signInWithCredential:completion:

代码 | 含义	
---|---
WDGAuthErrorCodeInvalidCredential | 如果凭据到期或格式不正确，则可能发生此错误。
WDGAuthErrorCodeOperationNotAllowed	| 表示用凭据表示用户身份提供程序的帐户尚未启用。请在 Wilddog 控制面板的“用户认证”部分启用该帐户。
WDGAuthErrorCodeEmailAlreadyInUse |	表示用该凭据声明的电子邮件已被一个现有帐户使用，无法用此登录方法进行身份认证。	请为此用户电子邮件调用 fetchProvidersForEmail，然后提示其用返回的任何登录提供程序登录。只有在 Wilddog console 中的 Authentication 设置下启用 "One account per email address" 设置时才会引发此错误。
WDGAuthErrorCodeUserDisabled | 表示该用户的帐户已停用。
WDGAuthErrorCodeWrongPassword |	表示该用户尝试用错误密码登录（如果凭据类型为 EmailAuthCredential）。

##### signInAnonymouslyWithCompletion:

代码 | 含义	
---|---
WDGAuthErrorCodeOperationNotAllowed | 表示匿名登录方式未启用。请在 Wilddog 控制面板的“用户认证”部分启用。	
	
##### signInWithCustomToken:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeInvalidCustomToken | 表示自定义令牌认证错误。

##### createUserWithEmail:password:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeInvalidEmail | 表示该电子邮件地址格式不正确。
WDGAuthErrorCodeEmailAlreadyInUse | 表示用于尝试注册的电子邮件已经存在。请调用 fetchProvidersForEmail 检查该用户使用哪些登录机制并提示该用户以这些机制之一登录。
WDGAuthErrorCodeOperationNotAllowed | 表示该电子邮件和密码帐户尚未启用。 请在 Wilddog console 的“ Authentication ”部分启用。
WDGAuthErrorCodeWeakPassword | 表示尝试设置的密码被认为太弱。 NSError.userInfo 字典对象的 NSLocalizedFailureReasonErrorKey 字段含有可向该用户显示的更详细解释。

#### WDGUser 操作常见错误

代码 | 含义	
---|----
WDGAuthErrorCodeInvalidUserToken | token 失效，你必须提示该用户在此设备重新登录。
WDGAuthErrorCodeUserDisabled |	表示该用户的帐户已停用，只有从 Wilddog console 的“Users”面板重新启用后方可继续使用。	

##### updateEmail:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeEmailAlreadyInUse | 表示该电子邮件已被另一个帐户使用。
WDGAuthErrorCodeInvalidEmail | 表示该电子邮件地址格式不正确。
WDGAuthErrorCodeRequiresRecentLogin | 更新用户电子邮件是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误，请在 WDGUser 上调 reauthenticateWithCredential:completion:，对该用户重新进行身份认证。

##### updatePassword:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeOperationNotAllowed | 表示管理员已停用指定用户身份提供程序的登录。
WDGAuthErrorCodeRequiresRecentLogin | 更新用户密码是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误，请在 WDGUser 上调用 reauthenticateWithCredential:completion:，对该用户重新进行身份认证。
WDGAuthErrorCodeWeakPassword | 表示尝试设置一个被认为太弱的密码。 NSError.userInfo 字典对象的 NSLocalizedFailureReasonErrorKey 字段含有可向该用户显示的更详细解释。

##### linkWithCredential:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeProviderAlreadyLinked | 表示尝试关联的登录方式的类型已经关联到此帐户。
WDGAuthErrorCodeCredentialAlreadyInUse | 表示尝试关联的凭据已与另一个不同 Wilddog 帐户关联。
WDGAuthErrorCodeOperationNotAllowed | 表示用该凭据表示的用户身份提供程序尚未启用。请在 Wilddog 控制面板的“用户认证”部分启用。此方法也可能返回与 WDGUser 上 updateEmail:completion: 和 updatePassword:completion: 相关的错误代码。

##### unlinkFromProvider:completion:

代码 | 含义 
---- | -----------
WDGAuthErrorCodeNoSuchProvider | 表示尝试取消关联的提供程序没有关联到该帐户。
WDGAuthErrorCodeRequiresRecentLogin | 更新电子邮件是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误，请在 WDGUser 上调用 reauthenticateWithCredential:completion:，对该用户重新进行身份认证。

##### sendEmailVerificationWithCompletion:

代码 | 含义
---- | -----------
WDGAuthErrorCodeUserNotFound | 表示未找到该用户帐户。

##### deleteWithCompletion:

代码 |	含义
---|-----
WDGAuthErrorCodeRequiresRecentLogin	| 敏感操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误，请在 WDGUser 上调用 reauthenticateWithCredential:completion:，对该用户重新进行身份认证。

