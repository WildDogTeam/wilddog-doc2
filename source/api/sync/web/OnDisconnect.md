
title: OnDisconnect

---

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

---

## 方法

### set

当客户端断开连接（例如：关闭浏览器、跳转到一个新的页面、本地的网络问题等）后写入数据，此操作会先清空指定节点再写入新的数据。

**定义**

set(value)

**参数**

| 参数名   | 说明                |
| ----- | ----------------- |
| value | object<br>array<br>string<br>number<br>boolean<br>null<br>连接中断后写入当前位置的值。 |

**返回值**

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

**注意**

onDisconnect() 设置的离线操作只会触发一次。<br>
如需每次离线时都执行 set() 方法，则需要 [监听连接状态](../../../guide/sync/web/offline-capabilities.html#监听连接状态)，在连接建立成功后都通过 onDisconnect().set() 设置想要执行的写入操作。<br/>

----

### update

**定义**

update(value)

**说明**

当客户端断开连接（例如：关闭浏览器、跳转到一个新的页面、本地的网络问题等）后更新指定子节点。

**参数**

| 参数名   | 说明               |
| ----- | ---------------- |
| value | object 类型<br>包含要写入当前位置子节点的集合。 |

**返回值**

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

**注意**

onDisconnect() 设置的离线操作只会触发一次。<br>
如需每次离线时都执行 update() 方法，则需要 [监听连接状态](../../../guide/sync/web/offline-capabilities.html#监听连接状态)，在连接建立成功后都通过 onDisconnect().update() 设置想要执行的更新操作。<br/>

----

### remove

**定义**

remove()

**说明**

当客户端断开连接（例如：关闭浏览器、跳转到一个新的页面、本地的网络问题等）后移除当前节点的数据。

**参数**

_无_

**返回值**

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

**注意**

onDisconnect() 设置的离线操作只会触发一次。<br>
如需每次离线时都执行 remove() 方法，则需要 [监听连接状态](../../../guide/sync/web/offline-capabilities.html#监听连接状态)，在连接建立成功后都通过 onDisconnect().remove() 设置想要执行的删除操作。<br/>

----

### setWithPriority

当客户端断开连接后（关闭浏览器、跳转到一个新的页面、本地的网络问题等），指定的数据和其优先级会被写入当前位置。

**定义**

setWithPriority(value, priority)

**说明**

当客户端断开连接（例如：关闭浏览器、跳转到一个新的页面、本地的网络问题等）后更新指定子节点。

**参数**

| 参数名      | 说明                    |
| -------- | --------------------- |
| value    |  object<br>string<br>number<br>boolean<br>null<br>将被写入的值。               |
| priority |  string<br>number(non-null)<br>优先级数据，节点的优先级是默认排序的依据。 |

**返回值**

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

**注意**

onDisconnect() 设置的离线操作只会触发一次。如果你想在每次断线时都执行 setWithPriority() 方法，需要在每次 [监听](../../../guide/sync/web/offline-capabilities.html#监听连接状态) 连接建立成功后都通过 onDisconnect().setWithPriority() 设置想要执行的写入操作。<br/>

----

### cancel

**定义**

cancel()

**说明**

取消所有未生效的离线事件。

**返回值**

[Void](/api/sync/web/Void.html)

**示例**

```js
var disconnectRef = wilddog.sync().ref("disconnectMessage");
// 之前所有注册在该节点下的离线事件都将取消
disconnectRef.onDisconnect().cancel();
```

---
