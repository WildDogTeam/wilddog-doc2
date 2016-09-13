title:  查询数据
---
本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和过滤。

查询数据前确保 SDK 已初始化：

Objective-C

```objectivec
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];

```

Swift

```swift  
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options)

```

## 设置监听

数据的查询以事件监听的方式来完成。事件监听可以让你客户端的数据一直保持与云端同步。你可以设置两种类型的事件监听，“Value 事件” 和 “Child 事件”：

监听器 | 事件回调     | 描述
---- | ---- | ---
ValueEvent | WDGDataEventTypeValue | 第一次设置监听或有任何数据发生变化时触发
ChildEvent | WDGDataEventTypeChildAdded   | 第一次设置监听或有新增子节点时触发
                   | WDGDataEventTypeChildChanged  | 第一次设置监听或有新增子节点时触发
                   | WDGDataEventTypeChildRemoved	| 子节点被删除时触发
                   | WDGDataEventTypeChildMoved | 有子节排序发生变化时触发


使用 `observeEventType` 或 `observeSingleEventOfType` 方法监听当前路径下的所有数据。

### Value 事件

以下示例演示了如何查询 posts 的数据：

Objective-C 

```objectivec
// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];

// 绑定一个 block 去读取数据
[ref observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"%@", snapshot.value);
} withCancelBlock:^(NSError *error) {
    NSLog(@"%@", error.description);
}];

```

Swift

```swift
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceFromURL("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")

// 绑定一个 block 去读取数据
ref.observeEventType(.Value, withBlock: { snapshot in
    print(snapshot.value)
}, withCancelBlock: { error in
    print(error.description)
})
```

**注意**：每当指定路径下的数据（包括更深层节点数据）有改变时，都会触发 Value 事件。所以，为了聚焦你只关心的数据，你应该把要监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。

更多详细的用法说明参见  [API 文档](/api/sync/ios/api.html)。

### Child 事件
当某个节点的子节点发生改变时（如通过 `childByAutoId` 方法添加子节点，或通过 `updateChildValues` 更新子节点），就会触发 `child 事件`。

`WDGDataEventTypeChildAdded` 方法常用来获取当前路径下的子节点列表。初始化时会针对每个子节点触发一次以获取所有子节点，之后每当增加子节点时就会再次触发获取新增的子节点。

对子节点修改时会触发 `WDGDataEventTypeChildChanged` 方法回调，这个修改包括对子节点里更深层的节点所做的修改。

删除直接子节点时，将会触发 `WDGDataEventTypeChildRemoved` 方法回调。

当节点下的数据顺序发生变化时，系统就会触发 `WDGDataEventTypeChildMoved` 方法回调。默认的数据顺序按 priority 属性排列，如果没有指定 priority ，子节点按照 key 值排序。要改变数据的排列规则，可以调用 `queryOrderedBy*` 方法。

例如：[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts) 中，通过设置 Child 事件来监听博客的状态变化：

Objective-C 

```objectivec
// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];

// 设置监听
[ref observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
  NSLog(@"%@", snapshot.value[@"author"]);
  NSLog(@"%@", snapshot.value[@"title"]);
}];

```

Swift

```swift
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceFromURL("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")

// 设置监听
ref.observeEventType(.ChildAdded, withBlock: { snapshot in
    print(snapshot.value!.objectForKey("author"))
    print(snapshot.value!.objectForKey("title"))
})
```

## 移除监听
使用 `WDGSyncReference` 的 `removeObserverWithHandle` 方法可以移除一个监听事件。

在父节点上调用 `removeObserverWithHandle` 时不会移除在其子节点上设置的监听。

Objective-C

```objectivec
WDGSyncHandle handle = [ref observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot* snapshot) {
    NSLog(@"Snapshot value: %@", snapshot.value)
}];

[ref removeObserverWithHandle:handle];

```

Swift

```swift
var handle = ref.observeEventType(.Value, withBlock: { snapshot in
    print("Snapshot value: \(snapshot.value)")
})

ref.removeObserverWithHandle(handle)

```

## 单次查询
在某些场景下，只需要事件的回调被触发一次，然后立即取消监听。可以使用 `addListenerForSingleValueEvent()` 方法：

Objective-C

```objectivec

// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];
__block NSInteger count = 0;

[ref observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    count++;
    NSLog(@"added -> %@", snapshot.value);
}];

// 单次查询
// snapshot.childrenCount 等于 WDGDataEventTypeChildAdded 事件返回的 snapshot.value 数量的计数总和 
// WDGDataEventTypeValue 是最后触发的
[ref observeSingleEventOfType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"initial data loaded! %d", count == snapshot.childrenCount);
}];

```

Swift

```swift

// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceFromURL("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")
var count:UInt = 0

ref.observeEventType(.ChildAdded, withBlock: { snapshot in
    count++
    print("added -> \(snapshot.value)")
})

// 单次查询
// snapshot.childrenCount 等于 .ChildAdded 事件返回的 snapshot.value 数量的计数总和
// .Value 是最后触发的
ref.observeSingleEventOfType(.Value, withBlock: { snapshot in
    print("initial data loaded! \(count == snapshot.childrenCount)")
})

```

