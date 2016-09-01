title:  读取和查询数据
---
本部分将介绍如何读取数据以及如何对数据进行排序和查询。
需要先提到的一点是，Wilddog SDK 的数据读取都是建立在添加监听的基础上，然后在监听的回调函数中完成对数据的读取。

## 监听的事件类型

使用 `observeEventType` 方法添加一个监听事件。一共有以下几种事件类型：

事件     | 描述
-------- | ---
WEventTypeValue | 当程序初始化时或者节点下有任何数据发生变化时触发
WEventTypeChildAdded | 当程序初始化时或者有新增子节点时触发
WEventTypeChildChanged | 当某个子节点发生变化时触发
WEventTypeChildRemoved	| 当有子节点被删除时触发
WEventTypeChildMoved | 当有子节点排序发生变化时触发

将 `WEventTypeChildAdded`、`WEventTypeChildChanged` 和 `WEventTypeChildRemoved` 配合使用，即可监听到对子节点做出各种的更改。

#### Value 事件 

使用 `WEventTypeValue` 事件来读取当前节点下的所有数据的静态快照。
此方法在初始化时会触发一次，此后每当有数据（包括任何子节点）变化都会被再次触发。初始化时，如果没有任何数据，则 `snapshot` 返回的 `value` 为 nil。
数据（包括子节点）的快照会以事件回调形式返回。

**注意**：每当指定路径下的数据（包括更深层节点数据）有改变时，都会触发 Value 事件。所以，为了聚焦你只关心的数据并降低快照的大小，你应该把要监听的节点路径设置的更加精确。
例如，如果不是必要，尽量不要在根路径设置 Value 监听。

