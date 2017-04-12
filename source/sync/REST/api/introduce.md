title: REST API 简介

---

我们可以使用任意的 Wilddog 应用的 URL 作为 REST 的结束点，我们只需要在URL的结尾处加上 `.json` 然后发送 HTTPS 请求即可。 HTTPS 是必须的，Wilddog 只会响应加密数据，所以你的数据是保证安全的。

## 请求类型

### GET

##### 说明

通过 HTTP 发送 `GET` 请求就可以读取数据库中的数据。请求成功将会返回 200 OK 状态码。响应中会包含要查询的数据。
详细使用可参考：[完整指南－数据查询](/sync/REST/guide/retrieve-data.html)

##### 示例

```
curl 'https://samplechat.wilddogio.com/users/jack/name.json'

```

##### 返回值

```
{ "first": "Jack", "last": "Sparrow" }

```

---

### PUT

##### 说明

向指定节点写入数据。此方法会先清空指定节点，再写入数据。
详细使用可参考：[完整指南－数据操作](/sync/REST/guide/save-data.html#写入数据)

##### 示例

```
curl -X PUT -d '{ "first": "Jack", "last": "Sparrow" }' \
  'https://samplechat.wilddogio.com/users/jack/name.json'

```

##### 返回值

```
{ "first": "Jack", "last": "Sparrow" }

```

---

### POST

##### 说明

向指定节点添加子节点。新增子节点的 key 自动生成并保证唯一（例如：-INOQPH-aV_psbk3ZXEX）。新增子节点的 key 基于时间戳和随机算法生成，并可以按照时间先后进行排序。
详细使用可参考：[完整指南－数据操作](/sync/REST/guide/save-data.html#追加子节点)

##### 示例

```
curl -X POST -d '{"user_id" : "jack", "text" : "Ahoy!"}' \
  'https://samplechat.wilddogio.com/message_list.json'

```

##### 返回值

```
{ "name": "-INOQPH-aV_psbk3ZXEX" }

```

---

### PATCH

##### 说明

对指定节点进行数据合并操作，更新指定节点下的数据。与`PUT`方法覆盖当前节点下所有数据的方式不同，使用`PATCH`方法，不存在的子节点将会被新增，存在的子节点将会被更新。使用此方法可以对同一节点的子节点同时进行更新和删除操作。
`PATCH`支持多路径更新。
详细使用可参考：[完整指南－数据操作](/sync/REST/guide/save-data.html#更新数据)

##### 示例

```
curl -X PATCH -d '{"last":"Jones"}' \
 'https://samplechat.wilddogio.com/users/jack/name/.json'

```

##### 返回值

```
{ "last": "Jones" }

```

<blockquote class="warning">
<p><strong>重要：</strong></p>

`PATCH` 支持多路径更新，需要同时向多个节点写入数据时，你应该优先考虑使用`PATCH`请求。

</blockquote>

##### 示例

```
// 同时更新 jack 的 name 字段和 tom 的 age 字段
curl -X PATCH -d '{"jack/name":"Jones", "tom/age":27}' \
'https://samplechat.wilddogio.com/users/.json'
```

##### 返回值

```
{"jack/name":"Jones", "tom/age":27}
```
---

### DELETE

##### 说明

我们可以使用`DELETE`请求来删除数据。
详细使用可参考：[完整指南－数据操作](/sync/REST/guide/save-data.html#删除数据)

##### 示例

```
curl -X DELETE \
  'https://samplechat.wilddogio.com/users/jack/name/last.json'

```

##### 返回值

请求成功将会返回 200 OK 状态码。响应中会包含空的 JSON。


---

### 方法覆盖

##### 说明

如果我们发出 REST 调用的浏览器不支持上面的方法，我们可以覆盖请求方法，发送`POST`请求通过请求头中的`X-HTTP-Method-Override`设置要覆盖的方法。

##### 示例

```
curl -X POST -H "X-HTTP-Method-Override: DELETE" \
  'https://samplechat.wilddogio.com/users/jack/name/last.json'

```

我们也可以使用`x-http-method-override`查询参数：

```
curl -X POST \
  'https://samplechat.wilddogio.com/users/jack/name/last.json?x-http-method-override=DELETE'

```

##### 返回值

请求成功将会返回 200 OK 状态码。响应中会包含空的 JSON。

