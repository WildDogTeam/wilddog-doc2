title:  SyncError
---

## 属性

### DATA_STALE
**定义**

```java
public static final int DATA_STALE = -1;
```

**说明**

内部使用。
</br>

---
### DENIED_BY_USER
**定义**

```java
public static final int DENIED_BY_USER = -19;
```

**说明**

用户不能登录认证应用。当用户取消OAuth认证请求时会造成这个错误。
</br>

---
### DISCONNECTED
**定义**

```java
public static final int DISCONNECTED = -4;
```

**说明**

因为网络连接失败导致操作不能执行。
</br>

---
### EXPIRED_TOKEN
**定义**

```java
	public static final int EXPIRED_TOKEN = -6;
```

**说明**

提供的auth Token已经过期。
</br>

---
### INVALID_TOKEN
**定义**

```java
	public static final int INVALID_TOKEN = -7;
```

**说明**

指定的登录认证Token不可用。如果token变形，过期或者用于生成token的secret已经被撤销，会引发此错误。
</br>

---
### LIMITS_EXCEEDED
**定义**

```java
public static final int LIMITS_EXCEEDED = -23;
```

**说明**

超过限制，如果遇到此错误码，请联系support@Wilddog.com。
</br>

---
### MAX_RETRIES
**定义**

```java
public static final int MAX_RETRIES = -8;
```

**说明**

事务有太多的重试。
</br>

---
### NETWORK_ERROR
**定义**

```java
public static final int NETWORK_ERROR = -24;
```

**说明**

因为网络原因导致操作不能执行。
</br>

---
### OPERATION_FAILED
**定义**

```java
public static final int OPERATION_FAILED = -2;
```

**说明**

服务器标示操作失败。
</br>

---
### OVERRIDDEN_BY_SET
**定义**

```java
public static final int OVERRIDDEN_BY_SET = -9;
```

**说明**

事务被随后的集合覆盖。
</br>

---
### PERMISSION_DENIED
**定义**

```java
public static final int PERMISSION_DENIED = -3;
```

**说明**

客户端不被许可执行此操作。
</br>

---
### UNKNOWN_ERROR
**定义**

```java
public static final int UNKNOWN_ERROR = -999;
```

**说明**

未知的错误。
</br>

---
### USER_CODE_EXCEPTION
**定义**

```java
public static final int UNKNOWN_ERROR = -11;
```

**说明**

用户代码中发生的异常。
</br>

---

## 方法

### fromException(e)

**定义**

```java
WilddogException fromException(Throwable e)
```

**说明**

新建一个WilddogException异常。

**参数**

 参数名 | 描述
 --- | ---
  e |一个普通异常对象

**返回值**

`WilddogException`


</br>

---
### fromStatus(status)

**定义**

```java
SyncError fromStatus(String status)
```

**说明**

用 SyncError 常量新建一个 SyncError 实例。

**参数**

 参数名 | 描述
 --- | ---
  status |`SyncError` The status string。

**返回值**

`SyncError`


</br>

---
### getCode()

**定义**

```java
int getCode()
```

**说明**

一个明确的状态码，取决于错误。

**返回值**

`int` 错误状态码。
</br>

---
### getMessage()

**定义**

```java
String getMessage()
```

**说明**

获取错误原因。

**返回值**

`String`错误原因。
</br>

---
### getDetails()

**定义**

```java
String getDetails()
```

**说明**

获取错误细节。

**返回值**

`String`错误的细节。
</br>

---
### toException()

**定义**

```java
WilddogExcepton toException()
```

**说明**

如果第三方需要一个来自 Sync 的异常，出于整合的目的可以使用此方法。

**返回值**

`WilddogExcepton`一个封装了error的异常类，包含了适当的信息，没有栈信息。
</br>

---