title: 范围监听
---

## 创建监听范围
`- queryAtLocation:withRadius:`  根据位置与半径创建监听范围，单位为米。

```objectivec
WDGCircleQuery *circleQuery = [_geo queryAtLocation:[[CLLocation alloc] initWithLatitude:37.33617167 longitude:-122.08165962] withRadius:500.0];
```
## 事件

范围监听通过事件的方式实时获取设备的变化信息。

事件包括以下四种:

| 名称          | 说明                                       |
| ----------- | ---------------------------------------- |
| key_entered | 设备进入了查询范围内时触发 key_entered 事件。初始化时所有范围内的设备都会触发一次 key_entered 事件。 |
| key_exited  | 设备从查询范围内离开查询范围时，会触发 key_exited 事件。如果这个 key 在云端被删除的话，被传递给回调函数的位置信息和距离信息将为null。 |
| key_moved   | 设备已经在查询范围内部，当它在内部发生移动的时候，会触发 key_moved 事件。 |
| ready       | 当初始化或者更新范围条件后，数据都将会重新加载。加载完毕的时候将会触发 ready事件。 |



## 监听范围事件

`- observeEventType:withBlock:`方法用于与事件配合，监听范围内的设备数据。

- `WDGQueryEventTypeEntered` 事件在设备进入范围时触发。

```objectivec
[circleQuery observeEventType:WDGQueryEventTypeEntered withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Entered: (%g, %g)", key, location.latitude, location.longitude);
}];
```

- `WDGQueryEventTypeExited` 事件在设备离开范围时触发。

```objectivec
[circleQuery observeEventType:WDGQueryEventTypeExited withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Exited: (%g, %g)", key, location.latitude, location.longitude);
}];
```

- `WDGQueryEventTypeMoved` 事件在监听范围内的设备移动时触发。

```objectivec
[_circleQuery observeEventType:WDGQueryEventTypeMoved withBlock:^(NSString * _Nonnull key, WDGPosition * _Nonnull location) {
    NSLog(@"%@ Moved: (%g, %g)", key, location.latitude, location.longitude);
}];
```





## 取消监听

`- removeObserverWithWilddogHandle:` 用于取消指定范围的监听。

```objectivec
[circleQuery removeObserverWithWilddogHandle:handle];
```

`- removeAllObservers` 用于取消所有的范围监听。

```objectivec
[circleQuery removeAllObservers];
```



## 实时变更监听范围

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