
title:  数据操作
---

本篇文档介绍如何操作数据，分为写入，更新和删除数据。

操作数据包含以下五种方法

| 方法               | 说明                                       |
| ---------------- | ---------------------------------------- |
| setValue()       | 向任意 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| push()           | 向任意节点添加 [子节点](/guide/reference/term.html#子节点)。子节点的 [key](/guide/reference/term.html#key) 由 Wilddog Sync 自动生成并保证唯一。 |
| updateChildren() | 更新指定子节点。                                 |
| removeValue()    | 删除指定节点。                                  |
| runTransaction() | 并发操作时保证数据一致性。                            |


## 写入数据

`setValue()` 方法用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

`setValue()` 方法可设置回调方法来获取操作的结果。


例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`


```java
    // 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://docs-examples.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    // 获取 SyncReference 实例
    SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/users");
    // 创建 Map 对象
    HashMap<String, Object> jone = new HashMap<>();
    jone.put("date_of_birth", "December 9, 1906");
    jone.put("full_name", "Grace Hopper");
    jone.put("nickname", "Amazing Grace");
    // child() 用来定位到某个节点。
    ref.child("gracehop").setValue(jone);
```


设置回调方法

```java
    ref.child("Jone").setValue("jone", new SyncReference.CompletionListener() {
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

`push()` 方法向任意节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。

例如，追加子节点到 `posts` 节点

```java
SyncReference postsRef = ref.child("posts");
HashMap<String, Object> aNews = new HashMap<>();
aNews.put("author", "gracehop");
aNews.put("title", "Announcing COBOL, a New Programming Language");
postsRef.push().setValue(aNews);
HashMap<String, Object> anotherNews = new HashMap<>();
anotherNews.put("author", "alanisawesome");
anotherNews.put("title", "The Turing Machine");
postsRef.push().setValue(anotherNews);
```
产生的数据如下
```json
{

  "posts": {
    "-JRHTHaIs-jNPLXO": {
      "author": "gracehop",
      "title": "Announcing COBOL, a New Programming Language"
    },

    "-JRHTHaKuITFIhnj": {
      "author": "alanisawesome",
      "title": "The Turing Machine"
    }
  }
}
```


## 更新数据

`updateChildValues()` 方法用于更新指定子节点。

`updateChildValues()` 方法支持多路径更新。可以只调用一次方法更新多个路径的数据。

```json
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}
```

```java
// 只更新 gracehop 的 nickname
SyncReference hopperRef = ref.child("gracehop");
HashMap<String, Object> user = new HashMap<>();
user.put("nickname", "Amazing grace");
hopperRef.updateChildren(user);
```




**多路径更新**


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

希望同时更新 b 节点下的 d 和 x 节点下的 z。注意标识路径时，要用 `b/d`, 和 `x/z` 

```java
// 同时更新 b 节点下的 d，和 x 节点下的 z
HashMap<String, Object> map = new HashMap<>();
map.put("b/d", "updateD");
map.put("x/z", "updateZ");
ref.updateChildren(map);
```

以下做法将会覆盖原有数据，为错误示例

```java
// 错误的多路径更新写法！！
Map<String,Map<String,String>> map = new HashMap<>();
Map<String,String> bMap = new HashMap<>();
Map<String,String> xMap = new HashMap<>();
map.put("b", bMap.put("d","updateD");
map.put("x", xMap.put("z","updateZ");
ref.updateChildren(map);
```
以上操作相当于 `setValue()` 方法，会覆盖原有数据。

## 删除数据

`removeValue()` 方法用于删除指定节点。

```java
HashMap<String, Object> map = new HashMap<>();
map.put("name", "Jone");
map.put("age", "23");
ref.setValue(map);

//删除上面写入的数据
ref.removeValue();
```



>**提示：**如果某个节点的 value 为 null ,云端会直接删除该节点。

## 事务操作

`runTransaction()` 方法用于并发操作时保证数据一致性。

例如，使用 `runTransaction()` 方法实现多人点赞功能，可以避免多个客户端同时更新时，导致的最终数据不一致。

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

























































