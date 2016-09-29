
title:  离线功能
---

本篇文档介绍离线功能的相关特性和具体实现。

离线功能让应用在无网环境下仍可以操作数据。它包括离线事件、监控连接状态等特性。

## 监听连接状态

`/.info/connected` 是 Wilddog Sync 提供的一个保留路径，用于存储客户端与云端的连接状态。

例如，监测客户端是否连接到云端：

```java
//初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<appId>.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    //创建一个 SyncReference 实例
    SyncReference connectedRef = WilddogSync.getInstance().getReference(.info/connected);
    SyncReference connectedRef = WilddogSync.getInstance().getReference(".info/connected");
        connectedRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                boolean connected = (boolean) dataSnapshot.getValue(Boolean.class);
                if (connected) {
                    System.out.println("connected");
                } else {
                    System.out.println("not connected");
                }
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```
`/.info/connected` 的值是 boolean 类型。

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法。

`onDisconnect()` 方法用于在云端与客户端断开连接后执行数据操作。

例如，当用户的网络连接中断时，使用`onDisconnect()` 方法，记录这个用户已经离线：

```java
//初始化
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);

SyncReference presenceRef = WilddogSync.getInstance().getReference("disconnectmessage");

OnDisconnect onDisconnectRef = presenceRef.onDisconnect();
onDisconnectRef.setValue("I disconnected");
```

通过回调方法判断离线事件是否被云端成功记录：

```java
presenceRef.onDisconnect().removeValue(new SyncReference.CompletionListener() {
    @Override
    public void onComplete(SyncError error, SyncReference syncReference) {
        if (error != null) {
            System.out.println("could not establish onDisconnect event:" + error.getMessage());
        }
    }
});
```

`cancel()` 方法用于取消离线事件：

```java
OnDisconnect onDisconnectRef = presenceRef.onDisconnect();
onDisconnectRef.setValue("I disconnected");
onDisconnectRef.cancel();
```

## 手动建立或断开连接



`goOnline()` 和 `goOffline()` 方法方法手动建立连接和断开连接。

例如：

```java

// 建立连接
SyncReference presenceRef = WilddogSync.getInstance().getReference();
presenceRef.goOnline();

// 断开连接
SyncReference presenceRef = WilddogSync.getInstance().getReference();
presenceRef.goOffline();
```
>**注意：** 一个应用可以创建多个 Wilddog Sync 实例，但多个实例只会复用同一个长连接。 并且`goOffline()`方法 和 `goOnline()`方法会控制全局的在线和离线。


