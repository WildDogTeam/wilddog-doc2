title: WeiXinAuthProvider
---
代表了微信身份认证机制，使用这个类来获取WeiXinAuthCredential。

## 属性


### PROVIDER_ID

**定义**

```java
public static final String PROVIDER_ID
```

**说明**

返回使用的认证方式的类型唯一标识。值为"weixin"。


</br>

--- 

## 方法

### getCredential (code)
**定义**

```java
public static AuthCredential getCredential (String code)
```

**说明**

返回一个带有code的WeiXinAuthCredential，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用。

**参数**


参数名 | 描述 |
--- | --- |
code | 要创建WeiboAuthCredential的code，在baseResp对象中获取的。 |

**返回值**

AuthCredential 对象。

</br>