title: 范围监听
---

## 1. 固定范围监听

### 创建监听
`- queryAtLocation:withRadius:`  根据位置与半径创建监听范围，单位为km。

```objectivec
WDGCircleQuery *circleQuery = [_geo queryAtLocation:[[CLLocation alloc] initWithLatitude:37.33617167 longitude:-122.08165962] withRadius:500.0];
```
### 开始监听

创建监听范围之后可以开始监听范围内的设备。

`- observeEventType:withBlock:`
`- observeReadyWithBlock:`

例如，监听范围内的设备，如果有新设备进入将会收到更新。

```objectivec
[circleQuery observeEventType:WDGQueryEventTypeEntered withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Entered: (%g, %g)", key, location.latitude, location.longitude);
}];
```

### 监听事件

wilddogLocation SDK可以追踪监听范围内的三种事件：进入、离开、移动。

- `WDGQueryEventTypeEntered` 事件在设备进入范围时触发

```objectivec
[circleQuery observeEventType:WDGQueryEventTypeEntered withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Entered: (%g, %g)", key, location.latitude, location.longitude);
}];
```

- `WDGQueryEventTypeExited` 事件在设备离开范围时触发

```objectivec
[circleQuery observeEventType:WDGQueryEventTypeExited withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Exited: (%g, %g)", key, location.latitude, location.longitude);
}];
```

- `WDGQueryEventTypeMoved` 事件在监听范围内的设备移动时触发

```objectivec
[_circleQuery observeEventType:WDGQueryEventTypeMoved withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Moved: (%g, %g)", key, location.latitude, location.longitude);
}];
```

### 取消监听

`- removeObserverWithWilddogHandle:` 用于取消指定范围的监听

```objectivec
[circleQuery removeObserverWithWilddogHandle:handle];
```

`- removeAllObservers` 用于取消所有的范围监听。

```objectivec
[circleQuery removeAllObservers];
```

## 2.动态范围监听

只要更改监听位置或者半径，发生在`WDGCircleQuery`实例上的监听事件就会自动更新，方法如下：

```objectivec
// 更改监听位置
circleQuery.center = [[CLLocation alloc] initWithLatitude:10.0 longitude:50.0];
// 更改监听半径
circleQuery.radius = 50.0;
```

例如，可以根据设备的实时位置不断更新监听范围。

```objectivec
WilddogHandle handle = [locationService observeLocationForKey:@"key" withBlock:^(WDGPosition * _Nullable position, NSError * _Nullable error) {
    if (error) {
        // handle error here
        return;
    }
    circleQuery.center = [[CLLocation alloc] initWithLatitude:position.latitude longitude:position.longitude];
}];
```