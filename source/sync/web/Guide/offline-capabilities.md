title:  离线功能
---
Wilddog 内部的实现机制能使你的应用在弱网环境下仍能继续工作。此外，还能监听客户端的在线状态，以及设置离线事件。

## 监控连接状态

在许多应用场景下，客户端需要知道自己是否在线。Wilddog 客户端提供了一个特殊的数据地址：/.info/connected。每当客户端的连接状态发生改变时，这个地址的数据都会被更新。
``` js
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var connectedRef = wilddog.database().ref("/.info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});
```
/.info/connected的值是boolean类型的，它不会和云端进行同步。

## 离线事件

如果你想在监听到客户端断线后自动触发一些事件。例如，当一个用户的网络连接中断时，希望标记这个用户为“离线”状态。Wilddog 提供的离线事件功能实现这一需求。

离线事件能在云端检测到客户端连接断开时，将指定的数据写入云数据库中。不论是客户端主动断开，还是意外的网络中断，甚至是客户端应用崩溃，这些数据写入动作都将会被执行。因此我们可以依靠这个功能，在用户离线的时候，做一些数据清理工作。Wilddog 支持的所有数据写入动作，包括 set, update，remove，都可以设置在离线事件中执行。

下面是一个例子，使用`onDisconnect()`方法，在离线的时候写入数据：

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var presenceRef = wilddog.database().ref("disconnectmessage");

// 当客户端连接断开时，写入一个字符串
presenceRef.onDisconnect().set("I disconnected!");
```

**离线事件是如何工作的**

当进行了一个`onDisconnect()`调用之后，这个事件将会被记录在云端。云端会监控每一个客户端的连接。如果发生了超时，或者客户端主动断开连接，云端就触发记录的离线事件。

客户端可以通过回调方法，确保离线事件被云端成功记录了：

```js
presenceRef.onDisconnect().remove( function(err) {
  if(err) {
    console.error('could not establish onDisconnect event', err);
  }
});
```

要取消一个离线事件，可以使用`cancel()`方法：

```js
var onDisconnectRef = presenceRef.onDisconnect();
onDisconnectRef.set('I disconnected');
// 要取消离线事件
onDisconnectRef.cancel();
```
## 云端时间戳
Wilddog 提供了一种将[云端时间戳](/sync/web/api.html#TIMESTAMP)作为数据写入的机制。这个机制和`onDisconnect()`方法组合起来，很容易实现记录客户端断线时间的功能：

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var userLastOnlineRef = wilddog.database().ref("/users/joe/lastOnline");

userLastOnlineRef.onDisconnect().set(Wilddog.ServerValue.TIMESTAMP);
```

另外，Wilddog 提供一种查看本地时间和服务器时间差的机制。本地时间和客户端时间差保存在 `/.info/serverTimeOffset` 中,你可以通过`on` 或者`once` 监听 `value` 事件来获取这个数据:

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var serverTsRef = wilddog.database().ref("/.info/serverTimeOffset");

serverTsRef.on('value',function(snapshot){
  var offset = snapshot.val();
  serverTime = (new Date).getTime() + offset ; // 获取当前服务端时间
})
```
如果你只是想简单的获取服务端时间，可以用 rest API [Server Values](https://z.wilddog.com/rest/api#Server-Values0)。即向 `<appId>.wilddogio.com/.json?sv=timestamp` 发一个 `GET` 请求即可。

## 手动建立或断开连接
Wilddog 也提供了手动建立或者断开连接的方法。示例如下：

```js
var config = {
  authDomain: "samplechat.wilddog.com",
  syncURL: "https://samplechat.wilddogio.com"
};
wilddog.initializeApp(config);
var connectedRef = wilddog.database().ref("/.info/connected");

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
  wilddog.database().goOffline(); 
  setTimeout(function(){
    // 重新建连
    wilddog.database().goOnline();
  },3000);
},3000);
```
另外，需要说明的是，一个客户端可以实例化多个 Wilddog 对象，但多个对象不会创建多个连接，会复用同一个长连接。 并且 `goOffline` 和 `goOnline` 会控制`全局`的在线和离线。 

## 离线功能的实现机制

Wilddog 云端会每隔 20s 发一个心跳包给客户端，用于检测与客户端的连接是否正常。如果一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，服务端无法立即感知到客户端断开，只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果设置的有），重试连接等。
另外，重试连接连上之后，之前设置的监听仍然有效。







