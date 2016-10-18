
title: OnDisconnect

---

wilddog.sync.OnDisconnect 类允许你在客户端离线时写入或清除数据，不论客户端是否是主动断开连接，已经设置的离线事件都必定会被执行。

---

## 方法

### set

当客户端断开连接后，向当前的数据节点设置一个指定的值。

**定义**

set(value)

**参数**

| 参数名   | 说明                |
| ----- | ----------------- |
| value | object<br>string<br>number<br>boolean<br>null<br> 在连接中断时需要写入当前位置的值。 |

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/Void.html)>

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

| 参数名   | 说明               |
| ----- | ---------------- |
| value | object类型<br>包含要写入当前位置子节点的集合。 |

**返回**

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/Void.html)>

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

[wilddog.Promise](/api/sync/web/api.html#wilddog-Promise)<[Void](/api/sync/web/Void.html)>

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

| 参数名      | 说明                    |
| -------- | --------------------- |
| value    |  object<br>string<br>number<br>boolean<br>null<br>将被写入的值。               |
| priority |  string<br>number(non-null)<br>优先级数据，节点的优先级是默认排序的依据。 |

**返回**

[wilddog.Promise](/api/sync/web/Promise.html)<[Void](/api/sync/web/Void.html)>

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

**返回**

[Void](/api/sync/web/Void.html)

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
// 之前所有注册在该节点下的离线事件都将取消
disconnectRef.onDisconnect().cancel();
```

---