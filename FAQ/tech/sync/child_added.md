title: 使用child_added在第一次加载的时候总是会获取该节点下的所有数据，怎样才能每次只获得最新添加的一条数据呢？
tag: 实时数据同步
---
野狗的`child_added`方法在第一次执行的时候会获取该节点下所有节点的数据，如果想在第一次执行就想只获得第一条数据的话，需要排序方法（Web中是`orderBy*`）和获取指定条数的方法（Web中是`limitTo*`）方法结合使用。

Web端代码示例（代码仅供参考）：

```js
//实例化
    var config = {
        syncURL:"https://<appId>.wilddogio.com"
    };
    wilddog.initializeApp(config);

    var ref = wilddog.sync().ref("/");

    ref.limitToLast(1).on('child_added', function(data) {
        console.log("The Last One Data is",data.val());

    });

```
