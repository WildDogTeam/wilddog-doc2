title: WDGEmailPasswordAuthProvider
---

email & password 登录方式的工厂类，用于生成 WDGAuthCredential 凭证。
这个类已经废弃。请使用 WDGWilddogAuthProvider 代替。

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
### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

这个类不需要初始化。

