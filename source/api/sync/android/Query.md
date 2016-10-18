title:  Query
---

## 方法

### addChildEventListener(listener)
**定义**

```java
void addChildEventListener(ChildEventListener listener)
```

**说明**

为子节点绑定监听事件，监听该子节点数据的变化。用户需要实现ValueEventListener接口。

**参数**


参数名 | 描述
--- | ---
listener | `ChildEventListener`
           `onChildAdded()` 监听子节点的添加事件。
           `onChildRemoved()` 监听子节点的删除事件。
           `onChildChanged()` 监听子节点的变化事件。

**返回值**

`ChildEventListener` 返回监听事件的引用，可用于删除此事件。

**示例**

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
### addListenerForSingleValueEvent(listener)
**定义**

```java
void addListenerForSingleValueEvent(ValueEventListener listener)
```

**说明**

为当前节点单次数据获取绑定监听事件，此监听器只被触发一次，以获取当前节点下的所有数据。

**参数**


参数名 | 描述
--- | ---
listener | `ValueEventListener` 节点绑定的监听事件。

</br>

---
### addValueEventListener(listener)
**定义**

```java
void addValueEventListener(ValueEventListener listener)
```

**说明**

为当前节点绑定监听事件，监听该节点数据的变化。用户需要实现ValueEventListener接口。

**参数**


参数名 | 描述
--- | ---
listener | `ValueEventListener` listener将监听Change事件。

**返回值**

`ValueEventListener` 返回监听事件的引用，可用于删除此事件。

**示例**

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
### removeEventListener(valueListener)
**定义**

```java
void removeEventListener(ValueEventListener valueListener)
```

**说明**

删除已绑定的监听事件。

**参数**


参数名 | 描述
--- | ---
listener | `ValueEventListener` 要删除的监听事件
</br>

---
### removeEventListener(childEventListener)
**定义**

```java
void removeEventListener(ChildEventListener childEventListener)
```

**说明**

删除已绑定的监听事件。

**参数**


参数名 | 描述
--- | ---
listener | `ChildEventListener` 要删除的监听事件
</br>

---
### orderByChild(childKey)
**定义**

```java
Query orderByChild(String childKey)
```

**说明**

使用指定的子节点的值进行排序。

**参数**

参数名 | 描述
--- | ---
childKey | `String` 子节点属性

**返回值**

`Query` 查询器类。
</br>

---
### orderByKey()

**定义**

```java
Query orderByKey()
```

**说明**

使用子节点的key进行排序。

**返回值**

Query 查询器类
</br>

---
### orderByValue()

**定义**

```java
Query orderByValue()
```

**说明**

使用子节点的值进行排序。

**返回值**

`Query` 查询器类。
</br>

---
### orderByPriority()

**定义**

```java
Query orderByPriority()
```

**说明**

根据子节点的优先级进行排序。

**返回值**

`Query` 查询器类。

</br>

---
### startAt()

**定义**

```java
Object startAt(String value), Object startAt(double value), Object startAt(boolean value)
```

**说明**

创建一个大于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object startAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

**参数**

参数名 | 描述
--- | ---
value | `String` ,`double`, `boolean`。

**返回值**

`Query` 查询器类。
</br>

---
### endAt()

**定义**

```java
Object endAt(String value), Object endAt(double value), Object endAt(boolean value)
```

**说明**

创建一个小于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object endAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

**参数**

参数名 | 描述
--- | ---
value | `String` ,`double`, `boolean`。

**返回值**

`Query` 查询器类。
</br>

---
### equalTo()
**定义**

```java
Object equalTo(String value)，Object equalTo(double value)，Object equalTo(boolean value)
```

**说明**

创建一个等于的精确查询。

**参数**

参数名 | 描述
--- | ---
value | `String` ,`double`, `boolean`。

**返回值**

`Query` 查询器类。
</br>

---
### limitToFirst(count)
**定义**

```java
Query limitToFirst(int count)
```

**说明**

创建一个limit查询。从第一条开始获取指定数量的数据。

**参数**

参数名 | 描述
--- | ---
count | `int` 数量。

**返回值**

`Query` 查询器类。
</br>

---
### limitToLast(count)
**定义**

```java
Query limitToLast(int count)
```

**说明**

创建一个limit查询。从最后一条开始获取指定数量的数据。

**参数**

参数名 | 描述
--- | ---
count | `int` 数量。

**返回值**

`Query` 查询器类。
</br>

---
### getRef()
**定义**

```java
SyncReference getRef()
```

**说明**

获得当前的引用。

**返回值**

`SyncReference` 节点引用。
</br>

---