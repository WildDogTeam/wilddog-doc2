title:  Config
---

## 方法

### setLogger(logger)
**定义**

```java
void setLogger(Logger logger)
```

**说明**

如果你想提供一个定制的日志，传递一个继承了Logger接口的对象。

**参数**


参数名 | 描述 |
--- | --- |
logger | `Logger` 定制的日志。|
</br>

---
### setEventTarget()

**定义**

```java
void setEventTarget(EventTarget eventTarget)
```

**说明**

在默认设置中，Sync 库会创建一个线程来处理所有的回调。在安卓中，将试图采用main Looper。如果你想对如何触发回调有更多控制权，你可以提供一个对象，让他继承EventTarget，它将为每一个回调传递一个Runnable。

**参数**

参数名 | 描述 |
--- | --- |
eventTarget | `EventTarget`  负责触发回调的对象。|

</br>

---
### setLogLevel(logLevel)
**定义**

```java
void setLogLevel(Logger.Level logLevel)
```

**说明**

默认的，这会被设置为INFO。log等级包括内部错误（ERROR）和任何客户端接收到的安全性debug信息（INFO），设置为DEBUG将会打开诊断日志，设置为NONE禁止所有日志。

**参数**

参数名 | 描述 |
--- | --- |
logLevel | `Logger.Level` 所需最低的日志等级。|
</br>

---
### setDebugLogComponents(debugComponents)
**定义**

```java
void setDebugLogComponents(List<String> debugComponents)
```

**说明**

主要用于debug调试.限制debug输出到指定组件。默认为null，允许所有组建的日志;  显式设置也会把等级设置为DEBUG。

**参数**

参数名 | 描述 |
--- | --- |
debugComponents | `List<String> ` 一系列日志需要的组件，或者设置为null使所有组件可行。|
</br>

---
### setAuthenticationServer(host)

**定义**

```java
void setAuthenticationServer(String host)
```

**说明**

设置主机可以被用户登录认证。如果你不确定，不要使用此设置。

**参数**

参数名 | 描述 |
--- | --- |
host | `String` 用于认证的server。|
</br>

---
### setSessionPersistenceKey()

**定义**

```java
void setSessionPersistenceKey(String sessionKey)
```

**说明**

为Ｗilddog连接设置session的标识符，使用session标识符可以使多个认证会话在一个设备上共存。如果一个设备上只有一个用户没有必要使用此方法。

**参数**

参数名 | 描述 |
--- | --- |
sessionKey | `String` 用于标识session的标识符名称。|
</br>

---