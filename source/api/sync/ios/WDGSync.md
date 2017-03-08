title: WDGSync
---

连接 Wilddog Sync 的入口点。
你可以通过调用 [WDGSync sync] 获取一个实例。
在 Sync 中，要在一个节点下读写数据，请用 [[WDGSync sync] reference] 获取一个路径引用。


## 属性

### app

##### 定义

<div class="swift-lan">Swift</div>```swift
weak var app: WDGApp? { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, nonatomic) WDGApp *_Nullable app;
```

##### 说明

`WDGSync` 对应的 `WDGApp` 实例。

</br>

---

### persistenceEnabled

##### 定义

<div class="swift-lan">Swift</div>```swift
var persistenceEnabled: Bool { get set }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (assign, nonatomic) BOOL persistenceEnabled;
```

##### 说明

默认情况下，在你的应用程序正在运行时，Wilddog SDK 会将数据保存在内存中，当应用被重新启动时数据就没有了。
把这个值设置为 YES 时，数据将被保存到设备，并且当应用程序重新启动时（即使在重新启动程序时没有网络连接），这些存储的数据也是可以用的。
 
<blockquote class="warning">
<p><strong>注意：</strong></p>
<ul>
<li>此属性必须在创建第一个 Sync 引用之前设置，并且每次启用应用程序只需要调用一次即可。</li>

</ul>
</blockquote>

</br>

---

### callbackQueue

##### 定义

<div class="swift-lan">Swift</div>```swift
var callbackQueue: DispatchQueue { get set }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (strong, nonatomic) dispatch_queue_t callbackQueue;
```

##### 说明

所有被触发事件将被派发到这个队列执行回调。默认队列为主队列。
 
<blockquote class="warning">
<p><strong>注意：</strong></p>
<ul>
<li>这个属性必须在创建第一个 Sync 引用之前设置。</li>

</ul>
</blockquote>

</br>

---





## 方法

### + sync

##### 定义

<div class="swift-lan">Swift</div>```swift
class func sync() -> WDGSync
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (WDGSync *)sync;
```

##### 说明

用默认的 `WDGApp` 获取对应的 `WDGSync` 实例。
 



##### 返回值

`WDGSync` 实例。

</br>

---

### + syncForApp:

##### 定义

<div class="swift-lan">Swift</div>```swift
class func sync(app: WDGApp) -> WDGSync
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (WDGSync *)syncForApp:(WDGApp *)app;
```

##### 说明

用特定的 `WDGApp` 获取对应的 `WDGSync` 实例。
 


##### 参数

 参数名 | 说明 
---|---
app|用于得到 `WDGSync` 实例的 `WDGApp` 实例。




##### 返回值

`WDGSync` 实例。

</br>

---

### - reference

##### 定义

<div class="swift-lan">Swift</div>```swift
func reference() -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)reference;
```

##### 说明

返回根路径的 `WDGSyncReference` 实例。
 



##### 返回值

根路径的 `WDGSyncReference` 实例。

</br>

---

### - referenceWithPath:

##### 定义

<div class="swift-lan">Swift</div>```swift
func reference(withPath path: String) -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)referenceWithPath:(NSString *)path;
```

##### 说明

返回以 `path` 为相对路径的 `WDGSyncReference` 实例。
 


##### 参数

 参数名 | 说明 
---|---
path|指向 Wilddog 数据库节点的一个路径。




##### 返回值

指定路径节点的 `WDGSyncReference` 引用。

</br>

---

### - referenceFromURL:

##### 定义

<div class="swift-lan">Swift</div>```swift
func reference(fromURL syncUrl: String) -> WDGSyncReference
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGSyncReference *)referenceFromURL:(NSString *)syncUrl;
```

##### 说明

用这个有效的 URL 获得一个 `WDGSyncReference` 引用。
这个 URL 必须是指向默认 Wilddog Sync 数据库完整路径（如 'https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts' ）。
若要创建一个指向不同 Sync 数据库的 `WDGSyncReference`, 可以先用配置好 URL 的 `WDGOptions` 对象去创建一个 `WDGApp`。
 


##### 参数

 参数名 | 说明 
---|---
syncUrl|指向 sync 数据库某一数据节点的一个 URL。




##### 返回值

用一个有效的 URL 生成的 `WDGSyncReference` 引用。

</br>

---

### - goOffline

##### 定义

<div class="swift-lan">Swift</div>```swift
func goOffline()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)goOffline;
```

##### 说明

手动断开与 Wilddog Sync 云端的连接，关闭自动重连，可以用 `goOnline` 恢复连接。




</br>

---

### - goOnline

##### 定义

<div class="swift-lan">Swift</div>```swift
func goOnline()
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)goOnline;
```

##### 说明

手动恢复与 Wilddog Sync 云端的连接，开启自动重连。




</br>

---

### + setLoggingEnabled:

##### 定义

<div class="swift-lan">Swift</div>```swift
class func setLoggingEnabled(_ enabled: Bool)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (void)setLoggingEnabled:(BOOL)enabled;
```

##### 说明

打印程序相关信息。
 


##### 参数

 参数名 | 说明 
---|---
enabled|设为 YES 为打印。默认为 NO，不打印。





</br>

---

### + sdkVersion

##### 定义

<div class="swift-lan">Swift</div>```swift
class func sdkVersion() -> String
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (NSString *)sdkVersion;
```

##### 说明

获取 Wilddog Sync SDK 版本号。
 



##### 返回值

Wilddog Sync SDK 版本号。



