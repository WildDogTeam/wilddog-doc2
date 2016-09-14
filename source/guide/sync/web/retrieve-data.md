title:  查询数据
---
本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和过滤。

查询数据前确保 SDK 已初始化：
```js
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
```
## 设置监听


数据的查询以事件监听的方式来完成。事件监听可以让你客户端的数据一直保持与云端同步。你可以设置两种类型的事件监听，“Value 事件” 和 “Child 事件”：

监听器 | 事件     | 描述
--- | ----- | ---
on() 或 once() | value | 当程序初始化时或有任何数据发生变化时触发
| child_added    | 当程序初始化时或有新增子节点时触发
| child_changed     | 当某个子节点发生变化时触发
| child_removed	    | 当有子节点被删除时触发
| child_moved     | 当有子节点排序发生变化时触发

使用 `value` 事件监听当前路径下的所有数据。使用 `child_added_*` 事件监听当前路径下的子节点数据。

### Value 事件 

使用 `value` 事件来接收查询到的数据。此方法在第一次设置监听时会触发一次，并在数据发生任何更改时再次触发。如果这个节点没有数据，则会返回 null。

以下示例演示了如何查询 gracehop 的个人信息：

```js
var ref = wilddog.sync().ref("/web/saving-data/wildblog/users/gracehop");

ref.on('value', function(snapshot, error) {
  if (error == null) {
    var newPost = snapshot.val();
    console.log("date_of_birth: " + newPost.date_of_birth);
    console.log("full_name: " + newPost.full_name);
    console.log("nickname: " + newPost.nickname);
  } else {
    console.log(error);
  }
});
```
回调方法接收到一个 `snapshot` 对象，其中包含了事件触发时指定节点的数据。调用 `val()` 方法来获取 snapshot 中的数据。如果数据为空，则返回 null。

本示例中，回调方法中的 `error` 参数是可选的。如果查询数据失败，可以通过 这个 `error` 对象获取错误信息。

**注意**：每当指定路径下的数据（包括更深层节点数据）有改变时，都会触发 Value 事件。所以，为了聚焦你只关心的数据，你应该把要监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。


关于更详细的用法说明，请参考 [API 文档](/api/sync/web/api.html)。

### Child 事件

当某个节点的子节点发生改变时（如通过 `push()` 方法添加子节点，或通过 `update()` 更新子节点），就会触发 `child 事件`。

`child_added` 事件常用来获取当前路径下的子节点列表。初始化时会针对每个子节点触发一次以获取所有子节点，之后每当增加子节点时就会再次触发获取新增的子节点。

对子节点修改时会触发 `child_changed` 事件，这个修改包括对子节点里更深层的节点所做的修改。

删除直接子节点时，将会触发 `child_removed` 事件。

当节点下的数据顺序发生变化时，系统就会触发 `child_moved` 事件。默认的数据顺序按 priority 属性排列，如果没有指定 priority ，子节点按照 key 值排序。要改变数据的排列规则，可以调用 `orderBy*()` 方法。

