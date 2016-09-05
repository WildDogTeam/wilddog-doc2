title:  完整 API 文档
---

# Wilddog (*Methods*)

## wilddog init

定义

wilddog.initializeApp(config)

说明

初始化一个Wilddog客户端。

参数

wilddogUrl `string` 应用url 如：`https://<appId>.wilddogio.com`
authDomain `string` Auth域 目前只支持`<appId>.wilddog.com`

 返回值

Wilddog 对象的引用

 示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var rootRef = wilddog.sync().ref();
//Good, 我们已经创建了一个野狗客户端。

```
----

## child()

定义

child ( path )

说明

根据相对路径，来获取当前节点下子节点的引用

参数

path `String` 

path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。

返回值

`Wilddog`子节点的引用。

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("city");
//ref refer to node <appId>.wilddogio.com/city

child_ref = ref.child("Beijing");
//now child_ref refer to "<appId>.wilddogio.com/city/Beijing"
```

----

## parent()

定义

parent()

说明

获取父节点的引用。如果当前节点就是root节点，方法执行后返回的依然是root节点的引用。

返回值

`String` Wilddog 父节点的引用

示例

```js
var parent_ref = ref.parent();
//返回值 the refer to the father node of current
```

----

## root()

定义

root()

说明

获得`wilddog`根结点的引用

返回值

`String` wilddog根节点的引用

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("city");
//ref refer to node <appId>.wilddogio.com/city

var root_ref = ref.root();
var path = root_ref.toString();
//path is now 'https://<appId>.wilddogio.com'

```


-----

## key()

定义

key()

说明

获得当前路径下节点的名称。

返回值

`String` 节点名称

示例


```js
child_ref = ref.child("Beijing");

//返回值 the key to current node
var key = child_ref.key();
//key is 'Bejing'
```
----

## toString()

定义

toString()

说明
获取当前节点的应用URL。

返回值

`String` 当前节点的应用URL。

示例

```js
child_ref = ref.child("/city/Beijing");
//返回值 the key to current node

var url = child_ref.toString();
//url should be https://<appId>.wilddogio.com/city/Beijing
```
----

## set()

定义

 set ( value , [oncomplete] )

说明

设置一个节点的值。
如果`value != null` ,当前节点上的数据会被value覆盖，如果中间路径不存在,Wilddog 会自动将中间路径补全。如果`value == null`,效果等同于remove操作。

参数

* value `object|string|number|boolean|null` 将被写入的值。
* onComplete `function(error)` 如果操作成功 `error`为`null`；否则,error为包含错误码`code`的对象。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

//the initial value is {"temp":23,"humidity":30,"wind":2}

ref.set({"temp":10,"pm25":500});
//the expected value of https://<appId>.wilddogio.com/city/Beijing should be {"temp":10,"pm25":500}
// or 
ref.set({
    "temp":10,
    "pm25":500
}, function(error) {
    if (error == null){
        // set 数据到野狗云端成功
    }
});

```

----

## update()

定义

update ( value , [onComplete] )

说明

将输入对象的子节点合并到当前数据中。不存在的子节点将会被新增，存在子节点将会被替换。
与`set`操作不同,`update` 不会直接覆盖原来的节点,而是将`value` 中的所有子节点插入到已有的节点中,如果已有的节点中已经有同名子节点,则覆盖原有的子节点。
<br>
e.g. update之前 `{"l1":"on","l3":"off"}` ,`value={"l1":"off","l2":"on"}` update 后期望的数据是 `{"l1":"off","l2":"on","l3":"off"}`。


参数

* value `object`包含要合并子节点的对象
* onComplete `function(error)` 如果操作成功 `error`为`null`；否则,err为包含错误码`code`的对象。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");
//the initial value is {"temp":23,"humidity":30,"wind":2}

ref.update({"temp":10,"pm25":500});
//the expected value of https://<appId>.wilddogio.com/city/Beijing should be {"temp":10,"pm25":500,"humidity":30,"wind":2}
```
----

## remove()

定义

remove ( [onComplete] )

说明

删除当前节点,效果等同于 `set(null,[onComplete])`,
如果父级节点只有当前节点一个子节点, 会递归删除父级节点。

参数

onComplete `function(error)`  如果操作成功 `error`为`null`；否则,err为包含错误码`code`的对象。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

//the initial value of https://<appId>.wilddogio.com is 
//{"city":{"Beijing":{"temp":23,"humidity":30,"wind":2}}}

ref.remove()
// value of https://<appId>.wilddogio.com is {}

```
----

## push()

定义

push (value , [oncomplete] )

说明

在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成，可作为排序使用。

