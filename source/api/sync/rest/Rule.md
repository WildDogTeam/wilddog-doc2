title: 规则表达式
---
REST API 可以用来查询和更改规则表达式。该操作必须使用应用的超级密钥，你可以在应用的控制面板--超级密钥页面获取超级密钥。

## 请求

### PUT

**说明**

```
通过 PUT 请求对规则表达式进行修改。
```

**示例**


```
curl -X PUT -d '{"rules":{".read":true}}' 'https://<appId>.wilddogio.com/.settings/rules.json?auth=WILDDOG_SECRET'

```

### GET

**说明**

```
通过 GET 请求对规则表达式进行获取。
```

```
curl  'https://<appId>.wilddogio.com/.settings/rules.json?auth=WILDDOG_SECRET'

```
