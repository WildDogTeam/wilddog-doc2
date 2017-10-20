
title: 发送验证码短信
---

用于发送验证码短信，调用时需要计算 [数字签名](/sms/guide/signature.html#生成数字签名的方法) 。该接口限制每秒最多可调用 40 次。

**URL**

```
https://sms.wilddog.com/api/v1/{:appId}/code/send
```

**返回数据格式**

```
JSON
```

**HTTP 请求方式**  

```
POST    
```

**参数说明**

|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|templateId     |long            |是         |模板 ID|
|mobile          |string         |是         |收信人手机号，如1xxxxxxxxxx，格式必须为11位|
|signature      |string         |是         |[数字签名](/sms/guide/signature.html#数字签名验证模式)，合法性验证，其中参与数字签名计算的参数包括 `templateId`， `mobile`，`timestamp`， 若使用的是自定义验证码模板，还需要`params`参数 |
|timestamp      |string         |是         |UNIX 时间戳，精度是毫秒|
|params           |string         |否         |短信参数列表，用于依次填充模板，若使用自定义验证码模板，则此参数必填，JSONArray格式，如["xxx","yyy"]|


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  生成数字签名时, 参数不要使用 `urlencode`. 在调用 api 时, 才需要对参数做 `urlencode`
</blockquote>



**返回说明**

正常返回如下：

```
"Content-Type": "application/json; charset=utf-8"
{
  "status":"ok",
  "data":{
        "rrid" : "1233445555"
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
其中 `errcode` 对应信息在此处查询 [短信错误码](/sms/api/error-code.html)。

**示例代码**

```
curl -X POST https://sms.wilddog.com/api/v1/{appId}/code/send -d"signature=$signature&mobile=$mobile&timestamp=$timestamp&templateId=$templateId"
```