## 数据排序

### 排序方法
你可以使用 [WQuery](/api/sync/ios/api.html#WDGSyncQuery-Methods) 类的方法进行数据排序。Wilddog Sync 支持按 Key、按 Value、按子节点的 Value 或按 priority 对数据进行排序。

方法 | 用法
----  | ----
orderByChild() | 按指定子节点的值对结果排序。
orderByKey() | 按键(key)对结果排序。
orderByValue() | 按值对结果排序。
orderByPriority() | 按优先级对结果排序。

例如：[恐龙应用数据页面](https://dinosaur-facts.wilddogio.com) 中演示如何按照每个恐龙的身高（"height"节点的值）进行排序。

Objective-C

```objectivec
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[ref queryOrderedByChild:@"height"]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"%@ was %@ meters tall", snapshot.key, snapshot.value[@"height"]);
}];

```

Swift

```swift
let ref = WDGSync.sync().referenceFromURL("https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").observeEventType(.ChildAdded, withBlock: { snapshot in
    if let height = snapshot.value!["height"] as? Double {
        print("\(snapshot.key) was \(height) meters tall")
    }
})

```

**注意**：

- 排序对计算机性能开销大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/api/sync/rule.html#indexOn) 规则，在服务器上添加索引以提高查询性能。详细操作参见 [添加索引](/guide/sync/rules/guide.html#数据索引)。

- 每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。


### 排序规则

**queryOrderedByChild**

使用 `queryOrderedByChild`，按照以下规则进行升序排列：

1. 子节点的指定 key 对应的值为 `nil` 排在最前面。
2. 子节点的指定 key 对应的值为 `false` 次之。如果有多个值为 `false`，则按子节点的 key 以 [字典序](http://baike.baidu.com/view/4670107.htm) 进行升序排列。
3. 子节点的指定 key 对应的值为 `true` 次之。如果有多个值为 `true`，则按子节点的 key 以字典序进行升序排列。
4. 子节点的指定 key 对应的值为 `number` 次之。如果有多个 `number` 相等，则按子节点的 key 以字典序进行升序排列。
5. 子节点的指定 key 对应的值为 `String` 次之。如果有多个 `String` 相等，则按子节点的 key 以字典序进行升序排列。
6. 子节点的指定 key 对应的值为 `Objects` 次之。如果有多个 `Objects` 相等，则按子节点的 key 以字典序进行升序排列。

**queryOrderedByKey**

当使用 queryOrderedByKey 对数据进行排序时，系统会按 key 以字典序进行升序排列。

**queryOrderedByValue**

当使用`queryOrderedByValue`时，按照子节点的值进行排序。排序规则和 `queryOrderedByChild` 一样，唯一不同的是将子节点指定的 key 改为子节点的值。


## 数据过滤

只有对数据进行排序之后，才能过滤数据，你可以结合以下方法来构造查找的条件。

方法 | 用法
---- | ----
queryLimitedToFirst | 设置从第一条开始，一共返回多少个节点。
queryLimitedToLast | 设置从最后一条开始，一共返回多少个节点（返回结果仍是升序，降序要自己处理）。
queryStartingAtValue | 返回大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
queryEndingAtValue | 返回小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
queryEqualToValue | 返回等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。

你可以结合不同的方法来过滤节点。例如，你可以结合使用 `queryStartingAtValue` 与 `queryEndingAtValue` 方法将结果限制在指定的范围内。

**限制返回节点数量**

使用 `queryLimitedToFirst` 和 `queryLimitedToLast` 方法限制返回节点的最大数量。 例如，使用 `queryLimitedToFirst:100` 过滤数据，那么第一次返回节点数最多为 100。
当数据发生更改时，对于进入到前 100 的数据，你会接收到 `WDGDataEventTypeChildAdded` 事件，对于从前 100 中消失的数据，你会接收到 `WDGDataEventTypeChildRemoved` 事件，也就是说只有这 100 条里的数据变化才会触发事件。

继续上面示例，如果你只想知道最高的是哪三条恐龙，就可以这样写：

Objective-C

```objectivec

WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByChild:@"height"] queryLimitedToLast:3]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```swift

let ref = WDGSync.sync().referenceFromURL("https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").queryLimitedToLast(3)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        print(snapshot.key)
})

```

或者你只关心哪些 [恐龙](https://dinosaur-facts.wilddogio.com/scores) 的得分超过 60 了：

Objective-C

```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceFromURL:@"https://dinosaur-facts.wilddogio.com/scores"];
[[[scoresRef queryOrderedByValue] queryStartingAtValue:@60]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];

```

Swift

```swift
let scoresRef = Wilddog(url:"https://dinosaur-facts.wilddogio.com/scores")
scoresRef.queryOrderedByValue().queryStartingAtValue(60).observeEventType(.ChildAdded, withBlock: { snapshot in
    
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})

```

如上例所示，使用 `queryStartingAtValue`、`queryEndingAtValue` 和 `queryEqualToValue` 为查询选择任意起点、终点或等量点。这可以用于 `数据分页` 和 `精确查询`。