让我们重温一下前一篇文章中博客的例子，来理解我们是如何从 Wilddog 数据库中读取数据的。我们的示例应用程序的博客文章是被存储在 url：`https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts `，若要了解博客实例展示的数据结构，请点击[博客实例数据库](https://docs-examples.wilddogio.com/web/saving-data)。为读取数据，我们可以这样做：

Objective-C 

```
// 获取一个我们帖子的引用
Wilddog *ref = [[Wilddog alloc] initWithUrl: @"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];

// 在帖子的引用下，绑定一个 block 去读取数据
[ref observeEventType:WEventTypeValue withBlock:^(WDataSnapshot *snapshot) {
    NSLog(@"%@", snapshot.value);
} withCancelBlock:^(NSError *error) {
    NSLog(@"%@", error.description);
}];

```

Swift

```
// 获取一个我们帖子的引用
var ref = Wilddog(url:"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")

// 在帖子的引用下，绑定一个 block 去读取数据
ref.observeEventType(.Value, withBlock: { snapshot in
    print(snapshot.value)
}, withCancelBlock: { error in
    print(error.description)
})
```


用 `observeEventType` 方法监听收到一个 `WDataSnapshot`，其中包含着 Value 事件发生时，数据库中 ref 指定节点下的所有数据。 如果该位置不存在任何数据，则 `value` 为 nil。

`WDataSnapshot` 里封装了一些常用的方法，帮助你更方便的处理数据，常用的列举如下：

方法     | 说明
-------- | ---
value | 返回当前快照的数据
children    | 获取当前快照中，所有子节点的迭代器，可用来遍历快照中每一个子节点
childrenCount    | 返回当前节点中子节点的个数
exists     | 如果 snapshot 对象包含数据返回 true，否则返回false
hasChildren     | 检查是否存在某个子节点

更多更详细的用法说明参见 [WDataSnapshot](/sync/ios/api.html#WDataSnapshot-Methods) 的 API 文档。

#### Child 事件
当某个节点的子节点发生改变时（如通过 `childByAutoId` 方法添加子节点，或通过 `updateChildValues` 更新子节点），就会触发 Child 事件。

`WEventTypeChildAdded` 事件常用来获取当前路径下的子节点列表。初始化时将针对每个现有的子节点触发一次(例如：列表拥有10个子节点，那么该方法就会触发10次)。之后每当增加子节点时就会再次触发，在回调中只获取新增的子节点数据。

每次子节点修改时，均会触发 `WEventTypeChildChanged` 事件。这包括对子节点的后代所做的任何修改。

删除直接子节点时，将会触发 `WEventTypeChildRemoved` 事件。传递给回调块的快照包含已删除的子节点的数据。

每当因更新（导致子节点重新排序）而触发 `WEventTypeChildChanged` 事件时，系统就会触发 `WEventTypeChildMoved` 事件。该事件用于通过 `orderByChild`、`orderByValue` 或 `orderByPriority` 中的任何一种进行排序的数据。

对于 `WEventTypeChildAdded` 的理解可以看下面的这个例子：

Objective-C 

```
// 获取一个我们帖子的引用
Wilddog *ref = [[Wilddog alloc] initWithUrl: @"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];

// 获得新增加的数据
[ref observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {
  NSLog(@"%@", snapshot.value[@"author"]);
  NSLog(@"%@", snapshot.value[@"title"]);
}];

```

Swift

```
// 获取一个我们帖子的引用
var ref = Wilddog(url:"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")

// 获得新增加的数据
ref.observeEventType(.ChildAdded, withBlock: { snapshot in
    print(snapshot.value!.objectForKey("author"))
    print(snapshot.value!.objectForKey("title"))
})
```

## 一次性读取数据

在某些情况下，你可能希望只返回一次回调。（例如，在初始化时，预期 UI 元素不会再发生更改时）。你可以使用 `observeSingleEventOfType` 方法简化这种情况：

添加的事件回调仅触发一次，以后不会再次触发。

对于只需加载一次且预计不会频繁变化，或是我们需要主动拉取的数据，这非常有用。 例如，上述示例中的博客应用([博客实例数据库](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts))使用此方法，获取最初的博客数量，你会发现 `observeSingleEventOfType` 方法只回调了一次：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl: @"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts"];
__block NSInteger count = 0;

[ref observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {
    count++;
    NSLog(@"added -> %@", snapshot.value);
}];

// 一次性读取数据。
// snapshot.childrenCount 等于 WEventTypeChildAdded 事件返回的 snapshot.value 数量的计数总和 
// WEventTypeValue 是最后触发的
[ref observeSingleEventOfType:WEventTypeValue withBlock:^(WDataSnapshot *snapshot) {
    NSLog(@"initial data loaded! %d", count == snapshot.childrenCount);
}];

```

Swift

```
var ref = Wilddog(url:"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts")
var count:UInt = 0

ref.observeEventType(.ChildAdded, withBlock: { snapshot in
    count++
    print("added -> \(snapshot.value)")
})

// 一次性读取数据。
// snapshot.childrenCount 等于 .ChildAdded 事件返回的 snapshot.value 数量的计数总和
// .Value 是最后触发的
ref.observeEventType(.Value, withBlock: { snapshot in
    print("initial data loaded! \(count == snapshot.childrenCount)")
})

```

野狗数据实时同步的事件监听有以下几个重要的保证：

监听事件的保证 |
---- |
本地数据状态发生了改变，事件就会触发 |
事件始终会保证数据的最终一致性和正确性，可能由于本地操作、断线等问题造成临时不一致，但最终数据会保持一致 |
写到一个客户端的数据总会写到服务端并且按照顺序广播到其他端 |
Value 事件总是最后触发，并且能保证包含快照（`snapshot`）生成之前的所有改变 |

## 移除监听

当你退出 `ViewController` 时，观测程序不会自动停止同步数据。 如果未正确删除，观测程序会继续将数据同步到本地内存。 不再需要观测程序时，通过将关联的 `WilddogHandle` 传递给 `removeObserverWithHandle` 方法，即可将其删除。

将回调快添加到引用时，会返回 `WilddogHandle`。这些句柄可用于删除回调块的监听。

Objective-C

```
WilddogHandle handle = [ref observeEventType:WEventTypeValue withBlock:^(WDatasnapshot* snapshot) {
    NSLog(@"Snapshot value: %@", snapshot.value)
}];

[ref removeObserverWithHandle:handle];

```

Swift

```
var handle = ref.observeEventType(.Value, withBlock: { snapshot in
    print("Snapshot value: \(snapshot.value)")
})

ref.removeObserverWithHandle(handle)

```


如果已将多个侦听器添加到数据库引用，则会在引发事件时调用每个侦听器。 要在该位置停止同步数据，必须通过调用 `removeAllObservers` 方法删除其中的所有观测程序 (`removeAllObservers`方法的作用是取消之前用 `observeEventType `方法在该节点注册的所有监听事件。)。

Objective-C

```
[ref removeAllObservers];

```

Swift

```
ref.removeAllObservers()

```

在父节点上调用 `removeObserverWithHandle` 或者 `removeAllObservers` 时不会删除在其子节点上注册的监听。你还必须跟踪这些引用或句柄才能将其删除。



## 排序和查询数据

你可以使用 [WQuery](/sync/ios/api.html#WQuery-Methods) 类 API 进行数据排序。Wilddog 支持按键、按值、按子节点的值或按优先级对数据进行排序。
只有在对数据排序之后，你才可以进行具体的查询操作，从而获取你想要的特定数据。

**注意**：排序和过滤的开销可能会很大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/sync/rules/API-rule.html#indexOn) 规则，以便在服务器上添加索引以提高查询性能。详细操作参见[添加索引](/sync/rules/introduce-rule.html#数据索引)。

#### 数据排序

对数据排序前，要先指定按照`键`、`值`、`子节点的值`或按`优先级`这四种的哪一种排序。对应的方法如下：

方法 | 用法
----  | ----
queryOrderedByKey | 按子键对结果排序。
queryOrderedByValue | 按子值对结果排序。
queryOrderedByChild | 按指定子键的值对结果排序。
queryOrderedByPriority | 按节点的指定优先级对结果排序。

**注意**：每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。作为一种变通的方法，你可以先按一种方式查询，然后自行在结果集中进行第二次查询。

**按指定子键的值对结果排序**

通过将子节点的路径名作为参数传递给`queryOrderedByChild:`，可以实现按指定子节点排序。例如，在恐龙的实例中（若要了解恐龙实例展示的数据结构，请点击[恐龙实例数据库](https://dinosaur-facts.wilddogio.com/dinosaurs)），要按照 height 进行排序，可以这样做：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[ref queryOrderedByChild:@"height"]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@ was %@ meters tall", snapshot.key, snapshot.value[@"height"]);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").observeEventType(.ChildAdded, withBlock: { snapshot in
    if let height = snapshot.value!["height"] as? Double {
        print("\(snapshot.key) was \(height) meters tall")
    }
})

```

**按子键对结果排序**

使用`queryOrderedByKey`函数，可以实现按照数据节点的名称进行排序。下面的例子按照 alpha 字母顺序读取所有的恐龙数据：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[ref queryOrderedByKey]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@ was %@", snapshot.key, snapshot.value[@"height"]);
}];

