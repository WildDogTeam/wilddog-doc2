title: 数据校验
---

本篇文档介绍使用规则表达式校验数据的合法性，只允许写入符合规则的数据。


## 设置校验规则

`.validate` 规则类型用于设置允许写入的数据格式和数据类型。

例如，限制写入 `/foo` 的数据必须是字符串类型且长度小于100：

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
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  	<ul>
	  <li>任何一个子节点的 `.validate` 规则校验失败，整个写操作都将失败；</li>
	  <li>当删除节点时，`.validate` 表达式会被忽略。</li>
	</ul>
</blockquote>  

## data 和 newData 

内置对象 `data` 用于获取数据操作前的原始数据。`newData` 用于获取数据操作之后的新数据。

例如，设置在指定节点下，不可以修改数据：

``` js
// 可以写入数据或删除数据，但不能修改已有数据。
".validate": "!data.exists() || !newData.exists()"
```

## 定位到任一节点 

内置变量 `root`，`data` 和 `newData` 的 `parent()` 和 `child()`方法用于定位到任一节点。

例如，电影评分超过 8 分，且电影已上映 ，那么可以收藏这部电影：
```js
{
  ".validate": "root.child('movie').val().exists() &&
                data.parent().child('score').val() > 8 &&
                newData.parent.child('isShow').val() === true "
}
```




## 正则表达式校验数据

`matches()` 方法用于规则表达式正则校验。

例如，限制写入的数据是字符串，并且字符串是 1900-2099 年间的 YYYY-MM-DD 格式：

```js

 ".validate": "newData.isString() &&  newData.val().matches(/^(19|20)[0-9][0-9][-\\/. ](0[1-9]|1[012])[-\\/. ](0[1-9]|[12][0-9]|3[01])$/)"
```

关于正则表达式校验的更多内容，请参考 [API 文档](/sync/C/rules/ruleapi.html#matches)。



