title:  操作数据
---
本篇文档介绍如何写入、更新、删除数据。

包含以下五种方法

方法 |  说明 
----|------
setValue |向某个节点写入数据。若此节点已存在数据，会覆盖原有数据。
childByAutoId | 向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。
updateChildValues | 更新指定子节点。
removeValue | 删除指定子节点。
runTransactionBlock | 数据并发操作时保证数据一致性。

## 写入数据

`setValue` 方法向某个节点写入数据。若此节点已有数据，会覆盖原有数据，包括其子节点的数据。

`setValue` 方法可以写入的数据类型有 `NSString`, `NSNumber`, `NSDictionary`, `NSArray` 。

例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`

Objective-C

```objectivec
// 初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];
// 获取一个 WDGSyncReference 实例
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
//初始化 
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options) 
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com//web/saving-data/wildblog")           
var alanisawesome = ["full_name": "Alan Turing", "date_of_birth": "June 23, 1912"]
var gracehop = ["full_name": "Grace Hopper", "date_of_birth": "December 9, 1906"]

var usersRef = ref.child("users")

var users = ["alanisawesome": alanisawesome, "gracehop": gracehop]
// 写入数据
usersRef.setValue(users)

```

访问 [博客数据页面](https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop)，将会看到刚才写入的数据。

**注意**：`https://docs-examples.wilddogio.com` 是示例应用，数据为只读模式，主要用于野狗博客示例的数据展示。如果你想写入数据，可以将 `docs-examples` 替换成自己应用的 AppID。

## 追加子节点

`childByAutoId` 方法向某个节点添加子节点。子节点的 key 由 Sync 自动生成并保证唯一。 这个 key 基于时间戳和随机算法生成，它标明了时间的先后。

例如，追加子节点到 `posts` 节点

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

产生的数据如下

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

你可以通过调用 `getKey` 方法来获取这个唯一 ID 
Objective-C

```objectivec
WDGSyncReference *newPostRef = [postRef childByAutoId];
// 获取 childByAutoId 生成的唯一 ID
NSString *postID = newPostRef.key;

```

Swift

```swift
let newPostRef = postRef.childByAutoId()
// 获取 childByAutoId 生成的唯一 ID
var postID = newPostRef.key

```

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

**多路径更新**

`updateChildValues` 方法也支持多路径更新，即同时更新不同路径下的数据。举例如下

```js
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}
```
希望同时更新 b 节点下的 d 和 x 节点下的 z。标识路径时，要用 `b/d`, 和 `x/z` 

Objective-C

```objectivec
[newPostRef updateChildValues:@{@"b/d":@"updateD",@"x/z":@"updateZ"}];

```

Swift

```swift

newPostRef.updateChildValues(["b/d":"updateD","x/z":"updateZ"])

```

而**不能**这样写

Objective-C

```objectivec
// 错误的多路径更新写法！！
[newPostRef updateChildValues:@{@"b":@{@"d":@"updateD"},@"x":@{@"z":@"updateZ"}}];

```

Swift

```swift
// 错误的多路径更新写法！！
newPostRef.updateChildValues(["b":["d":"updateD"],"x":["z":"updateZ"]])

```

该操作相当于 `setValue` 方法，会覆盖原有数据。

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

**注意**：Sync 不会保存 value 为 nil 的节点。如果某节点的 value 为 nil，云端会删除这个节点。

## 事务处理

`runTransactionBlock` 方法用于数据并发操作时保证数据一致性。

例如，要实现一个记录点赞数量的功能，它可能存在多人同时点赞的情况。如果不用事务处理，那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

使用事务处理可以避免这种情况


Objective-C

```objectivec
// 初始化 WDGApp
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://docs-examples.wilddogio.com"];
[WDGApp configureWithOptions:option];  

// 获取一个 WDGSyncReference 实例
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

// 获取一个 WDGSyncReference 实例
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

**注意**：当云端有数据存在，本地还未缓存时，此时回调方法的变量为 null，所以要判断变量是否为空。

更多使用，请参考 [- runTransactionBlock:](https://docs.wilddog.com/api/sync/ios.html#–-runTransactionBlock)。