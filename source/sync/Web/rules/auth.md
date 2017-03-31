title: 用户访问控制
---

本篇文档介绍如何使用规则表达式对 Wilddog Sync 进行用户访问控制。

规则表达式可以控制每个用户对数据的访问权限。


## 内置对象 auth

使用 WilddogAuth 进行身份认证后，规则表达式中的内置对象 `auth` 可以获取以下两个属性：

| 属性       | 含义                                       |
| -------- | ---------------------------------------- |
| provider | 身份认证提供商的 ID （ 比如 "password"、"anonymous"、"qq"、"weibo"、"weixin"或"weixinmp"）。 |
| uid      | 标识用户唯一身份的 `Wilddog ID`。                  |

例如，限制认证用户只能操作自己的数据：

```js
{
  "rules": {
    "users": {
      "$user_id": {
        // 当认证用户的 uid 与 $user_id 这个 key 匹配时，
        // 才能向此节点写入数据。
        ".write": "$user_id === auth.uid"
      }
    }
  }
}
```


## 自定义用户访问控制

自定义身份认证允许你给用户添加自定义属性进行访问控制。在规则表达式中使用内置对象 `auth.token` 可以访问这些自定义属性。

例如，添加并使用 isAdmin 的自定义属性

```js
{
  "rules": {
    "secret": {
      // auth 里的 `isAdmin` 为 true 时才可以读取数据。
      ".read": "auth.token.isAdmin === true"
    }
  }
}
```
关于自定义 Token 的具体使用方法，请参考 [Wilddog Server SDK](/auth/Server/server.html) 进行身份认证。
