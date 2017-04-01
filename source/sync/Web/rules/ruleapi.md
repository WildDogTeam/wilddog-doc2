
title: API 参考
---

## Rule (*Type*)

### .read

定义

对指定路径赋予读取数据的权限。

说明

读取规则是Wilddog数据库中一种安全规则。该规则是面向路径设计的，意味着不同路径可以设置不同的读取规则。例如：

```
".read": "auth != null && auth.provider == 'weibo'"
```

.read 规则的值类型是字符串，这个表达式使用Javascript 语法。如果表达式的值为true 代表这个路径是可以读取， 而且它的所有子节点也是可以读取的。值为false 则不能读取数据。

.read对除了newData外的所有Wilddog变量可用。

------

### .write

定义

对指定路径赋予写数据的权限。

说明

写规则是Wilddog 数据库中一种安全规则。该规则是面向路径设计的，意味着不同路径可以设置不同的写规则。例如：

.write 规则的值类型是字符串，这个表达式使用Javascript 语法。如果表达式的值为true 代表这个路径是可以写， 而且它的所有子节点也是可以写的。值为false 则不能写数据。

.write规则对Wilddog所有的Rule变量可用。

------

### .validate

定义

.write规则获得权限后使用，以确保所写的数据符合特定的模式。

说明

.write 规则获得权限后使用，以确保所写的数据符合特定的模式。除此之外，.write 获得权限后，.validate 规则必须取得验证成功。例如：

```
".validate": "newData.hasChildren(['name', 'age'])"

```

.validate 规则的值类型是字符串，这个表达式使用的Javascript语法。

.validate 规则对Wilddog所有的Rule变量可用。

------

### .indexOn

定义

为数据添加索引，提高查询效率。

说明

.indexOn 规则可以为指定的节点建立索引，以此来提高查询效率。例如：

```
{
  "rules": {
    "dinosaurs": {
      ".indexOn": ["height", "length"]
    }
  }
}

```

