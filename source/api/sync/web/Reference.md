title: Reference
---

一个 SyncReference 实例表示要操作的特定数据节点，你可以通过它来读写数据。SyncReference 是 [wilddog.sync.Query](/api/sync/web/Query.html) 的子类。


## 方法

### child

##### 定义

`child(path)`

##### 说明

获得一个在当前节点下指定路径节点处的 `SyncReference` 实例。 根据相对路径 `path`，来获取当前节点下 `path` 子节点的引用。 相对路径可以是一个简单的节点路径（例如: `"fred"`），或者是一个更深的路径（例如: `"fred/name/first"`）。

##### 参数

| 参数名 | 说明                                       |
| ---- | ---------------------------------------- |
| path | String(non-null)类型<br> path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。 |

##### 返回值

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

##### 定义

`parent()`

##### 说明

获取当前节点的父节点引用。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果当前节点是根节点，返回的依然是根节点的引用。
</blockquote>

##### 返回值

[wilddog.sync.Reference](/api/sync/web/Reference.html)

##### 示例

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

##### 定义

`root()`

##### 说明

获取根节点的引用。使用此方法可以直接获取到当前子节点的根节点引用，等价于多次调用 `parent()` 方法获取根节点。

##### 返回值

[wilddog.sync.Reference](/api/sync/web/Reference.html)

---

### key

##### 定义

`key()`

##### 说明

获取当前节点的 key 值。

##### 返回值

String 节点 key 值

##### 示例


```js
var child_ref = wilddog.sync().ref().child("Beijing");
var key = child_ref.key();
//key == 'Bejing'
```
---

### toString

##### 定义

`toString()`

##### 说明

获取当前节点的的完整 URL 。

##### 返回值

String 当前节点的完整 URL 。

##### 示例

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

##### 定义

`set(value)`

##### 说明

向指定节点写入数据。此方法会先清空指定节点，再写入数据。
支持的数据类型：
 - Object、 Array、String、 Number、 Boolean 等基本数据类型;
`Wliddog Sync` 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```js
        var array = [];
        array[0] = "a";
        array[2] = "b";
        array[3] = "c";
        array[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(array);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为数组类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 JSON。
 - null 当 value 为 null 时，等价于当前节点的 `remove()` 操作，会删除当前节点。

##### 参数

| 参数名   | 说明 |
| ----- | ---------------------------------------- |
| value |Object<br>String<br>Number<br>Boolean<br>null<br> 如果`value != null` ，当前节点上的数据会被value覆盖，如果中间路径不存在， Wilddog 会自动将中间路径补全。如果`value == null`，效果等同于remove操作。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

##### 示例

```js
wilddog.sync().ref('city').set({"temp":10,"pm25":500})
    .then(function(){
        console.info('set data success.');
    })
    .catch(function(err){
        console.info('set data failed', err.code, err);
    });

```
---

### update

##### 定义

`update(value)`

##### 说明

对当前节点进行数据合并操作，更新当前节点下的数据。
与 `set()` 方法覆盖当前节点下所有数据的方式不同，使用 `update()` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。
`update` 支持多路径更新。需要同时向多个节点写入数据时，你应该优先考虑使用 `update` 而不是 [transaction](/api/sync/web/Reference.html#transaction)，具体使用方法参见下方示例。

##### 参数

| 参数名   | 说明          |
| ----- | ----------- |
| value | Object类型<br>包含要合并子节点的对象 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

##### 示例

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

##### 定义

`remove()`

##### 说明

删除当前节点，效果等同于 `set(null)`，如果父级节点只有当前节点一个子节点，会递归删除父级节点。

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

##### 示例

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

##### 定义

`push(value)`

##### 说明

向当前节点添加子节点。新增子节点的 key 自动生成并保证唯一（例如：-KdzI7I-AsBST9NlasJM）。
新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。

##### 参数

| 参数名   | 类型                                    | 属性       | 说明               |
| ----- | ------------------------------------- | -------- | ---------------- |
| value | Object<br>String<br>Number<br>Boolean | non-null | 你希望在当前节点下新增的数据。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[wilddog.sync.Reference](/api/sync/web/Reference.html)>

##### 示例

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

```js
//也可以同步获取新的reference
var newRef = wilddog.sync().ref("city").push('chengdu',function onComplete(err){
    if(err == null){
        //success
    }
})
var newKey = newRef.key()

