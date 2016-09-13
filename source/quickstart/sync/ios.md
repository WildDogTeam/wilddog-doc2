
title: 快速入门
---

你可以通过编写一个简单的天气应用例子来了解实时数据同步的用法。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一

- **使用 CocoaPods** 

要将 WilddogSync SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问  [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 

打开工程目录，新建一个 Podfile 文件

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句

	pod 'Wilddog/Sync'

最后安装 SDK

	$ pod install
	$ open your-project.xcworkspace

</br>


- **手动集成** 

1. 下载 Sync SDK [点此下载](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogSync.framework-2.0.1.zip)。 
2. 下载 Core SDK [点此下载](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogCore.framework-2.0.1.zip)。        
3. 把 WilddogSync.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。  
5. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 JavaScriptCore.framework、 libsqlite3 加入列表中。

## 3. 创建 Wilddog Sync 实例

**1.引入头文件**

Objective-C

	#import "Wilddog.h"

Swift

	import Wilddog


**2.初始化**

Objective-C

```objectivec
//初始化 WDGApp
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<appId>.wilddogio.com"];
[WDGApp configureWithOptions:option];

//获取一个指向根节点的 WDGSyncReference 实例    
WDGSyncReference *myRootRef = [[WDGSync sync] reference];
```

Swift

```swift
//初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://<appId>.wilddogio.com")
WDGApp.configureWithOptions(options)

//获取一个指向根节点的 WDGSyncReference 实例
let myRootRef = WDGSync.sync().reference()
```

## 4. 写入数据

`setValue` 方法可以写入数据。Sync 的数据存储格式采用 [JSON](http://json.org)。

例如，在应用的根节点下写入天气数据

Objective-C

```objectivec
// 写数据
[myRootRef setValue:@{@"weather" : @{@"beijing" : @"rain", @"shanghai" : @"sunny"}}];


```

Swift

```swift
// 写数据
myRootRef.setValue(["weather" : ["beijing" : "rain", "shanghai" : "sunny"]])

```
写入的数据如下图

 <img src="/images/saveapp.png" alt="yourApp" width="300">

## 5. 读取与监听数据

`observeEventType` 方法可以读取并监听节点的数据。

例如，从应用中获得天气数据

Objective-C

```objectivec
// 读数据并监听数据变化
[myRootRef observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"%@ -> %@", snapshot.key, snapshot.value);
}];

```

Swift

```swift
// 读数据并监听数据变化
myRootRef.observeEventType(.Value, withBlock: {
  snapshot in
  print("\(snapshot.key) -> \(snapshot.value)")
})

```

`snapshot` 里面的数据会一直与云端保持同步。如果你只想读取一次，不监听数据变化，那么你可以使用`observeSingleEventOfType`方法替代`observeEventType`方法。

更多的数据读取方式可以查看 [完整指南](/guide/sync/ios/save-data.html) 和 [API 文档](/api/sync/ios.html)。


