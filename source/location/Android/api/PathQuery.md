title: PathQuery
---

代表对一个特定时间段的轨迹进行查询。


## 方法

### addPathQueryListener( listener)

##### 定义

```android
addPathQueryListener(PathQueryListener listener)
```

##### 说明
对当前查询进行持续监听。

##### 参数

参数名         | 说明
------------- | -------------
listener         | 监听对象。

---

### addPathQuerySingleListener(listener)

##### 定义

```android
addPathQuerySingleListener(PathQueryListener listener)
```

##### 说明
对当前查询进行单次监听。


---

### removePathListener(listener)

##### 定义

```android
removePathListener(PathQueryListener listener)
```

##### 说明
取消指定监听。

##### 参数

参数名         | 说明
------------- | -------------
listener         | 监听对象。

---

### removeAllPathListener()

##### 定义

```android
removeAllPathListener()
```

##### 说明
取消所有监听。

---

### getKey()

##### 定义

```android
String getKey()
```

##### 说明
得到key。


---

### getStartTime()

##### 定义

```android
Date getStartTime()
```

##### 说明
得到当前查询的开始时间。


---

### getEndTime()

##### 定义

```android
Date getEndTime()
```

##### 说明
得到当前查询的结束时间。


---


