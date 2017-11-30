
title: 查询发送状态
---

用于查询短信发送状态，调用时需要计算 [数字签名](/sms/guide/signature.html#生成数字签名的方法) 。

目前查询短信状态提供以下两种查询接口：

## 批量查询已发送短信状态
**适用场景**
此接口批量返回*24小时内最新的短信发送状态*。
例如某用户发送了1000条短信后调用此接口，如果调用接口时已经有300条短信发送状态，则接口会一次性返回这些发送状态。之后再次调用此接口时，会返回去除之前已获取到的300条状态之外的尚未给用户返回的新短信发送状态。
如果短信发送状态在产生后超出24小时未通过此接口获取，可以通过*使用rrid查询某批次短信状态*接口进行发送状态查询。

**URL**

```
https://sms.wilddog.com/api/v2/{:appId}/status

此接口限制每appid每秒调用一次
```

**返回数据格式**

```
JSON
```

**HTTP 请求方式**    

```
GET    
```
    
**参数说明**
    
|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|timestamp          |string         |是         |UNIX时间戳，精度为毫秒|
|signature      |string         |是         |[数字签名](/sms/guide/signature.html#数字签名验证模式)，合法性验证，其中参与数字签名计算的参数包括 `timestamp` |
 
 
**返回说明**

```
data中返回JSONArray,格式如下(其中status取值:0-未发送,1-发送中,2-发送成功,3-发送失败; deliveryStatus为运营商返回状态)
{
    "status": "ok",
     data": [
        {
            "status": 2,
            "mobile": "13800138000",
            "receiveTime": "2016-11-22 20:18:50",
            "rrid": "e97539af58f44a0092",
            "deliveryStatus":"DELIVRD"
        }
    ]
}
```

**示例代码**


```
curl -X POST https://sms.wilddog.com/api/v2/myoffice1/send 
-d "signature=$signature&timestamp=$timestamp"
```


## 使用RRID查询某批次短信状态
**适用场景**
通过rrid查询某一具体批次时适合使用此接口。由于调用接口时可能短信发送状态尚未返回，需要轮询接口不断查询。获取到发送状态后应该停止此rrid的轮询。
一般地，推荐使用*批量查询已发送短信状态*接口进行状态查询操作。

**URL**

```
https://sms.wilddog.com/api/v1/{:appId}/status
```

**返回数据格式**

```
JSON
```

**HTTP 请求方式**    

```
GET    
```
    
**参数说明**
    
|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|rrid          |string         |是         |rrid|
|signature      |string         |是         |[数字签名](/sms/guide/signature.html#数字签名验证模式) ，合法性验证 ，其中参与数字签名计算的参数包括 `rrid` |
 
 
**返回说明**

```
data中返回JSONArray,格式如下(其中status取值:0-未发送,1-发送中,2-发送成功,3-发送失败; deliveryStatus为运营商返回状态)
{
    "status": "ok",
     data": [
        {
            "status": 2,
            "mobile": "13800138000",
            "receiveTime": "2016-11-22 20:18:50",
            "rrid": "e97539af58f44a0092",
            "deliveryStatus":"DELIVRD"
        }
    ]
}
```

**示例代码**


```
curl -X POST https://sms.wilddog.com/api/v1/myoffice1/send 
-d "signature=$signature&rrid=$rrid"
```

**状态码**
部分运营商状态码如下：

|状态码|详状态码情|
|-----|---------|
|DELIVRD|发送成功|
|MY:0001|表示常规性失败，通常是通道返回了错误码|
|MY:0002|操作超时|
|MY:0003|网络错误失败|
|MY:0004|超过限制,重复发送|
|MY:0005|超过最大次数限制|
|MY:1000|程序未激活|
|MY:1001|参数错误|
|MY:1002|用户名为空|
|MY:1003|密码为空|
|MY:1004|用户名错误|
|MY:1005|密码错误|
|MY:1006|IP绑定错误|
|MY:1007|用户已停用|
|MY:1106|没有发送通道|
|MY:1103|手机号码为空|
|MY:1104|手机号重复|
|MY:1108|错误的手机号码|
|MY:1109|黑名单的手机号码|
|MY:1110|没有通道的手机号码|
|MY:1111|额度不足|
|MY:1112|没有配置产品|
|MY:1114|扩展错误|
|MY:2001|内容为空|
|MY:2105|内容太长|
|MY:2107|敏感词汇|
|MY:2113|需要签名|
|MY:2114|签名错误|
|MY:9999|系统内部错误|
|DB:Black|黑名单|
|DB:Back|审核退回|

