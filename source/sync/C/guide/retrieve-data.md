
title:  事件监听
---

事件监听是指通过事件触发的方式来获取云端变化的数据。通过监听云端事件，本地获取并处理数据，保持和数据实时同步。

## 事件

数据在云端发生变化后会触发事件。

事件包含以下几种：

| 事件类型          | 说明                                         |
| ----------------- | -------------------------------------------- |
| WD_ET_VALUECHANGE | 初始化监听或指定节点及子节点数据变化时触发。 |

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  每当指定节点下的数据（包括更深层节点数据）发生改变时，都会触发 WD_ET_VALUECHANGE 事件。所以，为了聚焦你关心的数据，你应该把监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 WD_ET_VALUECHANGE 事件监听。
</blockquote>

## 监听数据

通过 Wilddog Sync 提供的方法，监听云端的事件，保持和云端实时同步。

### 设置监听

例如，通过 `wilddog_addObserver()` 方法配合 WD_ET_VALUECHANGE 事件监听 `Jobs` 节点下的数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
STATIC void onObserverCallback(Wilddog_Node_T *p_snapshot, void* arg, Wilddog_Return_T err){
    if(err < WILDDOG_HTTP_OK || err >= WILDDOG_HTTP_NOT_MODIFIED){
        wilddog_debug("Observe value error! Error code is %d", err);
        return;
    }
    //打印监听到的新节点数据
    wilddog_debug_printnode(p_snapshot);
    return;
}
int main(void){
    Wilddog_T wilddog = 0;
    
    //<appId>即你应用的 appId，"/Jobs" 为节点的路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/Jobs");

    //注意，这里省略了对wilddog_addObserver返回值的检查
	wilddog_addObserver(wilddog, WD_ET_VALUECHANGE, onObserverCallback, NULL);
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
void onObserverCallback(const char *pdata, int error, void* arg){
    if(error >= 200 && error < 400){
        Serial.print("\n get data success!\n");
    }
    Serial.print("\n Observe data : ");
    Serial.print(pdata);
    return;
}
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/Jobs" 为节点的路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/Jobs");
    ref->addObserver(WD_ET_VALUECHANGE, onObserverCallback, NULL);
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

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  如果你只想获取数据，可使用[wilddog_getValue()](/sync/C/guide/save-data.html#获取数据)方法。
</blockquote>

### 移除监听

`wilddog_removeObserver()` 方法用于移除指定事件。移除监听之后，事件回调方法将不会被触发。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```c
int main(void){
    Wilddog_T wilddog = 0;
    
    //<appId>即你应用的 appId，"/Jobs" 为节点的路径
    wilddog = wilddog_initWithUrl("coaps://<appId>.wilddogio.com/Jobs");

    //注意，这里省略了对wilddog_removeObserver返回值的检查
	wilddog_removeObserver(wilddog, WD_ET_VALUECHANGE);
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
Wilddog *ref = NULL;
void setup{
    //<appId>即你应用的 appId，"/Jobs" 为节点的路径
    ref = new Wilddog("coaps://<appId>.wilddogio.com/Jobs");
    ref->removeObserver(WD_ET_VALUECHANGE);
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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  在父节点上调用 `wilddog_removeObserver()` 方法时不会移除在其子节点上添加的监听。
</blockquote>