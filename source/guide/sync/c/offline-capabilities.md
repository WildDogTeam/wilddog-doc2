title:  离线功能
---

本篇文档介绍离线功能的实现。

C/嵌入式 SDK 为每个引用建立长连接，所有该引用的通讯都是基于这个长连接。
长连接实现了连接的维持和数据的重传，使得客户端即使在弱网情况下也能继续工作。此外还提供离线状态事件的接口，使得 Wilddog 云端能监听客户端的离线状态。

## 离线事件

云端监听到客户端断开连接后自动触发一些事件，称为离线事件。例如，当一个用户的网络连接中断时，自动标记该客户端为“离线”状态。
断开连接包括客户端主动断开连接，或者意外的网络中断，比如客户端应用崩溃等。触发事件可以理解为执行特定的数据操作。数据操作支持数据的写入、追加和删除，如下：

方法 |  说明 
---- | ------
wilddog_onDisconnectSetValue()  | 当客户端离线时，对当前节点执行写操作。 
wilddog_onDisconnectPush()  | 当客户端离线时，在当前节点下新增一个子节点，子节点的 key 由云端生成。
wilddog_onDisconnectRemoveValue()   | 当客户端离线时，删除当前节点的数据。
wilddog_cancelDisconnectOperations()  | 取消之前所设置的离线事件。
wilddog_goOffline()   | 客户端设置为离线状态。
wilddog_goOnline()  | 客户端连接云端。

**注意：客户端若没有调用 wilddog_goOffline(), 直接关机或者断网，离线事件的触发有 3 分钟的延迟**

以下是使用`wilddog_onDisconnectSetValue()`方法，在客户端离线时，云端把客户端的状态设置为离线：

```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline set error!");
        return;
    }
    wilddog_debug("offline set success!");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    //用户自定义参数，这里的用途为：初始化为FALSE，回调函数中设为TRUE
    //因此可以在main函数中得知是否成功
    BOOL isFinish = FALSE;
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL;

    /* create a node the value is offline  */
    p_node = wilddog_node_createUString(NULL,"offline");

    //<url>即希望设置数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl("<url>");

    //注意，这里省略了对wilddog_onDisconnectSetValue返回值的检查
    wilddog_onDisconnectSetValue(wilddog, p_node, onSetCallback, (void*)&isFinish);
    wilddog_node_delete(p_node);

    while(1){
        if(TRUE == isFinish){
            wilddog_debug("set success!");
            break;
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
## 离线功能的实现机制

C/嵌入式 SDK 是基于 UDP 和 Wilddog 云端进行交互的，一旦调用 `wilddog_initWithUrl()` 初始化，SDK 就会和你的 url 建立起连接并在其后发送心跳包维持该连接。SDK 会实时对当前网络环境进行探测，当探测到网络环境变差时心跳包的发送频率会提高。探测和心跳包的发送是在 `wilddog_trySync()` 中实现的，最好在程序空闲时频繁调用，如下：

``` c
    while(1){
        wilddog_trySync();
    }
```

另一方面，客户端网络恢复正常后，sdk 会自动尝试与云端建立连接，一旦成功，之前的的监听仍然有效。