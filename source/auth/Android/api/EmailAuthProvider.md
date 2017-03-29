title: EmailAuthProvider
---
代表了电子邮件和密码身份验证机制，使用这个类来获取EmailAuthCredential。

## 属性


### PROVIDER_ID

**定义**

```java
public static final String PROVIDER_ID
```

**说明**

返回使用的认证方式的类型唯一标识。值为"password"。

**返回值**

`String` 认证方式的类型唯一标识。
</br>

--- 

## 方法

### getCredential(email，password)
**定义**

```java
public static AuthCredential getCredential (String email, String password)
```

**说明**

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

**参数**


参数名 | 描述
--- | ---
email | 要创建EmailAuthCredential的邮箱地址。
password | 要创建EmailAuthCredential的密码。

**返回值**

AuthCredential 对象。

</br>