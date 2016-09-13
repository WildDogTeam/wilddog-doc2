
title: REST API 文档
---

我们可以使用任意的Wilddog应用的URL作为REST的结束点，我们只需要在URL的结尾处加上`.json`然后发送HTTPS请求即可。 HTTPS是必须的，Wilddog只会响应加密数据，所以你的数据是保证安全的。

## GET

说明

通过HTTP发送GET请求就可以读取数据库中的数据 请求成功将会返回200 OK状态码。响应中会包含要查询的数据。

示例

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json'

```

返回值

```
{ "first": "Jack", "last": "Sparrow" }

```

---

## PUT

说明

我们可以使用 `PUT` 请求写入数据

示例

```
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'https://samplechat.wilddogio.com/users/jack/name.json'

```

返回值

```
{ "first": "Jack", "last": "Sparrow" }

```

---

## POST

说明

要实现js中`push()`方法类似的功能，我们可以使用`POST`请求

示例

```
curl -X POST -d '{"user_id" : "jack", "text" : "Ahoy!"}' \
  'https://samplechat.wilddogio.com/message_list.json'

```

返回值

```
{ "name": "-INOQPH-aV_psbk3ZXEX" }

```

---

## PATCH

说明

我们可以使用`PATCH`请求来更新指定位置的数据而不覆盖其他已有的数据。`PATCH`请求中指定的节点数据会被覆盖，没有提到的节点不会被删除。该功能与js中的`update()`方法类似。

示例

```
curl -X PATCH -d '{"last":"Jones"}' \
 'https://samplechat.wilddogio.com/users/jack/name/.json'

```

返回值

```
{ "last": "Jones" }

```

---

## DELETE

说明

我们可以使用`DELETE`请求来删除数据。

示例

```
curl -X DELETE \
  'https://samplechat.wilddogio.com/users/jack/name/last.json'

```

返回值

请求成功将会返回200 OK状态码。响应中会包含空的JSON

---

## 方法覆盖

说明

如果我们发出REST调用的浏览器不支持上面的方法，我们可以覆盖请求方法，发送`POST`请求通过请求头中的`X-HTTP-Method-Override`设置要覆盖的方法。

示例

```
curl -X POST -H "X-HTTP-Method-Override: DELETE" \
  'https://samplechat.wilddogio.com/users/jack/name/last.json'

```

我们也可以使用`x-http-method-override`查询参数：

```
curl -X POST \
  'https://samplechat.wilddogio.com/users/jack/name/last.json?x-http-method-override=DELETE'

```

返回值

请求成功将会返回200 OK状态码。响应中会包含空的JSON

---

# Query

Wilddog的REST API接收以下的查询参数和值

## shallow

说明

这是一个高级功能，目标是帮助处理大的数据集而不下载数据集的全部。设置 shallow=true 将限制数据返回的深度。如果返回的数据是JSON primitive \(string, number or boolean\)， 它的value将被返回。 如果数据的snapshot是 JSON object，每一个key的value将被截断成布尔类型`true`。

示例

```
curl 'https://samplechat.wilddogio.com/.json?shallow=true'

```

使用shallow参数后， 将不能使用其他查询参数。

---

## count

说明

查询当前节点下直接子节点的个数。设置 count=true 返回数量。可以与条件查询连用。与条件查询连用时，返回的是满足条件的节点的数量。

示例

```
//查询 rest 节点下的子节点个数
curl 'https://docs-examples.wilddogio.com/rest.json?count=true'

//查询高度为0.6的恐龙的个数
curl 'https://dinosaur-facts.wilddogio.com/dinosaurs.json?orderBy="height"&equalTo=0.6&count=true'

```

---

## print

说明

格式化响应返回的数据。

| 参数REST方法描述 |                               |                                          |
| :--------- | :---------------------------- | :--------------------------------------- |
| pretty     | GET, PUT, POST, PATCH, DELETE | 以易读的方式查看数据                               |
| silent     | GET, PUT, POST, PATCH         | 写入数据的时候控制输出，响应返回的是空值，http状态码为204 No Content |

示例

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json?print=pretty'
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'https://samplechat.wilddogio.com/users/jack/name.json?print=silent'

```

---

## callback

说明

仅支持 `get` 方式。为了让web客户端的rest请求实现跨域，你可以用JSONNP在JavaScript回调方法中封装一个响应。使用 `callback=` 让rest API在你指定的回调方法中封装返回的数据。

