title: 快速入门
---

你可以通过一次简单的位置同步的来了解 Realtime Location 的用法。

### 环境准备：
- 运行iOS9.0以上的设备或模拟器；
- 电脑上安装了CocoaPods。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](https://docs.wilddog.com/console/creat.html)。


<blockquote class="warning">
  <p><strong>注意：</strong></p>
Realtime Location SDK 的位置获取依赖于高德定位SDK，需要在应用中设置高德定位的 API Key。如果没有，请先在[高德开放平台](https://lbs.amap.com/)中获取。

</blockquote>

## 2. 安装SDK

#### 通过CocoaPods安装：

在 `Podfile` 中加入
```
pod 'WilddogLocation'
```
保存文件，并执行 `pod install`。

## 3. 初始化SDK

#### 1. 引入头文件

在`AppDelegate.h`中，引入：
```objectivec
#import <AMapFoundationKit/AMapFoundationKit.h>
```

在`ViewController.h`中，引入:
```objectivec
#import <WilddogLocation/WilddogLocation.h>
```

#### 2. 设置高德API Key

在`AppDelegate.m`中的`-application:didFinishLaunchingWithOptions:`中添加：

```objectivec
[AMapServices sharedServices].apiKey = @"Your-AMap-API-Key";
```

#### 3. 初始化 Wilddog Location 服务

使用在第一步中创建的野狗应用ID，即可初始化服务。

```objectivec
WDGLocation *locationService = [[WDGLocation alloc] initWithWilddogAppID:@"YourAppID"];
```

## 4. 位置上传

`- startTracingLocationForKey:`方法可以根据 Key 向云端持续上传设备的位置，如果 Key 不存在，云端会自动创建。默认为 5s 上传一次位置数据。

```objectivec
[locationService startTracingLocationForKey:@"key"];
```

## 5. 位置监听

开启位置上传之后，你可以监听的 Key 的位置变化。

`- observeLocationForKey:withBlock:` 用于实时获取指定 Key 的最新位置信息。

```objectivec
WilddogHandle handle = [locationService observeLocationForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    NSLog(@"Current Position: %@", position);
}];
```

