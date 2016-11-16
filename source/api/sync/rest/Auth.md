
title: Auth
---

通过认证令牌进行数据访问控制。

## 访问类型

### auth

**说明**

所有的请求都支持。可以授权请求访问被规则表达式保护的数据。可以使用应用的密钥，也可以使用Wilddog ID Token。

**定义**

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json?auth=CREDENTIAL'
```

---

### customTokenToIdToken

**说明**

将 SDK 生成的 CustomToken 转换为 Wilddog ID Token。仅支持 `POST` 方式且 `Content-type` 为`application/json`格式。

**定义**

```
curl -X POST -H "Content-type: application/json;charset=UTF-8" -d '{"token":"<YOUR CUSTOM TOKEN HERE>"}' \
'https://<appid>.wilddogio.com/.auth/customTokenToIdToken.json'
```

**返回值**

```json
{
    "idToken":"<IDTOEKN HERE>",
    "expireIn":<EXPIRE TIME IN SECONDS>
}
```

如果转换过程中出现错误，系统会返回如下格式结果：

```json
{
    "error":{
        "code":"<ERRER CODE>",
        "errorMessage":"<ERROR MESSAGE>"
    }
}
```
