title: WilddogVideoCallOptions.Builder
-------------------------

设置视频通话相关参数的类。

## 方法

### data(String)

**定义**   

```java
Builder data(String data)
```

**说明**

设置需要携带的信息，例如发起通话的时候可以向对方说“你好”。

**参数**

| 参数名 | 描述 |
|---|---|
|data|携带的自定义信息。|

**返回值**

当前视频电话相关参数的构建对象。

</br>

---

### iceTransportsPolicy(IceTransportPolicy)

**定义**   

```java
Builder iceTransportPolicy(IceTransportPolicy iceTransportPolicy)
```

**说明**

可以通过设置该枚举类型开启强制Relay。

**参数**

| 参数名 | 描述 |
|---|---|
|iceTransportPolicy|通话类型。|

**返回值**

当前视频电话相关参数的构建对象。

</br>

---

