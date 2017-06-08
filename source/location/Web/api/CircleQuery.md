title: GeoCircleQuery
---

进行范围查询的实例。

## 方法

### center

##### 定义

`center()`

##### 说明

获取 `CircleQuery`的中心点。

##### 返回值

[Position](Position.html)

</br>

---

### radius

##### 定义

`radius()`

##### 说明

获取 `CircleQuery` 的半径。

##### 返回值

Float

</br>

---

### updateCriteria

##### 定义

`updateCriteria(newCircleQueryCriteria)`

##### 说明

更新 `CircleQuery` 的查询条件，动态修改，不影响现有监听的使用。

##### 参数

| 参数名 | 说明 |
|---|---|
| [CircleQueryCriteria](Location.html#CircleQueryCriteria) | object 类型，范围查询的条件 Map。 |

</br>

---

### on

##### 定义

`on(eventType, callback)`

##### 说明

为查询附加某事件类型触发的回调。可用的事件包括： `"ready"`, `"key_entered"`, `"key_exited"`, 和 `"key_moved"`。
`"ready"`事件回调不传递参数。其他的回调将传递三个参数：(1)位置的`key`， (2) 地理位置，`Position` ，(3)位置到查询圆心的距离，单位是米 。
返回 [CallbackRegistration](CallbackRegistration.html) 用于取消回调。

##### 参数

| 参数名            | 说明                                       |
| -------------- | ---------------------------------------- |
| eventType      | String 类型(non-null)<br>事件类型参见 [EventType](CircleQuery.html#EventType)。 |
| onEvent        | [onEvent](CircleQuery.html#onEvent)(non-null)类型<br>事件发生时的回调函数 。

##### 返回值

[CallbackRegistration](CallbackRegistration.html)

---

#### EventType

GeoCircleQuery [on](GeoCircleQuery.html#on) 和 [once](GeoCircleQuery.html#once) 所支持的事件列表。

| 名称            | 说明                  |
| ------------- | ------------------- |
| ready         | 当查询从服务器中初始化的时候就会触发一次ready事件。当所有其他的加载数据的事件触发后ready事件会触发。 每次用 updateQuery() 的时候ready事件将被立即触发一次，当所有的数据被加载并且其他所有的事件都被触发后也会引发ready事件。 |
| key_entered   | 当一个key进入了查询范围内时触发key_entered事件。当一个key从查询范围外进入查询范围内或者一个key被写入数据正好落入查询范围内时会触发key_entered事件。 |
| key_exited | 当一个Key从查询范围内移出查询范围时，会触发key_exited事件。如果这个key被彻底从GeoDo中删除的话，被传递给回调函数的位置信息和距离信息将为null。 |
| key_moved | 当一个key已经在查询范围内部，当它在内部发生移动的时候，会触发key_moved事件。  |

---

#### onEvent

##### 定义

`function(key, position, distance)`

##### 说明

事件发生时所触发的回调函数。

##### 参数

| 参数名      | 说明                                       |
| -------- | ---------------------------------------- |
| key      | String(non-null)类型<br> 地理位置单位的唯一标识。    |
| position     | [Position](Position.html)(non-null) 类型 <br> key 的最新地理位置。 |
| distance     | Float(non-null) 类型 <br> 当前位置到查询圆心的距离。 |

##### 返回值

Void

---


### cancel

##### 定义

`cancel()`

##### 说明

终止这个查询，所有通过`on()`附加的回调都会被取消，这个查询在未来都不会再被使用了。

<br>
---
