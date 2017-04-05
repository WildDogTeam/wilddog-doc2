
title: 发送验证码短信
---

用于查询发送验证码短信，需配合 [数字签名](/sms/guide/signature.html#数字签名验证模式) 使用。该接口限制每秒最多可调用 40 次。

**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/code/send
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
|mobile          |string         |是         |收信人手机号，如1xxxxxxxxxx 格式必须为11位|
|signature      |string         |是         |[数字签名](/sms/guide/signature.html#数字签名验证模式)，合法性验证 其中参与签名加密的参数包括 `templateId`， `mobile`，`timestamp`， 若使用的是自定义验证码模板，还需要`params`参数 |
|timestamp      |string         |是         |UNIX 时间戳单位是毫秒|
|params           |string         |否         |短信参数列表，用于依次填充模板，JSONArray格式，如["xxx","yyy"];对于不包含变量的模板，表示模板即短信全文内容， 若使用自定义验证码模板，则参数必选|


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  生成签名时, 参数不要使用 `urlencode`. 在调用 api 时, 才需要对参数做 `urlencode`
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
其中 `errocde` 对应信息在此处查询 [短信错误码](/sms/api/error-code.html)。

**示例代码**

```
curl -X POST https://api.wilddog.com/sms/v1/{appId}/code/send -d"signature=$signature&mobile=$mobile&timestamp=$timestamp&templateId=$templateId"
```
