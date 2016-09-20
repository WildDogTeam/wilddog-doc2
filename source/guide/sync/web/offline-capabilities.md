title:  离线功能
---

本篇文档介绍离线功能的相关特性和具体实现。

离线功能让应用在无网环境下仍可以操作数据。它包括离线事件、监控连接状态等特性。

## 监听连接状态

Wilddog Sync 提供了一个保留路径：`/.info/connected`，用于存储客户端与云端的连接状态。监听这个路径，客户端可以监测是否连接到云端。

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
`/.info/connected` 的值是 boolean 类型。

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断，比如客户端应用崩溃等。触发事件可以理解为执行特定的数据操作。数据操作支持所有数据写入动作，包括 `set()`，`update()`，`remove()`。

使用 `onDisconnect()` 方法，设置离线事件。

例如，当用户的网络连接中断时，记录这个用户已经离线

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

通过回调方法判断离线事件是否被云端成功记录

```js
presenceRef.onDisconnect().remove( function(err) {
  if(err) {
    console.error('could not establish onDisconnect event', err);
  }
});
```
`cancel()` 方法用于取消离线事件

```js
// 设置离线事件
presenceRef.onDisconnect().set("I disconnected!");
// 取消离线事件
presenceRef.cancel();
```

## 手动建立或断开连接

Wilddog Sync 提供手动建立或者断开连接的方法，分别为 `goOnline()`，`goOffline()`，如下

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
**注意**：一个客户端可以实例化多个 Wilddog Sync 对象，但多个对象不会创建多个连接，会复用同一个长连接。 并且 `goOffline()` 和 `goOnline()` 会控制全局的在线和离线。 

## 离线功能的实现机制

客户端每隔 20s 给云端发一个心跳包，云端用此检测与客户端的连接是否正常。

一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，云端只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果设置的有）等。

另一方面，客户端在网络恢复正常后，会自动尝试与云端建连，一旦成功，之前设置的监听仍然有效。








