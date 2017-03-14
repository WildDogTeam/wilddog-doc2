title:  DataSnapshot
---
`DataSnapshot` 是当前指定节点下的数据快照，`DataSnapshot` 不会随当前节点数据的变化而发生改变。
不应直接创建这个数据快照对象，而应当数据监听的回调函数中来获取它。
## 方法

### child(path)
##### 定义

```java
DataSnapshot child(String path)
```

##### 说明

根据相对路径 path，来获取当前节点下 path 子节点的数据快照。相对路径可以是一个子节点的 key 值（如："Beijing"），也可以是更深层次的路径（如："Beijing/pm25"）。
如果相对路径下没有数据，则返回 null 。

##### 参数


参数名 | 说明
--- | ---
path | `String` 类型，path 为相对路径，多层级间需要使用 "/" 分隔，例如 "a/b"。

##### 返回值

`DataSnapshot` 实例。
</br>

---

### exists()

##### 定义

```java
boolean exists()
```

##### 说明

判断当前 `DataSnapshot` 实例中是否包含数据，相当于 `snapshot.getValue() != null`。
但使用 `exists()` 方法进行非空判断比 `snapshot.getValue() != null` 更高效。

##### 返回值

`boolean`，当前实例中包含数据返回 true，否则返回 false。
</br>

---
### hasChild(key)
##### 定义

```java
boolean hasChild(String key)
```

##### 说明

判断是否存在某个指定的子节点的数据快照。如果指定节点快照的数据不为空返回 true。

##### 参数


参数名 | 说明
--- | ---
key | `String` 子节点名称。

##### 返回值

`boolean` 当前数据快照包含指定的子节点的数据快照返回 true，否则返回 false。
</br>

---
### hasChildren()
##### 定义

```java
boolean hasChildren()
```

##### 说明
判断当前 `Datasnapshot` 实例中是否存在子节点。
可以使用 `hasChildren()` 方法来确定当前的数据快照是否含有子节点，进而决定是否调用 `getChildren()` 方法获取迭代器遍历数据。

##### 返回值

`boolean` 当前数据快照存在子节点返回true，否则返回 false。
</br>

---

### getChildren()
##### 定义

```java
Iterable<DataSnapshot> getChildren()
```

##### 说明

获取当前数据快照中所有子节点的迭代器。

##### 返回值

`Iterable<DataSnapshot>` 数据快照子节点迭代器。
</br>

---
### getChildrenCount()
##### 定义

```java
long getChildrenCount()
```

##### 说明

获取子节点的数量。

##### 返回值

`long` 子节点数量 。
</br>

---

### getRef()
##### 定义

```java
SyncReference getRef()。
```

##### 说明

从快照中，获得当前节点的引用。

##### 返回值

[SyncReference](/api/sync/android/SyncReference.html) 节点引用。
</br>

---
### getKey()
##### 定义

```java
String getKey()
```

##### 说明

获取当前数据快照所属节点的 key。

##### 返回值

`String` 数据快照节点的 key 值。
</br>

---

### getValue()
##### 定义

```java
Object getValue()
```

##### 说明

返回当前数据快照包含的数据。
返回的数据类型取决于节点下的数据内容。

##### 返回值

`Object` 当前数据快照包含的数据。可能返回的数据类型包括：null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体，null 表示该节点的数据快照为空。
</br>

---

### getPriority()
##### 定义

```java
Object getPriority()
```

##### 说明

获取当前数据快照所属节点的 priority 值。如果优先级不存在时返回 null。

##### 返回值

`Object` 返回值类型根据节点优先级值的不同，可能为：String、Double 或 null。
</br>



