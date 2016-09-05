title:  C/OpenWRT API 文档
---

# Wilddog (*Methods*)

## wilddog\_initWithUrl()

定义

Wilddog\_T wilddog\_initWithUrl(Wilddog\_Str\_T \*url)

说明

初始化应用 URL 对应的 Wilddog 引用。

参数
* Wilddog\_Str\_T *`url` : 应用URL。Wilddog 中任何数据都能够通过一个URL来进行访问，如`coap[s]://<appId>.wilddogio.com/<path>` 
其中<appId\>为开发者在 Wilddog 平台申请的应用id。
<path\>为客户端关注的路径。

返回值

`Wilddog_T` 类型Wilddog引用的id，如果创建失败，返回0。

示例
```c 
int main(){
    //初始化引用
    Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy/device/light/10abcde");

    //do something
    ...

    //销毁引用
    wilddog_destroy(&wilddog);
}
```
----

## wilddog\_destroy()

定义

Wilddog\_Return\_T wilddog\_destroy(Wilddog\_T \*p\_wilddog)

说明

销毁一个引用并回收内存。
 
参数

* p_wilddog `Wilddog_T* ` : 当前节点引用id的地址。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败。

示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//销毁引用
wilddog_destroy(&wilddog);
```
----

## wilddog\_getValue()

定义

Wilddog\_Return\_T wilddog\_getValue(Wilddog\_T wilddog, onQueryFunc callback, void* arg)

说明

获取当前节点的数据,数据格式为`Wilddog_Node_T`(类似JSON)。
 
参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* callback `onQueryFunc` : 服务端回应数据或者回应超时触发的回调函数,类型是`void (*onQueryFunc)(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err)`,其中`p_snapshot`是取回的数据镜像（err为200时）或者NULL，退出函数后即被销毁, `arg`为用户传递的值, `err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。
 
示例
```c
STATIC void onQueryCallback(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err){
    if(err != WILDDOG_HTTP_OK){
        wilddog_debug("query error!");
        return;
    }
    wilddog_debug("query success!");
    if(p_snapshot){
        *(Wilddog_Node_T**)arg = wilddog_node_clone(p_snapshot);
    }
    return;
}
int main(void){
    Wilddog_T wilddog = 0;

    //用户自定义参数，这里的用途为：将云端发回的数据clone到本地
    Wilddog_Node_T * p_node = NULL;

    //<url>即希望获取数据的url，如https://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_getValue返回值的检查
    wilddog_getValue(wilddog, onQueryCallback, (void*)(&p_node));

    while(1){
        if(p_node){

            //打印得到的节点数据
            _wilddog_debug_printnode(p_node);
            ...
            wilddog_node_delete(p_node);
        }
        wilddog_trySync();
    }
    ...
    wilddog_destroy(&wilddog);
}
```
----
## wilddog\_setValue()

定义

Wilddog\_Return\_T wilddog\_setValue(Wilddog\_T wilddog, Wilddog\_Node\_T \*p\_node, onSetFunc callback, void \*arg)

 说明

设置当前节点的数据,数据格式为`Wilddog_Node_T`。
 
参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* p_node `Wilddog_Node_T` : 指向节点数据的指针，注意，头节点即为当前的 wilddog 节点。
* callback `onSetFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`void (*onSetFunc)(void* arg, Wilddog_Return_T err)`,其中`arg`为用户传递的值,`err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

