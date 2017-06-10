title: 位置同步
---

本篇文档介绍如何实现实时位置同步。

## 1. 位置上传

### 持续上传

`initAMapLocationProviderWith*()`方法可以根据 Key 向云端持续上传设备位置，如果云端不存在该 Key，将会自动创建。默认为 5s 上传一次数据。

```javascript
var locationProvider = wildLocation.initAMapLocationProviderWithTime(5000);
wildLocation.startTracing(key, locationProvider);
```

### 设置上传频率

你可以根据时间或距离设置上传频率：

- 根据时间间隔上传，最小间隔 1s, 最大间隔 300s。

例如，每 60 秒上传一次位置信息：

```javascript
var locationProvider = wildLocation.initAMapLocationProviderWithTime(60000);
wildLocation.startTracing(key, locationProvider);
```

- 根据距离间隔上传，最小间隔 0m (1s判断一次)，最大间隔 500m。

例如，每 20 m 上传一次位置信息：

```javascript
var locationProvider = wildLocation.initAMapLocationProviderWithDistance(20);
wildLocation.startTracing(key, locationProvider);
```



### 上传自定义属性

除了位置之外，你还可以在上传时附带 JSON 形式的自定义属性。
```javascript
var options = {
    location = [40,116], // 纬度和经度
    timestamp = Date.now(),
    customAttributes = 'my firest customPosition!'
}
var myPosition = wildLocation.initCustomPosition(options);

wildLocation.set('myPosition', myPosition);
```

### 停止上传

`stopTracing()` 用于取消指定 Key 的位置上传。

```javascript
wildLocation.stopTracing(key);
```



###  单次上传

`set()`方法可以根据 Key 向云端上传一次位置信息，如果 Key 不存在，云端会自动创建。

```javascript
wildLocation.set('myPosition', myPosition);
```



## 2. 位置监听

### 持续监听
`on()`  用于实时获取指定 Key 的最新位置信息。

```javascript
var cancelCallback = wildLocation.on(key, function(position) {
    console.log('最新位置的经纬度为： ', position.latitude(), ',' , position.longitude());
})

```



### 取消监听

`cancelCallback()` 用于取消指定 Key 的位置监听。

```javascript
cancelCallback();
```

`off()` 用于取消所有的位置监听。

```javascript
wildLocation.off();
```



### 单次监听

`once()` 用于获取一次指定 Key 的最新位置信息。

```javascript
wildLocation.once(key, function(position) {
    console.log('最新位置的经纬度为： ', position.latitude(), ',' , position.longitude());
})

```


## 3. 距离计算

`Location.distance()` 方法用于计算两个坐标点的距离。

```javascript
var distance = Location.distance(position1, position2);
```

通过该方法可以实现实时距离的计算。

例如：持续监听两个 key 的位置，每当它们的位置更新后，计算二者的距离。

```javascript
var position1, position2, distance;
wildLocation.on(key1, function(position) {
    position1 = position;
    distance = Location.distance(position1, position2);
    console.log('最新的距离为： ', distance, 'm');
});
wildLocation.on(key2, function(position) {
    position2 = position;
    distance = Location.distance(position1, position2);
    console.log('最新的距离为： ', distance, 'm');
});

```
