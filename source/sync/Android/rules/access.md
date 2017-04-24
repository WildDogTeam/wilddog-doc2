title: 读写权限控制
---

本篇文档介绍规则表达式的基础知识，以及如何设置数据的读写权限。


## 规则表达式类型

设置数据读写权限，使用规则表达式的以下两种类型：


| 规则类型    | 描述                             |
| --------- | ------------------------------ |
| .read     | 定义数据是否可以读取，默认为 false。          |
| .write    | 定义数据是否可以写入，默认为 false。              |

规则表达式使用 JSON 格式，与你的数据结构相对应：

```javascript
{
  "rules": {
    "foo": {
      // 设置 /foo/ 下数据可读
      ".read": true,

      // 设置 /foo/ 下数据可写
      ".write": true,

      // 设置 /foo/ 下数据必须为 string 类型，并且长度少于 100 个字符。
      ".validate": "newData.isString() && newData.val().length < 100"
    }
  }
}```



## 内置对象


规则表达式中提供了许多内置对象。利用这些内置对象提供的方法和属性，你可以配置各种规则。

内置对象包含以下六个：

| 内置对象     | 描述                                       |
| ---------- | ---------------------------------------- |
| now        | 代表云端的时间戳，以毫秒为单位。                           |
| root       | [RuleDataSnapshot](/sync/Android/rules/ruleapi.html#RuleDataSnapshot-Methods)类型的对象，代表根节点`/`的数据引用。 |
| newData    | [RuleDataSnapshot](/sync/Android/rules/ruleapi.html#RuleDataSnapshot-Methods)类型的对象，代表数据操作之后的新数据引用。 |
| data       | [RuleDataSnapshot](/sync/Android/rules/ruleapi.html#RuleDataSnapshot-Methods)类型的对象，代表数据操作前的原始数据引用。  |
| $variables | 通配变量。代表节点列表下某个相同的键 (key) 。                       |
| auth       | 代表已登录用户对象。                   |

内置对象的使用，请参考 [规则表达式 API 参考](/sync/Android/rules/ruleapi.html)。

## $ 通配符

$ 通配符用于代表一个或多个匹配的节点。

例如，配置一个留言墙的读写权限。
数据结构如下：

```javascript
{
  "messageboard": {
    "message0": {
      "content": "Hello",
      "timestamp": 1405704370369,
      "uid":17343512
    },
    "message1": {
      "content": "Goodbye",
      "timestamp": 1405704395231,
      "uid":72366233
    },
    ...
  }
}
```
使用 `$` 可以代表所有 message 节点：

```javascript
{
  "rules": {
    "messageboard": {
      "$message_id": {
        ".read": true,
        ".write": false
      }
    }
  }
}
```

使用 `$other` 代表未列出的子节点：

```javascript
{
  "rules": {
    "messageboard": {
      "message0": {
        ".read": true,
        ".write": true
      }
      "$other": {
        ".read": false
        ".write": false
      }
    }
  }
}
```

## 规则的级联性

级联规则是指节点上设置的读写权限为 `true` 时在其子节点上同样生效，并且会覆盖其子节点已有权限。

例如，message 节点已经设置为可读，那么无论子节点如何设置，子节点都可读：
```javascript
 "rules": {
     "message": {
        // 允许 /message/ 节点下的数据被读取
        ".read": "data.child('content').val() === true",
        "content": {
          // 当父节点的表达式授予了读权限时，这一规则设置 false 无效。
          ".read": false
        }
     }
  }
}
```
<blockquote class="warning">
  <p><strong>注意：</strong></p>
    `.validate` 规则不会进行级联。
</blockquote>

## 规则的原子性

规则的原子性是指父节点没有读写权限时，即使所有子节点都有读写权限，在父节点的读写操作也会完全失败

例如，读取 `/messageboard` 节点的数据，由于 `/messageboard` 节点没有读权限，所以读操作失败：


```javascript
{
  "rules": {
    // 无法读取 /messageboard 节点的数据。
    "messageboard": {
      "message1": {
      // 可以直接成功读取 /messageboard/message1 节点的数据。
        ".read": true
      },
      "message2": {
        ".read": false
      }
    }
  }
}
```







