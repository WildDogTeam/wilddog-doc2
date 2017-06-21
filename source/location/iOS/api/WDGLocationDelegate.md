title: WDGLocationDelegate
---

`WDGLocation`的代理方法。

## 方法

### - wilddogLocation:willUpdateLocation:ForKey:

##### 定义

```objectivec
@optional
- (WDGPosition *_Nullable)wilddogLocation:(WDGLocation *)wilddogLocation willUpdateLocation:(WDGPosition *)location ForKey:(NSString *)key;
```

##### 说明
当 SDK 即将更新位置同步和实时轨迹的数据时，可以通过这个代理方法对上传到云端的位置信息进行替换。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 位置同步和实时轨迹数据将写在这个key名下。
location        | 原始位置数据。

##### 返回值
实际上传的位置数据。

---

### - wilddogLocation:didStartedTracingLocationForKey:

##### 定义

```objectivec
@optional
- (void)wilddogLocation:(WDGLocation *)wilddogLocation didStartedTracingLocationForKey:(NSString *)key;
```

##### 说明
当针对指定 key 的位置同步开始后通过这个代理方法进行通知。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 位置同步数据将写在这个key名下。

---

### - wilddogLocation:didStoppedTracingLocationForKey:

##### 定义

```objectivec
@optional
- (void)wilddogLocation:(WDGLocation *)wilddogLocation didStoppedTracingLocationForKey:(NSString *)key;
```

##### 说明
当针对指定 key 的位置同步终止后通过这个代理方法进行通知。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 位置同步数据将写在这个key名下。

---

### - wilddogLocation:didFailedTracingLocationForKey:

##### 定义

```objectivec
@optional
- (void)wilddogLocation:(WDGLocation *)wilddogLocation didFailedTracingLocationForKey:(NSString *)key withError:(NSError *)error;
```

##### 说明
当针对指定 key 的位置同步未能正常开启时通过这个代理方法进行通知。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 位置同步数据将写在这个key名下。

---

### - wilddogLocation:didStartedRecordingPathForKey:

##### 定义

```objectivec
@optional
- (void)wilddogLocation:(WDGLocation *)wilddogLocation didStartedRecordingPathForKey:(NSString *)key;
```

##### 说明
当针对指定 key 的轨迹记录开始后通过这个代理方法进行通知。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 轨迹数据将写在这个key名下。

---

### - wilddogLocation:didStoppedRecordingPathForKey:

##### 定义

```objectivec
@optional
- (void)wilddogLocation:(WDGLocation *)wilddogLocation didStoppedRecordingPathForKey:(NSString *)key;
```

##### 说明
当针对指定 key 的轨迹记录终止后通过这个代理方法进行通知。

##### 参数

参数名           | 说明
--------------- | -----------------------------------
wilddogLocation | 调用这个代理方法的 `WDGLocation` 实例。
key             | 轨迹数据将写在这个key名下。
