
title: 查询发送状态
---

用于查询短信发送状态，需配合 [数字签名](/guide/sms/signature.html#生成数字签名的方法) 使用。

**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/status
```

**返回数据格式**

```
json
```

**HTTP 请求方式**    

```
GET    
```
    
**参数说明**
    
|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|sendId          |string         |是         |发送短信的编号sendId|
|signature      |string         |是         |[数字签名](/guide/sms/signature.html#生成数字签名的方法) ，合法性验证|
 
 
**返回说明**

```
data中返回JSONArray,格式如下(其中status取值:0-未发送,1-发送中,2-发送成功,3-发送失败)
{
    "status": "ok",
     data": [
        {
            "status": 2,
            "mobile": "18888880000",
            "receiveTime": "2016-11-22 20:18:50"
        }
    ]
}
```

**示例代码**


```
curl -X POST https://api.wilddog.com/sms/v1/myoffice1/send 
-d "signature=$signature&sendId=$sendId"
```

