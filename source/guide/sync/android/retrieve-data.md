title:  查询数据
---
本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和过滤。


查询数据前确保 SDK 已初始化：

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://docs-examples.wilddogio.com").build();WilddogApp.initializeApp(this,wilddogOptions);
```

## 设置监听

数据的查询以事件监听的方式来完成。事件监听可以让你客户端的数据一直保持与云端同步。你可以设置两种类型的事件监听，“Value 事件” 和 “Child 事件”：

监听器 | 事件回调     | 描述
---- | ---- | ---
ValueEventListener | onDataChange() | 第一次设置监听或有任何数据发生变化时触发
ChildEventListener | onChildAdded()   | 第一次设置监听或有新增子节点时触发
                   | onChildChanged()  | 第一次设置监听或有新增子节点时触发
                   | onChildRemoved()	| 子节点被删除时触发
                   | onChildMoved() | 有子节排序发生变化时触发


使用 `addValueEventListener()` 或 `addListenerForSingleValueEvent()` 方法监听当前路径下的所有数据。使用 `addChildEventListener()` 方法监听当前路径下的子节点数据。

### Value 事件


使用 `onDataChange()` 方法来接收查询到的数据。此方法在第一次设置监听时会触发一次，并在数据发生任何更改时再次触发。如果这个节点没有数据，则会返回 null。

以下示例演示了如何查询 gracehop 的个人信息：

```java
ValueEventListener postListener = new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        // 获取数据，更新 UI。
        User user = dataSnapshot.getValue(User.class);
        // ...
    }

    @Override
    public void onCancelled(SyncError syncError) {
        // 获取数据失败，打印错误信息。
        Log.w(TAG, "loadPost:onCancelled", syncError.toException());
        // ...
    }
};
SyncReference postReference = mSyncRef.child("/web/saving-data/wildblog/users/gracehop");
mPostReference.addValueEventListener(postListener);
```

回调方法接收到一个 `DataSnapshot` 对象，其中包含了事件触发时指定节点的数据。调用 `getValue()` 方法来获取 snapshot 中的数据。如果数据为空，则返回 null。

本示例中，`ValueEventListener` 还定义了 `onCancelled` 方法。如果查询数据失败，会回调此方法。比如某个客户端没有权限查询指定数据，则会查询失败。可以根据 `SyncError` 对象来获取错误信息。

**注意**：每当指定路径下的数据（包括更深层节点数据）有改变时，都会触发 Value 事件。所以，为了聚焦你只关心的数据，你应该把要监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。

更多详细的用法说明参见  [API 文档](/api/sync/android.html)。

### Child 事件
当某个节点的子节点发生改变时（如通过 `push()` 方法添加子节点，或通过 `updateChildren()` 更新子节点），就会触发 `child 事件`。

`onChildAdded()` 方法常用来获取当前路径下的子节点列表。初始化时会针对每个子节点触发一次以获取所有子节点，之后每当增加子节点时就会再次触发获取新增的子节点。

对子节点修改时会触发 `onChildChanged()` 方法回调，这个修改包括对子节点里更深层的节点所做的修改。

删除直接子节点时，将会触发 `onChildRemoved()` 方法回调。

当节点下的数据顺序发生变化时，系统就会触发 `onChildMoved()` 方法回调。默认的数据顺序按 priority 属性排列，如果没有指定 priority ，子节点按照 key 值排序。要改变数据的排列规则，可以调用 `orderBy*()` 方法。

例如：[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过设置 Child 事件来监听博客的状态变化：

```java
// 获取 SyncReference 实例
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/posts");
// 设置监听
ChildEventListener listener = ref.addChildEventListener(new ChildEventListener(){    
    public void onChildAdded(DataSnapshot snapshot, String ref) {  
        String author = (String) snapshot.child("author").getValue();
        String title = (String) snapshot.child("title").getValue();
        System.out.println(author + " 发布了一篇名为《" + title + "》的博客");
    }

    public void onChildChanged(DataSnapshot snapshot, String ref) {
        String author = (String) snapshot.child("author").getValue();
        String title = (String) snapshot.child("title").getValue();
        System.out.println(author + " 更新博客标题为《" + title + "》");
    }

    public void onChildMoved(DataSnapshot snapshot, String ref) {
        String author = (String) snapshot.child("author").getValue();
        String title = (String) snapshot.child("title").getValue();
        System.out.println("博客《" + title + "》被删除");
    }

    public void onChildRemoved(DataSnapshot snapshot) {
    }
  
    public void onCancelled(WilddogError error) {
    }

});
```

## 移除监听
使用 `SyncReference` 的 `removeEventListener()` 方法可以移除一个监听事件。

在父节点上调用 `removeEventListener()` 时不会移除在其子节点上设置的监听。

```java
// 获取 SyncReference 实例
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/posts");
// 移除监听
ref.removeEventListener(listener);
```

## 单次查询
在某些场景下，只需要事件的回调被触发一次，然后立即取消监听。可以使用 `addListenerForSingleValueEvent()` 方法：
```java
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/users/gracehop");
ref.addListenerForSingleValueEvent(new ValueEventListener(){

  public void onDataChange(DataSnapshot snapshot) {
  // 执行业务处理，此回调方法只会被调用一次,之后就取消
  }

  public void onCancelled(WilddogError error) {
    if(error != null){
      System.out.println(error.getCode());
    }
  }
});
```


## 数据排序

### 排序方法
你可以使用 [Query](/api/sync/android.html#Query-Methods) 类的方法进行数据排序。Wilddog Sync 支持按 Key、按 Value、按子节点的 Value 或按 priority 对数据进行排序。

方法 | 用法
----  | ----
orderByChild() | 按指定子节点的值对结果排序。
orderByKey() | 按键(key)对结果排序。
orderByValue() | 按值对结果排序。
orderByPriority() | 按优先级对结果排序。

例如：[恐龙应用数据页面](https://dinosaur-facts.wilddogio.com) 中演示如何按照每个恐龙的身高（"height"节点的值）进行排序。
```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://dinosaur-facts.wilddogio.com").build();WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByChild("height");
    
