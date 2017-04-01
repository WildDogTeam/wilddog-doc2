title: WDGWilddogAuthProvider
---

email & password 或者 phone & password 登录方式的工厂类，用于生成 WDGAuthCredential 凭证。

## 方法

### + credentialWithEmail:password:

**定义**

```objectivec
+ (WDGAuthCredential *)credentialWithEmail:(NSString *)email password:(NSString *)password
```

**说明**

创建一个 email & password 登录方式的 WDGAuthCredential 凭证。

**参数**

参数名 | 描述
--- | ---
email | 用户的 email 地址  
password | 用户的登录密码

**返回值**

WDGAuthCredential 对象，里面包含 email & password 登录方式凭证。

</br>

----
### + credentialWithPhone:password:

**定义**

```objectivec
+ (WDGAuthCredential *)credentialWithPhone:(NSString *)phone password:(NSString *)password
```

**说明**

创建一个 phone & password 登录方式的 WDGAuthCredential 凭证。

**参数**

参数名 | 描述
--- | ---
phone | 用户的手机号码  
password | 用户的登录密码

**返回值**

WDGAuthCredential 对象，里面包含 phone & password 登录方式凭证。

</br>

----
### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

这个类不需要初始化。

