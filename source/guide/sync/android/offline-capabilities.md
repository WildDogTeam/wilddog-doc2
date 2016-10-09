
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
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  `/.info/connected` 的值是 boolean 类型。
</blockquote>


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



`goOnline()` 和 `goOffline()` 方法用于手动建立连接和断开连接。

例如：

```java

// 建立连接
SyncReference presenceRef = WilddogSync.getInstance().getReference();
presenceRef.goOnline();

// 断开连接
SyncReference presenceRef = WilddogSync.getInstance().getReference();
presenceRef.goOffline();
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  一个应用可以创建多个 Wilddog Sync 实例，但多个实例只会复用同一个长连接。 并且`goOffline()`方法 和 `goOnline()`方法会控制全局的在线和离线。
</blockquote>


## 数据本地持久化

数据本地持久化是针对移动网络稳定性差而开发的功能特性。默认情况下，Wilddog Sync 的数据存储在内存中，一旦重启，内存数据将被清除。开启数据本地持久化功能，可以使设备重启后无需再同步云端。有助于节省流量和提升重启后的访问速度。

数据持久化包含以下两个特性：

| 特性     | 说明                    |
| ------ | --------------------- |
| 离线查询   | 在无网环境时仍然可以查询数据。       |
| 发送离线数据 | 在无网环境时操作的数据会在重新连接时发送。 |

`setPersistenceEnabled` 方法用于开启数据持久化

```java
WilddogSync.setPersistenceEnabled(true)
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  必须在创建第一个 Wilddog Sync 实例之前开启持久化。
</blockquote>


### 离线查询

开启数据持久化，Wilddog Sync 会将查询到的数据存储到设备。在无网环境时，应用仍然可以查询之前存储的数据。

例如，有网络时，在 [班级示例应用](https://class-demo.wilddogio.com/) 中查询得分最高的四位学生：

```java
 SyncReference scoresRef = WilddogSync.getInstance().getReference("scores");
 scoresRef.orderByValue().limitToFirst(4).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                Log.d(TAG,"The"+dataSnapshot.getKey()+"student's score is"+dataSnapshot.getValue());
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```

然后网络断开，重新启动应用去查询考分最高的两位学生：

```java
 SyncReference scoresRef = WilddogSync.getInstance().getReference("scores");
 scoresRef.orderByValue().limitToFirst(2).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                Log.d(TAG,"The"+dataSnapshot.getKey()+"student's score is"+dataSnapshot.getValue());
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```

如上例所示，在离线情况下，仍然成功的查询到了数据。

### 发送离线数据

开启数据持久化，在无网环境下，应用的所有数据操作都会自动保存，当应用重新连接网络，这些数据将自动发送到云端。