示例
```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("set error!");
        return;
    }
    wilddog_debug("set success!");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    //用户自定义参数，这里的用途为：初始化为FALSE，回调函数中设为TRUE
    //因此可以在main函数中得知是否成功
    BOOL isFinish = FALSE;
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL;

    /* create a node to "wilddog", value is "123456" */
    p_node = wilddog_node_createUString(NULL,"123456");

    //<url>即希望设置数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_setValue返回值的检查
    wilddog_setValue(wilddog, p_node, onSetCallback, (void*)&isFinish);

    //数据已经设置到云端，删除刚才建立的节点
    wilddog_node_delete(p_node);

    while(1){
        if(TRUE == isFinish){
            wilddog_debug("set success!");
            ...
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
----
## wilddog\_push()

 定义

Wilddog\_Return\_T wilddog\_push( Wilddog\_T wilddog, Wilddog\_Node\_T \*p\_node, onPushFunc callback, void \*arg)
说明

在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成。

参数 

* wilddog `Wilddog_T` : 当前节点引用的id。
* p_node `Wilddog_Node_T*` : 指向新增节点数据的指针，注意，头节点即为当前的 wilddog 节点。
* callback `onPushFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`(*onPushFunc)(Wilddog_Str_T * p_newPath, void* arg, Wilddog_Return_T err)`,其中 `p_newPath` 是新增节点的完整路径,`arg` 为用户传递的值,`err` 为状态码。 
* arg `void*` : 用户给回调函数传入的参数。

 返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

 示例
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
    p_node = wilddog_node_createNum("2",1234);

    //将节点p_node添加到object中
    wilddog_node_addChild(p_head, p_node);
    
    //<url>即希望推送数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

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

## wilddog\_removeValue()

定义

Wilddog\_Return\_T wilddog\_removeValue(Wilddog\_T wilddog, onRemoveFunc callback, void \*arg)

说明

删除当前节点及节点下所有数据。

参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* callback `onRemoveFunc` : 服务器回应或者回应超时触发的回调函数，类型是`void (*onRemoveFunc)(void* arg, Wilddog_Return_T err)`,其中`arg` 为用户传递的值,`err` 为状态码。
* arg `void*` : 用户传给回调函数的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

示例
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

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

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

## wilddog\_addObserver()

定义

Wilddog\_Return\_T wilddog\_addObserver(Wilddog\_T wilddog, Wilddog\_EventType\_T event, onEventFunc onDataChange, void \*dataChangeArg)

说明

监听某节点的数据变化。一旦该数据发生改变, `onDataChange`函数将被调用。

参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* event `Wilddog\_EventType\_T ` : 关注的事件类型，见`Wilddog_EventType_T`定义。
* onDataChange `onEventFunc` : 数据变化所触发的回调函数，类型是`(*onEventFunc)(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err)`,其中`p_snapshot`是取回的数据镜像（err为200时）或者NULL，退出函数后即被销毁, `arg`为用户传递的值, `err`为状态码。 
* dataChangeArg `void*` : 传给回调函数的`arg`。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

 示例
