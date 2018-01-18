title:  离线事件
---

本篇文档介绍 Wilddog Sync 离线事件的最佳实践。保证网络意外中断情况中，离线事件也能成功触发。

## 离线事件为一次性

一次性是指离线事件每注册一次，只触发一次。

正常情况下，客户端在线时会在初始化过程中注册离线事件，客户端离线时离线事件触发；客户端再次上线，在初始化连接时再次注册离线事件，此时离线事件可以正常工作。

异常情况下，如网络意外中断，客户端不会重新初始化连接，离线事件不会重新注册。因此云端只会在第一次异常断连时触发离线事件。网络恢复后，客户端与云端自动重连，但不会重新注册离线事件，此时连接再次断开（客户端主动退出或再次网络中断），离线事件不会再次触发。

为避免上述情况，可通过手动重新注册离线事件，保证异常断连时，离线事件也能触发。

## 手动注册离线事件
通过 [离线事件](/sync/微信小程序/guide/offline-capabilities.html#离线事件) 与 [监听连接状态](/sync/微信小程序/guide/offline-capabilities.html#监听连接状态) 配合使用，将离线事件的注册代码放到监听连接状态的回调函数中，可实现异常情况下离线事件的重新注册：

```
var config = {
  authDomain: "<SyncAppID>.wilddog.com",
  syncURL: "https://<SyncAppID>.wilddogio.com"
};
wilddog.initializeApp(config);

// 监听连接状态
var connectedRef = wilddog.sync().ref("/.info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("connected");
    // 当连接成功时，重新注册离线事件
    var presenceRef = wilddog.sync().ref("disconnectmessage");
    presenceRef.onDisconnect().set("I disconnected!");
  } else {
    console.log("not connected");
  }
});
```

## 修正在线状态不一致

因网络中断断连时，可能出现客户端实际的在线状态与云端记录不一致的情况。如下所示：

![](/images/offlinebp.jpg)

- 1.客户端与野狗服务器 A 连接；

- 2.客户端与野狗服务器 A 因网络异常，中断连接；
      
- 3.客户端检测连接断开后，未等待 SDK 自动重连，也未等待心跳超时关闭连接，立刻与野狗服务器 B 建立新连接，并写入数据 1；

- 4.服务器 A 检测连接超时触发离线事件，离线事件执行操作，将数据修改为 2 ，与服务器 B 冲突。

此时，客户端实际在线，但云端被标记为该客户端离线。

因此，建议在代码中增加监听云端在线状态的节点。如出现上述情况：云端在线状态与当前实际的在线状态不一致，可及时修正。

例如，节点 `/user-status` 下记录着所有客户端的在线状态，客户端在线状态为 `online`，客户端离线状态则为 `offline`：

```
// 记录客户端在线状态的节点
var onlineRef = wilddog.sync().ref("/users/status");

// 客户端在线，将状态更改为 online（具体逻辑省略）
onlineRef.child(uid).set("online");

// 注册离线事件：客户端离线时，将状态更改为 offline（具体逻辑省略）
onlineRef.child(uid).onDisconnect().set("offline");
```

通过增加监听云端在线状态的代码，及时修正状态不一致的情况：

```
onlineRef.child(uid).on("value", function(snap) {
  if (snap.val() === "online") {
    console.log("current user online");
  } else if (snap.val() === "offline") {
    console.log("current user offline");
    // 一旦监听到当前用户是离线状态，但实际上是在线状态，则修正用户的在线状态
    onlineRef.child(uid).set("online");
  } else {
    console.log("other status");
  }
});
```
