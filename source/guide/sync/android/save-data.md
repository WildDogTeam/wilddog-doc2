title:  操作数据
---

本篇文档介绍如何写入、更新、删除数据。

包含以下五种方法

| 方法            | 说明                                       |
| ------------- | ---------------------------------------- |
| setValue()         | 向某个节点写入数据。若此节点已存在数据，会覆盖原有数据。             |
| push()        | 向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。 |
| updateChildren()     | 更新指定子节点。|
| removeValue()      | 删除指定子节点。|
| runTransaction() | 数据并发操作时保证数据一致性。                         |  



## 写入数据

`setValue()` 方法向某个节点写入数据。若此节点已有数据，会覆盖原有数据，包括其子节点的数据。

`setValue()` 方法可以写入的数据类型有 `String`, `Number`, `boolean`, `Object`。

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

访问 [博客数据页面](https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop)，将会看到刚才写入的数据。

**注意**：`https://docs-examples.wilddogio.com` 是示例应用，数据为只读模式，主要用于野狗博客示例的数据展示。如果你想写入数据，可以将 `docs-examples` 替换成自己应用的 AppID。

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

`push()` 方法向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。 这个 key 基于时间戳和随机算法生成，它标明了时间的先后。

例如，追加子节点到 `posts` 节点

```java
SyncReference postsRef = ref.child("posts");
HashMap<String, Object> aNews = new HashMap<>();
aNews.put("author", "gracehop");
aNews.put("title", "Announcing COBOL, a New Programming Language");
postsRef.push(aNews);
HashMap<String, Object> anotherNews = new HashMap<>();
anotherNews.put("author", "alanisawesome");
anotherNews.put("title", "The Turing Machine");
postsRef.push(anotherNews);
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
如果用 `setValue()` 而不是 `updateChildren()`，那么 `date_of_birth` 和 `full_name` 都会被删除。

**多路径更新**

`updateChildren()` 方法也支持多路径更新，即同时更新不同路径下的数据。举例如下

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

希望同时更新 b 节点下的 d 和 x 节点下的 z。标识路径时，要用 `b/d`, 和 `x/z` 

```java
// 同时更新 b 节点下的 d，和 x 节点下的 z
HashMap<String, Object> map = new HashMap<>();
map.put("b/d", "updateD");
map.put("x/z", "updateZ");
ref.updateChildren(map);
```

而**不能**这样写

```java
// 错误的多路径更新写法！！
Map<String,Map<String,String>> map = new HashMap<>();
Map<String,String> bMap = new HashMap<>();
Map<String,String> xMap = new HashMap<>();
map.put("b", bMap.put("d","updateD");
map.put("x", xMap.put("z","updateZ");
ref.updateChildren(map);
```
该操作相当于 `setValue()` 方法，会覆盖原有数据。

## 删除数据

`removeValue()` 方法用于删除指定节点。

```
HashMap<String, Object> map = new HashMap<>();
map.put("name", "Jone");
map.put("age", "23");
ref.setValue(map);

//删除上面写入的数据
ref.removeValue();
```

此外，还可以通过写入 null 值（例如，`setValue(null)` 或 `updateChildren(null)`）来删除数据。 

**注意**：Sync 不会保存 value 为 null 的节点。如果某节点的 value 为 null，云端会删除这个节点。

## 事务操作

`runTransaction()` 方法用于数据并发操作时保证数据一致性。

例如，要实现一个记录点赞数量的功能，它可能存在多人同时点赞的情况。如果不用事务处理，那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

使用事务处理可以避免这种情况

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

**注意**：当云端有数据存在，本地还未缓存时，此时回调方法的变量为 null，所以要判断变量是否为空。

更多使用，请参考 [runTransaction()](/api/sync/android/api.html#runTransaction-Transaction-Handler)。

























































