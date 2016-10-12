
title: WDGServerValue
---

用于写入 Wilddog Sync 时间戳

## 方法

### + timestamp

**定义**

```objectivec
+ (NSDictionary *)timestamp
```

**说明**

返回一个字典，它可以作为一个值(value)或者优先级(priority)写入 Wilddog Sync 中，写入的字典数据会由 Wilddog Sync 自动转换为时间戳形式的数据。

**返回值**

返回一个载有 [".sv":"timestamp"] 的字典。