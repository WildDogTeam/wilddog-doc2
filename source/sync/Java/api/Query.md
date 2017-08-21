title:  Query
---

查询指定路径和指定条件下的数据。

## 属性

### getRef()
##### 定义

```java
SyncReference getRef()
```

##### 说明

获取当前 `Query` 实例所在路径下的 `SyncReference` 实例。

##### 返回值

[SyncReference](/sync/java/api/SyncReference.html) 节点引用。
</br>

---

## 方法

### addChildEventListener(listener)
##### 定义

```java
ChildEventListener addChildEventListener(ChildEventListener listener)
```

##### 说明

监听 Wilddog Sync 云端数据的主要方式之一，用于监听当前节点下子节点的数据。详细使用请参考：[addChildEventListener() 完整指南](../../../sync/java/guide/retrieve-data.html#设置监听)。
当监听到当前节点的初始数据或当前节点的数据改变时，将会触发相应事件，每次返回一个子节点的数据。

##### 参数


参数名 | 说明
--- | ---
listener | [ChildEventListener](/sync/java/api/ChildEventListener.html) 类型，实现了此接口的类可以接收当前节点下的事件。
          

##### 返回值

[ChildEventListener](/sync/java/api/ChildEventListener.html) 实例，可使用 `removeEventListener(ChildEventListener)` 方法移除监听。

##### 示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

ChildEventListener listener = ref.addChildEventListener(new ChildEventListener() {
  public void onChildAdded(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
        // DataSnapshot to json string
        try {
          JSONObject json = new JSONObject();
          json.put(dataSnapshot.getKey(), new JSONObject(dataSnapshot.getValue()));
          System.out.println(json.toString());
    } catch (JSONException e) {
          e.printStackTrace();
    }

  }

  public void onChildChanged(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
  }

  public void onChildRemoved(DataSnapshot snapshot) {
    System.out.println(snapshot.getValue());
  }

  public void onChildMoved(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
  }

  public void onCancelled(SyncError error) {
    if(error != null){
      System.out.println(error.getCode());
    }
  }
});
```
</br>

---
### addValueEventListener(listener)
##### 定义

```java
void addValueEventListener(ValueEventListener listener)
```

##### 说明

监听 Wilddog Sync 云端数据的主要方式之一，用于监听当前节点所有节点的数据。详细使用请参考：[addValueEventListener() 完整指南](../../../sync/java/guide/retrieve-data.html#设置监听)。
当监听到当前节点的初始数据或当前节点的数据改变时，将会触发 `onDataChange()` 回调方法，返回当前节点下的所有数据。

##### 参数


参数名 | 说明
--- | ---
listener | [ValueEventListener](/sync/java/api/ValueEventListener.html) 类型，为当前节点绑定的监听事件。

##### 返回值

[ValueEventListener](/sync/java/api/ValueEventListener.html) 实例，可使用 `removeEventListener(ValueEventListener)` 方法移除监听。

##### 示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
ValueEventListener listener = ref.addValueEventListener(new ValueEventListener(){
     public void onDataChange(DataSnapshot snapshot) {
          System.out.println(snapshot.getValue());
          // DataSnapshot to json string
          try {
          JSONObject json = new JSONObject();
          json.put(dataSnapshot.getKey(), new JSONObject(dataSnapshot.getValue()));
          System.out.println(json.toString());
      } catch (JSONException e) {
          e.printStackTrace();
     }
     }

     public void onCancelled(SyncError error) {
          if(error != null){
               System.out.println(error.getCode());
          }
  }
});

```

</br>

---
### addListenerForSingleValueEvent(listener)
##### 定义

```java
void addListenerForSingleValueEvent(ValueEventListener listener)
```

##### 说明
监听 Wilddog Sync 云端数据的主要方式之一，用于获取当前节点下的所有数据。详细使用请参考：[addListenerForSingleValueEvent() 完整指南](../../../sync/java/guide/retrieve-data.html#设置监听)。
同 `addValueEventListener()` 类似，不同之处在于 `addListenerForSingleValueEvent()` 中的回调方法只被触发一次，之后会自动取消监听。

##### 参数


参数名 | 说明
--- | ---
listener | [ValueEventListener](/sync/java/api/ValueEventListener.html) 类型，为当前节点绑定的监听事件。

</br>

---
### removeEventListener(childEventListener)
##### 定义

```java
void removeEventListener(ChildEventListener childEventListener)
```

##### 说明

移除监听事件。移除使用 `addChildEventListener` 方法设置的数据监听。详细使用请参考：[removeEventListener() 完整指南](../../../sync/java/guide/retrieve-data.html#移除监听)。

##### 参数


参数名 | 说明
--- | ---
listener | [ChildEventListener](/sync/java/api/ChildEventListener.html) 类型，要移除的监听事件。
</br>

---

### removeEventListener(valueListener)
##### 定义

```java
void removeEventListener(ValueEventListener valueListener)
```

##### 说明

移除监听事件。移除使用 `addValueEventListener` 方法设置的数据监听。详细使用请参考：[removeEventListener() 完整指南](../../../sync/java/guide/retrieve-data.html#移除监听)。


##### 参数


参数名 | 说明
--- | ---
listener |  [ValueEventListener](/sync/java/api/ValueEventListener.html) 类型，要移除的监听事件。
</br>

---

### orderByKey()

##### 定义

```java
Query orderByKey()
```

##### 说明

创建一个新的 `Query` 实例，按子节点的 key 对结果以字典序进行排序。详细使用请参考：[orderByKey() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据排序监听)。
此方法可以与 `startAt()`、`endAt()` 或 `equalTo()` 方法联合使用。

##### 返回值

`Query` 查询器类实例。
</br>

---
### orderByValue()

##### 定义

```java
Query orderByValue()
```

##### 说明

创建一个新的 `Query` 实例，按子节点的 value 值对结果排序。详细使用请参考：[orderByValue() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据排序监听)。
此方法可以与 `startAt()`、`endAt()` 或 `equalTo()` 方法联合使用。

##### 返回值

`Query` 查询器类实例。
</br>

---
### orderByChild(childKey)
##### 定义

```java
Query orderByChild(String childKey)
```

##### 说明

创建一个新的 `Query` 实例，按子节点下指定 key 对应的 value 对结果进行排序。详细使用请参考：[orderByChild() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据排序监听)。
此方法可以与 `startAt()`、`endAt()` 或 `equalTo()` 方法联合使用。

##### 参数

参数名 | 说明
--- | ---
childKey | String 用来排序的子节点的 key。

##### 返回值

`Query` 查询器类实例。
</br>

---
### orderByPriority()

##### 定义

```java
Query orderByPriority()
```

##### 说明

创建一个新的 `Query` 实例，按节点的 priority 对结果排序。详细使用请参考：[orderByPriority() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据排序监听)。
节点按照如下优先级规则升序排列：null < Number < String。
排序规则：
 - priority 为 null 的排最先；
 - priority 为数值的次之，按照数值从小到大排序；
 - priority 为字符串的排最后，按照字典序排列；
 - 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。
</blockquote>
此方法可以与 `startAt()`、`endAt()` 或 `equalTo()` 方法联合使用。

##### 返回值

`Query` 查询器类实例。

</br>

---
### startAt(value)

##### 定义

```java
Query startAt(startValue value)
```

##### 说明
创建一个新的 `Query` 实例，可以查询所有大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[startAt() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  对于使用 `startAt(String value)` 进行查询时，查询方式是通过将字符进行 unicode 编码后进行排序。
</blockquote>

##### 参数

参数名 | 说明
--- | ---
value | 查询返回值的下界，所有返回值均大于等于 startValue。value 的类型 可以为 String、Double 或 boolean。

##### 返回值

`Query` 查询器类实例。
</br>

---

### startAt(startValue, key)

##### 定义

```java
Query startAt(Object startValue, String childKey)
```

##### 说明
创建一个新的 `Query` 实例，可以查询所有大于或等于指定的 value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[startAt() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。 
当查询到的 value 与 startValue 相等时，则只保留 key 大于等于 childKey 的节点。
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。
该方法可用于分页。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  对于使用 `startAt(String value, String childKey)` 进行查询时，查询方式是通过将字符进行 unicode 编码后进行排序。
</blockquote>

##### 参数

参数名 | 说明
--- | ---
value | 查询返回值的下界，所有返回值均大于等于 startValue。value 的类型可以为 String、Double 或 Boolean。
childKey | 当查询到的值和 startValue 相等时，返回其中 key 大于等于 childKey 的节点。

##### 返回值

`Query` 查询器类实例。
</br>

---
### endAt(endValue)

##### 定义

```java
Query endAt(Object endValue)
```

##### 说明

创建一个新的 `Query` 实例，可以查询所有小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[endAt() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。  
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。

##### 参数

参数名 | 说明
--- | ---
value | 查询返回值的上界，所有返回值均小于等于 endValue。endValue 的类型可以为 String、Double 或 Boolean。

##### 返回值

`Query` 查询器类实例。
</br>

---

### endAt(endValue, childKey)

##### 定义

```java
Query endAt(Object endValue, String childKey)
```

##### 说明

创建一个新的 `Query` 实例，可以查询所有小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[endAt() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。 
当查询到的 value 与 endValue 相等时，则只保留 key 小于等于 childKey 的节点
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。

##### 参数

参数名 | 说明
--- | ---
value | 查询返回值的上界，所有返回值均小于等于 endValue。endValue 的类型可以为 String、Double 或 Boolean。
childKey | 当查询到的值和 endValue 相等时，返回其中 key 小于等于 childKey 的节点。

##### 返回值

`Query` 查询器类实例。
</br>

---
### equalTo(value)
##### 定义

```java
Object equalTo(Object value)
```

##### 说明

创建一个新的 `Query` 实例，用于精确查询指定 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[equalTo() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。

##### 参数

参数名 | 说明
--- | ---
value | 查询节点的指定 value。

##### 返回值

`Query` 查询器类实例。
</br>

---

### equalTo(value, childKey)
##### 定义

```java
Object equalTo(Object value, String childKey)
```

##### 说明

创建一个新的 `Query` 实例，用于精确查询指定 key、value 或 priority 等于 value 并且节点 key 等于 childKey 的节点，具体取决于所选的排序方法。详细使用请参考：[equalTo() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。
由于 childKey 是唯一的，查询最多返回一个节点。
此方法应与 `orderByPriority()`、`orderByKey()`、`orderByValue()` 或 `orderByChild()` 方法联合使用。

##### 参数

参数名 | 说明
--- | ---
value | 指定查询节点的 value。
childKey | 指定查询节点的 childKey。

##### 返回值

`Query` 查询器类实例。
</br>

---
### limitToFirst(limit)
##### 定义

```java
Query limitToFirst(int limit)
```

##### 说明

创建一个新的 `Query` 实例，获取当前排序下从第一个节点开始的最多 (limit) 条数据。详细使用请参考：[limitToFirst() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。

##### 参数

参数名 | 说明
--- | ---
count | 能够获取的子节点的最大数量。

##### 返回值

`Query` 查询器类实例。
</br>

---
### limitToLast(count)
##### 定义

```java
Query limitToLast(int limit)
```

##### 说明

创建一个新的 `Query` 实例，获取当前排序下，从最后一个节点开始向前的最多 (limit) 条数据。详细使用请参考：[limitToFirst() 完整指南](../../../sync/java/guide/retrieve-data.html#根据数据筛选结果监听)。

##### 参数

参数名 | 说明
--- | ---
count | 能够获取的子节点的最大数量。

##### 返回值

`Query` 查询器类实例。
</br>


