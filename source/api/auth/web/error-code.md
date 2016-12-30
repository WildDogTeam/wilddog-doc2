
title:  错误码
---

| 错误码 | 错误信息 | 描述 |
| ---- | ---- | ---- |
|22001| The server indicated that this operation failed| 服务异常，操作失败|
|22002| The supplied auth token has expired| 该 token 已过期|
|22003| The fetch token has expired| oauth token 已过期，获取失败，请联系 wilddog|
|22004| The supplied auth token was invalid| 用户提供的 token 无效|
|22005| The transaction had too many retries| 用户创建失败，请重试|
|22006| The specified authentication type is not enabled for this Wilddog.| 未开启身份认证功能，请在控制台开启后重试|
|22007| The specified authentication sign is the auth secret .z| token 认证需要超级密钥|
|22008| Invalid provider specified, please check application code.| 身份认证提供商调用错误，请联系野狗 support@wilddog.com|
|22009| The specified email address is incorrect.|该邮箱地址无效|
|22010| The specified password is incorrect.| 该密码不正确|
|22011| The specified user does not exist.| 该用户不存在|
|22012| A security error occurred while processing the authentication request.| 身份认证过程中，发生了安全错误|
|22013| The specified email address is already in use.| 该邮箱地址已经使用|
|22014| Invalid authentication credentials provided.| 该身份认证凭证无效 |
|22015| Invalid authentication arguments provided.| 该身份认证参数无效 |
|22016| A third_party provider error occurred. See data for details.|  第三方身份认证提供商发生错误，查看信息了解详情|
|22018| Invalid oobCode.| 本次重置密码请求无效的|
|22101| AppUser not exist. Please check appId| 该野狗用户不存在，请检查 appid|
|22201| User can only be linked to one identity for the given provider."| 每个 oauth 身份认证提供商，用户只能绑定一次|
|22202| Client use upgrade API , but token is old version|用户已经升级 api，但 token 仍是旧版|
|22203| The email address is already in use by another account|  邮箱地址已经被其他账户使用|
|22204| This identity already linked anotheraccount.| 该身份已经与其他账户绑定|
|22205| The account doesn't hava a email.| 该账户没有绑定邮箱|
|22206| There is no user record corresponding to this identifier. The user may have been deleted.| 没有对应用户记录，该用户可能已经被删除|
|22207| The token was parsed error.| 该 token 解析失败 |
|22208| User can only be linked to one identity for the given provider.| 每个用户只能绑定一次野狗登录方式|
|22209| The user try to do security_sensitive actions require that the user has recently signed in| 该用户尝试安全敏感操作，但登录时间过长，需重新登录|
|22210| The user not have password provider| 该用户没有 wilddog 登录方式 |
|22211| Password's length must between 6 and 32| 密码的长度必须在 6 到 32 位|
|22212| DisplayName length must be length than 20 | 昵称长度必须小于 20 位|
|22213| PhotoUrl length must be length than 1024| 照片地址长度必须小于 1024 位|
|22214| This token is not for this app| 此 token 不属于该应用|
|22215| This token's type is not correct| 该 token 类型不正确 |
|22216| This idtoken's claims is not correct| wilddog id token 自定义字段不正确|
|22217| This token's userid in not valid| 该 token 的 wilddog id 无效|
|22218| This idtoken's wilddog claim is error| wilddog 属性不正确 |
|22219| The specified phone is incorrect.| 该手机号码不正确|
|22220| The email is not exist| 该邮箱不存在|
|22221| The phone is not exist| 该手机号不存在|
|22222| When user's operation with phone, the smsCode must be carried| 该手机未发送过验证码，请检查|
|22223| Send smsCode occurred error, Please try it again|  发送验证码发生错误，请重试|
|22224| The phone is already in use by another account.| 该手机号已被其他账户使用|
|22225| Photo url or display name contain illegal special characters| 照片地址或昵称包含非法字符|
|22226| Sms code error , please retry to send sms code| 短信验证码错误，请重新发送验证码|
|22227| Sms server error , Please try again| 短信服务错误，请重试|
|22230| Sms forbidden error , Please apply for the sms server| 短信禁止使用，请申请短信服务|
|22232| Sms type is empty| 短信类型为空|
|22233| Weapp login error, Please see the details| 微信小程序登录错误，请查看详情|
|22234| Weapp userinfo sign check failed, Please check it and try again| 微信小程序用户信息签名校验失败，请重新检查后重试 |
|22235| Sms frequency error .| 短信发送过于频繁 |
|22236| Your account must have at least ¥5 to use sms service| 帐户余额不足5元，不能开启短信服务|
|22237| Your account rate insufficient balance| 账户余额不足|
|22238| Your account dose not have enough balance for this api call| 账户余额不足，本次发送无法完成，请充值|
|22239| Exceeded max api call frequency| 发送接口调用频繁，超过每秒 10 次，请稍后重试|
|29999| An unknown error ocurred| 发生未知错误|
