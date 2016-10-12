
title: WDGSync
---

连接 Wilddog Sync 的入口点。

## 属性

### app

**定义**

```objectivec
@property (weak, readonly, nonatomic) WDGApp *app
```

**说明**

WDGSync 拥有的 WDGApp 实例。

</br>

------

### persistenceEnabled

**定义**

```objectivec
@property (nonatomic) BOOL persistenceEnabled
```

**说明**

默认情况下，在你的应用程序正在运行时，Wilddog Sync 客户端会将数据保存在内存中，当应用被重新启动时数据就没有了。把这个值设置为 YES 时，数据将被保存到设备，并且当应用程序重新启动时（即使在重新启动程序时没有网络连接），这些存储的数据也是可以用的。请注意，此属性必须在创建第一个 Sync 引用之前设置，并且每次启用应用程序只需要调用一次即可。

</br>

------

### callbackQueue

**定义**

```objectivec
@property (nonatomic, strong) dispatch_queue_t callbackQueue
```

**说明**

设置所有被触发事件的队列。默认队列为主队列。

</br>

------

## 方法

### + sync

**定义**

```objectivec
+ (WDGSync *) sync NS_SWIFT_NAME(sync())
```

**说明**

用默认的 WDGApp 获取这个 WDGSync 实例。

**返回值**

WDGSync 实例。
</br>

--- 

### + syncForApp:

**定义**

```objectivec
+ (WDGSync *) syncForApp:(WDGApp*)app NS_SWIFT_NAME(sync(app:))
```

**说明**

用特定的 WDGApp 获取这个 WDGSync 实例。

**参数**

参数名 | 描述
--- | ---
app | 用于得到 WDGSync 实例的 WDGApp 对象。

**返回值**

WDGSync 实例。

</br>

--- 

### - reference

**定义**

```objectivec
- (WDGSyncReference *)reference
```

**说明**

得到一个 Wilddog Sync 根路径的 WDGSyncReference 引用。

**返回值**

根节点的 WDGSyncReference 实例。

</br>

--- 

### - referenceWithPath:

**定义**

```objectivec
- (WDGSyncReference *) referenceWithPath:(NSString *)path
```

**说明**

指定路径节点的 WDGSyncReference 实例。

**参数**

参数名 | 描述
--- | ---
path | 指向 Wilddog Sync 数据库节点的一个路径。  

**返回值**

指定节点的 WDGSyncReference 实例。

</br>

--- 

### - referenceFromURL:

**定义**

```objectivec
- (WDGSyncReference *)referenceFromURL:(NSString *)syncUrl
```

**说明**

用这个有效的 URL 获得一个 WDGSyncReference 引用。
这个 URL 必须是指向默认 Wilddog Sync 数据库完整路径（如'https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts'）。
若要创建一个指向不同 Sync 数据库的 WDGSyncReference, 可以先用配置好 URL 的 WDGOptions 对象去创建一个WDGApp 。

**参数**

参数名 | 描述
--- | ---
syncUrl | 指向 Wilddog Sync 数据库节点的一个完整的 URL。

**返回值**

指定节点的 WDGSyncReference 实例。

</br>

--- 

### – goOffline

**定义**

```objectivec
- (void)goOffline
```

**说明**

断开与 Wilddog Sync 后台服务器的连接，可以用 `goOnline` 恢复连接。

</br>

----

### – goOnline

**定义**

```objectivec
- (void)goOnline
```

 **说明**

恢复与 Wilddog Sync 后台服务器的连接，可以用 `goOffline` 断开连接。

</br>

----

### + setLoggingEnabled:

**定义**

```objectivec
+ (void) setLoggingEnabled:(BOOL)enabled
```

**说明**

打印程序相关信息。

**参数**

参数名 | 描述
--- | ---
enabled | 设为 YES 为打印。默认为 NO，不打印。  

</br>

----

### + sdkVersion

**定义**

```objectivec
+ (NSString *) sdkVersion
```

**说明**

获取 Wilddog Sync SDK 版本号。

**返回值**

Wilddog Sync SDK 版本号  

