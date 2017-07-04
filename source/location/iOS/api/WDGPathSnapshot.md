title: WDGPathSnapshot
---

代表一次轨迹查询的结果。

## 属性

### points

##### 定义

```objectivec
@property (nonatomic, strong) NSArray<WDGPosition *> *points;
```

##### 说明
一个数组，包含轨迹中所有的`WDGPosition`对象。

---

### length

##### 定义

```objectivec
@property (nonatomic, assign) double length;
```

##### 说明
轨迹的总长度，以米为单位。

---

### latestPoint

##### 定义

```objectivec
@property (nonatomic, strong) WDGPosition *latestPoint;
```

##### 说明
当前轨迹中最新的一个点。

---
