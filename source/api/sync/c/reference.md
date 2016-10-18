
title:  操作实例
---

Wilddog Sync 实例操作。

## 方法

### wilddog_initWithUrl

**定义**

```c
Wilddog_T wilddog_initWithUrl(Wilddog_Str_T *url)
```

**说明**

初始化应用 URL 对应的 Wilddog Sync 实例，和云端建立连接。

**参数**

| 参数名 | 说明 |
|---|---|
| url | `Wilddog_Str_T ` 指针类型。指向应用 URL 地址的指针。 |

**返回值**

成功返回 Wilddog Sync 实例，否则返回 0。

**示例**

```c
int main(){
    //初始化实例，<appId> 为你的应用 ID，路径为/user/jackxy/device/light/10abcde
    Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy/device/light/10abcde");
    //do something
    ...
    //销毁实例
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_destroy

**定义**

```c
Wilddog_Return_T wilddog_destroy(Wilddog_T *p_wilddog)
```

**说明**

销毁一个 Wilddog Sync 对象并回收内存。

**参数**

| 参数名 | 说明 |
|---|---|
| p_wilddog | `Wilddog_T ` 指针类型。指向当前路径对应 Wilddog Sync 实例的指针。 |

**返回值**

成功返回 0，否则返回对应的 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
int main(){
    //初始化实例，<appId> 为你的应用 ID，路径为/user/jackxy/device/light/10abcde
    Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy/device/light/10abcde");
    //do something
    ...
    //销毁实例
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_getParent

**定义**

```c
Wilddog_T wilddog_getParent(Wilddog_T wilddog)
```

**说明**

获取当前路径的父路径的 Wilddog Sync 实例。如果当前路径是根路径，获取失败，返回0。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |

**返回值**

成功返回当前路径的父路径的 Wilddog Sync 实例，否则返回 0。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取 /user 的 Wilddog Sync 实例
Wilddog_T parent = wilddog_getParent(wilddog);
```

</br>

---

### wilddog_getRoot

**定义**

```c
Wilddog_T wilddog_getRoot(Wilddog_T wilddog)
```

**说明**

获取当前路径对应的根路径的 Wilddog Sync 实例。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |

**返回值**

成功返回根路径的 Wilddog Sync 实例，否则返回 0。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取根路径的 Wilddog Sync 实例
Wilddog_T root = wilddog_getRoot(wilddog);
```

</br>

---

### wilddog_getChild

**定义**

```c
Wilddog_T wilddog_getChild(Wilddog_T wilddog, Wilddog_Str_T *childName)
```

**说明**

创建当前路径下 `childName` 路径的 Wilddog Sync 实例。注意：`childName` 可能在云端并不存在。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| childName | `Wilddog_Str_T` 指针类型。相对子路径，多级需用'/'隔开，即使不存在也能创建。|

**返回值**

成功返回子路径的 Wilddog Sync 实例，否则返回 0。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取 /user/jacxy/aaa 的 Wilddog Sync 实例
Wilddog_T child = wilddog_getChild(wilddog, "aaa");
```

</br>

---

### wilddog_getKey

**定义**

```c
Wilddog_Str_T *wilddog_getKey(Wilddog_T wilddog)
```

**说明**

获取当前路径的 key。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |

**返回值**

成功返回当前路径的 key，否则返回 NULL。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取Key值（即jackxy）
Wilddog_Str_T *key = wilddog_getKey(wilddog);
```

</br>

---

### wilddog_getHost

**定义**

```c
Wilddog_Str_T *wilddog_getHost(Wilddog_T wilddog)
```

**说明**

获取当前路径的 host。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |

**返回值**

成功返回当前路径的 host，否则返回 NULL。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取 host 值（即 "<appId>.wilddogio.com"）
Wilddog_Str_T *host = wilddog_getHost(wilddog);
```

</br>

---

### wilddog_getPath

**定义**

```c
Wilddog_Str_T *wilddog_getPath(Wilddog_T wilddog)
```

**说明**

获取当前路径的 path。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |

**返回值**

成功返回当前路径的 path，否则返回 NULL。

**示例**

```c
//获取 /user/jackxy 的 Wilddog Sync 实例
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");
//获取 path 值（即 "/user/jackxy" ）
Wilddog_Str_T *path = wilddog_getPath(wilddog);
```
