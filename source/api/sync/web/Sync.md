title: Sync
---

`wilddog.Sync` 是访问 Wilddog Sync SDK 的入口。不能直接创建 `Sync` 实例，而必须要通过 `wilddog.App` 实例的 [sync](/api/sync/web/App.html#sync) 方法来获取它。

## 属性

### ServerValue.TIMESTAMP

##### 定义

`ServerValue.TIMESTAMP`

##### 说明

`ServerValue.TIMESTAMP` 是一个用于在我们的数据中插入云端当前时间的占位符，在本地无法查看具体时间。时间格式为自 [Unix epoch](https://en.wikipedia.org/wiki/Unix_time) 开始的的毫秒数。

##### 示例

```js
var sessionsRef = wilddog.sync().ref("sessions");
var mySessionRef = sessionsRef.push();
mySessionRef.onDisconnect().update({
    'endedAt': wilddog.sync().ServerValue.TIMESTAMP
});
mySessionRef.update({
    'startedAt': wilddog.sync().ServerValue.TIMESTAMP
});
```

</br>

------

## 方法

### ref

##### 定义

`ref(path)`

##### 说明

返回以 `path` 为相对路径的 [wilddog.sync.Reference](/api/sync/web/Reference.html) 实例。

##### 参数

| 参数名| 说明                                  |
| ---- | ----------------------------------- |
| path | String(nullable path)<br>相对 App 初始化参数 `syncURL` 而言的相对路径 |

##### 返回值

[wilddog.sync.Reference](/api/sync/web/Reference.html)

##### 示例

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

##### 定义

`goOffline()`

##### 说明

手动断开连接，关闭自动重连。

##### 返回值

[Void](/api/sync/web/Void.html)

##### 示例
```js
// 当前 app 实例下的所有 Sync 实例都将离线
wilddog.sync().goOffline();
```

---

### goOnline

##### 定义

`goOnline()`

##### 说明

手动恢复连接，开启自动重连。

##### 返回值

[Void](/api/sync/web/Void.html)

##### 示例
```js
// 当前 app 实例下的所有 Sync 实例都将重连
wilddog.sync().goOnline();
```
