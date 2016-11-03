title: Query
---

wilddog.sync.Query 对象包含了所有与我们数据查询及监听的 API，同时它也是 [wilddog.sync.Reference](/api/sync/web/Reference.html) 的父类。

## 方法

### on

监听当前节点的指定事件,注册回调函数。

**定义**

on(type, onEvent, [cancelCallback], [context])

**参数**

| 参数名            | 说明                                       |
| -------------- | ---------------------------------------- |
| type           | string 类型(non-null)<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |
| onEvent        | [onEvent](/api/sync/web/Query.html#onEvent)(non-null)类型<br>事件发生时的回调函数 。                             |
| cancelCallback | [cancelCallback](/api/sync/web/Query.html#cancelCallback)(optional)类型<br>如果操作失败，这个函数会被调用。                         |
| context        | object(optional)类型<br> 如果指定，你的回调函数中的this将代表这个对象。                |

**返回**

[Void](/api/sync/web/Void.html)

**示例**

```js
wilddog.sync().ref('city').on('child_added',function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
});
```
---

### EventType

Query [on](/api/sync/web/Query.html#on) 和 [once](/api/sync/web/Query.html#once) 所支持的事件列表。

| 名称            | 说明                  |
| ------------- | ------------------- |
| value         | 当有数据请求或有任何数据发生变化时触发 |
| child_added   | 当有新增子节点时触发          |
| child_changed | 当某个子节点发生变化时触发       |
| child_removed | 当有子节点被删除时触发         |
| child_moved   | 当有子节排序发生变化时触发       |

---

### onEvent

事件发生时所触发的回调函数

**定义**

function(snapshot, [prev])

**参数**

| 参数名      | 说明                                       |
| -------- | ---------------------------------------- |
| snapshot | [wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)(non-null)类型<br>事件发生后当前节点的数据快照                           |
| prev     | string 在 child_* 事件中会有 prev 参数。表示当前节点的上一个节点的 key |

**返回**

[Void](/api/sync/web/Void.html)

---

#### cancelCallback

如果操作失败，这个函数会被调用。

**定义**

function(err)

**参数**

| 参数名  | 说明                          |
| ---- | --------------------------- |
| err  | object(non-null)类型 <br> 一个 `Error` 对象，包含了 `code` 属性 |

**返回**

[Void](/api/sync/web/Void.html)

---

### off

取消监听事件。取消之前用 [on](/api/sync/web/Query.html#on) 注册的回调函数。

**定义**

off([type], [callback], [context])

**参数**

| 参数名     | 说明                                       |
| ------- | ---------------------------------------- |
| type    | string(non-null)类型<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |
| onEvent | [onEvent](/api/sync/web/Query.html#onEvent)(non-null)类型<br> 在 [on](/api/sync/web/Query.html#on) 中所传入的回调函数 。 |
| context | object(optional)类型 <br> 在 [on](/api/sync/web/Query.html#on) 中所传入的 context。 |

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

同 [on](/api/sync/web/Query.html#on) 类似,不同之处在于 once 中的回调函数只被执行一次。

**定义**

once(type)

**参数**

| 参数名  | 说明                                       |
| ---- | ---------------------------------------- |
| type | string(non-null)<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html).<[wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)>

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

产生一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，按照特定子节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

**定义**

orderByChild(key)

**参数**

| 参数名  | 说明              |
| ---- | --------------- |
| type | string(non-null)<br> 指定用来排序的子节点的key。 |


**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

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

产生一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，按照当前节点的key进行排序。

**定义**

orderByKey()

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

**示例**


```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

---

### orderByValue

产生一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，按照当前节点的值进行排序。排序的详情请参考[数据排序](/guide/sync/web/retrieve-data.html#数据排序)。

**定义**

orderByValue()

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

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

产生一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，按照当前节点的优先级排序。

**定义**

orderByPriority()

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

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

| 参数名  | 说明                                       |
| -----  | ---------------------------------------- |
| value |  string<br>number<br>boolean<br>null 查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key   | string(optional)<br>起始子节点的key，只有在 `orderByPriority()`时有效。    |

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

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

| 参数名   | 说明                                       |
| ----- | ---------------------------------------- |
| value | string<br>number<br>boolean<br>null<br>查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key   | string(optional)类型<br>起始子节点的key，只有在 `orderByPriority()`时有效。    |


**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

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

| 参数名   |说明                                       |
| ----- |  ---------------------------------------- |
| value | string<br>number<br>boolean<br>null<br>查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，`value` 一定是一个`String`。 |
| key   | string(optional)类型<br> 起始子节点的key，只有在 `orderByPriority()`时有效。    |

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().equalTo('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToFirst

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，获取从第一条（或 [startAt](/api/sync/web/Query.html#startAt) 指定的位置）开始指定数量的子节点。

**定义**

limitToFirst (limit)

**参数**

| 参数名   | 说明                 |
| ----- | ------------------ |
| limit | number(non-null)类型<br>这次查询能够获取的子节点的最大数量。 |

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

**示例**
```js
var ref = wilddog.sync().ref("student");
ref.limitToFirst(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToLast

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，获取从最后一条（或 [endAt](/api/sync/web/Query.html#endAt) 指定的位置）开始向前指定数量的子节点。

**定义**

limitToLast(limit)

**参数**

| 参数名   | 说明                 |
| ----- |------------------ |
| limit |number(non-null)类型<br>这次查询能够获取的子节点的最大数量。 |

**返回**

[wilddog.sync.Query](/api/sync/web/Query.html)

**示例**

```js
var ref = wilddog.sync().ref("student");
ref.limitToLast(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---
