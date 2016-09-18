title:  Web API 文档
---
野狗 Sync 模块的 API 按照 Promise 风格设计，如果你对 Promise 编程尚不了解，请 [参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的教程。

---

## wilddog.App

App 对象是野狗 Web SDK 的核心，它维护着应用的全局上下文数据，不同模块之间需要通过它来进行交互。同时 App 实例也是我们访问野狗各个功能模块的入口，所以初始化 App 实例是我们使用其他任何 API 接口的前提。
要使用野狗实时数据同步服务，你的初始化参数中必须包含 `syncURL`， 代码如下：

```js
var config = {
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
    
```

初始化多个 App 实例：

```js
//上面的代码相当于如下初始化动作
var wilddog = wilddog.initializeApp(config,DEFAULT);
//我们还可以使用不同配置声明多个不同的 App 实例
var configA = {
  synURL: "https://<appId-a>.wilddogio.com"
};
var a = wilddog.initializeApp(configA, APP_A);
//通过 a 来访问 sync
//a.sync().update().then(...)
```

---

### auth

获取 wilddog.Auth 实例，wilddog.Auth 实例只能通过此方法获取。

**定义**

auth()

**参数**

_无_

**返回**

[wilddog.Auth](/api/auth/web/api.html#wilddog-Auth)

---

### sync

获取 wilddog.Sync 实例，wilddog.Sync 实例只能通过此方法获取。

**定义**

sync()

**参数**

_无_

**返回**

[wilddog.Sync](/api/sync/web/api.html#wilddog-Sync)

---

## wilddog.Sync

Sync 对象的实例是我们访问野狗实时数据同步 Web SDK 的入口。我们不能直接初始化 Sync 实例，而必须要通过 wilddog.App 实例的 [sync](/api/sync/web/api.html#sync) 方法来获取它。

---

### ServerValue

_constant static_

{TIMESTAMP: non-null Object}

TIMESTAMP 是一个用于在我们的数据中插入服务器当前时间的占位符，时间格式为自 [Unix epoch](https://en.wikipedia.org/wiki/Unix_time) 开始的的毫秒数。

**示例**

```js
var sessionsRef = wilddog.sync().ref("sessions");
var mySessionRef = sessionsRef.push();
mySessionRef.onDisconnect().update({ 
    endedAt: wilddog.sync().ServerValue.TIMESTAMP
});
mySessionRef.update({ 
    startedAt: wilddog.sync().ServerValue.TIMESTAMP 
});
```
---

### ref

获取指向 `path` 的 [wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference) 对象实例。

**定义**

ref(path)

**参数** 

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| path | string | nullable | path 相对 App 初始化参数 `syncURL` 而言的相对路径 |

**返回**

[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)

**示例**

```js
var config = {
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var rootRef = wilddog.sync().ref();
var refToA = wilddog.sync().ref('/a');

```
---

### goOffline

手动断开连接，关闭自动重连。

**定义**

Wilddog.goOffline()

**参数**

_无_

**返回**

[Void](/api/sync/web/api.html#Void)

---

### goOnline

手动建立连接，开启自动重连。

**定义**

goOnline()

**参数**

_无_

**返回**

[Void](/api/sync/web/api.html#Void)

**示例**

```js
// 当前 app 实例下的所有 Sync 实例都将离线
wilddog.sync().goOffline(); 
// 当前 app 实例下的所有 Sync 实例都将重连
wilddog.sync().goOnline(); 
```
---

## wilddog.sync.Reference

一个 Reference 实例表示要操作的特定数据节点，你可以通过它来读写数据。Reference 是 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 的子类。

---

### child

根据相对路径，来获取当前节点下子节点的引用

**定义**

child ( path )

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| path | string | non-null | path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。|

**返回**

[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)

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

**参数**

_无_

**返回**

[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)

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

**参数**

_无_

**返回**

[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)

---

### key

获得当前路径下节点的名称。

**定义**

key()

**参数**

_无_

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

**参数**

_无_

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

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object<br>string<br>number<br>boolean<br>null | | 如果`value != null` ,当前节点上的数据会被value覆盖，如果中间路径不存在,Wilddog 会自动将中间路径补全。如果`value == null`,效果等同于remove操作。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[Void](/api/sync/web/api.html#Void)>

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

**重要** update 支持多路径更新。需要同时向多个节点写入数据时，你应该优先考虑使用 update 而不是 [transaction](/api/sync/web/api.html#transaction)，具体使用方法参见下方示例。

**定义**

update(value)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object | | 包含要合并子节点的对象 |

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[Void](/api/sync/web/api.html#Void)>

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

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[Void](/api/sync/web/api.html#Void)>

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

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object<br>string<br>number<br>boolean | non-null | 用户希望在当前节点下新增的数据。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)>

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

把数据写到当前位置，类似 [set](/api/sync/web/api.html#set)，不同之处是需要指定一个优先级。默认排序按照优先级排序（参考 [orderByPriority](/guide/sync/web/retrieve-data.html#排序规则)）。

**定义**

setWithPriority (value, priority)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object<br>string<br>number<br>boolean<br>null |  | 将被写入的值。|
| priority | string<br>number| non-null | 优先级数据，节点的优先级是默认排序的依据。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[Void](/api/sync/web/api.html#Void)>

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

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| priority | string<br>number| non-null | 优先级数据，节点的优先级是默认排序的依据。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[Void](/api/sync/web/api.html#Void)>

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

当多个客户端并发修改同一节点的数据时，使用 [set](/api/sync/web/api.html#set) 极有可能造成数据不一致，而 transaction 能够避免这一情况的发生。

为了达到这个目的， 你必须通过 transaction 的更新函数来进行数据修改操作。更新函数接收一个` current value` 作为参数，并在此参数的基础之上为当前节点返回新的值 `new value`。多个客户端同时调用 transaction 修改同一节点的数据时，更新函数能够保证后续 transaction 拿到的 `current value` 中的数据与最近成功的 `transaction` 所返回的 `new value` 中的数据一致。

在 transaction 的执行过程中你的客户端可能会重复写入直到成功，当更新函数没有返回 value 时，事务终止。

如果需要， 你的 onComplete callback 将在事务完成后异步被调用。

**注意** 
+ 相同的数据节点上并发执行 set() 和 transaction()，极端情况下仍会出现不可预料的结果。
+ 如果只是需要同时向多个节点写入数据，请优先考虑使用 [update](/api/sync/web/api.html#update) 的多路径更新特性。

**定义**

transaction(updateFunction)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| updateFunction | [updateFunction](/api/sync/web/api.html#updateFunction) | non-null | 更新函数。|

**返回**
 
[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[TransactionResult](/api/sync/web/api.html#TransactionResult) | [TransactionResult](/api/sync/web/api.html#TransactionResult)[]> 

**注意** 只有当 updateFunction 返回的是一个包含多个节点的 object 时，transaction 才会返回给 Promise 一个 [TransactionResult](/api/sync/web/api.html#TransactionResult) 数组。

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

#### updateFunction 

用于 [transaction](/api/sync/web/api.html#transaction) 的更新函数。

**定义**

 function(currentValue)
 
**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| currentValue | function| object<br>string<br>number<br>boolean<br>null | 第一次调用时 currentValue 为null，你应当返回一个默认值。当回调函数第二次调用时， currentValue 是云端的最新值。 |

**返回**

newValue {object|string|number|boolean|null} 要写入当前节点的的新值。

当返回的是一个包含多个节点的 object 时，transaction 会返回给 Promise 一个 [TransactionResult](/api/sync/web/api.html#TransactionResult) 数组。

---

#### TransactionResult

执行 [transaction](/api/sync/web/api.html#transaction) 成功之后返回给 Promise 的结果，包含`committed` 和 `snapshot` 两个属性。

{committed: boolean}

是否提交成功。

{snapshot: [wilddog.sync.DataSnapshot](/api/sync/web/api.html#wilddog-sync-DataSnapshot)}

事务完成后的数据快照。

---

### onDisconnect

获取与当前数据节点关联的离线事件对象。

**定义**

onDisconnect

**参数**

_无_

**返回**

[wilddog.sync.OnDisconnect](/api/sync/web/api.html#wilddog-sync-OnDisconnect)

---

## wilddog.sync.Query

Query 对象包含了所有与我们数据查询及监听的 API，同时它也是 [wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference) 的父类。

### on

监听当前节点的指定事件,注册回调函数。

**定义**

on(type, onEvent, [cancelCallback], [context])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| type | string | non-null |事件类型参见 [EventType](/api/sync/web/api.html#EventType)。 |
| onEvent | [onEvent](/api/sync/web/api.html#onEvent) | non-null | 事件发生时的回调函数 。|
| cancelCallback | [cancelCallback](/api/sync/web/api.html#cancelCallback) | optional | 如果操作失败，这个函数会被调用。 |
| context | object | optional | 如果指定，你的回调函数中的this将代表这个对象。 |

**返回**

[Void](/api/sync/web/api.html#Void)

**示例**

```js
wilddog.sync().ref('city').on('child_added',function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
});
```
---
#### EventType

Query [on](/api/sync/web/api.html#on) 和 [once](/api/sync/web/api.html#once) 所支持的事件列表。

|名称|说明|
|----|----|
|value| 当有数据请求或有任何数据发生变化时触发|
|child_added| 当有新增子节点时触发|
|child_changed|当某个子节点发生变化时触发 |
|child_removed|当有子节点被删除时触发 |
|child_moved|当有子节排序发生变化时触发 |

---

#### onEvent

事件发生时所触发的回调函数

**定义**

function(snapshot, [prev])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| snapshot | [wilddog.sync.DataSnapshot]('/api/sync/web/api.html#wilddog-sync-DataSnapshot') | non-null |事件发生后当前节点的数据快照|
| prev | string |  |在 child_* 事件中会有 prev 参数。表示当前节点的上一个节点的 key |

**返回**

[Void](/api/sync/web/api.html#Void)

---

#### cancelCallback

如果操作失败，这个函数会被调用。

**定义**

function(err)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| err | object | non-null | 一个 `Error` 对象，包含了 `code` 属性 |

**返回**

[Void](/api/sync/web/api.html#Void)

---

### off

取消监听事件。取消之前用 [on](/api/sync/web/api.html#on) 注册的回调函数。

**定义**

off([type], [callback], [context])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| type | string | non-null |事件类型参见 [EventType](/api/sync/web/api.html#EventType)。 |
| onEvent | [onEvent](/api/sync/web/api.html#onEvent) | non-null | 在 [on](/api/sync/web/api.html#on) 中所传入的回调函数 。|
| context | object | optional | 在 [on](/api/sync/web/api.html#on) 中所传入的 context。 |

**示例**

```js
var onValueChange = wilddog.sync().ref('city').on('value', 
    function(dataSnapshot) { /* handle... */ 
});
// Sometime later...
wilddogRef.off('value', onValueChange);
```
---

### once

同 [on](/api/sync/web/api.html#on) 类似,不同之处在于 once 中的回调函数只被执行一次。

**定义**

once(type)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| type | string | non-null |事件类型参见 [EventType](/api/sync/web/api.html#EventType)。 |

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise).<[wilddog.sync.DataSnapshot]('/api/sync/web/api.html#wilddog-sync-DataSnapshot')>

**示例**

```js
wilddog.sync().ref('city').once('child_added')
    .then(function(snapshot){
        console.log(snapshot.val());
    })
    .catch(function(err){
        console.info(err);
    });
```
---

### orderByChild

产生一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，按照特定子节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

**定义**

orderByChild(key)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| type | string | non-null | 指定用来排序的子节点的key。 |


**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref("student");
// 创建一个新的 Query 对象，并在它上面建立监听
ref.orderByChild("height").on("child_added",function(snapshot){
  console.log(snapshot.key() + "is" + snapshot.val().height +"meters tall");
});

```
---

### orderByKey

产生一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，按照当前节点的key进行排序。

**定义**

orderByKey()

**参数**

_无_

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**


```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

---

### orderByValue 

产生一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，按照当前节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

**定义**

orderByValue()

**参数**

_无_

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var scoresRef = wilddog.sync().ref("scores");
scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " score is " + data.val());
  });
});

```
---

### orderByPriority

产生一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，按照当前节点的优先级排序。

**定义**

orderByPriority()

**参数**

_无_

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref();
ref.orderByPriority().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
```
---

### startAt

创建一个大于等于的范围查询，可配合 `orderBy*` 方式使用。

**定义**

startAt(value, [key])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | string<br>number<br>boolean<br>null |  | 查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key | string | optional | 起始子节点的key，只有在 `orderByPriority()`时有效。 |

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().startAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### endAt

创建一个小于等于的范围查询，可配合 `orderBy*` 方式使用。

**定义**

endAt(value, [key])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | string<br>number<br>boolean<br>null |  | 查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key | string | optional | 起始子节点的key，只有在 `orderByPriority()`时有效。 |


**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().endAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### equalTo

创建一个等于的精确查询。

**定义**

equalTo(value, [key])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | string<br>number<br>boolean<br>null |  | 查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key | string | optional | 起始子节点的key，只有在 `orderByPriority()`时有效。 |

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().equalTo('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToFirst

创建一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，获取从第一条（或 [startAt](/api/sync/web/api.html#startAt) 指定的位置）开始指定数量的子节点。

**定义**

limitToFirst (limit)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| limit | number| non-null | 这次查询能够获取的子节点的最大数量。 |

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**
```js
var ref = wilddog.sync().ref("student");
ref.limitToFirst(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToLast

创建一个新 [wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query) 对象，获取从最后一条（或 [endAt](/api/sync/web/api.html#endAt) 指定的位置）开始向前指定数量的子节点。

**定义**

limitToFirst(limit)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| limit | number| non-null | 这次查询能够获取的子节点的最大数量。 |

**返回**

[wilddog.sync.Query](/api/sync/web/api.html#wilddog-sync-Query)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.limitToLast(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

## wilddog.sync.OnDisconnect

OnDisconnect 类允许你在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。

---

### set

当客户端断开连接后，向当前的数据节点设置一个指定的值。

**定义**

set(value)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object<br>string<br>number<br>boolean<br>null |  | 在连接中断时需要写入当前位置的值。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/api.html#Void)>

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
disconnectRef.onDisconnect().set('I disconnected!')
    .then(function(){
        console.info('disconnect operation has been executed.');
    })
    .catch(function(err){
        console.info('disconnect operation is failed.');
    });
```
----

### update

当客户端断开连接后，指定的子节点将被写入到当前位置的子节点集合中。

**定义**

update(value)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object |  | 包含要写入当前位置子节点的集合。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/api.html#Void)>

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
disconnectRef.onDisconnect().update({"message":'I disconnected!'})
    .then(function(){
        console.info('disconnect operation has been executed.');
    })
    .catch(function(err){
        console.info('disconnect operation is failed.');
    });
```

----

### remove

当客户端断开连接后，删除当前位置上的数据。

**定义**

remove()

**参数**

_无_

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/api.html#Void)>

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
disconnectRef.onDisconnect().remove()
    .then(function(){
            console.info('disconnect operation has been executed.');
    })
    .catch(function(err){
        console.info('disconnect operation is failed.');
    });
```

----

### setWithPriority

当客户端断开连接后，指定的数据和其优先级会被写入当前位置。

**定义**

setWithPriority(value, priority)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| value | object<br>string<br>number<br>boolean<br>null |  | 将被写入的值。|
| priority | string<br>number| non-null | 优先级数据，节点的优先级是默认排序的依据。|

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/api.html#Void)>

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
disconnectRef.onDisconnect().setWithPriority('I disconnected', 10)
    .then(function(){
            console.info('disconnect operation has been executed.');
    })
    .catch(function(err){
        console.info('disconnect operation is failed.');
    });
```

----

### cancel

取消之前所有注册的离线操作。

**定义**

cancel()

**参数**

_无_

**返回**

[Void](/api/sync/web/api.html#Void)

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
// 之前所有注册在该节点下的离线事件都将取消
disconnectRef.onDisconnect().cancel();
```

---


## wilddog.sync.DataSnapshot

DataSnapshot 是当前时指定节点下数据的副本，Snapshot 不会随当前节点数据的变化而发生改变。我们无法直接创建这个对象，而应当在 [on](/api/sync/web/api.html#on) 或 [once](/api/sync/web/api.html#once) 的回调函数中来获取它。

### exists

当前 DataSnapshot 实例中是否包含数据。

**定义**

exists()

**参数**

_无_

**返回**

boolean 

**示例**


假设我们有以下数据：
``` json

{
  "name" : {
    "first" : "Jim",
    "last" : "Gordon"
  } 
}
```
用 exists 检测是否包含特定子节点：
```js
wilddog.sync().ref("/samplechat/users/jim").once("value")
    .then(function(snapshot) {
      var a = snapshot.exists();
      // a === true
      var b = snapshot.child("name").exists();
      // b === true
      var c = snapshot.child("name/first").exists();
      // c === true
      var d = snapshot.child("name/middle").exists();
      // d === false (because there is no "name/middle" child in the data snapshot)
    });

```

----

### val

返回当前快照的数据。

**定义**

val()

**参数**

_无_

**返回**

`object|string|null|number|boolean` 当前快照的真实数据。

**示例**

```js
wilddog.sync().ref("/city/Beijing").on('child_changed',
    function(snapshot){
        console.log(snapshot.val());
        // 这里将在 update 执行成功之后输出： {"pm25":432}
    });
wilddog.sync().ref("/city/Beijing").update({"pm25":432});

```
----------

### child

根据相对路径，来获取当前节点下子节点的数据快照。

**定义**

child(path)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| path | string | non-null | path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。|


**返回** 

[wilddog.sync.DataSnapshot](/api/sync/web/api.html#wilddog-sync-DataSnapshot)

**示例**

```js
var ref = wilddog.sync().ref("/city/Beijing");
ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		// has been deleted
	}else{
		var pm25=snapshot.child('pm25');
		console.log("The pm25 of Bejing is",pm25.val())
		// 这里将会输出：432
	}
})
ref.update({"pm25":432})
```
---

### forEach

遍历数据快照中的每一个子节点。

**定义**

forEach(callback)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| callback | [callback](/api/sync/web/api.html#callback) | non-null | 遍历每一个子节时的回调函数。|

**返回**

[Void](/api/sync/web/api.html#Void)

**示例**

``` js
var ref = wilddog.sync().ref("/city/Beijing");
ref.on("value",function(snapshot){
		snapshot.forEach(function(snap){
		console.log("the",snap.key(),"of Bejing is:",snap.val());
     });
});
ref.update({"pm25":432})
```

---

#### callback

forEach 的遍历时的回调函数。

**定义**

function(snap)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| snap | [wilddog.sync.DataSnapshot](/api/sync/web/api.html#wilddog-sync-DataSnapshot) | non-null | 子节点的数据快照。|


**返回**

[Void](/api/sync/web/api.html#Void)

---

### hasChild

检查是否存在某个指定的子节点。

**定义**

hasChild(key)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| key | string | non-null | 要检查的key。|

**返回** 

boolean

**示例**

```js
var ref = wilddog.sync().ref("/city/Beijing");
ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}else{
		if(snapshot.hasChild('pm25')){
			var pm25=snapshot.child('pm25');
			console.log("The pm25 of Bejing is",pm25.val());
		}	
	}
})
ref.update({"pm25":432});
```

----

### hasChildren

如果 `Datasnapshot` 有任何子节点返回 true，否则返回 false。

**定义**

hasChildren()

**参数**

_无_

**返回**

boolean

**示例**

假设我们已经有如下的数据：

``` json
{
  "name": {
    "first": "Jim",
    "last": "Gordon"
  }
}

```

用 `hasChildren` 检测 `DataSnapshot` 是否包含任何子节点：

``` js
var ref = wilddog.sync().ref("/samplechat/users/jim");
ref.once("value").then(function(snapshot) {
  var a = snapshot.hasChildren();
  // a === true
  var b = snapshot.child("name").hasChildren();
  // b === true
  var c = snapshot.child("name/first").hasChildren();
  // c === false （ 因为 first 的值是一个 string，自然它没有任何子节点）
}).catch(function(err)){
    console.error('get value failed', err);
});
```
----

### key

返回当前数据快照所属节点的 key。

**定义**

key()

**参数**

_无_

**返回** 

string

**示例**

```js
wilddog.sync().ref("/city/Beijing").on('child_changed',
    function(snapshot){
        if(snapshot.val() == null){
            //has been deleted
        } else {
            if(snapshot.hasChild('pm25')){
                var pm25=snapshot.child('pm25');
                var key=snapshot.key();
                console.log("The ",pm25.key() ,
                    " of Bejing is",pm25.val());
            }	
        }
})
```
----

### numChildren

返回当前节点中子节点的个数。

**定义**

numChildren()

**参数**

_无_

**返回**
 
number 

**示例**

```js
var data = {
  "name": {
    "first": "Fred",
    "last": "Flintstone"
  }};
var ref = wilddog.sync().ref("/users/fred");
// 这里我们用了 Promise 的链式写法来保证 once 必定在 set 完成之后才会执行
ref.set(data).then(function(){
    return ref.once("value");
}).then(function(snapshot) {
  var a = snapshot.numChildren();
  // a === 1 ("name")
  var b = snapshot.child("name").numChildren();
  // b === 2 ("first", "last")
  var c = snapshot.child("name/first").numChildren();
  // c === 0 (since "Fred" is a string)
}).catch(function(err){
    console.error('operation is failed ', err);
})

```

----

### ref

返回当前数据节点所关联的 [wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference) 实例。

**定义**

ref()

**参数**

_无_

**返回**

[wilddog.sync.Reference](/api/sync/web/api.html#wilddog-sync-Reference)

**示例**

```js
var ref = wilddog.sync().ref("/city/Beijing");
ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}else{
		if(snapshot.hasChild('pm25')){
			var pm25=snapshot.child('pm25');
			var key=snapshot.key();
			var _ref=pm25.ref();
			if(pm25.val()>500){
				_ref.set(500);
			}	
		}	
	}
})
```

----

### getPriority

获取当前节点的优先级。

**定义**

getPriority()

**参数**

_无_

**返回**

`stirng|number|null` 不存在优先级时返回 null。

**示例**

```js
var ref = wilddog.sync().ref("/samplechat/users");
ref.setWithPriority("fred", 500, function(error) {
  ref.once("value", function(snapshot) {
    var priority = snapshot.getPriority();
    // priority === 500
  });
});
```
----


### exportVal

导出 `DataSnapshot` 中的内容到 Javascript 对象，与 [val](/api/sync/web/api.html#val) 类似，不同之处在于 `exportVal` 导出的数据**包含优先级**。

**定义**

exportVal()

**参数**

_无_

**返回**

数据节点的值和优先级。

**示例**

``` js
ref.setWithPriority("hello", 500).then(function(){
    return ref.once('value');
}).then(function(snap){
    var data = snapshot.exportVal();
    // data is { ".value": "hello", ".priority": 500 }
    // data[".value"] === "hello"
    // data[".priority"] ===  500
}).catch(function(err) {
    console.error(err)
});
```

---

## wilddog.Promise

*static*

一个 Promise 对象表示一个事件（异步的）的值。Promsie 事件应当被完成（resovle）或者拒绝（reject），这个时候它会回调我们通过 then() 和 catch() 指派给它的回调函数。更多关于 Promise 编程规范的信息请 [参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 

---

### then

为当前 Promise 对象指定一个 resolved 之后的回调函数。

**定义**

then(onResolved,[onReject])

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| onResolved | function | _non-null_ | Promise resolved 时的回调函数，回传参数是 Promise 事件的返回值 |
| onReject | function | optional | Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回**

wilddog.Promise

---

### catch
为当前 Promise 对象指定一个 rejected 或异常后的回调函数。

**定义**

catch(onReject)

**参数**

| 参数名 | 类型 | 属性 | 说明 |
|---|---|---|---|
| onReject | function | _non-null_ | Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回**

[Void](/api/sync/web/api.html#Void)

---

## Void

Promise 或 callback 指向 Void 时表示无参数回传。



