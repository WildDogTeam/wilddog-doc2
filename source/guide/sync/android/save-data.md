
title:  数据操作
---

本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下七种方法：

| 方法               | 说明                                       |
| ---------------- | ---------------------------------------- |
| setValue()       | 向指定 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| setPriority()    | 设置节点优先级。     |                           
| setValue(value,priority)  |向指定节点写入数据并且设置该节点优先级。     |
| push()           | 向指定节点添加 [子节点](/guide/reference/term.html#子节点)。子节点的 [key](/guide/reference/term.html#key) 自动生成并保证唯一。 |
| removeValue()    | 删除指定节点。                                  |
| updateChildren() | 更新指定子节点。                                 |
| runTransaction() | 并发操作时保证数据一致性。                            |


## 写入数据

`setValue()` 方法用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

`setValue()` 方法可设置回调方法来获取操作的结果。


例如，向 `Jobs` 节点下写入 `full_name ` 、`gender `：


```java
    // 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://docs-examples.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    // 获取 SyncReference 实例
    SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/users");
    // 创建 Map 对象
    HashMap<String, Object> user = new HashMap<>();
    jone.put("full_name", "Steve Jobs");
    jone.put("gender", "male");
    // child() 用来定位到某个节点。
    ref.child("Jobs").setValue(jone);
```


设置回调方法：

```java
    ref.child("Jobs").setValue("user", new SyncReference.CompletionListener() {
        @Override
        public void onComplete(SyncError error, SyncReference ref) {
            if (error != null) {
                Log.d("error", error.toString());
            } else {
                Log.d("success", "setValue success");
            }
        }
    });
```

## 设置节点优先级

`setPriority(priority)` 方法用于设置节点的优先级。

Wilddog Sync 支持为每个节点设置优先级(priority)，用于实现节点按 [优先级排序](/guide/sync/android/retrieve-data.html#根据数据排序监听)。优先级是节点的隐藏属性，默认为 null。

例如，设置`user`节点的优先级为100：

```java
ref.child("user").setPriority(100);
```

更多使用，请参考 [setPriority()](/api/sync/android/api.html#setPriority)。

## 写入数据并设置节点优先级

`setValue(value,priority)` 方法用于向指定节点写入数据并且设置该节点优先级。

例如，写入 jack 的姓名并且设置优先级为100：

```java
WilddogSync.getInstance().getReference("full_name").setValue("Jack",100,new SyncReference.CompletionListener() {
    @Override
    public void onComplete(SyncError error, SyncReference ref) {
        if (error != null) {
            Log.d("error", error.toString());
        } else {
            Log.d("success", "setValue success");
        }
    }
});
```

## 追加子节点

`push()` 方法向任意节点添加子节点。新增子节点的 key 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。

例如，追加子节点到 `posts` 节点：

```java
SyncReference postsRef = ref.child("messages");
HashMap<String, Object> aNews = new HashMap<>();
aNews.put("full_name", "Steve Jobs");
aNews.put("message", "Think difference");
postsRef.push().setValue(aNews);
HashMap<String, Object> anotherNews = new HashMap<>();
anotherNews.put("full_name", "Bill Gates");
anotherNews.put("message", "Hello World");
postsRef.push().setValue(anotherNews);
```
产生的数据如下：
```json
{

  "messages": {
    "-JRHTHaIs-jNPLXO": {
        "full_name" : "Steve Jobs",
        "message" : "Think difference"
  	},

    "-JRHTHaKuITFIhnj": {
        "full_name" : "Bill Gates",
        "message" : "Hello World"
  	}
  }
}
```


## 更新数据

`updateChildValues()` 方法用于更新指定子节点。

`updateChildValues()` 方法支持多路径更新。可以只调用一次方法更新多个[路径](/guide/reference/term.html#路径-path)的数据。

例如，更新 `Jobs` 的个人信息：

```js
//原数据如下
{
    "Jobs": {
        "full_name" : "Steve Jobs",
        "gender" : "male"
    }
}
```

```java
// 只更新 gracehop 的 nickname
SyncReference hopperRef = ref.child("Jobs");
HashMap<String, Object> user = new HashMap<>();
user.put("full_name", "Tim Cook");
hopperRef.updateChildren(user);
```

**多路径更新**

例如，同时更新 b 节点下的 d 和 x 节点下的 z：

```json
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}
```

正确示例：

```java
HashMap<String, Object> map = new HashMap<>();
map.put("b/d", "updateD");
map.put("x/z", "updateZ");
ref.updateChildren(map);
```

错误示例：

```java
// 错误的多路径更新写法，会覆盖原有数据
Map<String,Map<String,String>> map = new HashMap<>();
Map<String,String> bMap = new HashMap<>();
Map<String,String> xMap = new HashMap<>();
map.put("b", bMap.put("d","updateD");
map.put("x", xMap.put("z","updateZ");
ref.updateChildren(map);
```


## 删除数据

`removeValue()` 方法用于删除指定节点。

```java
HashMap<String, Object> map = new HashMap<>();
map.put("full_name", "Steve Jobs");
map.put("gender", "male");
ref.setValue(map);

//删除上面写入的数据
ref.removeValue();
```

>**提示：**如果某个节点的 value 为 null ,云端会直接删除该节点。

## 事务处理

`runTransaction()` 方法用于并发操作时保证数据一致性。

例如，在实现多人点赞功能时，多人同时写入评分会产生覆盖，导致最终结果不准确。使用 `runTransaction()`方法可以避免这种情况：

```java
SyncReference upvotesRef = WilddogSync.getInstance().getReference("web/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");
upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }

        return Transaction.success(currentData); 
        // 也可以这样中止事务 Transaction.abort()
    }
    public void onComplete(SyncError error, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});
```

>**注意：** 回调方法的返回值可能为空，需要进行相应的处理。

更多使用，请参考 [runTransaction()](/api/sync/android/api.html#runTransaction-Transaction-Handler)。

























































