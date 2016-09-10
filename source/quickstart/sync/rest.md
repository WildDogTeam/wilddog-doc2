title: 快速入门
---


## 1. 创建应用

首先在控制面板中创建应用，请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 读取与保存数据

可以在任何 Wilddog 的数据地址之后加上`.json`，作为 URL 发送标准的 HTTPS REST 请求，以此读取与保存数据。在本文档中，我们使用 [CURL](https://en.wikipedia.org/wiki/CURL) 工具发送 HTTPS 请求。

使用`PUT`请求写入数据:

```
curl -X PUT -d '{ "alanisawesome": { "name": "Alan Turing", "birthday": "June 23, 1912" } }' 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'

```

成功的请求会收到 HTTP 状态码200 OK，响应中包含我们写入Wilddog 的数据。

```
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}

```

在任何支持 HTTPS 的平台和编程语言中，都可以使用 Wilddog REST API。将来我们会提供各种编程语言的库，使 REST API 更加简便。

更多具体细节，请参考 [完整指南](old/sync/rest/guide-rest.html)。