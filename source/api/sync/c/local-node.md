
title: 节点操作
---

创建和操作 `Wilddog_Node_T` 类型节点数据的方法。

## 方法

### wilddog_node_createObject

**定义**

```c
Wilddog_Node_T * wilddog_node_createObject(Wilddog_Str_T *key)
```

**说明**

创建一个 Object 类型的节点。Object 类型的节点即非叶子节点（有子节点的节点）。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_node = wilddog_node_createObject((Wilddog_Str_T *)"123");
```

</br>

---

### wilddog_node_createUString

**定义**

```c
Wilddog_Node_T * wilddog_node_createUString(Wilddog_Str_T *key, Wilddog_Str_T *value)
```

**说明**

创建一个字符串类型节点。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |
| value | `Wilddog_Str_T` 指针类型。指向节点的 value 的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_node = wilddog_node_createUString((Wilddog_Str_T *)"this is key",(Wilddog_Str_T *)"this is value");
```

</br>

---

### wilddog_node_createBString

**定义**

```c
Wilddog_Node_T * wilddog_node_createBString(Wilddog_Str_T *key, unsigned char *value, int len)
```

**说明**

创建一个二进制数组类型节点。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |
| value | `unsigned char` 指针类型。指向节点的 value 的指针。 |
| len | `int` 类型。value 的长度（字节数）。|

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
u8 data[8] = {0};
Wilddog_Node_T *p_node = wilddog_node_createBString((Wilddog_Str_T *)"this is key", data, 8);
```

</br>

---

### wilddog_node_createFloat

**定义**

```c
Wilddog_Node_T * wilddog_node_createFloat(Wilddog_Str_T *key, wFloat num)
```

**说明**

创建一个浮点类型节点。8 位机器为 4 字节, 其他位机器为 8 字节。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |
| num | `wFloat` 类型浮点数据。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
wFloat data = 1.234;
Wilddog_Node_T *p_node = wilddog_node_createFloat((Wilddog_Str_T *)"this is key", data);
```

</br>

---

### wilddog_node_createNum

**定义**

```c
Wilddog_Node_T * wilddog_node_createNum(Wilddog_Str_T *key, s32 num)
```

**说明**

创建一个整数类型节点，只支持 32 位整型。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |
| num | `s32` 类型。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
s32 data = 1;
Wilddog_Node_T *p_node = wilddog_node_createNum((Wilddog_Str_T *)"this is key", data);
```

</br>

---

### wilddog_node_createNull

**定义**

```c
Wilddog_Node_T * wilddog_node_createNull(Wilddog_Str_T *key)
```

**说明**

创建一个 Null 类型节点，对应到 JSON 中即其值为 `null` 。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_node = wilddog_node_createNull((Wilddog_Str_T *)"this is key");
```

</br>

---

### wilddog_node_createTrue

**定义**

```c
Wilddog_Node_T * wilddog_node_createTrue(Wilddog_Str_T *key)
```

**说明**

创建一个 True 类型节点，对应到 JSON 中即其值为 `true` 。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_node = wilddog_node_createTrue((Wilddog_Str_T *)"this is key");
```

</br>

---

### wilddog_node_createFalse

**定义**

```c
Wilddog_Node_T * wilddog_node_createFalse(Wilddog_Str_T *key)
```

**说明**

创建一个 False 类型节点，对应到 JSON 中即其值为 `false` 。

**参数**

| 参数名 | 说明 |
|---|---|
| key | `Wilddog_Str_T` 指针类型。指向节点的 key 的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_node = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
```

</br>

---

###  wilddog_node_addChild

**定义**

```c
Wilddog_Return_T wilddog_node_addChild(Wilddog_Node_T *parent, Wilddog_Node_T *child)
```

**说明**

向一个节点添加子节点，成功后，child 节点成为父节点 parent 的子节点。parent 节点可以通过`parent->p_wn_child`或者`parent->p_wn_child->p_wn_next`（可能有多次`p_wn_next`，由 parent 节点的组成决定）的链表顺序查找方式找到 child 节点。

**参数**

