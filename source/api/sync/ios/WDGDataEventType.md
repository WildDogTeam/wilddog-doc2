title: WDGDataEventType
---

枚举类型，主要用于监听数据变化。

## 枚举

### WDGDataEventType

**定义**

```
typedef NS_ENUM(NSInteger, WDGDataEventType) {

    WDGDataEventTypeChildAdded,

    WDGDataEventTypeChildRemoved,

    WDGDataEventTypeChildChanged,

    WDGDataEventTypeChildMoved,

    WDGDataEventTypeValue
};

```

**说明**

枚举类型，主要用于监听数据变化。

**参数**

参数名 | 描述
--- | ---
WDGDataEventTypeChildAdded | 当有新增子节点时触发
WDGDataEventTypeChildRemoved | 当有子节点被删除时触发
WDGDataEventTypeChildChanged | 当某个子节点发生变化时触发
WDGDataEventTypeChildMoved | 当有子节排序发生变化时触发
WDGDataEventTypeValue | 当有数据请求或有任何数据发生变化时触发
