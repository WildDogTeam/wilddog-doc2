
title: DataSnapshot

---

`wilddog.sync.DataSnapshot` 是当前指定节点下的数据快照，`DataSnapshot` 不会随当前节点数据的变化而发生改变。我们无法直接创建这个对象，而应当在 [on](/api/sync/web/Query.html#on) 或 [once](/api/sync/web/Query.html#once) 的回调函数中来获取它。

## 方法

### exists

##### 定义

`exists()`

##### 说明

判断当前 `DataSnapshot` 实例中是否包含数据。使用 `exists()` 方法进行非空判断比 `snapshot.val() !== null` 更高效。

##### 返回值

Boolean

##### 示例

假设我们有以下数据：
``` json
{
  "name" : {
    "first" : "Jim",
    "last" : "Gordon"
  }
}
```
用 `exists` 检测是否包含特定子节点：
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
      // d === false ，因为 "name/middle" 节点下没有数据。
    });

```

------

### val

##### 定义

`val()`

##### 说明

返回当前数据快照包含的数据。`val()` 可能返回的数据类型包括：String、Number、Boolean、null（该节点下数据为空时）或者是数组、对象。返回的数据类型取决于节点下的数据内容。

##### 返回值

Object|String|Number|Boolean|null 当前数据快照包含的数据， null 表示该节点的数据快照为空。

##### 示例

假设我们已经有如下的数据：

``` json
{
  "pm25":42
}
```

```js
var ref = wilddog.sync().ref("/city/Beijing/pm25")
ref.on('value', function(snapshot){
    // 打印的内容为：Then pm25 of Beijing is 42
    console.log('The pm25 of Beijing is ', snapshot.val());
});

```

------

### child

##### 定义

`child(path)`

##### 说明

根据相对路径，来获取当前节点下子节点的数据快照。相对路径可以是一个字节点的 key 值（如：`"Beijing"`），也可以是更深层次的路径（如：`'Beijing/pm25'`）。如果相对路径下并没有数据，则返回 null 。

##### 参数

| 参数名  | 说明                               |
| ---- |-------------------------------- |
| path | String(non-null)类型<br> path 为相对路径，多层级间需要使用`"/"`分隔，例如`"a/b"`。 |


##### 返回值

`wilddog.sync.DataSnapshot` 实例

##### 示例

假设我们已经有如下的数据：

``` json
{
  "pm25":42
}
```

```js
var ref = wilddog.sync().ref("/city/Beijing");
ref.on('value',function(snapshot){
    var pm25 = snapshot.child('pm25');
    // 打印内容为：Then pm25 of Beijing is 42
    console.log("The pm25 of Bejing is", pm25.val())
})
```
---

### forEach

##### 定义

`forEach(callback)`

##### 说明

遍历数据快照中的每一个子节点。受 JavaScript Object 对象的影响，`snapshot` 直接通过 `val()` 方法返回的数据不能保证显示的顺序完全符合 [orderBy\*()](/guide/sync/web/retrieve-data.html#根据数据排序监听) 的要求，因此我们提供了 `forEach()` 方法来解决这个问题。如果没有使用 [orderBy\*()](/guide/sync/web/retrieve-data.html#根据数据排序监听) 方法，依次遍历出来的结果默认选择 key 排序（除非数据快照设置过 priority ，则会根据 priority 排序）。

##### 参数

| 参数名      | 说明             |
| -------- | -------------- |
| callback | function(non-null)类型<br>遍历每一个子节时的回调函数。如果在 `callback` 中主动 `return true` 则会停止之后的遍历。 |

##### 返回值

[Void](/api/sync/web/Void.html)

##### 示例

假设我们已经有如下的数据：

``` json
{
  "users": {
    "Jim": {
      "first": "Jim",
      "last": "Gordon"
    },
    "Alan": {
      "first": "Alan",
      "last": "Turing"
    }
  }
}
```


``` js
var query = wilddog.sync().ref("users").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "Alan" the first time and "Jim" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
  });
});
```


```js
// 如果在 callback 中返回 true，则会停止之后的遍历过程。
var query = wilddog.sync().ref("users").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key; // "Jim"
      // 取消遍历
      return true;
  });
});
```

---


### hasChild

##### 定义

`hasChild(key)`

##### 说明

判断是否存在某个指定的子节点。如果指定节点下的数据不为空，则返回 `true。`

##### 参数

| 参数名  | 说明       |
| ---- | -------- |
| key  | String(non-null)类型<br>要检查的 key 。 |

##### 返回值

Boolean

##### 示例

假设我们已经有如下的数据：

``` json
{
  "name": {
    "first": "Jim",
    "last": "Gordon"
  }
}

