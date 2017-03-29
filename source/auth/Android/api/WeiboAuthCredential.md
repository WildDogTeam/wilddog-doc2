title: WeiboAuthCredential
---
包含微博 accessToken 和 uid 的Credential

## 方法


### getProvider ()

**定义**

```java
String getProvider ()
```

**说明**

返回使用的认证方式的类型唯一标识。值为"weibo"。

**返回值**

`String` 认证方式的类型唯一标识。
</br>

--- 

### getAccessToken()

**定义**

```java
public String getAccessToken()
```

**说明**

返回要用于创建WeiboAuthCredential的AccessToken。

**返回值**

`String` 微博登录的AccessToken。
</br>

--- 



### getUid()

**定义**

```java
public String getUid()
```

**说明**

返回要用于创建WeiboAuthCredential的uid。

**返回值**

`String` 微博登录的openID。
</br>

--- 