```c
STATIC void onObserverCallback(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err){
    if(err != WILDDOG_HTTP_OK){
        wilddog_debug("observe failed!");
        return;
    }
    wilddog_debug("observe data!");
    return;
}
int main(void){
    //用户自定义参数，这里的用途为：初始化为FALSE，回调函数中设为TRUE
    //因此可以在main函数中得知是否成功
    BOOL isFinished = FALSE;
    Wilddog_T wilddog = 0;
    STATIC int count = 0;

    //<url>即希望订阅数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_addObserver返回值的检查
    wilddog_addObserver(wilddog, WD_ET_VALUECHANGE, onObserverCallback, (void*)&isFinished);

    while(1){
        if(TRUE == isFinished){
            //每次接收到推送count + 1
            wilddog_debug("get new data %d times!", count++);

            //重新设置接收状态为FALSE
            isFinished = FALSE;

            //count 超过10时，调用wilddog_removeObserver取消订阅，并退出
            if(count > 10){
                wilddog_debug("off the data!");
                wilddog_removeObserver(wilddog, WD_ET_VALUECHANGE);
                break;
            }
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
----

## wilddog\_removeObserver()
定义

Wilddog\_Return\_T wilddog\_removeObserver(Wilddog\_T \*p\_wilddog, Wilddog\_EventType\_T event)

说明

取消对某节点的监听(对应于on)。

参数

* p_wilddog `Wilddog_T*` : 当前节点引用的id。
* event `Wilddog_EventType_T` : 取消的事件类型。

返回值

`Wilddog_Return_T`返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

 示例

见wilddog\_addObserver的示例。

----

## wilddog\_onDisconnectSetValue()

定义

Wilddog\_Return\_T wilddog\_onDisconnectSetValue(Wilddog\_T wilddog, Wilddog\_Node\_T \*p\_node, onDisConnectFunc callback, void\* arg)

说明

当该客户端离线时，云端自动执行该操作，设置当前节点的数据，数据格式为`Wilddog_Node_T`。
 
 参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* p_node `Wilddog_Node_T` : 指向离线时设置的节点数据的指针，注意，头节点即为当前的 wilddog 节点。
* callback `onDisConnectFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`void (*onDisConnectFunc)(void* arg, Wilddog_Return_T err)`,其中`arg`为用户传递的值,`err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

 示例
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

    /* create a node to "wilddog", value is "123456" */
    p_node = wilddog_node_createUString(NULL,"123456");

    //<url>即希望设置数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_onDisconnectSetValue返回值的检查
    wilddog_onDisconnectSetValue(wilddog, p_node, onSetCallback, (void*)&isFinish);
    wilddog_node_delete(p_node);

    while(1){
        if(TRUE == isFinish){
            wilddog_debug("set success!");
            ...
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
----
## wilddog\_onDisconnectPush()

 定义

Wilddog\_Return\_T wilddog\_onDisconnectPush( Wilddog\_T wilddog, Wilddog\_Node\_T \*p\_node, onDisConnectFunc callback, void\* arg)

说明

当该客户端离线时，云端自动执行该操作，在当前节点下生成一个子节点。子节点的key利用服务端的当前时间生成。

参数 

* wilddog `Wilddog_T` : 当前节点引用的id。
* p_node `Wilddog_Node_T*` : 指向离线时新增节点数据的指针，注意，头节点即为当前的 wilddog 节点。
* callback `onDisConnectFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`(*onDisConnectFunc)(void* arg, Wilddog_Return_T err)`,其中`arg`为用户传递的值,`err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

示例
```c
STATIC void onPushCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline push failed");
        return;
    }
    wilddog_debug("offline push success");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    BOOL isFinish = FALSE;
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL, *p_head = NULL;
    p_head = wilddog_node_createObject(NULL);
    p_node = wilddog_node_createNum("2",1234);
    wilddog_node_addChild(p_head, p_node);
    
    //<url>即希望推送数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_onDisconnectPush返回值的检查
    wilddog_onDisconnectPush(wilddog, p_head, onPushCallback, (void *)&isFinish);
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

## wilddog\_onDisconnectRemoveValue()

定义

Wilddog\_Return\_T wilddog\_onDisconnectRemoveValue(Wilddog\_T wilddog, onDisConnectFunc callback, void\* arg)

说明

当该客户端离线时，云端自动执行该操作，删除当前节点及节点下所有数据。

 参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* callback `onDisConnectFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`(*onDisConnectFunc)(void* arg, Wilddog_Return_T err)`,其中`arg`为用户传递的值,`err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

