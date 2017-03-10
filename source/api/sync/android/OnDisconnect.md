title:  OnDisconnect
---
离线事件是云端与客户端断开连接时自动触发的事件。
断开连接包括客户端主动断开连接，或者意外的网络中断;触发事件即执行特定的数据操作，事件支持离线写入，更新和删除数据。

## 方法

### setValue(value)

##### 定义

```java
void setValue(Object value)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后写入数据，此操作会先清空指定节点再写入新的数据。详细使用请参考：[setValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。

支持的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 ArrayList 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
  value | value 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
</br>

---

### setValue(value, listener)

##### 定义

```java
void setValue(Object value, SyncReference.CompletionListener listener)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后写入数据，并设置操作完成监听。详细使用请参考：[setValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。
此操作会先清空指定节点再写入新的数据。
离线事件设置完成后将触发 listener 的 `onComplete()` 方法。

value 支持的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 ArrayList 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
  value | value 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
listener | [CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型，`setValue()` 操作完成回调。
</br>

---

### setValue(value, priority)

##### 定义

```java
void setValue(Object value, Object priority)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后写入数据和 [数据优先级](/api/sync/android/SyncReference.html#setPriority)，此操作会先清空指定节点再写入新的数据。详细使用请参考：[setValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。

value 支持的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 ArrayList 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
  value |value 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
priority |`Object` 指定节点的优先级，类型可以为 Boolean、Number 或 String。
</br>

---
### setValue(value, priority, listener)

##### 定义

```java
void setValue(Object value, Object priority, SyncReference.CompletionListener listener)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后写入数据和 [数据优先级](/api/sync/android/SyncReference.html#setPriority)，并设置操作完成监听。详细使用请参考：[setValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。
此操作会先清空指定节点再写入新的数据。
离线事件设置完成后将触发 listener 的 `onComplete()` 方法。

value 支持的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 ArrayList 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
  value |value 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
priority |`Object` 指定节点的优先级，类型可以为 Boolean、Number 或 String。
listener |[CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型，`setValue()` 操作完成回调。
</br>

---

### updateChildren(children)

##### 定义

```java
void updateChildren(Map children)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后更新指定子节点。详细使用请参考：[updateChildren() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。


##### 参数

 参数名 | 说明
 --- | ---
  value |`Map<String，Object>` 当 children 为 null 时，等价于 `removeValue()` 操作。


</br>

---

### updateChildren(children, listener)

##### 定义

```java
void updateChildren(Map children, SyncReference.CompletionListener listener)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后更新指定子节点，并设置操作完成监听。详细使用请参考：[updateChildren() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。

##### 参数
 参数名 | 说明
 --- | ---
  value |`Map<String，Object>` 当 value 为 null 时，等价于 `removeValue()` 操作。
listener | [CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型，`updateChildren()` 操作完成回调。


</br>

---


### removeValue()

##### 定义

```java
void removeValue()
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后移除当前节点的数据。详细使用请参考：[removeValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。
`onDisconnect` 实例设置的离线操作只会触发一次。
如需每次离线时都执行 `removeValue()` 方法，则需要 监听连接状态，在连接建立成功后都通过 `removeValue()` 设置想要执行的删除操作。


</br>

---

### removeValue(listener)

##### 定义

```java
void removeValue(SyncReference.CompletionListener listener)
```

##### 说明

当客户端断开连接（例如：主动断开，本地的网络问题等）后移除当前节点的数据，并设置操作完成监听。详细使用请参考：[removeValue() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。
`onDisconnect` 实例设置的离线操作只会触发一次。
如需每次离线时都执行 `removeValue()` 方法，则需要 监听连接状态，在连接建立成功后都通过 `removeValue()` 设置想要执行的删除操作。

##### 参数
 参数名 | 说明
 --- | ---
listener | [CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型，`removeValue()` 操作完成回调。
</br>

---


### cancel()

##### 定义

```java
void cancel()
```

##### 说明

取消所有未生效的离线事件。详细使用请参考：[cancel() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。

</br>

---


### cancel(listener)

##### 定义

```java
void cancel(SyncReference.CompletionListener listener)
```

##### 说明

取消所有未生效的离线事件。详细使用请参考：[cancel() 完整指南](../../../guide/sync/android/offline-capabilities.html#离线事件)。

##### 参数

 参数名 | 说明
 --- | ---
listener |[CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。`cancel()` 操作完成回调。
</br>

