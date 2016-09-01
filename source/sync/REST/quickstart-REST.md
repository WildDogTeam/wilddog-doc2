title: 快速入门
---


## 第一步 创建账号和应用

首先，注册并登录Wilddog账号，进入[控制面板](https://www.wilddog.com/dashboard)。然后，在控制面板中，添加一个新的应用。 你会得到一个应用的URL `https://.wilddogio.com/`。你可以把这个URL理解为云端数据库的地址。

## 第二步 读写数据

我们可以在任何Wilddog的数据地址之后加上`.json`来作为URL，发送标准的HTTPS REST请求，实现对数据的读写操作。在本文档中，我们使用[cURL](https://en.wikipedia.org/wiki/CURL)工具发送HTTPS请求。

REST API中最基本的写入操作是`PUT`，使用`PUT`请求写入数据:

```
curl -X PUT -d '{ "alanisawesome": { "name": "Alan Turing", "birthday": "June 23, 1912" } }' 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'

```

必须使用https。为了保障安全，Wilddog只支持加密的传输方式。 成功的请求会收到http状态码200 OK，响应中会包含我们写入Wilddog的数据。

```
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}

```

在任何支持HTTPS的平台和编程语言中，都可以使用wilddog REST API。将来我们也会提供各种编程语言的库，使得REST API的使用更加简单和方便。

现在你已经知道了REST API的基础知识，更多细节请参见 [完整指南](/sync/REST/guide-REST.html)。