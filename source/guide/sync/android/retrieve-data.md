
title:  查询数据
---
本篇文档介绍查询数据的基础知识，以及如何对数据进行排序和筛选。

Wilddog Sync 查询数据建立在事件监听基础上，在监听的回调方法中完成数据的查询。


## 事件监听

事件监听需要完成两个步骤，设置监听方法和指定事件类型。

### 设置监听方法

设置监听包含以下三个方法，根据需求任选其一。

| 方法            | 说明
| ------------- | ---------------------------------------- 
| addChildEventListener()          | 持续监听指定节点的数据变化。
| addValueEventListener()          | 持续监听指定节点的数据变化。          
| addListenerForSingleValueEvent()        | 单次监听指定节点的数据变化，用于只读取一次数据的情景。 |



### 指定事件类型

指定的事件类型分为 Value 事件和 Child 事件两大类，使用 `value` 事件监听指定节点下的所有数据变化，使用 `onChild*` 事件监听指定节点下子节点的数据变化。

事件类型包含以下五种

| 事件类型             | 说明                    |
| ---------------- | --------------------- |
| onDataChange()   | 初次监听或指定节点及子节点发生变化时触发。 |
| onChildAdded()   | 初次监听或有新增子节点时触发。       |
| onChildChanged() | 子节点发生更改时触发。           |
| onChildRemoved() | 子节点被删除时触发。            |
| onChildMoved()   | 子节点排序发生变化时触发。         |


**Value 事件**

 `value` 事件监听当前节点下的所有数据。此事件在程序初始化时会触发一次，之后在数据发生任何更改时再次触发。如果这个节点下没有数据，则会返回 null。

例如，查询 gracehop 节点下的数据


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
        Log.w(TAG, "loadPost:onCancelled", syncError.toString());
        // ...
    }
};
SyncReference postReference = mSyncRef.child("/web/saving-data/wildblog/users/gracehop");
mPostReference.addValueEventListener(postListener);
```

之后 gracehop 节点下的数据发生任何变化，都会触发回调方法。

>**注意：**每当指定节点下的数据（包括更深层节点数据）发生改变时，都会触发 Value 事件。所以，为了聚焦你关心的数据，你应该把监听的节点路径设置的更加精确。例如，尽量不要在根节点设置 Value 事件监听。

更详细的用法说明，请参考 [API 文档](/api/sync/android/api.html)。


**Child 事件**

Child 事件监听当前节点下的子节点数据。当子节点发生改变时（如通过 `push()` 方法添加子节点，或通过 `updatechildren()` 方法更新子节点），就会触发相应的 Child 事件。

- `onChildAdded()`事件在初次监听或有新增子节点时触发。

![](/images/anchild_add.jpg)

- `onChildChanged()`子节点发生更改时触发。它包含以下三种情况。

![](/images/anchild_change_1.jpg)

![](/images/anchild_change_2.jpg)

![](/images/anchange4.jpg)


- `onChildRemoved()`事件在子节点被删除时触发。 

![](/images/anchild_removed.jpg)


- `onChildMoved()`事件在节点下的数据顺序发生变化时触发。默认的数据顺序按 `priority` 属性排列，如果没有指定 `priority` ，子节点按照 `key` 排序。要改变数据的排列规则，可以调用 `orderBy*()` 方法。
  ​
  ![](/images/anchild_moved.jpg)  ​

例如，[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts ) 中，通过设置 Child 事件来监听博客的状态变化

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



### 单次监听

`addListenerForSingleValueEvent()`方法用于单次监听，该监听的回调方法只被触发一次，之后会自动取消监听。

```java
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/users/gracehop");
ref.addListenerForSingleValueEvent(new ValueEventListener(){

  public void onDataChange(DataSnapshot snapshot) {
  // 执行业务处理，此回调方法只会被调用一次,之后就取消
  }

  public void onCancelled(SyncError error) {
    if(error != null){
      System.out.println(error.getCode());
    }
  }
});
```

### 移除监听

`removeEventListener()`方法用于移除一个监听事件，移除监听之后，回调方法将不再被触发。

参数是你要移除的事件类型和回调方法

```java
// 获取 SyncReference 实例
SyncReference ref = WilddogSync.getInstance().getReference("web/saving-data/wildblog/posts");
// 移除监听
ref.removeEventListener(listener);
```

>**注意：**在父节点上调用 `removeEventListener()` 时不会移除在其子节点上添加的监听。





## 数据排序

WilddogSync 支持按键(key)、按值(value)、按节点的优先级(priority) 或按指定子节点的值(value)对数据进行排序。

数据排序包含以下四种排序方法	

| 方法                | 说明                    |
| ----------------- | --------------------- |
| orderByChild()    | 按指定子节点的值（Value）对结果排序。 |
| orderByKey()      | 按键（key）对结果排序。         |
| orderByValue()    | 按值（value）对结果排序。       |
| orderByPriority() | 按优先级（priority）对结果排序。  |



**orderByChild**

`orderByChild()`方法，可以实现按照数据节点的名称进行排序。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中按照每个恐龙的身高（"height" 节点的值）进行排序

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://dinosaur-facts.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByChild("height");
    
queryRef.addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
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

`orderByKey()`方法，可以实现按照数据节点的名称进行排序。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中按照恐龙的名称进行排序

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://dinosaur-facts.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByKey();
    
queryRef.addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
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

`orderByValue()`方法，可以按照子节点的值进行排序。

例如，在 [得分示例应用](https://dinosaur-facts.wilddogio.com/scores) 中按照得分数据进行排序

```java
WilddogOptions wilddogOptions = new WilddogOptions.Builder().setSyncUrl("https://dinosaur-facts.wilddogio.com").build();
WilddogApp.initializeApp(this,wilddogOptions);
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByValue();
    
queryRef.addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
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

`orderByPriority()`方法用于根据子节点的优先级（priority）进行排序。

首先你需要 [设置节点的优先级](/api/sync/android/api.html#setPriority) ，然后使用`orderByPriority()`方法按 [优先级排序](/api/sync/android/api.html#orderByPriority)。



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

```java
SyncReference ref = WilddogSync.getInstance().getReference("dinosaurs");

Query queryRef = ref.orderByChild("height");

queryRef.limitToLast(3).addChildEventListener(new ChildEventListener() {

    public void onChildAdded(DataSnapshot snapshot, String ref) {
        String height = snapshot.child("height").getValue().toString();
        System.out.println(snapshot.getKey() + " was " + height + " meters tall");
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

如果使用 `limitToFirst(100)` 筛选数据，那么第一次返回节点数最多为 100 个。当数据发生更改时，对于进入到前 100 个的节点，你会接收到 `onChildAdded` 事件。对于从前 100 个中消失的节点，你会接收到 `onChildRemoved` 事件。


**范围筛选**

`startAt()`方法、`endAt()`方法 和 `equalTo()` 方法为查询选择任意起点、终点或等量点。

例如，在 [恐龙示例应用](https://dinosaur-facts.wilddogio.com) 中，如果你只想知道哪些恐龙的得分超过 60 

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
>**注意：** 范围筛选中，当节点的 value 相同时，会按照 key 进行排序。

范围筛选可用于**数据分页**和**精确查询**。关于分页的具体实现，请参考 [如何实现分页](https://coding.net/u/wilddog/p/wilddog-gist-js/git/tree/master/src/pagination)。





