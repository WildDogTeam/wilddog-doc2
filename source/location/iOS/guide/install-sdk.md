title: 安装与初始化
---

本篇文档介绍如何安装和初始化 SDK。


## 1. 使用 CocoaPods 安装 SDK

通过 [Cocoapods](https://cocoapods.org/) 安装 WilddogLocation SDK 以及其依赖的 Sync 和 高德定位 SDK。

* 在 Xcode 中创建一个工程，并在 terminal 中用`cd`命令进入到工程所在文件夹内，执行`pod init`命令；
* 打开生成的`Podfile`文件，在第一行声明开发平台和版本，并在随后写入要引入的库：

```
platform :ios, 'x.0'
target 'YourAppName' do
  pod 'WilddogLocation'
end
```
* 保存`Podfile`，并执行`pod install`命令，将上述依赖安装到你的工程。


## 2. 初始化 Location SDK

初始化需要有高德的 API Key，以及野狗 AppID：

* 高德 App Key 在[高德开放平台](https://lbs.amap.com/)中创建应用获取。
* 野狗 AppID [野狗控制面板](https://www.wilddog.com/dashboard/)中创建应用获取。

### 1. 引入头文件：
在`AppDelegate.h`中，引入：
```objectivec
#import <AMapFoundationKit/AMapFoundationKit.h>
```

在需要使用WilddogLocation的地方引入：
```objectivec
#import <WilddogLocation/WilddogLocation.h>
```

### 2. 设置高德 API Key：
在`AppDelegate.m`中的`-application:didFinishLaunchingWithOptions:`中添加：

```objectivec
[AMapServices sharedServices].apiKey = @"Your-AMap-API-Key";
```

### 3. 初始化 WilddogLocation 服务：

WilddogLocation SDK 依赖于 Wilddog Sync，所以也可以先初始化 Sync 的 App，再用 Sync App 的 Reference 来创建 WilddogLocation 服务：

```objectivec
// 初始化Wilddog Sync
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://YourAppID.wilddogio.com"];
[WDGApp configureWithOptions:option];
WDGSyncReference *ref = [[WDGSync sync] reference];
// 使用Sync Reference初始化Wilddog Location
WDGLocation *locationService = [[WDGLocation alloc] initWithSyncReference:ref];
```

