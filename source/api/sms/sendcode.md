
title: 发送验证码短信
---

用于查询发送验证码短信，需配合 [数字签名](/guide/sms/signature.html#生成数字签名的方法) 使用。该接口限制每秒最多可调用 10 次。

**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/code/send
```

**返回数据格式**

```
json
```

**HTTP 请求方式**  
  
```
POST    
```
    
**参数说明**
    
|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|templateId     |long            |是         |模板 ID|
|mobile          |string         |是         |收信人手机号，如1xxxxxxxxxx 格式必须为11位|
|signature      |string         |是         |[数字签名](/guide/sms/signature.html#生成数字签名的方法)，合法性验证 其中参与签名加密的参数包括 `templateId`， `mobile`，`timestamp`|
|timestamp      |string         |是         |UNIX时间戳|
    

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  生成签名时, 参数不要使用 `urlencode`. 在调用 api 时, 才需要对参数做 `urlencode`
</blockquote>



**返回说明**

```
"Content-Type": "application/json; charset=utf-8"
{
  "status":"ok",
  "data":{
        "sendId" : "1233445555"
   }
}
```

**示例代码**

```
curl -X POST https://api.wilddog.com/sms/v1/{appId}/code/send -d"signature=$signature&mobile=$mobile&timestamp=$timestamp&templateId=$templateId"
```