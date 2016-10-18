
title: DataSnapshot

---

wilddog.sync.DataSnapshot 是当前时指定节点下数据的副本，Snapshot 不会随当前节点数据的变化而发生改变。我们无法直接创建这个对象，而应当在 [on](/api/sync/web/Query.html#on) 或 [once](/api/sync/web/Query.html#once) 的回调函数中来获取它。

---

## 方法

### exists

当前 DataSnapshot 实例中是否包含数据。

**定义**

exists()

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

| 参数名  | 说明                               |
| ---- |-------------------------------- |
| path | string(non-null)path为相对路径，多层级间需要使用"/"分隔，例如“a/b”。 |


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

| 参数名      | 说明             |
| -------- | -------------- |
| callback | [callback](/api/sync/web/DataSnapshot.html#callback)(non-null)类型<br>遍历每一个子节时的回调函数。 |

**返回**

[Void](/api/sync/web/Void.html)

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

### callback

forEach 的遍历时的回调函数。

**定义**

function(snap)

**参数**

| 参数名  | 说明        |
| ---- | --------- |
| snap | [wilddog.sync.DataSnapshot](/api/sync/web/DataSnapshot.html)(non-null)类型<br>子节点的数据快照。 |


**返回**

[Void](/api/sync/web/Void.html)

---

### hasChild

检查是否存在某个指定的子节点。

**定义**

hasChild(key)

**参数**

| 参数名  | 说明       |
| ---- | -------- |
| key  | string(non-null)<br>要检查的key。 |

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

返回当前数据节点所关联的 [wilddog.sync.Reference](/api/sync/web/Reference.html) 实例。

**定义**

ref()

**返回**

[wilddog.sync.Reference](/api/sync/web/Reference.html)

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

导出 `DataSnapshot` 中的内容到 Javascript 对象，与 [val](/api/sync/web/DataSnapshot.html#val) 类似，不同之处在于 `exportVal` 导出的数据**包含优先级**。

**定义**

exportVal()

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