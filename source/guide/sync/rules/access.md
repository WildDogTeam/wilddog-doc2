title: 数据访问控制
---
本篇文档介绍如何使用规则表达式对 Wilddog Sync 进行数据访问控制。

## 规则表达式类型

进行数据访问控制时，使用规则表达式的以下三种类型：

| 规则类型    | 描述                             |
| --------- | ------------------------------ |
| .read     | 定义数据是否可以被用户读取。            |
| .write    | 定义数据是否可以被用户写入。                 |
| .validate | 验证数据格式，数据类型，是否有子节点等。 |

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



## 内置对象与函数


规则表达式里提供内置对象与函数，

内置对象包含以下六个：

| 内置对象     | 描述                                       |
| ---------- | ---------------------------------------- |
| now        | 云端的时间戳，以毫秒为单位。                           |
| root       | [`RuleDataSnapshot`](/api/sync/rule.html#RuleDataSnapshot-Methods)类型的对象，用于获取根节点`/`的数据引用。 |
| newData    | [`RuleDataSnapshot`](/api/sync/rule.html#RuleDataSnapshot-Methods)类型的对象，代表数据操作之后的新数据引用。 |
| data       | [`RuleDataSnapshot`](/api/sync/rule.html#RuleDataSnapshot-Methods)类型的对象，代表数据操作前的原始数据引用。  |
| $variables | 通配变量。代表节点列表下某个相同的键 (key) 。                       |
| auth       | 代表已登录用户对象。                   |




## 访问权限控制

访问权限控制用于 Wilddog Sync 中，定义哪些用户可以访问数据，以及可以被写入的数据格式、类型。

### 授权用户

将访问数据的权限授权给指定用户。授权后的用户，存在 auth 对象，可以用于访问用户的 Provider 和 UID 。

auth 对象的属性包含以下两种：

| 属性       | 含义                                       |
| -------- | ---------------------------------------- |
| provider | 身份认证提供商的 ID （ 比如 "password"、"anonymous"、"qq"、"weibo"、"weixin"或"weixinmp"）。 |
| uid      | 标识用户唯一身份的 `Wilddog ID`。                  |

例如，限制认证用户只能操作自己的数据：

```json
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





### 数据校验

数据校验用于验证数据格式，数据类型，是否有子节点等。

可以通过 `.validate` 对数据进行校验。

```javascript
{
  "messages:"{
      "rules": {
            "content": {
              ".read": true,
              ".write": true,
              // 写入/foo 的数据必须是字符串类型且长度小于100。
              ".validate": "newData.isString() && newData.val().length() < 100"
            }
       }
   }
}
```

** data 和 newData **

内置对象 `data` 用于获取数据操作前的原始数据。`newData` 用于获取数据操作之后的新数据。

例如，设置在指定节点下，不可以修改数据：

``` js
// 可以全新写入或删除数据，但不能修改已有数据。
".write": "!data.exists() || !newData.exists()"
```

** 定位到任何节点 **

内置变量 `root`，`data` 和 `newData` 的 `parent()` 和 `child()`方法用于定位任何节点。

参考下面的例子，只有当 allow_writes 节点的值为 true，且父节点没有设置一个 readOnly 标志，且新写入的数据中存在名为 foo 的子节点时，数据才被允许写入。

例如，电影评分超过 8 分，且电影已上映 ，那么可以收藏这部电影。
```javascript
{
  ".write": "root.child('movie').val().exists() &&
            data.parent().child('score').val() > 8 &&
            newData.parent.child('isShow').val() === true "
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>

  - 任何一个节点的 `.validate` 规则校验失败，整个写操作都将失败。
  - 当数据被删除时，`.validate` 表达式会被忽略。

</blockquote>  

**正则表达式校验数据**

`match()` 函数用于规则表达式正则校验
例如，输入的数据需要是字符串，并且字符串是1900-2099年间的YYYY-MM-DD格式：
```js

 ".validate": "newData.isString() &&  newData.val().matches(/^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$/)"
```
关于正则表达式校验的更多内容，请参考[API 文档](/api/sync/rule.html#matches)。





## 权限控制规则
### $ 通配符

实际生产环境中，不可能为每一个数据节点单独配置规则，因此我们可以使用 $ 通配符来选择子节点。
用于匹配子节点

例如，你需要配置一个留言墙的读写权限。
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
以使用 `$` 可以选择所有 message 节点：

```javascript
{
  "rules": {
    "messages": {
      "$message_content": {
        ".read": true,
        ".write": true
      }
      "$message_timestamp": {
        ".read": false
        ".write": false
      }
    }
  }
}
```

使用 `$other` 可以选择未列出的子节点：

```javascript
{
  "rules": {
    "messages": {
      "$message_content": {
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

除了 content 可以读写之外，messages下的其他所有节点都不可读取。

### 规则的级联

规则表达式遵循一个自上向下延展的原则。如果一个数据节点上的.write或.read规则赋予了读或写的权限，那么它的所有的子节点也都将拥有读或写的权限。子节点上的规则不能覆盖父节点或祖先节点已经赋予的读或写的权限。参考下面的例子

```javascript
 "rules": {
     "message": {
        // 允许/message/节点下的数据被读取
        ".read": "data.child('content').val() === true",
        "content": {
          // 当父节点的表达式授予了读权限时，这一规则设置false无效。
          ".read": false
        }
     }
  }
}
```

例如上面的例子，message节点已经设置了可读，那么无论子节点如何设置，子节点都是可读的。



### 规则的原子性

在一次操作中，只要任何一个数据节点没有访问权限，那么整个操作将会失败。参考这个例子：



```javascript
{
  "rules": {
    "messages": {
      "message1": {
        ".read": true
      },
      "message2": {
        ".read": false
      }
    }
  }
}
```

读取路径/messages会返回错误，即使 message1是可读的，但是因为 message2没有可读的权限，所以整个操作都会失败。