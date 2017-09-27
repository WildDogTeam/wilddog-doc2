title: 位置同步
---

本篇文档介绍如何实现实时位置同步。

## 1. 上传位置

### 持续上传

`- startTracingPositionForKey:`方法可以根据 Key 向云端持续上传设备的位置，如果 Key 不存在，云端会自动创建。默认为 5s 上传一次位置数据。

```objectivec
[locationService startTracingPositionForKey:@"key"];
```

`- startTracingPositionForKey:withCompletionBlock:`方法可以在上传开始后执行一次回调。

```objectivec
[locationService startTracingPositionForKey:@"key" withCompletionBlock:^(NSError * _Nullable error) {
    NSLog(@"Tracing started!");
}];
```

### 设置上传频率

你可以根据时间或距离设置上传频率，这种方式需要传入一个`WDGAmapLocationProvider`实例：

- 根据时间间隔上传，最小间隔 1秒, 最大间隔 300 秒。

例如，每 2 秒 上传一次位置信息：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithTimeInterval:2.0];
[locationService startTracingPositionForKey:@"key" withLocationProvider:locationProvider];
```

- 根据距离间隔上传，最小间隔 0 米 (1秒判断一次)，最大间隔 500 米。

例如，每移动 10 米 上传一次位置信息：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithDistanceInterval:10.0];
[locationService startTracingPositionForKey:@"key" withLocationProvider:locationProvider];
```

`- startTracingPositionForKey:withLocationProvider:withCompletionBlock:`方法可以在上传开始后执行一次回调。

```objectivec
[locationService startTracingPositionForKey:@"key" withLocationProvider:locationProvider withCompletionBlock:^(NSError * _Nullable error) {
    NSLog(@"Tracing started!");
}];
```

### 上传自定义属性

除了位置之外，你还可以在上传时附带 JSON 形式的自定义属性。

可以在单次上传中附带属性：

```objectivec
NSDate *timestamp = [NSDate date];
NSDictionary *attr = @{@"foo": @"bar"};
WDGPosition *customPosition = [[WDGPosition alloc] initWithLatitude:37.0327 longitude:120.5859 timestamp:timestamp customAttributes:attr];
[locationService setPosition:customPosition forKey:@"key"];
```

也可以实现 `WDGLocationDelegate` 协议中的 `- wilddogLocation:willUpdatePosition:ForKey:` 方法：

```objectivec
-(WDGPosition *)wilddogLocation:(WDGLocation *)wilddogLocation willUpdatePosition:(WDGPosition *)position ForKey:(NSString *)key {
    double latitude = position.latitude;
    double longitude = position.longitude;
    NSDate *timestamp = position.timestamp;
    NSDictionary *attr = @{@"foo": @"bar"};
    WDGPosition *customPosition = [[WDGPosition alloc] initWithLatitude:latitude longitude:longitude timestamp:timestamp customAttributes:attr];
    return customPosition;
}
```

### 停止上传

`- stopTracingPositionForKey: ` 方法可以停止指定 Key 的位置上传。

```objectivec
[locationService stopTracingPositionForKey:@"key"];
```

`- stopTracingPositionForKey:withCompletionBlock:`方法可以在上传开始后执行一次回调。

```objectivec
[locationService stopTracingPositionForKey:@"key" withCompletionBlock:^(NSError * _Nullable error) {
    NSLog(@"Tracing stopped!");
}];
```



### 单次上传

`- setPosition:forKey:` 方法可以根据 Key 向云端上传一次位置信息，如果 Key 不存在，云端会自动创建。

```objectivec
WDGPosition *position = [[WDGPosition alloc] initWithLatitude:42.0 longitude:100.0];
[locationService setPosition:position forKey:@"key"];
```

`- setPosition:forKey:withCompletionBlock:`方法可以在上传开始后执行一次回调。

```objectivec
[locationService setPosition:position forKey:@"key" withCompletionBlock:^(NSError * _Nullable error) {
    NSLog(@"Position updated!");
}];
```



## 2. 监听位置

### 持续监听
`- observePositionForKey:withBlock:` 用于实时获取指定 Key 的最新位置信息。

```objectivec
WilddogHandle handle = [locationService observePositionForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    NSLog(@"Current Position: %@", position);
}];
```



### 取消监听

`- removeObserverWithWilddogHandle:`用 handle 取消指定的位置监听。

```objectivec
[locationService removeObserverWithHandle:handle];
```

`- removeAllObserverForKey:`用于取消对指定 Key 的所有位置监听。

```objectivec
[locationService removeAllObserverForKey:@"key"];
```

`- removeAllObservers`用于取消所有的位置监听。

```objectivec
[locationService removeAllObservers];
```



### 单次监听

`- getPositionForKey:withBlock:`  用于获取一次指定 Key 的最新位置信息。

```objectivec
[locationService getPositionForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    NSLog(@"Current Position: %@", position);
}];
```

## 3. 移除位置

`- removePositionForKey:` 用于删除服务器存储的指定 `key` 的位置数据。

```objectivec
[locationService removePositionForKey:@"key"];
```

`- removePositionForKey:withCompletionBlock:` 可以在删除操作完成后执行一次回调。

```objectivec
[locationService removePositionForKey:@"key" withCompletionBlock:^(NSError * _Nullable error) {
    NSLog(@"Position deleted!");
}];
```

## 4. 计算距离

`+ distanceBetweenPosition:andPosition:`方法用于计算两个坐标点的距离。

```objectivec
WDGPosition *position1 = [[WDGPosition alloc] initWithLatitude:12.34 longitude:56.78];
WDGPosition *position2 = [[WDGPosition alloc] initWithLatitude:56.78 longitude:90.12];
double distance = [WDGLocation distanceBetweenPosition:position1 andPosition:position2];
```

通过该方法可以实现实时距离的计算。

例如：持续监听两个 key 的位置，每当它们的位置更新后，计算二者的距离。

```objectivec
WilddogHandle handle1 = [locationService observePositionForKey:@"key1" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    if (error) {
        // Handle error here
        return;
    }
    self.position1 = position;
    [self updateDistance];
}];

WilddogHandle handle2 = [locationService observePositionForKey:@"key2" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    if (error) {
        // Handle error here
        return;
    }
    self.position2 = position;
    [self updateDistance];
}];
```
其中, `-updateDistance`的实现如下：

 ```objectivec
 - (void)updateDistance {
     self.distance = [WDGLocation distanceBetweenPosition:self.position1 andPosition:self.position2];
 }
 ```
