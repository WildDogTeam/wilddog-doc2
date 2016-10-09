
title:  事件监听
---
Wilddog Sync 采用本地处理、云端同步的通信技术架构。事件监听是该架构的核心机制：通过监听云端事件，本地获取并处理数据，保持和云端实时同步。


## 事件

数据在云端发生变化后会触发事件。

事件包含以下五种：

| 事件类型                         | 说明                    |
| ---------------------------- | --------------------- |
| WDGDataEventTypeValue        | 初始化监听或有新增子节点。         |
| WDGDataEventTypeChildAdded   | 子节点数据发生更改。            |
| WDGDataEventTypeChildChanged | 子节点被删除。               |
| WDGDataEventTypeChildRemoved | 子节点排序发生变化。            |
| WDGDataEventTypeChildMoved   | 初始化监听或指定节点及子节点数据发生变化。 |


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  每当指定节点下的数据（包括更深层节点数据）发生改变时，都会触发 Value 事件。所以，为了聚焦你关心的数据，你应该把监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。
</blockquote>


## 监听事件
通过 Wilddog Sync 提供的方法，监听云端的事件，保持和云端实时同步。

### 设置监听
`observeEventOfType` 方法用于与事件配合来监听指定节点的数据。

例如，通过 `observeEventOfType` 方法配合 Value 事件监听 Jobs 节点下的数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec

// 初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];  
// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"web/saving-data/wildblog/users/jobs"];
[ref observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"%@", snapshot.value);
} withCancelBlock:^(NSError *error) {
    NSLog(@"%@", error.description);
}];
```
</div>
<div class="slide-content">
```swift

// 初始化 
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options)
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceWithPath("web/saving-data/wildblog/users/jobs")
ref.observeEventType(.Value, withBlock: { snapshot in
    print(snapshot.value)
}, withCancelBlock: { error in
    print(error.description)
})
```
</div>
</div>

之后 Jobs 节点下的数据发生任何变化，都会触发回调方法。

例如，[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过 `observeEventOfType` 方法配合 Child 事件来监听博客的状态变化：
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec

// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];
[ref observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
  NSLog(@"%@", snapshot.value[@"author"]);
  NSLog(@"%@", snapshot.value[@"title"]);
}];
```
</div>
<div class="slide-content">
```swift

// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceFromURL("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")
ref.observeEventType(.ChildAdded, withBlock: { snapshot in
    print(snapshot.value!.objectForKey("author"))
    print(snapshot.value!.objectForKey("title"))
})
```
</div>
</div>

更详细的用法说明，请参考 [API 文档](/api/sync/ios/api.html#–-observeEventType-withBlock)。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  如果你只想监听一次数据，可使用 `observeSingleEventOfType` 方法。该监听的回调方法只被触发一次，之后会自动取消监听。
</blockquote>

### 移除监听

`removeObserverWithHandle` 方法用于移除指定事件。移除监听之后，事件回调方法将不会被触发。

参数为 `observeEventOfType` 方法的返回值
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncHandle handle = [ref observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot* snapshot) {
    NSLog(@"Snapshot value: %@", snapshot.value)
}];

[ref removeObserverWithHandle:handle];

```
</div>
<div class="slide-content">
```swift
var handle = ref.observeEventType(.Value, withBlock: { snapshot in
    print("Snapshot value: \(snapshot.value)")
})

ref.removeObserverWithHandle(handle)

```
</div>
</div>

在该节点调用 `removeAllObservers`方法，将移除该节点位置的所有监听。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[ref removeAllObservers];

```
</div>
<div class="slide-content">
```swift
ref.removeAllObservers()

```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  在父节点上调用 `removeAllObservers` 方法时不会移除在其子节点上添加的监听。
</blockquote>

## 条件监听
Wilddog Sync 支持对事件监听设置条件：数据排序或数据筛选。


### 根据数据排序监听

Wilddog Sync 支持按键(key)、按值(value)、按节点的优先级(priority) 或按指定子节点的值(value)对数据进行排序。

数据排序包含以下四种排序方法	

| 方法                     | 用法                    |
| ---------------------- | --------------------- |
| queryOrderedByChild    | 按指定子节点的值（Value）对结果排序。 |
| queryOrderedByKey      | 按键（key）对结果排序。         |
| queryOrderedByValue    | 按值（value）对结果排序。       |
| queryOrderedByPriority | 按优先级（priority）对结果排序。  |

**queryOrderedByChild**

`queryOrderedByChild` 方法用于按子节点的指定值（value）对结果排序。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中按照每个学生的身高（"height" 节点的值）进行排序：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// 初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://class-demo.wilddogio.com"];
[WDGApp configureWithOptions:option];
// 使用 orderByChild 进行排序
WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"students"];
[[ref queryOrderedByChild:@"height"]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"%@ was %@ meters tall", snapshot.key, snapshot.value[@"height"]);
}];

