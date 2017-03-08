title: WDGApp
---

`WDGApp` 是野狗各个功能模块的入口。用于初始化时的必要参数配置。
一个 `WDGApp` 实例对应一个野狗应用，在 SDK 内以应用名字区分。


## 属性

### name

##### 定义

<div class="swift-lan">Swift</div>```swift
var name: String { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, copy, nonatomic) NSString *name;
```

##### 说明

获取这个 `WDGApp` 实例的名字。

</br>

---

### options

##### 定义

<div class="swift-lan">Swift</div>```swift
var options: WDGOptions { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, nonatomic) WDGOptions *options;
```

##### 说明

初始化 SDK 的配置参数。

</br>

---





## 方法

### + configureWithOptions:

##### 定义

<div class="swift-lan">Swift</div>```swift
class func configure(with options: WDGOptions)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (void)configureWithOptions:(WDGOptions *)options;
```

##### 说明

初始化默认的 Wilddog app。默认的 app 名字是 `__WDGAPP_DEFAULT`。如果配置失败，会抛出异常。
这个方法是线程安全的。
 


##### 参数

 参数名 | 说明 
---|---
options|配置 Wilddog 应用所需的 `WDGOptions` 实例。





</br>

---

### + configureWithName:options:

##### 定义

<div class="swift-lan">Swift</div>```swift
class func configure(withName name: String, options: WDGOptions)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (void)configureWithName:(NSString *)name options:(WDGOptions *)options;
```

##### 说明

用 options 和 name 配置一个 Wilddog app。如果配置失败，会抛出异常。
这个方法是线程安全的。
 


##### 参数

 参数名 | 说明 
---|---
name|开发者自己起名的应用名字。这个名字只能包含字母、数字和下划线。
options|配置 Wilddog 应用所需的 `WDGOptions` 实例。





</br>

---

### + defaultApp

##### 定义

<div class="swift-lan">Swift</div>```swift
class func defaultApp() -> WDGApp?
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (nullable WDGApp *)defaultApp;
```

##### 说明

返回默认的 `WDGApp` 实例，即通过 `configureWithOptions:` 配置的实例。如果默认 app 不存在，则返回 nil。
这个方法是线程安全的。
 



##### 返回值

`WDGApp` 实例。

</br>

---

### + appNamed:

##### 定义

<div class="swift-lan">Swift</div>```swift
/*not inherited*/ init?(named name: String)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (nullable WDGApp *)appNamed:(NSString *)name;
```

##### 说明

返回一个之前通过 `configureWithName:options:` 配置的 WDGApp 实例。如果这个 app 不存在, 则返回 nil。
这个方法是线程安全的。
 



##### 返回值

`WDGApp` 实例。

</br>

---

### + allApps

##### 定义

<div class="swift-lan">Swift</div>```swift
class func allApps() -> [AnyHashable : Any]?
```
<div class="objectivec-lan">Objective-C</div>```objectivec
+ (nullable NSDictionary *)allApps;
```

##### 说明

返回所有现存的 `WDGApp` 实例。如果没有 `WDGApp` 实例，则返回 nil。
这个方法是线程安全的。
 



##### 返回值

包含所有 `WDGApp` 实例的字典，key 为 `WDGApp` 实例对应的名字。

</br>

---

### - deleteApp:

##### 定义

<div class="swift-lan">Swift</div>```swift
func delete(_ completion: @escaping WDGAppVoidBoolCallback)
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (void)deleteApp:(WDGAppVoidBoolCallback)completion;
```

##### 说明

清除当前的 `WDGApp`, 释放相关的数据，并回收它的名字以便将来使用。
这个方法是线程安全的。
 


##### 参数

 参数名 | 说明 
---|---
completion|删除成功后，会调用这个回调函数。







