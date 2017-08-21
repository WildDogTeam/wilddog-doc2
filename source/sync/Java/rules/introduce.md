
title: 规则表达式简介
---

本篇文档介绍如何使用规则表达式对 Wilddog Sync 进行数据读写权限控制、用户访问控制、数据校验及数据索引。


规则表达式包含以下四种类型：

| 规则类型   | 描述                             |
| --------- | ------------------------------ |
| .read     | 定义数据是否可以被用户读取。            |
| .write    | 定义数据是否可以被用户写入。                 |
| .validate | 定义数据的正确的格式，是否有某些子属性，数据类型等。|
| .indexOn  | 为节点数据建立索引，提高查询效率。               |


## 读写权限控制

`.read` `.write` 用于设置数据的读写权限。

例如，声明 `/foo` 节点的读写权限：true 为允许，false 为禁止：

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


## 用户访问控制

规则表达式可以控制每个用户对数据的访问权限。

例如，授权用户在 `/users/<uid>` 写入数据，使用 [内置对象](/sync/java/rules/access.html#内置对象) 中的 `auth` 获取用户：

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


## 数据校验

`.validate` 用于校验数据的合法性，只允许写入符合规则的数据。

例如，只允许写入字符串类型，并且长度 < 100 的值：

```javascript
{
  "rules": {
    "foo": {
      ".validate": "newData.isString() && newData.val().length < 100"
    }
  }
}
```




## 数据索引

`.indexOn` 用于针对数据节点进行索引，提高查询数据效率。

例如，对 students 的子节点 age 和 score 进行索引：

```javascript
{
  "rules": {
    "students": {
      ".indexOn": ["age", "score"]
    }
  }
}
```






