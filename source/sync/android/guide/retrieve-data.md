title:  读取和查询数据
---
本部分将介绍如何读取数据以及如何对数据进行排序和查询。
需要先提到的一点是，WilddogSync SDK 的数据读取都是建立在添加监听的基础上，然后在监听的回调函数中完成对数据的读取。

## 监听的事件类型

监听在数据初始化时会触发一次，并在满足特定特定条件时会再次触发。一共有以下几种事件类型：

监听器 | 事件     | 描述
---- | ---- | ---
ValueEventListener | onDataChange() | 当程序初始化时或有任何数据发生变化时触发
ChildEventListener | onChildAdded()   | 当程序初始化时或有新增子节点时触发
                   | onChildChanged()  | 当程序初始化时或有新增子节点时触发
                   | onChildRemoved()	| 当有子节点被删除时触发
                   | onChildMoved() | 当有子节排序发生变化时触发

如果是监听当前路径下的所有数据，请使用 `addValueEventListener()` 或 `addListenerForSingleValueEvent()` 方法。若是要监听当前路径下的子节点数据，请使用 `addChildEventListener()` 方法。

#### onDataChange() 事件 

使用 `onDataChange()` 事件来读取当前节点下的所有数据的静态快照。
此方法在初始化时会触发一次，此后每当有数据变化都会被再次触发。初始化时，如果没有任何数据，则会返回 null。
数据（包括子节点）的快照会以事件回调形式返回。

**注意**：每当指定路径下的数据（包括更深层节点数据）有改变时，都会触发 value 事件。所以，为了聚焦你只关心的数据并降低快照的大小，你应该把要监听的节点路径设置的更加精确。
例如，如果不是必要，尽量不要在根路径设置 onDataChange() 监听。

下面的例子演示了获取[示例应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop)中 gracehop 的个人信息。

```java
WilddogSync ref = new WilddogSync("https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop");

ref.addValueEventListener(new ValueEventListener(){

     public void onDataChange(DataSnapshot snapshot) {
         // 获取数据
         System.out.println(snapshot.getValue());
     }

     // 当listener在服务端失败，或者被删除的时候调用该方法。
     public void onCancelled(WilddogError error) {
         if(error != null){
             System.out.println(error.getCode());
         }
     }
});

// 控制台输出：
// {full_name=Grace Hopper, date_of_birth=December 9, 1906, nickname=Amazing Grace}
```
回调的数据快照 `snapshot` 对象会包含指定路径下的数据。使用 `getValue()` 方法来获取 `snapshot` 中的数据。
`snapshot` 里封装了一些常用的方法，帮助你更方便的处理数据，将常用的列举如下：

方法     | 说明
-------- | ---
getValue() | 返回当前快照的数据。
getChildren()    | 返回当前快照中，所有子节点的迭代器。可做遍历用。
getChildrenCount()    | 返回当前节点中子节点的个数。
exists()     | 如果 snapshot 对象包含数据返回 true，否则返回false。
hasChild()     | 检查是否存在特定子节点。

更多更详细的用法说明参见 [API](/sync/android/api.html) 文档。

#### child 事件
当某个节点的子节点发生改变时（如通过 `push()` 方法添加子节点，或通过 `updateChildren()` 更新子节点），就会触发 `child 事件`。
对于监听对数据库中某个特定节点的子节点所做的各种变动，结合使用上述每一种方法就显得非常有用。

`onChildAdded()` 事件常用来获取当前路径下的子节点列表。初始化时会针对每个子节点触发一次以获取所有子节点，之后每当增加子节点时就会再次触发获取新增的子节点。

对子节点修改时会触发 `onChildChanged()` 事件，这个修改包括对子节点里更深层的节点所做的修改。

删除直接子节点时，将会触发 `onChildRemoved()` 事件。

每当因更新（导致子节点重新排序）而触发 `onChildChanged()` 事件时，系统就会触发 `onChildMoved()` 事件。该事件用于通过 `orderByChild`、`orderByValue` 或 `orderByPriority` 中的任何一种进行排序的数据。

我们来举个组合使用的例子。在[博客应用](https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts)中，我们可以这样监听博客的变化状态：

