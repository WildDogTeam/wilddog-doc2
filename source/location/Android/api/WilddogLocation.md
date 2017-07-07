title: WilddogLocation
---

WilddogLocation的主入口，使用`WilddogLocation`实例进行读写地理位置数据和查询。


## 方法

### initAMapLocationProviderWithTime(time)

##### 定义

```android
AMapLocationProvider initAMapLocationProviderWithTime(int time)
```

##### 说明
初始化一个以时间间隔为time的更新地理位置的 AMapLocationProvider。

##### 参数

参数名         | 说明
------------- | -------------
time           |时间间隔。

##### 返回值
`AMapLocationProvider`实例。

---

### initAMapLocationProviderWithDistance(distance)

##### 定义

```android
AMapLocationProvider initAMapLocationProviderWithDistance(int distance)
```

##### 说明
初始化一个根据距离间隔distance更新地理位置的 AMapLocationProvider 。

##### 参数

参数名         | 说明
------------- | -------------
distance           |距离间隔。
##### 返回值
`AMapLocationProvider`实例。

---

### startTracingPosition(key)

##### 定义

```android
startTracingPosition(String key)
```

##### 说明
开启自动位置同步，SDK 自动将 AMapLocationProvider 提供的位置数据上传到 key 名下，使用默认的AMapLocationProvider，采样间隔为5s。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将上传到这个 key 名下。

---

### startTracingPosition(key, provider)

##### 定义

```android
startTracingPosition(String key, AMapLocationProvider provider)
```

##### 说明
开启自动位置同步，SDK 自动将 AMapLocationProvider 提供的位置数据上传到 key 名下。


##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
provider | 提供位置数据。

---

### startTracingPosition(key, listener)

##### 定义

```android
startTracingPosition(String key, AMapLocationProvider provider，CompletionListener listener)
```

##### 说明
开启自动位置同步，SDK 自动将 AMapLocationProvider 提供的位置数据上传到 key 名下，并提供完成回调。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要终止自动位置同步的 key。
provider           | 提供位置数据。
listener           | 完成回调对象。

---

### startTracingPosition(key,listener)

##### 定义

```android
startTracingPosition(String key,CompletionListener listener)
```

##### 说明
开启自动位置同步，SDK 自动将 AMapLocationProvider 提供的位置数据上传到 key 名下，使用默认的AMapLocationProvider，采样间隔为5s，并提供完成回调。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将写入 key 名下。
listener |写入操作的回调函数。

---

### stopTracingPosition(key)

##### 定义

```android
stopTracingPosition(String key)
```

##### 说明
终止针对 key 的自动位置同步。
##### 参数

参数名         | 说明
------------- | -------------
key      | 终止自动位置同步的key。


---

### stopTracingPosition(key，listener)

##### 定义

```android
stopTracingPosition(String key，CompletionListener listener)
```

##### 说明
终止针对 key 的自动位置同步，并提供完成回调。

##### 参数

参数名         | 说明
------------- | -------------
key           | 要获取其位置的 key。
listener           | 操作的回调函数。

---

### setPosition(key, position)

##### 定义

```android
setPosition(String key, Position position)
```

##### 说明
手动将位置数据写入。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将写入 key 名下。
position           | 写入的位置数据。
---
### setPosition( key, position, listener)

##### 定义

```android
setPosition(String key,Position position,CompletionListener listener)
```

##### 说明
手动将位置数据写入，并提供完成回调。

##### 参数

参数名         | 说明
------------- | -------------
key           | 位置数据将写入 key 名下。
position           | 写入的位置数据。
listener           | 操作的回调函数。
---

### getPosition(key, listener)

##### 定义

```android
getPosition(String key, PositionListener listener)
```

##### 说明
获取某个 key 最新位置。


##### 参数

参数名         | 说明
------------- | -------------
key           | 指定位置的 key。
listener        | 最新位置的回调。

---

### addPositionListener(key, listener)

##### 定义

```android
addPositionListener(String key, PositionListener listener)
```

##### 说明
持续监听指定 key 的位置。

##### 参数

参数名            | 说明
---------------- | -------------
key           | 指定位置的 key。
listener              | 监听的实例对象。


---

### removePositionListener(listener)

##### 定义

```android
removePositionListener(PositionListener listener)
```

##### 说明
取消指定的位置监听。

##### 参数

参数名            | 说明
---------------- | -------------
listener      | 监听的实例对象。
---

### removeAllPositionListeners()

##### 定义

```android
removeAllPositionListeners()
```

##### 说明
取消所有位置监听。

---

### removePosition(key)

##### 定义

```android
removePosition(String key)
```

##### 说明
删除 key 当前的地理位置信息。

##### 参数

参数名            | 说明
---------------- | -------------
key      | 删除当前的地理位置信息的key 。
---

