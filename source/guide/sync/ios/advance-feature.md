title: 高级特性
---
本篇文档


## 云端时间戳

Sync 提供了 [云端时间戳](/api/sync/ios/api.html#+timestamp) 机制，它可以将云端时间写入到指定节点。结合离线事件的方法，很容易记录客户端的离线时间。

Objective-C

```objectivec
WDGSyncReference *userLastOnlineRef = [[WDGSync sync] referenceFromURL:@"https://samplechat.wilddogio.com/users/joe/lastOnline"];
//存入当前云端时间戳
[userLastOnlineRef onDisconnectSetValue:[WDGServerValue timestamp]];
```

Swift

```swift
var userLastOnlineRef = WDGSync.sync().referenceFromURL("https://samplechat.wilddogio.com/users/joe/lastOnline")
//存入当前云端时间戳
userLastOnlineRef.onDisconnectSetValue(WDGServerValue.timestamp())
```

## 时钟偏差

时钟偏差是本地时间和云端时间的差值，保存在 `/.info/serverTimeOffset` 节点下。

例如，利用时钟偏差获取服务端的时间

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