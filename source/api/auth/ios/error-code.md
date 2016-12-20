
title:  错误码
---

| 错误码 | 错误信息 | 描述 |
| ---- | ---- | ---- |
|22001| failure| 服务异常，操作失败|
|22002| expired_token| 该 token 已过期|
|22003| expired_fetch_token| oauth token 已过期，获取失败，请联系 wilddog|
|22004| invalid_token| 用户提供的 token 无效|
|22005| maxretries| 用户创建失败，请重试|
|22006| authentication_disabled| 未开启身份认证功能，请在控制台开启后重试|
|22007| invalid_configuration| token 认证需要超级密钥|
|22008| invalid_provider| 身份认证提供商调用错误，请联系野狗 support@wilddog.com|
|22009| invalid_email|该邮箱地址无效|
|22010| invalid_password| 该密码不正确|
|22011| invalid_user| 该用户不存在|
|22012| invalid_origin| 身份认证过程中，发生了安全错误|
|22013| email_taken| 该邮箱地址已经使用|
|22014| invalid_credentials| 该身份认证凭证无效 |  
|22015| invalid_arguments| 该身份认证参数无效 |
|22016| provider_error|  第三方身份认证提供商发生错误，查看信息了解详情|
|22017| Invalid_secret| 超级密钥无效，请在控制面板重新生成|
|22018| invalid_oob_code| 本次重置密码请求无效的|
|22101| appUser_not_exist| 该野狗用户不存在，请检查 appid|
|22103| not_admin_token| 不是管理者，没有操作权限|
|22201| provide_already_linked| 每个 oauth 身份认证提供商，用户只能绑定一次|
|22202| token_version_error|用户已经升级 api，但 token 仍是旧版|
|22203| email_already_in_user|  邮箱地址已经被其他账户使用|
|22204| provide_already_linked_another_account| 该身份已经与其他账户绑定|
|22205| email_missing| 该账户没有绑定邮箱|
|22206| user_not_found| 没有对应用户记录，该用户可能已经被删除|
|22207| token_error| 该 token 解析失败 |
|22208| provider_already_linked| 每个用户只能绑定一次野狗登录方式|
|22209| credential_too_old_login_again| 该用户尝试安全敏感操作，但登录时间过长，需重新登录|
|22210| no_password_provider| 该用户没有 wilddog 登录方式 |
|22211| password_length_error| 密码的长度必须在 6 到 32 位|
|22212| display_name_length_error| 昵称长度必须小于 20 位|
|22213| photo_url_length_error| 照片地址长度必须小于 1024 位|
|22214| token_not_for_this_app| 此 token 不属于该应用|
|22215| token_type_error| 该 token 类型不正确 |
|22216| idtoken_claims_error| wilddog id token 自定义字段不正确|
|22217| token_userid_not_valid| 该 token 的 wilddog id 无效|
|22218| token_wilddog_error| wilddog 属性不正确 |
|22219| invalid_phone| 该手机号码不正确|
|22220| email_not_exist| 该邮箱不存在|
|22221| phone_not_exist| 该手机号不存在|
|22222| smsCode_not_exist| 该手机未发送过验证码，请检查|
|22223| smsCode_send_error|  发送验证码发生错误，请重试|
|22224| phone_already_in_user| 该手机号已被其他账户使用|
|22225| photo_url_or_displayname_error| 照片地址或昵称包含非法字符|
|22226| sms_code_error| 短信验证码错误，请重新发送验证码|
|22227| sms_server_error| 短信服务错误，请重试|
|22230| sms_forbidden_error| 短信禁止使用，请申请短信服务|
|22232| invalid_sms_type| 短信类型为空|
|22233| weapp_error| 微信小程序登录错误，请查看详情|
|22234| weapp_userInfo_sign_check_failed| 微信小程序用户信息签名校验失败，请重新检查后重试 |
|22235| sms_frequency_error| 短信发送过于频繁 |
|22236| sms_pay_limit_error| 帐户余额不足5元，不能开启短信服务|
|22237| sms_pay_no_money_error| 账户余额不足|
|22238| sms_pay_no_money_to_pay_error| 账户余额不足，本次发送无法完成，请充值|
|22239| sms_api_check_error| 发送接口调用频繁，超过每秒 10 次，请稍后重试|
|29999| unknown| 发生未知错误|
