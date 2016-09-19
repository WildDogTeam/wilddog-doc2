title:  Android API 文档
---

## SyncReference (*Methods*)

### child()

定义

SyncReference child(String path)

说明

根据相对路径，来获取当前节点下子节点的引用。

参数

path `String` path 为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。

返回值

`SyncReference` 子节点引用。

示例

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);

SyncReference ref = WilddogSync.getInstance().getReference("test");

// 定位到 '/test/a'
SyncReference ref2 = ref.child("a");

// 定位到 '/test/a/b'
SyncReference ref3 = ref.child("a/b");
SyncReference ref4 = ref.child("a").child("b");

```

----
### getDatabase()

定义

WilddogSync	getDatabase()

说明

根据这个引用获得 WilddogSync 实例。

返回值

WilddogSync 实例。

----
### getKey()

定义

String getKey()

说明

获取当前节点的名称。

返回值

`String` 节点名称。 

----
### getParent()

定义

SyncReference getParent()

说明 

获取父节点的引用。如果当前节点就是root节点，方法执行后返回的依然是root节点的引用。

返回值

`SyncReference` 父节点的引用。

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test/a");

// 获得'/test' 路径的引用
SyncReference ref2 = ref.getParent();

// 到达root
SyncReference ref3 = ref.getParent().getParent();

```

----
###  getRoot()

定义

SyncReference getRoot()

说明 

获取根节点的引用。

返回值

根节点的引用。

----
###  goOffline()

定义

static void goOffline()

说明 

手动关闭连接，关闭自动连接。
注意：调用此方法会影响到所有 Sync 连接。

返回值

void

----
###  goOnline()

定义

static void goOnline()

说明 

手动建立连接，开启自动重连。
注意：调用此方法会影响到所有 Sync 连接。

返回值

void

###  onDisconnect()

定义

OnDisconnect onDisconnect()

说明 

当客户端断开连接后，保证在地址上的数据被设置到一个指定的值。

返回值

当前节点执行断开连接操作的对象。

----
### push()

定义

SyncReference	 push()

说明

在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成，可作为排序使用。

返回值

`SyncReference` 新生成子节点的引用对象。

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

// 添加一个数值，将生成一个新ID，操作结果为{"-JmpzI81egafHZo5":100}， 返回的path为“/test/a/b/-JmpzI81egafHZo5”
SyncReference newRef = ref.child("a/b").push();
newRef.setValue(100);

// 添加一个实体
DOTAHero hero = new DOTAHero();
hero.setName("Nevermore");
hero.setHp(435);
hero.setMp(234);
ref.child("heros").push().setValue(hero);

```

----
### removeValue()

定义

void removeValue()

说明

删除当前节点。 删除成功后将触发Change，ChildRemoved事件。
该函数是线程安全的，将阻塞其他的本地数据操作。

返回值

void

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
ref.child("a/b").removeValue();
```
----

### removeValue(CompletionListener)

定义
	
removeValue(SyncReference.CompletionListener listener)

说明

删除当前节点。 删除成功后将触发Change，ChildRemoved事件。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

* listener `CompletionListener`
listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。

返回值

void

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
ResultHandler handler = new MyHandler();
ref.child("a/b").removeValue(handler);

```

----
### runTransaction(Transaction.Handler)

定义

void runTransaction(Transaction.Handler handler)

说明

在当前路径下，自动修改数据。与 set() 不同，直接覆盖以前的数据，runTransaction() 能够确保不同客户端同时修改，没有冲突。

参数

handler `Transaction.Handler` 

返回值

void

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("/android/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }
        
        return Transaction.success(currentData); // 我们可以调用 Transaction.abort() 中止事务
    }

    public void onComplete(SyncError wilddogError, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});
```

----
###  setPriority()

定义

void setPriority(Object)

说明 

设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

节点按照如下规则排序：
- 没有priority的排最先。
- 有数字priority的次之，按照数值排序。
- 有字符串 priority的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

参数

priority `Object` 指定节点的优先级。

返回值

void

----
###  setPriority(Object, CompletionListener)

定义

void setPriority(Object, SyncReference.CompletionListener listener)

