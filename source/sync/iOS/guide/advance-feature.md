
title: 高级特性
---
本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。


## 云端时间戳

`[WDGServerValue timestamp]` 用于记录当前 [云端时间戳](/sync/iOS/api/WDGServerValue.html#timestamp)。

例如，在`servertimestamp` 节点下记录当前云端时间：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *currentServerTimeRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/servertimestamp"];
//写入当前云端时间戳
[currentServerTimeRef setValue:[WDGServerValue timestamp]];
```
</div>
<div class="slide-content">
```swift
let currentServerTimeRef = WDGSync.sync().reference(fromURL: "https://samplechat.wilddogio.com/servertimestamp")
//写入当前云端时间戳
currentServerTimeRef.setValue(WDGServerValue.timestamp())
```
</div>
</div>


## 时钟偏差

 `/.info/serverTimeOffset` 节点用于记录本地时间和云端时间的差值。监听该节点可以获取时钟偏差。

例如，利用时钟偏差可以计算云端时间：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGSyncReference *offsetRef = [[WDGSync sync] referenceWithPath:@".info/serverTimeOffset"];
[offsetRef observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
  offset = [(NSNumber *)snapshot.value doubleValue];
  double estimatedServerTimeMs = [[NSDate date] timeIntervalSince1970] * 1000.0 + offset;
}];
```
</div>
<div class="slide-content">
```swift
let offsetRef = WDGSync.sync().reference(withPath: ".info/serverTimeOffset")
offsetRef.observe(.value, with: { snapshot in
    if let offset = snapshot.value as? Double {
        let estimatedServerTimeMs = NSDate().timeIntervalSince1970 * 1000.0 + offset
    }
})
```
</div>
</div>
