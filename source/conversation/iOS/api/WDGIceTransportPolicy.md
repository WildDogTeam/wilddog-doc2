title: WDGIceTransportPolicy
---

表示 [WDGVideoCallOptions](/conversation/iOS/api/WDGVideoCallOptions.html) Relay选项的枚举类型。

## 常量

### WDGIceTransportPolicy 

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGIceTransportPolicy) {
    WDGIceTransportPolicyAll,
    WDGIceTransportPolicyRelay
};
```

**说明**

表示 WDGVideoCallOptions的Relay选项的枚举类型。

- `WDGIceTransportPolicyAll`: 表示自动选择是否需要Relay。
- `WDGIceTransportPolicyRelay`: 表示开启强制Relay。

</br>

---

