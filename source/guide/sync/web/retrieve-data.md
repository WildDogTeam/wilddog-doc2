
title:  查询数据
---
本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和筛选。

Wilddog Sync 查询数据建立在事件监听基础上，在监听的回调方法中完成数据的查询。

## 事件监听

事件监听需要完成两个步骤，设置监听方法和指定事件类型。

### 设置监听方法

设置监听包含以下两个方法，根据需求任选其一。

| 方法     | 说明                          |
| ------ | --------------------------- |
| on()   | 持续监听指定节点的数据变化。              |
| once() | 单次监听指定节点的数据变化，用于只读取一次数据的情景。 |



### 指定事件类型

指定的事件类型分为 Value 事件和 Child 事件两大类，使用 `value` 事件监听指定节点下的所有数据变化，使用 `child_*` 事件监听指定节点下子节点的数据变化。

事件类型包含以下五种

| 事件类型          | 说明                    |
| ------------- | --------------------- |
| value         | 初次监听或指定节点及子节点发生变化时触发。 |
| child_added   | 初次监听或有新增子节点时触发。       |
| child_change  | 子节点发生更改时触发。           |
| child_removed | 子节点被删除时触发。            |
| child_moved   | 子节点排序发生变化时触发。         |



**Value 事件**

 `value` 事件监听当前节点下的所有数据。此事件在程序初始化时会触发一次，之后在数据发生任何更改时再次触发。如果这个节点下没有数据，则会返回 null。

例如，查询 gracehop 节点下的数据

