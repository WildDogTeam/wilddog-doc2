
title:  数据操作
---
本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下七种方法：

| 方法                    | 说明                                       |
| --------------------- | ---------------------------------------- |
| setValue:             | 向指定 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| setPriority:          | 设置节点优先级。                                 |
| setValue:andPriority: | 向指定节点写入数据并且设置该节点优先级。                     |
| childByAutoId         | 向指定节点添加 [子节点](/guide/reference/term.html#节点)。子节点的 [key](/guide/reference/term.html#key) 由 Wilddog Sync 自动生成并保证唯一。 |
| updateChildValues:    | 更新指定子节点。                                 |
| removeValue           | 删除指定节点。                                  |
| runTransactionBlock:  | 并发操作时保证数据一致性。                            |



## 写入数据

`setValue:` 方法用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

`setValue:` 方法可设置回调方法来获取操作的结果。

例如，向 ``Jobs`` 节点下写入 `full_name ` 和 `gender`：

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
NSDictionary *jobs = @{
                          @"full_name" : @"Steve Jobs",
                          @"gender" : @"male"
                      };

// child 用来定位到某个节点。                           
WDGSyncReference *usersRef = [ref childWithPath: @"Jobs"];
[usersRef setValue:jobs];
```
</div>
<div class="slide-content">
```swift 
//初始化
let options = WDGOptions.init(syncURL: "https://<appId>.wilddogio.com")
WDGApp.configureWithOptions(options)
// 获取一个 WDGSyncReference 实例
let ref = WDGSync.sync().referenceWithPath("/web/saving-data/wildblog/users")
var jobs = ["full_name": "Steve Jobs", "gender": "male"]

// child 用来定位到某个节点。
var usersRef = ref.child("jobs")
usersRef.setValue(jobs)
```
</div>
</div>

设置回调方法：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
NSDictionary *jobs = @{
                          @"full_name" : @"Steve Jobs",
                          @"gender" : @"male"
                      };
[[ref child:@"Jobs"] setValue:jobs withCompletionBlock:^(NSError * _Nullable error, WDGSyncReference * _Nonnull ref) {
    if (error == nil) {
        // 数据同步到野狗云端成功完成
    }
}];
```
</div>
<div class="slide-content">
```swift 
ref.child("Jobs").setValue(jobs, withCompletionBlock: { error, ref in
    if error == nil{
         // 数据同步到野狗云端成功完成
    }
})
```
</div>
</div>

## 设置节点优先级

`setPriority:` 方法用于设置节点的优先级。

Wilddog Sync 支持为每个节点设置优先级(priority)，用于实现节点按 [优先级排序](/guide/sync/ios/retrieve-data.html#根据数据排序监听)。优先级是节点的隐藏属性，默认为 null。

例如，设置 `user` 节点的优先级为100：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">

```objectivec
WDGSyncReference *ref = [[WDGSync sync] referenceWithPath:@"user"];
[ref setPriority:@(100) withCompletionBlock:^(NSError * _Nullable error, WDGSyncReference * _Nonnull ref) {
    if (error) {
        NSLog(@"set priority failed'");
        return;
    }
    NSLog(@"set priority success.");
 }];
```

</div>
<div class="slide-content">

```swift
let ref = WDGSync.sync().referenceWithPath("user")
ref.setPriority(100) { (error, ref) in
            if error == nil {
                // set priority success.
            }
        }

```

</div>
</div>

更多使用，请参考 [setPriority()](/api/sync/ios/api.html#setPriority)。

## 写入数据并设置节点优先级

`setWithPriority(value, priority)` 方法用于指定节点写入数据并且设置该节点优先级。

例如，写入 `jack` 的姓名并且设置优先级为100：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">

```objectivec
WDGSyncReference *ref = [[WDGSync sync] reference];
[ref setValue:@{@"first" : @"jack",
                @"last"  : @"Lee"}
  andPriority:@100
withCompletionBlock:^(NSError * _Nullable error, WDGSyncReference * _Nonnull ref) {
     if (!error) {
         // set data success.
     }
}];```

</div>
<div class="slide-content">

```swift
let ref = WDGSync.sync().reference()
ref.setValue(["first" : "jack", "last" : "Lee"], andPriority: 100) { (error, ref) in
    if error == nil {
         // set data success.
    }
}

```

</div>
</div>

更多使用，请参考 [setWithPriority()](/api/sync/ios/api.html#setWithPriority)。

## 追加子节点

`childByAutoId` 方法向指定节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照添加时间进行排序。

例如，追加子节点到 `messages` 节点

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *messageRef = [ref child: @"messages"];
NSDictionary *message1 = @{
    @"full_name": @"Steve Jobs",
    @"message": @"Think difference"
};
[[messageRef childByAutoId] setValue:message1];

NSDictionary *message2 = @{
    @"full_name": @"Bill Gates",
    @"message": @"Hello World"
};
[[messageRef childByAutoId] setValue:message2];

```
</div>
<div class="slide-content">
```swift
let messageRef = ref.child("messages")
messageRef.childByAuthId().setValue(["full_name" : "Steve Jobs","message" : "Think difference"])
messageRef.childByAuthId().setValue(["full_name" : "Bill Gates","message" : "Hello World"])
```
</div>
</div>

产生的数据如下

```json
{
  "messages": {
    "-JRHTHaIs-jNPLXOQivY": {
      "full_name": "Steve Jobs",
      "message": "Think difference"
     },
    "-JRHTHaKuITFIhnj02kE": {
      "full_name": "Bill Gates",
      "message": "Hello World"
    }
  }
}
```


</div>

## 更新数据

`updateChildValues` 方法用于更新指定子节点。

`updateChildValues` 方法支持多路径更新。可以只调用一次方法更新多个 [路径](/guide/reference/term.html#路径-path) 的数据。



例如，更新 Jobs 的个人信息：

```json
//原数据如下
{
    "Jobs": {
        "full_name": "Steve Jobs",
        "gender": "male"
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
WDGSyncReference *jobsRef = [usersRef child: @"Jobs"];
 
NSDictionary *fullname = @{
    @"full_name": @"Tim Cook",
};
//只更新 jobs 的 full_name
[jobsRef updateChildValues:fullname];
```
</div>
<div class="slide-content">
```swift

var jobsRef = usersRef.child("jobs")
var fullname = ["full_name": "Tim Cook"]
//只更新 jobs 的 full_name
jobsRef.updateChildValues(fullname)

```
</div>
</div>



**多路径更新**
例如，同时更新 b 节点下的 d 和 x 节点下的 z：
```json
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
正确示例：

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

错误示例：

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

> **提示：** 设置节点的 value 为 nil 等同于 `removeValue` 方法。

## 事务处理

`runTransactionBlock` 方法用于并发操作时保证数据一致性。

例如，在实现多人点赞功能时，多人同时写入评分会产生覆盖，导致最终结果不准确。使用 transaction()方法可以避免这种情况：

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



>**注意：**回调方法的返回值可能为空，需要进行相应的处理。

更多使用，请参考 [- runTransactionBlock:](/api/sync/ios/api.html#–-runTransactionBlock)。