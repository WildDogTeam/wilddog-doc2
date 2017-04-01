
title: 校验验证码
---

用于校验验证码，需配合 [数字签名](/sms/guide/signature.html#生成数字签名的方法) 使用。


**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/code/check
```

**返回数据格式**

```
JSON
```

**HTTP请求方式**    

```
POST    
```
    
**参数说明**
    
|参数           |类型           |必选       |说明|
|--------------|--------------|----------|---|
|code     |string            |是         |验证码|
|mobile          |string         |是         |收信人手机号,如1xxxxxxxxxx 格式必须为11位|
|signature      |string         |是         |[数字签名](/sms/guide/signature.html#生成数字签名的方法) ，合法性验证 其中参与签名加密的参数包括 `code`， `mobile`，`timestamp`|
|timestamp      |string         |是         |UNIX时间戳 单位是毫秒|
    
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <li>生成签名时, 参数不要使用 `urlencode`. 在调用 api 时, 才需要对参数做 `urlencode`</li>
  <li>校验验证码接口不能校验自定义验证码模板发送的接口.</li>
</blockquote>


**返回说明**

正常返回如下：

```
"Content-Type": "application/json; charset=utf-8"
{
  "status":"ok"
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
curl -X POST https://api.wilddog.com/sms/v1/{appId}/code/check -d "signature=$signature&mobile=$mobile&timestamp=$timestamp&code=$code"
```


