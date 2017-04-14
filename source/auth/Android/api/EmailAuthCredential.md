title: EmailAuthCredential
---
包含邮箱和密码的身份认证方式。

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

### getEmail ()

**定义**

```java
String getEmail ()
```

**说明**

将要创建的邮箱认证方式的邮箱地址。

**返回值**

`String` 邮箱地址。
</br>

--- 
### getPassword ()

**定义**

```java
String getPassword ()
```

**说明**

将要创建的邮箱认证方式的密码。

**返回值**

`String` 密码。
</br>

--- 

