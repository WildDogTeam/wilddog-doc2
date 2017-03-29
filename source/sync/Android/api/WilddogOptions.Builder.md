title: WilddogOptions.Builder
----
用于创建 [WilddogOptions](/api/sync/android/WilddogOptions.html) 实例的构造器。

## 方法

### setSyncUrl(syncUrl)

##### 参数

```java
WilddogOptions.Builder setSyncUrl(String syncUrl)
```

##### 说明

设置 SyncUrl 属性。此项为必选参数。

##### 参数

参数名 | 说明
--- | ---
syncUrl | `String` 类型，Wilddog Sync 的根路径。


##### 返回值

`WilddogOptions.Builder` 实例。
</br>

--- 
### build()

##### 参数

```java
WilddogOptions build()
```

##### 说明

使用设置的 syncUrl 参数，创建 [WilddogOptions](/api/sync/android/WilddogOptions.html) 实例。

##### 返回值

[WilddogOptions](/api/sync/android/WilddogOptions.html) 实例。
</br>


