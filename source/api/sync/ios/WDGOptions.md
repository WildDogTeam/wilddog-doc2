title: WDGOptions
---
用于 Sync 和 Auth SDK 初始化时的参数配置。
## 属性

### syncURL

**定义**

```objectivec
@property(nonatomic, readonly, copy) NSString *syncURL
```
**说明**

Sync 的根路径 URL, e.g. @"http://your-appid.wilddogio.com".

## 方法

### - initWithSyncURL:
**定义**

```objectivec
- (instancetype)initWithSyncURL:(NSString *)syncURL
```

**说明**

初始化 WDGOptions 对象。

**参数**

参数名 | 描述
--- | ---
syncURL | Sync 的根路径 URL, e.g. @"http://your-appid.wilddogio.com". 

**返回值**

初始化成功的 WDGOptions 对象。