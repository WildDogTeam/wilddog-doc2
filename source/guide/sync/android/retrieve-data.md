
title: 事件监听
---
Wilddog Sync 采用本地处理、云端同步的通信技术架构。事件监听是该架构的核心机制：通过监听云端事件，本地获取并处理数据，保持和云端实时同步。


## 事件

数据在云端发生的任何变化都称为事件。

事件包含以下五种：

| 事件类型             | 说明                    |
| ---------------- | --------------------- |
| onChildAdded()   | 初始化监听或有新增子节点。|
| onChildChanged() | 子节点数据发生更改。|
| onChildRemoved() | 子节点被删除。|
| onChildMoved()   | 子节点排序发生变化。|
| onDataChange()   | 初始化监听或向指定节点及子节点数据发生变化。|

## 监听事件

通过 Wilddog Sync 提供的方法，监听云端的事件，获取并处理变化的数据，保持和云端实时同步。

### 设置监听

`onDataChange()` 方法用于与事件配合来监听指定节点的数据。

例如，通过 `onDataChange()` 事件监听 `Jobs` 节点下的数据：

```java
ValueEventListener postListener = new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        String fullName = (String) snapshot.child("full_name").getValue();
        String gender = (String) snapshot.child("gender").getValue();
        System.out.println(fullName + " 性别为" + gender);
        // ...
    }

    @Override
    public void onCancelled(SyncError syncError) {
        // 获取数据失败，打印错误信息。
        Log.w(TAG, "loadPost:onCancelled", syncError.toString());
        // ...
    }
};
SyncReference postReference = mSyncRef.child("/web/saving-data/wildblog/users/Jobs");
mPostReference.addValueEventListener(postListener);
```

之后 Jobs 节点下的数据发生任何变化，都会触发回调方法。

例如，[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过 Child 事件来监听博客的状态变化：

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

    public void onCancelled(SyncError error) {
    }

});
```

更详细的用法说明，请参考 [API 文档](/api/sync/android/api.html#Query-Methods)。

>**提示：** 如果你只想监听一次数据，可使用`addListenerForSingleValueEvent()`方法。该监听的回调方法只被触发一次，之后会自动取消监听。

### 移除监听

`removeEventListener()`方法用于移除一个监听事件，移除监听之后，回调方法将不再被触发。

参数为移除的事件类型和回调方法：

```java
// 获取 SyncReference 实例
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/posts");
// 移除监听
ref.removeEventListener(listener);
```

>**注意：**在父节点上调用 `removeEventListener()` 时不会移除在其子节点上添加的监听。

## 条件监听

Wilddog Sync 支持对事件监听设置条件：数据排序或数据筛选。

### 根据数据排序监听

Wilddog Sync 支持按键(key)、按值(value)、按节点的优先级(priority) 或按指定子节点的值(value)对数据进行排序。

数据排序包含以下四种方法：

| 方法                | 说明                      |
| ----------------- | ----------------------- |
| orderByChild()    | 按指定子节点的值（value）对结果排序。   |
| orderByKey()      | 按节点的键（key）对结果排序。        |
| orderByValue()    | 按节点的值（value）对结果排序。      |
| orderByPriority() | 按节点的优先级（priority）对结果排序。 |

**orderByChild**

`orderByChild()`方法用于按子节点的指定值（value）对结果排序。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中按照每个学生的身高（"height" 节点的值）进行排序：

```java
// 初始化
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://class-demo.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("students");
Query queryRef = ref.orderByChild("height");

queryRef.addChildEventListener(new ChildEventListener() {
    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " centimeters tall");
    }
    public void onCancelled(SyncError arg0) {
    }
    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }
    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }
    public void onChildRemoved(DataSnapshot arg0) {
    }
});
```

**orderByKey()**

`orderByKey()`方法用于按节点的键（key）对结果排序。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中按照学生的名称进行排序：

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://class-demo.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("students");
Query queryRef = ref.orderByKey();

queryRef.addChildEventListener(new ChildEventListener() {
    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey());
    }
    public void onCancelled(SyncError arg0) {
    }
    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }
    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }
    public void onChildRemoved(DataSnapshot arg0) {
    }
});
```

