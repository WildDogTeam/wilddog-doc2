title: 操作数据
---

## 操作数据

### 操作数据的方式

| method说明 |                                          |
| :------- | :--------------------------------------- |
| PUT      | 写入或更新路径下的数据，如 `messages/users/user1/<data>` |
| PATCH    | 更新指定路径下的部分key值，但是不影响其他的数据                |
| POST     | 在Wilddog数据库中增加一个节点，每次发送一个POST请求都会生成一个独一无二的ID，如`messages/users/<unique-id>/<data>` |
| DELETE   | 删除指定数据路径下的数据                             |



### 使用PUT来写入数据

REST API基本的写入数据的操作是`PUT`。为了演示数据存储，我们将建立一个博客应用，应用的所有数据都存储在Wilddog应用对应的URl`https://docs-examples.wilddogio.com/rest/saving-data/wildblog`中。

下面来存储一些用户的数据到数据库中，我们存储每个用户的唯一用户名，还存储全名和出生日期。由于用户名是独一无二的，所以适合使用`PUT`而不是`POST`方法，因为我们已经有作为key值的字段，不需要生成。

使用`PUT`方法，我们可以写入`string`, `number`, `boolean`,`array`或者任意的JSON对象到我们的数据库，这里我们将传递一个JSON对象：

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

### 使用PATCH来更新数据

使用`PATCH`请求，我们可以更新指定子节点的数据，而不覆盖其它已经存在的数据。例如使用`PATCH`请求为Turing添加nickname：

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

### 保存列表数据

如果要给添加到数据库中的元素生成一个独一无二的、基于时间戳的key，我们可以使用`POST`请求。对于我们的`users`路径，我们自行定义user数据的key是很有必要的，因为每个用户都有有唯一用户名。但是当用户发表博客时，我们可以使用`POST`请求为博客数据自动生成key。

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

### 删除数据

要删除Wilddog中的数据，我们可以发送`DELETE`请求到要删除数据对应的路径上。下面的命令将删除`users`路径上的`alanisawesome`：

```
curl -X DELETE \
  'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'

```

成功的请求将返回HTTP 200 OK状态码，和一个空的JSON。

### URI参数

当向数据库写入数据时，REST API可以接受以下的参数：

**auth**

`auth`参数允许访问受Wilddog规则表达式保护的数据，并且支持所有的请求方式。auth参数的值可以是Wilddog应用的超级密钥，也可以是一个认证token。下面的例子中我们发送一个包含`auth`参数的`POST`请求，参数的值CREDENTIAL可以是超级密钥，也可以是认证token。

```
curl -X POST -d '{"Authenticated POST request"}' \
  'https://docs-examples.wilddogio.com/rest/saving-data/auth-example.json?auth=CREDENTIAL'

```

**print**

`print`参数让我们可以设置响应的内容格式。把`print=pretty`添加到请求中将会返回易读的格式。`GET`、`PUT`、`POST`和`PATCH`请求都支持`print=pretty`参数。

#### **写入服务端数据**

服务端数值使用占位符： `.sv`。`.sv`的值就是我们期望的服务端数值类型。例如，当一个用户被创建的时候需要设置一个时间戳，我们应该如下操作：

```
curl -X PUT -d '{".sv": "timestamp"}' \
  'https://docs-examples.wilddogio.com/rest/saving-data/alanisawesome/createdAt.json'

```

服务端数值现在只支持时间戳，关于unix时间戳的百科，请参考[百科](http://baike.baidu.com/link?url=VQMFk3ej6ORZFtAhKYF5P6ow_p1XqZ5RgzFHNQFJNgc5U_DCT4nH6MVXkIvSmvO5gLP5DrB7ZsrnZc-2cT5bHa)。

#### **提高写入性能**

如果我们要向数据库写入大量的数据，我们可以使用`print=silent`参数来提高写入性能和减少带宽占用。在正常的写操作中，服务器使用已经写入到数据库中的JSON数据来响应。当指定了`print=slient`参数，服务器会在数据传输完后立即关闭连接来减少带宽占用。

如果我们需要发送大量的请求到数据库，我们可以在HTTPS请求头中添加`Keep-Alive`请求来复用连接。

### 错误码

REST API将在以下情况返回错误码：

| 错误码描述                  |                                          |
| :--------------------- | :--------------------------------------- |
| 404 Not Found          | 通过HTTP请求而不是HTTPS请求                       |
| 400 Bad Request        | 不能解析PUT或POST数据；丢失PUT或POST数据；PUT或POST数据过长；REST API调用路径中包含非法的子节点名字 |
| 417 Expectation Failed | REST API调用没有指定Wilddog应用id                |
| 403 Forbidden          | 请求违反规则表达式的约束                             |


### 了解更多

到此为止，你应该对Wilddog中的应用安全机制有了一个大体的了解。

规则表达式是复杂且强大的，本开发向导中只涵盖了非常小的一部分。更多关于规则表达式的细节，请参考[规则表达式文档](/guide/sync/rules/guide.html)，这里将会讲述所有的内置方法和对象。

