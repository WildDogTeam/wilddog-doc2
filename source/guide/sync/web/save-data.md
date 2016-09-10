title:  操作数据
---

本篇文档，主要介绍操作数据的方法。
 
以下四种方法可以写入数据：

方法 |  说明 
----|------
set() | 向某个节点写入数据。若此节点已存在数据，数据会被覆盖。 
push() | 向某个节点添加子节点。子节点的 key 由野狗自动生成并保证唯一，value 是你要写入的数据。
update() | 更新节点下指定 key 的值，而不影响其他数据。 
transaction() | 提供事务操作，用于并发更新操作的场景。 

## 写入数据

使用 `set()` 向某个节点写入数据。若节点已有数据，原有数据会被覆盖，包括其子节点的数据。

`set()` 可以传入数据类型有 `string`, `number`, `boolean`, `object`。

例如，存入 `Jone` 的 `name` 和 `age` ：

```js
// 初始化
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

// child() 用来定位到某个节点。
ref.child("Jone").set({
    "name": "Jone",
    "age": 23
});
```

`set()` 还有一个可选参数，此参数是一个回调函数，用来获取操作的结果：

```js
ref.child("Jone").set({
    "name": "Jone",
    "age": 23
}, function(error) {
    if (error == null){
        // 数据同步到野狗云端成功完成
    }
});
```

## 追加子节点

多个用户同时在一个节点下新增子节点时，如果子节点的 key 已存在，之前的数据会被覆盖，可以通过 `push()` 解决这个问题。

`push` 生成唯一 ID 作为 key ，它保证每条数据的 key 一定不同。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，将按时间先后标明。

使用 `push` 追加内容：

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

可以看到，每个数据都有一个唯一 ID 作为数据的 key 。

**获取唯一ID**

你可以通过调用 `key()` 来获取这个唯一 ID ：

```js
var newPostRef = postsRef.push({
  author: "gracehop",
  title: "Announcing COBOL, a New Programming Language"
});

// 获取 push() 生成的唯一 ID
var postID = newPostRef.key();
```

## 更新数据

如果想只更新指定子节点，而不影响其它的子节点，可以使用 `update()`方法:

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
如果用 `set()` 而不是 `update()`，那么 `date_of_birth` 和 `full_name` 都会被删除。

**多路径更新**

`update` 也支持多路径更新，即可以同时更新不同路径下的数据。用法上有些特殊，举例如下:

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

```js
// 初始化（同上）
······

// 同时更新 b 节点下的 d，和 x 节点下的 z
ref.update({
  "b/d": "updateD",
  "x/z": "updateZ"
});
```

可以看到，标识路径时，要用 `b/d`, 和 `x/z` ,而**不能**这样写：

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
以上相当于 `set()` 操作，会覆盖以前数据。

## 删除数据

删除数据最简单的方法是调用 `remove()`。

```
ref.set({
    "name": "Jone",
    "age": 23
});

//删除上面写入的数据
ref.remove();
```

此外，还可以通过写入 null 值（例如，`set(null)` 或 `update(null)`）来删除数据。 

**注意**：Wilddog 不会保存值为 null 节点。如果某节点的值被设为 null，云端就会把这个节点删除。

## 事务操作

处理可能因并发更新而损坏的数据（例如，增量计数器）时，可以使用事务操作。你可以为此操作提供更新函数和完成后的回调（可选）。

比如要实现一个记录点赞数量的功能，可能存在多人同时点赞的情况，就可以这样写一个事务：

```js
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
var upvotesRef = wilddog.sync().ref("/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.transaction(function (currentValue) {
  return (currentValue || 0) + 1;
});
```

我们使用 `currentValue || 0` 来判断计数器是否为空或者是自增加。 如果上面的代码没有使用事务, 那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

注意：`transaction()` 可能被多次被调用，必须处理 currentData 变量为 null 的情况。

当执行事务时，云端有数据存在，但是本地可能没有缓存，此时 currentData 为 null。

**事务操作原理**

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等。

如果相等，则更新数据为你提交的数据；如果不相等，则返回新的当前值。更新函数将使用新的当前值和你提交的数据重复尝试更新，直到成功为止。


更多使用，请参考 [transaction()](/api/sync/web.html#transaction)。


