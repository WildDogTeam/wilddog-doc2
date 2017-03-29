title: WDGWeiXinAuthProvider
---

Weixin 登录方式的工厂类，用于生成 Weixin WDGAuthCredential 凭证。

## 方法

### + credentialWithCode:

**定义**

```objectivec
+ (WDGAuthCredential *)credentialWithCode:(NSString *)code
```

**说明**

创建一个 Weixin 登录方式的 WDGAuthCredential 凭证。

**参数**

参数名 | 描述
--- | ---
code | Weixin OAuth code

**返回值**

WDGAuthCredential 对象，里面包含 WeiXin 登录凭证。

</br>

----
### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

这个类不需要初始化。
