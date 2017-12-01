title: WDGVideoCallOptions
---

表示视频电话相关设置项的类。

## 属性

### customData

**定义**

```objectivec
@property (nonatomic , strong) NSString * _Nullable customData;
```

**说明**

代表这通电话需要携带的信息，例如拨打电话的时候可以向对方说“你好”。

</br>

---

### iceTransportPolicy

**定义**

```objectivec
@property (nonatomic , assign) WDGIceTransportPolicy iceTransportPolicy;
```

**说明**
Relay选项
[WDGIceTransportPolicy](/conversation/iOS/api/WDGIceTransportPolicy.html)  可以通过设置该枚举类型开启强制Relay。

</br>

---