```

```js
// Determine which child keys in DataSnapshot have data.
var ref = firebase.database().ref("users/Jim");
ref.once("value")
  .then(function(snapshot) {
    var hasName = snapshot.hasChild("name"); // true
    var hasAge = snapshot.hasChild("age"); // false
  });
```

----

### hasChildren

##### 定义

`hasChildren()`

##### 说明

如果 `Datasnapshot` 存在子节点返回 `true`，否则返回 `false`。你可以通过使用 `hasChildren()` 方法来确定当前的数据快照是否含有子节点，进而决定是否调用 `forEach()` 方法来遍历数据。

##### 返回值

Boolean

##### 示例

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
var ref = wilddog.sync().ref("/users/jim");
ref.once("value").then(function(snapshot) {
    var a = snapshot.hasChildren(); // a === true
    var b = snapshot.child("name").hasChildren(); // b === true
    var c = snapshot.child("name/first").hasChildren(); // c === false
}).catch(function(err)){
    console.error('get value failed', err);
});
```
----

### key

##### 定义

`key()`

##### 说明

返回当前数据快照所属节点的 key。

##### 返回值

String

##### 示例

假设我们已经有如下的数据：

``` json
{
  "pm25":42
}
```

```js
var ref = wilddog.sync().ref("/city/Beijing/pm25")
ref.on('child_changed', function(snapshot){
    if(snapshot.hasChild('pm25')){
        var pm25 = snapshot.child('pm25');
        var key = snapshot.key();
        // The pm25 of Beijing is 42.
        console.log("The ", pm25.key(), " of Bejing is", pm25.val());
    };
})
```
----

### numChildren

##### 定义

`numChildren()`

##### 说明

返回子节点的个数。

##### 返回值

Number

##### 示例

假设我们已经有如下的数据：

``` json
{
  "name": {
    "first": "Jim",
    "last": "Gordon"
  }
}

```

```js
var ref = wilddog.sync().ref("/users/Jim");
ref.once('value', function (snapshot) {
    var a = snapshot.numChildren();
    // a === 1 ("name")
    var b = snapshot.child("name").numChildren();
    // b === 2 ("first", "last")
    var c = snapshot.child("name/first").numChildren();
    // c === 0 (since "Jim" is a String)
}).catch(function(err){
    console.error('operation is failed ', err);
})

```

----

### ref

##### 定义

`ref()`

##### 说明

返回当前数据快照所关联的 [wilddog.sync.Reference](/api/sync/web/Reference.html) 实例。

##### 返回值

[wilddog.sync.Reference](/api/sync/web/Reference.html)

##### 示例

假设我们已经有如下的数据：

``` json
{
  "pm25":42
}
```

```js
var ref = wilddog.sync().ref("/city/Beijing");
ref.once('value', function(snapshot){
    console.log(snapshot.val()); // {'pm25',42}
    var newRef = snapshot.ref();
    newRef.once('value', function (newSnapshot) {
        console.log(newSnapshot.val()); // 42
    })

})
```

----

### getPriority

##### 定义

`getPriority()`

##### 说明

获取当前节点的 priority 值。如果优先级不存在时返回 null。

##### 返回值

`String|Number|null` 不存在优先级时返回 null。

##### 示例

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

##### 定义

`exportVal()`

##### 说明

将 `DataSnapshot` 中的全部内容导出到 JavaScript 对象。`exportVal()` 方法和 `val()` 方法类似，都可以导出数据。但是当节点的 priority 值不为空时，`exportVal()` 会导出包含 priority 的数据，适合用于备份。

##### 返回值

数据快照的值和优先级。

##### 示例

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
