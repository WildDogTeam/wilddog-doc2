title: 位置同步
---

本篇文档介绍如何实现实时位置同步。

## 1. 上传位置

### 持续上传

`initAMapLocationProviderWithTime(time)`方法可以根据 Key 向云端持续上传设备的位置，如果 Key 不存在，云端会自动创建。默认为 5s 上传一次位置数据。

```android
 AMapLocationProvider provider= location.initAMapLocationProviderWithTime(5000);
 location.startTracingPosition("key",provider);
```

### 设置上传频率

你可以根据时间或距离设置上传频率,实例：

- 根据时间间隔上传，最小间隔 1秒, 最大间隔 300 秒。

例如，每 2 秒 上传一次位置信息：

```android
 AMapLocationProvider provider = location.initAMapLocationProviderWithTime(2000);
 location.startTracingPosition("key",provider);
```

- 根据距离间隔上传，最小间隔 0 米 (1秒判断一次)，最大间隔 500 米。

例如，每移动 10 米 上传一次位置信息：

```android
 AMapLocationProvider provider = location.initAMapLocationProviderWithTime(10);
 location.startTracingPosition("key",provider);
```



### 上传自定义属性

除了位置之外，你还可以在上传时附带自定义属性。

可以在单次上传中附带属性：

```android
Position position=location.initCustomPosition(37.7853889,-122.4056973,1498024197565L,"my firest customPosition!");
location.setLocation("key", position);
```


### 停止上传

`stopTracingPosition(key) ` 方法可以停止指定 Key 的位置上传。

```android
location.stopTracingPosition(key);
```



### 单次上传

`setPosition( key,  p)` 方法可以根据 Key 向云端上传一次位置信息，如果 Key 不存在，云端会自动创建。

```android
Position p=new Position(37.7853889, -122.4056973);
location.setPosition("key", p);
```





## 2. 监听位置

### 持续监听
`addPositionListener( key,  listener)` 用于实时获取指定 Key 的最新位置信息。

```android
 location.addPositionListener("key", new Location.PositionListener() {
            @Override
            public void onDataChange(String key, Position position) {
               Log.e(TAG, "onDataChange: "+position );
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```



### 取消监听

`removePositionListener( listener)`用于取消指定的位置监听。

```android
location.removePositionListener(listener);
```

`removeAllPositionListeners()`用于取消所有的位置监听。

```android
location.removeAllPositionListeners();
```



### 单次监听

`getPosition(key, listener)`  用于获取一次指定 Key 的最新位置信息。

```android
location.getPosition("key", new Location.PositionListener() {
           @Override
           public void onDataChange(String key, Position position) {
               Log.e(TAG, "onDataChange: "+position );
           }

           @Override
           public void onCancelled(SyncError syncError) {

           }
       });
```



## 3. 计算距离

`getDistance(p1, p2)`方法用于计算两个坐标点的距离。

```android
  Position p1 = new Position(48.154563, 177.072561);
  Position p2 = new Position(48.154564, 177.072562);
  double distance = location.getDistance(p1, p2);
```

通过该方法可以实现实时距离的计算。

例如：持续监听两个 key 的位置，每当它们的位置更新后，计算二者的距离。

```android
Position position1;
Position position2;
double distance;
location.addPositionListener("key", new Location.PositionListener() {
            @Override
            public void onDataChange(String key, Position position) {
                Log.e(TAG, "onDataChange: "+position);
                position1=position;
				distance=location.getDistance(position1, position2);
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
location.addPositionListener("key", new Location.PositionListener() {
            @Override
            public void onDataChange(String key, Position position) {
                Log.e(TAG, "onDataChange: "+position);
                position2=position;
				distance=location.getDistance(position1, position2);
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```

