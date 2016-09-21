title:  操作数据
---

本篇文档介绍如何操作数据，分为写入，更新和删除数据。

操作数据包含以下五种方法

| 方法            | 说明                                       |
| ------------- | ---------------------------------------- |
| setValue()       | 向任意节点写入数据。若此节点已存在数据，会覆盖原有数据。             |
| push()        | 向任意节点添加子节点。子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 |
| updateChildren()      | 更新指定子节点。|
| removeValue()     | 删除指定节点。|
| runTransaction() | 并发操作时保证数据一致性。                            |


## 写入数据

`setValue() ` 方法用于向任意节点写入数据。若此节点已有数据，会覆盖原有（包括其子节点）的数据。


例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`


```java
    // 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://docs-examples.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    // 获取 SyncReference 实例
    SyncReference ref = WilddogSync.getInstance().getReference(web/saving-data/wildblog/users);
    // 创建 Map 对象
    HashMap<String, Object> jone = new HashMap<>();
    jone.put("date_of_birth", "December 9, 1906");
    jone.put("full_name", "Grace Hopper");
    jone.put("nickname", "Amazing Grace");
    // child() 用来定位到某个节点。
    ref.child("gracehop").setValue(jone);
```


`setValue()` 方法可以写入的数据类型有 `String`, `Number`, `boolean`, `Object`。


`setValue()` 方法还有一个可选参数，此参数是一个回调方法，用来获取操作的结果

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
产生的数据如下：
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
你可以通过调用 `getKey()` 方法来获取这个唯一 ID 


```java
HashMap<String, Object> news = new HashMap<>();
news.put("author", "gracehop");
news.put("title", "Announcing COBOL, a New Programming Language");
SyncReference newPostsRef = postsRef.push().setValue(news);
// 获取 push() 生成的唯一 ID
String postID = newPostRef.getKey();
```

## 更新数据

`updateChildren()` 方法用于更新指定子节点，而不影响其他节点。

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

与 `setValue()` 方法对比：如果此处用`setValue()` 而不是 `updateChildren()`方法，则会删除 `date_of_birth` 和 `full_name`。


**多路径更新**

`updateChildren()` 方法也支持多路径更新，即同时更新不同路径下的数据。例如

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

而**不能**写成

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

此外，还可以通过写入 null 值（例如，`setValue(null)` 或 `updateChildren(null)`）来删除数据。 

>**注意：**：如果某个节点的 value 为 null ,云端会直接删除该节点。

## 事务操作

`runTransaction()` 方法用于并发操作时保证数据一致性。

例如，要实现一个记录点赞数量的功能，它可能存在多人同时点赞的情况。如果不用事务处理，那么两个客户端呈现的最终数据可能不一致。

使用事务处理能避免这种情况

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

>**注意：** 当云端有数据存在，本地还未缓存时，此时回调方法的变量为 null，所以要判断变量是否为空。

更多使用，请参考 [runTransaction()](/api/sync/android/api.html#runTransaction-Transaction-Handler)。

























































