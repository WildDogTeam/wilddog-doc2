title:  DataSnapshot
---

## 方法

### child(path)
**定义**

```java
DataSnapshot child (String path)
```

**说明**

根据相对路径，来获取当前节点下子节点的快照。

**参数**


参数名 | 描述
--- | ---
path | `String`  子节点名称。

**返回值**

`DataSnapshot` 对象
</br>

---

### exists()

**定义**

```java
boolean exists()
```

**说明**

在快照中，判断当前节点是否包含数据。相当于`snapshot.getValue()!=null` 。

**返回值**

`boolean`
</br>

---
### getChildren()
**定义**

```java
Iterable<DataSnapshot> getChildren()
```

**说明**

获取当前快照中，所有子节点的迭代器。

**返回值**

`Iterable<DataSnapshot>` 子节点的迭代器。
</br>

---
### getChildrenCount()
**定义**

```java
long getChildrenCount()
```

**说明**

获得子节点的总数。

**返回值**

`long` 子节点总数 。
</br>

---
### getKey()
**定义**

```java
String getKey()
```

**说明**

从快照中，获取当前节点的名称。

**返回值**

`String` 节点名称 。
</br>

---
### getPriority()
**定义**

```java
Object getPriority()
```

**说明**

获取当前节点的优先级。

**返回值**

`Object`   `Stirng` , `Double` , `Null`。
</br>

---
### getRef()
**定义**

```java
SyncReference getRef()。
```

**说明**

从快照中，获得当前节点的引用。

**返回值**

`SyncReference` 节点引用。
</br>

---
### getValue()
**定义**

```java
Object getValue()
```

**说明**

从快照中获得当前节点的数据。

**返回值**

`Object` 如果是叶子节点，返回String、Boolean、Number类型；如果是非叶子节点，将返回 `Map<String, Object>`。
</br>

---
### hasChild(key)
**定义**

```java
boolean hasChild(String key)
```

**说明**

判断在当前快照中，是否包含指定子节点。

**参数**


参数名 | 描述
--- | ---
key | `String` 子节点名称。

**返回值**

`boolean` true为包含，false为不包含。
</br>

---
### hasChildren()
**定义**

```java
boolean hasChildren()
```

**说明**

判断在当前快照中，是否存在子节点。

**返回值**

`boolean` true为存在子节点，false为不存在。
</br>

---