title: 数据操作
---

本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下四种方法

| 方法 | 说明 |
| :------- | :--------------------------------------- |
| PUT      | 向指定 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| POST     | 向指定节点添加 [子节点](/guide/reference/term.html#子节点)。子节点的 [key](/guide/reference/term.html#key) 由 Wilddog Sync 自动生成并保证唯一。|
| PATCH    | 更新指定子节点。                           |
| DELETE   | 删除指定节点。                             |



## 写入数据

`PUT`请求向指定节点写入数据。若节点已有数据，会覆盖原有数据，包括其子节点的数据。

使用`PUT`请求，我们可以写入的数据类型包括`string`, `number`, `boolean`,`array`或者任意的 JSON 对象。

```javascript
curl -X PUT -d '{
  "alanisawesome": {
    "name": "Alan Turing",
    "birthday": "June 23, 1912"
  }
}' 'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/users.json'
```

成功的请求将返回 HTTP 200 OK 状态码，并且响应中会包含写入的数据。

## 追加子节点

`POST`请求会生成唯一 ID 作为 key ，要写入的数据作为 value ，进行数据写入。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，它标明了时间的先后。

```
curl -X POST -d '{
  "author": "alanisawesome",
  "title": "The Turing Machine"
}' 'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/posts.json'

```

`posts`路径下的数据将会是这样

```
{
  "posts": {
    "-JRHTHaKuITFIhnj02kE": {
      "author": "alanisawesome",
      "title": "The Turing Machine"
    }
  }
}

```

`key-JRHTHaKuITFIhnj02kE`是自动生成的，因为我们使用的是`POST`请求。成功的请求将返回 HTTP 200 OK 状态码，并且响应中会包含新数据的key。

```
{"name":"-JRHTHaKuITFIhnj02kE"}

```

## 更新数据

`PATCH`请求用于更新指定子节点，而不影响其他节点。

```
curl -X PATCH -d '{
  "nickname": "ACE"
}' 'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'

```

上面的请求将`nickname`添加到`alanisawesome`对象而不删除子节点`name`和`birthday`。

如果使用的是`PUT`请求，`name`和`birthday`将会被删除，因为他们没有出现在请求中。执行完`PATCH`请求之后，节点下的数据如下

```
{
  "users": {
    "alanisawesome": {
      "date_of_birth": "June 23, 1912",
      "full_name": "Alan Turing",
      "nickname": "ACE"
    }
  }
}

```

成功的请求将返回 HTTP 200 OK 状态码。

## 删除数据

`DELETE`请求用于删除指定节点

```
curl -X DELETE \
  'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'

```

成功的请求将返回 HTTP 200 OK 状态码，和一个空的 JSON。

