title: WDGApp 
---
WDGApp 是野狗各个功能模块的入口。用于初始化时的必要参数配置。一个 WDGApp 对象对应一个野狗应用，在 SDK 内以应用别名区分。

## 属性

### name

**定义**

```objectivec```
@property(nonatomic, copy, readonly) NSString *name
```
**说明**

应用的别名。

### options

**定义**

```objectivec```
@property(nonatomic, readonly) WDGOptions *options
```

**说明**

初始化 SDK 的配置参数。

## 方法

### + configureWithOptions:
**定义**

```objectivec```
+ (void)configureWithOptions:(WDGOptions *)options
```
**说明**

初始化默认的 Wilddog app。默认的 app 名字是 '__WDGAPP_DEFAULT'。如果配置失败，会抛出异常。这个方法能确保线程安全。

**参数**

参数名 | 描述
--- | ---
options | 配置 Wilddog 应用所需的 WDGOptions 实例。


### + configureWithName:options:

**定义**

```objectivec```
+ (void)configureWithName:(NSString *)name options:(WDGOptions *)options
```
**说明**

用 options 和 name 配置一个 Wilddog app. 如果配置失败，会抛出异常。这个方法是线程安全的。

**参数**

参数名 | 描述
--- | ---
name | 应用别名。这个别名只能包含字母、数组和下划线。
options | 配置 Wilddog 应用所需的 WDGOptions 实例。


### + defaultApp

**定义**

```objectivec```
+ (nullable WDGApp *)defaultApp NS_SWIFT_NAME(defaultApp())
```
**说明**

返回一个默认的 app。如果默认 app 不存在，则返回 nil。


### + appNamed:

**定义**

```objectivec```
+ (nullable WDGApp *)appNamed:(NSString *)name
```
**说明**

返回 name 对应的 WDGApp 实例。如果没有 WDGApp 实例，则返回 nil。这个方法能确保线程安全。

**参数**

参数名 | 描述
--- | ---
name | 应用别名

**返回值**

应用别名对应的 app 对象。

### + allApps

**定义**

```objectivec```
+ (nullable NSDictionary *)allApps
```
**说明**

返回所有的 WDGApp 实例。如果没有 WDGApp 实例，则返回 nil。这个方法能确保线程安全。

**返回值**

返回所有现存的 WDGApp 实例。

### - deleteApp:

**定义**

```objectivec```
- (void)deleteApp:(WDGAppVoidBoolCallback)completion
```
**说明**

删除当前的 WDGApp, 释放相关的数据，并回收它的名字以便将来使用。这个方法能确保线程安全。

**参数**

参数名 | 描述
--- | ---
completion | 删除成功回调方法。
