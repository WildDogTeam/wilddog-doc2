title:  离线功能
---

本篇文档介绍离线功能的实现。

C/嵌入式 SDK 为每个引用建立长连接，所有该引用的通讯都是基于这个连接。

SDK 内部的实现机制使你的设备在弱网环境下仍能继续工作。此外，还能设置离线事件。

## 离线事件

离线事件是云端与客户端断开连接时自动触发的事件。

断开连接包括客户端主动断开连接，或者意外的网络中断。触发事件即执行特定的数据操作，它支持离线写入，更新和删除数据方法：

方法 |  说明 
---- | ------
wilddog_onDisconnectSetValue()  | 当客户端离线时，对当前节点执行写操作。 
wilddog_onDisconnectPush()  | 当客户端离线时，在当前节点下新增一个子节点，子节点的 key 由云端生成。
wilddog_onDisconnectRemoveValue()   | 当客户端离线时，删除当前节点的数据。
wilddog_cancelDisconnectOperations()  | 取消之前所设置的离线事件。

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  客户端若没有调用 [wilddog_goOffline()](/guide/sync/c/offline-capabilities.html#手动建立或断开连接)，直接关机或者断网，离线事件的触发有 3 分钟的延迟。
</blockquote>

例如，当用户的网络连接中断时，使用`wilddog_onDisconnectSetValue()` 方法，记录这个用户已经离线：

```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline set error!");
        return;
    }
    wilddog_debug("Offline set success!");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL;

    //本地组装节点 "disconnect"，当离线时设置为 "yes"
    p_node = wilddog_node_createUString(NULL,"yes");

    //<appId>即你应用的 appId，"/disconnect" 为节点的路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/disconnect");

    //注意，这里省略了对wilddog_onDisconnectSetValue返回值的检查
    wilddog_onDisconnectSetValue(wilddog, p_node, onSetCallback, NULL);
    wilddog_node_delete(p_node);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

## 手动建立或断开连接

`wilddog_goOffline()`，`wilddog_goOnline()` 方法用于手动建立连接和断开连接。


例如：

```c
int main(void){
    //计数器，自加到1000 主动断线。
    int cnt = 0;
    Wilddog_T wilddog = 0;

    //<appId>即你应用的 appId
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com");
    
    wilddog_goOnline();
    while(1){
        if(++cnt > 1000){
            wilddog_goOffline();
            break;
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  一个应用可以创建多个 Wilddog Sync 实例，但多个实例只会复用同一个长连接。 并且 `wilddog_goOffline()` 和 `wilddog_goOnline()` 方法会控制全局的在线和离线。
</blockquote>

## 离线功能的实现机制

客户端会周期的向云端发一个心跳包，云端用此检测与客户端的连接是否正常。心跳包发送的周期由 SDK 根据当前网络状况计算。

当前网络状况的探测和心跳包的发送是在 `wilddog_trySync()` 中实现的，在程序空闲时务必频繁调用，如下：

``` c
    while(1){
        wilddog_trySync();
    }
```

一些异常情况，如程序崩溃、断电、手机没有信号等导致客户端断开连接，云端只能等到心跳超时后才确定客户端已经离线。由于云端心跳包的超时时间为 3 分钟，因而离线事件的执行在这些异常情况下会有 3 分钟的延迟。

另一方面，客户端网络恢复正常后，会自动尝试与云端建连，一旦成功，之前设置的监听仍然有效。