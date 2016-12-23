title: WilddogIMNotification
---
WilddogIMNotification SDK 入口对象。进行绑定和解绑用户的一系列推送相关操作。



## 方法

### bindUser (context，completionListener)

**定义**

```java
public static void bindUser(Context context, WilddogNotification.CompletionListener completionListener)
```

**说明**

与用户绑定，可在离线的时候接收到推送消息。

**参数**

参数名 | 描述
--- | ---
context | 安卓中的context对象。
completionListener | 绑定成功回调。

---
</br>

### unbindUser（context，completionListener）

**定义**

```java
public static void unbindUser(Context context, WilddogNotification.CompletionListener completionListener)
```

**说明**

与用户解绑，不在收到离线的时候推的送消息。
  
**参数**

参数名 | 描述
--- | ---
context | 安卓中的context对象。
completionListener | 绑定成功回调。


**返回值**

`WilddogIM`返回当前WilddogIM对象。

---
</br>