```

Swift

```
var ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByKey().observeEventType(.ChildAdded, withBlock: { snapshot in
    if let height = snapshot.value!["height"] as? Double {
        print("\(snapshot.key) was \(height)")
    }
})

```

**按子值对结果排序**

使用`queryOrderedByValue`方法，我们可以按照子节点的值进行排序。假设恐龙们进行了一场运动会，我们统计到它们的得分数据：

```
{
  "scores": {
    "bruhathkayosaurus" : 55,
    "lambeosaurus" : 21,
    "linhenykus" : 80,
    "pterodactyl" : 93,
    "stegosaurus" : 5,
    "triceratops" : 22
  }
}

```
要按照得分进行排序，我们可以构造一个这样的查询：

Objective-C

```
Wilddog *scoresRef = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/scores"];
[[scoresRef queryOrderedByValue] observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {
    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];

```

Swift

```
let scoresRef = Wilddog(url:"https://dinosaur-facts.wilddogio.com/scores")
scoresRef.queryOrderedByValue().observeEventType(.ChildAdded, withBlock: { snapshot in
    if let score = snapshot.value as? Int {
        print("The \(snapshot.key) dinosaur's score is \(score)")
    }
})

```


#### 查询数据

只有对数据排序进行之后，才能查找数据，你可以结合使用以下方法来构造查找的条件。

方法 | 用法
---- | ----
queryLimitedToFirst | 设置从第一条开始，一共返回多少条数据（节点）。
queryLimitedToLast | 设置从最后一条开始，一共返回多少条（返回结果仍是升序，降序要自己处理）。
queryStartingAtValue | 返回大于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
queryEndingAtValue | 返回小于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
queryEqualToValue | 返回等于指定的键、值或优先级的数据，具体取决于所选的排序方法。可用于精确查询。

与排序依据方法不同，你可以结合使用这些过滤方法。例如，你可以结合使用 `queryStartingAtValue` 与 `queryEndingAtValue` 方法将结果限制在指定的范围内。

**限制结果数**

你可以使用 `queryLimitedToFirst` 和 `lqueryLimitedToLast` 方法为某个给定的事件设置要监听的子节点的最大数量。 例如，如果你使用 `queryLimitedToFirst` 将限制个数设置为 100，那么一开始最多只能收到 100 个 `WEventTypeChildAdded` 事件，即只返回前100条数据的快照。
当数据发生更改时，对于进入到前100的数据，你会接收到 `WEventTypeChildAdded` 回调，对于从前100中删除的数据，你才会接收到 `WEventTypeChildRemoved` 事件，也就是说只有这100条里的数据变化才会触发事件。

继续恐龙（[恐龙实例数据库](https://dinosaur-facts.wilddogio.com/dinosaurs)）的例子，我们可以获得体重最大的两种恐龙：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByChild:@"weight"] queryLimitedToLast:2] observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("weight").queryLimitedToLast(2)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        print(snapshot.key)
})

```

我们为`ChildAdded`事件绑定的回调方法只会被执行2次。

同理，我们可以使用`queryLimitedToFirst:`方法查询最矮的两种恐龙：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByChild:@"height"] queryLimitedToFirst:2]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").queryLimitedToFirst(2)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        print(snapshot.key)
})