参数

* value `object|string|number|boolean|null` 用户希望在当前节点下新增的数据.
* onComplete `function(error)`  如果操作成功 `error`为`null`；否则,err为包含错误码`code`的对象。

返回值

`String` 新插入子节点的引用

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("users");

var childref = ref.push({"name":"Thor","planet":"Asgard"});

var newKey = childref.key();
//newKey shoud look like a base64-like series eg -JmRhjbYk73IFRZ7
//th url of newKey shoud be https://<appId>.wilddogio.com/users/-JmRhjbYk73IFRZ7

```
--------

## setWithPriority()

定义

setWithPriority ( value , priority , [oncomplete] )

说明

把数据写到当前位置，类似set,不同之处是需要指定一个优先级。默认排序按照优先级排序。(参考排序规则的 [orderByPriority](/guide/sync/web/retrieve-data.html#排序规则) )

参数

* value `Object|String|Number|Boolean|Null` 将被写入的值。
* priority `String|Number` 优先级数据，节点的优先级是默认排序的依据。
* onComplete `function(error)`  如果操作成功 `error`为`null`；否则,err为包含错误码`code`的对象。


示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/users/jack");

var user = {
  name: {
    first: 'jack',
    last: 'Lee'
  }
};

ref.setWithPriority(user,100);
```

----

## setPriority()

定义

setPriority ( priority , [onComplete] )

说明

设置当前节点的优先级，优先级可以是`Number`,也可以是`String` 。用来改当前节点在兄弟节点中的排序位置。这个排序会影响Snapshot.forEach()的顺序，同样也会影响`child_added`和`child_moved`事件中`prevChildName`参数。

**节点按照如下规则排序**

* 没有priority的排最先
* 有数字 priority的次之，按照数值排序
* 有字符串 priority的排最后，按照字母表的顺序排列
* 当两个子节点有相同的 priority，它们按照名字进行排列，数字排在最先，字符串排最后

参数

* priority `String|Number` 优先级
* onComplete `function(error)` 如果操作成功 `error`为`null`；否则,error 为包含错误码`code`的对象。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/users/jack");

ref.setPriority(1000);
```

----

## transaction()

定义

transaction(updateFunction, [onComplete], [applyLocally])

说明

在当前路径下，自动修改数据。与 set() 不同，直接覆盖以前的数据，transaction() 能够确保不同客户端在相同时间没有修改冲突。

为了到达目的， 你通过 transaction() 的更新函数将的作用是把 current value 转换成 new value。当另外一个客户端在你之前先成功，你的更新函数将重新调用并带有 new current value。这过程一直重复直到写入成功或者不返回 value 来中止事务。

如果需要， 你的 onComplete callback 将在事务完成后异步被调用。

注意：在相同的路径上 使用 set() 和 transaction() , 极端情况下将出现不可预料的结果。

参数

* updateFunction `function`
  更新数据的函数


* onComplete `function(error, committed, snapshot)` 
 如果操作成功 `error`为`null`；否则,err为包含错误码`code`的对象。
 committed `boolean`  提交成功。
 snapshot `DataSnapShot` 事务完成后的数据快照。

示例


```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/users/fred/rank");

ref.transaction(function(currentRank) {
        // If /users/fred/rank 没有设置数据，currentRank 将会是 null 。
	return currentRank+1;
});
```

```js
// 试图创建 wilma 的用户， 如果你的用户 'wilma' 已经存在，那退出事务
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var wilmaRef = wilddog.sync().ref("/samplechat/users/wilma");

wilmaRef.transaction(function(currentData) {
  if (currentData === null) {
    return { name: { first: 'Wilma', last: 'Flintstone' } };
  } else {
    console.log('用户 wilma 已经存在。');
    return; // 退出事务
  }
}, function(error, committed, snapshot) {
  if (error) {
    console.log('Transaction 失败了!', error);
  } else if (!committed) {
    console.log('我们退出事务，因为用户wilma 已经存在。');
  } else {
    console.log('用户 wilma 已经添加!');
  }
  console.log("Wilma's data: ", snapshot.val());
});
```
-----

## goOnline()

定义

Wilddog.goOnline()

说明

手动建立连接，开启自动重连。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);

wilddog.sync().goOffline(); // All local Wilddog instances are disconnected
wilddog.sync().goOnline(); // All local Wildodg instances automatically reconnect
```

-----

## goOffline()
定义

Wilddog.goOffline()

说明

手动断开连接，关闭自动重连。


示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);

