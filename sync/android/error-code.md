title:  错误码
---


## 错误码表

code值		|	对应常量字段	|	具体描述
----     |      -----	|	----
-1	  |		DATA_STALE							|	内部使用。
-2	  |		OPERATION_FAILED					|	服务器标示操作失败。
-3	  |		PERMISSION_DENIED					|	客户端不被许可执行此操作。
-4	  |		DISCONNECTED						|	因为网络连接失败导致操作不能执行。
-5	  |		PREEMPTED							|	活动的或者即将发生的auth登录认证被另一个auth登录取代。
-6	  |		EXPIRED_TOKEN						|	提供的auth Token已经过期。
-7	  |		INVALID_TOKEN						|	指定的登录认证Token不可用。如果token变形，过期或者用于生成token的secret已经被撤销，会引发此错误。
-8	  |		MAX_RETRIES							|	事务有太多的重试。
-9	  |		OVERRIDDEN_BY_SET					|	事务被随后的集合覆盖。
-10	  |		UNAVAILABLE							|	服务不可用。
-11	  |		USER_CODE_EXCEPTION					|	用户代码中发生的异常。
-12	  |		AUTHENTICATION_PROVIDER_DISABLED	|	要求的第三方OAuth平台认证方式不被当前app支持。
-13	  |		INVALID_CONFIGURATION				|	被申请的登录认证提供方式没有配置，请求无法完成。请完成应用配置。
-14	  |		INVALID_PROVIDER					|	申请的第三方OAuth平台认证方式不存在。请参阅Wilddog认证的相关文档获得支持的方式列表。
-15	  |		INVALID_EMAIL						|	指定的邮箱不可用。
-16	  |		INVALID_PASSWORD					|	指定的用户帐号密码不正确。
-17	  |		USER_DOES_NOT_EXIST					|	指定的用户账户不存在。
-18	  |		EMAIL_TAKEN							|	由于指定的邮箱地址已经被使用而不能建立新用户。
-19	  |		DENIED_BY_USER						|	用户不能登录认证应用。当用户取消OAuth认证请求时会造成这个错误。
-20	  |		INVALID_CREDENTIALS					|	指定的登录认证凭证不可用。当凭证不符合标准或者过期时会引发这个错误。
-21	  |		INVALID_AUTH_ARGUMENTS				|	指定的凭证不符合标准或者不完整。请参考错误信息，错误详情和Wilddog文档获得支持方auth登录认证的正确参数。
-22	  |		PROVIDER_ERROR						|	第三方OAuth平台错误。
-23	  |		LIMITS_EXCEEDED						|	超过限制，如果遇到此错误码，请联系support@wilddog.com。
-24	  |		NETWORK_ERROR						|	因为网络原因导致操作不能执行。
-101  |		REPETITIVE_OPERATION				|	重复操作。短时间内向云端进行相同的操作，后面的相同操作会被视为无效。
-102  |		QPS_SPEEDING						|	请求太过频繁。有5秒内最多100次的限制。
-999  |		UNKNOWN_ERROR						|	未知错误。