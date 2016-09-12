
title: 规则表达式简介
---

本篇文档介绍 Sync 中的规则表达式，即基于资源数据访问控制列表(ACL)进行数据访问授权。规则表达式采用类似 JavaScript 语法的表达式。通过少量代码即可实现强大的数据权限控制。

你可以在 **控制面板－实时数据同步-读写权限** 中配置规则表达式。

![img](/images/rule-overview.png)

规则表达式有四种类型：设置读写权限，用户授权，数据校验和数据索引。

| 规则类型      | 描述                             |
| --------- | ------------------------------ |
| .read     | 定义了数据是否可以被用户读取。            |
| .write    | 定义了数据是否可以被用户写入。                 |
| .validate | 定义了什么样的数据是正确的格式，是否有某些子属性，数据类型等。|
| .indexOn  | 为节点数据建立索引，提高查询效率。               |


## 设置读写权限

通过 `.read` `.write` 你可以设置数据中任意节点的可读和可写性。

```javascript
{
  "rules": {
    "foo": {
      ".read": true,
      ".write": false
    }
  }
}
```

使用`.read` 与 `.write` 声明 /foo 节点以及子节点的读写权限：true 为允许，false 为禁止。

## 用户认证

内置的 auth 对象，你可以给不同的用户授权，只允许授权的用户对数据进行操作。

```javascript
{
  "rules": {
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```
允许经过 Wilddog Auth 授权的用户在 /users/<uid> 写入数据。auth.uid 是通过 Wilddog Auth 验证后的 ID。


## 校验数据

你可以通过`.validate`校验数据的合法性，只允许符合规则的数据存入。

```javascript
{
  "rules": {
    "foo": {
      ".validate": "newData.isString() && newData.val().length < 100"
    }
  }
}
```

`.validate`使 foo节点只允许使用字符串类型，并且只允许存入长度 <100 的值。



## 数据索引

通过`.indexOn`，你可以针对数据节点进行索引，提高查询数据的速度。

```javascript
{
  "rules": {
    "students": {
      ".indexOn": ["age", "score"]
    }
  }
}
```

使用 `.indexOn`对 students 的子节点 age 和 score 进行索引，进行查询的时候将会提高效率。