说明 

设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

节点按照如下规则排序：
- 没有priority的排最先。
- 有数字priority的次之，按照数值排序。
- 有字符串 priority的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

参数

priority `Object` 指定节点的优先级。
listener `CompletionListener`。

返回值

void

----
### setValue(Object)

定义

void setValue(Object value)

说明

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

value `Object`
value的类型可以为String、Number、Boolean、null、Map或满足JavaBean规范的实体。
当value为String、Number、Boolean时，等价于当前节点的`updateChildren()`操作。
当value为null时，等价于当前节点的`removeValue()`操作。
当value为Map或JavaBean时，将value转为一颗子树替换当前value。

返回值

void

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

// 等价 update(100);
ref.child("a/b").setValue(100);

// 等价 remove();
ref.child("a/b").setValue(null);

// 设置子树
Map<String, String> children = new HashMap<String, String>();
children.put("c", "cval");
ref.child("a/b").setValue(children);

// 自定义Entity
DOTAHero hero = new DOTAHero();
hero.setName("Nevermore");
hero.setHp(435);
hero.setMp(234);
ref.child("dota/heros/SF").setValue(hero);

```

----
### setValue(Object, CompletionListener)

定义

setValue(Object value, SyncReference.CompletionListener listener)

说明

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

value `Object` value的类型可以为String、Number、Boolean、null、Map或满足JavaBean规范的实体。
当value为String、Number、Boolean时，等价于Path对应的Node的`updateChildren()`操作。
当value为null时，等价于Path对应的Node的`removeValue()`操作。
当value为Map或JavaBean时，将value转为一颗子树替换当前value。

listener `CompletionListener` listener包含一个callback函数，用户可以实现`onComplete`函数，如果某个callback函数没有响应的处理，接口实现为`{}`函数即可。`setValue(value)`等价于`setValue(value, null)`。

返回值

void

示例

自定义CompletionListener

```java
public class MyHandler implements SyncReference.CompletionListener {
      public void onComplete(SyncError error, SyncReference ref) {
          if(error != null){
              System.out.println(error.getCode());
          }
      }
  }

```

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
CompletionListener listener = new MyHandler();

// 等价 update(100);
ref.child("a/b").setValue(100, listener);

// 等价 remove();
ref.child("a/b").setValue(null, listener);

// 设置子树
Map<String, String> children = new HashMap<String, String>();
children.put("c", "cval");
ref.child("a/b").setValue(children, listener);

// 自定义Entity
DOTAHero hero = new DOTAHero();
hero.setName("Nevermore");
hero.setHp(435);
hero.setMp(234);

ref.child("dota/heros/SF").setValue(hero, new SyncReference.CompletionListener() {
  public void onComplete(SyncError error, SyncReference ref) {
    if(error != null) {
      System.out.println(error.getCode());
      return;
    }
    System.out.println("Good!");
  }
});

```

----
### updateChildren()

定义

void updateChildren(Map value)

说明

对子节点进行合并操作。不存在的子节点将会被新增，存在子节点将会被替换。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

value `Map<String, Object>` 当value为null时，等价于`removeValue()`操作。

返回值

void

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

// 更新子树
Map<String, String> children = new HashMap<String, String>();
children.put("c", "cval");
ref.child("a/b").updateChildren(children);
```

----
### updateChildren(Map, CompletionListener)

定义

void updateChildren(Map<String, Object> update, SyncReference.CompletionListener listener)

说明

对子节点进行更新操作。不存在的子节点将会被新增，存在子节点将会被替换。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

value `Map<String, Object>` 当value为null时，等价于`removeValue()`操作。
listener `CompletionListener` listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。

返回值

void

示例

自定义CompletionListener
```java
public class MyHandler implements SyncReference.CompletionListener {
  public void onComplete(SyncError error, SyncReference ref){
    if(error != null){
      System.out.println(error.getCode());
    }
  }
}
```
```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
CompletionListener handler = new MyHandler();

