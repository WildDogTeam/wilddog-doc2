title:  查询数据
---

本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和过滤。

## 查询数据

### 查询数据

使用`GET`请求查询数据:

```
curl 'https://docs-examples.wilddogio.com/rest/saving-data/wdblog/posts.json?print=pretty'

```

成功的请求将返回 HTTP 200 OK 状态码，并且返回值会包含读取到的数据。

### 查询服务端时间戳

使用`GET`请求获取服务器的当前时间戳时:

```
curl 'https://<appId>.wilddogio.com/.json?sv=timestamp'

```

服务端数值现在只支持[时间戳](http://baike.baidu.com/link?url=VQMFk3ej6ORZFtAhKYF5P6ow_p1XqZ5RgzFHNQFJNgc5U_DCT4nH6MVXkIvSmvO5gLP5DrB7ZsrnZc-2cT5bHa)。

## 数据排序


### 排序方法

Wilddog Sync 支持按 Key、按 Value、按子节点的 Value 或按 priority 对数据进行排序。

参数 | 用法
----  | ----
orderBy="{childValue}" | 按指定子节点的值对结果排序。
orderBy="$key" | 按键($key)对结果排序。
orderBy="$value" | 按值对结果排序。
orderBy="$priority" | 按优先级对结果排序。

其中{childValue}为子节点的名称
例如：[恐龙应用数据页面](https://dinosaur-facts.wilddogio.com) 中演示如何按照每个恐龙的身高（"height"节点的值）进行排序。

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"'
```



>**注意：**  
- 排序对计算机性能开销大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/api/sync/rule.html#indexOn) 规则，在服务器上添加索引以提高查询性能。详细操作参见 [添加索引](/guide/sync/rules/guide.html#数据索引)。
- 每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。

### 排序规则

**orderByChild**
使用 `orderByChild()`，按照以下规则进行升序排列：

1. 子节点的指定 key 对应的值为 `null` 排在最前面。
2. 子节点的指定 key 对应的值为 `false` 次之。如果有多个值为 `false`，则按子节点的 key 以 [字典序](http://baike.baidu.com/view/4670107.htm) 进行升序排列。
3. 子节点的指定 key 对应的值为 `true` 次之。如果有多个值为 `true`，则按子节点的 key 以字典序进行升序排列。
4. 子节点的指定 key 对应的值为 `number` 次之。如果有多个 `number` 相等，则按子节点的 key 以字典序进行升序排列。
5. 子节点的指定 key 对应的值为 `String` 次之。如果有多个 `String` 相等，则按子节点的 key 以字典序进行升序排列。
6. 子节点的指定 key 对应的值为 `Objects` 次之。如果有多个 `Objects` 相等，则按子节点的 key 以字典序进行升序排列。

**orderByKey**

当使用 `orderBy="$key"` 对数据进行排序时，系统会按 key 以字典序进行升序排列。

**orderByValue**

当使用`orderBy="$value"`时，按照子节点的值进行排序。排序规则和 `orderByChild` 一样，唯一不同的是将子节点指定的 key 改为子节点的值。


## 数据过滤

只有对数据进行排序之后，才能过滤数据，你可以结合以下方法来构造查找的条件。

方法 | 用法
---- | ----
orderBy=limitToFirst | 设置从第一条开始，一共返回多少条数据（节点）。
orderBy=limitToLast | 设置从最后一条开始，一共返回多少条（返回结果仍是升序，降序要自己处理）。
orderBy=startAt | 返回大于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
orderBy=endAt | 返回小于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
orderBy=equalTo | 返回等于指定的键、值或优先级的数据，具体取决于所选的排序方法。可用于精确查询。

**限制返回节点数量**

使用 `limitToFirst()` 和 `limitToLast()` 方法限制返回节点的最大数量。 例如，使用 `limitToFirst(100)` 过滤数据，那么第一次返回节点数最多为 100。

继续上面示例，如果你只想知道最高的是哪三条恐龙，就可以这样写：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&limitToLast=3&print=pretty'

```

或者你只关心哪些 [恐龙](https://dinosaur-facts.wilddogio.com/scores) 的得分超过 60 了：

```
curl 'https://dinosaur-facts.wilddogio.com/scores.json?orderBy="$value"&startAt=60&print=pretty'

```

如上例所示，使用 `startAt()`、`endAt()` 和 `equalTo()` 为查询选择任意起点、终点或等量点。这可以用于 `数据分页` 和 `精确查询`。


## Streaming

Wilddog REST端点支持 [EventSource\/Server-Sent Events](http://www.w3.org/TR/eventsource/) 协议，使客户端可以持续得到指定节点下数据发生的变化。

想要开始streaming，我们需要：

1. 将客户端请求的Accept头设置为`text/event-stream`
2. 考虑http跳转，特别是307状态码
3. 如果数据访问需要校验权限，需要添加`auth`参数。

当指定节点的数据发生变化时，服务器会发送事件回来。消息的结构符合`EventSource`协议：

```
event: event name
data: JSON encoded data payload

```

服务器会返回以下的事件：

|               |                                          |
| :------------ | :--------------------------------------- |
| put           | JSON格式数据，有两个key：path和data；path指向请求URL的路径；客户端应该使用消息中包含的数据替换本地缓存中的数据 |
| patch         | JSON格式数据，有两个key：path和data；path指向请求URL的路径；对与数据的每一个key，客户端应该用消息中包含的key替代缓存中的key |
| keep-alive    | 此事件的data为null，不需要任何操作                    |
| auth\_revoked | 该事件的数据是字符串，表示认证过期；认证参数失效后，该事件将被发送        |

下面是服务器能够发送的事件示例：

```
// 设置整个缓存为 {"a": 1, "b": 2}
event: put
data: {"path": "/", "data": {"a": 1, "b": 2}}

//将新数据放到key为c的缓存中，这样整个缓存是下面的结构
// {"a": 1, "b": 2, "c": {"foo": true, "bar": false}}

event: put
data: {"path": "/c", "data": {"foo": true, "bar": false}}

// 数据中的每个key，更新（或添加）相应的key到缓存的路径/c下
// 最终的缓存为: {"a": 1, "b": 2, "c": {"foo": 3, "bar": false, "baz": 4}}
event: patch
data: {"path": "/c", "data": {"foo": 3, "baz": 4}}

```

