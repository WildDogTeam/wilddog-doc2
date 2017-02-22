
title: Query
---

Wilddog 的 REST API 的查询过程接收以下的查询参数和值进行数据操作。

## 参数

### shallow

**说明**

这是一个高级功能，目标是帮助处理大的数据集而不下载数据集的全部。设置 shallow=true 将限制数据返回的深度。如果返回的数据是 JSON primitive \(string, number or boolean\)， 它的 value 将被返回。 如果数据的 snapshot 是 JSON object，每一个key的value将被截断成布尔类型`true`。

**示例**

```
curl 'https://samplechat.wilddogio.com/.json?shallow=true'

```

使用 shallow 参数后， 将不能使用其他查询参数。

---

### count

**说明**

查询当前节点下直接子节点的个数。设置 count=true 返回数量。可以与条件查询连用。与条件查询连用时，返回的是满足条件的节点的数量。

**示例**

```
//查询 rest 节点下的子节点个数
curl 'https://docs-examples.wilddogio.com/rest.json?count=true'

//查询高度为0.6的恐龙的个数
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&equalTo=0.6&count=true'

```

---

### print

**说明**

格式化响应返回的数据。

| 参数 |  说明  |
| --------- | --------------------------------------- |
| pretty     | GET, PUT, POST, PATCH, DELETE请求中 <br> 以易读的方式查看数据 |
| silent     | GET, PUT, POST, PATCH请求中<br>写入数据的时候控制输出，响应返回的是空值，http状态码为204 No Content |

**示例**

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json?print=pretty'
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'https://samplechat.wilddogio.com/users/jack/name.json?print=silent'

```

---

### callback

**说明**

仅支持 `get` 方式。为了让 web 客户端的 rest 请求实现跨域，你可以用 JSONP 在 JavaScript 回调方法中封装一个响应。使用 `callback=` 让 rest API 在你指定的回调方法中封装返回的数据。

**示例**

```
<script>
  function gotData(data) {
    console.log(data);
  }
</script>
<script src="https://samplechat.wilddogio.com/.json?callback=gotData"></script>

```

---

### format

**说明**

在 get 数据时，若带有如下参数，响应数据中会包含priority信息

**示例**

```
curl 'https://samplechat.wilddogio.com/.json?format=export'

```

---

### download

**说明**

仅支持 `get` 方式。如果你想从web客户端把你的数据下载到一个文件中，请使用 `download=` 参数。参数后加上一个合适的文件名以让客户端将数据保存到这个文件中。

**示例**

```
curl 'https://samplechat.wilddogio.com/.json?download=myfilename.txt'

```

---

### orderBy

**说明**

Wilddog Sync 支持按键(key)、按值(value)、按节点的优先级(priority) 或按指定子节点的值 (value) 对数据进行排序：

| 参数                     | 用法                    |
| ---------------------- | --------------------- |
| orderBy="{childValue}" | 按指定子节点的值（value）对结果排序。 |
| orderBy="$key"         | 按键(key)对结果排序。         |
| orderBy="$value"       | 按值(value)对结果排序。       |
| orderBy="$priority"    | 按优先级(priority)对结果排序。  |

**示例**

例如，[班级示例应用](https://class-demo.wilddogio.com) 中按照每个学生的身高（"height" 节点的值）进行排序：

```
curl 'https://class-demo.wilddogio.com/students.json?orderBy="height"'
```

### limitToFirst, limitToLast

**说明**

使用 `limitToFirst()` 和 `limitToLast()` 方法限制返回节点的最大数量。 例如，使用 `limitToFirst(100)` 过滤数据，那么第一次返回节点数最多为 100。

**示例**

例如，[班级示例应用](https://class-demo.wilddogio.com) 如果你只想知道最高的是那三位学生，就可以这样写：

```
curl 'https://class-demo.wilddogio.com/students.json?orderBy="height"&limitToLast=3'

```

### startAt, endAt, equalTo

**说明**

使用`startAt()`、`endAt()`和`equalTo()`为查询选择任意起点、终点或等量点。这可以用于`数据分页`和`精确查询`。

**示例**

例如，[班级示例应用](https://class-demo.wilddogio.com),想要获取到身高为1米75的同学，就可以这样写：

```
curl 'https://class-demo.wilddogio.com/students.json?orderBy="height"&equalTo=1.75'

```