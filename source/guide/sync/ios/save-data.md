title:  操作数据
---
本篇文档介绍操作数据的方法。

以下四种方法可以写入数据：

方法 |  说明 
----|------
setValue |向某个节点写入数据。若此节点已存在数据，数据会被覆盖。
childByAutoId | 向某个节点添加子节点。子节点的 key 由野狗自动生成并保证唯一，value 是你要写入的数据。
updateChildValues | 更新节点下指定 key 的值，而不影响其他数据。
runTransactionBlock | 用于并发场景下的事务处理。

## 写入数据

使用`setValue` 向某个节点写入数据。若节点已有数据，原有数据会被覆盖，包括其子节点的数据。

`setValue` 可以传入数据类型有 `NSString`, `NSNumber`, `NSDictionary`, `NSArray` 。

例如，使用 `setValue` 方法来添加用户：

Objective-C

```objectivec
[[[_ref child:@"users"] child:user.uid] setValue:@{@"username": username}];

```

Swift

```swift     
self.ref.child("users").child(user!.uid).setValue(["username": username])

```

以这种方式使用 	`setValue` 将覆盖指定位置的数据，包括所有子节点。 但是，你仍可在不重写整个对象的情况下更新子节点。 如果要允许用户更新其个人资料，则可按照如下所示更新用户名：

Objective-C

```objectivec
[[[[_ref child:@"users"] child:user.uid] child:@"username"] setValue:username];
    
```

Swift

```swift
self.ref.child("users/(user.uid)/username").setValue(username)

```

## 追加子节点

多个用户同时在一个节点下新增子节点时，如果子节点的 key 已存在，之前的数据会被覆盖，可以通过`childByAutoId` 解决这个问题。

`childByAutoId` 生成唯一 ID 作为 key ，它保证每条数据的 key 一定不同。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，将按时间先后标明。

使用`childByAutoId` 追加内容，例如我们向博客 app 写入 posts 数据：

Objective-C

```objectivec
WDGSyncReference *postRef = [ref child: @"posts"];
NSDictionary *post1 = @{
    @"author": @"gracehop",
    @"title": @"Announcing COBOL, a New Programming Language"
};
WDGSyncReference *post1Ref = [ref childByAutoId];
[post1Ref setValue: post1];

NSDictionary *post2 = @{
    @"author": @"alanisawesome",
    @"title": @"The Turing Machine"
};
WDGSyncReference *post2Ref = [ref childByAutoId];
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

可以看到，每个数据都有一个唯一 ID 作为数据的 key 。即使多个用户同时添加博客 post 也不会产生冲突。

## 更新数据

如果想只更新指定子节点，而不影响其它的子节点，可以使用`updateChildValues` 方法。

例如，博客应用要创建一篇博文，同时将其更新为最新的活动源和发布用户的活动源。 该博客应用使用如下代码

Objective-C

```objectivec
NSString *key = [[_ref child:@"posts"] childByAutoId].key;
NSDictionary *post = @{@"uid": userID,
                       @"author": username,
                       @"title": title,
                       @"body": body};
NSDictionary *childUpdates = @{[@"/posts/" stringByAppendingString:key]: post,
                               [NSString stringWithFormat:@"/user-posts/%@/%@/", userID, key]: post};
[_ref updateChildValues:childUpdates];

```

Swift

```swift
let key = ref.child("posts").childByAutoId().key
let post = ["uid": userID,
            "author": username,
            "title": title,
            "body": body]
let childUpdates = ["/posts/\(key)": post,
                    "/user-posts/\(userID)/\(key)/": post]
ref.updateChildValues(childUpdates)

```

此示例使用 `childByAutoId` 在节点（其中包含 `/posts/postid` 内所有用户博文）中创建一篇博文，同时使用 `getKey` 检索相应键。

然后，可以使用该键在用户博文（位于 `/user-posts/userid/postid` 内）中创建第二个条目。

通过使用这些路径，只需调用 `updateChildValues` 一次即可同步更新 JSON 树中的多个位置，例如，该示例如何在两个位置同时创建新博文。

通过这种方式同步更新具有原子性：要么所有更新全部成功，要么全部失败。

## 删除数据

删除数据最简单的方法是调用 `removeValue`。

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

此外，还可以通过写入 nil 值（例如，`setValue:nil` 或 `updateChildValues:nil`）来删除数据。 

**注意**：Wilddog 不会保存值为 nil 节点。如果某节点的值被设为 nil，云端就会把这个节点删除。

## 事务操作

处理可能因并发更新而损坏的数据（例如，增量计数器）时，可以使用事务操作。你可以为此操作提供更新函数和完成后的回调（可选）。

比如要实现一个记录点赞数量的功能，可能存在多人同时点赞的情况，就可以这样写一个事务：

Objective-C

```objectivec
// 初始化 App，同一个 appID 初始化一次即可
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
// 初始化 App，同一个 appID 初始化一次即可
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

注意：`runTransactionBlock:` 可能被多次被调用，必须处理 currentData 变量为 null 的情况。

当执行事务时，云端有数据存在，但是本地可能没有缓存，此时 currentData 为 null。

**事务操作原理**

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等

如果相等，则更新数据为你提交的数据；如果不相等，则返回新的当前值。更新函数将使用新的当前值和你提交的数据重复尝试更新，直到成功为止。


更多使用，请参考 [- runTransactionBlock:](https://docs.wilddog.com/api/sync/ios.html#–-runTransactionBlock)。