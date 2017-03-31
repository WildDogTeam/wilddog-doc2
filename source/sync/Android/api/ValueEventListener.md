title:  ValueEventListener
---
Wilddog Sync 数据监听器，主要用于监听当前节点所有数据的变化，当节点数据发生变化时将触发 `onDataChange` 回调方法。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  此监听器关注当前节点的所有数据，适用于关注某节点数据整体变化的场景。
</blockquote>

## 方法
### onDataChange(snapshot)
##### 定义

```java
void onDataChange(DataSnapshot snapshot)
```

##### 说明

当前节点的子节点发生改变的时候触发此方法，将返回此节点下所有数据。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  当使用排序方法时，需要使用 `DataSnapshot` 的 `getChildren()` 方法对返回数据进行迭代才能按顺序获取数据。
</blockquote>

##### 参数

参数名 | 说明
--- | ---
snapshot | [DataSnapshot](/sync/Android/api/DataSnapshot.html) 当前节点的数据快照。
</br>

---
### onCancelled(error)
##### 定义

```java
void onCancelled(SyncError error)
```

##### 说明

当客户端失去对该节点的读取权限时会触发此方法。导致失去读取权限的原因包括：规则表达式限制，数据限制，套餐超出限制等。

##### 参数

参数名 | 说明
--- | ---
error | [SyncError](/sync/Android/api/SyncError.html) 错误详细描述。


</br>


