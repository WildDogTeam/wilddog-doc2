title: WDGWeiboAuthProvider
---

Sina 登录方式的工厂类，用于生成 Sina WDGAuthCredential 凭证。

## 方法

### + credentialWithAccessToken:userID:

**定义**

```objectivec
+ (WDGAuthCredential *)credentialWithAccessToken:(NSString *)accessToken userID:(NSString *)userID
```

**说明**

创建一个 Sina 登录方式的 WDGAuthCredential 凭证。

**参数**

参数名 | 描述
--- | ---
accessToken | Sina OAuth access token
userID | Sina OAuth 的 userID

**返回值**

WDGAuthCredential 对象，里面包含 Sina 登录凭证。

</br>

----
### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

这个类不需要初始化。
