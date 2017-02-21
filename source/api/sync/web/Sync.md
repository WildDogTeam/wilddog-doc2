title: Sync
---

Sync 对象的实例是我们访问野狗实时通信引擎 Web SDK 的入口。我们不能直接初始化 Sync 实例，而必须要通过 wilddog.App 实例的 [sync](/api/sync/web/App.html#sync) 方法来获取它。

## 属性

### ServerValue

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

</br>

------

## 方法

### ref

获取指向 `path` 的 [wilddog.sync.Reference](/api/sync/web/Reference.html) 对象实例。

**定义**

ref(path)

**参数**

| 参数名| 说明                                  |
| ---- | ----------------------------------- |
| path | string nullable path 相对 App 初始化参数 `syncURL` 而言的相对路径 |

**返回**

[wilddog.sync.Reference](/api/sync/web/Reference.html)

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

goOffline()

**返回**

[Void](/api/sync/web/Void.html)

---

### goOnline

手动建立连接，开启自动重连。

**定义**

goOnline()

**返回**

[Void](/api/sync/web/Void.html)

**示例**
```js
// 当前 app 实例下的所有 Sync 实例都将离线
wilddog.sync().goOffline();
// 当前 app 实例下的所有 Sync 实例都将重连
wilddog.sync().goOnline();
```
---
