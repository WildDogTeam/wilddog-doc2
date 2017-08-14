title: WDGVideoClientOptions
---

初始化 [WDGVideoClient](/conference/iOS/api/WDGVideoClient.html) 对象时使用的配置选项。

## 属性

### delegateQueue

**定义**

```objectivec
@property (readwrite, strong, nonatomic) dispatch_queue_t _Nonnull delegateQueue;
```

**说明**

回调将在该队列中调用。默认为 main queue。
