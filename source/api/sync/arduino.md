title:  Arduino API 文档
---

Arduino API 文档。

## 方法

### new Wilddog

**定义**

```c
new Wilddog(char* wilddogUrl)
```

**说明**

初始化URL对应的节点引用。

**参数**

| 参数名 | 说明 |
|---|---|
| wilddogUrl | `char` 指针类型。应用 URL，如 "https://<appId>.wilddogio.com"。 |

**返回值**

当前路径的 Wilddog Sync 对象实例。

**示例**

```c
ref = new Wilddog("https://<appId>.wilddogio.com/a/b/c");
```

</br>

---

### getValue

**定义**

```c
int getValue(CallBackFunc f_callback,void *arg)
```

**说明**

获取 Wilddog Sync 实例对应路径的值。

**参数**

| 参数名 | 说明 |
|---|---|
| f_callback | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数，类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 是返回的数据，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void` 指针类型。用户自定义参数（可为NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### setValue

**定义**

```c
int setValue(const char *p_data,CallBackFunc f_callback,void *arg)
```
  
**说明**

设置 Wilddog Sync 实例对应的路径的值。

**参数**

| 参数名 | 说明 |
|---|---|
| p_data | `const char` 指针类型。准备设置的节点的值，JSON 字符串格式。|
| f_callback | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数, 类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 为 NULL，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void` 指针类型。用户自定义参数（可为 NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### push

**定义**

```c
int push(const char *p_data,CallBackFunc f_callback,void *arg)
```

**说明**

在当前路径下增加一个节点，节点的值由传入的参数决定，设置成功后返回节点的 path。节点的 key 由服务器随机生成。

**参数**

| 参数名 | 说明 |
|---|---|
| p_data | `const char` 指针类型。节点的值，为 JSON 字符串。|
| f_callback | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数, 类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 为创建的节点的 path ，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void` 指针类型。用户自定义参数（可为 NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### removeValue

**定义**

```c
int removeValue(CallBackFunc f_callback,void *arg)
```

**说明**

删除当前路径的值。

**参数**

| 参数名 | 说明 |
|---|---|
| f_callback | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数, 类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 为 NULL，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void*` 类型。用户自定义参数（可为 NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### addObserver

**定义**

```c
int addObserver(Wilddog_EventType_T event,CallBackFunc f_callback,void *arg)
```

**说明**

监听当前路径下的某个事件（如数据变化）,事件触发后，回调函数会被调用。

**参数**

| 参数名 | 说明 |
|---|---|
| event `Wilddog_EventType_T` 类型。事件类型（目前只能设为 1）。|
| f_callback | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数, 类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 是返回的数据，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void` 指针类型。用户自定义参数（可为 NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### removeObserver

**定义**

```c
int removeObserver(Wilddog_EventType_T event)
```

**说明**

取消监听事件。

**参数**

| 参数名 | 说明 |
|---|---|
| event | `Wilddog_EventType_T` 类型。事件类型（目前只能设为1）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

</br>

---

### trySync

**定义**

```c
void trySync(void)
```

**说明**

和云端维持连接、接收云端数据、管理数据重传，应该在空闲时调用。

</br>

---

### auth

**定义**

```c
int auth(const char *p_auth,const char *p_host,CallBackFunc onAuth,void *arg)
```

**说明**

发送 auth 数据到服务器进行认证。

**参数**

| 参数名 | 说明 |
|---|---|
| p_auth | `const char` 指针类型。auth 数据字符串。|
| p_host | `const char` 指针类型。节点的 host（如 "appid.wilddogio.com"）。|
| onAuth | `CallBackFunc` 类型。服务端回应数据或者回应超时触发的回调函数, 类型是 `void (*CallBackFunc)(const char *pdata, int error, void* arg)`，其中 `pdata` 为 NULL，`error` 是返回码，`arg` 是用户传入的自定义参数。|
| arg | `void` 指针类型。用户自定义参数（可为 NULL）。|

**返回值**

成功返回 0，失败返回 -1。注意，这里指的成功失败仅指是否成功加入发送队列。

**示例**

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

