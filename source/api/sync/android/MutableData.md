title:  MutableData
---

## 方法

### child(node)
**定义**

```java
MutableData child(String node)
```

**说明**

根据相对路径，来获取当前节点下子节点的快照。

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

用于对当前节点的即时子节点进行迭代。

**返回值**

`Iterator<MutableData>`当前节点的即时子节点。
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

获取当前节点的名称。

**返回值**

`String` 节点名称 。
</br>

---
### getParent()
**定义**

```java
MutableData getParent()
```

**说明**

获取一个节点的父节点数据，如果本身就是最顶端的节点，返回null。

**返回值**

`MutableData` 。
</br>

---
### getValue()
**定义**

```java
Object getValue()
```

**说明**

获得当前节点的数据。

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

判断是否包含指定子节点。

**参数**

参数名 | 描述
--- | ---
key | `String`  子节点名称。

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
### setPriority(priority)
**定义**

```java
void setPriority(Object priority)
```

**说明**

设置当前节点的优先级。

**参数**

参数名 | 描述
--- | ---
priority | `Object`。

</br>

---
### setValue(value)
**定义**

```java
void setValue(Object value)
```

**说明**

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

参数名 | 描述
--- | ---
value | `Object`。

</br>

---