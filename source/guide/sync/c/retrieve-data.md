title:  查询数据
---
本部分将介绍如何读取数据以及如何监听数据。

## 读取数据
设备在读取控制指令，如开关机，可以调用`wilddog_getValue()` 从云端读取数据。

调用`wilddog_getValue()`读取数据的代码如下：
- 1. C / RTOS / OpenWRT SDK
```c
wilddog_getValue(ref, callback, NULL);
```
- 2. Arduino SDK
```c
ref->getValue(callback, NULL);
```

## 监听的事件类型

大部分情况下，我们需要对用户的操作进行及时的反馈，循环读取数据非常耗费流量，我们需要的是每当数据发生变动时设备能收到推送。Wilddog 采用事件机制来监听数据，C/嵌入式 SDK 目前只提供一种数据事件：`value`，该事件用来读取当前节点的静态数据快照，初次获取到数据时被触发一次，此后每当数据发生变化都会被触发。回调函数被执行时候，当前节点下所有数据的静态快照会被作为参数传入。调用`addObserver`操作，可以和云端同步数据。

调用`addObserver`监听数据的代码如下：
- 1. C / RTOS / OpenWRT SDK
```c
wilddog_addObserver(ref, WD_ET_VALUECHANGE, callback, NULL);
```
- 2. Arduino SDK
```c
ref->addObserver(WD_ET_VALUECHANGE, callback, NULL);
```

回调函数 callback 会在云端推送新数据或者出错后被调用，在回调函数中，根据返回码能够知道同步是否成功，同时，会将读取的数据镜像作为参数传递到回调函数中。

#### 取消监听

通过 removeObserver 方法可以取消一个事件回调函数的绑定：

- 1. C / RTOS / OpenWRT SDK
```c
wilddog_removeObserver(ref, WD_ET_VALUECHANGE);
```
- 2. Arduino SDK
```c
ref->removeObserver(WD_ET_VALUECHANGE);
```
