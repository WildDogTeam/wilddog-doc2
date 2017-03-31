
title: 查询账户余额
---

用于查询账户当前余额，分为现金余额和代金券余额。

**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/getBalance
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
|signature      |string         |是         |[数字签名](/guide/sms/signature.html#生成数字签名的方法) ，合法性验证，其中参与签名加密的参数包括`timestamp`|
|timestamp      |string         |是         | UNIX 时间戳|
 
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <li>生成签名时不要使用 urlencode，在调用 API 时，才需要对参数做 urlencode<li/>
  返回账户余额单位为厘，1 元 = 1000 厘。
</blockquote>
 
**返回说明**

正常返回如下：

```
"Content-Type": "application/json; charset=utf-8" 
{
	"status":"ok", 
	"data":"{
			"balance" : 10000000 // 现金余额   
			"voucherBalance" : 10000000// 代金券余额     
	}
}
```

异常返回如下：

```
{
  "errcode": 7xxxx,
  "message": "xxxxxx"
}
```
其中 `errocde` 对应信息在此处查询 [短信错误码](/api/sms/error-code.html)。

**示例代码**


```
curl -X GET https://api.wilddog.com/sms/v1/{appId}/getBalance -d "signature=$signature&timestamp=$timestamp"
```

