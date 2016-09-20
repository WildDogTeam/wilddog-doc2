
title: 高级特性
---
本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。




## 云端时间戳

Wilddog Sync 提供了 [云端时间戳](/api/sync/ios/api.html#+timestamp) 机制，它可以将云端时间戳写入到指定节点。

例如，在`servertimestamp`节点下记录当前云端时间

Objective-C

```objectivec
WDGSyncReference *currentServerTimeRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/servertimestamp"];
//存入当前云端时间戳
[currentServerTimeRef setValue:[WDGServerValue timestamp]];
```

Swift

```swift
var currentServerTimeRef = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com/servertimestamp")
//存入当前云端时间戳
currentServerTimeRef.setValue(WDGServerValue.timestamp())
```

云端时间戳可以与 Wilddog Sync 的其他特性结合使用。

例如，结合离线事件，可以记录客户端的离线时间

Objective-C

```objectivec
WDGSyncReference *userLastOnlineRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/users/joe/lastOnline"];
[userLastOnlineRef onDisconnectSetValue:[WDGServerValue timestamp]];
```

Swift

```swift
var userLastOnlineRef = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com/users/joe/lastOnline")
userLastOnlineRef.onDisconnectSetValue(WDGServerValue.timestamp())
```

## 时钟偏差

时钟偏差是本地时间和云端时间的差值，自动保存在 `/.info/serverTimeOffset` 节点下，可以通过查询该节点获取时钟偏差。

例如，利用时钟偏差可以计算云端时间

Objective-C

```objectivec
WDGSyncReference *offsetRef = [[WDGSync sync] referenceWithPath:@".info/serverTimeOffset"];
[offsetRef observeEventType:WDGDataEventTypeValue withBlock:^(WDGDataSnapshot *snapshot) {
  offset = [(NSNumber *)snapshot.value doubleValue];
  double estimatedServerTimeMs = [[NSDate date] timeIntervalSince1970] * 1000.0 + offset;
}];
```

Swift

```swift
let offsetRef = WDGSync.sync().referenceWithPath(".info/serverTimeOffset")
offsetRef.observeEventType(.Value, withBlock: { snapshot in
    if let offset = snapshot.value as? Double {
        let estimatedServerTimeMs = NSDate().timeIntervalSince1970 * 1000.0 + offset
    }
})
```
