title: WDGCallStatus
---

表示 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 状态的枚举类型。

## 常量

### WDGCallStatus 

**定义**

```objectivec
typedef NS_ENUM(NSUInteger, WDGCallStatus) {
    WDGCallStatusAccepted,
    WDGCallStatusRejected,
    WDGCallStatusBusy,
    WDGCallStatusTimeout
};
```

**说明**

表示视频通话或会议的连接状态。

- `WDGCallStatusAccepted`: 表示视频通话邀请被接受。
- `WDGCallStatusRejected`: 表示视频通话邀请被拒绝。
- `WDGCallStatusBusy`: 表示被叫用户正忙。
- `WDGCallStatusTimeout`: 表示视频通话请求等待超时。

</br>

---