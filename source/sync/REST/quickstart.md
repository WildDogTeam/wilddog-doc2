title: 快速入门
---

你可以通过`cURL`工具的例子来了解实时通信引擎的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>在任何支持 HTTPS 的平台和编程语言中，都可以使用 Wilddog REST API</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 写入数据

对于 Wilddog 任何 [节点](/sync/REST/guide/concept.html#Sync-的数据结构是什么？)，你可以将该节点相对于根节点的路径作为数据地址。在数据地址后加上`.json`，作为 URL 发送标准的 HTTPS REST 请求，以此写入与读取数据。在本文档中，我们使用 [cURL](https://en.wikipedia.org/wiki/CURL) 工具发送 HTTPS 请求。

例如，已有数据是这样的那么若要操作users节点的数据,数据路径为 `/rest/quickstart/users`：

```javascript
{
  "rest": {
    "quickstart": {
      "users": {}
    }
  }
}
```

使用`PUT`请求写入数据:

```javascript
curl -X PUT -d '{ "alanisawesome": { "name": "Alan Turing", "birthday": "June 23, 1912" } }' 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'
```

成功的请求会收到 HTTP 状态码 200 ，返回值中包含我们写入 Wilddog 的数据：

```json
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}
```

## 3. 读取数据

`GET` 请求用于读取 `/rest/quickstart/users` 下的数据： 

```javascript
curl -X GET 'https://docs-examples.wilddogio.com/rest/quickstart/users.json'
```

成功的请求会收到 HTTP 状态码 200 ，返回值中包含路径下的数据：

```json
{
  "alanisawesome": {
    "birthday": "June 23, 1912",
    "name": "Alan Turing"
  }
}
```

将来我们会提供各种编程语言的库，使 REST API 更加简便。

## 4.数据安全

你可以在 Sync 中使用规则表达式进行数据访问权限的控制。规则表达式可以实现以下功能：

- 数据访问权限控制
- 用户访问权限控制
- 数据格式校验
- 数据索引

规则表达式的具体使用，请参考 [安全性与规则](/sync/REST/rules/introduce.html)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>

初始配置下，所有人都能读写你的应用数据，请及时在 实时通信引擎-读写权限 中更改规则表达式。

</blockquote>

## 5.更多使用

- 了解 Sync 更多使用方式，请参考 [完整指南](/sync/REST/guide/save-data.html) 和 [API文档](/sync/REST/api/introduce.html)。
- 了解如何设计数据结构，请参考 [组织数据](/sync/REST/guide/bestpractice/structure-data.html)。