| 参数名 | 说明 |
|---|---|
| parent | `Wilddog_Node_T` 指针类型。指向父节点的指针，如果父节点不是 Object 类型，会自动转换为 Object 类型，原有的值会丢失。 |
| child | `Wilddog_Node_T` 指针类型。指向要添加的子节点的指针。 |

**返回值**

成功返回指向创建的节点的指针，否则返回 NULL。

**示例**

```c
//构建节点 {"123":{"this is key": false}}
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);
```

</br>

---

###  wilddog_node_delete

**定义**

```c
Wilddog_Return_T wilddog_node_delete( Wilddog_Node_T *head)
```

**说明**

删除节点及其所有子节点。

**参数**

| 参数名 | 说明 |
|---|---|
| head | `Wilddog_Node_T` 指针类型。指向要删除节点的指针。 |

**返回值**

成功返回 0，否则返回[错误码](/api/sync/c/error-code.html)。

**示例**

```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

wilddog_node_delete(p_father); //会将 p_father 和子节点 p_child 全部删除
```

</br>

---

###  wilddog_node_clone

**定义**

```c
Wilddog_Node_T * wilddog_node_clone( Wilddog_Node_T *head)
```

**说明**

拷贝当前节点及其下所有子节点。

**参数**

| 参数名 | 说明 |
|---|---|
| head | `Wilddog_Node_T` 指针类型。指向要拷贝节点的指针。 |

**返回值**

成功返回当前节点副本的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

//复制一个副本，需要单独调用 wilddog_node_delete 释放
Wilddog_Node_T *p_clone = wilddog_node_clone(p_father); 
```

</br>

---

###  wilddog_node_find

**定义**

```c
Wilddog_Node_T *wilddog_node_find( Wilddog_Node_T *root, char *path)
```

**说明**

从 `root` 节点中查找相对子路径下的节点。

**参数**

| 参数名 | 说明 |
|---|---|
| root | `Wilddog_Node_T` 指针类型。指向 `root` 节点的指针。 |
| path |  `char` 指针类型。指向相对子路径的指针。|

**返回值**

成功返回查找到的节点的指针，否则返回 NULL。

**示例**

```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

//p_find和p_child是同一个节点
Wilddog_Node_T *p_find = wilddog_node_find(p_father, "this is key"); 
```

</br>

---

###  wilddog_node_getValue

**定义**

```c
Wilddog_Str_T* wilddog_node_getValue(Wilddog_Node_T *node, int *len)
```

**说明**

获取 `node` 节点的 value。其中，值为 true，false，null 的节点无法通过这种方式获取，而应该直接根据节点的 `d_wn_type` 得出其类型。

**参数**

| 参数名 | 说明 |
|---|---|
| root | `Wilddog_Node_T` 指针类型。指向 `root` 节点的指针。 |
| len |  `int` 指针类型。输出参数，指向该节点 value 长度指针。|

**返回值**

成功返回指向节点 value 的指针，否则返回 NULL。

**示例**

```c
int len = 0;
s32 value;
Wilddog_Node_T *p_child = wilddog_node_createNum((Wilddog_Str_T *)"this is key",234);
//len 应和sizeof(s32)相同
Wilddog_Str_T *p_data = wilddog_node_getValue(p_father, &len); 
value = (s32)(*p_data);
```

</br>

---

###  wilddog_node_setValue

**定义**

```c
Wilddog_Return_T (Wilddog_Node_T *node, unsigned char *value, int len)
```

**说明**

设置 `node` 节点的 value。其中，值为 true，false，null 的节点无法通过这种方式设置。整数类型和浮点类型的节点，len 应该为 `sizeof(s32)` 和 `sizeof(wFloat)`。

**参数**

| 参数名 | 说明 |
|---|---|
| root | `Wilddog_Node_T` 指针类型。指向 `root` 节点的指针。 |
| value | `unsigned char` 类型。指向新 value 值的指针。|
| len |  `int` 类型。新 value 长度。|

**返回值**

成功返回 0，否则返回 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
int len = sizeof(s32);
s32 value = 456;
Wilddog_Node_T *p_child = wilddog_node_createNum((Wilddog_Str_T *)"this is key",234);
wilddog_node_setValue(p_father, &value, len);
```