queryRef.addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
    }

    public void onCancelled(WilddogError arg0) {
    }

    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }

    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }

    public void onChildRemoved(DataSnapshot arg0) {
    }

});
```

**注意**：

- 排序对计算机性能开销大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/api/sync/rule.html#indexOn) 规则，在服务器上添加索引以提高查询性能。详细操作参见 [添加索引](/guide/sync/rules/guide.html#数据索引)。

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
当数据发生更改时，对于进入到前 100 的数据，你会接收到 `onChildAdded` 事件，对于从前 100 中消失的数据，你会接收到 `onChildRemoved` 事件，也就是说只有这 100 条里的数据变化才会触发事件。

继续上面示例，如果你只想知道最高的是哪三条恐龙，就可以这样写：

```java
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByChild("height");

queryRef.limitToLast(3).addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
    }

    public void onCancelled(WilddogError arg0) {
    }

    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }

    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }

    public void onChildRemoved(DataSnapshot arg0) {
    }

});
```
或者你只关心哪些 [恐龙](https://dinosaur-facts.wilddogio.com/scores) 的得分超过 60 了：

```java
SyncReference ref = WilddogSync.getInstance().getReference("scores");

Query queryRef = ref.orderByValue();

queryRef.startAt(60).addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String score = snapshot.getValue().toString();
        System.out.println(snapshot.getKey() + " is " + score);
    }
    
    public void onCancelled(WilddogError arg0) {
    }

    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }

    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }

    public void onChildRemoved(DataSnapshot arg0) {
    }

});
```
如上例所示，使用 `startAt()`、`endAt()` 和 `equalTo()` 为查询选择任意起点、终点或等量点。这可以用于 `数据分页` 和 `精确查询`。

