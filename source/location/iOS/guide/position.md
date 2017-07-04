title: 位置同步
---

本篇文档介绍如何实现实时位置同步。

## 1. 上传位置

### 持续上传

`- startTracingLocationForKey:`方法可以根据 Key 向云端持续上传设备的位置，如果 Key 不存在，云端会自动创建。默认为 5s 上传一次位置数据。

```objectivec
[locationService startTracingLocationForKey:@"key"];
```

### 设置上传频率

你可以根据时间或距离设置上传频率，这种方式需要传入一个`WDGAmapLocationProvider`实例：

- 根据时间间隔上传，最小间隔 1秒, 最大间隔 300 秒。

例如，每 2 秒 上传一次位置信息：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithTimeInterval:2.0];
[locationService startTracingLocationForKey:@"key" withLocationProvider:locationProvider];
```

- 根据距离间隔上传，最小间隔 0 米 (1秒判断一次)，最大间隔 100 米。

例如，每移动 10 米 上传一次位置信息：

```objectivec
WDGAMapLocationProvider *locationProvider = [[WDGAMapLocationProvider alloc] initWithDistance:10.0];
[locationService startTracingLocationForKey:@"key" withLocationProvider:locationProvider];
```



### 上传自定义属性

除了位置之外，你还可以在上传时附带 JSON 形式的自定义属性。

可以在单次上传中附带属性：

```objectivec
NSDate *timestamp = [NSDate date];
NSDictionary *attr = @{@"foo": @"bar"};
WDGPosition *customPosition = [[WDGPosition alloc] initWithLatitude:latitude longitude:longitude timestamp:timestamp customAttributes:attr];
[locationService setLocation:customPosition forKey:@"key"];
```

也可以实现 `WilddogLocationDelegate` 协议中的 `- wilddogLocation:willUpdateLocation:ForKey:` 方法：

```objectivec
-(WDGPosition *)wilddogLocation:(WDGLocation *)wilddogLocation willUpdateLocation:(WDGPosition *)location ForKey:(NSString *)key {
    double latitude = location.latitude;
    double longitude = location.longitude;
    NSDate *timestamp = location.timestamp;
    NSDictionary *attr = @{@"foo": @"bar"};
    WDGPosition *customLocation = [[WDGPosition alloc] initWithLatitude:latitude longitude:longitude timestamp:timestamp customAttributes:attr];
    return customLocation;
}
```

### 停止上传

`- stopTracingLocationForKey: ` 方法可以停止指定 Key 的位置上传。

```objectivec
[locationService stopTracingLocationForKey:@"key"];
```



### 单次上传

`- setLocation:forKey:` 方法可以根据 Key 向云端上传一次位置信息，如果 Key 不存在，云端会自动创建。

```objectivec
WDGPosition *position = [[WDGPosition alloc] initWithLatitude:42.0 longitude:100.0];
[locationService setLocation:position forKey:@"key"];
```





## 2. 监听位置

### 持续监听
`- observeLocationForKey:withBlock:` 用于实时获取指定 Key 的最新位置信息。

```objectivec
WilddogHandle handle = [locationService observeLocationForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    NSLog(@"Current Position: %@", position);
}];
```



### 取消监听

`- removeObserverWithWilddogHandle:`用于取消指定 Key 的位置监听。

```objectivec
[locationService removeObserverWithWilddogHandle:handle];
```

`- removeAllObservers`用于取消所有的位置监听。

```objectivec
[locationService removeAllObservers];
```



### 单次监听

`- getLocationForKey:withBlock:`  用于获取一次指定 Key 的最新位置信息。

```objectivec
[locationService getLocationForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    NSLog(@"Current Position: %@", position);
}];
```



## 3. 计算距离

`+ distanceBetweenLocation:andLocation:`方法用于计算两个坐标点的距离。

```objectivec
WDGPosition *position1 = [[WDGPosition alloc] initWithLatitude:12.34 longitude:56.78];
WDGPosition *position2 = [[WDGPosition alloc] initWithLatitude:56.78 longitude:90.12];
double distance = [WDGLocation distanceBetweenLocation:position1 andLocation:position2];
```

通过该方法可以实现实时距离的计算。

例如：持续监听两个 key 的位置，每当它们的位置更新后，计算二者的距离。

```objectivec
WilddogHandle handle1 = [locationService observeLocationForKey:@"key1" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    if (error) {
        // Handle error here
        return;
    }
    self.location1 = position;
    [self updateDistance];
}];

WilddogHandle handle2 = [locationService observeLocationForKey:@"key2" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    if (error) {
        // Handle error here
        return;
    }
    self.location2 = position;
    [self updateDistance];
}];
```
其中, `-updateDistance`的实现如下：

 ```objectivec
 - (void)updateDistance {
     self.distance = [WDGLocation distanceBetweenLocation:self.location1 andLocation:self.location2];
 }
 ```
