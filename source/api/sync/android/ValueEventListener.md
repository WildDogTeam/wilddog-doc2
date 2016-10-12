title:  ValueEventListener
---

## 方法

### onCancelled(error)
**定义**

```java
void onCancelled(SyncError error)
```

**说明**

当listener在服务端失败，或者被删除的时候调用该方法。

**参数**

参数名 | 描述 |
--- | --- |
error |`DataSnapshot` 发生错误的描述。|


</br>

---
### onDataChange(snapshot)
**定义**

```java
void onDataChange(DataSnapshot snapshot)
```

**说明**

一个添加了 listener 的节点，当有节点改变时触发此方法。

**参数**

参数名 | 描述 |
--- | --- |
snapshot |`DataSnapshot` 新添加的子节点的数据快照。|
</br>

---
