
title: 数据修改和同步
---

和 Wilddog 云端同步的方法。

## 方法

### wilddog_getValue

**定义**

```c
Wilddog_Return_T wilddog_getValue(Wilddog_T wilddog, onQueryFunc callback, void* arg)
```

**说明**

获取当前路径的数据，数据格式为 `Wilddog_Node_T` (类似 JSON )。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| callback | `onQueryFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)，同时会触发回调函数，错误码也能够在回调函数中查询。

**示例**

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

</br>

---

### wilddog_setValue

**定义**

```c
Wilddog_Return_T wilddog_setValue(Wilddog_T wilddog, Wilddog_Node_T *p_node, onSetFunc callback, void *arg)
```

**说明**

设置当前路径的数据到云端，数据格式为`Wilddog_Node_T`(类似 JSON )。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| p_node | `Wilddog_Node_T` 指针类型。指向当前路径对应 `Wilddog_Node_T` 节点数据的指针，注意，头节点即为当前路径。 |
| callback | `onSetFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)，同时会触发回调函数，错误码也能够在回调函数中查询。

**示例**

```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("set error!");
        return;
    }
    wilddog_debug("set success!");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL;

    //创建一个字符串类型节点，值为 123456，key 为 NULL （这个节点的 key 是当前路径的 key，因此无需设置） 
    p_node = wilddog_node_createUString(NULL,"123456");

    //<url>即希望设置数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_setValue返回值的检查
    wilddog_setValue(wilddog, p_node, onSetCallback, NULL);

    //数据已经设置到云端，删除刚才建立的节点
    wilddog_node_delete(p_node);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_push

**定义**

```c
Wilddog_Return_T wilddog_push( Wilddog_T wilddog, Wilddog_Node_T *p_node, onPushFunc callback, void *arg)
```

**说明**

在当前路径下追加一个子节点，并在回调中返回该子节点的完整路径 。子节点的 key 由服务端根据当前时间生成。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前节点对应 Wilddog Sync 实例。 |
| p_node | `Wilddog_Node_T` 指针类型。指向当前路径对应 `Wilddog_Node_T` 节点数据的指针，注意，头节点即为当前路径。 |
| callback | `onPushFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)，同时会触发回调函数，错误码也能够在回调函数中查询。

**示例**

```c
STATIC void onPushCallback(u8 *p_path,void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("push failed");
        return;
    }
    wilddog_debug("new path is %s", p_path);
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

    //注意，这里省略了对wilddog_push返回值的检查
    wilddog_push(wilddog, p_head, onPushCallback, NULL);

    //数据已经推送，删除刚才建立的节点
    wilddog_node_delete(p_head);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_removeValue

**定义**

```c
Wilddog_Return_T wilddog_removeValue(Wilddog_T wilddog, onRemoveFunc callback, void *arg)
```

**说明**

删除当前路径及其子路径下所有数据。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| callback | `onRemoveFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)，同时会触发回调函数，错误码也能够在回调函数中查询。

**示例**

```c
STATIC void onDeleteCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("delete failed!");
        return;
    }
    wilddog_debug("delete success!");
    return;
}
int main(void){
    Wilddog_T wilddog;

    //<url>即希望删除数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_removeValue返回值的检查
    wilddog_removeValue(wilddog, onDeleteCallback, NULL);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_addObserver

**定义**

```c
Wilddog_Return_T wilddog_addObserver(Wilddog_T wilddog, Wilddog_EventType_T event, onEventFunc onDataChange, void *dataChangeArg)
```

**说明**

监听当前路径的数据变化。一旦该数据发生改变, `onDataChange` 函数将被调用。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| event | `Wilddog_EventType_T`类型。监听的事件类型。 |
| callback | `onRemoveFunc` 类型。服务端回应数据或者回应超时触发的回调函数。|
| arg | `void` 指针类型。可为 NULL，用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)，同时会触发回调函数，错误码也能够在回调函数中查询。

**示例**

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
    Wilddog_T wilddog = 0;
    STATIC int count = 0;

    //<url>即希望订阅数据的url，如coaps://<appid>.wilddogio.com/a/b/c
    wilddog = wilddog_initWithUrl(<url>);

    //注意，这里省略了对wilddog_addObserver返回值的检查
    wilddog_addObserver(wilddog, WD_ET_VALUECHANGE, onObserverCallback, NULL);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```

</br>

---

### wilddog_removeObserver

**定义**

```c
Wilddog_Return_T wilddog_removeObserver(Wilddog_T wilddog, Wilddog_EventType_T event)
```

**说明**

