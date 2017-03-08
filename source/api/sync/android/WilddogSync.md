title:  WilddogSync
---
WilddogSync SDK 的核心类，是访问 Wilddog Sync SDK 的入口。必须通过 `getInstance()` 方法来获取一个`WilddogSync` 实例。

## 方法

### getInstance()

##### 定义

```java
public static synchronized WilddogSync getInstance ()
```

##### 说明

获取默认的 `WilddogSync` 实例。

##### 返回值

`WilddogSync` 实例。
</br>

---

### getInstance(wilddogApp)

##### 定义

```java
public static synchronized WilddogSync getInstance (WilddogApp wilddogApp)
```

##### 说明

使用指定的 `WilddogApp` 实例获取 `WilddogSync` 实例。

##### 参数

   参数名 | 说明
   --- | ---
   wilddogApp |`WilddogApp` 对象。

##### 返回值

`WilddogSync` 实例。
</br>

---

### getReference()

##### 定义

```java
public SyncReference getReference ()
```

##### 说明

返回当前野狗应用根节点的 `SyncReference` 实例。

##### 返回值

[SyncReference](/api/sync/android/SyncReference.html) 实例。
</br>

---
### getReference(path)

##### 定义

```java
SyncReference getReference (String path)
```

##### 说明

返回以 path 为相对路径的 `SyncReference` 实例。

##### 参数

参数名 | 说明
--- | ---
path | 从根节点起要获取的节点路径。

##### 返回值

[SyncReference](/api/sync/android/SyncReference.html) 实例。
</br>

---
### getReferenceFromUrl(url)

##### 定义

```java
SyncReference getReferenceFromUrl (String url)
```

##### 说明

用一个有效的 URL 获取 `SyncReference` 实例。
这个 URL 必须是指向默认 Wilddog Sync 完整路径（如`https://examples.wilddogio.com/web/saving-data/wildblog/posts`）。

##### 参数

参数名 | 说明
--- | ---
url | 指定节点的url。

##### 返回值

[SyncReference](/api/sync/android/SyncReference.html) 实例。
</br>

---
### goOffline()

##### 定义

```java
static void goOffline()
```

##### 说明

手动关闭连接，关闭自动连接。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  调用此方法会影响到所有 Sync 连接。
</blockquote>
</br>

---
### goOnline()

##### 定义

```java
static void goOnline()
```

##### 说明

手动恢复连接，开启自动重连。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  调用此方法会影响到所有 Sync 连接。
</blockquote>
</br>