```java
WilddogSync ref = new WilddogSync("https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts");
ref.addChildEventListener(new ChildEventListener(){    
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

通过`removeEventListener()`方法可以移除一个监听事件。

在父节点上调用 `removeEventListener()` 时不会自动移除在其子节点上注册的监听。

## 一次性读取数据

在某些场景下，也许只需要事件的回调被触发一次即可，然后立即取消监听。可以使用`addListenerForSingleValueEvent()`方法：
```java
WilddogSync ref = new WilddogSync("https://docs-examples.wilddogio.com/web/saving-data/wildblog/users/gracehop");
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
## 排序和查询数据

你可以使用 [Query](/sync/android/api.html#Query-Methods) 类 API 进行数据排序。WilddogSync 支持按键、按值、按子节点的值或按优先级对数据进行排序。
只有在对数据排序之后，你才可以进行具体的查询操作，从而获取你想要的特定数据。

**注意**：排序和过滤的开销可能会很大，在客户端执行这些操作时尤其如此。 如果你的应用使用了查询，请定义 [.indexOn](/sync/rules/guide-rule.html#数据索引) 规则，以便在服务器上添加索引以提高查询性能。详细操作参见[添加索引](/sync/rules/guide-rule.html#数据索引)。

#### 数据排序

对数据排序前，要先指定按照`键`、`值`、`子节点的值`或按`优先级`这四种的哪一种排序。对应的方法如下：

方法 | 用法
----  | ----
orderByChild() | 按指定子节点的值对结果排序。
orderByKey() | 按键(key)对结果排序。
orderByValue() | 按值对结果排序。
orderByPriority() | 按优先级对结果排序。

**注意**：每次只能使用一种排序方法。对同一查询调用多个排序方法会引发错误。作为一种变通的方法，你可以先按一种方式查询，然后自行在结果集中进行第二次查询。

下面这个示例演示了在[恐龙面板应用](https://dinosaur-facts.wilddogio.com)中如何按照每个恐龙的身高（"height"节点的值）进行排序。
```java
WilddogSync ref = new WilddogSync("https://dinosaur-facts.wilddogio.com/dinosaurs");

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
调用 `orderByChild()` 方法可指定排序所依据的特定子节点，在本例中，这个子节点就是身高 "height"，然后在按照这个子节点的值进行排序。 如需了解有关如何对其他数据类型进行排序的详细信息，请参见[排序规则](/sync/android/guide/retrieve-data.html#排序规则)。

#### 查询数据

只有对数据排序进行之后，才能查找数据，你可以结合使用以下方法来构造查找的条件。

方法 | 用法
---- | ----
limitToFirst() | 设置从第一条开始，一共返回多少条数据（节点）。
limitToLast() | 设置从最后一条开始，一共返回多少条（返回结果仍是升序，降序要自己处理）。
startAt() | 返回大于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
endAt() | 返回小于或等于指定的键、值或优先级的数据，具体取决于所选的排序方法。
equalTo() | 返回等于指定的键、值或优先级的数据，具体取决于所选的排序方法。可用于精确查询。

与排序依据方法不同，你可以结合使用这些过滤方法。例如，你可以结合使用 `startAt()` 与 `endAt()` 方法将结果限制在指定的范围内。

**限制结果数**

你可以使用 `limitToFirst()` 和 `limitToLast()` 方法为某个给定的事件设置要监听的子节点的最大数量。 例如，如果你使用 `limitToFirst(100)` 将限制个数设置为 100，那么一开始最多只能收到 100 个 `child_added` 事件，即只返回前 100 条数据的快照。
当数据发生更改时，对于进入到前100的数据，你会接收到 `child_added` 事件，对于从前 100 中消失的数据，你才会接收到 `child_removed` 事件，也就是说只有这 100 条里的数据变化才会触发事件。

继续上面示例，如果你只想知道最高的是哪三条恐龙，就可以这样写：

```java
WilddogSync ref = new WilddogSync("https://dinosaur-facts.wilddogio.com/dinosaurs");

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
或者你只关心哪些[恐龙](https://dinosaur-facts.wilddogio.com/scores)的得分超过 60 了：

```java
WilddogSync ref = new WilddogSync("https://dinosaur-facts.wilddogio.com/scores");

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
如上例所示，使用 `startAt()`、`endAt()` 和 `equalTo()` 为查询选择任意起点、终点或等量点。这可以用于`数据分页`和`精确查询`。

#### 排序规则

本小节介绍在使用各种排序方式时，数据究竟是如何排序的。

**orderByChild**

当使用`orderByChild(key)`时，按照子节点的公有属性key的value进行排序。仅当value为单一的数据类型时，排序有意义。如果key属性有多种数据类型时，排序不固定，此时不建议使用`
orderByChild(key)`获取全量数据，例如，
```json
   {
  "scores": {
    "no1" : {
        "name" : "tyrannosaurus",
        "score" : "120"
    },
    "no2" : {
        "name" : "bruhathkayosaurus",
        "score" : 55
    },
    "no3" : {
        "name" : "lambeosaurus",
        "score" : 21
    },
    "no4" : {
        "name" : "linhenykus",
        "score" : 80
    }, 
    "no5" : {
        "name" : "pterodactyl",
        "score" : 93
    }, 
    "no6" : {
        "name" : "stegosaurus",
        "score" : 5
    }, 
    "no7" : {
        "name" : "triceratops",
        "score" : 22
    }, 
    "no8" : {
        "name" : "brontosaurus",
        "score" : true
    }
  }
}
```
霸王龙的分数是`string`类型，雷龙的分数是`boolean`类型，而其他恐龙的分数是`number`类型，此时使用`orderByChild(key)`获得全量数据时，是一个看似固定的排序结果；但是配合使用`limitToFirst()`时，将获得不确定的结果。`Object`类型数据的 value 值为 null，不会出现在结果中。
当配合使用`startAt()`、`endAt()`和`equalTo()`时，如果子节点的公有属性key包含多种数据类型，将按照这些函数的参数的类型排序，即只能返回这个类型的有序数据。上面的数据如果使用 `orderByChild('score').startAt(60).limitToFirst(4)` 将得到下面的结果：
```json
  {
    "no4" : {
        "name" : "linhenykus",
        "score" : 80
    },
    "no5" : {
        "name" : "pterodactyl",
        "score" : 93
    }
  }
```
<p style='color:red'><em>注意：如果path与value的总长度超过1000字节时，使用 `orderByChild(key)`将搜索不到该数据。</em></p>



**orderByKey**

当使用 orderByKey() 对数据进行排序时，系统会按键名以字典顺序升序排列。

**orderByValue**

当使用`orderByValue()`时，按照直接子节点的 value 进行排序。仅当 value 为单一的数据类型时，排序有意义。如果子节点包含多种数据类型时，排序不固定，此时不建议使用`orderByValue()`获取全量数据，例如，
```json
{
  "scores": {
    "tyrannosaurus" : "120",
    "bruhathkayosaurus" : 55,
    "lambeosaurus" : 21,
    "linhenykus" : 80,
    "pterodactyl" : 93,
    "stegosaurus" : 5,
    "triceratops" : 22,
    "brontosaurus" : true
  }
}
```
霸王龙的分数是 `string`类型，雷龙的分数是 `boolean` 类型，而其他恐龙的分数是 `numberic` 类型，此时使用 `orderByValue()` 获得全量数据时，是一个看似固定的排序结果；但是配合使用`limitToFirst()`时，将获得不确定的结果。`Object`类型数据的value值为null，不会出现在结果中。
当配合使用`startAt()`、`endAt()`和`equalTo()`时，如果子节点的value包含多种数据类型，将按照这些函数的参数的类型排序，即只能返回这个类型的有序数据。上面的数据如果使用```orderByValue().startAt(60).limitToFirst(4)```将得到下面的结果：
```json
{
    "linhenykus" : 80,
    "pterodactyl" : 93
}
```
<p style='color:red'><em>注意：如果path与value的总长度超过1000字节时，使用`orderByValue()`将搜索不到该数据。</em></p>

**orderByPriority**
当使用`orderByPriority()`对数据进行排序时，子节点数据将按照优先级和字段名进行排序。
**注意**：优先级的值只能是数值型或字符串。
优先级的设置可参考 [setPriority()](/sync/android/api.html#setPriority)

- １. 没有设置优先级的数据（默认优先级为 null）优先。

- ２. 接下来是优先级为数值型的子节点。它们按照优先级数值排序，由小到大。

- ３. 接下来是优先级为字符串的子节点。它们按照优先级的字典序排列。

- ４. 当多个子节点拥有相同的优先级时（包括没有优先级的情况），它们按照节点名排序。节点名可以转换为数值类型的子节点优先（数值排序），接下来是剩余的子节点（字典序排列）。



