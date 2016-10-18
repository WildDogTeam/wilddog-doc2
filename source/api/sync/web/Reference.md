title: Reference
---

一个 Reference 实例表示要操作的特定数据节点，你可以通过它来读写数据。Reference 是 [wilddog.sync.Query](/api/sync/web/Query.html) 的子类。

---

## 方法

### child

根据相对路径，来获取当前节点下子节点的引用

**定义**

child ( path )

**参数**

| 参数名 | 说明                                       |
| ---- | ---------------------------------------- |
| path | string(non-null)类型<br> path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。 |

**返回**

[wilddog.sync.Reference](/api/sync/web/Reference.html)

```js
var config = {
  authDomain: "<appId>.wilddog.com",
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("city");
// ref 指向 <appId>.wilddogio.com/city

var childRef = wilddog.sync().ref("city").child("Beijing");
// childRef 指向 <appId>.wilddogio.com/city/Beijing
```
---

### parent

获取父节点的引用。如果当前节点就是root节点，方法执行后返回的依然是root节点的引用。

**定义**

parent()

**返回**

[wilddog.sync.Reference](/api/sync/web/Reference.html)

**示例**

```js
var config = {
  authDomain: "<appId>.wilddog.com",
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("city");
// ref 指向 <appId>.wilddogio.com/city

var childRef = wilddog.sync().ref("city").child("Beijing");
// childRef 指向 <appId>.wilddogio.com/city/Beijing

var parentRef = childRef.parent();
// parentRef 指向 <appId>.wilddogio.com/city
```
---

### root

获得根结点的引用。

**定义**

root()

**返回**

[wilddog.sync.Reference](/api/sync/web/Reference.html)

---

### key

获得当前路径下节点的名称。

**定义**

key()

**返回**

string 节点名称

**示例**


```js
var child_ref = wilddog.sync().ref().child("Beijing");
var key = child_ref.key();
//key == 'Bejing'
```
---

### toString

获取当前节点的的完整URL。

**定义**

toString()

**返回**

string 当前节点的完整URL。

**示例**

```js
var config = {
  authDomain: "<appId>.wilddog.com",
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("city");
var url = ref.toString();
// url == 'https://<appId>.wilddogio.com/city'
```
---

### set

设置一个节点的值。

**定义**

set(value)

**参数**

| 参数名   | 说明 |
| ----- | ---------------------------------------- |
| value |object<br>string<br>number<br>boolean<br>null<br> 如果`value != null` ,当前节点上的数据会被value覆盖，如果中间路径不存在,Wilddog 会自动将中间路径补全。如果`value == null`,效果等同于remove操作。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

**示例**

```js
wilddog.sync().ref('city').set({"temp":10,"pm25":500})
    .then(function(){
        console.info('set data success.')
    })
    .catch(function(err){
        console.info('set data failed', err.code, err);
    });

```
---

### update

将输入对象的子节点合并到当前数据中。不存在的子节点将会被新增，存在子节点将会被替换。
与`set`操作不同,`update` 不会直接覆盖原来的节点,而是将`value` 中的所有子节点插入到已有的节点中,如果已有的节点中已经有同名子节点,则覆盖原有的子节点。
e.g. update之前 `{"l1":"on","l3":"off"}` ,`value={"l1":"off","l2":"on"}` update 后期望的数据是 `{"l1":"off","l2":"on","l3":"off"}`。

