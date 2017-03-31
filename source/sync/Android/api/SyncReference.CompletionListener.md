title:  SyncReference.CompletionListener
---
`SyncReference` 操作完成监听，每个操作执行完成后会回调此监听的 `onComplete()` 方法。
## 方法

### onComplete(error, ref)
##### 定义

```java
void onComplete(SyncError error, SyncReference ref)
```

##### 说明

当操作执行完成后触发此方法。
操作失败，将返回一个 `SyncError` 实例; 操作成功时 `SyncError` 为 null。

##### 参数

参数名 | 说明
--- | ---
error | [SyncError](/sync/Android/api/SyncError.html) 错误详细描述。
ref | [SyncReference](/sync/Android/api/SyncReference.html) 当前操作的节点引用。
</br>


