title:  SyncReference.CompletionListener
---

## 方法

### onComplete(error,ref)
**定义**

```java
void onComplete(SyncError error, SyncReference ref)
```

**说明**

当操作成功或者失败的时候触发这个方法。如果操作失败，会给出一个error,如果操作成功，error为null。

**参数**

参数名 | 描述 |
--- | --- |
error |`SyncError` 错误描述。|
ref | `SyncReference` 到指定 Sync 节点的引用。|
</br>

---

