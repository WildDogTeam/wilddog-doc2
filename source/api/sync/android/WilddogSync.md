title:  WilddogSync
---
WilddogSync SDK的核心类，用于初始化不同的WilddogSync实例或者创建不同的SyncReference实例。

## 方法

### getInstance()

**定义**

```java
public static WilddogSync getInstance ()
```

**说明**

用默认的 WilddogApp 获取这个 WilddogSync 实例。

**返回值**

WilddogSync 实例
</br>

---
### getReference()

**定义**

```java
public SyncReference getReference ()
```

**说明**

用默认的 WilddogApp 获取这个 WilddogSync 实例。

**返回值**

SyncReference 实例
</br>

---
### getReference(path)

**定义**

```java
SyncReference getReference (String path)
```

**说明**

用有效的路径去获得一个 SyncReference 实例。


**参数**

参数名 | 描述 |
--- | --- |
path | 从根节点起要获取的节点路径。|

**返回值**

SyncReference 实例
</br>

---
### getReferenceFromUrl(url)

**定义**

```java
SyncReference getReferenceFromUrl (String url)
```

**说明**

用这个有效的 URL 获得一个 SyncReference 实例。
这个 URL 必须是指向默认 Wilddog Sync 完整路径（如`https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts`）。

**参数**

参数名 | 描述 |
--- | --- |
url | 到指定节点的url。|

**返回值**

SyncReference 实例
</br>

---
### goOffline()

**定义**

```java
static void goOffline()
```

**说明**

手动关闭连接，关闭自动连接。
注意：调用此方法会影响到所有 Sync 连接。


</br>

---
### goOnline()

**定义**

```java
static void goOnline()
```

**说明**

手动建立连接，开启自动重连。
注意：调用此方法会影响到所有 Sync 连接。


</br>

---
