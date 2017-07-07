title: 范围监听
---

## 创建监听范围
` getCircleQuery(Position center, double radius) `  根据位置与半径创建监听范围，单位为千米。

```android
CircleQuery query = location.getCircleQuery(new Position(39.7, -122.4), 100);
```
## 事件

范围监听通过事件的方式实时获取设备的变化信息。

事件包括以下三种:

| 名称                      | 说明                                       |
| ------------------------ | ------------------------------------------ |
| `onKeyEntered` | 设备进入了查询范围内时触发 `onKeyEntered` 事件。初始化时所有范围内的设备都会触发一次该事件。 |
| `onKeyExited`  | 设备从查询范围内离开查询范围时，会触发 `onKeyExited` 事件。如果这个 key 在云端被删除的话，被传递给回调函数的位置信息和距离信息将为null。 |
| `onKeyMoved`   | 设备已经在查询范围内部，当它在内部发生移动的时候，会触发 `onKeyMoved` 事件。 |
|`onCircleQueryReady`|实例初始化完成或者查询被更新时触发，可以在该方法内设置更新UI的操作。|
|`onCircleQueryError`|在查询范围内触发了异常错误。|



## 监听范围事件

`addCircleQueryEventListener(listener)`方法用于与事件配合，监听范围内的设备数据。
```
query.addCircleQueryEventListener(new CircleQueryListener() {
            @Override
            public void onKeyEntered(String key, Position location) {
                Log.e(TAG, key+"进入查询范围内" );
            }

            @Override
            public void onKeyExited(String key) {
                Log.e(TAG, key+"离开查询范围内" );
            }

            @Override
            public void onKeyMoved(String key, Position location) {
                 Log.e(TAG, key+"在查询范围内移动" );
            }

            @Override
            public void onCircleQueryReady() {
                Log.e(TAG, "初始化完毕" );
            }

            @Override
            public void onCircleQueryError(SyncError error) {
                Log.e(TAG, "查询范围内发生错误："+ error.getMessage() );
                System.err.println("There was an error querying locations: " + error.getMessage());
            }
        });
```




## 取消监听

`removeCircleQueryListener(listener)` 用于取消指定的范围监听。

```android
query.removeCircleQueryListener(listener);

```

`removeAllCircleQueryListeners()` 用于取消所有的范围监听。

```android
query.removeAllCircleQueryListeners();

```



## 实时变更监听范围

只要更改监听位置或者半径，发生在`CircleQuery`实例上的监听事件就会自动更新，方法如下：

```android
// 更改监听位置
query.setCenter(new Position(39.7, -122.4));
// 更改监听半径
query.setRadius(100);
```

例如，可以根据设备的实时位置不断更新监听范围。

```android
location.addPositionListener("key", new Location.PositionListener() {
            @Override
            public void onDataChange(String key, Position location) {
               query.setCenter(location);
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```