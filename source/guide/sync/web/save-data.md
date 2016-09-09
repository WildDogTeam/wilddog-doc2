title:  操作数据
---

以下四种方法可以写入数据：

方法 |  说明 
----|------
set() | 将数据写入到指定的路径。如果指定路径已存在数据，那么数据将会被覆盖。 
push() | 添加数据到列表。向指定路径下添加数据，由野狗自动生成唯一key。例如向 /posts 路径下 push 数据，数据会写入到/posts/<unique-post-id>下。
update() | 更新指定路径下的部分key的值，而不替换所有数据。 
transaction() | 提供事务性更新，用于并发更新操作的场景。 

## 写入数据

`set()` 是最基本的写数据操作，它会将数据写入当前引用指向的节点。该节点如果已有数据，任何原有数据都将被删除和覆盖，包括其子节点的数据。
`set()` 可以传入几种数据类型 `string`, `number`, `boolean`, `object` 做为参数。
例如，社交博客应用可以使用 `set()` 添加用户信息，如你想给 `Jone` 添加个人信息：

```js
// 初始化
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

ref.child("Jone").set({
    username: name,
    email: email
});
```

野狗采用的是一个“本地处理，云端同步”的架构。本地拥有数据副本。对数据的写入操作，首先写入本地副本，然后SDK去将数据与云端进行同步。
也就是说，当 `set()` 方法返回的时候，数据可能还没有同步到云端。
若要确保同步到云端完成，需要使用 `set()` 方法的第二个参数，该参数是一个回调函数，代码示例如下：

```js
// 初始化
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

// 向 "Jone" 节点下写数据
ref.child("Jone").set({
    username: name,
    email: email
}, function(error) {
    if (error == null){
        // 数据同步到野狗云端成功完成
    }
});
```

## 更新数据

如果只更新指定子节点，而不覆盖其它的子节点，可以使用 update() 方法:

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

这样会更新 gracehop 的 nickname 字段。如果我们用 `set()` 而不是 `update()`，那么 date_of_birth 和 full_name 都会被删除。
`update` 也支持多路径更新，即同时更新不同路径下的数据且不影响其他数据，但用法上有些特殊，举例如下:
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
可以看到，标识路径的时候，这里必须要用 `b/d`, 和 `x/z` ,而**不能**这样写：
```js
// 错误的多路径更新写法！！！
ref.update({
    "b": {
        "d": "updateD"
    },
    "x": {
        "z": "updateZ"
    }
});
```
这样相当于 `set()` 操作，会把之前的数据覆盖掉。

## 追加新节点

当多个用户同时试图在一个节点下新增一个子节点的时候，这时，数据就会被重写覆盖。
为了解决这个问题，Wilddog `push()` 采用了生成唯一ID 作为key的方式。通过这种方式，多个用户同时在一个节点下面push 数据，他们的 key 一定是不同的。这个 key 是通过一个基于时间戳和随机算法生成的，即使在一毫秒内也不会相同，并且表明了时间的先后，Wilddog 采用了足够多的位数保证唯一性。

用户可以用 `push` 向博客 app 中写新内容：


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

产生的数据都有一个唯一ID:
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

**获取唯一ID**
调用push会返回一个引用，这个引用指向新增数据所在的节点。你可以通过调用 `key()` 来获取这个唯一ID

```js
 // 通过push()来获得一个新的数据库地址
var newPostRef = postsRef.push({
	author: "gracehop",
	title: "Announcing COBOL, a New Programming Language"
});

// 获取push()生成的唯一ID
var postID = newPostRef.key();

```
## 删除数据
删除数据最简单的方法是在引用上对这些数据所处的位置调用 `remove()`。

此外，还可以通过将 null 指定为另一个写入操作（例如，`set()` 或 `update()`）的值来删除数据。 您可以结合使用此方法与 `update()`，在单一 API 调用中来删除多个子节点。

**注意**：Wilddog 不会保存空路径，即如果 /a/b/c 节点下的值被设为 null，这条路径下又没其他的含有非空值的子节点存在，那么云端就会把这条路径删除。

## 事务操作
处理可能因并发修改而损坏的数据（例如，增量计数器）时，可以使用事务处理操作。你可以为此操作提供更新函数和完成后的回调（可选）。

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等，如果相等，则更新数据为你提交的数据，如果不相等，则返回新的当前值，更新函数使用新的当前值和你提交的数据重复尝试更新，直到成功为止。

举例说明，如果我们想在一个的博文上计算点赞的数量，可以这样写一个事务：
```js
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.transaction(function (currentValue) {
  return (currentValue || 0) + 1;
});
```
我们使用 `currentValue || 0` 来判断计数器是否为空或者是自增加。 如果上面的代码没有使用事务, 当两个客户端在同时试图累加，那结果可能是为数字 1 而非数字 2。

注意：`transaction()` 可能被多次被调用，必须处理 currentData 变量为 null 的情况。 当执行事务时，云端有数据存在，但是本地可能没有缓存，此时 currentData 为 null。
更多使用参见 [transaction()](/api/sync/web.html#transaction)。


