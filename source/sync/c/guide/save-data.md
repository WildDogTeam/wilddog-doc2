title:  保存数据
---

以下两种方法可用于将数据写入野狗云端：

方法 |  说明 
----|------
wilddog_setValue() | 将数据写入当前节点，如果指节点已存在数据，那么数据将会被覆盖。 
wilddog_push() | 添加数据到列表。向当前节点下添加数据，由野狗自动生成唯一key。例如向 /posts 路径下 push 数据，数据会写入到/posts/<unique-post-id>下。
 

## 用 wilddog_setValue() 写入数据


`wilddog_setValue()`是最基本的写数据操作，它会立即将数据写入当前引用指向的节点，你可以在回调函数中检测是否修改成功。该节点下任何原有数据都将被删除和覆盖，包括其子节点的数据。
例如，为房间利用`wilddog_setValue()`修改 led 状态信息，如下所示：

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
----

## 使用 wilddog_push() 追加新节点

当多个用户同时试图在一个节点下新增一个子节点的时候，这时，数据就会被重写覆盖。
为了解决这个问题，`wilddog_push()`采用了生成唯一 ID 作为`key`的方式。通过这种方式，多个用户同时在一个节点下面`push`数据，他们的 key 一定是不同的。这个`key`是通过一个基于时间戳和随机算法生成的，即使在一毫秒内也不会相同，并且表明了时间的先后，Wilddog 采用了足够多的位数保证唯一性。

用户可以用`wilddog_push()`向`message`节点写新内容：
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
----

**获取唯一ID**
新增数据对应的`key`既为`wilddog_push()`所注册的回调函数中的第一个入参`p_path`，

```c
// 在回调中获取新增数据对应的 key
STATIC void onPushCallback(u8 *p_path,void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("push failed");
        return;
    }
    wilddog_debug("new key is %s", p_path);
    *(BOOL*)arg = TRUE;
    return;
}

```
## 删除数据
删除引用所指向节点的所有数据通过调用`wilddog_removeValue()`实现，同时必须注册一个回调函数以判断删除操作是否成功。
以下例子删除`/room/`节点下的所有数据，并在`onDeleteCallback()`中判断删除操作是否成功。

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
----