示例

```
<script>
  function gotData(data) {
    console.log(data);
  }
</script>
<script src="https://samplechat.wilddogio.com/.json?callback=gotData"></script>

```

---

## format

说明

在 get 数据时，若带有如下参数，响应数据中会包含priority信息

示例

```
curl 'https://samplechat.wilddogio.com/.json?format=export'

```

---

## download

说明

仅支持 `get` 方式。如果你想从web客户端把你的数据下载到一个文件中，请使用 `download=` 参数。参数后加上一个合适的文件名以让客户端将数据保存到这个文件中。

示例

```
curl 'https://samplechat.wilddogio.com/.json?download=myfilename.txt'

```

---

## orderBy

在 [完整文档 - 查询数据](/guide/sync/rest/guide.html#查询数据) 文档中获取更多信息。

## limitToFirst, limitToLast

在 [完整文档 - 查询数据](/guide/sync/rest/guide.html#查询数据) 文档中获取更多信息。

## startAt, endAt, equalTo

在 [完整文档 - 查询](/guide/sync/rest/guide.html#查询数据) 文档中获取更多信息。

---

# Auth

## auth

说明

所有的请求都支持。可以授权请求访问被规则表达式保护的数据。可以使用应用的密钥，也可以使用认证令牌。

示例

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json?auth=CREDENTIAL'
```


---

## customTokenToIdToken

说明

将 SDK 生成的 CustomToken 转换为 Wilddog IdToken。仅支持 `POST` 方式。

示例

```
curl -X POST -d '{"token":"<YOUR CUSTOM TOKEN HERE>"}' \
'https://<appid>.wilddogio.com/.auth/customTokenToIdToken.json'
```

返回值

```json
{
    "idToken":"<IDTOEKN HERE>",
    "expireIn":<EXPIRE TIME IN SECONDS>
}
```

如果转换过程中出现错误，系统会返回如下格式结果：

```json
{
    "error":{
        "code":"<ERRER CODE>",
        "errorMessage":"<ERROR MESSAGE>"
    }
}
```

---

# Streaming

Wilddog REST API支持 [EventSource \/ Server-Sent Events ](http://www.w3.org/TR/eventsource/)协议。在Wilddog数据库使用 Server-Sent Events（简写 SSE）， 你需要准备以下：

* １. 设置Accept = "text\/event-stream"
* ２. 支持HTTP转跳，HTTP code 307
* ３. 如果read操作有规则表达式， 需要设置auth参数

云端返回的数据的协议：

```
event: event name

data: JSON encoded data payload

```

下面是云端返回的数据协议：

## put

说明

data是json对象， 包含两个key： `path`和`data`。`path`是`data`相关的路径。客户端应该替换`path`的所有数据。

---

## patch

说明

data是json对象， 包含两个key： `path` 和 `data`。`path`是`data`相关的路径。对于data的每一个key，客户端应该替换这个key对应的数据。

---

## keep-alive

说明

event的data为null，即无任何操作。

---

## auth\_revoked

说明

此event的数据为一个字符串，该字符串表示该认证已过期。当提供的认证过期时，此event将被发送。

---

## 示例

先开启一个端口用于查看云端发送的event，下面是云端发送的event示例:

```
//  设置你整个数据
event: put
data: {"path": "/", "data": {"a": 1, "b": 2}}

//  推送key为c的新数据, 然后整个数据如下
// {"a": 1, "b": 2, "c": {"foo": true, "bar": false}}
event: put
data: {"path": "/c", "data": {"foo": true, "bar": false}}

// 在每个数据的key, 更新或添加数据，
// 然后整个数据如下
//  {"a": 1, "b": 2, "c": {"foo": 3, "bar": false, "baz": 4}}
event: patch
data: {"path": "/c", "data": {"foo": 3, "baz": 4}}

```

为了产生变化，可以再开启一个端口输入命令。

如：使用curl命令开启SSE

```
curl -X GET -H 'Accept:text/event-stream' 'https://<appId>.wilddogio.com/.json'

```

使用curl命令put数据

```
curl -X PUT -d '{"path": "/", "data": {"a": 1, "b": 2}}' 'https://<appId>.wilddogio.com/.json'
{"path":"/","data":{"a":1,"b":2}}

```

---

# Priorities

某个节点的优先级信息会被一个名为 .priority 的虚拟节点储存。优先级可以通过REST请求读取或写入。例如，下面的请求用来检索 users\/tom 节点的优先级信息：

```
curl 'https://samplechat.wilddogio.com/users/tom/.priority.json'

```

当要同时写入优先级信息和数据信息时，你可以在要写入的JSON中增加 .priority 子节点：

```
curl -X PUT -d '{"name": {"first": "Tom"}, ".priority": 1.0}' \
  'https://samplechat.wilddogio.com/users/tom.json'

```

当要同时写入优先级信息和原始类型数据（如字符串）时，你可以增加一个 .priority 子节点，并将原始类型数据放在 .value 子节点中：

```
curl -X PUT -d '{".value": "Tom", ".priority": 1.0}' \
  'https://samplechat.wilddogio.com/users/tom/name/first.json'

```

这个示例写入的值是Tom，优先级是1.0。优先级可以放在JSON结构的任意深度。

---

# Server Values

说明

服务端数值使用占位符： `.sv`。`.sv`的值就是我们期望的服务端数值类型。例如，当一个用户被创建的时候需要设置一个时间戳，我们应该如下操作：

示例

```
curl -X PUT -d '{".sv": "timestamp"}' \
  'https://<appId>.wilddogio.com/rest/saving-data/alanisawesome/createdAt.json'

```

说明

当我们需要获取服务器的当前时间戳时，可以进行如下操作 :

示例

```
curl 'https://<appId>.wilddogio.com/.json?sv=timestamp'

```

该操作将会直接返回服务器的当前时间戳，而不包括查询的数据。

服务端数值现在只支持时间戳，关于unix时间戳的百科，请参考[百科](http://baike.baidu.com/link?url=VQMFk3ej6ORZFtAhKYF5P6ow_p1XqZ5RgzFHNQFJNgc5U_DCT4nH6MVXkIvSmvO5gLP5DrB7ZsrnZc-2cT5bHa)。

---

# 规则表达式

REST API可以用来查询和更改规则表达式。该操作必须使用应用的超级密钥，你可以在应用的控制面板--超级密钥页面获取超级密钥。

```
curl -X PUT -d '{"rules":{".read":true}}' 'https://<appId>.wilddogio.com/.settings/rules.json?auth=WILDDOG_SECRET'

```

```
curl  'https://<appId>.wilddogio.com/.settings/rules.json?auth=WILDDOG_SECRET'

```

---

# 错误原因

## 错误码

说明

Wilddog的REST API将在以下情况返回错误码：

| HTTP状态码描述              |                         |
| :--------------------- | :---------------------- |
| 404 Not Found          | 通过HTTP请求而不是HTTPS请求      |
| 400 Bad Request        | 不能解析PUT或POST数据          |
| 400 Bad Request        | 丢失PUT或POST数据            |
| 400 Bad Request        | PUT或POST数据过长            |
| 417 Expectation Failed | REST API调用没有指定Wilddog名字 |
| 400 Bad Request        | REST API调用路径中包含非法的子节点名字 |
| 403 Forbidden          | 请求违反规则表达式               |

## 错误信息

说明

Wilddog的REST API将在业务错误时返回值中返回error信息：

For example :

```
{
  "error":"单次请求数据量过大"
}

```

常见error信息列举如下：

| error信息描述推荐解决方案  |                                   |                                          |
| :--------------- | :-------------------------------- | :--------------------------------------- |
| 单次请求数据量过大        | 用户对相应节点导出的数据超过了REST API允许导出的数据量范围 | 用户将问题通过提交工单的方式进行反馈,会有专员为用户提取数据           |
| 写入数据中叶子节点数据量过大   | 用户写入的数据中存在节点超过了每个节点允许的最大数据量       | 用户若存在节点数据大于节点最大数据允许范围,则需要重新设计数据结构        |
| orderBy参数不合法     | 用户orderBy参数不符合orederBy的参数的规范      | 用户确认orderBy中的参数信息是否有异常字符.eg:若orderBy参数中若有$符号,则参数必须为$key、$priority、$value这三种情况的一种 |
| 路径不合法，超过最大深度32层  | 用户的数据节点深度超过最大深度32层                | 用户的数据节点深度不能超过32层,若超过32层,则需重新设计数据结构       |
| 单次写入数据量超过4M字节的限制 | 单次写入数据量超过4M字节的限制                  | 用户将写操作的数据通过数据拆分的形式进行分批操作                 |

