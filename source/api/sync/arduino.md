title:  Arduino API 文档
---

## Wilddog (*Methods*)

## new Wilddog

 定义

new Wilddog(wilddogUrl)

 说明

初始化URL对应的节点引用。

 参数

* wilddogUrl `string` : 应用URL，如：https://<appId>.wilddogio.com

 返回值

Wilddog 对象的引用。

 示例
```c
ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
```

----

## getValue()

 定义

int getValue(CallBackFunc f\_callback,void \*arg)

 说明

获取Wilddog引用所对应的节点的值。

 参数

* f_callback `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`是返回的数据，`error`是返回码，`arg`是用户传入的自定义参数。
* arg `void*` : 用户自定义参数（可为NULL）。

 返回值

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void getValueCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n get error : ");
    Serial.print(error);
    if(pdata){
        Serial.print("\n get newest data : ");
        Serial.print(pdata);
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->getValue(getValueCallBack,(void*)NULL);
}
void loop(){
    if(ref)
        ref->trySync();
}
```

----

## setValue()

 定义

int setValue(const char \*p\_data,CallBackFunc f\_callback,void \*arg)
  
 说明

设置Wilddog引用所对应的节点的值。

 参数

* p_data `const char*` : 准备设置的节点的值，json字符串格式。
* f_callback `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`为NULL，`error`是返回码，`arg`是用户传入的自定义参数。
* arg `void*` : 用户自定义参数（可为NULL）。

 返回

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void setValueCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n set error : ");
    Serial.print(error);
    if(error >= 200 && error < 400){
        Serial.print("\n set data success!\n");
    }
    return;
}

Wilddog *ref = NULL;

void setup(){
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->setValue("{\"pin13\":\"1\"}", setValueCallBack,(void*)NULL);
}

void loop(){
    if(ref)
        ref->trySync();
}
```

----

## push()

 定义

int push(const char \*p\_data,CallBackFunc f\_callback,void \*arg)

 说明

在当前节点下增加一个节点，节点的值由传入的参数决定，设置成功后返回节点的path。节点的key由服务器随机生成。

 参数

* p_data `const char*` : 节点的值，为json字符串。
* f_callback `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`为创建的节点的path，`error`是返回码，`arg`是用户传入的自定义参数。
* arg `void *` : 用户自定义参数（可为NULL）。

 返回

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void pushValueCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n push error : ");
    Serial.print(error);
    if(pdata){
        Serial.print("\n new data path : ");
        Serial.print(pdata);
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->push("{\"pin13\":\"1\"}", pushValueCallBack,(void*)NULL);
}

void loop(){
    if(ref)
        ref->trySync();
}
```

----

## removeValue()

 定义

int removeValue(CallBackFunc f\_callback,void \*arg)

 说明

删除当前节点的值。

 参数

* f_callback `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`为NULL，`error`是返回码，`arg`是用户传入的自定义参数。
* arg `void*` : 用户自定义参数（可为NULL）。

 返回

`int` 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void removeCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n remove error : ");
    Serial.print(error);
    if(error >= 200 && error < 400){
        Serial.print("\n remove success!\n");
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->removeValue(removeCallBack,(void*)NULL);
}

void loop(){
    if(ref)
        ref->trySync();
}
```

----

## addObserver()

 定义

int addObserver(Wilddog\_EventType\_T event,CallBackFunc f\_callback,void \*arg)

 说明

监听节点下的某个事件（如数据变化）,事件触发后，回调函数会被调用。

 参数

* event `Wilddog_EventType_T` : 事件类型（目前只能设为1）。
* f_callback `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`是返回的数据，`error`是返回码，`arg`是用户传入的自定义参数。
* arg 用户自定义参数（可为NULL）。

 返回

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void addObserverCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n observe error : ");
    Serial.print(error);
    if(pdata){
        Serial.print("\n get newest data : ");
        Serial.print(pdata);
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->addObserver(WD_ET_VALUECHANGE,addObserverCallBack,(void*)NULL);
}

void loop(){
    if(ref)
        ref->trySync();
}
```

----

## removeObserver()

 定义

int removeObserver(Wilddog\_EventType\_T event)

 说明

取消监听事件。

 参数

* event `Wilddog_EventType_T` : 事件类型（目前只能设为1）。

 返回

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
int observed = FALSE;

void addObserverCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n observe error : ");
    Serial.print(error);
    if(pdata){
        Serial.print("\n get newest data : ");
        Serial.print(pdata);

        //set var observed to TRUE
        *(int*)arg = TRUE;
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->addObserver(WD_ET_VALUECHANGE,addObserverCallBack,(void*)&observed);
}

void loop(){
    if(ref){
        if(observed == TRUE){
            ref->removeObserver(WD_ET_VALUECHANGE);
        }
        ref->trySync();
    }
}
```

----

## trySync()

 定义

void trySync()

 说明

通过调用wilddog_trySync来向Wilddog云端同步数据。每次调用都会处理来自云端的推送和请求超时的重发、长连接的维持 ，以及触发用户注册的回调函数。

 返回值

无。

 示例

见上面示例。

----

# AuthData (*Methods*)

## auth()

 定义

int auth(const char \*p\_auth,const char \*p\_host,CallBackFunc onAuth,void \*arg)

 说明

发送auth数据到服务器进行认证。

 参数

* p_auth `const char*` : auth数据，字符串类型。
* p_host `const char*` : 节点的host（如appid.wilddogio.com）。
* onAuth `CallBackFunc` : 服务端回应数据或者回应超时触发的回调函数, 类型是`void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中`pdata`为NULL，`error`是返回码，`arg`是用户传入的自定义参数。
* arg `void*` : 用户自定义参数（可为NULL）。

 返回值

`int` : 返回 0:成功 <0:失败，注意，这里指的成功失败仅指是否成功加入发送队列。

 示例
```c
void authCallBack(const char *pdata, int error, void* arg){
    Serial.print("\n auth error : ");
    Serial.print(error);
    if(error >= 200 && error < 400){
        Serial.print("\n auth success!\n");
    }
    return;
}

Wilddog *ref = NULL;

void setup() {
    ... // other codes, such as serial init, bridge init
    
    ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
    ref->auth("token data", "<appId>.wilddogio.com", authCallBack,(void*)NULL);
}

void loop(){
    if(ref)
        ref->trySync();
}
```


