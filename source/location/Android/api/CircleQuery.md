title: CircleQuery
---

用于设置范围监听的查询条件。

## 方法

### addCircleQueryListener( listener)

##### 定义

```android
addCircleQueryListener( CircleQueryListener listener)
```

##### 说明
添加范围监听事件。创建一个监听，当所有初始数据都加载完成后会调用监听的onCircleQueryReady()事件。每当监听的参数变化后，需要重新加载初始数据，当重新加载完成后这个监听的onCircleQueryReady()事件也会被调用一次。除onCircleQueryReady()事件，监听还包括onKeyEntered，onKeyExited，onKeyMoved和onCircleQueryError事件。

---

### removeCircleQueryListener(listener)

##### 定义

```android
removeCircleQueryListener(CircleQueryListener listener)
```

##### 说明
移除指定范围监听的事件。

---

### removeAllCircleQueryListeners()

##### 定义

```android
removeAllCircleQueryListeners()
```

##### 说明
移除所有范围监听的事件。

---

### Position getCenter()；

##### 定义

```android
Position getCenter()；
```

##### 说明
返回当前范围监听的中心点。

##### 返回值
Position

---
### setCenter(center)；

##### 定义

```android
setCenter(Position center)
```

##### 说明
设置当前范围监听的中心点。

---
### setRadius(radius)；

##### 定义

```android
setRadius(double radius)
```

##### 说明
设置当前范围监听的半径。

---
### getRadius()；

##### 定义

```android
double getRadius()；
```

##### 说明
得到当前范围监听的半径。

---
