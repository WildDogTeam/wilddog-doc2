title: WilddogAuthProvider
---
提供Auth身份验证类型。

## 属性

### PROVIDER_ID

**定义**

```java
public static final String PROVIDER_ID
```

**说明**

登录方式的 ID。例如: "qq"   


</br>

---
## 方法

### getEmailCredential(email，password)
 **定义**

 ```java
 public static AuthCredential getEmailCredential (String email, String password)
 ```

 **说明**

 返回一个带有邮箱和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

 **参数**


 参数名 | 描述
 --- | ---
 email | 要创建EmailAuthCredential的邮箱地址。
 password | 要创建EmailAuthCredential的密码。

 **返回值**

 AuthCredential 对象。

 </br>

---
### getPhoneCredential(phone，password)
 **定义**

  ```java
  public static AuthCredential getPhoneCredential (String phone, String password)
  ```

  **说明**

  返回一个带有手机号和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

  **参数**


  参数名 | 描述
  --- | ---
  phone | 要创建PhoneAuthCredential的手机号码。
  password | 要创建PhoneAuthCredential的密码。

  **返回值**

  AuthCredential 对象。

  </br>

