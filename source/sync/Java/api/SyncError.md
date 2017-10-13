title:  SyncError
---


## 方法


### getErrCode()

##### 定义

```java
int getCode()
```

##### 说明

返回当前错误的错误码，详细错误码请参阅 [错误码](/sync/Java/api/error-code.html)

##### 返回值

`int` 错误状态码，值为5位正整数。
</br>

---

### getCode()

##### 定义

```java
int getCode()
```

##### 说明

已过时，一个明确的状态码，取决于错误。请不要继续使用此错误码进行业务逻辑判断。

##### 返回值

`int` 错误状态码，值为负整数。
</br>

---
### getMessage()

##### 定义

```java
String getMessage()
```

##### 说明

获取错误原因。

##### 返回值

`String` 错误原因。
</br>

---
### getDetails()

##### 定义

```java
String getDetails()
```

##### 说明

获取错误细节。

##### 返回值

`String` 错误的细节。
</br>

---
### toException()

##### 定义

```java
WilddogExcepton toException()
```

##### 说明

如果第三方需要一个来自 Sync 的异常，出于整合的目的可以使用此方法。

##### 返回值

`WilddogExcepton` 一个封装了error的异常类，包含了适当的信息，没有栈信息。
</br>

