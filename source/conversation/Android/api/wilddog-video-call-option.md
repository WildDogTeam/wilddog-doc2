title: WilddogVideoCallOption
---

表示视频电话相关设置项的类。

## 常量

### IceTransportsPolicy

强制Relay选项。

**定义**

```java
	RELAY,
	ALL
```

## 方法

### getData()

**定义**

```java
String getData()
```

**说明**

代表这通电话需要携带的信息，例如拨打电话的时候可以向对方说“你好”。
**返回值**
当前携带的信息。
</br>

---

### getIceTransportsPolicy()

**定义**

```java
IceTransportsPolicy getIceTransportsPolicy()
```

**说明**
Relay选项
可以得到枚举类型代表是否强制Relay。

**返回值**
当前通话类型。
</br>

---



