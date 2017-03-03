title: WDGTransactionResult
---

用于 `runTransactionBlock:` 方法中，`WDGTransactionResult` 实例是事务处理结果的载体。




## 方法

### + successWithValue:

**定义**

```swift
Swift
class func success(withValue value: WDGMutableData) -> WDGTransactionResult
```
```objectivec
Objective-C
+ (WDGTransactionResult *)successWithValue:(WDGMutableData *)value;
```

**说明**

用于 `runTransactionBlock:` 方法中。表明传入参数 value 应保存在这个节点处。
 


**参数**

 参数名 | 说明 
---|---
value|一个包含新 value 属性的 `WDGMutableData` 实例。




**返回值**

返回一个 `WDGTransactionResult` 实例，作为 `runTransactionBlock:` 方法中 block 的返回值。


</br>

---

### + abort

**定义**

```swift
Swift
class func abort() -> WDGTransactionResult
```
```objectivec
Objective-C
+ (WDGTransactionResult *)abort;
```

**说明**

用于 `runTransactionBlock:` 方法中。使用该方法可以主动终止当前事务。
 



**返回值**

返回一个 `WDGTransactionResult` 实例，作为 `runTransactionBlock:` 方法中 block 的返回值。


</br>

---



