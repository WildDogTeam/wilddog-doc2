
title:  操作数据
---

本篇文档介绍如何写入、更新、删除数据。

包含以下五种方法

| 方法            | 说明                                       |
| ------------- | ---------------------------------------- |
| set()         | 向某个节点写入数据。若此节点已存在数据，会覆盖原有数据。             |
| push()        | 向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。 |
| update()      | 更新指定子节点。|
| remove()      | 删除指定子节点。|
| transaction() | 数据并发操作时保证数据一致性。                            |

## 写入数据

`set()` 方法向某个节点写入数据。若此节点已有数据，会覆盖原有数据，包括其子节点的数据。

`set()` 方法可以写入的数据类型有 `string`, `number`, `boolean`, `object`。

例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`

```js
// 初始化
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/web/saving-data/wildblog/users");

// child() 用来定位到某个节点。
ref.child("gracehop").set({
    "date_of_birth": "December 9, 1906",
    "full_name": "Grace Hopper",
    "nickname": "Amazing Grace"
});
```
访问 [博客数据页面](https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop)，将会看到刚才写入的数据。

<div class='notice'>**注意**：`https://docs-examples.wilddogio.com` 是示例应用，数据为只读模式，主要用于野狗博客示例的数据展示。如果你想写入数据，可以将 `docs-examples` 替换成自己应用的 AppID。</div>

`set()` 方法还有一个可选参数，此参数是一个回调方法，用来获取操作的结果

```js
ref.child("gracehop").set({
    "date_of_birth": "December 9, 1906",
    "full_name": "Grace Hopper",
    "nickname": "Amazing Grace"
}, function(error) {
    if (error == null){
        // 数据同步到野狗云端成功完成
    }
});
```

## 追加子节点

`push()` 方法向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。 这个 key 基于时间戳和随机算法生成，它标明了时间的先后。

例如，追加子节点到 `posts` 节点

```js
  var postsRef = ref.child("posts");

  postsRef.push({
    author: "gracehop",
    title: "Announcing COBOL, a New Programming Language"
  });

  postsRef.push({
    author: "alanisawesome",
    title: "The Turing Machine"
  });
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

你可以通过调用 `key()` 方法来获取这个唯一 ID 

```js
var newPostRef = postsRef.push({
  author: "gracehop",
  title: "Announcing COBOL, a New Programming Language"
});

// 获取 push() 生成的唯一 ID
var postID = newPostRef.key();
```

## 更新数据

`update()` 方法用于更新指定子节点，而不影响其他节点。

```js
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}
```
```js
// 只更新 gracehop 的 nickname
var hopperRef = ref.child("gracehop");
hopperRef.update({
  "nickname": "Amazing grace"
});
```
如果用 `set()` 方法而不是 `update()`方法，会删除 `date_of_birth` 和 `full_name`。

**多路径更新**

`update()` 方法也支持多路径更新，即同时更新不同路径下的数据。举例如下

```js
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

```js

ref.update({
  "b/d": "updateD",
  "x/z": "updateZ"
});
```

而**不能**这样写

```js
// 错误的多路径更新写法！！
ref.update({
    "b": {
        "d": "updateD"
    },
    "x": {
        "z": "updateZ"
    }
});
```
该操作相当于 `set()` 方法，会覆盖原有数据。

## 删除数据

`remove()` 方法用于删除指定节点。

```
ref.set({
    "name": "Jone",
    "age": 23
});

//删除上面写入的数据
ref.remove();
```

此外，还可以通过写入 null 值（例如，`set(null)` 或 `update(null)`）来删除数据。 

**注意**：Sync 不会保存 value 为 null 的节点。如果某节点的 value 为 null，云端会删除这个节点。

## 事务处理

`transaction()` 方法用于数据并发操作时保证数据一致性。

例如，要实现一个记录点赞数量的功能，它可能存在多人同时点赞的情况。如果不用事务处理，那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

使用事务处理可以避免这种情况


```js
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
var upvotesRef = wilddog.sync().ref("/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.transaction(function (currentValue) {
  return (currentValue || 0) + 1;   // 判断计数器是否为空或者是自增加
});
```

**注意**：当云端有数据存在，本地还未缓存时，此时回调方法的变量为 null，所以要判断变量是否为空。

更多使用，请参考 [transaction()](/api/sync/web.html#transaction)。


