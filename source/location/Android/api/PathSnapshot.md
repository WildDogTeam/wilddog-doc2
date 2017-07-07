title: PathSnapshot
---

代表一次轨迹查询的结果。

## 方法

### getPathLength();

##### 定义

```android
 double getPathLength();
```

##### 说明
获取当前轨迹快照的路程长度，单位为米 。

##### 返回值
double

---

### List<Position> getPoints();

##### 定义

```android
List<Position> getPoints();
```

##### 说明
获取当前轨迹中的所有 Position 对象。

##### 返回值
List<Position>

---

### getLatestPoint();

##### 定义

```android
Position getLatestPoint();
```

##### 说明
获取当前轨迹中最新的地理位置。

##### 返回值
Position

---


