title:  查询数据
---

## 读取数据

### 读取数据

REST API使用`GET`读取数据，让我们继续博客的示例，读取全部的博客数据。

```
curl 'https://docs-examples.wilddogio.com/rest/saving-data/wdblog/posts.json?print=pretty'

```

成功的请求将返回HTTP 200 OK状态码，并且响应中会包含读取到的数据。

### **读取服务端时间戳**

当我们需要获取服务器的当前时间戳时，可以进行如下操作:

```
curl 'https://<appId>.wilddogio.com/.json?sv=timestamp'

```

服务端数值现在只支持时间戳，关于unix时间戳的百科，请参考[百科](http://baike.baidu.com/link?url=VQMFk3ej6ORZFtAhKYF5P6ow_p1XqZ5RgzFHNQFJNgc5U_DCT4nH6MVXkIvSmvO5gLP5DrB7ZsrnZc-2cT5bHa)。

## 排序和查询数据


### 数据排序

对数据排序前，要先指定按照键、值、子节点的值或按优先级这四种的哪一种排序。对应的方法如下：

参数 | 用法
----  | ----
orderBy=$child | 按指定子节点的值对结果排序。
orderBy="$key" | 按键对结果排序。
orderBy="$value" | 按值对结果排序。
orderBy="$priority" | 按优先级对结果排序。

这一部分主要介绍在使用各种排序方式时，数据究竟是如何排序的。

**orderBy**当使用`orderBy`参数时，按照子节点的公有属性key的value进行排序。仅当value为单一的数据类型时，排序有意义。如果key属性有多种数据类型，则排序不固定，此时不建议使用`orderBy`参数获取全量数据。例如，

```
{
  "scores": {
    "no1" : {
        "name" : "tyrannosaurus",
        "score" : "120"
    },
    "no2" : {
        "name" : "bruhathkayosaurus",
        "score" : 55
    },
    "no3" : {
        "name" : "lambeosaurus",
        "score" : 21
    },
    "no4" : {
        "name" : "linhenykus",
        "score" : 80
    },
    "no5" : {
        "name" : "pterodactyl",
        "score" : 93
    },
    "no6" : {
        "name" : "stegosaurus",
        "score" : 5
    },
    "no7" : {
        "name" : "triceratops",
        "score" : 22
    },
    "no8" : {
        "name" : "brontosaurus",
        "score" : true
    }
  }
}

```

霸王龙的分数是`string`类型，雷龙的分数是`boolean`类型，而其他恐龙的分数是`numberic`类型，此时使用 `orderBy`参数获得全量数据，返回的是一个看似固定的排序结果；但是配合使用`limitToFirst`或`limitToLast`时，将获得不确定的结果。

当配合使用`startAt`、`endAt`和`equalTo`参数时，如果子节点的公有属性key包含多种数据类型，将按照参数的类型排序，即只能返回这个类型的有序数据。 上面的数据如果使用 `orderBy="score"&startAt=60` 将得到下面的结果：

```
  {
    "no4" : {
        "name" : "linhenykus",
        "score" : 80
    },
    "no5" : {
        "name" : "pterodactyl",
        "score" : 93
    }
  }

```

`Object`类型数据的 value 值为 null，不会出现在结果中。

_注意：如果path与value的总长度超过1000字节时，使用_`orderBy`_参数将搜索不到该数据。_

**orderBy="$key"**当使用`orderBy="$key"`参数对数据进行排序时，数据将会按照key值增序排列。注意，key值只能是字符型。

1. 1.key值能够被解析成数字的节点排在最前面，增序排列
2. 2.接下来是字符型key值，按照字典顺序增序排列

**orderBy="$value"**当使用`orderBy="$value"`参数时，按照直接子节点的 value 进行排序。仅当 value 为单一的数据类型时，排序有意义。如果子节点包含多种数据类型，则排序不固定， 此时不建议使用`orderBy="$value"`获取全量数据，例如，

```
{
  "scores": {
    "tyrannosaurus" : "120",
    "bruhathkayosaurus" : 55,
    "lambeosaurus" : 21,
    "linhenykus" : 80,
    "pterodactyl" : 93,
    "stegosaurus" : 5,
    "triceratops" : 22,
    "brontosaurus" : true
  }
}

```

霸王龙的分数是`string`类型，雷龙的分数是`boolean`类型，而其他恐龙的分数是`numberic`类型，此时使用 `orderBy="$value"`参数获得全量数据，返回的是一个看似固定的排序结果；但是配合使用`limitToFirst`或`limitToLast`参数时，将获得不确定的结果。

当配合使用`startAt`、`endAt`和`equalTo`时，如果子节点的value包含多种数据类型，将按照参数的类型排序，即只能返回这个类型的有序数据。 上面的数据如果使用 `orderBy="$value"&startAt=60` 将得到下面的结果：

```
{
    "linhenykus" : 80,
    "pterodactyl" : 93
}

```

`Object`类型数据的 value 值为 null，不会出现在结果中。

_注意：如果path与value的总长度超过1000字节时，使用_`orderBy="$value"`_参数将搜索不到该数据。_

**orderBy="$priority"**当使用`orderBy="$priority"`参数对数据进行排序时，数据的顺序取决于优先级以及key值。注意，优先级的值只能是数字型或字符型。

1. 1.没有优先级的节点放在最前面
2. 2.接着是数字型的优先级，按照优先级从小到大的顺序排列
3. 3.接下来是字符型的优先级，按照优先级的字典顺序排列
4. 4.当两个节点的优先级相同，就按照key值排序，数字型key在前（数值排序），其余类型的key在后（字典排序）

关于优先级更多的内容，请参见 [API文档](/api/sync/rest.html#Priorities)。

### 查询数据

方法 | 用法
---- | ----
orderBy=limitToFirst | 设置从第一条开始，一共返回多少条数据（节点）。
orderBy=limitToLast | 设置从最后一条开始，一共返回多少条（返回结果仍是升序，降序要自己处理）。
orderBy=startAt | 返回大于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
orderBy=endAt | 返回小于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
orderBy=equalTo | 返回等于指定的键、值或优先级的数据，具体取决于所选的排序方法。可用于精确查询。

下面我们来举例如何进行数据查询。假设现在有一些关于恐龙的数据如下：

```
{
  "lambeosaurus": {
    "height": 2.1,
    "length": 12.5,
    "weight": 5000
  },
  "stegosaurus": {
    "height": 4,
    "length": 9,
    "weight": 2500
  }
}

```

有四种方式对数据进行查询：按照子节点的value值，按照节点名称key，按照节点value值和节点优先级priority。查询条件以其中一个参数开头，后面必须与`limitToFirst`，`limitToLast`，`startAt`，`endAt`和`equalTo`这些参数配合使用。

**按照子节点value值排序**将子节点的名称传给`orderBy`参数，就可以按照指定子节点的value值进行排序。 例如，想要查询所有的高度大于等于3米的恐龙，我们可以使用以下参数查询：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&startAt=3&print=pretty'

```

注意： 如果你想要在应用中按照某个子节点的value值排序，你需要在规则表达式中配置`".indexOn":"<childkey>"`。详细的文档请参考规则表达式API文档中关于 [.indexOn](/api/sync/rule.html#indexOn) 的介绍。

**按照数据节点名称排序**可以通过使用`orderBy="$key"`参数来按照节点名称查询数据。 下面的例子将返回名称在a到m之间所有的节点：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="$key"&startAt="a"&endAt="m"&print=pretty'

```

**按照节点的value值排序**我们可以按照节点的value值进行排序。 例如，恐龙举办运动会，我们按照以下格式记录恐龙的成绩：

```
{
  "scores": {
    "bruhathkayosaurus": 55,
    "lambeosaurus": 21,
    "linhenykus": 80,
    "pterodactyl": 93,
    "stegosaurus": 5,
    "triceratops": 22
  }
}

```

要查询所有成绩高于50分的恐龙，我们可以使用以下参数查询：

```
curl 'https://dinosaur-facts.wilddogio.com/scores.json?orderBy="$value"&startAt=50&print=pretty'

```

### 复杂查询

可以将多个参数进行组合使用，实现更复杂的查询功能。

**limit查询**`limitToFirst`和`limitToLast`参数用来设置返回结果集的大小。例如，查询条件限制为100，如果记录数小于100，则会返回所有的数据，如果记录数超过100，则会返回其中的100条记录，使用`limitToFirst`得到最前面的100条记录，使用`limitToLast`得到最后面的100条记录。

在恐龙数据库中使用`orderBy`和`limitToLast`，我们可以得到体重最重的两头恐龙的信息：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="weight"&limitToLast=2&print=pretty'

```

同样，我们可以使用`limitToFirst`参数来得到高度最小的两头恐龙的信息：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&limitToFirst=2&print=pretty'

```

我们可以将`limitToLast`参数与`orderBy="$value"`参数配合使用。例如，我们给恐龙运动会创建一个排行榜，查询分数最高的三头恐龙，则可以使用以下参数查询：

```
curl 'https://dinosaur-facts.wilddogio.com/scores.json?orderBy="$value"&limitToLast=3&print=pretty'

```

**range查询**使用`startAt`，`endAt`和`equalTo`参数来设置查询范围的起点和终点。例如，我们想要查询至少3米高的恐龙，可以使用`orderBy`和`startAt`的组合查询：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&startAt=3&print=pretty'

```

我们可以使用`endAt`参数来查询名字的字典顺序在Pterodactyl之前的所有的恐龙：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="$key"&endAt="pterodactyl"&print=pretty'

```

我们可以使用`startAt`和`endAt`的组合来控制我们查询的范围。下面的例子是查询名字以b开头的所有的恐龙：

```
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="$key"&startAt="b"&endAt="b~"&print=pretty'

```

波浪线在ASCII中的编码是126，它排在ASCII中常规字符的后面，查询返回的是所有b开头的字符串。

范围查询在分页中非常有用。


### Streaming

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

