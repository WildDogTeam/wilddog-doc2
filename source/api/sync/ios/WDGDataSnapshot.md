
title: WDGDataSnapshot
---

Wilddog Sync 的数据快照，用于承载数据。

## 属性

### value

**定义**

```objectivec
@property (strong, readonly, nonatomic, nullable) id value
```

**说明**

从 snapshot 中获得当前节点的数据。

返回的数据类型有:  
 NSDictionary  
 NSArray  
 NSNumber (包含Bool类型)  
 NSString  
 
</br>

------
### - childrenCount

**定义**

```objectivec
@property (readonly, nonatomic) NSUInteger childrenCount
```

**说明**

获得 WDGDataSnapshot 的子节点的总数。

</br>

------
### ref

**定义**

```objectivec
@property (nonatomic, readonly, strong) WDGSyncReference *ref
```

**说明**

从 WDGDataSnapshot 中，获得当前节点的引用。

</br>

------
### key

**定义**

```objectivec
@property (strong, readonly, nonatomic) NSString* key
```

**说明**

从 WDGDataSnapshot 中，获取当前节点的名称。

</br>

------
### children

**定义**

```objectivec
@property (strong, readonly, nonatomic) NSEnumerator <WDGDataSnapshot *>* children
```

**说明**

获取当前 WDGDataSnapshot 中，所有子节点的迭代器。

**示例**

```objectivec
for (WDGDataSnapshot* child in snapshot.children) {
    ...
}
```

</br>

------
### priority

**定义**

```objectivec
@property (strong, readonly, nonatomic, nullable) id priority
```

**说明**

获取该 WDGDataSnapshot 对象的优先级。
优先级是一个字符串，若没有设置 priority，则返回 nil。

</br>

------
## 方法

### - childSnapshotForPath

**定义**

```objectivec
- (WDGDataSnapshot *)childSnapshotForPath:(NSString *)childPathString
```

**说明**

根据指定的相对路径，来获取当前节点下的 WDGDataSnapshot。
childPathString 为相对路径。
相对路径可以是一个简单的节点名字（例如，‘fred’），也可以是一个更深的路径，（例如，'fred/name/first'）多层级间需要使用"/"分隔。
如果节点的位置没有数据，则返回一个空的 WDGDataSnapshot。

**参数**

参数名 | 描述
--- | ---
childPathString | 节点数据的相对路径  

**返回值**

指定节点位置的 WDGDataSnapshot 实例。

</br>

--- 
### - hasChild:

**定义**

```objectivec
- (BOOL)hasChild:(NSString *)childPathString
```

**说明**

用特定的 WDGApp 获取这个 WDGSync 实例。

**参数**

参数名 | 描述
--- | ---
app | 用于得到 WDGSync 实例的 WDGApp 对象。

**返回值**

WDGSync 实例。

</br>

--- 
### hasChildren

**定义**

```objectivec
- (BOOL)hasChildren
```

**说明**

如果这个 WDGDataSnapshot 有任何子节点返回 YES，否则 NO。

**返回值**

如果这个 WDGDataSnapshot 有任何子节点返回 YES。

</br>

--- 
### - valueInExportFormat

**定义**

```objectivec
- (id __nullable)valueInExportFormat
```

**说明**

返回节点的原始数据。

**返回值**

返回的节点原始数据。

</br>

--- 
### - exists

**定义**

```objectivec
- (BOOL)exists
```

**说明**

如果 WDGDataSnapshot 中包含非空数据，返回 YES。

**返回值**

如果 WDGDataSnapshot 包含一个非空数据，就返回 YES

