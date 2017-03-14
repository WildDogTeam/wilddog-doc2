title: Query
---

`wilddog.sync.Query` 对象包含了所有与我们数据查询及监听的 API，同时它也是 [wilddog.sync.Reference](/api/sync/web/Reference.html) 的父类。

## 方法

### ref

##### 定义

`ref()`

##### 说明

获取这个 `wilddog.sync.Query` 所在路径下的 `wilddog.Reference` 实例。

##### 返回值

[wilddog.sync.Reference](/api/sync/web/Reference.html)

##### 示例

```js
var query = wilddog.sync().ref('city').orderByKey();
query.on('child_added',function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
});
var ref = query.ref();
```

### on

##### 定义

`on(type, onEvent, [cancelCallback], [context])`

##### 说明

监听指定节点的数据。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#设置监听)。
这是从 Wilddog Sync 云端监听数据的主要方式，当监听到当前节点的初始数据或当前节点的数据改变时，将会触发指定事件对应的回调 `onEvent。`
此外，对于 `child_added`, `child_changed`, `child_moved` 和 `child_removed` 事件，回调 `onEvent` 将带有当前排序下前一节点的 key 值。
可使用 [off()](/api/sync/web/Query.html#off) 方法移除监听。

##### 参数

| 参数名            | 说明                                       |
| -------------- | ---------------------------------------- |
| type           | String 类型(non-null)<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |
| onEvent        | [onEvent](/api/sync/web/Query.html#onEvent)(non-null)类型<br>事件发生时的回调函数 。                             |
| cancelCallback | [cancelCallback](/api/sync/web/Query.html#cancelCallback)(optional)类型<br>如果操作失败，这个函数会被调用。                         |
| context        | Object(optional)类型<br> 如果指定，你的回调函数中的this将代表这个对象。                |

##### 返回值

[Void](/api/sync/web/Void.html)

##### 示例

```js
wilddog.sync().ref('city').on('child_added',function(snapshot,prev){
  console.log(snapshot.val());
  console.log("the previous key is",prev)
});
```
---

#### EventType

Query [on](/api/sync/web/Query.html#on) 和 [once](/api/sync/web/Query.html#once) 所支持的事件列表。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#设事件)。

| 名称            | 说明                  |
| ------------- | ------------------- |
| value         | 当有数据请求或有任何数据发生变化时触发 |
| child_added   | 当有新增子节点时触发          |
| child_changed | 当某个子节点发生变化时触发       |
| child_removed | 当有子节点被删除时触发         |
| child_moved   | 当有子节排序发生变化时触发       |

---

#### onEvent

##### 定义

`function(snapshot, [prev])`

##### 说明

事件发生时所触发的回调函数。

##### 参数

| 参数名      | 说明                                       |
| -------- | ---------------------------------------- |
| snapshot | [wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)(non-null)类型<br>事件发生后当前节点的数据快照                           |
| prev     | String 在 `child_*` 事件中会有 `prev` 参数。表示当前节点的上一个节点的 key |

##### 返回值

[Void](/api/sync/web/Void.html)

---

#### cancelCallback

##### 定义

`function(err)`

##### 说明

如果操作失败，这个函数会被调用。

##### 参数

| 参数名  | 说明                          |
| ---- | --------------------------- |
| err  | Object(non-null)类型 <br> 一个 `Error` 对象，包含了 `code` 属性 |

##### 返回值

[Void](/api/sync/web/Void.html)

---

### off

取消监听事件。取消之前用 [on](/api/sync/web/Query.html#on) 注册的回调函数。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#移除监听)。

##### 定义

`off([type], [callback], [context])`

##### 参数

| 参数名     | 说明                                       |
| ------- | ---------------------------------------- |
| type    | String(non-null)类型<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |
| onEvent | [onEvent](/api/sync/web/Query.html#onEvent)(non-null)类型<br> 在 [on](/api/sync/web/Query.html#on) 中所传入的回调函数 。 |
| context | Object(optional)类型 <br> 在 [on](/api/sync/web/Query.html#on) 中所传入的 `context` 。 |

##### 示例

```js
var onValueChange = wilddog.sync().ref('city').on('value',
    function(dataSnapshot) { /* handle... */
});
// Sometime later...
wilddogRef.off('value', onValueChange);
```
---

### once

##### 定义

`once(type, [onEvent])`

##### 说明

同 [on](/api/sync/web/Query.html#on) 类似，不同之处在于 `once` 中的回调函数只被执行一次，之后会自动取消监听。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#设置监听)。

##### 参数

| 参数名  | 说明                                       |
| ---- | ---------------------------------------- |
| type | String(non-null)<br>事件类型参见 [EventType](/api/sync/web/Query.html#EventType)。 |
| onEvent | [onEvent](/api/sync/web/Query.html#onEvent)(non-null)类型<br> 在 [on](/api/sync/web/Query.html#on) 中所传入的回调函数 。 |

##### 返回值

[wilddog.Promise](/api/sync/web/Promise.html).<[wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)>

##### 示例

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

##### 定义

`orderByChild(key)`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，按子节点下指定的 key 对应的 value 对结果进行排序。排序的详情请参考 [数据排序](/guide/sync/web/retrieve-data.html#根据数据排序监听) 。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据排序监听)。
<br>此方法可以与 `startAt`、`endAt` 或 `equalTo` 方法联合使用。

##### 参数

| 参数名  | 说明              |
| ---- | --------------- |
| type | String(non-null)<br> 指定用来排序的子节点的 key 。 |


##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref("student");
// 创建一个新的 Query 对象，并在它上面建立监听
ref.orderByChild("height").on("child_added",function(snapshot){
  console.log(snapshot.key() + "is" + snapshot.val().height +"meters tall");
});

```
---

### orderByKey

##### 定义

`orderByKey()`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，按子节点的 key 对结果以字典序进行排序。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据排序监听)。
<br>此方法可以与 `startAt`、`endAt` 或 `equalTo` 方法联合使用。

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例


```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```

---

### orderByValue

##### 定义

`orderByValue()`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，按节点的 value 对结果排序。排序的详情请参考 [数据排序](/guide/sync/web/retrieve-data.html#根据数据排序监听) 。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据排序监听)。
<br>此方法可以与 `startAt`、`endAt` 或 `equalTo` 方法联合使用。

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

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

##### 定义

`orderByPriority()`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，按节点的 priority 对结果排序。节点按照如下优先级规则升序排列：null < Number < String。
  - priority 为 null 的排最先；
  - priority 为数值的次之，按照数值从小到大排序；   
  - priority 为字符串的排最后，按照字典序排列；   
  - 当两个子节点有相同的 priority（包括没有 priority），它们按照 key 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。

此方法可以与 `startAt`、`endAt` 或 `equalTo` 方法联合使用。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据排序监听)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，`Key` 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。
</blockquote>

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref();
ref.orderByPriority().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
```
---

### startAt

##### 定义

`startAt(value, [key])`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，可以查询所有大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据筛选结果监听)。
此方法应与 `orderByKey`、`orderByChild`、`orderByValue` 或 `orderByPriority` 方法联合使用。

##### 参数

| 参数名  | 说明                                       |
| -----  | ---------------------------------------- |
| value |  String<br>Number<br>Boolean<br>null 查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，value 一定是一个String。 |
| key   | String(optional)<br>起始子节点的key，只有在 `orderByPriority()`时有效。    |

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().startAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### endAt

##### 定义

`endAt(value, [key])`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，可以查询所有小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据筛选结果监听)。
此方法应与 `orderByKey`、`orderByChild`、`orderByValue` 或 `orderByPriority` 方法联合使用。

##### 参数

| 参数名   | 说明                                       |
| ----- | ---------------------------------------- |
| value | String<br>Number<br>Boolean<br>null<br>查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，value 一定是一个String。 |
| key   | String(optional)类型<br>起始子节点的key，只有在 `orderByPriority()`时有效。    |


##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().endAt('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### equalTo

##### 定义

`equalTo(value, [key])`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 实例，可以查询等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据筛选结果监听)。
此方法应与 `orderByKey`、`orderByChild`、`orderByValue` 或 `orderByPriority` 方法联合使用。

##### 参数

| 参数名   |说明                                       |
| ----- |  ---------------------------------------- |
| value | String<br>Number<br>Boolean<br>null<br>查询的起始值，类型取决于这个查询用到的 `orderBy*()`函数。如果与`orderByKey()` 组合的话，value 一定是一个String。 |
| key   | String(optional)类型<br> 起始子节点的key，只有在 `orderByPriority()`时有效。    |

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref("student");
ref.orderByKey().equalTo('jack').on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToFirst

##### 定义

`limitToFirst(limit)`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，获取当前排序下从第一个节点开始的最多 (limit) 条数据。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据筛选结果监听)。

##### 参数

| 参数名   | 说明                 |
| ----- | ------------------ |
| limit | Number(non-null)类型<br>这次查询能够获取的子节点的最大数量。 |

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例
```js
var ref = wilddog.sync().ref("student");
ref.limitToFirst(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
---

### limitToLast

##### 定义

`limitToLast(limit)`

##### 说明

创建一个新 [wilddog.sync.Query](/api/sync/web/Query.html) 对象，获取当前排序下从第一个节点开始的最多 (limit) 条数据。详细使用请参考：[完整指南](../../../guide/sync/web/retrieve-data.html#根据数据筛选结果监听)。

##### 参数

| 参数名   | 说明                 |
| ----- |------------------ |
| limit |Number(non-null)类型<br>这次查询能够获取的子节点的最大数量。 |

##### 返回值

[wilddog.sync.Query](/api/sync/web/Query.html)

##### 示例

```js
var ref = wilddog.sync().ref("student");
ref.limitToLast(10).on("child_added",function(snapshot){
  console.log(snapshot.key());
});
```
