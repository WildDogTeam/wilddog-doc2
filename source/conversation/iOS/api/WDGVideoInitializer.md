title: WDGVideoInitializer
---

用于初始化 WilddogVideoCall SDK 和 WilddogVideoRoom SDK。

## 方法

### + sharedInstance

**定义**

```objectivec
+ (instancetype)sharedInstance;
```

**说明**

获取 `WDGVideoInitializer` 单例。

**返回值**

`WDGVideoInitializer` 单例。

</br>

---

### - configureWithVideoAppId: token:

**定义**

```objectivec
- (void)configureWithVideoAppId:(NSString *)videoAppId token:(NSString *)token;
```

**说明**

配置 `WDGVideoInitializer` 单例。

**参数**

参数名             | 说明
------------------|------------------
videoAppId        | 在野狗控制面板创建 App 后分配的 Video AppID。
token             | 通过 [WilddogAuth](/auth/iOS/index.html) 验证登录后获取的 [Wilddog ID token](/auth/iOS/api/WDGUser.html#getTokenWithCompletion)。

</br>

---

### - setToken:

**定义**

```objectivec
- (void)setToken:(NSString *)token;
```

**说明**

用于设置 token。

**参数**

参数名             | 说明 
------------------|------------------
token             | 通过 [WilddogAuth](/auth/iOS/index.html) 验证登录后获取的 [Wilddog ID token](/auth/iOS/api/WDGUser.html#getTokenWithCompletion)。

</br>

---
