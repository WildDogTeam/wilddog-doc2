title:  错误码
---


| 错误码 | 错误信息 |描述 |
| --- | ----- | ------ |
| 70000 |INVALID_AUTHTOKEN | Idtoken 参数无效。 |
| 70002 |INVALID_ARGUMENTS | 请求参数错误。 |
| 70003 | INVALID_MSGTYPE| 消息类型参数错误。 |
| 70101| TEMPLATE_CREATE_FAILURE | 模板创建失败。|
| 70103 | TEMPLATE_NOT_EXIST| 模板不存在。 |
| 70104|TEMPLATE_GET_ERROR| 获取模板失败。 |
| 70105 |TEMPLATE_EXCEED_MAXSIZE | 超过模板最大数量。 |
| 70106| TEMPLATE_UPDATE_FAILURE| 模板更新失败。 |
| 70107| TEMPLATE_NOT_PASSED | 模板未审核通过。|
| 70108 | TEMPLATE_DUPLICATE_NAME |模板名称重复。 |
| 70109 | TEMPLATE_SENSITIVE_WORDS| 模板中含有敏感词。 |
| 70201 | SMS_EMPTY_PHONES| 发送手机为空。 |
| 70202 | SMS_EXCEED_MAX_PHONE_SIZE|单批发送手机号超过最大值。 |
| 70203 | SMS_INVALID_TIMESTAMP| 时间戳无效, 与服务器时间间隔大于 6 秒。|
| 70204 | SMS_BUILD_CONTENT_FAILURE| 短信变量内容组装失败。 |
| 70205 | SMS_SEND_FAILURE|短信消息发送失败。 |
| 70206 | SMS_EMPTY_SIGNATURE| 短信密钥签名为空。 |
| 70207 | SMS_INVALID_SIGNATURE|短信密钥签名无效。 |
| 70208 | SMS_EMPTY_SIGN|SMS 短信签名为空。 |
| 70209 | SMS_SENSITIVE_WORDS| 短信中含有敏感词。 |
| 70210 | SMS_SENSITIVE_WORDS| 短信状态查询失败。 |
| 70211 | SMS_SECRET_QUERY_FAILURE| 短信密钥查询无效。 |
| 70212 | SMS_FREQUENCY_ERROR| 短信服务发送频率异常,请稍后重试。 |
| 70213 | MS_CHECK_CODE_FAILED| 验证码输入错误。 |
| 70214 | SMS_PHONE_ERROR| 手机的格式不正确，目前支持的是 11 位手机。 |
| 70215 | SMS_PARAMETER_TOOLONG| 短信变量长度过长。 |
| 70216| SMS_CONTENT_TOOLONG| 短信内容过长。 |
| 70217| SMS_PARAMETER_CONTAIN_LINK| 短信变量含有超链。 |
| 70218| SMS_CHECK_CODE_UNEXIST| 手机没有发送验证码,请重新发送验证码。 |
| 70219| SMS_CHECK_CODE_ERROR| 手机发送验证码出现错误, 请重试。 |
| 70220| SMS_PARAMETER_FORMAT_ERROR| 发送参数格式错误，不是 JSONArray 类型。 |