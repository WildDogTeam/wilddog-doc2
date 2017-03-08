title: WDGOptions
---

用于 Sync 和 Auth SDK 初始化时的参数配置。


## 属性

### syncURL

##### 定义

<div class="swift-lan">Swift</div>```swift
var syncURL: String { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, copy, nonatomic) NSString *syncURL;
```

##### 说明

 Sync 的根路径 URL，例如: `@"https://your-appid.wilddogio.com"` 。

</br>

---





## 方法

### - initWithSyncURL:

##### 定义

<div class="swift-lan">Swift</div>```swift
init(syncURL: String)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (instancetype)initWithSyncURL:(NSString *)syncURL;
```

##### 说明

初始化 `WDGOptions` 实例。
 
 


##### 参数

 参数名 | 说明 
---|---
syncURL| Sync 的根路径 URL，例如: `@"https://your-appid.wilddogio.com"` 。




##### 返回值

初始化成功的 `WDGOptions` 实例。



