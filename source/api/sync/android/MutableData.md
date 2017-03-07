title:  MutableData
---
是当前指定节点下的数据快照，与 `DataSnapshot` 不同，`MutableData` 当前节点数据可以改变。
用于在事务中对节点数据进行线程安全的数据修改。
`MutableData` 实例修改数据时会检查当前节点数据是否被修改过，如果数据已经被修改，则获取新值后再次进行坚持，直至通过检查后，更新当前节点数据。
## 方法

### hasChild(key)
**定义**

```java
boolean hasChild(String key)
```

**说明**

判断是否存在某个指定的子节点的数据快照。如果指定节点快照的数据不为空返回 true。

**参数**

参数名 | 描述
--- | ---
key | `String`  子节点名称。

**返回值**

`boolean` 当前数据快照包含指定的子节点的数据快照返回 true，否则返回 false。
</br>

---
### hasChildren()
**定义**

```java
boolean hasChildren()
```

**说明**

判断当前 `MutableData` 实例中是否存在子节点。
可以使用 `hasChildren()` 方法来确定当前的数据快照是否含有子节点，进而决定是否调用 `getChildren()` 方法获取迭代器遍历数据。

**返回值**

`boolean` 当前数据快照存在子节点返回true，否则返回 false。
</br>

---


### child(node)
**定义**

```java
MutableData child(String node)
```

**说明**

根据相对路径，来获取当前节点下子节点的数据快照。相对路径可以是一个字节点的 key 值（如："Beijing"），也可以是更深层次的路径（如："Beijing/pm25"）。
如果相对路径下并没有数据，则返回 null 。

**参数**


参数名 | 描述
--- | ---
node | `String`  子节点名称。

**返回值**

`MutableData` 对象。
</br>

---
### getChildren()
**定义**

```java
Iterator<MutableData> getChildren()
```

**说明**

获取当前数据快照中所有子节点的迭代器。

**返回值**

`Iterator<MutableData>` 数据快照子节点迭代器。
</br>

---
### getChildrenCount()
**定义**

```java
long getChildrenCount()
```

**说明**

获取子节点的数量。

**返回值**

`long` 子节点数量 。
</br>

---
### getParent()
**定义**

```java
MutableData getParent()
```

**说明**

获取一个节点的父节点数据，如果本身就是最顶端的节点，返回 null。
已过时，不建议使用此方法。

**返回值**

`MutableData` 。
</br>

---
### getKey()
**定义**

```java
String getKey()
```

**说明**

获取当前数据快照所属节点的 key。

**返回值**

`String` 数据快照节点的 key 值。
</br>

---

### getValue()
**定义**

```java
Object getValue()
```

**说明**

返回当前数据快照包含的数据。
返回的数据类型取决于节点下的数据内容。

**返回值**

`Object` 当前数据快照包含的数据。可能返回的数据类型包括：null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体，null 表示该节点的数据快照为空。
</br>

---

### setValue(value)
**定义**

```java
void setValue(Object value)
```

**说明**

给当前节点赋值。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

参数名 | 描述
--- | ---
value | `value` 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 `value` 为 null 时，会删除当前节点。

</br>

---

### setPriority(priority)
**定义**

```java
void setPriority(Object priority)
```

**说明**

设置当前数据快照所属节点的 priority 值。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

参数名 | 描述
--- | ---
priority | `Object` 类型，指定节点的优先级，优先级类型可以为 Number、String 或 null。

</br>

---
