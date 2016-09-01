title:  错误码
---


## 错误码说明



错误码	|	解释	|  具体描述
---- | -------- | ---
AUTHENTICATION_DISABLED |	验证请求不可用   |	该验证服务不可用于此 Wilddog App	
EMAIL_TAKEN |	邮箱已存在 | 邮箱地址已存在(已注册)	
INVALID_ARGUMENTS |	冲突 | 资格证书错误或不全。请查看详细错误信息，并且从Wilddog 文档查找该服务商需要的验证参数	
INVALID_CONFIGURATION | 无效设置 | 提供商验证配置错误，请求未能完成。请确认提供商的客户端 ID 以及Secret是正确的	
INVALID_CREDENTIALS	| 证书无效 | 验证证书不可用。可能错误或者过期	
INVALID_EMAIL | 无效邮箱 | 该邮箱无效(不符合规范)	
INVALID_ORIGIN | 无效终端 | 请求验证时发生了安全错误，请求的web 终端不在你的白名单终端列表中。你可以在控制面板的白名单中添加该终端	
INVALID_PASSWORD | 密码错误 | 用户密码错误	
INVALID_PROVIDER | 不支持的验证提供商 | 验证提供商不存在，请查看 Wilddog Auth 文档中支持的提供商列表	
INVALID_TOKEN | 无效 Token	 | Wilddog ID Token 无效。可能是因为 token 错误、残缺、过期，或用于生成 Token 的 Secret 已经失效。	
INVALID_USER | 该用户不存在 | 该用户不存在	
NETWORK_ERROR | 网络错误 | 尝试连接验证服务器时发生错误	
PROVIDER_ERROR | 服务提供商错误 | 第三方验证提供商验证错误，请查看详细错误信息	
<b>TRANSPORT_UNAVAILABLE</b> | <b>传输不可用</b> | <b>登录请求方法在用户的浏览器环境不可用。popups 不可用于 chrome for iOS, iOS预览窗以及 file://. PhoneGap/Cordova 或者本地， file:// URLs 不支持Redirects重定向</b>	
UNKNOWN_ERROR | 未知错误 | 发生了未知错误。请查阅详细错误信息。	
USER_CANCELLED | 用户取消操作 | 当前用户已取消验证操作	
USER_DENIED | 用户被阻止 | 用户未被授权。这个错误会在用户取消 OAuth 验证请求时出现	
			
