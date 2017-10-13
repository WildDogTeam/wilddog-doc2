title:  Config
---
配置信息类。可以为 [SyncReference](/sync/Java/api/SyncReference.html) 提供配置信息。默认使用 Wilddog Sync 提供的默认配置对象。
## 方法

### setLogger(logger)
##### 定义

```java
void setLogger(Logger logger)
```

##### 说明

设置自定义日志记录器。传递一个实现 `Logger` 接口的对象可以使用自定义日志记录器，默认使用 Wilddog Sync 提供的 `DefaultLogger`。

##### 参数


参数名 | 说明
--- | ---
logger | `Logger` 自定义日志记录器。
</br>

---
### setEventTarget()

##### 定义

```java
void setEventTarget(EventTarget eventTarget)
```

##### 说明

Wilddog Sync 会默认使用主线程 `Looper` 来处理所有的回调。
如果想对如何触发回调有更多控制权，可以设置一个继承 `EventTarget` 类的实例对象，它将在回调中传递一个 `Runnable` 对象。

##### 参数

参数名 | 说明
--- | ---
eventTarget | `EventTarget` 负责触发回调的对象。

</br>

---
### setLogLevel(logLevel)
##### 定义

```java
void setLogLevel(Logger.Level logLevel)
```

##### 说明

设置最低日志级别，默认设置为 INFO 级别，设置为 DEBUG 将会打开诊断日志，设置为 NONE 禁止所有日志。

##### 参数

参数名 | 说明
--- | ---
logLevel | `Logger.Level` 所需最低的日志等级。</br>共有 NONE/INFO/WARN/DEBUG/ERROR 五个日志级别。
</br>

---
### setDebugLogComponents(debugComponents)
##### 定义

```java
void setDebugLogComponents(List<String> debugComponents)
```

##### 说明

主要用于 debug 调试，限制 debug 输出到指定组件，默认为 null，允许所有组件的日志。
调用此方法显式设置日志组件会把最低日志级别设置为 DEBUG。

##### 参数

参数名 | 说明
--- | ---
debugComponents | `List<String> ` 一系列日志需要的组件，或者设置为 null 使所有组件可用。
</br>

---
### setAuthenticationServer(host)

##### 定义

```java
void setAuthenticationServer(String host)
```

##### 说明

设置主机可以被用户登录认证。
在不确定是否可以认证的情况下，请不要使用此设置。

##### 参数

参数名 | 说明
--- | ---
host | `String` 用于认证的 server 地址。
</br>

---
### setSessionPersistenceKey()

##### 定义

```java
void setSessionPersistenceKey(String sessionKey)
```

##### 说明

为 Wilddog Sync 连接设置 session 的标识符，使用 session 标识符可以使多个认证会话在一个设备上共存。如果当前设备上只有一个用户则不需使用此方法。

##### 参数

参数名 | 说明
--- | ---
sessionKey | `String` 用于标识 session 的标识符名称。
</br>


