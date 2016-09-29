
title:  数据操作
---

本篇文档介绍如何进行数据操作，分为写入，更新和删除数据。

数据操作包含以下七种方法：

| 方法                | 说明                                       |
| ----------------- | ---------------------------------------- |
| set()             | 向指定 [节点](/guide/reference/term.html#节点) 写入数据。若此节点已存在数据，会覆盖原有数据。 |
| setPriority()     | 设置节点优先级。                                 |
| setWithPriority() | 向指定节点写入数据并且设置该节点优先级。                     |
| push()            | 向指定节点添加 [子节点](/guide/reference/term.html#子节点)。子节点的 [key](/guide/reference/term.html#key) 由 Wilddog Sync 自动生成并保证唯一。 |
| remove()          | 删除指定节点。                                  |
| update()          | 更新指定子节点。                                 |
| transaction()     | 并发操作时保证数据一致性。                            |



## 写入数据

`set() ` 方法用于向指定节点写入数据。此方法会先清空指定节点，再写入数据。

`set() ` 方法可设置回调方法来获取操作的结果。

例如，向 `Jobs` 节点下写入 `full_name ` 和 `gender`：

```js
// 初始化
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("/web/saving-data/wildblog/users");

// child() 用来定位到某个节点。
ref.child("Jobs").set({
    "full_name": "Steve Jobs",
    "gender": "male"
});
```
设置回调方法：
```js
ref.child("Jobs").set({
    "full_name": "Steve Jobs",
    "gender": "male"
}, function(error) {
    if (error == null){
        // 数据同步到野狗云端成功完成
    }
});
```



## 设置节点优先级

`setPriority(priority)` 方法用于设置节点的优先级。

Wilddog Sync 支持为每个节点设置优先级(priority)，用于实现节点按 [优先级排序](/guide/sync/web/retrieve-data.html#根据数据排序监听)。优先级是节点的隐藏属性，默认为 null。

例如，设置`user`节点的优先级为100：

```javascript
wilddog.sync().ref('user').setWithPriority(100)
    .then(function(){
        console.info('set priority success.')
    })
    .catch(function(err){
        console.info('set priority failed', err.code, err);
    });
```

更多使用，请参考 [setPriority()](/api/sync/web/api.html#setPriority)。



## 写入数据并设置节点优先级

`setWithPriority(value, priority)`方法用于指定节点写入数据并且设置该节点优先级。

例如，存入 `jack` 姓名并且设置优先级为100：

```javascript
var user = {
  name: {
    first: 'jack',
    last: 'Lee'
  }
};
wilddog.sync().ref().setWithPriority(user,100)
    .then(function(){
        console.info('set data success.')
    })
    .catch(function(err){
        console.info('set data failed', err.code, err);
    });
```

更多使用，请参考 [setWithPriority()](/api/sync/web/api.html#setWithPriority)。



## 追加子节点

`push()` 方法用于指定节点添加子节点。新增子节点的 key 由 Wilddog Sync 自动生成并保证唯一。 新增子节点的 key 基于时间戳和随机算法生成，并可以按照添加时间进行排序。

例如，追加子节点到 `messages` 节点：

```js
  var postsRef = ref.child("messages");

  postsRef.push({
    "full_name" : "Steve Jobs",
   	 "message" : "Think difference"
  });

  postsRef.push({
    "full_name" : "Bill Gates",
    "message" : "Hello World"
  });
```

产生的数据如下：

```json
{

  "messages": {
    "-JRHTHaIs-jNPLXO": {
    	"full_name" : "Steve Jobs",
   	 	"message" : "Think difference"
  	},

    "-JRHTHaKuITFIhnj": {
   		"full_name" : "Bill Gates",
    	"message" : "Hello World"
  	}
  }
}
```

## 更新数据

`update()` 方法用于更新指定子节点。

`update()` 方法支持多路径更新。可以只调用一次方法更新多个[路径](/guide/reference/term.html#路径-path)的数据。

例如，更新 `Jobs`的个人信息：

```js
//原数据如下
{
    "Jobs": {
        "full_name" : "Steve Jobs",
        "gender" : "male"
    }
}
```
```js
// 只更新 Jobs 的 full_name
var hopperRef = ref.child("Jobs");
hopperRef.update({
  "full_name": "Tim Cook"
});
```

**多路径更新**

例如，同时更新 b 节点下的 d 和 x 节点下的 z：

```js
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}
```
正确示例：

```js
ref.update({
  "b/d": "updateD",
  "x/z": "updateZ"
});
```

错误示例：

```js
// 错误的多路径更新写法，会覆盖原有数据
ref.update({
    "b": {
        "d": "updateD"
    },
    "x": {
        "z": "updateZ"
    }
});
```

## 删除数据

`remove()` 方法用于删除指定节点。

例如，删除写入的数据：

```javascript
ref.set({
    "full_name" : "Steve Jobs",
    "gender" : "male"
});

//删除上面写入的数据
ref.remove();
```

>**提示：**设置节点的 value 为 null 等同于 `remove()` 方法。

## 事务处理

`transaction()` 方法用于并发操作时保证数据一致性。

例如，在实现多人点赞功能时，多人同时写入评分会产生冲突，导致最终结果不准确。使用 `transaction()`方法可以避免这种情况：

```js
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
var upvotesRef = wilddog.sync().ref("/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.transaction(function (currentValue) {
  return (currentValue || 0) + 1;   // 判断计数器是否为空或者是自增加
});
```

>**注意：**回调方法的返回值可能为空，需要进行相应的处理。

更多使用，请参考 [transaction()](/api/sync/web/api.html#transaction)。