```js
// 初始化
var config = {
  authDomain: "docs-examples.wilddog.com",
  syncURL: "https://docs-examples.wilddogio.com"
};
wilddog.initializeApp(config);
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
之后 gracehop 节点下的数据发生任何变化，都会触发回调方法。

>**注意：**每当指定节点下的数据（包括更深层节点数据）发生改变时，都会触发 Value 事件。所以，为了聚焦你关心的数据，你应该把监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。

更详细的用法说明，请参考 [API 文档](/api/sync/web/api.html#on)。

**Child 事件**

Child 事件监听当前节点下的子节点数据。当子节点发生改变时（如通过 `push()` 方法添加子节点，或通过 `update()` 方法更新子节点），就会触发相应的 Child 事件。

- `child_added`事件在初次监听或有新增子节点时触发。

![](/images/child_add.jpg)


- `child_changed`子节点发生更改时触发。它包含以下三种情况。


![](/images/child_change_1.jpg)

![](/images/child_change_2.jpg)

![](/images/change4.jpg)

- `child_removed`事件在子节点被删除时触发。 

![](/images/child_removed.jpg)

- `child_moved`事件子节点排序发生变化时触发。 。默认的数据顺序按 `priority` 属性排列，如果没有指定 `priority` ，子节点按照 `key` 排序。要改变数据的排列规则，可以调用 `orderBy*()` 方法。

![](/images/child_moved.jpg)
  ​

例如，[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过设置 Child 事件来监听博客的状态变化

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



### 单次监听

`once()`方法用于单次监听，该监听的回调方法只被触发一次，之后会自动取消监听。

```js
ref.once("value", function(snapshot) {
  // 执行业务处理，此回调方法只会被触发一次
})
```

### 移除监听

`off()`方法用于移除一个监听事件，移除监听之后，回调方法将不再被触发。

参数是你要移除的事件类型和回调方法

```js
ref.off("value", originalCallback);
```
在不带任何参数的情况下，在该节点调用 `off()`，将移除该节点位置的所有监听。

```js
ref.off();
```

>**注意：**在父节点上调用 `off()` 方法时不会移除在其子节点上添加的监听。



## 数据排序

Wilddog Sync 支持按键(key)、按值(value)、按节点的优先级(priority) 或按指定子节点的值(value)对数据进行排序。

数据排序包含以下四种排序方法	

| 方法                | 说明                    |
| ----------------- | --------------------- |
| orderByChild()    | 按指定子节点的值（value）对结果排序。 |
| orderByKey()      | 按键（key）对结果排序。         |
| orderByValue()    | 按值（value）对结果排序。       |
| orderByPriority() | 按优先级（priority）对结果排序。  |



**orderByChild**

`orderByChild()`方法，可以实现按照数据节点的名称进行排序。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中按照每个恐龙的身高（"height" 节点的值）进行排序

```js
// 初始化
var config = {
  authDomain: "dinosaur-facts.wilddog.com",
  syncURL: "https://dinosaur-facts.wilddogio.com"
};
wilddog.initializeApp(config);
// 使用 orderByChild 进行排序
var ref = wilddog.sync().ref("dinosaurs");
ref.orderByChild("height").on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
});
```

**orderByKey()**

`orderByKey()`方法，可以实现按照数据节点的名称进行排序。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中按照恐龙的名称进行排序

```js
var ref = wilddog.sync().ref("dinosaurs");
ref.orderByKey().on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
```

**orderByValue()**

`orderByValue()`方法，可以按照子节点的值进行排序。

例如，在 [得分示例应用](https://dinosaur-facts.wilddogio.com/scores) 中按照得分数据进行排序

```js
var ref = wilddog.sync().ref("scores");
ref.orderByValue().on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });
});
```



**orderByPriority()**

`orderByPriority()`方法用于根据子节点的优先级（priority）进行排序。

首先你需要 [设置节点的优先级](/api/sync/web/api.html#setPriority) ，然后使用`orderByPriority()`方法按 [优先级排序](/api/sync/web/api.html#orderByPriority)。



>**注意：**
- 排序对计算机性能开销大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/api/sync/rule.html#indexOn) 规则，在服务器上添加索引以提高查询性能。详细操作请参考 [添加索引](/guide/sync/rules/guide.html#数据索引)。
- 每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。




## 数据筛选

对数据排序之后，才能进行数据筛选。

数据筛选包含以下五种方法

| 方法             | 用法                                       |
| -------------- | ---------------------------------------- |
| limitToFirst() | 设置从第一条开始，一共返回多少个节点。                      |
| limitToLast()  | 设置从最后一条开始，一共返回多少个节点（返回结果仍是升序，降序要自己处理）。   |
| startAt()      | 返回大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| endAt()        | 返回小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| equalTo()      | 返回等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。 |

你可以结合不同的方法来筛选数据。例如，结合 `startAt()` 方法与 `endAt()` 方法将结果限制在指定的范围内。

**数量筛选**

`limitToFirst()`方法获取从第一条（或 startAt() 方法指定的位置）开始向后指定数量的子节点。 

 `limitToLast()` 方法获取从最后一条（或 endAt() 方法指定的位置）开始向前指定数量的子节点。 

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中，如果你只想知道最高的是哪三条恐龙

```js
var config = {
  authDomain: "dinosaur-facts.wilddog.com",
  syncURL: "https://dinosaur-facts.wilddogio.com"
};
wilddog.initializeApp(config);

var ref = wilddog.sync().ref("dinosaurs");
ref.orderByChild("height").limitToLast(3).on("child_added", function(snapshot) {
  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
  
});
```

如果使用 `limitToFirst(100)` 筛选数据，那么第一次返回节点数最多为 100 个。当数据发生更改时，对于进入到前 100 个的节点，你会接收到 `child_added` 事件。对于从前 100 个中消失的节点，你会接收到 `child_removed` 事件。

**范围筛选**

`startAt()`方法、`endAt()`方法 和 `equalTo()` 方法为查询选择任意起点、终点或等量点。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中，如果你只想知道哪些恐龙的得分超过 60 

```js
var ref = wilddog.sync().ref("scores");
ref.orderByValue().startAt(60).on("child_added", function(snapshot) {
  console.log(snapshot.key() + " is " + snapshot.val());
});
```
>**注意：**范围筛选中，当节点的 value 相同时，会按照 key 进行排序。

范围筛选可用于**数据分页**和**精确查询**。关于分页的具体实现，请参考 [如何实现分页](https://coding.net/u/wilddog/p/wilddog-gist-js/git/tree/master/src/pagination)。

