
title:  离线功能
---

本篇文档介绍离线功能的相关特性和具体实现。

离线功能让应用在无网环境下仍可以操作数据。它包括离线事件、监控连接状态等特性。



## 监听连接状态

`/.info/connected` 是 Wilddog Sync 提供的一个保留路径，用于存储客户端与云端的连接状态。

例如，监测客户端是否连接到云端：

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

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

`onDisconnect()` 方法用于在云端与客户端断开连接后执行数据操作。

例如，当用户的网络连接中断时，使用`onDisconnect()` 方法，记录这个用户已经离线：

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

通过回调方法判断离线事件是否被云端成功记录：

```js
presenceRef.onDisconnect().remove( function(err) {
  if(err) {
    console.error('could not establish onDisconnect event', err);
  }
});
```
`cancel()` 方法用于取消离线事件：

```js
// 设置离线事件
presenceRef.onDisconnect().set("I disconnected!");
// 取消离线事件
presenceRef.cancel();
```

## 手动建立或断开连接



`goOnline()` 和 `goOffline()` 方法用于手动建立连接和断开连接。

例如：

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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  一个应用可以创建多个 Wilddog Sync 实例，但多个实例只会复用同一个长连接。 并且`goOffline()`方法 和 `goOnline()`方法会控制全局的在线和离线。
</blockquote>

