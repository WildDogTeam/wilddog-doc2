title:  错误码
---

| 错误码 | 简称 | 错误详情 |
| ------------- | -------------- | ------------ | 
|70000|invalididToken|Idtoken参数无效|
|70001|invalidappId|appId参数无效|
|70002|invalidarguments|请求参数错误|
|70003|invalidmessagetype|消息类型参数错误|
|70103|templatenotexist|模板不存在|
|70104|templategeterror|获取模板失败|
|70107|templateauditnotpassed|模板未审核通过|
|70108|templateduplicatename|模板名称重复|
|70201|smsphonesempty|发送手机为空|
|70202|smsphonesexceedmaxphonesize100|单批发送手机号超过最大值|
|70203|smssendinvalidtimestamp|时间戳无效|与服务器时间间隔大于6秒|
|70204|smsbuildcontentfailure|SMS变量内容组装失败|
|70205|smsbuildcontentfailure|短信消息发送失败|
|70206|smssignatureempty|SMS密钥签名为空|
|70207|smssignatureinvalid|SMS密钥签名无效|
|70208|smssignatureinvalid|SMS短信签名为空|
|70209|smscontainssensitivewords|sms中含有敏感词|
|70210|smsstatusqueryfailure|sms状态查询失败|
|70211|smssecretqueryfailure|sms密钥查询无效|
|70212|smsfrequencyexceeded|sms服务发送频率异常|请稍后重试|
|70213|smscheckcodefailed|sms验证码输入错误|
|70214|smsphoneserror|手机的格式不正确目前支持的是11位手机|
|70215|smsparametertoolong|sms变量长度过长|
|70216|smscontenttoolong|sms内容过长|
|70217|smsparametercontainshyper-link|sms变量含有超链接|
|70218|smscheckcodenotexist|手机没有发送验证码，请重新发送验证码|
|70219|smssendcheckcodeerror|手机发送验证码出现错误，请重试|
|70220|smsparameterformaterror|onlyjsonarrayaccepted|发送参数格式错误，不是JSONArray类型| 
|70301|sms server must have 5¥ to use in the first time|帐户余额不足5元，不能开启短信服务|
|70302|sms server must have balance to use"|帐户余额不足0元，不能使用短信服务|
|70303|sms server not have enough money to pay this appLy|帐户余额不足支付本次短信服务|
