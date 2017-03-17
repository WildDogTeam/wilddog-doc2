
title: 数据操作
---

本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下五种请求类型：

| 方法     | 说明                                       |
| ------ | ---------------------------------------- |
| PUT    | 向指定 [节点](/guide/sync/concept.html#Sync-的数据结构是什么？)写入数据。若此节点已存在数据，会覆盖原有数据。 |
| POST   | 向指定节点添加 [子节点](/guide/sync/concept.html#子节点)。子节点的 [key](/guide/sync/concept.html#Key-Value-结构) 自动生成并保证唯一。 |
| PATCH  | 更新指定子节点。                                 |
| DELETE | 删除指定节点。                                  |



## 写入数据

`PUT` 请求用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

例如，向 `alanisawesome` 节点写入 `name`、`birthday`：
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

`POST` 请求用于向指定节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照添加时间进行排序。

例如，追加子节点到 `posts` 节点：

```
curl -X POST -d '{
  "author": "alanisawesome",
  "title": "The Turing Machine"
}' 'https://docs-examples.wilddogio.com/rest/saving-data/wildblog/posts.json'

```

`posts` 路径下的数据将会是这样：

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


成功的请求将返回 HTTP 200 OK 状态码，并且响应中会包含新数据的key：

```
{"name":"-JRHTHaKuITFIhnj02kE"}

```


## 更新数据


`PATCH` 请求用于更新指定子节点。

例如，更新 `gracehop` 的  `nickname`：


```js
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}

```
只更新 `gracehop` 的 `nickname`:

```
curl -X PATCH -d '{
  "nickname": "Amazing grace"
}' 'https://docs-examples.wilddogio.com/rest/saving-data/users/gracehop.json'
```

成功的请求将返回 HTTP 200 OK 状态码。

`PATCH` 请求支持多路径更新，可以只调用一次方法更新多个路径的数据。


例如，同时更新 b 节点下的 d 和 x 节点下的 z：

```js
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}

```

正确示例：

```
curl -X PATCH -d '{"b/d":"updateD", "x/z":"updateZ"}' \
 'https://samplechat.wilddogio.com/a/.json'
```
 
更新后数据如下：

```
{
    "a": {
        "b": {
            "c": "cc",
            "d": "updateD"
        },
        "x": {
            "y": "yy",
            "z": "updateZ"
        }
    }
}

```

错误示例：

```
// 错误的多路径更新写法，会覆盖原有数据
curl -X PATCH -d '{"b":{"d":"updateD"}, "x":{"z":"updateZ"}}' \
 'https://samplechat.wilddogio.com/a/.json'
 
```

更新后数据如下

```
{
    "a": {
        "b": {
            "d": "updateD"
        },
        "x": {
            "z": "updateZ"
        }
    }
}

```


## 删除数据

`DELETE` 请求用于删除指定节点。

```
curl -X DELETE \
  'https://docs-examples.wilddogio.com/rest/saving-data/users/alanisawesome.json'
```

成功的请求将返回 HTTP 200 OK 状态码，和一个空的 JSON。

