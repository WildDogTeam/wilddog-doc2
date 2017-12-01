title: WDGVideoInitializer
---

用于初始化 WilddogVideoCall SDK 和 WilddogVideoRoom SDK。

## 属性

### userLogLevel

**定义**

```objectivec
@property (nonatomic, assign) WDGVideoLogLevel userLogLevel;
```

**说明**

设置控制台输出的日志等级，默认为 WDGVideoLogLevelWarning。

</br>

---

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

## 常量

### WDGVideoLogLevel

**说明**

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGVideoLogLevel){
    WDGVideoLogLevelOff = 0,
    WDGVideoLogLevelError,
    WDGVideoLogLevelWarning,
    WDGVideoLogLevelInfo,
    WDGVideoLogLevelDebug,
    WDGVideoLogLevelVerbose
};
```

视频质量选项。

- `WDGVideoLogLevelOff`: 关闭所有日志
- `WDGVideoLogLevelError`: 打印错误信息
- `WDGVideoLogLevelWarning`: 包含 Error，并且打印警告信息
- `WDGVideoLogLevelInfo`: 包含 Warning，并且打印 API 调用信息
- `WDGVideoLogLevelDebug`: 包含 Info，并且打印具体程序执行流程
- `WDGVideoLogLevelVerbose`: 包含 Debug，并且打印接收或发出的网络消息内容