wilddog.sync().goOffline(); // All local Wilddog instances are disconnected
```
---

# Query (*Methods*)

## on()

定义

on ( type , callback , [cancelCallback] ， [context] )

说明

监听某个事件,注册回调函数。

参数

* type `String`

>|事件|说明|
|----|----|
|value| 当有数据请求或有任何数据发生变化时触发|
|child_added| 当有新增子节点时触发|
|child_changed|当某个子节点发生变化时触发 |
|child_removed|当有子节点被删除时触发 |
|child_moved|当有子节排序发生变化时触发 |


**callback** `function(snapshot[,prev])` 
`snapshot`  为`Snapshot` 类型,当监听到某事件时callback 会被执行. 在child_* 事件中会有prev参数。表示当前节点的上一个节点的key

**cancelCallback** `function(error)`
如果操作失败，这个函数会被调用。传入一个 `Error` 对象，包含为何失败的信息。

**context** `Object`
如果指定，你的回调函数中的this将代表这个对象

示例

```js
ref.on('child_added',function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
});
```
--------

## off()

定义

off ( [type] , [callback] , [context] )

说明

取消监听事件。取消之前用`on()`注册的回调函数。

参数

* type `String` `value`,`child_added`,`child_changed`,`child_removed`,`child_moved`  之一
* callback `function(snapshot)`  `on()` 中被传入的函数
* context `Object`  `on()` 中被传入的context

示例

```js
var onValueChange = function(dataSnapshot) { /* handle... */ };
wilddogRef.on('value', onValueChange);
// Sometime later...
wilddogRef.off('value', onValueChange);
```
```js
var onValueChange = wilddogRef.on('value', function(dataSnapshot) { /* handle... */ });
// Sometime later...
wilddogRef.off('value', onValueChange);
```

------

## once()

定义

once ( type , callback , [cancelCallbak] , [context] )

说明

同on 类似,不同之处在于 once中的回调函数只被执行一次。

参数

* type `String`

>|事件|说明|
|----|----|
|value| 当有数据请求或有任何数据发生变化时触发|
|child_added| 当有新增子节点时触发|
|child_changed|当某个子节点发生变化时触发 |
|child_removed|当有子节点被删除时触发 |
|child_moved|当有子节排序发生变化时触发 |



**callback** `function(snapshot[,prev])` 
`snapshot`  为`Snapshot` 类型,当监听到某事件时callback 会被执行. 在child_* 事件中会有prev参数。表示当前节点的上一个节点的key
**cancelCallback** `function(error)`
如果操作失败，这个函数会被调用。传入一个 `Error` 对象，包含为何失败的信息。
**context** `Object`
 如果指定，你的回调函数中的this将代表这个对象

示例

```js
ref.once('child_added',function(snapshot){
  console.log(snapshot.val());
});
```

----

## orderByChild() 

定义

orderByChild ( key )

说明

产生一个新`Query`对象，按照特定子节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

参数

* key `String`

指定用来排序的子节点的key

返回值

* 新生成的`Query` 对象的引用

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.orderByChild("height").on("child_added",function(snapshot){
  console.log(snapshot.key() + "is" + snapshot.val().height +"meters tall");
});

```
----

## orderByKey()

定义

orderByKey()

说明

产生一个新`Query`对象，按照当前节点的key进行排序。

返回值

新生成的`Query` 对象的引用

示例


```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.orderByKey().on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

----

## orderByValue() 

定义

orderByValue()

说明

产生一个新`Query`对象，按照当前节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

返回值

* 新生成的`Query` 对象的引用

示例

```js
var config = {
  authDomain: "dinosaur-facts.wilddog.com",
  syncURL: "https://dinosaur-facts.wilddogio.com"
};
wilddog.initializeApp(config);
var scoresRef = wilddog.sync().ref("scores");

scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " score is " + data.val());
  });
}

```

----

## orderByPriority()

定义

orderByPriority()

说明

产生一个新`Query`对象，按照当前节点的优先级排序。


返回值

新生成的`Query` 对象的引用。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

ref.orderByPriority().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
```
----

## startAt()

定义

startAt ( value , [key] )

说明

创建一个大于等于的范围查询，可配合orderBy方式使用。

参数

* value `String |Number|Null|Boolean`  查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。
* key `String`  起始子节点的key，只有在 `orderByPriority()`时有效。

返回值

新生成的`Query` 对象的引用。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.orderByKey().startAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

----

## endAt()

定义

endAt ( value , [key] )

说明

创建一个小于等于的范围查询，可配合orderBy方式使用。

参数

* value `String|Number|Null|Boolean` 查询的结束值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定时一个`String`。
* key `String` 起始子节点的key，只有在 `orderByPriority()`时有效。


返回值

