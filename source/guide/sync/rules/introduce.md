
title: 规则表达式简介
---

本篇文档

Wilddog提供了一种类 javascript语法的规则表达式来控制数据访问权限。

你可以通过编写少量的规则表达式实现强大的数据权限控制，包括设置读写权限，用户授权，数据校验和数据索引。

你可以在控制台-实时数据同步-读写权限中配置规则表达式。

![img](/images/rule-overview.png)

规则表达式有四种类型，读、写以及校验，我们能够通过灵活配置这几个个规则，实现访问权限控制和数据校验还有建立索引。

| 规则类型      | 描述                             |
| --------- | ------------------------------ |
| .read     | 定义了数据是否可以被用户读取                 |
| .write    | 定义了数据是否可以被用户写入                 |
| .validate | 定义了什么样的数据是正确的格式，是否有某些子属性，数据类型等 |
| .indexOn  | 为节点数据建立索引，提高查询效率               |



规则类型描述.read定义了数据是否可以被用户读取.write定义了数据是否可以被用户写入.validate定义了什么样的数据是正确的格式，是否有某些子属性，数据类型等 .indexon 为节点数据建立索引，提高查询效率

通过配置规则表达式，可以很轻松的实现各种权限设置：



### 设置读写权限

.read .write 你可以设置你数据中任意节点的可读和可写性。

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

使用.read 与 .write 可以声明了/foo节点以及子节点的读写权限，true为允许，false 为禁止。

true与 false 可以通过表达式来表示。



### 用户认证

内置的 auth对象，你可以授权给不同的用户，只允许授权的用户进行数据操作。

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

通过使用 auth对象，只允许允许写入 uid，



### 校验数据

.validate 你可以校验数据的合法性，只允许符合规则的数据存入。

```javascript
{
  "rules": {
    "foo": {
      ".validate": "newData.isString() && newData.val().length < 100"
    }
  }
}
```

使用.validate 表达式使 foo节点只允许通过使用字符串类型，并且只允许存入长度<100的值。



### 数据索引

通过.indexOn，你可以针对数据节点进行索引，提高查询数据的速度。

```javascript
{
  "rules": {
    "dinosaurs": {
      ".indexOn": ["height", "length"]
    }
  }
}
```

使用了.indexOn对 student的子节点 age，score进行索引，进行查询的时候将会提高效率。