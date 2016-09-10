title:  保存数据
---

以下四种方法可用于将数据写入野狗云端：

方法 |  说明 
----|------
setValue | 将数据写入到指定的路径，如果指定路径已存在数据，那么数据将会被覆盖。 
childByAutoId | 添加到数据列表。每次调用 `childByAutoId` 时，Wilddog 均会生成唯一 ID，如 `user-posts/<user-id>/<unique-post-id>`。
updateChildValues | 更新节点的数据。不存在的子节点将会被新增，存在子节点依然存在。 
runTransactionBlock | 提供事务性更新，用于并发更新操作的场景。 

## 用 setValue 写入数据

`setValue` 是最基本的写数据操作，它会将数据写入当前引用指向的节点。该节点如果已有数据，任何原有数据都将被删除和覆盖，包括其子节点的数据。
`setValue` 可以传入几种数据类型 `NSString`, `NSNumber`, `NSDictionary`, `NSArray` 做为参数。
例如，可以使用 `setValue` 方法来添加用户，如下所示：

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

## 用 childByAutoId 追加新节点

当多个用户同时试图在一个节点下新增一个子节点的时候，这时，数据就会被重写覆盖。
为了解决这个问题，Wilddog `childByAutoId` 采用了生成唯一 ID 作为 key 的方式。通过这种方式，多个用户同时在一个节点下面调用 `childByAutoId`方法写数据，他们的 key 一定是不同的。这个 key 是通过一个基于时间戳和随机算法生成的，即使在一毫秒内也不会相同，并且表明了时间的先后，Wilddog 采用了足够多的位数保证唯一性。

我们可以通过下面的方式来向博客 app 写入 posts 数据：

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

由于使用了 `childByAutoId` 方法为每个博客 post 生成了基于时间戳的唯一标识，即使多个用户同时添加博客 post 也不会产生冲突。Wilddog Sync 数据库中的数据结构如下：

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

## 用 updateChildValues 更新数据

要同时向一个节点的特定子节点写入数据，而不覆盖其他子节点，请使用 `updateChildValues` 方法。

例如，社交博客应用可能要创建一篇博文，同时将其更新为最新的活动源和发布用户的活动源。  
为此，该博客应用使用如下代码

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

此示例使用 `childByAutoId` 在节点（其中包含 `/posts/$postid` 内所有用户博文）中创建一篇博文，同时使用 `getKey` 检索相应键。

然后，可以使用该键在用户博文（位于 `/user-posts/$userid/$postid` 内）中创建第二个条目。

通过使用这些路径，只需调用 `updateChildValues` 一次即可同步更新 JSON 树中的多个位置，例如，该示例如何在两个位置同时创建新博文。

通过这种方式同步更新具有原子性：要么所有更新全部成功，要么全部失败。

## 事务操作

处理可能因并发修改而损坏的数据（例如，增量计数器）时，可以使用事务处理操作。你可以为此操作提供更新函数和完成后的回调（可选）。

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等，如果相等，则更新数据为你提交的数据，如果不相等，则返回新的当前值，更新函数使用新的当前值和你提交的数据重复尝试更新，直到成功为止。

例如，在示例社交微博应用中，如果记录某篇微博的点赞数，使用事务处理可防止加点赞数时计数出错，保证数据的安全性和准确性，如下所示：

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