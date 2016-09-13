title:  操作数据
---
本篇文档介绍操作数据的方法。

以下四种方法用于写入数据：

方法 |  说明 
----|------
setValue |向某个节点写入数据。若此节点已存在数据，会覆盖这些数据。
childByAutoId | 向某个节点添加子节点。子节点的 key 由野狗自动生成并保证唯一，value 是你要写入的数据。
updateChildValues | 更新节点下指定 key 的值，而不影响其他数据。
runTransactionBlock | 用于并发场景下的事务处理。

## 写入数据

`setValue` 方法向某个节点写入数据。若节点已有数据，会覆盖原有数据，包括其子节点的数据。

`setValue` 可以传入数据类型有 `NSString`, `NSNumber`, `NSDictionary`, `NSArray` 。

例如，在博客的例子中使用 `setValue` 方法来添加用户信息：

首先，我们需要初始化 WDGApp：

Objective-C

```objectivec
// 初始化 WDGApp，同一个 appID 初始化一次即可
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];

```

Swift

```swift  
//初始化 WDGApp，同一个 appID 初始化一次即可   
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options)

```

接下来，开始写入数据：

Objective-C

```objectivec
// 获取一个 WDGSyncReference 对象
WDGSyncReference *ref = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com//web/saving-data/wildblog"];
NSDictionary *alanisawesome = @{
                                @"full_name" : @"Alan Turing",
                                @"date_of_birth": @"June 23, 1912"
                                };
NSDictionary *gracehop = @{
                           @"full_name" : @"Grace Hopper",
                           @"date_of_birth": @"December 9, 1906"
                           };
                           
Wilddog *usersRef = [ref child: @"users"];
NSDictionary *users = @{
                        @"alanisawesome": alanisawesome,
                        @"gracehop": gracehop
                        };
// 写入数据
[usersRef setValue: users];

```

Swift

```swift  
// 获取一个 WDGSyncReference 对象
let ref = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com//web/saving-data/wildblog")           
var alanisawesome = ["full_name": "Alan Turing", "date_of_birth": "June 23, 1912"]
var gracehop = ["full_name": "Grace Hopper", "date_of_birth": "December 9, 1906"]

var usersRef = ref.child("users")

var users = ["alanisawesome": alanisawesome, "gracehop": gracehop]
// 写入数据
usersRef.setValue(users)

```

现在，我们访问[博客实例数据库](https://docs-examples.wilddogio.com/web/saving-data/wildblog/users)，将会看到刚才写入的数据。

**注意**：`https://docs-examples.wilddogio.com`这个数据库是只读数据库，主要用于野狗博客实例数据展示。如果你想要体验写数据操作，可以将 `docs-examples` 替换成自己应用的 AppID。如果没有应用，请点击 [控制面板-创建应用](/console/creat.html)。

## 追加子节点

`childByAutoId` 方法会生成唯一 ID 作为 key ，要写入的数据作为 value ，进行数据写入。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，它标明了时间的先后。

例如，追加子节点到 `posts` 节点：

Objective-C

```objectivec
WDGSyncReference *postRef = [ref child: @"posts"];
NSDictionary *post1 = @{
    @"author": @"gracehop",
    @"title": @"Announcing COBOL, a New Programming Language"
};
WDGSyncReference *post1Ref = [postRef childByAutoId];
[post1Ref setValue: post1];

NSDictionary *post2 = @{
    @"author": @"alanisawesome",
    @"title": @"The Turing Machine"
};
WDGSyncReference *post2Ref = [postRef childByAutoId];
[post2Ref setValue: post2];

```

Swift

```swift
let postRef = ref.child("posts")
let post1 = ["author": "gracehop", "title": "Announcing COBOL, a New Programming Language"]
let post1Ref = postRef.childByAutoId()
post1Ref.setValue(post1)

let post2 = ["author": "alanisawesome", "title": "The Turing Machine"]
let post2Ref = postRef.childByAutoId()
post2Ref.setValue(post2)

```
产生的数据如下：

```json
{
  "posts": {
    "-JRHTHaIs-jNPLXOQivY": {
      "author": "gracehop",
      "title": "Announcing COBOL, a New Programming Language"
     },
    "-JRHTHaKuITFIhnj02kE": {
      "author": "alanisawesome",
      "title": "The Turing Machine"
    }
  }
}

```

可以看到，每个数据都有一个唯一 ID 作为数据的 key 。

## 更新数据

`updateChildValues` 方法用于更新指定子节点，而不影响其他节点。

```json
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}
```

Objective-C

```objectivec
WDGSyncReference *hopperRef = [usersRef child: @"gracehop"];
 
NSDictionary *nickname = @{
    @"nickname": @"Amazing Grace",
};
//只更新 gracehop 的 nickname
[hopperRef updateChildValues: nickname];

```

Swift

```swift

var hopperRef = usersRef.child("gracehop")
var nickname = ["nickname": "Amazing Grace"]
//只更新 gracehop 的 nickname
hopperRef.updateChildValues(nickname)

```

如果用 `setValue` 而不是 `updateChildValues`，则会删除 `date_of_birth` 和 `full_name`。

## 删除数据

`removeValue`方法用于删除数据：

Objective-C

```objectivec
WDGSyncReference *ref = [[WDGSync sync] reference];
[ref setValue:@{@"name" : @"Jone", @"age" : @"23"}];

//删除上面写入的数据
[ref removeValue];
```
Swift

```swift
let ref = WDGSync.sync().reference()
[ref.setValue(["name" : "Jone", "age" : "23"])

//删除上面写入的数据
messagesRef.removeValue()
```

此外，还可以通过写入 nil 值（例如，`setValue:nil`）来删除数据。 

**注意**：Sync 不会保存值为 nil 节点。如果某节点的值被设为 nil，云端就会把这个节点删除。

## 事务

`runTransactionBlock` 方法用于可能因并发更新而损坏数据的情景。

例如，要实现一个记录点赞数量的功能，它会存在多人同时点赞的情况：

Objective-C

```objectivec
// 初始化 WDGApp
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];  

// 获取一个 WDGSyncReference 对象
WDGSyncReference *upvotesRef =[[WDGSync sync] referenceFromURL:@"https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes"];
    
[upvotesRef runTransactionBlock:^WDGTransactionResult *(WDGMutableData *currentData) {
    NSNumber *value = currentData.value;
    if (currentData.value == [NSNull null]) {
        value = 0;
    }
    [currentData setValue:[NSNumber numberWithInt:(1 + [value intValue])]];
    return [WDGTransactionResult successWithValue:currentData];
}];

```

Swift

```swift
// 初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options)

// 获取一个 WDGSyncReference 对象
let upvotesRef = WDGSync.sync().referenceFromURL("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes")
        
upvotesRef.runTransactionBlock({
     (currentData:WDGMutableData!) in
     var value = currentData.value as? Int
     if (value == nil) {
         value = 0
     }
     currentData.value = value! + 1
     return WDGTransactionResult.successWithValue(currentData)
})

```

如果上面的代码没有使用事务, 那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

**注意**：`runTransactionBlock:` 的回调可能会多次被调用，必须处理 currentData.value 变量为 nil 的情况。当执行事务时，云端有数据存在，但是本地可能没有缓存，此时 currentValue.value 为 nil。

更多使用，请参考 [- runTransactionBlock:](https://docs.wilddog.com/api/sync/ios.html#–-runTransactionBlock)。