示例
```c
STATIC void onDeleteCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline delete failed!");
        return;
    }
    wilddog_debug("offline delete success!");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    BOOL isFinished = FALSE;
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_onDisconnectRemoveValue返回值的检查
    wilddog_onDisconnectRemoveValue(wilddog, onDeleteCallback, (void*)&isFinished);

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

## wilddog\_cancelDisconnectOperations()

定义

Wilddog\_Return\_T wilddog\_cancelDisconnectOperations(Wilddog\_T wilddog, onDisConnectFunc callback, void\* arg)

说明

取消之前设置的离线事件。

 参数

* wilddog `Wilddog_T` : 当前节点引用的id。
* callback `onDisConnectFunc` : 服务端回应或者回应超时触发的回调函数 ,类型是`(*onDisConnectFunc)(void* arg, Wilddog_Return_T err)`,其中`arg`为用户传递的值,`err`为状态码。
* arg `void*` : 用户给回调函数传入的参数。

 返回值

`Wilddog_Return_T` 返回 `0`:成功 `<0`:失败，返回码见`wilddog.h`。

示例
```c
STATIC void onCancelCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline operation cancel failed!");
        return;
    }
    wilddog_debug("offline operation cancel success!");
    *(BOOL*)arg = TRUE;
    return;
}
int main(void){
    BOOL isFinished = FALSE;
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_cancelDisconnectOperations返回值的检查
    wilddog_cancelDisconnectOperations(wilddog, onCancelCallback, (void*)&isFinished);

    while(1){
        if(TRUE == isFinished){
            wilddog_debug("operation cancel success!");
            break;
        }
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
----
## wilddog_goOffline()

 定义

void wilddog_goOffline(void)

说明

通过调用`wilddog_goOffline` 断开客户端和云端的连接，之前若注册了离线事件则云端会触发断线事件。

 返回值

void

----
## wilddog_goOnline()

 定义

void wilddog_goOnline(void)

说明

通过调用`wilddog_goOnline` 若客户端处于离线状态，则重新连接云端服务，之前若注册了监听事件，则 SDK 回重新发送监听请求，这时候需要注意监听回调的触发并非代表云端数据有修改，而重连时获取的数据。

 返回值

void

----

## wilddog\_trySync()

 定义

void wilddog\_trySync(void)

说明

通过调用`wilddog_trySync`来向Wilddog云端同步数据。每次调用都会处理来自云端的推送和请求超时的重发、长连接的维持 ，触发用户注册的回调函数。

 返回值

void

----

## wilddog\_increaseTime()

定义

void wilddog\_increaseTime(u32 ms)。

 说明

用于校准 Wilddog 的时钟(可以在定时器中调用)。一般情况下 Wilddog 会根据自己推算的时间执行业务操作，这个时间的推算会有偏差，我们可以通过传入一个时间增量来校准 Wilddog 时钟。

 参数

* ms `u32 ` : 增加的时间(单位为毫秒)。

 返回值

void

 示例
```c
void timer_isr()
{
    //this isr is been called per ms。

    wilddog_increaseTime(1);
}
```
----
# Wilddog(*Properties*)

## wilddog\_getParent()

 定义

Wilddog\_T wilddog\_getParent(Wilddog\_T wilddog)

 说明

获取父节点引用的id。如果当前节点是root节点，创建失败，返回0。

 参数

* wilddog `Wilddog_T` : 当前节点引用的id。

 返回值

返回父节点引用的id，如果创建失败，返回0。

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//定位到user
Wilddog_T parent = wilddog_getParent(wilddog);
```
----
## wilddog\_getRoot()

 定义

Wilddog\_T wilddog\_getRoot(Wilddog\_T wilddog)

 说明

获取根节点引用的id。

 参数

* wilddog `Wilddog_T` : 当前节点引用的id。

 返回值

Wilddog\_T `root` : 根节点引用的id，如果失败，返回0。 

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//定位到root("/")
Wilddog_T root = wilddog_getRoot(wilddog);
```
----

## wilddog\_getChild()

 定义

Wilddog\_T wilddog\_getChild(Wilddog\_T wilddog, Wilddog\_Str\_T \*childName)

 说明

获取当前引用下名字为childName的子节点引用的id。

 参数

wilddog `Wilddog_T` : 当前引用的id。

childName `Wilddog_Str_T*` : 子节点的相对路径，多级子节点需用'/'隔开，即使子节点不存在也能创建。

 返回值

`Wilddog_T` 子节点引用的id，如果创建失败，返回0。

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//定位到user/jackxy/aaa
Wilddog_T child = wilddog_getChild(wilddog, "aaa");
```
----

## wilddog\_getKey()

 定义

Wilddog\_Str\_T \*wilddog\_getKey(Wilddog\_T wilddog)

 说明

获取当前引用的key。

 参数

wilddog `Wilddog_T` : 当前引用的id。

 返回值

`Wilddog_Str_T` 当前引用的key值，如果获取失败，返回NULL。

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//获取Key值（即jackxy）
Wilddog_Str_T *key = wilddog_getKey(wilddog);
```
----

## wilddog\_getHost()

 定义

Wilddog\_Str\_T \*wilddog\_getHost(Wilddog\_T wilddog)

 说明

获取当前引用的host。

 参数

wilddog `Wilddog_T` : 当前引用的id。

 返回值

`Wilddog_Str_T` 当前引用的host，如果获取失败，返回NULL。

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//获取host（即<appId>.wilddogio.com）
Wilddog_Str_T *host = wilddog_getHost(wilddog);
```
----

## wilddog\_getPath()

 定义

Wilddog\_Str\_T \*wilddog\_getPath(Wilddog\_T wilddog)

 说明

 获取当前节点的path。

 参数

wilddog `Wilddog_T` : 当前节点的引用id。

 返回值

`Wilddog_Str_T` 当前引用的path，如果获取失败，返回NULL。

 示例
```c
//定位到user/jackxy
Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy");

//获取path（即/user/jackxy）
Wilddog_Str_T *path = wilddog_getPath(wilddog);
```
----

# Node(*Methods*)

##wilddog\_node\_createObject()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createObject(Wilddog_Str\_T \*key)

 说明

创建一个 Object 类型的节点，Object 类型的节点，通俗的来说就是非叶子节点，这种类型的节点的子节点就是它们的值。

 参数

* key `Wilddog_Str_T* ` : 节点的key值。

 返回值

创建成功则返回该节点的指针，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_node = wilddog_node_createObject((Wilddog_Str_T *)"123");
```

----

## wilddog\_node\_createUString()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createUString(Wilddog\_Str\_T \*key, Wilddog\_Str\_T \*value)

 说明

创建一个字符串类型节点。

 参数

* key `Wilddog_Str_T*` : 节点的key值。
* value `Wilddog_Str_T*` : 指向utf-8字符串的指针。

 返回值

`Wilddog_Node_T` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_node = wilddog_node_createUString((Wilddog_Str_T *)"this is key",(Wilddog_Str_T *)"this is value");
```

----

##wilddog\_node\_createBString()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createBString(Wilddog\_Str\_T \*key, u8 \*value, int len)

 说明

创建一个二进制数组类型节点。

 参数

* key `Wilddog_Str_T*` : 节点的key值。
* value `u8*` : 二进制数组的指针。
* len `int` : 数据的长度(字节)。

 返回值

`Wilddog_Node_T*` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
u8 data[8] = {0};
...
Wilddog_Node_T *p_node = wilddog_node_createBString((Wilddog_Str_T *)"this is key", data, 8);
```

----

## wilddog\_node\_createFloat()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createFloat(Wilddog\_Str\_T \*key, wFloat num)

 说明

创建一个浮点类型的节点。

 参数

* key `Wilddog_Str_T *` : 节点的key值。
* num `wFloat` : 浮点数据(8位机器为32bits, 其他为64bits)。

 返回值

`Wilddog_Node_T *` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
wFloat data = 1.234;
Wilddog_Node_T *p_node = wilddog_node_createFloat((Wilddog_Str_T *)"this is key", data);
```

----

## wilddog\_node\_createNum()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createNum(Wilddog\_Str\_T \*key, s32 num)

 说明

创建一个整数类型节点，只支持32位整型。

 参数

* key `Wilddog_Str_T*` : 节点的key值。
* num `s32` : 32位有符号整数。

 返回值

`Wilddog_Node_T ` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
s32 data = 1;
Wilddog_Node_T *p_node = wilddog_node_createNum((Wilddog_Str_T *)"this is key", data);
```

----

## wilddog\_node\_createNull()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createNull(Wilddog\_Str\_T \*key)。

 说明

创建一个Null类型节点，对应到JSON中即其值为 null 。

 参数

* key `Wilddog_Str_T*` : 节点的key值。

 返回值

`Wilddog_Node_T ` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_node = wilddog_node_createNull((Wilddog_Str_T *)"this is key");
```

----

## wilddog\_node\_createTrue()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createTrue(Wilddog\_Str\_T \*key)。

 说明

创建一个TRUE类型节点，对应到JSON中即其值为 true。

 参数

* key ` Wilddog_Str_T*` : 节点的key值。

 返回值

`Wilddog_Node_T ` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_node = wilddog_node_createTrue((Wilddog_Str_T *)"this is key");
```

----

## wilddog\_node\_createFalse()

 定义

Wilddog\_Node\_T \* wilddog\_node\_createFalse(Wilddog\_Str\_T \*key)。

 说明

创建一个FALSE类型节点，对应到JSON中即其值为 false。

 参数

* key `Wilddog_Str_T*` : 节点的key值。

 返回值

`Wilddog_Node_T ` 创建成功则返回节点的指针，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_node = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
```

----

## wilddog\_node\_addChild()

 定义

Wilddog\_Return\_T wilddog\_node\_addChild(Wilddog\_Node\_T \*parent, Wilddog\_Node\_T \*child)。

 说明

向一个节点添加子节点，成功后，child 节点成为父节点 parent 的子节点，parent 节点可以通过`parent->p_wn_child`或者`parent->p_wn_child->p_wn_next`（可能有多次`p_wn_next`，由 parent 节点的组成决定）的链表顺序查找方式找到。

 参数

* parent `Wilddog_Node_T*` : 指向父节点的指针，如果父节点不是 Object 类型，会自动转换为 Object 类型，原有的值会丢失。
* child `Wilddog_Node_T*` : 指向要添加的子节点的指针。

 返回值

`Wilddog_Return_T` 成功返回 `0`, 失败返回 `<0`的值。

 示例
```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);
```

----

## wilddog\_node\_delete()

 定义

Wilddog\_Return\_T wilddog\_node\_delete( Wilddog\_Node\_T \*head)

 说明

删除节点及其所有子节点。

 参数

* head `Wilddog_Node_T*` : 要删除节点的指针。

 返回值

`Wilddog_Return_T` 成功返回 `0`, 失败返回 `<0`的值。

 示例
```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

wilddog_node_delete(p_father); //会将 p_father 和子节点 p_child 全部删除
```

----

## wilddog\_node\_clone()

 定义

Wilddog\_Node\_T \* wilddog\_node\_clone( Wilddog\_Node\_T \*head)

 说明

拷贝当前节点及其下所有子节点。

 参数

* head `Wilddog_Node_T*` : 指向节点的指针。

 返回值

`Wilddog_Node_T` 成功返回当前节点副本的指针, 失败返回NULL。

 示例
```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

Wilddog_Node_T *p_clone = wilddog_node_clone(p_father); //会复制一个一模一样的副本，需要单独调用wilddog_node_delete 释放
```

----

## wilddog\_node\_find()

 定义

Wilddog\_Node\_T \*wilddog\_node\_find( Wilddog\_Node\_T \*root, char \*path)

 说明

root中查找相对路径下的节点。

 参数

* root `Wilddog_Node_T*` : 指向根节点的指针。
* path `char*` : 指向相对路径的指针。

 返回值

`Wilddog_Node_T` 成功返回节点指针, 失败返回NULL。

 示例
```c
Wilddog_Node_T *p_father = wilddog_node_createObject((Wilddog_Str_T *)"123");
Wilddog_Node_T *p_child = wilddog_node_createFalse((Wilddog_Str_T *)"this is key");
wilddog_node_addChild(p_father, p_child);

Wilddog_Node_T *p_find = wilddog_node_find(p_father, "this is key"); //p_find和p_child是同一个节点
```

----

## wilddog\_node\_getValue()

 定义

Wilddog\_Str\_T* wilddog\_node\_getValue(Wilddog\_Node\_T \*node, int \*len)

 说明

获取当前节点的value值，其中，值为true，false，null的节点无法通过这种方式获取，而应该直接根据节点的`d_wn_type`得出其类型，类型在`wildog.h`中定义。

 参数

* node `Wilddog_Node_T*` : 指向节点的指针。
* len `int*` : 输出参数，将存储value值的长度(字节)。

 返回值

`Wilddog_Node_T` 成功返回指向节点value的指针(可根据type和传出的len来转化)，失败返回NULL。

 示例
```c
Wilddog_Node_T *p_child = wilddog_node_createNum((Wilddog_Str_T *)"this is key",234);
int len = 0;
s32 value;
Wilddog_Str_T *p_data = wilddog_node_getValue(p_father, &len); //len 应和sizeof(s32)相同
value = (s32)(*p_data);
```

----

## wilddog\_node\_setValue()

 定义

Wilddog\_Return\_T (Wilddog\_Node\_T \*node, u8 \*value, int len)

 说明

设置当前节点的value值,其中，值为true，false，null的节点无法通过这种方式设置，整数类型和浮点类型的节点，len 应该为`sizeof(s32)`和`sizeof(wFloat)`。

 参数

* node `Wilddog_Node_T*` : 指向节点的指针。
* value `u8*` : 指向新value值的指针。
* len `int` : 新value的长度。

 返回值

`Wilddog_Return_T` 成功返回 `0`, 失败返回 `<0` 的数。

 示例
```c
Wilddog_Node_T *p_child = wilddog_node_createNum((Wilddog_Str_T *)"this is key",234);
int len = sizeof(s32);
s32 value = 456;
wilddog_node_setValue(p_father, &value, len);
```

----
# AuthData (*Methods*)

## wilddog\_auth()

 定义

Wilddog\_Return\_T wilddog\_auth(Wilddog\_Str\_T \*p\_host, u8 \*p\_auth, int len, onAuthFunc onAuth, void \*args)

 说明

发送auth数据到服务器进行认证，每个 host 只需要认证一次。

 参数

p_host `Wilddog_Str_T` : 进行auth认证的host字符串，如 `"<appId>.wilddogio.com"`。

p_auth `u8*` : 指向auth数据的指针，auth 数据可以使用其他端 sdk 的 token，或者[通过 wilddog token 生成器生成](https://z.wilddog.com/rule/guide#5-zi-ding-yi-token0)。

int `len` : auth数据的长度。

onAuthFunc `onAuth` : 服务端回应认证或者认证超时触发的回调函数，类型是`void (*onAuthFunc)(void* arg, Wilddog_Return_T err)`，其中`arg`为用户传递的值，（即下面的`args`），`err`为状态码，具体见`Wilddog_Return_T`定义。

args `void*` : 用户给回调函数传入的参数。

 返回值

`Wilddog_Return_T` 发送成功返回0，发送失败则返回负数。注意该返回值仅表明发送是否成功，确认是否在云端认证成功需要在回调函数中判断。

 示例
```c
void myOnAuthFunc(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_ERR_NOERR || err >= WILDDOG_HTTP_BAD_REQUEST){
        printf("auth fail!\n");
        return;
    }
    printf("auth success! %d\n", *(int*)arg);
    return;
}