取消对当前路径下某个事件的监听（对应于 `wilddog_addObserver` ）。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddog | `Wilddog_T ` 类型。当前路径对应 Wilddog Sync 实例。 |
| event | `Wilddog_EventType_T` 类型。 取消的事件类型。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)。

**示例**

```c
STATIC void onObserverCallback(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err){
    if(err != WILDDOG_HTTP_OK){
        wilddog_debug("observe failed!");
        return;
    }
    *(BOOL*)arg = TRUE;
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

</br>

---

### wilddog_auth

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>wilddog_auth 函数需在调用 wilddog_initWithUrl 初始化该 appId 并获取实例后调用，否则将不生效。</li>
  </ul>
</blockquote>

**定义**

```c
Wilddog_Return_T wilddog_auth(Wilddog_Str_T *p_host, u8 *p_auth, int len, onAuthFunc onAuth, void *args)
```

**说明**

发送 auth 数据到服务器进行认证，每个 host 只需要认证一次。

**参数**

| 参数名 | 说明 |
|---|---|
| p_host | `Wilddog_Str_T` 指针类型。进行 auth 认证的 host 字符串，如 `"<appId>.wilddogio.com"`。 |
| p_auth | `unsigned char` 指针类型。指向 auth 数据的指针，auth 数据可以使用其他端 SDK 的 token，或者[使用 Server SDK 生成](/auth/Server/server.html)。|
| len | `int` 类型。auth 数据的长度。 |
| onAuth | `onAuthFunc` 类型。服务端回应认证或者认证超时触发的回调函数。 |
| args | `void` 指针类型。用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)。

**示例**

```c
void myOnAuthFunc(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_ERR_NOERR || err >= WILDDOG_HTTP_BAD_REQUEST){
        printf("auth fail!\n");
        return;
    }
    printf("auth success! %d\n", *(int*)arg);
    return;
}

char* newToken="ABCD1234567890";

wilddog_auth("aaa.wilddogio.com", newToken, strlen(newToken), myOnAuthFunc, NULL);
```

</br>

---

### wilddog_unauth

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>wilddog_unauth 函数需在调用 wilddog_initWithUrl 初始化该 appId 并获取实例后调用，否则将不生效。</li>
  </ul>
</blockquote>

**定义**

```c
Wilddog_Return_T wilddog_unauth(Wilddog_Str_T *p_host, onAuthFunc onAuth, void *args)
```

**说明**

取消和服务器的 auth 认证，每个 host 只需要取消认证一次。

**参数**

| 参数名 | 说明 |
|---|---|
| p_host | `Wilddog_Str_T` 指针类型。取消 auth 认证的 host 字符串，如 `"<appId>.wilddogio.com"`。 |
| onAuth | `onAuthFunc` 类型。服务端回应认证或者认证超时触发的回调函数。 |
| args | `void` 指针类型。用户给回调函数传入的参数。|

**返回值**

成功返回 0，否则返回对应 [错误码](/sync/C/api/error-code.html)。

**示例**

```c
void myOnAuthFunc(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_ERR_NOERR || err >= WILDDOG_HTTP_BAD_REQUEST){
        printf("auth fail!\n");
        return;
    }
    return;
}

wilddog_unauth("aaa.wilddogio.com", myOnAuthFunc, NULL);
```

</br>

---

### wilddog_trySync

**定义**

```c
void wilddog_trySync(void)
```

**说明**

和云端维持连接、接收云端数据、管理数据重传，应该在空闲时调用。

**示例**

```c
int main(){
    //初始化实例，<appId> 为你的应用ID，路径为/user/jackxy/device/light/10abcde
    Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy/device/light/10abcde");
    //do something
    ...
    while(1){
        wilddog_trySync();
    }
}
```

</br>

---

### wilddog_increaseTime

**定义**

```c
void wilddog_increaseTime(u32 ms)
```

**说明**

用于校准 Wilddog 的时钟(可以在定时器中调用)。`wilddog_trySync()` 被调用时会自动增加 Wilddog 时钟，但该时间的计算会有偏差，可以通过传入一个时间增量来校准 Wilddog 时钟。

**示例**

```c
int main(){
    //初始化实例，<appId> 为你的应用ID，路径为/user/jackxy/device/light/10abcde
    Wilddog_T wilddog=wilddog_initWithUrl("coaps://<appId>.wilddogio.com/user/jackxy/device/light/10abcde");
    //do something
    ...
    while(1){
        wilddog_trySync();
        //休眠1秒
        sleep(1);
        //给wilddog 时钟增加1秒增量
        wilddog_increaseTime(1000);
    }
}
```
