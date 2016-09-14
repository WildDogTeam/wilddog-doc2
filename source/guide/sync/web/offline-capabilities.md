title:  离线功能
---

本篇文档主要介绍离线功能的实现。

Wilddog 会为每一个初始化后的客户端建立一个长连接。任何操作和通信都基于这个连接。

Wilddog 内部的实现机制能使你的应用在弱网环境下仍能继续工作。此外，还能监听客户端的连接状态，以及设置离线事件。

## 监控连接状态

在许多应用场景下，客户端需要知道自己与云端的连接是否正常。Wilddog 客户端提供了一个特殊的节点：`/.info/connected`，来存储客户端的连接状态。每当客户端的连接状态发生改变时，这个地址的数据都会被更新。

``` js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var connectedRef = wilddog.sync().ref("/.info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});
```
`/.info/connected` 的值是 boolean 类型的，它不会和云端进行同步。

## 离线事件

云端监听到客户端断开连接后自动触发一些事件，称为离线事件。例如，当一个用户的网络连接中断时，自动标记这个用户为“离线”状态。

断开连接包括客户端主动断开连接，或者意外的网络中断，比如客户端应用崩溃等。触发事件可以理解为执行特定的数据操作。数据操作支持的所有数据写入动作，包括 set, update，remove。

使用`onDisconnect()`方法，设置离线事件：


```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var presenceRef = wilddog.sync().ref("disconnectmessage");
// 当客户端连接断开时，写入一个字符串
presenceRef.onDisconnect().set("I disconnected!");
```

通过数据操作的回调方法，判断离线事件是否被云端成功记录：

```js
presenceRef.onDisconnect().remove( function(err) {
  if(err) {
    console.error('could not establish onDisconnect event', err);
  }
});
```
使用`cancel()`方法，取消离线事件：

```js
// 设置离线事件
presenceRef.onDisconnect().set("I disconnected!");
// 取消离线事件
presenceRef.cancel();
```
## 云端时间戳

Wilddog 提供了一种将 [云端时间戳](/api/sync/web.html#TIMESTAMP) 作为数据写入的机制。

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var userLastOnlineRef = wilddog.sync().ref("/users/joe/lastOnline");

//存入当前云端时间戳
userLastOnlineRef.set(wilddog.sync().ServerValue.TIMESTAMP);
```

与 `onDisconnect()` 方法组合使用，很容易实现记录客户端断线时间的功能：

```js
userLastOnlineRef.onDisconnect().set(wilddog.sync().ServerValue.TIMESTAMP);
```

本地时间和云端的时间差保存在 `/.info/serverTimeOffset` 节点下，获取方法如下:

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var serverTsRef = wilddog.sync().ref("/.info/serverTimeOffset");

serverTsRef.once('value',function(snapshot){
  // 获取时间差
  var offset = snapshot.val();
  // 可进一步计算出云端时间
  serverTime = (new Date).getTime() + offset;
})
```
如果只想获取云端时间，并不想存入，可以用 REST API [Server Values](https://z.wilddog.com/rest/api#Server-Values0)。即向 `https://<appId>.wilddogio.com/.json?sv=timestamp` 发一个 `GET` 请求即可。

## 手动建立或断开连接
Wilddog 也提供了手动建立或者断开连接的方法，分别为 `goOnline()`，`goOffline()`，如下：

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var connectedRef = wilddog.sync().ref("/.info/connected");

// 监听连接状态
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("I disconnected");
  }
});

setTimeout(function(){
  // 断开连接
  wilddog.sync().goOffline(); 
  setTimeout(function(){
    // 重新建连
    wilddog.sync().goOnline();
  },3000);
},3000);
```
**注意**：一个客户端可以实例化多个 Wilddog 对象，但多个对象不会创建多个连接，会复用同一个长连接。 并且 `goOffline()` 和 `goOnline()` 会控制全局的在线和离线。 

## 离线功能的实现机制

Wilddog 云端会每隔 20s 发一个心跳包给客户端，用于检测与客户端的连接是否正常。

如果一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，服务端无法立即感知到客户端断开，只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果设置了），重试连接等。

另外，重试连接连上之后，之前设置的监听仍然有效。







