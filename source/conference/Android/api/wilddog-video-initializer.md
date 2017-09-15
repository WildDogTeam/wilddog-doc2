title: WilddogVideoInitializer
---
WilddogVideo SDK 和 WilddogRoom SDK 初始化器。

## 方法

### initialize(context,videoAppId,token)

**定义**
   
```java
    public static void initialize(Context context, String videoAppId, String token)
```
**说明**

使用 AppId、token 初始化 SDK。

**参数**

| 参数名 | 描述 |
|---|---|
| context | Android 应用 Application Context。 |
| videoAppId | 在野狗控制面板创建 App 后分配的 Video AppID。 |
| token | 通过 `WilddogAuth` 验证登录后获取的 [Wilddog ID token](/auth/Android/guide/concept.html#身份认证令牌)。 |

</br>

---

### setToken(token)

**定义**
   
```java
    public void setToken(String token)
```
**说明**

重新设置 token 。

**参数**
<style>
table th:first-of-type {
    width: 100px;
}
</style>

| 参数名 | 描述 |
|---|---|
| token | 通过 `WilddogAuth` 验证登录后获取的 [Wilddog ID token](/auth/Android/guide/concept.html#身份认证令牌)。 |

</br>

---
