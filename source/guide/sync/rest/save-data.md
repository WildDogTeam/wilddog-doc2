title: 操作数据
---

本篇文档介绍操作数据的方法。

以下四种方法用于写入数据：

| 方法 | 说明 |
| :------- | :--------------------------------------- |
| PUT      | 写入或更新路径下的数据，如 `messages/users/user1/<data>` |
| PATCH    | 更新指定路径下的部分key值，但是不影响其他的数据                |
| POST     | 在Wilddog数据库中增加一个节点，每次发送一个POST请求都会生成一个独一无二的ID，如`messages/users/<unique-id>/<data>` |
| DELETE   | 删除指定数据路径下的数据                             |



## 写入数据

`PUT`请求向某个节点写入数据。若节点已有数据，会覆盖原有数据，包括其子节点的数据

使用`PUT`请求，我们可以写入`string`, `number`, `boolean`,`array`或者任意的JSON对象到我们的数据库，这里我们将传递一个JSON对象：

```javascript
curl -X PUT -d '{
  "alanisawesome": {
    "name": "Alan Turing",
    "birthday": "June 23, 1912"
  }
}' 'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/users.json'
```

当一个JSON对象被存储到数据库中，对象的属性被自动映射到指定位置。如果我们定位到新添加的节点上，我们会看到值“Alan Turing”，我们也可以直接保存数据到子路径节点上：

```javascript
curl -X PUT -d '"Alan Turing"' \
  'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/users/alanisawesome/name.json'
```

```
curl -X PUT -d '"June 23, 1912"' \
  'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/users/alanisawesome/birthday.json'
```

以上两个例子采用了两种方法写入数据：一次性写入一个JSON对象，和分别写入每个子数据节点。两种方式最终写入数据的结果是一样的：

```
{
  "users": {
    "alanisawesome": {
      "date_of_birth": "June 23, 1912",
      "full_name": "Alan Turing"
    }
  }
}
```

成功的请求将返回HTTP 200 OK状态码，并且响应中会包含存储到数据库中的数据。上面的两个例子中，对于关注数据变化的其它客户端，第一个例子的做法仅仅触发一个事件，而第二个例子将触发两个事件。注意，如果要写入的路径节点下已经存在数据，第一种方法会覆盖已有的数据，而第二种方法只是修改两个子节点的值，而不会影响已有的其他子节点的数据。`PUT`方法等同于JavaScript SDK的`set()`方法。

## 追加子节点

`POST`请求会生成唯一 ID 作为 key ，要写入的数据作为 value ，进行数据写入。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，它标明了时间的先后。

```
curl -X POST -d '{
  "author": "alanisawesome",
  "title": "The Turing Machine"
}' 'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/posts.json'

```

我们的`posts`路径下的数据将会是这样：

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

注意，`key-JRHTHaKuITFIhnj02kE`是自动生成的，因为我们使用的是`POST`请求。成功的请求将返回HTTP 200 OK状态码，并且响应中会包含新数据的key。

```
{"name":"-JRHTHaKuITFIhnj02kE"}

```

## 更新数据

`PATCH`请求用于更新指定子节点，而不影响其他节点。

```
curl -X PATCH -d '{
  "nickname": "ACE"
}' \
  'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'

```

上面的请求将`nickname`添加到`alanisawesome`对象而不删除子节点`name`和`birthday`。如果使用的是`PUT`请求，`name`和`birthday`将会被删除，因为他们没有出现在请求中。执行完`PATCH`请求之后，数据库中的数据如下：

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

成功的请求将返回HTTP 200 OK状态码，并且响应中会包含更新到数据库中的数据。

## 删除数据

`DELETE`请求用于删除数据

```
curl -X DELETE \
  'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'

```

成功的请求将返回HTTP 200 OK状态码，和一个空的JSON。

### 了解更多

到此为止，你应该对Wilddog中的应用安全机制有了一个大体的了解。

规则表达式是复杂且强大的，本开发向导中只涵盖了非常小的一部分。更多关于规则表达式的细节，请参考[规则表达式文档](/guide/sync/rules/guide.html)，这里将会讲述所有的内置方法和对象。