```

我们也可以组合`queryOrderedByValue`方法来使用 limit 类的查询。如果要构造出恐龙运动会得分的前3名，我们可以构造这样一个查询：

Objective-C

```
Wilddog *scoresRef = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/scores"];
[[[scoresRef queryOrderedByValue] queryLimitedToLast:3]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"The %@ dinosaur's score is %@", snapshot.key, snapshot.value);
}];

```

Swift

```
let scoresRef = Wilddog(url:"https://dinosaur-facts.wilddogio.com/scores")
scoresRef.queryOrderedByValue().queryLimitedToLast(3).observeEventType(.ChildAdded, withBlock: { snapshot in
    
    print("The \(snapshot.key) dinosaur's score is \(snapshot.value)")
})

```

**range查询**

使用`queryStartingAtValue:`，`queryEndingAtValue:`和`queryEqualToValue:`方法，可以为我们的查询指定任意的起止范围。如上面恐龙（[恐龙实例数据库](https://dinosaur-facts.wilddogio.com/dinosaurs)）的例子，如果要查询所有3米高以上的恐龙，可以组合`queryOrderByChild:`和`queryStartingAtValue:`查询：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByChild:@"height"] queryStartingAtValue:@3]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").queryStartingAtValue(3)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        
        print(snapshot.key)
})

```

按照字母排序，我们可以使用`queryEndingAtValue:`来查询所有名字排在 Pterodactyl 之前的恐龙：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByKey] queryEndingAtValue:@"pterodactyl"]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByKey().queryEndingAtValue("pterodactyl")
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        
        print(snapshot.key)
})

```

注意，`queryStartingAtValue:`和`queryEndingAtValue:`是包含边界值的，也就是说“pterodactyl”符合上边的查询条件。

我们可以同时使用`queryStartingAtValue:`和`queryStartingAtValue:`来限定一个范围。下面的例子查询出所有名字以字母“b”开头的恐龙：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[[ref queryOrderedByKey] queryStartingAtValue:@"b"] queryEndingAtValue:@"b\uf8ff"]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];

```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByKey().queryStartingAtValue("b").queryEndingAtValue("b\u{f8ff}")
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        
        print(snapshot.key)
})

