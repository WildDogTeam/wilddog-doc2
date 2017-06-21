title: 实时轨迹
---

## 1. 轨迹记录

`- startRecordingPathForKey`方法用于记录指定 Key 的轨迹，并实时上传至云端，默认为 5 秒 上传一次。

```objectivec
[locationService startRecordingPathForKey:@"key"];
```

### 设置上传频率

和位置同步一样，你可以根据时间或距离设置上传频率，这种方式需要传入一个`WDGAmapLocationProvider`实例：

- 根据时间间隔上传，最小间隔 1秒, 最大间隔 300 秒。

例如，每 2 秒 记录一个轨迹点：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithTimeInterval:2.0];
[locationService startRecordingPathForKey:@"key" withLocationProvider:locationProvider];
```

- 根据距离间隔上传，最小间隔 0 米 (1 秒判断一次)，最大间隔 100 米。

例如，每移动 10 米记录一个轨迹点：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithDistance:10.0];
[locationService startRecordingPathForKey:@"key" withLocationProvider:locationProvider];
```

### 停止记录轨迹

`- stopRecordingPathForKey:`用于停止记录指定 Key 的轨迹。

```objectivec
[locationService stopRecordingPathForKey:@"key"];
```



## 2. 轨迹查询

### 创建轨迹查询

`- pathQueryForKey:startTime:endTime:` 用于查询实时轨迹，轨迹一旦发生变化，将会实时更新。

```objectivec
NSDate *start = [NSDate dateWithTimeIntervalSince1970:1497863758];
NSDate *end = [NSDate date];
WDGPathQuery *pathQuery = [_geo pathQueryForKey:@"key" startTime:start endTime:end];
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
如果 endTime 传入了 nil 或者是未来的事件，查询将会一直返回最新的轨迹记录，直到到达设置时间为止。
</blockquote>


WilddogLocation SDK 还提供了不同参数版本的轨迹查询创建方法：

- `pathQueryForKey:`为全量查询，默认查询全部的记录。
- `pathQueryForKey:startTime:`只设置查询开始时间，一直查询最新的记录。
- `pathQueryForKey:endTime:`只设置查询结束时间，从最早的记录开始。



### 实时轨迹监听

`- observeSingleEventWithBlock:` 用于持续监听指定时间范围内的轨迹记录，知道设定结束时间到达为止。

```objectivec
WilddogHandle handle = [_pathQuery observeWithBlock:^(WDGPathSnapshot * _Nonnull snapshot) {
    NSLog(@"Path: %@", snapshot.points);
}];
```
实时轨迹监听结束后也需要移除监听：

```objectivec
// 使用handle移除单个监听
[pathQuery removeObserverWithWilddogHandle:handle];
// 移除所有监听
[pathQuery removeAllObservers];
```

如果你想绘制一条实时的轨迹，可以利用 `latestPoint` 实时绘制新的轨迹点。

```objectivec
WilddogHandle handle = [_pathQuery observeWithBlock:^(WDGPathSnapshot * _Nonnull snapshot) {
    NSLog(@"Latest Point: %@", snapshot.latestPoint);
}];
```

### 单次轨迹查询

`- observeSingleEventWithBlock:` 用于查询指定时间范围内的轨迹记录。

```objectivec
[pathQuery observeSingleEventWithBlock:^(WDGPathSnapshot * _Nonnull snapshot) {
    NSLog(@"Path: %@", snapshot.points);
}];
```

### 轨迹长度

`WDGPathSnapshot` 的属性 `length` 用于记录轨迹的长度，单位为米。

```objectivec
WilddogHandle handle = [_pathQuery observeWithBlock:^(WDGPathSnapshot * _Nonnull snapshot) {
    NSLog(@"Path length: %d", snapshot.length);
}];
```
