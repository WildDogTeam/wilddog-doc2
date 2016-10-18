
title: 高级特性
---

本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。

## 云端时间戳

`wilddog.sync().ServerValue.TIMESTAMP` 用于记录当前 [云端时间戳](/api/sync/web/api.html#ServerValue)。

例如，在`servertimestamp` 节点下记录当前云端时间：

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

## 时钟偏差

 `/.info/serverTimeOffset` 节点用于记录本地时间和云端时间的差值。监听该节点可以获取时钟偏差。

例如，利用时钟偏差可以计算云端时间：

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