**重要** update 支持多路径更新。需要同时向多个节点写入数据时，你应该优先考虑使用 update 而不是 [transaction](/api/sync/web/Reference.html#transaction)，具体使用方法参见下方示例。

**定义**

update(value)

**参数**

| 参数名   | 说明          |
| ----- | ----------- |
| value | object类型<br>包含要合并子节点的对象 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

**示例**

```js
// 普通更新
wilddog.sync().ref('city').update({"temp":20,"pm25":5000})
    .then(function(){
        console.info('update data success.')
    })
    .catch(function(err){
        console.info('update data failed', err.code, err);
    });

//多路径更新
wilddog.sync().ref('/yourPath').update({
         "users/john": {"name": "john", "group": "a"},
         "groups/a/john": true
    })
    .then(function(){
        console.info('update data success.')
    })
    .catch(function(err){
        console.info('update data failed', err.code, err);
    });
// 在上面的例子中我们同时更新了两个节点，这是一个原子操作
```
---

### remove

删除当前节点,效果等同于 `set(null)`，如果父级节点只有当前节点一个子节点, 会递归删除父级节点。

**定义**

remove()

**参数**

_无_

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

**示例**

```js
wilddog.sync().ref('city').remove()
    .then(function(){
        console.info('remove node success.')
    })
    .catch(function(err){
        console.info('remove node failed', err.code, err);
    });
```
---

### push

在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成，可作为排序使用。

**定义**

push(value)

**参数**

| 参数名   | 类型                                    | 属性       | 说明               |
| ----- | ------------------------------------- | -------- | ---------------- |
| value | object<br>string<br>number<br>boolean | non-null | 用户希望在当前节点下新增的数据。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[wilddog.sync.Reference](/api/sync/web/Reference.html)>

**示例**

```js
wilddog.sync().ref("city").push('chengdu')
    .then(function(newRef){
       // newRef 的地址类似下面：
       // https://<appId>.wilddogio.com/city/-JmRhjbYk73IFRZ7
       console.info(newRef.toString());
    })
    .catch(function(err){
       console.info('remove node failed', err.code, err);
    });

```
---

### setWithPriority

把数据写到当前位置，类似 [set](/api/sync/web/Reference.html#set)，不同之处是需要指定一个优先级。默认排序按照优先级排序（参考 [orderByPriority](/guide/sync/web/retrieve-data.html#排序规则)）。

**定义**

setWithPriority (value, priority)

**参数**

| 参数名      | 说明                    |
| -------- | --------------------- |
| value    | object<br>string<br>number<br>boolean<br>null<br>将被写入的值。               |
| priority | 优先级数据，节点的优先级是默认排序的依据。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

**示例**

```js
var user = {
  name: {
    first: 'jack',
    last: 'Lee'
  }
};
wilddog.sync().ref().setWithPriority(user,100)
    .then(function(){
        console.info('set data success.')
    })
    .catch(function(err){
        console.info('set data failed', err.code, err);
    });

```
---

### setPriority

设置当前节点的优先级，优先级可以是`Number`，也可以是`String` 。用来改当前节点在兄弟节点中的排序位置。这个排序会影响Snapshot.forEach()的顺序，同样也会影响`child_added`和`child_moved`事件中`prevChildName`参数。

**节点按照如下规则排序**

* 没有priority的排最先
* 有数字 priority的次之，按照数值排序
* 有字符串 priority的排最后，按照字母表的顺序排列
* 当两个子节点有相同的 priority，它们按照名字进行排列，数字排在最先，字符串排最后

**定义**

setPriority(priority)

**参数**

| 参数名    | 说明                    |
| -------- | --------------------- |
| priority | string<br>number<br> 优先级数据，节点的优先级是默认排序的依据。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

**示例**

```js
wilddog.sync().ref('user').setWithPriority(100)
    .then(function(){
        console.info('set priority success.')
    })
    .catch(function(err){
        console.info('set priority failed', err.code, err);
    });
```

---

### transaction

当多个客户端并发修改同一节点的数据时，使用 [set](/api/sync/web/Reference.html#set) 极有可能造成数据不一致，而 transaction 能够避免这一情况的发生。

为了达到这个目的， 你必须通过 transaction 的更新函数来进行数据修改操作。更新函数接收一个` current value` 作为参数，并在此参数的基础之上为当前节点返回新的值 `new value`。多个客户端同时调用 transaction 修改同一节点的数据时，更新函数能够保证后续 transaction 拿到的 `current value` 中的数据与最近成功的 `transaction` 所返回的 `new value` 中的数据一致。

在 transaction 的执行过程中你的客户端可能会重复写入直到成功，当更新函数没有返回 value 时，事务终止。

如果需要， 你的 onComplete callback 将在事务完成后异步被调用。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>相同的数据节点上并发执行 set() 和 transaction()，极端情况下仍会出现不可预料的结果。</li>
    <li>如果只是需要同时向多个节点写入数据，请优先考虑使用 [update](/api/sync/web/Reference.html#update) 的多路径更新特性。</li>
  </ul>
</blockquote>

**定义**

transaction(updateFunction)

**参数**

| 参数名          | 说明    |
| -------------- |  ----- |
| updateFunction |  [updateFunction](/api/sync/web/Reference.html#updateFunction)(non-null)类型<br>更新函数。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[TransactionResult](/api/sync/web/Reference.html#TransactionResult) | [TransactionResult](/api/sync/web/Reference.html#TransactionResult)[]>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有当 updateFunction 返回的是一个包含多个节点的 object 时，transaction 才会返回给 Promise 一个 [TransactionResult](/api/sync/web/Reference.html#TransactionResult) 数组。
</blockquote>

**示例**


```js
// 实现一个累加器
wilddog.sync().ref("/users/john/rank").transaction(function(currentRank) {
    // If currentRank = null, 直接返回默认值 0。
    if (currentRank == null) {
         return 0;
    } else if (currentRank >  1000) {
        return; // 大于1000, 退出事务 transaction, 直接return;
    }
    return currentRank+1;
});
//
//
// 创建一个名叫 wilma 的用户， 如果 'wilma' 已经存在，那退出事务
var wilmaRef = wilddog.sync().ref("/users/wilma");
wilmaRef.transaction(function(currentData) {
  if (currentData === null) {
    return { name: { first: 'Wilma', last: 'Flintstone' } };
  } else {
    console.log('wilma is exist.');
    return; // 退出事务
  }
}).then(function(result) {
  if (!result.committed) {
    console.log('transaction commit failed ,wilma has been exist.');
  } else {
    console.log('transaction commit success!');
  }
  console.log("Wilma's data: ", result.snapshot.val());
}).catch(function(err){
    console.log('transaction failed.', error);
});
```

---

### updateFunction

用于 [transaction](/api/sync/web/Reference.html#transaction) 的更新函数。

**定义**

 function(currentValue)

**参数**

| 参数名          | 说明                                       |
| ------------ | ---------------------------------------- |
| currentValue | function类型<br>object<br>string<br>number<br>boolean<br>null<br>第一次调用时 currentValue 为null，你应当返回一个默认值。当回调函数第二次调用时， currentValue 是云端的最新值。 |

**返回**

newValue {object|string|number|boolean|null} 要写入当前节点的的新值。

当返回的是一个包含多个节点的 object 时，transaction 会返回给 Promise 一个 [TransactionResult](/api/sync/web/Reference.html#TransactionResult) 数组。

---

### TransactionResult

执行 [transaction](/api/sync/web/Reference.html#transaction) 成功之后返回给 Promise 的结果，包含`committed` 和 `snapshot` 两个属性。

{committed: boolean}

是否提交成功。

{snapshot: [wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)}

事务完成后的数据快照。

---

### onDisconnect

获取与当前数据节点关联的离线事件对象。

**定义**

onDisconnect

**返回**

[wilddog.sync.OnDisconnect](/api/sync/web/OnDisconnect.html)

---