//aquired a new auth token
char* newToken="ABCD1234567890";

wilddog_auth("aaa.wilddogio.com", newToken, strlen(newToken), myOnAuthFunc, NULL);
...
```
----

## wilddog\_unauth()

 定义

Wilddog\_Return\_T wilddog\_unauth(Wilddog\_Str\_T \*p\_host, onAuthFunc onAuth, void \*args)

 说明

取消和服务器的auth认证，，每个 host 只需要取消认证一次。

 参数

p_host `Wilddog_Str_T` : 进行auth认证的host字符串，如 `"<appId>.wilddogio.com"`。

onAuthFunc `onAuth` : 服务端回应认证或者认证超时触发的回调函数，类型是`void (*onAuthFunc)(void* arg, Wilddog_Return_T err)`，其中`arg`为用户传递的值，（即下面的`args`），`err`为状态码，具体见`Wilddog_Return_T`定义。

args `void*` : 用户给回调函数传入的参数。

 返回值

`Wilddog_Return_T` 发送成功返回0，发送失败则返回负数。注意该返回值仅表明发送是否成功，是否成功取消认证需要在回调函数中判断。

 示例
```c
void myOnAuthFunc(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_ERR_NOERR || err >= WILDDOG_HTTP_BAD_REQUEST){
        printf("auth fail!\n");
        return;
    }
    printf("hello world! %d\n", (int)arg);
    return;
}

wilddog_unauth("aaa.wilddogio.com", myOnAuthFunc, NULL);
...
```
