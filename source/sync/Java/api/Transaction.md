title:  Transaction
---
事务处理类。
`WilddogSync` 提供了 `Transaction.Handler` 来提交事务处理，即 `runTransaction()`。
执行事务时会提交当前数据快照 [MutableData](/sync/Java/api/MutableData.html)，并返回一个 `Transaction.Result` 实例。调用 `abort()` 以及 `success()` 方法都会返回 `Transaction.Result` 实例。

## 方法

### abort()

##### 定义

```java
static Transaction.Result abort()
```

##### 说明

手动取消事务。

##### 返回值

`Transaction.Result` 实例，当前操作结果。
</br>

---
### success(resultData)

##### 定义

```java
static Transaction.Result success(MutableData resultData)
```

##### 说明

向云端提交事务请求。
如果数据已被其他客户端修改，那么云端会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。

##### 参数

参数名 | 说明
--- | ---
resultData |[MutableData](/sync/Java/api/MutableData.html) 类型，需要提交的数据。

##### 返回值

`Transaction.Result` 实例，当前操作结果。
</br>


