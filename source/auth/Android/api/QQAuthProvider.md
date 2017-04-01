title: QQAuthProvider
---
代表了 QQ 身份认证机制，使用这个类来获取 QQAuthCredential。

## 属性


### PROVIDER_ID

**定义**

```java
public static final String PROVIDER_ID
```

**说明**

返回使用的认证方式的类型唯一标识。值为"qq"。
</br>

--- 

## 方法

### getCredential (token)
**定义**

```java
public static AuthCredential getCredential (String token)
```

**说明**

返回一个带AccessToken的QQAuthCredential，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

**参数**


参数名 | 描述
--- | ---
token | 要创建QQAuthCredential的AccessToken。

**返回值**

AuthCredential 对象。

</br>