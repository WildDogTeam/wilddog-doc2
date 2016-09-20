title: 高级特性
---

本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。

## 云端时间戳

Wilddog Sync 提供了 [云端时间戳](/api/sync/web/api.html#TIMESTAMP) 机制，它可以将云端时间戳写入到指定节点。

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var currentServerTime = wilddog.sync().ref("servertimestamp");

//存入当前云端时间戳
currentServerTime.set(wilddog.sync().ServerValue.TIMESTAMP);
```

与 `onDisconnect()` 方法组合使用，很容易实现记录客户端断线时间的功能

```js
var userLastOnlineRef = wilddog.sync().ref("/users/joe/lastOnline");
userLastOnlineRef.onDisconnect().set(wilddog.sync().ServerValue.TIMESTAMP);
```

如果只想获取云端时间，并不想存入，向 `https://<appId>.wilddogio.com/.json?sv=timestamp` 发一个 `GET` 请求即会返回云端时间戳。

## 时钟偏差

时钟偏差是本地时间和云端时间的差值，自动保存在 `/.info/serverTimeOffset` 节点下，可以通过查询该节点获取时钟偏差。

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var serverTsRef = wilddog.sync().ref("/.info/serverTimeOffset");

serverTsRef.once('value',function(snapshot){
  // 获取时钟偏差
  var offset = snapshot.val();
  // 可进一步计算出云端时间
  serverTime = (new Date).getTime() + offset;
})
```