```

---

### setWithPriority

##### 定义

`setWithPriority(value, priority)`

##### 说明
把数据写到当前位置，类似 [set](/api/sync/web/Reference.html#set)，不同之处是需要指定一个优先级。默认排序按照优先级排序（参考 [orderByPriority](/guide/sync/web/retrieve-data.html#排序规则)）。

##### 参数

| 参数名      | 说明                    |
| -------- | --------------------- |
| value    | Object<br>String<br>Number<br>Boolean<br>null<br>将被写入的值。               |
| priority | 优先级数据，节点的优先级是默认排序的依据。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

##### 示例

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

##### 定义

`setPriority(priority)`

##### 说明

设置当前节点的优先级，支持为每个节点设置优先级 (priority)，用于实现节点按优先级排序。优先级是节点的隐藏属性，默认为 `null。`
不能为不存在的节点设置优先级。因此，新增数据需要设置优先级时，请使用 `setValue(data, priority)`；为已存在的数据设置优先级的时，使用 `setPriority`。
节点按照如下优先级规则升序排列：null < Number < String。
- priority 为 null 的排最先；
- priority 为数值的次之，按照数值从小到大排序；
- priority 为字符串的排最后，按照字典序排列。
- 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序， `Key` 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。
</blockquote>

##### 参数

| 参数名    | 说明                    |
| -------- | --------------------- |
| priority | String<br>Number<br> 优先级数据，节点的优先级是默认排序的依据。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[Void](/api/sync/web/Void.html)>

##### 示例

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

##### 定义

`transaction(updateFunction)`

##### 说明

用于多客户端并发写入操作时保证数据一致性，可以避免并发修改当前节点时的数据冲突。
与 [set()](/api/sync/web/Reference.html#set) 直接覆盖以前的数据不同，在不同客户端并发修改时，`transaction()` 不会单纯覆盖节点数据。
客户端提交事务至服务器，如果数据已被其他客户端修改，那么服务器会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。
在 `transaction()` 的执行过程中客户端可能会重复写入直到成功，也可以在 `updateFunction` 中直接 `return;` 手动终止事务。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <p>- 相同的数据节点上并发执行 set() 和 transaction()，极端情况下仍会出现不可预料的结果。</p>
  <p>- 如果只是需要同时向多个节点写入数据，请优先考虑使用 [update](/api/sync/web/Reference.html#update) 的多路径更新特性。</p>
</blockquote>

##### 参数

| 参数名          | 说明    |
| -------------- |  ----- |
| updateFunction |  [updateFunction](/api/sync/web/Reference.html#updateFunction)(non-null)类型<br>更新函数。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[TransactionResult](/api/sync/web/Reference.html#TransactionResult) | [TransactionResult](/api/sync/web/Reference.html#TransactionResult)[]>

##### 示例


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

##### 定义

`function(currentValue)`

##### 说明

用于 [transaction](/api/sync/web/Reference.html#transaction) 的更新函数。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  只有当 `updateFunction` 返回的是一个包含多个节点的 Object 时，`transaction` 才会返回给 `Promise` 一个[TransactionResult](/api/sync/web/Reference.html#TransactionResult) 数组。
</blockquote>

##### 参数

| 参数名          | 说明                                       |
| ------------ | ---------------------------------------- |
| currentValue | function<br>Object<br>String<br>Number<br>Boolean<br>null<br>第一次调用时 `currentValue` 为 null，你应当返回一个默认值。当回调函数第二次调用时， `currentValue` 是云端的最新值。 |

##### 返回值

`newValue {Object|String|Number|Boolean|null}` 要写入当前节点的的新值。

当返回的是一个包含多个节点的 Object 时，`transaction` 会返回给 `Promise` 一个 [TransactionResult](/api/sync/web/Reference.html#TransactionResult) 数组。

---

### TransactionResult

##### 定义

{"committed": Boolean, "snapshot": [wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)}

##### 说明

执行 [transaction](/api/sync/web/Reference.html#transaction) 成功之后返回给 `Promise` 的结果，包含`committed` 和 `snapshot` 两个属性。
`committed`: 是否提交成功。
`snapshot`: 事务完成后的数据快照。

---

### onDisconnect

##### 定义

`onDisconnect()`

##### 说明

获取与当前数据节点关联的离线事件对象。

##### 返回值

[wilddog.sync.OnDisconnect](/api/sync/web/OnDisconnect.html)
