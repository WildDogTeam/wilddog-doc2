title: WDGCircleQuery
---

`WDGQuery` 的子类，用于设置范围监听的查询条件。

## 属性

### center

##### 定义

```objectivec
@property (atomic, readwrite) CLLocation *center;
```

##### 说明
查询区域的中心。修改这个值将更新这个查询。

---

### radius

##### 定义

```objectivec
@property (atomic, readwrite) double radius;
```

##### 说明
查询区域的半径，以千米为单位。修改这个值将更新这个查询。

---