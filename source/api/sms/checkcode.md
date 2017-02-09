
title: 校验验证码
---

用于校验验证码，需配合 [数字签名](/guide/sms/signature.html#生成数字签名的方法) 使用。


**URL**

```
https://api.wilddog.com/sms/v1/{:appId}/code/check
```

**返回数据格式**

```
json
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
|signature      |string         |是         |[数字签名](/guide/sms/signature.html#生成数字签名的方法) ，合法性验证 其中参与签名加密的参数包括 `code`， `mobile`，`timestamp`|
|timestamp      |string         |是         |UNIX时间戳 单位是毫秒|
    
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  生成签名时, 参数不要使用 `urlencode`. 在调用 api 时, 才需要对参数做 `urlencode`
  校验验证码接口不能校验自定义验证码模板发送的接口.
</blockquote>


**返回说明**

```
"Content-Type": "application/json; charset=utf-8"
{
  "status":"ok"
}
```

**示例代码**

```
curl -X POST https://api.wilddog.com/sms/v1/{appId}/code/check -d "signature=$signature&mobile=$mobile&timestamp=$timestamp&code=$code"
```


