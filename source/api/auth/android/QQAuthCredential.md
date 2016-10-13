title: QQAuthCredential
---
包含qq accessToken的Credential

## 方法


### getProvider ()

**定义**

```java
String getProvider ()
```

**说明**

返回使用的认证方式的类型唯一标识。例如："weixin"，"qq"，"weibo"，"password"。

**返回值**

`String`认证方式的类型唯一标识。
</br>

--- 

### getAccessToken()

**定义**

```java
public String getAccessToken()
```

**说明**

返回要用于创建QQAuthCredential的AccessToken。

**返回值**

`String` AccessToken。
</br>

--- 