### removePosition( key, listener)

##### 定义

```android
removePosition(String key,CompletionListener listener)
```

##### 说明
删除 key 当前的地理位置信息，并提供完成回调。

##### 参数

参数名            | 说明
---------------- | -------------
key      | 删除当前的地理位置信息的key 。
listener      | 回调函数 。

---

### 	
getCircleQuery(center, radius)

##### 定义

```android
getCircleQuery(Position center, double radius)
```

##### 说明
初始化一个用于范围查询的 CircleQuery 实例。

##### 参数

参数名            | 说明
---------------- | -------------
center      | 范围查询的中心 。
radius      | 范围查询的半径 。

##### 返回值
 `CircleQuery`实例。
 
---

### 	
startRecordingPath(key) 

##### 定义

```android
startRecordingPath(String key) 
```

##### 说明
开始记录 key 的轨迹。开启成功后自动将位置信息上传到实时轨迹数据库中。使用默认的AMapLocationProvider，采样间隔为5s。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。


---

### 	
startRecordingPath( key, provider)

##### 定义

```android
startRecordingPath(String key, AMapLocationProvider provider)
```

##### 说明
开始记录 key 的轨迹。开启成功后自动将位置信息上传到实时轨迹数据库中。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
provider           | 提供位置数据。

---

### 	
startRecordingPath( key, listener)

##### 定义

```android
startRecordingPath(String key,CompletionListener listener)
```

##### 说明
开始记录 key 的轨迹。开启成功后自动将位置信息上传到实时轨迹数据库中。使用默认的AMapLocationProvider，采样间隔为5s，并提供完成回调。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
listener           | 操作的回调函数。

---

### 	
startRecordingPath( key, provider, listener)

##### 定义

```android
startRecordingPath(String key,AMapLocationProvider provider,CompletionListener listener)
```

##### 说明
开始记录 key 的轨迹。开启成功后自动将位置信息上传到实时轨迹数据库中，并提供完成回调。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 位置数据将上传到这个 key 名下。
provider              | 提供位置数据。
listener           | 操作的回调函数。

---

### 	
stopRecordingPath(String key)

##### 定义

```android
stopRecordingPath(String key)
```

##### 说明
终止 key 的轨迹记录。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。

---

### 	
stopRecordingPath( key, listener)

##### 定义

```android
stopRecordingPath(String key,CompletionListener listener)
```

##### 说明
终止 key 的轨迹记录，并提供完成回调。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。
listener           | 操作的回调函数。

---


### 	
getPathQuery( key)

##### 定义

```android
PathQuery getPathQuery(String key)
```

##### 说明
初始化一个用于实时轨迹查询的PathQuery实例，不需要开始、结束时间，查询一个key的全部记录。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。

##### 返回值 
 `PathQuery`实例。

---
### 	
getPathQueryWithStartTime( key, startTime)

##### 定义

```android
getPathQueryWithStartTime(String key, Date startTime)
```

##### 说明
初始化一个用于实时轨迹查询的PathQuery实例，该实例以startTime开始，查询一个key的路径记录。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。
startTime           | 开始时间。
##### 返回值 
 `PathQuery`实例。

---

### 	
getPathQueryWithEndTime( key,  endTime)

##### 定义

```android
getPathQueryWithEndTime(String key, Date endTime)
```

##### 说明
初始化一个用于实时轨迹查询的PathQuery实例，该实例以endTime结束，查询一个key的路径记录。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。
endTime           | 结束时间。
##### 返回值 
`PathQuery`实例。

---

### 	
getPathQuery( key, startTime,  endTime)

##### 定义

```android
getPathQuery(String key,Date startTime, Date endTime)
```

##### 说明
初始化一个用于实时轨迹查询的PathQuery实例，该实例在startTime与endTime之间，查询一个key的路径记录。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。
startTime           | 开始时间。
endTime           | 结束时间。
##### 返回值 
`PathQuery`实例。

---


### 	
removePath( key)

##### 定义

```android
removePath(String key)
```

##### 说明
删除 key 对应的轨迹信息。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。


---


### 	
removePath( key, listener)

##### 定义

```android
removePath(String key,CompletionListener listener)
```

##### 说明
删除 key 对应的轨迹信息，并提供完成回调。
##### 参数

参数名            | 说明
---------------- | -------------
key              | 指定位置的 key。
listener           | 操作的回调函数。

---

### 	
getDistance( p1,  p2)

##### 定义

```android
double getDistance(Position p1, Position p2)
```

##### 说明
用于计算两个位置点的距离的辅助函数。
##### 参数

参数名            | 说明
---------------- | -------------
p1              | 地理位置对象。
p2           | 地理位置对象。

##### 返回值
`double`

---