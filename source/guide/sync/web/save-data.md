
title:  数据操作
---

本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下五种方法

| 方法            | 说明                                       |
| ------------- | ---------------------------------------- |
| set()         | 向指定 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| push()        | 向指定节点添加 [子节点](/guide/reference/term.html#子节点)。子节点的 [key](/guide/reference/term.html#key) 由 Wilddog Sync 自动生成并保证唯一。 |  
| update()      | 更新指定子节点。                                 |
| remove()      | 删除指定节点。                                  |
| transaction() | 并发操作时保证数据一致性。                            |

## 写入数据

`set() ` 方法用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

`set() ` 方法可设置回调方法来获取操作的结果。

例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`

```js
// 初始化
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
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
设置回调方法
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

`push()` 方法向指定节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照添加时间进行排序。

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

## 更新数据

`update()` 方法用于更新指定子节点。

`update()` 方法支持多 路径更新。可以只调用一次方法更新多个[路径](/guide/reference/term.html#路径-path)的数据。

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

多路径更新

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
希望同时更新 b 节点下的 d 和 x 节点下的 z。注意标识路径时，要用 `b/d`, 和 `x/z` 

```js

ref.update({
  "b/d": "updateD",
  "x/z": "updateZ"
});
```

以下做法将会覆盖原有数据，为错误示例

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

>**提示：**设置节点的 value 为 null 等同于 `remove()` 方法。

## 事务处理

`transaction()` 方法用于并发操作时保证数据一致性。

例如，使用 `transaction()` 方法实现多人点赞功能，可以避免多个客户端同时更新时，导致的最终数据不一致。

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

>**注意：**回调方法的返回值可能为空，需要进行相应的处理。

更多使用，请参考 [transaction()](/api/sync/web/api.html#transaction)。


