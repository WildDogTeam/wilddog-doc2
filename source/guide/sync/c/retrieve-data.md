
title:  事件监听
---
本篇文档，介绍如何读取和同步数据。


## 读取数据
`wilddog_getValue()` 从云端读取一次节点的数据，节点的数据会在注册的回调函数中返回。

调用`wilddog_getValue()`读取数据的代码如下：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```C / RTOS / OpenWRT SDK

wilddog_getValue(ref, callback, NULL);

```
</div>
<div class="slide-content">
```Arduino SDK

ref->getValue(callback, NULL);

```
</div>
</div>

## 监听数据

`addObserver()` 方法实现对数据的监听，目前只支持 `WD_ET_VALUECHANGE` 调用。回调函数在初始化时触发一次，返回当前云端节点的数据，此后每当监听的数据发生改变时再次触发。


调用`addObserver()`监听数据的代码如下：
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```C / RTOS / OpenWRT SDK

wilddog_addObserver(ref, WD_ET_VALUECHANGE, callback, NULL);

```
</div>
<div class="slide-content">
```Arduino SDK

ref->addObserver(WD_ET_VALUECHANGE, callback, NULL);

```
</div>
</div>

#### 移除监听

`removeObserver()` 方法用于移除一个监听事件，移除监听之后，回调方法将不再被触发：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">C / RTOS / OpenWRT SDK</span>
  <span class="slide-tab">Arduino SDK</span>
</div>
<div class="slide-content slide-content-show">
```C / RTOS / OpenWRT SDK

wilddog_removeObserver(ref, WD_ET_VALUECHANGE);

```
</div>
<div class="slide-content">
```Arduino SDK

ref->removeObserver(WD_ET_VALUECHANGE);

```
</div>
</div>
