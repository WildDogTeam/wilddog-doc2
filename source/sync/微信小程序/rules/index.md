title: 数据索引

---

本篇文档介绍如何在规则表达式中使用 `.indexOn` 规则为节点建立索引，提高查询效率。

规则表达式包含以下两种 `.indexOn` 的索引方式：

索引方式 | 说明
------- | ------
orderByChild | 根据子节点索引
orderByValue | 根据值索引

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 节点的名称 (key) 和优先级 (priority) 已默认建立索引，不需要额外设置。
 </blockquote>


## orderByChild 索引

为子节点建立索引，可以提高 `orderByChild` 的查询效率。

例如，在下面学生的信息中，可以根据姓名、年龄、分数进行排序，数据结构如下：

```javascript
{
  "students": {
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
}
```


通过 `.indexOn` 规则，为这些节点建立索引：

```javascript
{
  "rules": {
    "students": {
      ".indexOn": ["age", "score"]
    }
  }
}
```

## orderByValue 索引

为节点的值建立索引，可以提高 `orderByValue` 的查询效率。

例如，为学生分数建立一个排行榜，数据结构如下：

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

通过 `.indexOn` 规则，为这些节点建立索引。

```javascript
{
  "rules": {
    "scores": {
      ".indexOn": ".value"
    }
  }
}
```

