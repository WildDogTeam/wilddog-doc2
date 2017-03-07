title:  Transaction.Handler
---
事务处理接口，实现了此接口的类可以用于提交事务操作，并返回事务处理结果。

## 方法

### doTransaction(currentData)

**定义**

```java
doTransaction(MutableData currentData)
```

**说明**

使用当前的 `MutableData` 数据快照提交当前事务，为保证事务成功，此方法有可能会被调用多次。

**参数**

   参数名 | 描述
   --- | ---
   currentData |[MutableData](/api/sync/android/MutableData.html) 实例。

**返回值**

`Transaction.Result` 实例，当前事务操作结果。
</br>

---
### onComplete(error,committed,currentData)

**定义**

```java
void onComplete(SyncError error, boolean committed, DataSnapshot currentData);
```

**说明**

在事务完成后调用一次，返回事务操作结果。

**参数**

参数名 | 描述
--- | ---
error |[SyncError](/api/sync/android/SyncError.html) 实例，无错误时值为 null，否则返回错误详细信息。
committed |boolean 类型，成功提交返回 true，否则返回 false。
currentData |[DataSnapshot](/api/sync/android/DataSnapshot.html) 实例，当前节点数据快照。
</br>

---
