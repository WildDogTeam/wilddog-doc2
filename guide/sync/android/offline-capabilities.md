title:  离线功能
---
WilddogSync 内部的实现机制能使你的应用在弱网环境下仍能继续工作。此外，还能监听客户端的在线状态，以及设置离线事件。

## 监控连接状态

在许多应用场景下，客户端需要知道自己是否在线。WilddogSync 客户端提供了一个特殊的数据地址：/.info/connected。每当客户端的连接状态发生改变时，这个地址的数据都会被更新。
``` java
WilddogSync connectedRef = new WilddogSync("https://samplechat.wilddogio.com/.info/connected");
connectedRef.addValueEventListener(new ValueEventListener() {

    public void onDataChange(DataSnapshot snapshot) {
        boolean isOnline = (Boolean) snapshot.getValue();
        if (isOnline == true) {
            System.out.println("客户端上线了。");
        } else {
            System.out.println("客户端掉线了。");
        }
    }

    public void onCancelled(WilddogError error) {
        System.err.println("监听失败或被取消。");
    }
});

```
/.info/connected的值是boolean类型的，它不会和云端进行同步。

## 离线事件

如果你想在监听到客户端断线后自动触发一些事件。例如，当一个用户的网络连接中断时，希望标记这个用户为“离线”状态。WilddogSync 提供的离线事件功能实现这一需求。

离线事件能在云端检测到客户端连接断开时，将指定的数据写入云数据库中。不论是客户端主动断开，还是意外的网络中断，甚至是客户端应用崩溃，这些数据写入动作都将会被执行。因此我们可以依靠这个功能，在用户离线的时候，做一些数据清理工作。WilddogSync 支持的所有数据写入动作，包括 setValue(), updateChildren()，removeValue()，都可以设置在离线事件中执行。

下面是一个例子，使用`onDisconnect()`方法，在客户端连接断开的时候写入数据：

```java
presenceRef.onDisconnect().setValue("I disconnected!");
```

**离线事件是如何工作的**

当进行了一个`onDisconnect()`调用之后，这个事件将会被记录在云端。云端会监控每一个客户端的连接。如果发生了超时，或者客户端主动断开连接，云端就触发记录的离线事件。

客户端可以通过回调方法，确保离线事件被云端成功记录了：

```java
WilddogSync ref = new WilddogSync("https://samplechat.wilddogio.com/android/onDisconnect");

ref.onDisconnect().setValue("I disconnected!", new WilddogSync.CompletionListener() {
    public void onComplete(WilddogError error, WilddogSync ref) {
        if (error == null) {
            System.out.println("设置离线事件成功。");
        }
    }
});
```

要取消一个离线事件，可以使用`cancel()`方法：

```java
WilddogSync onDisconnectRef = presenceRef.onDisconnect();
onDisconnectRef.set('I disconnected');
// 取消离线事件
onDisconnectRef.onDisconnect().cancel();
```
## 云端时间戳
WilddogSync 提供了一种将云端时间戳作为数据写入的机制。这个机制和`onDisconnect()`方法组合起来，很容易实现记录客户端断线时间的功能：

```java
WilddogSync userLastOnlineRef = new WilddogSync("https://samplechat.wilddogio.com/users/joe/lastOnline");
userLastOnlineRef.onDisconnect().setValue(ServerValue.TIMESTAMP);
```

另外，WilddogSync 提供一种查看本地时间和服务器时间差的机制。本地时间和客户端时间差保存在 `/.info/serverTimeOffset` 中,你可以通过`addValueEventListener()` 或者`addListenerForSingleValueEvent()` 监听 `onDataChange` 事件来获取这个数据:

```java
WilddogSync userLastOnlineRef = new WilddogSync("https://samplechat.wilddogio.com/.info/serverTimeOffset");
userLastOnlineRef.addValueEventListener(new ValueEventListener() {
    public void onDataChange(DataSnapshot snapshot) {

        long timeDiff = (Long) snapshot.getValue();
        long serverTime = System.currentTimeMillis() + timeDiff;

        System.out.println("服务器和本地的时间差值为：" + timeDiff);
        System.out.println("当前服务器时间戳为：" + serverTime);

    }

    public void onCancelled(WilddogError error) {
    }
});
```
如果你只是想简单的获取服务端时间，可以用 rest API [Server Values](/api/sync/rest.html#Server-Values)。即向 `<appId>.wilddogio.com/.json?sv=timestamp` 发一个 `GET` 请求即可。

## 手动建立或断开连接
WilddogSync 也提供了手动建立（WilddogSync.goOnline()）或者断开 （WilddogSync.goOffline()）连接的方法。示例如下：

另外，需要说明的是，一个客户端可以实例化多个 WilddogSync 对象，但多个对象不会创建多个连接，会复用同一个长连接。 并且 `goOffline` 和 `goOnline` 会控制`全局`的在线和离线。 

## 离线功能的实现机制

WilddogSync 云端会每隔 20s 发一个心跳包给客户端，用于检测与客户端的连接是否正常。如果一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，服务端无法立即感知到客户端断开，只能等到心跳超时后才确定客户端已经离线。此时才会执行一些操作，如执行离线事件（如果设置的有，这也是离线事件执行可能有延迟的原因），重试连接等。
另外，重试连接连上之后，之前设置的监听仍然有效。