```
这个例子中使用的“~”符号是 ASCII 中的126字符。因为它排在所有常规的 ASCII 字符之后，所以这个查询匹配所有以b开头的值。

使用`queryEqualToValue:`函数，可以进行精准的查询。例如，查询所有的25米高的恐龙：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref queryOrderedByChild:@"height"] queryEqualToValue:@25]
    observeEventType:WEventTypeChildAdded withBlock:^(WDataSnapshot *snapshot) {

    NSLog(@"%@", snapshot.key);
}];
```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.queryOrderedByChild("height").queryEqualToValue(25)
    .observeEventType(.ChildAdded, withBlock: { snapshot in
        
        print(snapshot.key)
})

```

**总结**
组合这些函数，我们可以构造出各种复杂的查询。例如，要找出长度小于 Stegosaurus 但最接近的恐龙的名字：

Objective-C

```
Wilddog *ref = [[Wilddog alloc] initWithUrl:@"https://dinosaur-facts.wilddogio.com/dinosaurs"];
[[[ref childByAppendingPath:@"stegosaurus"] childByAppendingPath:@"height"]
 observeEventType:WEventTypeValue withBlock:^(WDataSnapshot *stegosaurusHeightSnapshot) {
     NSNumber *favoriteDinoHeight = stegosaurusHeightSnapshot.value;
     WQuery *queryRef = [[[ref queryOrderedByChild:@"height"] queryEndingAtValue:favoriteDinoHeight] queryLimitedToLast:2];
     [queryRef observeSingleEventOfType:WEventTypeValue withBlock:^(WDataSnapshot *querySnapshot) {
         if (querySnapshot.childrenCount == 2) {
             for (WDataSnapshot* child in querySnapshot.children) {
                 NSLog(@"The dinosaur just shorter than the stegasaurus is %@", child.key);
                 break;
             }
         } else {
             NSLog(@"The stegosaurus is the shortest dino");
         }
     }];
 }];
 
```

Swift

```
let ref = Wilddog(url:"https://dinosaur-facts.wilddogio.com/dinosaurs")
ref.childByAppendingPath("stegosaurus").childByAppendingPath("height")
    .observeEventType(.Value, withBlock: { stegosaurusHeightSnapshot in
        if let favoriteDinoHeight = stegosaurusHeightSnapshot.value as? Double {
            let queryRef = ref.queryOrderedByChild("height").queryEndingAtValue(favoriteDinoHeight).queryLimitedToLast(2)
            queryRef.observeSingleEventOfType(.Value, withBlock: { querySnapshot in
                if querySnapshot.childrenCount == 2 {
                    let child: WDataSnapshot = querySnapshot.children.nextObject() as! WDataSnapshot
                    print("The dinosaur just shorter than the stegasaurus is \(child.key)");
                } else {
                    print("The stegosaurus is the shortest dino");
                }
            })
        }
    })

```

#### 数据排序
本小节介绍在使用各种排序方式时，数据究竟是如何排序的。

**queryOrderedByChild**

当使用`queryOrderedByChild:`时，按照子节点的公有属性 key 的 value 进行排序。仅当 value 为单一的数据类型时，排序有意义。如果 key 属性有多种数据类型时，排序不固定，此时不建议使用`queryOrderedByChild:`获取全量数据，例如，

```json
{
  "scores": {
    "no1" : {
        "name" : "tyrannosaurus",
        "score" : "120"
    },
    "no2" : {
        "name" : "bruhathkayosaurus",
        "score" : 55
    },
    "no3" : {
        "name" : "lambeosaurus",
        "score" : 21
    },
    "no4" : {
        "name" : "linhenykus",
        "score" : 80
    }, 
    "no5" : {
        "name" : "pterodactyl",
        "score" : 93
    }, 
    "no6" : {
        "name" : "stegosaurus",
        "score" : 5
    }, 
    "no7" : {
        "name" : "triceratops",
        "score" : 22
    }, 
    "no8" : {
        "name" : "brontosaurus",
        "score" : true
    }
  }
}

