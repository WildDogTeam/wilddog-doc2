title: AuthCredential
---
已知直接子类
EmailAuthCredential，QQAuthCredential，WeiboAuthCredential，WeiXinAuthCredential代表Wilddog支持的身份认证的方式的认证凭据。

## 方法


### getProvider ()

**定义**

```java
String getProvider ()
```

**说明**

返回使用的认证方式的类型唯一标识。例如："weixin"，"qq"，"weibo"，"password"。

**返回值**

`String` 认证方式的类型唯一标识。
</br>

--- 