// 更新子树
Map<String, Object> children = new HashMap<String, Object>();
children.put("c", "cval");
ref.child("a/b").updateChildren(children, handler);
```

----
## WilddogSync (*Methods*)

### getApp()

定义

WilddogApp getApp ()

说明

WilddogSync 拥有的 WilddogApp 实例。

返回值

WilddogApp 实例 

----
### getInstance()

定义

public static WilddogSync getInstance ()

说明

用默认的 WilddogApp 获取这个 WilddogSync 实例。

返回值

WilddogSync 实例 

----
### getInstance(WilddogApp app)

定义

static synchronized WilddogSync getInstance (WilddogApp app)

说明

用特定的 WilddogApp 获取这个 WilddogSync 实例。

返回值

WilddogSync 实例

----
### getReference()

定义

SyncReference getReference ()

说明

得到一个 Wilddog Sync 根路径的 SyncReference 实例。

返回值

SyncReference 实例

----
### getReference(String path)

定义

SyncReference getReference (String path)

说明

用有效的路径去获得一个 SyncReference 实例。

返回值

SyncReference 实例

----
### getReferenceFromUrl(String url)

定义

SyncReference getReferenceFromUrl (String url)

说明

用这个有效的 URL 获得一个 SyncReference 实例。
这个 URL 必须是指向默认 Wilddog Sync 完整路径（如`https://docs-examples.wilddogio.com/web/saving-data/wildblog/posts`）。

返回值

SyncReference 实例

----
### getSdkVersion()

定义

static String getSdkVersion()

说明 

获取SDK版本。

返回值

SDK版本。

----
###  goOffline()

定义

static void goOffline()

说明 

手动关闭连接，关闭自动连接。
注意：调用此方法会影响到所有 Sync 连接。

返回值

void

----
###  goOnline()

定义

static void goOnline()

说明 

手动建立连接，开启自动重连。
注意：调用此方法会影响到所有 Sync 连接。

返回值

void

----
### setLogLevel()

定义

void setLogLevel(Logger.Level logLevel)

说明 

默认的，这会被设置为INFO。log等级包括内部错误（ERROR）和任何客户端接收到的安全性debug信息（INFO），设置为DEBUG将会打开诊断日志，设置为NONE禁止所有日志。

参数

logLevel `Logger.Level` 所需最低的日志等级。

返回值

void

----
## DataSnapshot (*Methods*)

### child()

定义

DataSnapshot child (String path)

说明

根据相对路径，来获取当前节点下子节点的快照。

参数

path `String`  子节点名称。

返回值

DataSnapshot 对象 

----
### exists()

定义

boolean exists()

说明

在快照中，判断当前节点是否包含数据。相当于`snapshot.getValue()!=null` 。

返回值

`boolean` 

----
### getChildren()

定义

Iterable<DataSnapshot> getChildren()

说明

获取当前快照中，所有子节点的迭代器。

返回值

`Iterable<DataSnapshot>` 子节点的迭代器。 

----
### getChildrenCount()

定义

long getChildrenCount()

说明

获得子节点的总数。

返回值

`long` 子节点总数 。

----
### getKey()

定义

String getKey()

说明

从快照中，获取当前节点的名称。

返回值

`String` 节点名称 。

----
### getPriority()

定义

Object getPriority()

说明

获取当前节点的优先级。

返回值

`Object`   `Stirng` , `Double` , `Null`。

----
### getRef()

定义

SyncReference getRef()。

说明

从快照中，获得当前节点的引用。

返回值

`SyncReference` 节点引用。

----
### getValue()

定义

Object getValue()

说明

从快照中获得当前节点的数据。

返回值

`Object` 如果是叶子节点，返回String、Boolean、Number类型；如果是非叶子节点，将返回 `Map<String, Object>`。

----
### hasChild()

定义

boolean hasChild(String key)

说明

判断在当前快照中，是否包含指定子节点。

参数

key `String` 子节点名称。

返回值

`boolean` true为包含，false为不包含。

----
### hasChildren()

定义

boolean hasChildren()

说明

判断在当前快照中，是否存在子节点。

返回值

`boolean` true为存在子节点，false为不存在。

----

## MutableData (*Methods*)

### child()

定义

MutableData child(String node)

说明

根据相对路径，来获取当前节点下子节点的快照。

