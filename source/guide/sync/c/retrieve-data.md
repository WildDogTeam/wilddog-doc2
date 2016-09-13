title:  查询数据
---
本篇文档，介绍如何读取和同步数据。


## 读取数据
`wilddog_getValue()` 从云端读取一次节点的数据，节点的数据会在回调中返回。

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

`addObserver()` 方法实现对数据的监听，被监听数据会一直和云端保持同步。该方法所注册的回调函数在调用时触发一次，返回当前云端节点的数据，此后每当监听的数据发生变化时均会调用一次。

调用`addObserver()`监听数据的代码如下：
- 1. C / RTOS / OpenWRT SDK
```c
wilddog_addObserver(ref, WD_ET_VALUECHANGE, callback, NULL);
```
- 2. Arduino SDK
```c
ref->addObserver(WD_ET_VALUECHANGE, callback, NULL);
```

回调函数 callback 会在云端推送新数据或者出错后被调用，在回调函数中，根据返回码能够知道监听是否成功，同时，会将读取的数据镜像作为参数传递到回调函数中。

#### 取消监听

通过 removeObserver 方法可以取消对数据的监听：

- 1. C / RTOS / OpenWRT SDK
```c
wilddog_removeObserver(ref, WD_ET_VALUECHANGE);
```
- 2. Arduino SDK
```c
ref->removeObserver(WD_ET_VALUECHANGE);
```
