title: CompleteListener
---

WilddogVideoRoom API 调用完成回调。

## 方法

### onComplete(videoError)

**定义**   

```java
	void onComplete(WilddogVideoError videoError)
```

**说明**

方法调用完成后触发 `onComplete()` 方法。调用成功 videoError 对象为 `null`，否则通过 videoError 对象传递错误信息。

**参数**

| 参数名 | 描述 |
|---|---|
| videoError |API 调用错误信息。|



