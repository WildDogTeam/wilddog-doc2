
title:  操作数据
---
本篇文档介绍操作数据的方法。

操作数据包含以下四种方法：

| 方法                  | 说明                                                                            |
| --------------------- | ------------------------------------------------------------------------------- |
| wilddog_getValue()    | 获取某个节点的数据。                                                            |
| wilddog_setValue()    | 向某个节点写入数据。若此节点已存在数据，会覆盖这些数据。                        |
| wilddog_push()        | 向某个节点添加子节点。子节点的 key 自动生成并保证唯一，value 是你要写入的数据。 |
| wilddog_removeValue() | 删除指定的节点。                                                                |

## 获取数据

`wilddog_getValue() ` 方法用于获取某个节点的数据。

`wilddog_getValue() ` 方法可设置回调方法来获取操作的结果。

例如，获取 `room` 节点数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
STATIC void onGetCallback(Wilddog_Node_T *p_snapshot, void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("Get value error! Error code is %d", err);
        return;
    }
    //打印获取到的节点数据
    wilddog_debug_printnode(p_snapshot);
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    
    //<appId>即你应用的 appId，"/room" 为节点的路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/room");

    //注意，这里省略了对wilddog_getValue返回值的检查
    wilddog_getValue(wilddog, p_head, onGetCallback, NULL);

    while(1){
        //和云端同步
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
    return 0;
}
```
</div>
<div class="slide-content">
```Arduino
void getValueCallBack(const char *pdata, int error, void* arg){
    if(error >= 200 && error < 400){
        Serial.print("\n get data success!\n");
    }
    Serial.print("\n get data : ");
    Serial.print(pdata);
    return;
}
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/room" 为节点的路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/room");
    ref->getValue(getValueCallBack, NULL);
    return;
}
void loop(){
    //和云端同步
    if(ref)
        ref->trySync();
    return;
}
```
</div>
</div>

## 写入数据

`wilddog_setValue() ` 方法用于向某个节点写入数据。此方法会先清空指定节点，再写入数据。

`wilddog_setValue() ` 方法可设置回调方法来获取操作的结果。

例如，修改 `led` 状态信息：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
STATIC void onSetCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("Set value error! Error code is %d", err);
        return;
    }
    wilddog_debug("Set value succeed!");
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T *p_head= NULL,*p_node = NULL;

    // 本地组装 led 节点，其值为 "on"
    p_head = wilddog_node_createObject(NULL);
    p_node = wilddog_node_createUString("led","on");
    wilddog_node_addChild(p_head, p_node);
    
    //<appId>即你应用的 appId，"/room" 为 led 节点的上级路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/room");

    //注意，这里省略了对wilddog_setValue返回值的检查
    wilddog_setValue(wilddog, p_head, onSetCallback, NULL);
    
    //向云端设置完毕，删除本地组装的节点。
    wilddog_node_delete(p_head);

    while(1){
        //和云端同步
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
    return 0;
}
```
</div>
<div class="slide-content">
```Arduino
void setValueCallBack(int error, void* arg){
    if(error >= 200 && error < 400){
        Serial.print("\n set data success!\n");
    }
    return;
}
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/room" 为 led 节点的上级路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/room");
    ref->setValue("{\"led\":\"on\"}", setValueCallBack, NULL);
    return;
}
void loop(){
    //和云端同步
    if(ref)
        ref->trySync();
    return;
}
```
</div>
</div>

## 追加子节点

`wilddog_push() `方法用于向指定节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照添加时间进行排序。

`wilddog_push() ` 方法可设置回调方法来获取操作的结果。回调函数中第一个参数为新增节点的完整路径，新增子节点的 key 可以从中获取。

例如，追加子节点到 `room` 节点下：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
STATIC void onPushCallback(u8 *p_path,void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("push failed, error code is %d", err);
        return;
    }
    //获取新增数据对应的 path
    wilddog_debug("new path is %s", p_path);
    return;
}

int main(void){
    Wilddog_T wilddog = 0;
    Wilddog_Node_T * p_node = NULL, *p_head = NULL;

    //建立一个object节点，即类似json中的{}
    p_head = wilddog_node_createObject(NULL);

    //建立一个key为 led，value为 "on" 的节点
    p_node = wilddog_node_createUString("led","on");

    //将节点p_node添加到object中
    wilddog_node_addChild(p_head, p_node);
    
    //<appId>即你应用的 appId，"/room" 为要追加节点的上级路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/room");

    //注意，这里省略了对wilddog_push返回值的检查
    wilddog_push(wilddog, p_head, onPushCallback, NULL);

    //数据已经推送，删除本地组装的节点。
    wilddog_node_delete(p_head);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
    return 0;
}
```
</div>
<div class="slide-content">
```Arduino
void pushValueCallBack(const char *pdata, int error, void* arg){
    if(error >= 200 && error < 400){
        Serial.print("\n set data success!\n");
    }
    //获取新增数据对应的 path
    if(pdata){
        Serial.print("\n get path : ");
        Serial.print(pdata);
    }
    return;
}
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/room" 为要追加节点的上级路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/room");
    ref->push("{\"led\":\"on\"}", pushValueCallBack, NULL);
    return;
}
void loop(){
    //和云端同步
    if(ref)
        ref->trySync();
    return;
}
```
</div>
</div>

## 删除数据

`wilddog_removeValue()` 方法用于删除指定节点。

例如，删除 `room` 节点下所有的数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
STATIC void onDeleteCallback(void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("Remove value error! Error code is %d", err);
        return;
    }
    wilddog_debug("Remove value succeed!");
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
    wilddog_removeValue(wilddog, onDeleteCallback, NULL);

    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&wilddog);
}
```
</div>
<div class="slide-content">
```Arduino
void removeValueCallBack(const char *pdata, int error, void* arg){
    if(error >= 200 && error < 400){
        Serial.print("\n set data success!\n");
    }
    Serial.print("\n Remove value succeed!");
    return;
}
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/room" 为要删除节点的路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/room");
    ref->removeValue(removeValueCallBack, NULL);
    return;
}
void loop(){
    //和云端同步
    if(ref)
        ref->trySync();
    return;
}
```
</div>
</div>
