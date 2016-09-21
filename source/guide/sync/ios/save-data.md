
title:  操作数据
---
本篇文档介绍如何操作数据，分为写入，更新和删除数据。

操作数据包含以下五种方法

| 方法                  | 说明                                       |
| ------------------- | ---------------------------------------- |
| setValue            | 向任意节点写入数据。若此节点已存在数据，会覆盖原有数据。             |
| childByAutoId       | 向任意节点添加子节点。子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 |
| updateChildValues   | 更新指定子节点。                                 |
| removeValue         | 删除指定节点。                                  |
| runTransactionBlock | 并发操作时保证数据一致性。                            |

## 写入数据

`setValue` 方法用于向任意节点写入数据。若此节点已有数据，会覆盖原有（包括其子节点）的数据。

例如，向 `gracehop` 节点下写入 `date_of_birth ` 、`full_name ` 和 `nickname`

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// 初始化 
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<appId>.wilddogio.com"];
[WDGApp configureWithOptions:option];
// 获取一个 WDGSyncReference 实例
WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"/web/saving-data/wildblog/users"];
NSDictionary *gracehop = @{
                           @"date_of_birth": @"December 9, 1906",
                           @"full_name" : @"Grace Hopper",
                           @"nickname": @"Amazing Grace"
                           };
// child 用来定位到某个节点。                           
WDGSyncReference *usersRef = [ref child: @"gracehop"];
[usersRef setValue: gracehop];
```
</div>
<div class="slide-content">
```swift 
//初始化
let options = WDGOptions.init(syncURL: "https://<appId>.wilddogio.com")
WDGApp.configureWithOptions(options)
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceWithPath("/web/saving-data/wildblog/users")
var gracehop = ["date_of_birth": "December 9, 1906", "full_name": "Grace Hopper","nickname": "Amazing Grace"]

// child 用来定位到某个节点。
var usersRef = ref.child("gracehop")
usersRef.setValue(gracehop)

```
</div>
</div>

`setValue` 方法可以写入的数据类型有 `NSString`, `NSNumber`, `NSDictionary`, `NSArray` 。

`setValue` 方法还有一个可选参数，此参数是一个回调方法，用来获取操作的结果

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
NSDictionary *gracehop = @{
                           @"date_of_birth": @"December 9, 1906",
                           @"full_name" : @"Grace Hopper",
                           @"nickname": @"Amazing Grace"
                           };
[[ref child: @"gracehop"] setValue:gracehop withCompletionBlock:^(NSError * _Nullable error, WDGSyncReference * _Nonnull ref) {
    if (error == nil) {
        // 数据同步到野狗云端成功完成
    }
}];
```
</div>
<div class="slide-content">
```swift 
ref.child("gracehop").setValue(gracehop, withCompletionBlock: { error, ref in
    if error == nil{
         // 数据同步到野狗云端成功完成
    }
})

```
</div>
</div>

## 追加子节点

`childByAutoId` 方法向任意节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。

例如，追加子节点到 `posts` 节点

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
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
</div>
<div class="slide-content">
```swift
let postRef = ref.child("posts")
let post1 = ["author": "gracehop", "title": "Announcing COBOL, a New Programming Language"]
let post1Ref = postRef.childByAutoId()
post1Ref.setValue(post1)

let post2 = ["author": "alanisawesome", "title": "The Turing Machine"]
let post2Ref = postRef.childByAutoId()
post2Ref.setValue(post2)

```
</div>
</div>

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

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *newPostRef = [postRef childByAutoId];
// 获取 childByAutoId 生成的唯一 ID
NSString *postID = newPostRef.key;

```
</div>
<div class="slide-content">
```swift
let newPostRef = postRef.childByAutoId()
// 获取 childByAutoId 生成的唯一 ID
var postID = newPostRef.key

```
</div>
</div>

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

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *hopperRef = [usersRef child: @"gracehop"];
 
NSDictionary *nickname = @{
    @"nickname": @"Amazing Grace",
};
//只更新 gracehop 的 nickname
[hopperRef updateChildValues: nickname];
```
</div>
<div class="slide-content">
```swift

var hopperRef = usersRef.child("gracehop")
var nickname = ["nickname": "Amazing Grace"]
//只更新 gracehop 的 nickname
hopperRef.updateChildValues(nickname)

```
</div>
</div>

与 `setValue` 方法对比：如果用 `setValue` 而不是 `updateChildValues`，则会删除 `date_of_birth` 和 `full_name`。

**多路径更新**

`updateChildValues` 方法也支持多路径更新，即同时更新不同路径下的数据。例如

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
希望同时更新 b 节点下的 d 和 x 节点下的 z。注意标识路径时，要用 `b/d`, 和 `x/z` 

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[newPostRef updateChildValues:@{@"b/d":@"updateD",@"x/z":@"updateZ"}];

```
</div>
<div class="slide-content">
```swift

newPostRef.updateChildValues(["b/d":"updateD","x/z":"updateZ"])

```
</div>
</div>

而**不能**写成

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// 错误的多路径更新写法！！
[newPostRef updateChildValues:@{@"b":@{@"d":@"updateD"},@"x":@{@"z":@"updateZ"}}];

```
</div>
<div class="slide-content">
```swift
// 错误的多路径更新写法！！
newPostRef.updateChildValues(["b":["d":"updateD"],"x":["z":"updateZ"]])

```
</div>
</div>

该操作相当于 `setValue` 方法，会覆盖原有数据。

## 删除数据

`removeValue`方法用于删除指定节点。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *ref = [[WDGSync sync] reference];
[ref setValue:@{@"name" : @"Jone", @"age" : @"23"}];

//删除上面写入的数据
[ref removeValue];
```
</div>
<div class="slide-content">
```swift
let ref = WDGSync.sync().reference()
[ref.setValue(["name" : "Jone", "age" : "23"])

//删除上面写入的数据
messagesRef.removeValue()
```
</div>
</div>

此外，还可以通过写入 nil 值（例如，`setValue:nil`）来删除数据。 

**注意**：如果某个节点的 value 为 nil ,云端会直接删除该节点。

## 事务处理

`runTransactionBlock` 方法用于并发操作时保证数据一致性。

例如，要实现一个记录点赞数量的功能，它可能存在多人同时点赞的情况。如果不用事务处理，那么两个客户端呈现的最终数据可能不一致。

使用事务处理能避免这种情况

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
WDGSyncReference *upvotesRef =[[WDGSync sync] referenceWithPath:@"/web/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes"];
    
[upvotesRef runTransactionBlock:^WDGTransactionResult *(WDGMutableData *currentData) {
    NSNumber *value = currentData.value;
    if (currentData.value == [NSNull null]) {
        value = 0;
    }
    [currentData setValue:[NSNumber numberWithInt:(1 + [value intValue])]];
    return [WDGTransactionResult successWithValue:currentData];
}];
```
</div>
<div class="slide-content">
```swift
// 初始化 
let options = WDGOptions.init(syncURL: "https://docs-examples.wilddogio.com")
WDGApp.configureWithOptions(options)

// 获取一个 WDGSyncReference 实例
let upvotesRef = WDGSync.sync().referenceWithPath("/web/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes")
        
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
</div>
</div>

**注意**：要进行并发更新的数据在云端有值，但本地还未获取这个值时，此时 `runTransactionBlock` 的回调方法中的变量为 nil。这种情况下，直接使用此变量进行逻辑处理会引发错误，所以必须对变量进行判空处理。

更多使用，请参考 [- runTransactionBlock:](/api/sync/ios/api.html#–-runTransactionBlock)。