```
</div>
<div class="slide-content">
```swift
// 初始化 
let options = WDGOptions.init(syncURL: "https://class-demo.wilddogio.com")
WDGApp.configureWithOptions(options)
// 使用 orderByChild 进行排序
let ref = WDGSync.sync().referenceWithPath("students")
ref.queryOrderedByChild("height").observeEventType(.ChildAdded, withBlock: { snapshot in
    if let height = snapshot.value!["height"] as? Double {
        print("\(snapshot.key) was \(height) meters tall")
    }
})

```
</div>
</div>

**queryOrderedByKey**

`queryOrderedByKey` 方法用于按节点的键（key）对结果排序。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中按照学生的名称进行排序：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"students"];
[[ref queryOrderedByKey]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"%@ was %@", snapshot.key, snapshot.value[@"height"]);
}];

```
</div>
<div class="slide-content">
```swift
let ref = WDGSync.sync().referenceWithPath("students")
ref.queryOrderedByKey().observeEventType(.ChildAdded, withBlock: { snapshot in
    if let height = snapshot.value!["height"] as? Double {
        print("\(snapshot.key) was \(height)")
    }
})

```
</div>
</div>

**queryOrderedByValue**

`queryOrderedByValue`方法，可以按照子节点的值进行排序。

例如，在 [得分示例应用](https://class-demo.wilddogio.com/scores) 中按照得分数据进行排序

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[[scoresRef queryOrderedByValue] observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"The %@ student's score is %@", snapshot.key, snapshot.value);
}];

```
</div>
<div class="slide-content">
```swift
let scoresRef = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().observeEventType(.ChildAdded, withBlock: { snapshot in
    if let score = snapshot.value as? Int {
        print("The \(snapshot.key) student's score is \(score)")
    }
})

```
</div>
</div>

**queryOrderedByPriority**

`queryOrderedByPriority`方法用于根据子节点的优先级（priority）进行排序。


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>每次只能使用一种排序方法。对同一监听调用多个排序方法会引发错误。</li>
    <li>排序会占用较多计算机资源。如果你的应用使用了排序，建议定义 [.indexOn](/guide/sync/rules/introduce.html#indexOn) 规则，在服务器上添加索引以提高排序效率。详细请参考 [添加索引](/guide/sync/rules/guide.html#数据索引)。</li>
  </ul>
</blockquote>


### 根据数据筛选结果监听

对数据排序之后，才能进行数据筛选。

数据筛选包含以下五种方法

| 方法                   | 用法                                       |
| -------------------- | ---------------------------------------- |
| queryLimitedToFirst  | 设置从第一条开始，一共返回多少个节点。                      |
| queryLimitedToLast   | 设置从最后一条开始，一共返回多少个节点（返回结果仍是升序，降序要自己处理）。   |
| queryStartingAtValue | 返回大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| queryEndingAtValue   | 返回小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| queryEqualToValue    | 返回等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。 |

你可以结合不同的方法来筛选数据。例如，结合 `queryStartingAtValue` 方法与 `queryEndingAtValue` 方法将结果限制在指定的范围内。

**数量筛选**

`queryLimitedToFirst`方法获取从第一条（或 `queryStartingAtValue` 方法指定的位置）开始向后指定数量的子节点。 

`queryLimitedToLast` 方法获取从最后一条（或 `queryStartingAtValue` 方法指定的位置）开始向前指定数量的子节点。 

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中，如果你只想知道最高的是哪三位同学：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec

WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"students"];
[[[ref queryOrderedByChild:@"height"] queryLimitedToLast:3]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```
</div>
<div class="slide-content">
```swift

let ref = WDGSync.sync().referenceWithPath("students")
ref.queryOrderedByChild("height").queryLimitedToLast(3)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        print(snapshot.key)
})

```
</div>
</div>

如果使用 `queryLimitedToFirst:100` 筛选数据，那么第一次返回节点数最多为 100 个。当数据发生更改时，对于进入到前 100 个的节点，你会接收到 `WDGDataEventTypeChildAdded` 事件。对于从前 100 个中消失的节点，你会接收到 `WDGDataEventTypeChildRemoved` 事件。

**范围筛选**

`queryStartingAtValue`方法、`queryEndingAtValue`方法 和 `queryEqualToValue` 方法为查询选择任意起点、终点或等量点。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中，如果你只想知道哪些学生的考分超过 60：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *scoresRef = [[WDGSync sync] referenceWithPath:@"scores"];
[[[scoresRef queryOrderedByValue] queryStartingAtValue:@60]
    observeEventType:WDGDataEventTypeChildAdded withBlock:^(WDGDataSnapshot *snapshot) {

    NSLog(@"The %@ student's score is %@", snapshot.key, snapshot.value);
}];

```
</div>
<div class="slide-content">
```swift
let ref = WDGSync.sync().referenceWithPath("scores")
scoresRef.queryOrderedByValue().queryStartingAtValue(60).observeEventType(.ChildAdded, withBlock: { snapshot in
    
    print("The \(snapshot.key) student's score is \(snapshot.value)")
})

```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  范围筛选中，当节点的 value 相同时，会按照 key 进行排序。
</blockquote>

范围筛选可用于**数据分页**和**精确查询**。关于分页的具体实现，请参考 [如何实现分页](https://coding.net/u/wilddog/p/wilddog-gist-js/git/tree/master/src/pagination)。