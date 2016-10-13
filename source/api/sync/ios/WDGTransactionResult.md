
title: WDGTransactionResult
---

用于 runTransactionBlock: 方法中，WDGTransactionResult 实例是事务处理结果的载体

## 方法

### + successWithValue:

**定义**

```objectivec
+ (WDGTransactionResult *)successWithValue:(WDGMutableData *)value
```

**说明**

用于 runTransactionBlock: 方法中。表明传入参数 value 应保存在这个节点处。

**参数**

参数名 | 描述
--- | ---
value | 一个包含新 value 属性的 WDGMutableData 实例

**返回值**

返回一个 WDGTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值。

</br>

--- 
### + abort

**定义**

```objectivec
+ (WDGTransactionResult *)abort
```

**说明**

用于 runTransactionBlock: 方法中。使用该方法可以主动终止当前事务。

**返回值**

返回一个 WDGTransactionResult 实例，它可以作为给 runTransactionBlock: 方法中 block 的一个返回值。