新生成的`Query` 对象

示例


```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.orderByKey().endAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

----

## equalTo()

定义

equalTo ( value , [key] )

说明

创建一个等于的精确查询。

参数

* value `String|Number|Null|Boolean` 需要匹配的数值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。
* key `String` 起始子节点的key，只有在 `orderByPriority()`时有效。


返回值

新生成的`Query` 对象。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.orderByKey().equalTo('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

----

## limitToFirst()

定义

limitToFirst ( limit )

说明

创建一个新`Query`对象，获取从第一条（或startAt指定的位置）开始指定数量的子节点。

参数

limit `Number` 这次查询能够获取的子节点的最大数量。

返回值

新生成的`Query` 对象的引用。

示例
```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.limitToFirst(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```


----

## limitToLast()

定义

limitToLast ( limit )

说明

创建一个新`Query`对象，获取从最后一条（或endAt指定的位置）开始向前指定数量的子节点。

参数

limit `Number` 这次查询能够获取的子节点的最大数量。


返回值

新生成的`Query` 对象的引用。



示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

ref.limitToLast(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

----

## ref()

定义

ref()

说明

获取这个查询的 `Wilddog` 引用

返回值

 `Wilddog` 引用

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("student");

var query=ref.limitToLast(10);
var locationRef=query.ref();//ref==locationRef
```

-----

# Wilddog.onDisconnect (*Methods*)

## set()

定义

set (value,[onComplete])

说明

当客户端断开连接后，保证在地址上的数据被设置到一个指定的值。

参数

* value `Object,String,Number,Boolean,Null` 在连接中断时需要写入当前位置的值（可以是对象，数组，字符串，数组，布尔型或null）
* onComplete `Function *optional` 一个可选参数。当与服务端同步结束后会被调用，函数被调用时会传入一个参数：传入null代表成功，传入一个Error对象代表失败。

返回值

没有返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var disconnectRef = wilddog.sync().ref("disconnectMessage");

disconnectRef.onDisconnect().set('I disconnected!');
```
----

## update()

定义

update(value,[onComplete])

说明

当客户端断开连接后，指定的子节点将被写入到当前位置的子节点集合中。

参数

* value `Object` 包含要写入当前位置子节点的集合。
* onComplete `Function *optional` 一个可选参数。当与服务端同步结束后会被调用，函数被调用时会传入一个参数：传入null代表成功，传入一个Error对象代表失败。

返回值

无返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var disconnectRef = wilddog.sync().ref("disconnectMessage");

disconnectRef.onDisconnect().update({message:'I disconnected!'});
```

----

## remove()

定义

remove([onComplete])

说明

当客户端断开连接后，删除当前位置上的数据。

参数

onComplete `Function *optional` 一个可选参数。当与服务端同步结束后会被调用，函数被调用时会传入一个参数：传入null代表成功，传入一个Error对象代表失败。


返回值

无返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var disconnectRef = wilddog.sync().ref("disconnectMessage");

disconnectRef.onDisconnect().remove();
```

----

## setWithPriority()

定义

setWithPriority(value, priority, [onComplete])

说明
当客户端断开连接后，指定的数据和其优先级会被写入当前位置。


参数

* value `Object`, `String`, `Number`, `Boolean`, `Null` 在连接中断时需要写入当前位置的值（可以是对象，数组，字符串，数组，布尔型或null）
* priority `String`,`Number` value的优先级
* onComplete `Function *optional` 一个可选参数。当与服务端同步结束后会被调用，函数被调用时会传入一个参数：传入null代表成功，传入一个Error对象代表失败。

返回值

无返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var disconnectRef = wilddog.sync().ref("disconnectMessage");

disconnectRef.onDisconnect().setWithPriority('I disconnected', 10);
```

----

## cancel()

定义

cancel()

说明

取消之前所有注册的离线操作。

返回值

无返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var fredOnlineRef = wilddog.sync().ref("/users/fred/online");

fredOnlineRef.onDisconnect().set(false);
// cancel the previously set onDisconnect().set() event
fredOnlineRef.onDisconnect().cancel();
```

-----

# Wilddog.ServerValue (*Constants*)

## TIMESTAMP

定义

wilddog.sync().ServerValue.TIMESTAMP

说明

获取当前服务端的时间戳。


返回值

无返回值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var sessionsRef = wilddog.sync().ref("sessions");

var mySessionRef = sessionsRef.push();
mySessionRef.onDisconnect().update({ endedAt: wilddog.sync().ServerValue.TIMESTAMP });
mySessionRef.update({ startedAt: wilddog.sync().ServerValue.TIMESTAMP });
```
----


# DataSnapshot (*Methods*)

DataSnapshot是当前时间,某个节点数据的副本,Snapshot不会随当前节点数据的变化而发生改变.
用户不会主动创建一个DataSnapshot,而是和 on或once 配合使用.

## exists()

定义

exists()

说明

如果Datasnapshot对象包含数据返回 true，否则返回false

返回值

Datasnapshot是否包含数据

示例

假如我们有以下数据：

``` json
{
  "name" : {
    "first" : "Jim",
    "last" : "Gordon"
  } 
}

```

我们可以用exists检测是否包含特定字节点

``` js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/samplechat/users/jim");

ref.once("value", function(snapshot) {
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

## val()

定义

val()

说明

返回当前快照的数据

返回值 

`object|string|null|number|boolean` 当前快照的真实数据。

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on('child_changed',function(snapshot){
	console.log(snapshot.val());
	//should output {"pm25":432}
})
```

``` js
ref.update({"pm25":432})
```
----------

## child()

定义

child ( path )

说明

根据相对路径，来获取当前节点下子节点的快照。

参数

path `string` path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。

返回值 

子节点的快照

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}
	else{
		var pm25=snapshot.child('pm25');
		console.log("The pm25 of Bejing is",pm25.val())
	}
})
```
``` js
ref.update({"pm25":432})
```
-----

## forEach()

定义

forEach ( callback )

说明

遍历快照中每一个子节点,执行回调函数

参数

callback `function(snap)`， snap:子节点快照

示例

``` js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on("value",function(snapshot){
		snapshot.forEach(function(snap){
		console.log("the",snap.key(),"of Bejing is:",snap.val());
     });
});

