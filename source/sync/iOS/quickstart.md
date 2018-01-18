
title: 快速入门
---

你可以通过一个简单的 [评论墙示例](https://github.com/WildDogTeam/sync-quickstart-ios) 来快速了解 Wilddog Sync 的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Xcode 7.0 及以上版本</li>
        <li>支持 iOS 7.0 及以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

- **使用 CocoaPods** 

要将 WilddogSync SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问  [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 

打开工程目录，新建一个 Podfile 文件:

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句：

	pod 'Wilddog/Sync'

最后安装 SDK：

	$ pod install
	$ open your-project.xcworkspace

</br>
- **手动集成** 
  </br>   
1. 下载 Sync SDK <a href="https://cdn.wilddog.com/sdk/ios/2.3.3/WilddogSync-2.3.3.zip" id="sync_ios_d">点此下载</a>。    
2. 下载 Core SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.8/WilddogCore.framework-2.0.8.zip" id="sync_core_d">点此下载</a>。    
3. 把 WilddogSync.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。  
5. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 libicucore、libsqlite3、CFNetwork.framework、Security.framework、MobileCoreServices.framework、SystemConfiguration.framework 加入列表中。
6. 点击工程文件 -> TARGETS -> Build Settings，在 Other Linker Flags 中添加 -ObjC。

## 3. 创建 Wilddog Sync 实例

**1.引入头文件**

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
  // Pod 集成：
  @import Wilddog;
  
  // 手动集成：
  @import WilddogSync;
  @import WilddogCore;
```
</div>
<div class="slide-content">
```swift
  // Pod 集成：
  import Wilddog
  // 手动集成：
  import WilddogSync
  import WilddogCore
```
</div>
</div>



**2.初始化**

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
//初始化 WDGApp
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<SyncAppID>.wilddogio.com"];
[WDGApp configureWithOptions:option];

//获取一个指向根节点的 WDGSyncReference 实例    
WDGSyncReference *ref = [[WDGSync sync] reference];
```
</div>
<div class="slide-content">
```swift
//初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://<SyncAppID>.wilddogio.com")
WDGApp.configure(with: options)

//获取一个指向根节点的 WDGSyncReference 实例
let ref = WDGSync.sync().reference()
```
</div>
</div>



<blockquote class="notice">
  <p><strong>提示：</strong></p>

 Wilddog Sync 允许同时创建多个实例。

</blockquote>

## 4. 写入数据

`setValue` 方法用于向指定节点写入数据。写入数据。Wilddog Sync 的数据存储格式采用 [JSON](http://json.org/json-zh.html)。

例如，在应用的根节点下写入天气数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// 写数据
[ref setValue:@{@"messageboard" : @{@"message1" : @{@"content" : @"Wilddog, Cool!", @"presenter" : @"Jack"}}}];


```
</div>
<div class="slide-content">
```swift
// 写数据
ref.setValue(["messageboard" : ["message1" : ["content" : "Wilddog, Cool!", "presenter" : "Jack"]]])

```
</div>
</div>

写入的数据如下图：

 <img src="/images/saveapp.png" alt="yourApp" width="400">

## 5. 监听数据

`observeEventType` 或 `observeSingleEventOfType` 方法用于监听节点的数据。

例如，从应用中获得评论数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// snapshot 里面的数据会一直和云端保持同步
[ref observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"%@ -> %@", snapshot.key, snapshot.value);
}];
// 如果你只想监听一次，那么你可以使用 observeSingleEventOfType 方法
[ref observeSingleEventOfType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
    NSLog(@"%@ -> %@", snapshot.key, snapshot.value);    
}];
```
</div>
<div class="slide-content">
```swift
// snapshot 里面的数据会一直和云端保持同步
ref.observe(.value, with: {
    snapshot in
    print("\(snapshot.key) -> \(snapshot.value)")
})
// 如果你只想监听一次，那么你可以使用 observeSingleEventOfType 方法
ref.observeSingleEvent(of: .value, with: {
    snapshot in
    print("\(snapshot.key) -> \(snapshot.value)")
})
```
</div>
</div>



## 6.数据安全

你可以在 Sync 中使用规则表达式进行数据访问权限的控制。规则表达式可以实现以下功能：

- 数据访问权限控制
- 用户访问权限控制
- 数据格式校验
- 数据索引

规则表达式的具体使用，请参考 [安全性与规则](/sync/iOS/rules/introduce.html)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>

初始配置下，所有人都能读写你的应用数据，请及时在 实时通信引擎-读写权限 中更改规则表达式。

</blockquote>

## 7.更多使用

- 了解 Sync 更多使用方式，请参考 [完整指南](/sync/iOS/guide/save-data.html) 和 [API 文档](/sync/iOS/api/WDGOptions.html)。
- 了解如何设计数据结构，请参考 [组织数据](/sync/iOS/guide/bestpractice/structure-data.html)。

