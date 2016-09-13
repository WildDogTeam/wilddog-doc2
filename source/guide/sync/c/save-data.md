title:  操作数据
---
本篇文档介绍操作数据的方法。

以下两种方法用于写入数据：

方法 |  说明 
----|------
wilddog_setValue() | 向某个节点写入数据。若此节点已存在数据，会覆盖这些数据。 
wilddog_push() | 向某个节点添加子节点。子节点的 key 由野狗自动生成并保证唯一，value 是你要写入的数据。
 

## 写入数据


`wilddog_setValue()` 方法向某个节点写入数据。若节点已有数据，会覆盖原有数据，包括其子节点的数据。注册的回调函数用于判断写入操作是否成功。

例如，为房间利用 `wilddog_setValue()` 修改 led 状态信息，如下所示 ：

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
    Wilddog_Node_T *p_head= NULL,*p_node = NULL;

    /* create a node to "wilddog", led = on */
    p_head = wilddog_node_createObject(NULL);
    p_node = wilddog_node_createUString("led","on");
    wilddog_node_addChild(p_head, p_node);
    //<appid>即你应用的 appid
    wilddog = wilddog_initWithUrl("coaps://<appid>.wilddogio.com/room");

    //注意，这里省略了对wilddog_onDisconnectSetValue返回值的检查
    wilddog_setValue(wilddog, p_head, onSetCallback, (void*)&isFinish);
    wilddog_node_delete(p_head);

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

## 追加子节点

`wilddog_push()` 方法会生成唯一 ID 作为 key ，要写入的数据作为 value ，进行数据写入。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，它标明了时间的先后。注册的回调函数用于判断追加操作是否成功。

例如，追加子节点到 `message`节点 ：

```c
STATIC void onPushCallback(u8 *p_path,void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("push failed");
        return;
    }
    wilddog_debug("new path is %s", p_path);
    *(BOOL*)arg = TRUE;
    return;
}

int main(void){
    //用户自定义参数，这里的用途为：初始化为FALSE，回调函数中设为TRUE
    //因此可以在main函数中得知是否成功
    BOOL isFinish = FALSE;
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL, *p_head = NULL;

    //建立一个object节点，即类似json中的{}
    p_head = wilddog_node_createObject(NULL);

    //建立一个key为2，value为数字1234的节点
    p_node = wilddog_node_createUString("message","something happen");

    //将节点p_node添加到object中
    wilddog_node_addChild(p_head, p_node);
    
    //<appid>即你应用的appid
    wilddog = wilddog_initWithUrl("coaps://<appid>.wilddogio.com/room");

    //把新的object推送到云端
    //注意，这里省略了对wilddog_push返回值的检查
    wilddog_push(wilddog, p_head, onPushCallback, (void *)&isFinish);

    //数据已经推送，删除刚才建立的节点
    wilddog_node_delete(p_head);

    while(1){
        if(isFinish){
            wilddog_debug("push success!");
            break;
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

`push` 回调函数中第一个参数为新增数据的路径。

```c
// 在回调中获取新增数据对应的 key
STATIC void onPushCallback(u8 *p_path,void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("push failed");
        return;
    }
    wilddog_debug("new path is %s", p_path);
    *(BOOL*)arg = TRUE;
    return;
}

```
## 删除数据

`wilddog_removeValue()` 方法用于删除数据：
例如，删除`/room/`节点下的所有数据：

```c
STATIC void onDeleteCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("delete failed!");
        return;
    }
    wilddog_debug("delete success!");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    //用户自定义参数，这里的用途为：初始化为FALSE，回调函数中设为TRUE
    //因此可以在main函数中得知是否成功
    BOOL isFinished = FALSE;
    Wilddog_T wilddog;
    //<appId> 为你自己的appId
    wilddog = wilddog_initWithUrl("coaps://<appid>.wilddogio.com/room");

    //注意，这里省略了对wilddog_removeValue返回值的检查
    wilddog_removeValue(wilddog, onDeleteCallback, (void*)&isFinished);

    while(1){
        if(TRUE == isFinished){
            wilddog_debug("remove success!");
            break;
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

**注意**：Sync 不会保存 value 为 null 的节点。如果某节点的值为 null，云端会删除这个节点。
