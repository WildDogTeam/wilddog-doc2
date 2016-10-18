
title: 离线事件
---

离线事件相关的方法。

## 方法

### wilddog_onDisconnectSetValue

**定义**

```c
Wilddog_Return_T wilddog_onDisconnectSetValue(Wilddog_T wilddog, Wilddog_Node_T *p_node, onDisConnectFunc callback, void* arg)
```

**说明**

当云端检测到客户端离线时，设置当前路径的数据，数据格式为 `Wilddog_Node_T`。回调函数用于判断该离线事件是否成功注册。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| p_node | `Wilddog_Node_T` 指针类型。指向节点数据的指针，注意，头节点即为当前路径。 |
| callback | `onDisConnectFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline set error!");
        return;
    }
    wilddog_debug("offline set success!");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL;

    /* create a node to "wilddog", value is "123456" */
    p_node = wilddog_node_createUString(NULL,"123456");

    //<url>即希望设置数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对 wilddog_onDisconnectSetValue 返回值的检查
    wilddog_onDisconnectSetValue(wilddog, p_node, onSetCallback, NULL);
    wilddog_node_delete(p_node);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_onDisconnectPush

**定义**

```c
Wilddog_Return_T wilddog_onDisconnectPush( Wilddog_T wilddog, Wilddog_Node_T *p_node, onDisConnectFunc callback, void* arg)
```

**说明**

当云端检测到客户端离线时，在当前路径下生成一个子节点，数据格式为 `Wilddog_Node_T`。回调函数用于判断该离线事件是否成功注册。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| p_node | `Wilddog_Node_T` 指针类型。指向节点数据的指针，注意，头节点即为当前路径。 |
| callback | `onDisConnectFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
STATIC void onPushCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline push failed");
        return;
    }
    wilddog_debug("offline push success");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL, *p_head = NULL;
    p_head = wilddog_node_createObject(NULL);
    p_node = wilddog_node_createNum("2",1234);
    wilddog_node_addChild(p_head, p_node);
    
    //<url>即希望推送数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_onDisconnectPush返回值的检查
    wilddog_onDisconnectPush(wilddog, p_head, onPushCallback, NULL);
    wilddog_node_delete(p_head);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_onDisconnectRemoveValue

**定义**

```c
Wilddog_Return_T wilddog_onDisconnectRemoveValue(Wilddog_T wilddog, onDisConnectFunc callback, void* arg)
```

**说明**

当云端检测到客户端离线时，删除当前路径及子路径下所有数据，数据格式为 `Wilddog_Node_T`。回调函数用于判断该离线事件是否成功注册。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| callback | `onDisConnectFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
STATIC void onDeleteCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline delete failed!");
        return;
    }
    wilddog_debug("offline delete success!");
    return;
}
int main(void){
    BOOL isFinished = FALSE;
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_onDisconnectRemoveValue返回值的检查
    wilddog_onDisconnectRemoveValue(wilddog, onDeleteCallback, NULL);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_cancelDisconnectOperations

**定义**

```c
Wilddog_Return_T wilddog_cancelDisconnectOperations(Wilddog_T wilddog, onDisConnectFunc callback, void* arg)
```

**说明**

取消该 Wilddog Sync 实例设置的所有离线事件。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| callback | `onDisConnectFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/api/sync/c/error-code.html)。

**示例**

```c
STATIC void onCancelCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("offline operation cancel failed!");
        return;
    }
    wilddog_debug("offline operation cancel success!");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_cancelDisconnectOperations返回值的检查
    wilddog_cancelDisconnectOperations(wilddog, onCancelCallback, NULL);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_goOffline

**定义**

```c
void wilddog_goOffline(void)
```

**说明**

断开客户端和云端的连接，之前若注册了离线事件则云端会触发离线事件。

**示例**

```c
int main(void){
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    wilddog_goOffline();
}
```

</br>

---

### wilddog_goOnline

**定义**

```c
void wilddog_goOnline(void)
```

**说明**

若客户端处于离线状态，则重新连接云端服务，之前若注册了监听事件，则 SDK 会重新发送监听请求。注意：重连后会触发监听回调，返回当前的数据。

**示例**

```c
int main(void){
    Wilddog_T wilddog = 0;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    wilddog_goOnline();
}
```
