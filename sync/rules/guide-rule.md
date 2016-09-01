
title: 规则表达式指南
---

## 安全表达式基础知识

### 设置节点的读取权限

```javascript
"rules": {
  "message"{
    "message1"{    
      ".read": true,
      ".write":  true,
      ".validate": true
    }
    "message2"{
      ".read": true,
      ".write": false,
      ".validate": false
    }
  }
}
```

message1节点，所有人都可以读取数据，所有人都可以输入数据，所有类型的数据都能够输入。

message2节点，所有人都可以读取数据，所有人都不能输入数据，任何数据类型都不能输入。

规则表达式使用 JSON结构，规则表达式的层级结构应该与数据库一致。

注意：应用创建之后，系统默认为公开。所有人都能读写，为了你的数据安全，尽快配置规则表达式

### 用$通配符选择子节点

实际生产环境中，不可能为每一个数据节点单独配置规则，因此我们可以使用 $ 通配符来选择子节点。

例如你储存了一个 message 的信息内容列表：

```javascript
{
  "messages": {
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

不可能为每一个 message 配置规则。那么你可以使用$通配节点。例如

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

还能够使用 $other 选择未列出的子节点：

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

除了content 可以读写之外，messages下的其他所有节点都不可读取。

### 使用内置对象与内置函数

规则表达式中提供了许多内置对象，利用这些内置对象提供的函数和属性，你可以配置各种规则。例如可以使用 auth对象进行授权:

```javascript
{
  "rules": {
    "messages": {
      "$messages_timestamp": {
        ".read": "$messages_uid == auth.uid"
        ".write": "$messages_uid == auth.uid"
      }
    }
  }
}
```

使用 auth对象能够迅速配置，只有当前用户才能够读写自己的数据的权限设置

auth 代表已经登录的用户对象，

规则表达式采用了一种类 javascript的语法，能够在表达式中使用内置对象和内置函数，最终返回的结果应该是 "true"或者"false"。

**内置对象**

内置对象描述now云端的时间戳，以毫秒为单位。root类型的对象，代表操作之前，数据根节点newData类型的对象，代表假设数据操作成功，之后此节点下的数据，也就是此节点下的旧数据和本次操作写入的新数据合并之后的数据。data类型的对象，代表此节点被操作前的原始数据。authAuth类型对象，代表已经登录用户对象。$variables节点的名称变量，代表动态路径的通配符。

还有许多内置函数和运算符，可以查看 [规则表达式API 文档](/sync/rules/API-rule.html)

**data与 newData**

内置对象data指的是写操作发生之前，当前节点的已有数据。newData则指的是，假定写操作会成功，那么写操作成功之后当前节点的数据。newData代表的是旧数据和即将写入的数据合并之后的数据。

为了演示它们的用法，考虑一个这样的场景：我们需要一个规则，在指定的路径下，当前节点数据不存在的时候可以写入，也可以删除已存在的数据，但不能对已有数据进行修改：

```javascript
// data不存（没有旧数据）在或者newData不存在（删除数据）的情况下，可以写入。
// 也就是说可以是全新写入，也可以是删除，但是不能修改已有数据。
".write": "!data.exists() || !newData.exists()"
```

**使用 root 引用其他路径(Demo 需要修改)**

通过使用内置变量root，data和newData，你可以访问到任何数据节点。

参考下面的例子，只有当allow_writes节点的值为true，且父节点没有设置一个readOnly标志，且新写入的数据中存在名为message的子节点时，数据才被允许写入。

```javascript
{
  ".write": "root.child('allow_writes').val() == true &&
            !data.parent().child('readOnly').exists() &&
            newData.child('message').exists()"
}
```

通过内置变量root,，$通配符，您可以定位并且选择任何数据节点。



### 规则的级联

规则表达式遵循一个自上向下延展的原则。如果一个数据节点上的.write或.read规则赋予了读或写的权限，那么它的所有的子节点也都将拥有读或写的权限。子节点上的规则不能覆盖父节点或祖先节点已经赋予的读或写的权限。参考下面的例子

```javascript
 "rules": {
     "message": {
        // 允许/message/节点下的数据被读取
        ".read": "data.child('content').val() == true",
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

为了保证数据的安全，在一次操作中，只要任何一个数据节点没有访问权限，那么整个操作将会失败。参考这个例子：



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

## 数据校验

### 基本校验
可以通过.validate 对数据进行校验。

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

内置变量自带了很多判断函数，例如 isString(), lenght()等。更多的判断函数可以参考 [规则表达式API 文档](/sync/rules/API-rule.html)

**.validate规则不会向下级联。如果在一次操作中，任何一个子节点的.validate规则失败，整个写操作都将失败。当数据被删除（也就是值为null）时，.validate表达式被忽略。**

### 使用正则表达式校验数据

我们可以使用内置的 match()函数来进行正则校验

数据需要满足是字符串，并且字符串是1900-2099年间的YYYY-MM-DD格式

1. ".validate": "newData.isString() &&  newData.val().matches(/^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$/)"

Wilddog只支持一部分正则表达式的功能，已经能够满足绝大部分的需求，关于正则表达式校验的更多内容请看[正则表达式校验](/sync/rules/API-rule.html#matches)。



```javascript
".validate": "newData.isString() &&  newData.val().matches(/^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$/)"
```



## 用户认证

### 基本认证

![img](https://dn-shimo-image.qbox.me/MkrqEWKK7dwefEWW.png!thumbnail)

auth

有关 auth的更多内容，可以使用我们的 [auth](http:/#)功能

**自定义 Token**

超级秘钥

野狗的每个app都有自己的超级密钥，用于在集成用户已有的终端用户系统，为生成的token作签名校验，以保障安全。也可用于用户的服务端到野狗云的超级权限认证（使用超级密钥直接认证的终端为超级权限，不受规则表达式的限制, 超级密钥列表中只有第一个能生成合法的 Wilddog Token ）。

有关 auth的更多内容，可以使用我们的 [auth](http://http/#)功能



## 数据索引

Wilddog提供了强大高效的查询方法，你可以按照任意子节点的顺序对数据进行查询。但是当你的数据量不断增加的时候，查询的效率也会逐渐降低。WildDog提供了数据索引来解决这个问题。你可以在规则表达式中使用 .indexOn 规则为节点建立索引，提高查询效率。

**节点的名称key和优先级priority默认建立索引，不需要额外设置**

Wilddog 根据查询需求的不同，提供了两种.indexOn的索引方式，orderByChild和 orderByValue。

### orderByChild 根据子节点索引

orderByChild 可以根据不同的子节点进行索引，例如我们现在有一些用户的信息：

```javascript
{
  "Jack": {
    "age" : 21,
    "score" : 88,
    "weight": 63
  },
  "Lucy": {
    "age" : 22,
    "score" : 91,
    "weight" : 49
  }
}
```

假设在应用中，我们需要经常对用户的信息按照名称(key)、年龄(score)、分数(score)进行排序，但是不会按照体重(weight)排序，这样我们就可以通过Wilddog提供的.indexOn规则，为名称(key)、年龄(age)、分数(score)这些节点建立索引，来提高查询效率。

我们可以使用如下的设置为高度、长度节点建立索引。名称即为节点的key值，已经默认建立了索引，所以不需要额外设置。

```javascript
{
  "rules": {
    "dinosaurs": {
      ".indexOn": ["age", "score"]
    }
  }
}
```

### orderByValue 根据值索引

orderByValue 可以根据 value的值进行索引。例如我们需要为学生分数建立一个排行榜：

```javascript
{
  "scores": {
    "Jack" : 55,
    "Lucy" : 81,
    "LiLei" : 80,
    "HanMeimei" : 93,
    "Michael" : 66,
    "Jane" : 78
  }
}
```

我们只需要对节点的 value 进行排序，因此我们可以在 /scores节点下对 value 进行索引：

```javascript
{
  "rules": {
    "scores": {
      ".indexOn": ".value"
    }
  }
}
```