参数

node `String` 子节点名称。

返回值

MutableData 对象

----
### getChildren()

定义

Iterator<MutableData> getChildren()

说明

用于对当前节点的即时子节点进行迭代。

返回值

当前节点的即时子节点。

----
### getChildrenCount()

定义

long getChildrenCount()

说明

获得子节点的总数。

返回值

`long` 子节点总数 。

----
### getKey()

定义

String getKey()

说明

获取当前节点的名称。

返回值

`String` 节点名称 。

----
### getParent()

定义

MutableData getParent()

说明 

获取一个节点的父节点数据，如果本身就是最顶端的节点，返回null。

返回值

MutableData

----
### getPriority()

定义

Object getPriority()

说明 

获得当前节点的优先级。

返回值

`Object`   `Stirng` , `Double` , `Null`。

----
### getValue()

定义

Object getValue()

说明

获得当前节点的数据。

返回值

`Object` 如果是叶子节点，返回String、Boolean、Number类型；如果是非叶子节点，将返回 `Map<String, Object>`。

----
### hasChild()

定义

boolean hasChild(String key)

说明

判断是否包含指定子节点。

参数

key `String` 子节点名称。

返回值

`boolean` true为包含，false为不包含。

----
### hasChildren()

定义

boolean hasChildren()

说明

判断在当前快照中，是否存在子节点。

返回值

`boolean` true为存在子节点，false为不存在。

----
### setPriority()

定义

setPriority(Object priority)

说明 

设置当前节点的优先级。

参数

priority `Object`。

返回值

void

----
### setValue()

定义

void setValue(Object value)

说明 

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数

value `Object`。

返回值

void

----

## Query (*Methods*)

### addChildEventListener()

定义

void addChildEventListener(ChildEventListener listener)

说明

为子节点绑定监听事件，监听该子节点数据的变化。用户需要实现ValueEventListener接口。

参数

listener `ChildEventListener`
`onChildAdded()` 监听子节点的添加事件。
`onChildRemoved()` 监听子节点的删除事件。
`onChildChanged()` 监听子节点的变化事件。

返回值

`ChildEventListener` 返回监听事件的引用，可用于删除此事件。

示例
```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

ChildEventListener listener = ref.addChildEventListener(new ChildEventListener() {
  public void onChildAdded(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
        // DataSnapshot to json string
        try {
          JSONObject json = new JSONObject();
          json.put(dataSnapshot.getKey(), new JSONObject(dataSnapshot.getValue()));
          System.out.println(json.toString());
    } catch (JSONException e) {
          e.printStackTrace();
    }

  }

  public void onChildChanged(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
  }

  public void onChildRemoved(DataSnapshot snapshot) {
    System.out.println(snapshot.getValue());
  }

  public void onChildMoved(DataSnapshot snapshot, String s) {
    System.out.println(snapshot.getValue());
  }

  public void onCancelled(SyncError error) {
    if(error != null){
      System.out.println(error.getCode());
    }
  }
});

```

----
###  addListenerForSingleValueEvent()

定义

void addListenerForSingleValueEvent(ValueEventListener listener)

说明 

为当前节点单次数据获取绑定监听事件，此监听器只被触发一次，以获取当前节点下的所有数据。

参数

listener `ValueEventListener` 节点绑定的监听事件。

返回值

void

----
### addValueEventListener()

定义

void addValueEventListener(ValueEventListener listener)

说明

为当前节点绑定监听事件，监听该节点数据的变化。用户需要实现ValueEventListener接口。

参数

listener `ValueEventListener` listener将监听Change事件。

返回值

`ValueEventListener` 返回监听事件的引用，可用于删除此事件。

示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
ValueEventListener listener = ref.addValueEventListener(new ValueEventListener(){
     public void onDataChange(DataSnapshot snapshot) {
          System.out.println(snapshot.getValue());
          // DataSnapshot to json string
          try {
          JSONObject json = new JSONObject();
          json.put(dataSnapshot.getKey(), new JSONObject(dataSnapshot.getValue()));
          System.out.println(json.toString());
      } catch (JSONException e) {
          e.printStackTrace();
     }
     }

     public void onCancelled(SyncError error) {
          if(error != null){
               System.out.println(error.getCode());
          }
  }
});

