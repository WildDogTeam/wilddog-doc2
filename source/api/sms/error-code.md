title:  错误码
---

| 错误码 | 简称 | 错误详情 |
| ------------- | -------------- | ------------ |
|70001|invalid appId|appId参数无效|
|70002|invalid arguments|请求参数错误|
|70003|invalid message type|消息类型参数错误|
|70103|template not exist|模板不存在|
|70104|template get error|获取模板失败|
|70107|template audit not passed|模板未审核通过|
|70108|template duplicate name|模板名称重复|
|70201|sms phones empt`y|发送手机为空|
|70202|sms phones exceed max phone size 100|单批发送手机号超过最大值|
|70203|sms send invalid timestamp|时间戳无效,与服务器时间间隔大于6秒|
|70204|sms build content failure|SMS变量内容组装失败|
|70205|sms build content failure|短信消息发送失败|
|70206|sms signature empty|SMS密钥签名为空|
|70207|sms signature invalid|SMS密钥签名无效|
|70208|sms signature invalid|SMS短信签名为空|
|70209|sms contains sensitivewords|sms中含有敏感词|
|70210|sms status query failure|sms状态查询失败|
|70211|sms secret query failure|sms密钥查询无效|
|70212|sms frequency exceeded|sms服务发送频率异常,请稍后重试|
|70213|sms check code failed|sms验证码输入错误|
|70214|sms phones error|手机的格式不正确目前支持的是11位手机|
|70215|sms parameter too long|sms变量长度过长|
|70216|sms content too long|sms内容过长|
|70217|sms parameter contains hyper-link|sms变量含有超链接|
|70218|sms check code not exist|手机没有发送验证码，请重新发送验证码|
|70219|sms send check code error|手机发送验证码出现错误，请重试|
|70220|sms parameter format error,only jsonarray accepted|发送参数格式错误，不是JSONArray类型|
|70301|sms server must have 5¥ to use in the first time|帐户余额不足5元，不能开启短信服务|
|70302|sms server must have balance to use"|帐户余额不足0元，不能使用短信服务|
|70303|sms server not have enough money to pay this appLy|帐户余额不足支付本次短信服务|