例如：[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过设置 Child 事件来监听博客的状态变化：

```js
var postsRef = wilddog.sync().ref("/web/saving-data/wildblog/posts");

postsRef.on('child_added', function(data) {
  console.log(data.val().author + " 发布了一篇名为《" + data.val().title + "》的博客");
});

postsRef.on('child_changed', function(data) {
  console.log(data.val().author + " 更新博客标题为《" + data.val().title + "》");
});

postsRef.on('child_removed', function(data) {
  console.log( "博客《" + data.val().title + "》被删除");
});
```

## 移除监听

通过`off()`方法可以移除一个监听事件，参数为你具体要移除的事件回调：

```js
ref.off("value", originalCallback);
```
如果在不带任何参数的情况下在该节点位置调用 `off()`，则将移除该节点位置的所有监听。

在父节点上调用 `off()` 时不会移除在其子节点上注册的监听。

## 单次查询

在某些场景下，只需要事件的回调方法被触发一次，然后立即取消监听。可以使用 `once()` 方法：
```js
ref.once("value", function(data) {
  // 执行业务处理，此回调方法只会被调用一次
})
```

## 数据排序

### 排序方法

你可以使用 [Query](/api/sync/web.html#Query-Methods) 类的方法进行数据排序。Wilddog Sync 支持按 Key、按 Value、按子节点的 Value 或按 priority 对数据进行排序。

方法 | 用法
----  | ----
orderByChild() | 按指定子节点的值对结果排序。
orderByKey() | 按键（key）对结果排序。
orderByValue() | 按值对结果排序。
orderByPriority() | 按优先级对结果排序。

例如：[恐龙应用数据页面](https://dinosaur-facts.wilddogio.com) 中演示如何按照每个恐龙的身高（"height"节点的值）进行排序。

```js
var ref = wilddog.sync().ref("dinosaurs");
  
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});
```
**注意**：

- 排序对计算机性能开销大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/api/sync/rule.html#indexOn) 规则，在服务器上添加索引以提高查询性能。详细操作请参考 [添加索引](/guide/sync/rules/guide.html#数据索引)。

- 每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。

### 排序规则

**orderByChild**

使用 `orderByChild()`，按照以下规则进行升序排列：

1. 子节点的指定 key 对应的值为 `null` 排在最前面。
2. 子节点的指定 key 对应的值为 `false` 次之。如果有多个值为 `false`，则按子节点的 key 以 [字典序](http://baike.baidu.com/view/4670107.htm) 进行升序排列。
3. 子节点的指定 key 对应的值为 `true` 次之。如果有多个值为 `true`，则按子节点的 key 以字典序进行升序排列。
4. 子节点的指定 key 对应的值为 `number` 次之。如果有多个 `number` 相等，则按子节点的 key 以字典序进行升序排列。
5. 子节点的指定 key 对应的值为 `String` 次之。如果有多个 `String` 相等，则按子节点的 key 以字典序进行升序排列。
6. 子节点的指定 key 对应的值为 `Objects` 次之。如果有多个 `Objects` 相等，则按子节点的 key 以字典序进行升序排列。

**orderByKey**

当使用 orderByKey() 对数据进行排序时，系统会按 key 以字典序进行升序排列。

**orderByValue**

当使用`orderByValue()`时，按照子节点的值进行排序。排序规则和 `orderByChild` 一样，唯一不同的是将子节点指定的 key 改为子节点的值。

## 数据过滤

只有对数据进行排序之后，才能过滤数据，你可以结合以下方法来构造查找的条件。

方法 | 用法
---- | ----
limitToFirst() | 设置从第一条开始，一共返回多少个节点。
limitToLast() | 设置从最后一条开始，一共返回多少个节点（返回结果仍是升序，降序要自己处理）。
startAt() | 返回大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
endAt() | 返回小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。
equalTo() | 返回等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。

你可以结合不同的方法来过滤节点。例如，你可以结合使用 `startAt()` 与 `endAt()` 方法将结果限制在指定的范围内。

**限制返回节点数量**

使用 `limitToFirst()` 和 `limitToLast()` 方法限制返回节点的最大数量。 例如，使用 `limitToFirst(100)` 过滤数据，那么第一次返回节点数最多为 100。
当数据发生更改时，对于进入到前 100 的数据，你会接收到 `child_added` 事件，对于从前 100 中消失的数据，你会接收到 `child_moved` 事件，也就是说只有这 100 条里的数据变化才会触发事件。

继续上面示例，如果你只想知道最高的是哪三条恐龙，就可以这样写：

```js
ref.orderByChild("height").limitToLast(3).on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});
```
或者你只关心哪些 [恐龙](https://dinosaur-facts.wilddogio.com/scores) 的得分超过 60 了：

```js
var config = {
  authDomain: "dinosaur-facts.wilddog.com",
  syncURL: "https://dinosaur-facts.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref("scores");
  
ref.orderByValue().startAt(60).on("child_added", function(snapshot) {
  console.log(snapshot.key() + " is " + snapshot.val());
});
```
如上例所示，使用 `startAt()`、`endAt()` 和 `equalTo()` 为查询选择任意起点、终点或等量点。这可以用于`数据分页`和`精确查询`。

关于分页的具体实现，请参考 [如何实现分页](https://coding.net/u/wilddog/p/wilddog-gist-js/git/tree/master/src/pagination)。

