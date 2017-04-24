
title: CompleteListener
---

直播事件完成的回调。

## 方法

### onCompleted(VideoException)

**定义**   

```java
void onCompleted(VideoException exception)
```

**说明**

直播事件完成时会触发 `onCompleted` 方法，如回调方法的 `VideoException` 参数不为空，则表示事件操作失败，详细错误信息在 `VideoException` 中给出。

**参数**

| 参数名 | 描述 |
|---|---|
|exception|事件失败的异常信息。|


<span id="onStarted" />

</br>


