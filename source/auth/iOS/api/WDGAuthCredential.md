title: WDGAuthCredential
---

代表 Wilddog Auth 的一个凭证。

## 属性

### provider

**定义**

```objectivec
@property(nonatomic, copy, readonly) NSString *provider
```

**说明**

获取凭证的 id 名。

</br>

------
## 方法

### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

这是一个抽象类。不提供 init 方法。
具体事例化需要用 provider 工厂生成（比如 Sina provider 或者 Weixin provider）。