```
``` js
ref.update({"pm25":432})
```

----

## hasChild()

定义

hasChild ( key )

说明

检查是否存在某个子节点

参数

key 输入参数,关注子节点的key

返回值 
 `boolean`   `true` 子节点存在；`false` 子节点不存在

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}
	else {
		if(snapshot.hasChild('pm25')){
			var pm25=snapshot.child('pm25');
			console.log("The pm25 of Bejing is",pm25.val());
		}	
	}
})
```

``` js
ref.update({"pm25":432})
```

----

## hasChildren()

定义

hasChildren()

说明

如果 `Datasnapshot` 有任何子节点返回true，否则false。

返回值

`boolean` 如果snapshot 有任何子节点 `true` ,否则 `false`

示例

假设我们已经有如下的数据

``` json
{
  "name": {
    "first": "Jim",
    "last": "Gordon"
  }
}

```

我们可以用 `hasChildren` 检测 `DataSnapshot` 是否包含任何子节点：

``` js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/samplechat/users/jim");

ref.once("value", function(snapshot) {
  var a = snapshot.hasChildren();
  // a === true

  var b = snapshot.child("name").hasChildren();
  // b === true

  var c = snapshot.child("name/first").hasChildren();
  // c === false (because "Fred" is a string and therefore has no children)
});
```
----

## key()

定义

 key()

说明

返回当前节点的key

返回值 

`string` 当前节点的key值

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}
	else {
		if(snapshot.hasChild('pm25')){
			var pm25=snapshot.child('pm25');
			var key=snapshot.key();
			console.log("The ",pm25.key() ," of Bejing is",pm25.val());
		}	
	}
})
```
----

## numChildren()

定义

numChildren()

说明

返回当前节点中子节点的个数

返回值
 
`string` 子节点的个数

----

## ref()

定义

ref()

说明

返回当前Wilddog实例的引用

返回值 

当前Wilddog实例的引用

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/city/Beijing");

ref.on('child_changed',function(snapshot){
	if(snapshot.val() == null){
		//has been deleted
	}
	else {
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

## getPriority()

定义

getPriority()

说明

获取当前节点的优先级

返回值

Stirng , Number , Null 优先级，或者不存在

示例

```js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/samplechat/users");

ref.setWithPriority("fred", 500, function(error) {
  ref.once("value", function(snapshot) {
    var priority = snapshot.getPriority();
    // priority === 500
  });
});
```
----


## exportVal()


定义

exportVal()

说明

导出DataSnapshot中的内容到Javascript 对象，与 `val()`类似，不同之处在于exportVal 导出的数据包含优先级。

返回值

DataSnapshot 的内容

示例

``` js
ref.setWithPriority("hello", 500, function(error) {
  ref.once("value", function(snapshot) {
    var data = snapshot.exportVal();
    // data is { ".value": "hello", ".priority": 500 }
    // data[".value"] === "hello"
    // data[".priority"] ===  500
  });
});
```