```

霸王龙的分数是`NString`类型，雷龙的分数是`BOOL`类型，而其他恐龙的分数是`NSNumber`类型，此时使用`queryOrderedByChild:`获得全量数据时，是一个看似固定的排序结果；但是配合使用`queryLimitedToFirst:`时，将获得不确定的结果。`NSObject`类型数据的 value 值为 null，不会出现在结果中。
当配合使用`queryStartingAtValue:`、`queryEndingAtValue:`和`queryEqualToValue:`时，如果子节点的公有属性 key 包含多种数据类型，将按照这些函数的参数的类型排序，即只能返回这个类型的有序数据。上面的数据如果使用 `[[[ref queryOrderedByChild:@"score"]queryStartingAtValue:@60]queryLimitedToFirst:4]` 将得到下面的结果：

```json
{
   "no4" : {
       "name" : "linhenykus",
       "score" : 80
   },
   "no5" : {
       "name" : "pterodactyl",
       "score" : 93
   }
}
  
```

<p style='color:red'><em>注意：如果 path 与 value 的总长度超过1000字节时，使用 `queryOrderedByChild:` 将搜索不到该数据。</em></p>

**queryOrderedByKey**

当使用`queryOrderedByKey`对数据进行排序时，数据将会按照下面的规则，以字段名升序排列返回。注意，节点名只能是字符串类型。

1, 节点名能转换为32-bit整数的子节点优先，按数值型升序排列。

2, 接下来是字符串类型的节点名，按字典序排列。

**queryOrderedByValue**

当使用`queryOrderedByValue`时，按照直接子节点的 value 进行排序。仅当 value 为单一的数据类型时，排序有意义。如果子节点包含多种数据类型时，排序不固定，此时不建议使用`queryOrderedByValue`获取全量数据，例如，

```json
{
  "scores": {
    "tyrannosaurus" : "120",
    "bruhathkayosaurus" : 55,
    "lambeosaurus" : 21,
    "linhenykus" : 80,
    "pterodactyl" : 93,
    "stegosaurus" : 5,
    "triceratops" : 22,
    "brontosaurus" : true
  }
}

```

霸王龙的分数是 `NSString`类型，雷龙的分数是 `BOOL` 类型，而其他恐龙的分数是 `NSNumber` 类型，此时使用 `queryOrderedByValue` 获得全量数据时，是一个看似固定的排序结果；但是配合使用`queryLimitedToFirst:`时，将获得不确定的结果。`NSObject`类型数据的 value 值为 null，不会出现在结果中。
当配合使用`queryStartingAtValue:`、`queryEndingAtValue:`和`queryEqualToValue:`时，如果子节点的 value 包含多种数据类型，将按照这些函数的参数的类型排序，即只能返回这个类型的有序数据。上面的数据如果使用`[[[ref queryOrderedByValue]queryStartingAtValue:@60]queryLimitedToFirst:4]`将得到下面的结果：

```json
{
    "linhenykus" : 80,
    "pterodactyl" : 93
}
```
<p style='color:red'><em>注意：如果 path 与 value 的总长度超过1000字节时，使用`queryOrderedByValue:`将搜索不到该数据。</em></p>

**queryOrderedByPriority**

当使用`queryOrderedByPriority`对数据进行排序时，子节点数据将按照优先级和字段名进行排序。注意，优先级的值只能是数值型或字符串。

1, 没有优先级的数据（默认）优先。

2, 接下来是优先级为数值型的子节点。它们按照优先级数值排序，由小到大。

3, 接下来是优先级为字符串的子节点。它们按照优先级的字典序排列。

4, 当多个子节点拥有相同的优先级时（包括没有优先级的情况），它们按照节点名排序。节点名可以转换为数值类型的子节点优先（数值排序），接下来是剩余的子节点（字典序排列）。



