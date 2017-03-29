title: WeiboAuthProvider
---
代表了新浪微博身份认证机制，使用这个类来获取WeiboAuthCredential。

## 属性


### PROVIDER_ID

**定义**

```java
public static final String PROVIDER_ID
```

**说明**

返回使用的认证方式的类型唯一标识。值为"weibo"。
</br>

--- 

## 方法

### getCredential (token，openId)
**定义**

```java
public static AuthCredential getCredential (String token,String openId)
```

**说明**

返回一个带有AccessToken和openId的WeiboAuthCredential，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

**参数**

参数名 | 描述
--- | ---
token | 要创建WeiboAuthCredential的AccessToken。
openId | 要创建WeiboAuthCredential的openId。

**返回值**

AuthCredential 对象。
</br>

---