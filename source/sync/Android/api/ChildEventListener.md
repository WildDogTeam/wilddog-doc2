title:  ChildEventListener
---

Wilddog Sync 数据监听器，主要用于监听当前节点下子节点的变化，当子节点数据发生变化时将触发相应的回调方法。 
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  此监听器只关注当前节点的子节点，适用与关注子节点变化的场景。
</blockquote>

## 方法

### onChildAdded(snapshot, previousChildName)
##### 定义

```java
void onChildAdded(DataSnapshot snapshot, String previousChildName)
```

##### 说明

当有新增子节点时触发此方法。
如果当前节点存在历史数据，设置数据监听时，会按当前排序逐条返回当前节点下所有子节点的数据快照。

##### 参数

参数名 | 说明
--- | ---
snapshot | [DataSnapshot](/sync/Android/api/DataSnapshot.html) 子节点数据快照。
previousChildName | `String` 按照当前排序前一节点的 key 值。如果当前节点为第一个子节点，该值为 null。

</br>

---
### onChildChanged(snapshot, previousChildName)
##### 定义

```java
void onChildChanged(DataSnapshot snapshot, String previousChildName)
```

##### 说明

当前节点的子节点发生改变的时候触发此方法。
在子节点下增加数据将会触发 `onChildChanged` 事件，而不会触发 `onChildAdded` 事件。

##### 参数

参数名 | 说明
--- | ---
snapshot | [DataSnapshot](/sync/Android/api/DataSnapshot.html) 变化后的子节点数据快照。
previousChildName | `String` 按照当前排序前一节点的 key 值。如果当前节点为第一个子节点，该值为 null。

</br>

---
### onChildMoved(snapshot, previousChildName)
##### 定义

```java
void onChildMoved(DataSnapshot snapshot, String previousChildName)
```

##### 说明

当前排序下，某子节点排序发生变化时触发此方法。
例如当按照优先级排序时，某个子节点的优先级发生改变时将返回此节点数据快照，以及按照新优先级值排序后的前一节点 key 值。

##### 参数

参数名 | 说明
--- | ---
snapshot | [DataSnapshot](/sync/Android/api/DataSnapshot.html) 排序发生变化的子节点数据快照。
previousChildName | `String` 按照当前排序前一节点的 key 值。如果当前节点为第一个子节点，该值为 null。

##### 示例
```java
        //当前数据
        //DataSnapshot { key = orderByPriorityTest, 
        //value = {aaa={.priority=0.0, .value=aaa}, bbb={.priority=1.0, .value=bbb}, 
        //ccc={.priority=2.0, .value=ccc}, ddd={.priority=3.0, .value=ddd}, eee={.priority=4.0, .value=eee} }
        //当前排序为 aaa -> bbb -> ccc -> ddd -> eee

        ref.child("orderByPriorityTest").child("ccc").setPriority(4.1);
        
        //更新优先级后排序为 aaa -> bbb -> ddd -> eee -> ccc 
        //在 'onChildMoved' 方法中返回数据
        //DataSnapshot { key = ccc, value = {.priority=4.1, .value=ccc} }, prevNode:eee
```

</br>

---
### onChildRemoved(snapshot)
##### 定义

```java
void onChildRemoved(DataSnapshot snapshot)
```

##### 说明

移除子节点时触发这个方法。

##### 参数

参数名 | 说明
--- | ---
snapshot | [DataSnapshot](/sync/Android/api/DataSnapshot.html) 被移除的子节点数据快照。
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

