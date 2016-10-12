title:  ChildEventListener
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
error |`SyncError` 发生错误的描述。|


</br>

---
### onChildAdded(snapshot,previousChildName)
**定义**

```java
void onChildAdded(DataSnapshot snapshot,
                  String previousChildName)
```

**说明**

一个添加了listener的节点，当有子节点被添加时触发此方法。

**参数**

参数名 | 描述 |
--- | --- |
snapshot |`DataSnapshot` 新添加的子节点数据快照。|
previousChildName |`String` 排在被添加的新子节点前面的兄弟节点的key值。如果被添加的是当前节点的第一个子节点，该值为null。|

</br>

---
### onChildChanged(snapshot，previousChildName)
**定义**

```java
void onChildChanged(DataSnapshot snapshot,
                    String previousChildName)
```

**说明**

当前节点的子节点发生改变的时候触发此方法。

**参数**

参数名 | 描述 |
--- | --- |
snapshot |`DataSnapshot` 新子节点数据的快照。|
previousChildName |`String` 排在被修改的新子节点前面的兄弟节点的key值。如果改变的是当前节点的第一个子节点，该值为null。|

</br>

---
### onChildMoved(snapshot，previousChildName)
**定义**

```java
void onChildMoved(DataSnapshot snapshot,
                    String previousChildName)
```

**说明**

当一个子节点的优先级发生变化时，该方法将被调用。参考 SyncReference.setPriority(Object) 和数据排序了解更多关于优先级和数据排序的信息。

**参数**

参数名 | 描述 |
--- | --- |
snapshot |`DataSnapshot` 节点排序发生变化时的数据快照。|
previousChildName |`String` 排在被修改的新子节点前面的兄弟节点的key值。如果改变的是当前节点的第一个子节点，该值为null。|

</br>

---
### onChildRemoved(snapshot)
**定义**

```java
void onChildRemoved(DataSnapshot snapshot)
```

**说明**

当一个添加了listener的节点有子节点被删除的时候触发这个方法。

**参数**

参数名 | 描述 |
--- | --- |
snapshot |`DataSnapshot` 被删除子节点的数据快照。|
</br>

---