**orderByValue()**

`orderByValue()`方法用于按节点的值（value）对结果排序。

例如，在 [得分示例应用](https://class-demo.wilddogio.com/scores) 中按照得分数据进行排序：

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://class-demo.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("scores");
Query queryRef = ref.orderByValue();

queryRef.addChildEventListener(new ChildEventListener() {
    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println("The " + snapshot.getKey() + " student's score is " + snapshot.getValue());
    }
    public void onCancelled(SyncError arg0) {
    }
    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }
    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }
    public void onChildRemoved(DataSnapshot arg0) {
    }
});
```



**orderByPriority()**

`orderByPriority()`方法用于按节点的优先级（priority）对结果排序。


>**注意：**
- 每次只能使用一种排序方法。对同一监听调用多个排序方法会引发错误。
- 排序会占用较多计算机资源。如果你的应用使用了排序，建议定义 [.indexOn](/guide/sync/rules/introduce.html#indexOn) 规则，在服务器上添加索引以提高排序效率。详细请参考 [添加索引](/guide/sync/rules/guide.html#数据索引)。


### 根据数据筛选结果监听

对数据排序之后，才能进行数据筛选。

数据筛选包含以下五种方法：

| 方法             | 用法                                       |
| -------------- | ---------------------------------------- |
| limitToFirst() | 设置从第一条开始，一共返回多少个节点。                      |
| limitToLast()  | 设置从最后一条开始，一共返回多少个节点（返回结果仍是升序，降序要自己处理）。   |
| startAt()      | 返回大于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| endAt()        | 返回小于或等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。 |
| equalTo()      | 返回等于指定的 key、value 或 priority 的节点，具体取决于所选的排序方法。可用于精确查询。 |

你可以结合不同的方法来筛选数据。例如，结合 `startAt()` 方法与 `endAt()` 方法将结果限制在指定的范围内。

**数量筛选**

`limitToFirst()`方法用于获取从第一条（或 startAt() 方法指定的位置）开始向后指定数量的子节点。

 `limitToLast()`方法用于获取从最后一条（或 endAt() 方法指定的位置）开始向前指定数量的子节点。

例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中，如果你只想知道最高的是哪三位同学：

```java
SyncReference ref = WilddogSync.getInstance().getReference("students");
Query queryRef = ref.orderByChild("height");
queryRef.limitToLast(3).addChildEventListener(new ChildEventListener() {
    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " centimeters tall ");
    }
    public void onCancelled(SyncError arg0) {
    }
    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }
    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }
    public void onChildRemoved(DataSnapshot arg0) {
    }
});
```

如果使用 `limitToFirst(100)` 筛选数据，那么第一次返回节点数最多为 100 个。当数据发生更改时，对于进入到前 100 个的节点，你会接收到 `child_added` 事件。对于从前 100 个中消失的节点，你会接收到 `child_removed` 事件。

**范围筛选**

`startAt()`方法、`endAt()`方法 和 `equalTo()` 方法用于监听选择任意起点、终点或等量点。

 例如，在 [班级示例应用](https://class-demo.wilddogio.com) 中，如果你只想知道哪些学生的考分超过 60：

```java
SyncReference ref = WilddogSync.getInstance().getReference("scores");
Query queryRef = ref.orderByValue();
queryRef.startAt(60).addChildEventListener(new ChildEventListener() {
    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String score = snapshot.getValue().toString();
        System.out.println(snapshot.getKey() + " is " + score);
    }

    public void onCancelled(SyncError arg0) {
    }
    public void onChildChanged(DataSnapshot arg0, String arg1) {
    }
    public void onChildMoved(DataSnapshot arg0, String arg1) {
    }
    public void onChildRemoved(DataSnapshot arg0) {
    }
});
```
>**注意：**范围筛选中，当节点的 value 相同时，会按照 key 进行排序。

范围筛选可用于**数据分页**和**精确查询**。关于分页的具体实现，请参考 [如何实现分页](https://coding.net/u/wilddog/p/wilddog-gist-js/git/tree/master/src/pagination)。


