
title: 快速入门
---

你可以通过 cURL 工具的例子来了解实时数据同步的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>在任何支持 HTTPS 的平台和编程语言中，都可以使用 Wilddog REST API</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 写入数据

对于 Wilddog 任何 [节点](/guide/reference/term.html#节点)，你可以将该节点相对于根节点的路径作为数据地址。在数据地址后加上`.json`，作为 URL 发送标准的 HTTPS REST 请求，以此写入与读取数据。在本文档中，我们使用 [cURL](https://en.wikipedia.org/wiki/CURL) 工具发送 HTTPS 请求。

假如我们已有数据是这样的

```javascript
{
  "rest": {
    "quickstart": {
      "users": {}
    }
  }
}
```
那么若要操作users节点的数据,数据路径为 /rest/quickstart/users

使用`PUT`请求写入数据:

```javascript
curl -X PUT -d '{ "alanisawesome": { "name": "Alan Turing", "birthday": "June 23, 1912" } }' 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'
```

成功的请求会收到 HTTP 状态码 200 ，返回值中包含我们写入 Wilddog 的数据。

```json
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}
```

## 3. 读取数据

假如我们想读取/rest/quickstart/users下的数据，可以使用｀GET｀请求：

```javascript
curl -X GET 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'
```

成功的请求会收到 HTTP 状态码 200 ，返回值中包含路径下的数据。

```json
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}
```


将来我们会提供各种编程语言的库，使 REST API 更加简便。

更多使用方式，请参考 [完整指南](/guide/sync/rest/guide.html) 和 [API文档](/api/sync/rest.html)。
