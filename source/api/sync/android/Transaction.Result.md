title:  Transaction.Result
---
事务处理结果，表示每次运行 `doTransaction` 时期望操作的结果。
使用事务提交新值或者手动取消事务都会返回此类实例。

## 方法

### isSuccess()

**定义**

```java
 boolean isSuccess ()
```

**说明**

当前操作是否成功。


**返回值**

boolean 类型，成功返回 true，否则返回 false。
</br>

---