.indexOn 规则的值类型是字符串，或者是字符串数组。 节点的名称key和优先级priority默认建立索引，不需要额外设置。 关于 .indexOn 规则更多介绍，请参考规则表达式文档 [数据索引](/sync/Web/guide/sync/rules/guide.html##数据索引) 部分。

------

## Rule (*Variables*)

### auth

定义

这个变量与用户是否使用认证有关。使用认证就是调用auth相关的方法，比如authWithPassword()。 如果客户端已经登录认证，这个变量中包含token信息，否则为null。

说明

Wilddog 认证

野狗内置几种认证方式。你可以轻松使用它们来生成tokens。在使用一种认证方式和，auth变量包含以下内容：

| 字段       | 描述                                       |
| -------- | ---------------------------------------- |
| provider | 认证提供商 ("password", "anonymous", "qq", "weibo", "weixin", "weixinmp" ,"phone" or "weapp")。 |
| uid      | 一个唯一的用户id，保证独一无二。|
| token      | 用户的其他属性 ,包括邮箱,邮箱验证,用户昵称以及用户的所有自定义属性。|

举一个例子, 有一个博客的评论， 只能修改和删除评论， 我们配置以下规则：

```
{
  "rules": {
    ".read": true,
    "$comment": {
      ".write": "!data.exists() && newData.child('user_id').val() == auth.uid"
    }
  }
}

```

如果要求只有微博登修改，只需要轻松修改rule配置， 就能搞定。

```
{
  "rules": {
    ".read": true,
    "$comment": {
      ".write": "!data.exists() && auth.provider == 'weibo'"
    }
  }
}
```
其中token变量还包括以下字段:

| 字段       | 描述                                       |
| -------- | ---------------------------------------- |
| email | 用户绑定的主邮箱 |
| email_verified      | 用户是否验证过主邮箱 |
| name      | 用户的昵称 |
| phone_number | 用户绑定的手机号 |
| phone_number_verified | 用户是否验证过手机号 |


如果要求只有用户验证过邮箱才能进行数据读取可以修改rule规则配置。
```
{
  "rules": {
    ".read": true,
    ".write":"auth.token.email_verified == true"
  }
}
```

下面java版生成工具依赖

```
<dependency>
    <groupId>com.wilddog</groupId>
    <artifactId>wilddog-token-generator</artifactId>
    <version>1.0.0</version>
</dependency>

```

------

### $location

定义

一个可以用来在规则表达式中使用的代表位置的变量。

说明

当你使用$location在你规则表达式，这个变量是以`$`开头，用于替换实际读写子节点的名称。假设我们希望给每个用户读写他们自己的`/users/`的位置，我们可以使用：

```
{
  "rules": {
    "users": {
      "$user": {
        ".read": "auth.uid == $user",
        ".write": "auth.uid == $user"
      }
    }
  }
}

```

当一个用户试图访问`/users/barney`，位置变量$user将匹配到`"barney"`。所以.read 规则将判断 `auth.uid == 'barney'`。

------

### now

定义

包含一个在 Wilddog 服务器的 Unix 时间毫秒数。

说明

包含一个在 Wilddog 服务器的 Unix 时间毫秒数。例如:

```
{
  "rules": {
    "users": {
      "$user": {
        "created": {
          ".validate": "newData.val() < now"
        }
      }
    }
  }
}

```

------

### root

定义

你的Wilddog数据库中的根节点的数据快照`RuleDataSnapshot`

说明

root变量标识的`RuleDataSnapshot`，对应着你的Wilddog数据库根节点。你能够在读任何数据的时候在表达式中使用它。例如：你想允许用户仅在 `/users//active`设置为true的时候读取 `/comments`。我们这样使用：

```
{
  "rules": {
    "comments": {
      ".read": "root.child('users').child(auth.uid).child('active').val() == true"
    }
  }
}

```

------

### newData

定义

一个数据快照`RuleDataSnapshot`对应的将要被写的数据。

说明

在.write和.validate规则中使用，newData变量允许代表一个将要被写的`RuleDataSnapshot`，也可能是一个从其他节点移过来的`RuleDataSnapshot`。下面的例子，要求每个用户必须包含name和age字段：

```
{
  "rules": {
    "users": {
      "$user": {
        ".read": true,
        ".write": true,
        ".validate": "newData.hasChildren(['name', 'age'])"
      }
    }
  }
}

```

由于newData合并包括存在的数据和新添加的数据。

```
var fredRef = new Wilddog("https://samplechat.wilddogio.com/users/fred");
// 可行
fredRef.set({ name: "Fred", age: 19 });
// 可行
fredRef.child("age").set(27);
// 因为.validate不再为真，所以不可行
fredRef.child("name").remove();
newData变量在.read规则中不可用，因为没有新数据被写入，只能用data变量。

```

------

## RuleDataSnapshot (*Methods*)

### val()

定义

String val()

说明

从 `RuleDataSnapshot`获取原生类型 (`string`, `number`, `boolean`, or `null`)。与DataSnapshot.val()不一样，`RuleDataSnapshot`调用 `val()`方法将不会返回一个`object`，就算包含子节点也这样。

返回值

String, Number, Boolean, Null RuleDataSnapshot 的原生类型数据。

示例

```
".read": "data.child('isReadable').val() == true"

```

------

### child()

定义

RuleDataSnapshot child()

说明

通过相对路径获取`RuleDataSnapshot`的子节点。

参数

- childPath `String` 子节点的相对路径。

返回值

子节点的 `RuleDataSnapshot`

示例

```
".read": "data.child('isReadable').val() == true"

```

------

### parent()

定义

RuleDataSnapshot parent()

说明

通过相对路径获取`RuleDataSnapshot`的父节点。

返回值

父节点的 `RuleDataSnapshot`.

------

### hasChild()

定义

Boolean hasChild(String childPath)

说明

判断`RuleDataSnapshot` 是否存在子节点。

参数

childPath `String` 潜在子节点的相对路径。

返回值

Boolean 存在返回`true`，否则`false`

示例

```
".validate": "newData.hasChild('name')"

```

------

### hasChildren()

定义

Boolean hasChildren([children]);

说明

判断当前节点是否存在指定一组子节点。

参数

children `Array` *optional 所有存在子节点的数组。

返回值

Boolean

pathList List 路径数组 一组子节点路径，例如['a','b','c']

示例

```
".validate": "newData.hasChildren()"

```

```
".validate": "newData.hasChildren(['name', 'age'])"

```

------

### exists()

定义

Boolean exists()

说明

判断这个`RuleDataSnapshot`是否存在，包含数据返回true。等价于`data.val() != null`

返回值

Boolean 包含返回`true`，否则返回`false`。

示例

```
".write": "!data.exists()"

```

------

### getPriority()

定义

String getPriority()

说明

获取`RuleDataSnapshot`的优先级。

返回值

String, Number, Null

示例

```
".validate": "newData.getPriority() != null"

```

------

### isNumber()

定义

Boolean isNumber()

说明

判断获取`RuleDataSnapshot`的是否是数字类型。

返回值

Boolean 是数字为`true` 否则返回 `false`.

示例

```
".validate": "newData.child('age').isNumber()"

```

------

### isString()

定义

Boolean isString()

说明

判断获取`RuleDataSnapshot`的是否是字符串类型。

返回值

Boolean 是字符串为`true` 否则返回 `false`.

示例

```
".validate": "newData.child('name').isString()

```

------

### isBoolean()

定义

Boolean isBoolean()

说明

判断获取`RuleDataSnapshot`的是否是布尔类型。

返回值

Boolean 是布尔为`true` 否则返回 `false`.

示例

```
".validate": "newData.child('active').isBoolean()"

```

------

## String (*Methods*)

### length()

定义

字符串的长度。

说明

返回字符串的长度。

返回值

Number

示例

```
".validate": "newData.isString() && newData.val().length() >= 10"

```

------

### contains()

定义

Boolean contains(String substring)

说明

判断字符串是否包含指定的子串。

参数

- substring `String` 指定的子串。

返回值

Boolean

示例

```
".validate": "newData.isString() && newData.val().contains('@')"

```

------

### startsWith()

定义

Boolean startsWith(String substring)

说明

以一个子串开头。

参数

- substring `String`

返回值

Boolean

示例

```
{
  "rules": {
    "$conversation":{
      "$users": {
        ".read": "$users.startsWith('zhangsan')",
        ".write": "$users.startsWith('zhangsan')"
      }
    }
  }
}
```
------

### endsWith()

定义

Boolean endsWith(String substring)

说明

以一个子串开头结尾。

参数

- substring `String`

返回值

Boolean

示例

```
{
  "rules": {
    "$conversation":{
      "$users": {
        ".read": "$users.endsWith('zhangsan')",
        ".write": "$users.endsWith('zhangsan')"
      }
    }
  }
}
```
------

### replace()

定义

String replace(String substring, String replacement)

说明

我们的replace()方法与JavaScript中的replace()方法稍微有些不同。我们的replace是用replacement替换掉所有的substring，而JavaScript中只是替换掉第一个。因为key中不能包含句号“.”,我们应该对特殊字符进行escape编码后，才能存储它们。

参数

- substring `String` 查找的子字符串。
- replacement `String` 替换的子字符串。

返回值

String 返回替换后的新字符串。

示例

假设我们在`/whitelist/` 节点有一个email白名单列表：

```
{
 "user": {
   "$uid": {
     "email": <email>
   }
 },
 "whitelist": {
   "fred@gmail%2ecom": true,
   "barney@aol%2ecom": true
 }
}

```

我们可以如下制定rule规则，只允许email在白名单中的用户。

```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "true",
        ".write": "root.child('whitelist').child(newData.child('email').val().replace('.', '%2e')).exists()"
      }
    }
  }
}

```

------

### toLowerCase()

定义

String toLowerCase()

说明

返回小写的字符串

返回值

小写字符串。

示例

------

### toUpperCase()

定义

String toUpperCase()

说明

返回大写的字符串。

返回值

`string` 大写的字符串。

示例

------

### matches()

定义

Boolean matches(String regex)

说明

可以利用正则表达式校验客户端提供的字符串。用string.matches(pattern)来验证指定字符串是否符合规则表达式。我们的正则表达式的语法与传统规则表达式不完全一致：

`+` `*` `.` `( )` `[ ]` `{ }` `\` 与传统语法一致

`^` and `$`只被用来匹配首尾

只支持 `i` (忽略大小写) 修饰符

正则表达式以/pattern/的形式被引入规则表达式。被用来检验一个字符串是否符合正则表达式。下面的校验规则用来检验新的字符串是否以'foo'开头。

```
".validate": 'newData.val().matches("^foo")'

```

下面是 Wilddog 所支持的正则符号：

| 字符                | 描述                                       |
| ----------------- | ---------------------------------------- |
| \s \w \d \S \W \D | 匹配任何空白字符，包括空格、制表符、换页符；匹配任何字类字符；数字字符匹配；匹配任何非空白字符；与任何非单词字符匹配；非数字字符匹配。 |
| \                 | 将下一字符标记为特殊字符、文本、反向引用或八进制转义符              |
| ^                 | 匹配输入字符串开始的位置|
| $                 | 匹配输入字符串结尾的位置  |
| *                 | 零次或多次匹配前面的字符或子表达式 |                        
| +                 | 一次或多次匹配前面的字符或子表达式  |                       
| ?                 | 零次或一次匹配前面的字符或子表达式 |
| &#46;             | 匹配除“\n”之外的任何单个字符 |                         
| i                 | 一个以'i'结尾的正则表达式表示忽略大小写|
| (pattern)         | 匹配 pattern 并捕获该匹配的子表达式|
| a\&#124;b         | 匹配 a 或 b | 
| [akz]             | 字符集，匹配包含的任一字符。/[ABCDEF]/匹配a-f中的大写字母 |
| [a-z]             | 一个字符区间, 匹配包含在指定范围内的所有字母。/[0-9A-F]/匹配十六进制字符串 |
| [^0-9]            | 以'^'开头，匹配不在指定字符集中的字符                   |

在 Wilddog 安全规则中,正则表达式只允许你用来进行匹配而不是获取字符串。

参数

- regex `String` 正则表达式

返回值

Boolean 如果满足正则表达式返回true,否则返回false。

示例

新数据需要满足是字符串，并且字符串是1900-2099年间的YYYY-MM-DD格式。

```
".validate": "newData.isString() && newData.val().matches('^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$')"

```

校验新数据符合email格式。

```
".validate": "newData.isString() && newData.val().matches('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$')"

```

------

## Operators (*Methods*)

### +

符号

加法

定义

用作变量加法运算或字符串连接。

说明

因为Wilddog路径中keys总是string字符串，所以尝试比较 $variable和一个数字一定会失败。可以通过"+"把nubmber转化为string。

```
".write": "newData.val() == data.val() + 1"

```

```
".validate": "root.child('room_names/' + $room_id).exists()"

```

------

### -

符号

取反 或 减号

定义

取反或剪法运算。

说明

下面的校验规则用来检查新数据是否是原数据的负值。

```
".validate": "newData.val() == -(data.val())"

```

下面的校验规则用来保证只有过去十分钟之内的信息才能被读取。

```
".read": "newData.child('timestamp').val() > (now - 600000)"

```

------

### *

符号

乘法

定义

取乘积

说明

下面的校验规则用来验证新的值是否等于price和quantity的乘积。

```
".validate": "newData.val() == data.child('price').val() * data.child('quantity').val()"

```

------

### /

符号

除法

定义

取商

说明

下面的校验规则保证被存储的值是所有数值的平均值。

```
".validate": "newData.val() == data.parent().child('sum').val() / data.parent().child('numItems').val()"

```

------

### %

符号

取模

定义

取模

说明

下面的校验规则保证userId是偶数才具备写权限。

```
"$user_id": {
    ".write": "$user_id % 2 == 0"
}

```

------

### ==

符号

等于

定义

用来检验在规则表达式中两个变量是否具有相同值。

说明

下面校验规则保证用户帐户的所有者才具备写权限。

```
"users": {
  ".write": "$user_id == auth.uid"
}

```

------

### !=

符号

不等于

定义

不等于

说明

```
".read": "auth != null"

```

------

### &&

符号

与

定义

与操作

说明

下面的校验规则用来检验新数据是小于100个字符的字符串。

```
".validate": "newData.isString() && newData.val().length < 100"

```

------

### ||

符号

或

定义

或操作

说明

下面的校验规则保证我们可以删除或者创建数据，但是不能更新数据。

```
".write": "!data.exists() || !newData.exists()"

```

------

### !

符号

非

定义

非操作

说明

在规则表达式中，!常被用来查看数据是否已经被写到节点中。 下面的校验规则规定，只有在指定的节点中没有数据的时候才能写入。

```
".write": "!data.exists()"

```

------

### >

符号

大于

定义

大于

说明

下面的校验规则规定写入的数据不能为空。

```
".validate": "newData.isString() && newData.val().length > 0"

```

------

### <

符号

小于

定义

小于

说明

下面的校验规则规定数据需要是字符串并且长度小于20。

```
".validate": "newData.isString() && newData.val().length < 20"

```

------

### >=

符号

大于或等于

定义

大于或者等于

说明

下面的校验规则规定写入的数据不能为空。

```
".validate": "newData.isString() && newData.val().length >= 1"

```

------

### <=

符号

小于或等于

定义

小于或等于

说明

下面的校验规则保证新数据未来不能被添加。

```
".validate": "newData.val() <= now"

```

------

### ?

符号

三元表达式

定义

三元表达式

说明

问号前面是条件，条件成立第二个表达式被校验，条件不成立第三个表达式被校验。

下面的校验规则规定，新数据必须是一个数字或者是布尔型值，如果是数字必须大于0。

```
".validate": "newData.isNumber() ? newData.val() > 0 : newData.isBoolean()"
```

