title: 实时轨迹
---

## 1. 轨迹记录

`startRecordingPath(key)`方法用于记录指定 Key 的轨迹，并实时上传至云端，默认为 5 秒 上传一次。

```android
location.startRecordingPath("key",provider);
```

### 设置上传频率

和位置同步一样，你可以根据时间或距离设置上传频率：

- 根据时间间隔上传，最小间隔 1秒, 最大间隔 300 秒。

例如，每 2 秒 记录一个轨迹点：

```android
AMapLocationProvider provider= location.initAMapLocationProviderWithTime(2000);
location.startRecordingPath("key",provider);
```

- 根据距离间隔上传，最小间隔 0 米 (1 秒判断一次)，最大间隔 500 米。

例如，每移动 10 米记录一个轨迹点：

```android
AMapLocationProvider provider= location.initAMapLocationProviderWithDistance(10);
location.startRecordingPath("key",provider);
```

### 停止记录轨迹

`stopRecordingPath(key)`用于停止记录指定 Key 的轨迹。

```android
location.stopRecordingPath(key);
```



## 2. 轨迹查询

### 实时轨迹监听

`addPathQueryListener(listener)` 用于查询实时轨迹，轨迹一旦发生变化，将会实时更新。

```android
 PathQuery pathQuery = location.getPathQuery("key");
pathQuery.addPathQueryListener(new PathQueryListener() {

     @Override
     public void onLocationResult(PathSnapshot pathSnapshot) {
             if(pathSnapshot!=null) {
                    Position latestPoint = pathSnapshot.getLatestPoint();
                    Log.e(TAG, "latestPoint: " + latestPoint);
                    double pathLength = pathSnapshot.getPathLength();
                    Log.e(TAG, "pathlength: " + pathLength);
                    int size = pathSnapshot.getPoints().size();
                    Log.e(TAG, "size: " + size);
                }
            }

            @Override
            public void onCancelled(SyncError error) {
                Log.e(TAG, "onCancelled: "+error );
            }
    });
```

location 还提供了不同的轨迹查询创建方法：

- `getPathQuery(String key)`为全量查询，默认查询全部的记录。
- `getPathQueryWithStartTime(String key, Date starttime)`该实例以startTime开始，查询一个key的路径记录。
- `getPathQueryWithEndTime(String key, Date endTime)`该实例以endTime结束，查询一个key的路径记录。
- `getPathQuery(String key,Date starttime, Date endTime)`在startTime与endTime之间，查询一个key的路径记录。


### 单次轨迹查询

`addPathQuerySingleListener(listener)` 用于查询指定时间范围内的轨迹记录。

```android
pathQuery.addPathQuerySingleListener(new PathQueryListener() {

            @Override
            public void onLocationResult(PathSnapshot pathSnapshot) {
                if(pathSnapshot!=null) {
                    Position latestPoint = pathSnapshot.getLatestPoint();
                    Log.e(TAG, "latestPoint: " + latestPoint);
                    double pathLength = pathSnapshot.getPathLength();
                    Log.e(TAG, "pathlength: " + pathLength);
                    int size = pathSnapshot.getPoints().size();
                    Log.e(TAG, "size: " + size);
                }
            }

            @Override
            public void onCancelled(SyncError error) {
                Log.e(TAG, "onCancelled: "+error );
            }
        });
```

### 轨迹长度

`PathSnapshot` 的方法 `getPathLength()` 用于得到轨迹的长度，单位为米。

```android
pathQuery.addPathQuerySingleListener(new PathQueryListener() {

            @Override
            public void onLocationResult(PathSnapshot pathSnapshot) {
                if(pathSnapshot!=null) {
                    double pathLength = pathSnapshot.getPathLength();
                    Log.e(TAG, "pathlength: " + pathLength);
                }
            }

            @Override
            public void onCancelled(SyncError error) {
                Log.e(TAG, "onCancelled: "+error );
            }
        });
```
