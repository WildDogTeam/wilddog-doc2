title: WDGServerValue
---

用于写入 Wilddog Sync 时间戳




## 方法

### + timestamp

**定义**

```swift
Swift
class func timestamp() -> Any!
```
```objectivec
Objective-C
+ (NSDictionary *)timestamp;
```

**说明**

可以作为 value 或者 priority 写入 Wilddog Sync 中，写入的字典数据会由 Wilddog Sync 自动转换为自 Unix epoch 开始的的毫秒数。
 



**返回值**

返回一个载有 [".sv":"timestamp"] 的字典。


</br>

---