```

----
### removeEventListener(ValueEventListener)

定义

void removeEventListener(ValueEventListener listener)

说明

删除已绑定的监听事件。

参数

listener `ValueEventListener` 要删除的监听事件。

返回值

void

----
### removeEventListener(ChildEventListener)

定义

void removeEventListener(ChildEventListener listener)

说明

删除已绑定的监听事件。

参数

listener `ChildEventListener` 要删除的监听事件。

返回值

void

---
### orderByChild()

定义

Query orderByChild(String childKey)

说明

使用指定的子节点的值进行排序。

参数

childKey `String` 子节点属性。

返回值

Query 查询器类。

----
### orderByKey()

定义

Query orderByKey()

说明

使用子节点的key进行排序。

返回值

Query 查询器类

---
### orderByValue()

定义

Query orderByValue()

说明

使用子节点的值进行排序。

返回值

Query 查询器类。

----
### orderByPriority()

定义

Query orderByPriority()

说明

根据子节点的优先级进行排序。

返回值

Query 查询器类。

----
### startAt()

定义

Object startAt(String value), Object startAt(double value), Object startAt(boolean value)

说明

创建一个大于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object startAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

参数

value `String` `double` `boolean`。

返回值

Query 查询器类。

----
### endAt()

定义

Object endAt(String value)，Object endAt(double value)，Object endAt(boolean value)

说明

创建一个小于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object endAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

参数

value `String` `double` `boolean`。

返回值

Query 查询器类。

----
### equalTo()

定义

Object equalTo(String value)，Object equalTo(double value)，Object equalTo(boolean value)

说明

创建一个等于的精确查询。

参数

value `String` `double` `boolean`。

返回值

Query 查询器类。

----
### limitToFirst()

定义

Query limitToFirst(int count)

说明

创建一个limit查询。从第一条开始获取指定数量的数据。

参数

count `int` 数量。

返回值

Query 查询器类。

----
### limitToLast()

定义

Query limitToLast(int count)

说明

创建一个limit查询。从最后一条开始获取指定数量的数据。

参数

count `int` 数量。

返回值

Query 查询器类。

----
### getRef()

定义

SyncReference getRef()

说明

获得当前的引用。

返回值

SyncReference 节点引用。

----

## OnDisconnect (*Methods*)

###  onDisconnect()

定义

OnDisconnect onDisconnect()

说明 

当客户端断开连接后，保证在地址上的数据被设置到一个指定的值。

返回值

当前节点执行断开连接操作的对象。

----

## SyncReference.CompletionListener (*Methods*)

###  onComplete()

定义

void onComplete(SyncError error, SyncReference ref)

说明 

当操作成功或者失败的时候触发这个方法。如果操作失败，会给出一个error,如果操作成功，error为null。

参数

error `SyncError` 错误描述。
ref `SyncReference` 到指定 Sync 节点的引用。

返回值

void

----

## SyncReference.ResultHandler (*Methods*)

###  onError()

定义

void onError(SyncError error)

说明 

如果操作失败此方法被调用。

参数

error `SyncError` 包含失败原因和附加的详情。

返回值

void

----
###  onSuccess()

定义

void onSuccess()

说明 

如果操作成功此方法被调用。

返回值

void

----

## ChildEventListener (*Methods*)

###  onCancelled()

定义

void onCancelled(SyncError error)

说明 

当listener在服务端失败，或者被删除的时候调用该方法。

参数

error `SyncError` 发生错误的描述。

返回值

void

----
###  onChildAdded()

定义

void onChildAdded(DataSnapshot snapshot,
                  String previousChildName)

说明 

一个添加了listener的节点，当有子节点被添加时触发此方法。

参数

snapshot `DataSnapshot` 新添加的子节点数据快照。
previousChildName `String` 排在被添加的新子节点前面的兄弟节点的key值。如果被添加的是当前节点的第一个子节点，该值为null。

返回值

void

----
###  onChildChanged()

定义
void onChildChanged(DataSnapshot snapshot,
                    String previousChildName)

说明 
当前节点的子节点发生改变的时候触发此方法。

参数
snapshot `DataSnapshot` 新子节点数据的快照。
previousChildName `String` 排在被修改的新子节点前面的兄弟节点的key值。如果改变的是当前节点的第一个子节点，该值为null。

返回值
void

----
###  onChildMoved()

定义

void onChildMoved(DataSnapshot snapshot,
                  String previousChildName)

说明 

当一个子节点的优先级发生变化时，该方法将被调用。参考 SyncReference.setPriority(Object) 和数据排序了解更多关于优先级和数据排序的信息。

参数

DataSnapshot 节点排序发生变化时的数据快照。
String 排在当前子节点前面的兄弟子节点的key名称，如果当前节点位置最先，此值为null。

返回值

void

----
### onChildRemoved()

定义

void onChildRemoved(DataSnapshot snapshot)

说明 
当一个添加了listener的节点有子节点被删除的时候触发这个方法。

参数

snapshot `DataSnapshot` 被删除子节点的数据快照。

返回值

void

----

## ValueEventListener (*Methods*)

###  onCancelled()

定义

void onCancelled(SyncError error)

说明 

当listener在服务端失败，或者被删除的时候调用该方法。

参数

error `DataSnapshot` 发生错误的描述。

返回值

void

----
###  onDataChange()

定义

void onDataChange(DataSnapshot snapshot)

说明 

一个添加了 listener 的节点，当有节点改变时触发此方法。

参数

snapshot `DataSnapshot` 新添加的子节点的数据快照

返回值

void

----

## SyncError

SyncError (*Constants*)

----
### DATA_STALE

说明 

内部使用。

----
### DENIED_BY_USER

说明 

用户不能登录认证应用。当用户取消OAuth认证请求时会造成这个错误。

----
### DISCONNECTED

说明 

因为网络连接失败导致操作不能执行。

----
### EXPIRED_TOKEN

说明 

提供的auth Token已经过期。

----
### INVALID_TOKEN

说明 

指定的登录认证Token不可用。如果token变形，过期或者用于生成token的secret已经被撤销，会引发此错误。

----
### LIMITS_EXCEEDED

说明 

超过限制，如果遇到此错误码，请联系support@Wilddog.com。

----
### MAX_RETRIES

说明 

事务有太多的重试。

----
### NETWORK_ERROR

说明 

因为网络原因导致操作不能执行。

----
### OPERATION_FAILED

说明 

服务器标示操作失败。

----
### OVERRIDDEN_BY_SET

说明
 
事务被随后的集合覆盖。

----
### PERMISSION_DENIED

说明 

客户端不被许可执行此操作。

----
### UNKNOWN_ERROR

说明 

未知的错误。

----

### USER_CODE_EXCEPTION

说明 

用户代码中发生的异常。

----

SyncError (*Methods*)

### fromException()

定义

WilddogException fromException(Throwable e)

说明 

新建一个WilddogException异常。

返回值

WilddogException

----
### fromStatus()

定义

SyncError fromStatus(String)

说明 

用 SyncError 常量新建一个 SyncError 实例。

参数

status `SyncError` The status string。

返回值

void

----
### getCode()

定义

int getCode()

说明 

一个明确的状态码，取决于错误。

返回值

int

----
### getMessage()

定义

String getMessage()

说明 

获取错误原因。

返回值

String

----
### getDetails()

定义

String getDetails()

说明

获取错误细节。

返回值

错误的细节。

----
### toException()

定义

WilddogExcepton toException()

说明 

如果第三方需要一个来自 Sync 的异常，出于整合的目的可以使用此方法。

返回值

一个封装了error的异常类，包含了适当的信息，没有栈信息。

----

## Config (*Methods*)

### setLogger()

定义

void setLogger(Logger logger)

说明 

如果你想提供一个定制的日志，传递一个继承了Logger接口的对象。

参数

logger `Logger` 定制的日志。

返回值

void

----
### setEventTarget()

定义

void setEventTarget(EventTarget eventTarget)

说明 

在默认设置中，Sync 库会创建一个线程来处理所有的回调。在安卓中，将试图采用main Looper。如果你想对如何触发回调有更多控制权，你可以提供一个对象，让他继承EventTarget，它将为每一个回调传递一个Runnable。

参数

eventTarget `EventTarget`  负责触发回调的对象。

返回值

void

----
### setLogLevel()

定义

void setLogLevel(Logger.Level logLevel)

说明 

默认的，这会被设置为INFO。log等级包括内部错误（ERROR）和任何客户端接收到的安全性debug信息（INFO），设置为DEBUG将会打开诊断日志，设置为NONE禁止所有日志。

参数

logLevel `Logger.Level` 所需最低的日志等级。

返回值

void

----
### setDebugLogComponents()

定义

void setDebugLogComponents(List<String> debugComponents)

说明 

主要用于debug调试.限制debug输出到指定组件。默认为null，允许所有组建的日志;  显式设置也会把等级设置为DEBUG。

参数

debugComponents `List<String> ` 一系列日志需要的组件，或者设置为null使所有组件可行。

返回值

void

----
### setAuthenticationServer()

定义

void setAuthenticationServer(String host)

说明 

设置主机可以被用户登录认证。如果你不确定，不要使用此设置。

参数

host `String` 用于认证的server。

返回值

void

----
### setSessionPersistenceKey()

定义

void setSessionPersistenceKey(String sessionKey)

说明 

为Ｗilddog连接设置session的标识符，使用session标识符可以使多个认证会话在一个设备上共存。如果一个设备上只有一个用户没有必要使用此方法。

参数

sessionKey `String` 用于标识session的标识符名称。

返回值

void

----

## WilddogApp (*Methods*)

### getApplicationContext()

定义

Context getApplicationContext ()

说明 

返回值这个应用的 Context 对象

----
### getApps(Context context)

定义

static List<WilddogApp> getApps (Context context)

说明 

返回所有现存的 WilddogApp 实例。如果没有 WilddogApp 实例，则返回 nil.
这个方法是保证线程安全的。

返回值

含有 WilddogApp 的 List

----
### getInstance(String name)

定义

static WilddogApp getInstance (String name)

说明 

返回一个之前用 name 创建好的 WilddogApp. 如果没有这个 app, 则返回 nil.
这个方法是保证线程安全的。

参数

name 开发者自己起名的应用名称。

返回值

返回一个用户所起名字对应的 WilddogApp 实例。

----
### getInstance()

定义

static WilddogApp getInstance ()

说明 

返回一个默认的 app。如果默认 app 不存在，则返回 nil。

返回值

返回一个默认的 WilddogApp 实例。

----
### getName()

定义

String getName ()

说明 

获取这个 app 的 name。

----
### getOptions()

定义

WilddogOptions getOptions ()

说明 

获取这个 app 的 options。

----
### initializeApp(Context context, WilddogOptions options, String name)

定义

static WilddogApp initializeApp (Context context, WilddogOptions options, String name)

说明 

用 options 和 name 配置一个 Wilddog app. 如果配置失败，会抛出异常。
这个方法是保证线程安全的。

参数

name 开发者自己起名的应用名称。这个名字只能包含字母、数组和下划线  
options 配置 Sync 应用所需的 WDGOptions 实例

----
### initializeApp(Context context, WilddogOptions options)

定义

static WilddogApp initializeApp (Context context, WilddogOptions options)

说明 

用有效的 options 配置默认的 WilddogApp。默认的 app 名字是 `[default]`。
如果配置失败，会抛出异常。这个方法是线程安全的。

参数

options 配置 Sync 应用所需的实例

----
## WilddogOptions (*Methods*)

### getSyncUrl()

定义

String getSyncUrl ()

说明 

Sync 的根路径 URL, e.g. `http://your-appid.wilddogio.com`.

----
## WilddogOptions.Builder (*Methods*)

### setSyncUrl(String syncUrl)

定义

WilddogOptions.Builder setSyncUrl (String syncUrl)

说明 

初始化 WilddogOptions。

参数

syncURL Sync 的根路径 URL, e.g. `http://your-appid.wilddogio.com`

