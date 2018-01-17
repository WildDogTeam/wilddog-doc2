title:  错误码
---

| 错误码 | 简称 | 错误详情 |
| ------------- | -------------- | ------------ |
|70001|invalid appId|SMSAppID参数无效|
|70002|invalid arguments|请求参数错误|
|70003|invalid message type|消息类型参数错误|
|70103|template not exist|模板不存在|
|70104|get template error|获取模板失败|
|70107|template audit not passed|模板未审核通过|
|70108|template duplicate name|模板名称重复|
|70201|sms phones empty|发送手机为空|
|70202|sms phones exceed max phone size 100|单批发送手机号超过最大值|
|70203|sms send invalid timestamp|时间戳无效,与服务器时间间隔大于60秒|
|70204|sms build content failure|SMS 变量内容组装失败|
|70205|sms build content failure|短信消息发送失败|
|70206|sms params signature empty|SMS 数字签名参数为空|
|70207|sms params signature invalid|SMS 数字签名校验失败|
|70208|sms signature invalid|SMS短信签名为空|
|70209|sms contains sensitive words|SMS 中含有敏感词|
|70210|sms status query failure|SMS 状态查询失败|
|70211|sms secret query failure|SMS 密钥查询无效|
|70212|sms frequency exceeded|SMS 服务发送频率异常,请稍后重试|
|70213|sms check code failed|SMS 验证码输入错误|
|70214|sms phones error|手机的格式不正确目前支持的是11位手机|
|70215|sms parameter too long|SMS 变量长度过长|
|70216|sms content too long|SMS 内容过长|
|70217|sms parameter contains hyper-link|SMS 变量含有超链接|
|70218|sms check code not exist|手机没有发送验证码，请重新发送验证码|
|70219|sms send check code error|手机发送验证码出现错误，请重试|
|70220|sms parameter format error,only jsonarray accepted|发送参数格式错误，不是JSONArray类型|
|70230|sms mobiles parse error, please check it|发送推送类短信, 手机号列表解析出错, 请检查格式|
|70231|sms params parse error, please check it|发送推送类短信, 参数解析出错, 请检查格式|
|70232|sms params size error, please check it|发送推送类短信, 参数个数错误, 请检查格式|
|70302|your account rate insufficient balance|帐户余额不足 0 元，不能使用短信服务|
|70303|your account dose not have enough balance for this api call|帐户余额不足支付本次短信服务|
|70304|exceeded max api call frequency|发送接口调用频繁,超过每秒 10 次，请稍后重试|

