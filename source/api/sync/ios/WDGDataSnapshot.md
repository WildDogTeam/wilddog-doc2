title: WDGDataSnapshot
---

`WDGDataSnapshot` 是当前指定节点下数据的快照，`WDGDataSnapshot` 不会随当前节点数据的变化而发生改变。
我们无法直接创建这个对象，而应当在 `observeEventType:withBlock:` 或 `observeSingleEventOfType:withBlock:` 的回调函数中获取它。


## 属性

### value

**定义**

```swift
Swift
var value: Any? { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic, nullable) id value;
```

**说明**

当前数据快照包含的数据。数据类型取决于节点下的数据内容。

可能返回的数据类型包括:

- NSDictionary
- NSArray
- NSNumber (包含Bool类型)
- NSString

</br>

---

### childrenCount

**定义**

```swift
Swift
var childrenCount: UInt { get }
```
```objectivec
Objective-C
@property (readonly, nonatomic) NSUInteger childrenCount;
```

**说明**

`WDGDataSnapshot` 的子节点的总数。

</br>

---

### ref

**定义**

```swift
Swift
var ref: WDGSyncReference { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) WDGSyncReference *ref;
```

**说明**

当前数据快照所关联的 `WDGSyncReference` 实例。

</br>

---

### key

**定义**

```swift
Swift
var key: String { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) NSString *key;
```

**说明**

当前 `WDGDataSnapshot` 所属节点的 key。

</br>

---

### children

**定义**

```swift
Swift
var children: NSEnumerator { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic) NSEnumerator<WDGDataSnapshot *> *children;
```

**说明**

当前 `WDGDataSnapshot` 中，所有子节点的迭代器。
例如:
```objectivec
for (WDGDataSnapshot* child in snapshot.children) {
    ...
}
```

</br>

---

### priority

**定义**

```swift
Swift
var priority: Any? { get }
```
```objectivec
Objective-C
@property (readonly, strong, nonatomic, nullable) id priority;
```

**说明**

当前节点的 priority 值。优先级不存在时为 nil。

</br>

---





## 方法

### - childSnapshotForPath:

**定义**

```swift
Swift
func childSnapshot(forPath childPathString: String) -> WDGDataSnapshot
```
```objectivec
Objective-C
- (WDGDataSnapshot *)childSnapshotForPath:(NSString *)childPathString;
```

**说明**

根据相对路径，来获取当前节点下子节点的数据快照。
相对路径可以是一个字节点的 key 值（例如："Beijing"），也可以是更深层次的路径（例如："Beijing/pm25"）。
如果相对路径下并没有数据，则返回 nil。
根据指定的相对路径，来获取当前节点下的 `WDGDataSnapshot`。
 
 


**参数**

 参数名 | 说明 
---|---
childPathString|节点数据的相对路径，多层级间需要使用 "/" 分隔。




**返回值**

`WDGDataSnapshot` 实例。


</br>

---

### - hasChild:

**定义**

```swift
Swift
func hasChild(_ childPathString: String) -> Bool
```
```objectivec
Objective-C
- (BOOL)hasChild:(NSString *)childPathString;
```

**说明**

判断是否存在某个指定的子节点。如果指定节点下的数据不为空，则返回 YES。
 
 


**参数**

 参数名 | 说明 
---|---
childPathString|相对路径




**返回值**

如果指定路径下存在子节点，返回YES，否则返回NO


</br>

---

### - hasChildren

**定义**

```swift
Swift
func hasChildren() -> Bool
```
```objectivec
Objective-C
- (BOOL)hasChildren;
```

**说明**

如果 `WDGDataSnapshot` 存在子节点返回 YES，否则返回 NO。
你可以通过使用 `hasChildren` 方法来确定当前的数据快照是否含有子节点，进而决定是否利用 `children` 属性遍历数据。
 



**返回值**

如果 `WDGDataSnapshot` 存在子节点返回 YES，否则返回 NO。


</br>

---

### - exists

**定义**

```swift
Swift
func exists() -> Bool
```
```objectivec
Objective-C
- (BOOL)exists;
```

**说明**

判断当前 `WDGDataSnapshot` 实例中是否包含数据。使用 exists 方法进行非空判断比 `snapshot.value != nil` 更高效。
 



**返回值**

如果 `WDGDataSnapshot` 包含非空数据，返回 YES。


</br>

---

### - valueInExportFormat

**定义**

```swift
Swift
func valueInExportFormat() -> Any?
```
```objectivec
Objective-C
- (id _Nullable)valueInExportFormat;
```

**说明**

将 `WDGDataSnapshot` 中的全部内容导出。
valueInExportFormat 方法和 `value` 方法类似，都可以导出数据。但是当节点的 priority 值不为空时，valueInExportFormat 会导出包含 priority 的数据，适合用于备份。



</br>

---



