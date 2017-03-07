title: WDGMutableData
---

`WDGMutableData` 实例是 Wilddog Sync 节点处的另一种数据载体，当使用 `runTransactionBlock:` 方法时，
你会接受到一个包含当前节点数据的 `WDGMutableData` 实例。如果你想要保存此节点的数据，将此节点的
`WDGMutableData` 传参到 `[WDGTransactionResult successWithValue:]` 方法中。

修改 `WDGMutableData` 实例中的数据，value 可将其设置为 Wilddog 支持的任一原生数据类型：

 * NSNumber (includes BOOL)
 * NSDictionary
 * NSArray
 * NSString
 * nil / NSNull (设置 nil / NSNull 删除该数据)


## 属性

### value

**定义**

<div class="swift-lan">Swift</div>```swift
var value: Any? { get set }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (strong, nonatomic, nullable) id value;
```

**说明**

`WDGMutableData` 实例中的数据，value 可将其设置为 Wilddog Sync 支持的任一原生数据类型：

* NSNumber (includes BOOL)
* NSDictionary
* NSArray
* NSString
* nil / NSNull (设置 nil / NSNull 删除该数据)

注意修改这个 value，会覆盖这个节点的优先级。

</br>

---

### priority

**定义**

<div class="swift-lan">Swift</div>```swift
var priority: Any? { get set }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (strong, nonatomic, nullable) id priority;
```

**说明**

该节点下面的数据优先级，可以设置的值类型有：

* NSNumber
* NSString
* nil / NSNull (设置 nil / NSNull 删除该数据)

</br>

---

### childrenCount

**定义**

<div class="swift-lan">Swift</div>```swift
var childrenCount: UInt { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, nonatomic) NSUInteger childrenCount;
```

**说明**

子节点的总数。

</br>

---

### children

**定义**

<div class="swift-lan">Swift</div>```swift
var children: NSEnumerator { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic) NSEnumerator *children;
```

**说明**

当前节点下所有子节点的 Mutabledata 实例的迭代器，用于迭代该节点的子节点。可以用下面的这个方法：

    for (WDGMutableData* child in data.children) {
        ...
    }

</br>

---

### key

**定义**

<div class="swift-lan">Swift</div>```swift
var key: String? { get }
```
<div class="objectivec-lan">Objective-C</div>```objectivec
@property (readonly, strong, nonatomic, nullable) NSString *key;
```

**说明**

当前节点的 key，最上层的节点的 key 是 nil。

</br>

---





## 方法

### - hasChildren

**定义**

<div class="swift-lan">Swift</div>```swift
func hasChildren() -> Bool
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (BOOL)hasChildren;
```

**说明**

判断在当前 `WDGMutableData` 中，是否存在子节点。
 



**返回值**

YES 为存在子节点，NO 为不存在。


</br>

---

### - hasChildAtPath:

**定义**

<div class="swift-lan">Swift</div>```swift
func hasChild(atPath path: String) -> Bool
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (BOOL)hasChildAtPath:(NSString *)path;
```

**说明**

检查指定路径下是否存在子节点。
 


**参数**

 参数名 | 说明 
---|---
path|可以是类似 "child" 的单层级路径，也可以是类似 "a/deeper/child" 多层级路径。




**返回值**

如果在指定的相对路径下，该 `WDGMutableData` 包含子节点，则返回 YES。


</br>

---

### - childDataByAppendingPath:

**定义**

<div class="swift-lan">Swift</div>```swift
func childData(byAppendingPath path: String) -> WDGMutableData
```
<div class="objectivec-lan">Objective-C</div>```objectivec
- (WDGMutableData *)childDataByAppendingPath:(NSString *)path;
```

**说明**

用于获得一个在给定的相对路径下的 `WDGMutableData` 数据实例。
 


**参数**

 参数名 | 说明 
---|---
path|可以是类似 "child" 的单层级路径，也可以是类似 "a/deeper/child" 多层级路径。




**返回值**

指定路径下的 `WDGMutableData` 实例。


</br>

---



