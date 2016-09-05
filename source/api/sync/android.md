title:  完整 API 文档
---

# Wilddog (*Methods*)

##  setAndroidContext()

定义

static void setAndroidContext(android.content.Context context)

说明 

Wilddog在Android初始化需要配置Android Context， 且必须要在new Wilddog()之前配置。你可以在 `android.app.Application` 或者 `Activity`的`onCreate` 方法中设置 Android Context。

参数

context `android.content.Context`  在Android中使用Wilddog需要一个Android Context。

返回值

void

----

##  setDefaultConfig()

定义
static void setDefaultConfig(Config config)

说明 
Wilddog的默认配置对象，在调用new Wilddog之前必须调用此方法。

参数
config `Config` 新的config参数

返回值
void

---

## getDefaultConfig()

定义
static Config getDefaultConfig()

说明 
获取Wilddog的默认配置对象。

返回值


<!-- Js通过方法前面的两个“#”抽取目录，为识别注释多加一个“#”
### getApp()

定义
WilddogApp getApp()

说明 
获取与引用关联的WilddogApp实例

返回值
对应于引用的WilddogApp对象
-->

----

## child()

定义
Wilddog child(String path)

说明
根据相对路径，来获取当前节点下子节点的引用。

参数
path `String` path 为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。

返回值
`Wilddog` 子节点引用。

示例
```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

// 定位到 '/test/a'
Wilddog ref2 = ref.child("a");

// 定位到 '/test/a/b'
Wilddog ref3 = ref.child("a/b");
Wilddog ref4 = ref.child("a").child("b");

```
----

## push()

定义
Wilddog push()

说明
在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成，可作为排序使用。

返回值
`Wilddog` 新生成子节点的引用对象。

示例

```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

// 添加一个数值，将生成一个新ID，操作结果为{"-JmpzI81egafHZo5":100}， 返回的path为“/test/a/b/-JmpzI81egafHZo5”
Wilddog  newRef = ref.child("a/b").push();
newRef.setValue(100);

// 添加一个实体
DOTAHero hero = new DOTAHero();
hero.setName("Nevermore");
hero.setHp(435);
hero.setMp(234);
ref.child("heros").push().setValue(hero);

```
----



## setValue(Object)

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
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

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

## setValue(Object, CompletionListener)

定义
void setValue(Object value, Wilddog.CompletionListener listener)

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
public class MyHandler implements Wilddog.CompletionListener {
      public void onComplete(WilddogError error, Wilddog ref) {
          if(error != null){
              System.out.println(error.getCode());
          }
      }
  }

```

```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");
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

ref.child("dota/heros/SF").setValue(hero, new Wilddog.CompletionListener() {
  public void onComplete(WilddogError error, Wilddog ref) {
    if(error != null) {
      System.out.println(error.getCode());
      return;
    }
    System.out.println("Good!");
  }
});

```

----

##  setPriority()

定义
void setPriority(Object)

说明 
设置Wilddog当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

节点按照如下规则排序：
- 没有priority的排最先。
- 有数字priority的次之，按照数值排序。
- 有字符串 priority的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。
<br>
<br>
注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

参数
priority `Object` 指定节点的优先级。

返回值
void

----

##  setPriority(Object, CompletionListener)

定义
void setPriority(Object, Wilddog.CompletionListener)

说明 
设置Wilddog当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

节点按照如下规则排序：
- 没有priority的排最先。
- 有数字priority的次之，按照数值排序。
- 有字符串 priority的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。
<br>
<br>
注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

参数
* priority `Object` 指定节点的优先级。
* listener `CompletionListener`。

返回值
void

----

## updateChildren()

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
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

// 更新子树
Map<String, String> children = new HashMap<String, String>();
children.put("c", "cval");
ref.child("a/b").updateChildren(children);
```

----

## updateChildren(Map, CompletionListener)

定义
void updateChildren(Map children, Wilddog.CompletionListener listener)

说明
对子节点进行更新操作。不存在的子节点将会被新增，存在子节点将会被替换。
该函数是线程安全的，将阻塞其他的本地数据操作。

参数
* value `Map<String, Object>` 当value为null时，等价于`removeValue()`操作。
* listener `CompletionListener` listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。

返回值
void

示例
自定义CompletionListener
```java
public class MyHandler implements Wilddog.CompletionListener {
  public void onComplete(WilddogError error, Wilddog ref){
    if(error != null){
      System.out.println(error.getCode());
    }
  }
}
```
```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");
CompletionListener handler = new MyHandler();

// 更新子树
Map<String, Object> children = new HashMap<String, Object>();
children.put("c", "cval");
ref.child("a/b").updateChildren(children, handler);
```

----

## removeValue()

定义
void removeValue()

说明
删除当前节点。 删除成功后将触发Change，ChildRemoved事件。
该函数是线程安全的，将阻塞其他的本地数据操作。

返回值
void

示例

```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");
ref.child("a/b").removeValue();
```
----

## removeValue(CompletionListener)

定义
void removeValue(CompletionListener listener)

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
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");
ResultHandler handler = new MyHandler();
ref.child("a/b").removeValue(handler);

```

----

## runTransaction(Transaction.Handler)

定义
void runTransaction(Transaction.Handler handler)

说明
在当前路径下，自动修改数据。与 set() 不同，直接覆盖以前的数据，runTransaction() 能够确保不同客户端同时修改，没有冲突。

参数
* handler `Transaction.Handler` 

返回值
void

示例

```java
Wilddog upvotesRef = new Wilddog("https://<appId>.wilddogio.com/android/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }
        
        return Transaction.success(currentData); // 我们可以调用 Transaction.abort() 中止事务
    }

    public void onComplete(WilddogError wilddogError, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});
```
____

##  onDisconnect()

定义
OnDisconnect onDisconnect()

说明 
当客户端断开连接后，保证在地址上的数据被设置到一个指定的值。

返回值
当前节点执行断开连接操作的对象。

----

##  goOffline()

定义
static void goOffline()

说明 
手动关闭连接，关闭自动连接。
注意：调用此方法会影响到所有Wilddog连接。

返回值
void

----

##  goOnline()

定义
static void goOnline()

说明 
手动建立连接，开启自动重连。
注意：调用此方法会影响到所有Wilddog连接。
返回值
void

----

## getKey()

定义
String getKey()

说明
获取当前节点的名称。

返回值
`String` 节点名称。 

----

## getParent()

定义
Wilddog getParent()

说明 
获取父节点的引用。如果当前节点就是root节点，方法执行后返回的依然是root节点的引用。

返回值
`Wilddog` 父节点的引用。

示例
```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test/a");

// 获得'/test' 路径的引用
Wilddog ref2 = ref.getParent();

// 到达root
Wilddog ref3 = ref.getParent().getParent();

```

----

##  getRoot()

定义
Wilddog getRoot()

说明 
获取根节点的引用。
返回值
根节点的引用。

----

## getSdkVersion()

定义
static String getSdkVersion()

说明 
获取SDK版本。

返回值
SDK版本。

----

# Wilddog.CompletionListener (*Methods*)

##  onComplete()

定义
void onComplete(WilddogError error,
                Wilddog ref)

说明 
当操作成功或者失败的时候触发这个方法。如果操作失败，会给出一个error,如果操作成功，error为null。
参数
* error `WilddogError` 错误描述。
* ref `Wilddog` 到指定Wilddog节点的引用。

返回值
void

----

# Wilddog.AuthStateListener (*Methods*)

## onAuthStateChanged()

定义
void onAuthStateChanged(AuthData authData)

说明
当登录认证状态发生改变的时候，此方法将被调用。authData包含当前登录认证的信息，如果当前的连接没有登录认证，authData为null。

参数
authData `AuthData` 当前登录认证的信息，未登录认证时为null。

返回值
void

----

# Wilddog.AuthResultHandler (*Methods*)

## onAuthenticated()

定义
void onAuthenticated(AuthData authData)

说明 
当登录认证成功时这个方法被调用。

参数
authData `AuthData` 当前用户或者Token的信息。

返回值
void

----

##  onAuthenticationError()

定义
void onAuthenticationError(WilddogError error)

说明 
当登录认证失败时这个方法被调用。

参数
error `WilddogError` 登录认证失败的原因和附加的详细信息。

返回值
void

----

# Wilddog.ResultHandler (*Methods*)

##  onError()

定义
void onError(WilddogError error)

说明 
如果操作失败此方法被调用。

参数
error `WilddogError` 包含失败原因和附加的详情。

返回值
void

----

##  onSuccess()

定义
void onSuccess()

说明 
如果操作成功此方法被调用。

返回值
void

----

# ChildEventListener (*Methods*)

##  onCancelled()

定义
void onCancelled(WilddogError error)

说明 
当listener在服务端失败，或者被删除的时候调用该方法。

参数
error `WilddogError` 发生错误的描述。

返回值
void

----

##  onChildAdded()

定义
void onChildAdded(DataSnapshot snapshot,
                  String previousChildName)

说明 
一个添加了listener的节点，当有子节点被添加时触发此方法。

参数
* snapshot `DataSnapshot` 新添加的子节点数据快照。
* previousChildName `String` 排在被添加的新子节点前面的兄弟节点的key值。如果被添加的是当前节点的第一个子节点，该值为null。

返回值
void

----

##  onChildChanged()

定义
void onChildChanged(DataSnapshot snapshot,
                    String previousChildName)

说明 
当前节点的子节点发生改变的时候触发此方法。

参数
* snapshot `DataSnapshot` 新子节点数据的快照。
* previousChildName `String` 排在被修改的新子节点前面的兄弟节点的key值。如果改变的是当前节点的第一个子节点，该值为null。

返回值
void

----

##  onChildMoved()

定义
void onChildMoved(DataSnapshot snapshot,
                  String previousChildName)

说明 
当一个子节点的优先级发生变化时，该方法将被调用。参考Wilddog.setPriority(Object)和数据排序了解更多关于优先级和数据排序的信息。

参数
* `DataSnapshot` 节点排序发生变化时的数据快照。
* `String` 排在当前子节点前面的兄弟子节点的key名称，如果当前节点位置最先，此值为null。

返回值
void

----

## onChildRemoved()

定义
void onChildRemoved(DataSnapshot snapshot)

说明 
当一个添加了listener的节点有子节点被删除的时候触发这个方法。

参数
snapshot `DataSnapshot` 被删除子节点的数据快照。

返回值
void

----

# ValueEventListener (*Methods*)

##  onCancelled()

定义
void onCancelled(WilddogError error)

说明 
当listener在服务端失败，或者被删除的时候调用该方法。

参数
error `DataSnapshot` 发生错误的描述。

返回值
void

----

##  onDataChange()

定义
void onDataChange(DataSnapshot snapshot)

说明 
一个添加了 listener 的节点，当有节点改变时触发此方法。
参数
snapshot `DataSnapshot` 新添加的子节点的数据快照

返回值
void

----

# Query (*Methods*)

## addValueEventListener()

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
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

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

     public void onCancelled(WilddogError error) {
          if(error != null){
               System.out.println(error.getCode());
          }

  }

});
```

----

## addChildEventListener()

定义
void addChildEventListener(ChildEventListener listener)

说明
为子节点绑定监听事件，监听该子节点数据的变化。用户需要实现ValueEventListener接口。

参数
* listener `ChildEventListener`
`onChildAdded()` 监听子节点的添加事件。
`onChildRemoved()` 监听子节点的删除事件。
`onChildChanged()` 监听子节点的变化事件。

返回值
`ChildEventListener` 返回监听事件的引用，可用于删除此事件。

示例
```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com/test");

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

  public void onCancelled(WilddogError error) {
    if(error != null){
      System.out.println(error.getCode());
    }
  }
});

```
----

##  addListenerForSingleValueEvent()

定义
void addListenerForSingleValueEvent(ValueEventListener listener)

说明 
为当前节点单次数据获取绑定监听事件，此监听器只被触发一次，以获取当前节点下的所有数据。

参数
listener `ValueEventListener` 节点绑定的监听事件。

返回值
void

----

## removeEventListener(ValueEventListener)

定义
void removeEventListener(ValueEventListener listener)

说明
删除已绑定的监听事件。

参数
listener `ValueEventListener` 要删除的监听事件。

返回值
void

----

## removeEventListener(ChildEventListener)

定义
void removeEventListener(ChildEventListener listener)

说明
删除已绑定的监听事件。

参数
listener `ChildEventListener` 要删除的监听事件。

返回值
void

---

## orderByChild()

定义
Query orderByChild(String childKey)

说明
使用指定的子节点的值进行排序。

参数
childKey `String` 子节点属性。

返回值
Query 查询器类。

----

## orderByKey()

定义
Query orderByKey()

说明
使用子节点的key进行排序。

返回值
Query 查询器类

---

## orderByValue()

定义
Query orderByValue()

说明
使用子节点的值进行排序。

返回值
Query 查询器类。


----

## orderByPriority()

定义
Query orderByPriority()

说明
根据子节点的优先级进行排序。

返回值
Query 查询器类。

----

## startAt()

定义
Object startAt(String value), Object startAt(double value), Object startAt(boolean value)

说明
创建一个大于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object startAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

参数
value `String` `double` `boolean`。

返回值
Query 查询器类。

----

## endAt()

定义
Object endAt(String value)，Object endAt(double value)，Object endAt(boolean value)

说明
创建一个小于等于的范围查询，可配合orderBy方式使用。注意 : 对于使用Object endAt(String value)进行查询时,查询方式是通过将字符进行unicode编码后进行排序。

参数
value `String` `double` `boolean`。

返回值
Query 查询器类。

----
## equalTo()

定义
Object equalTo(String value)，Object equalTo(double value)，Object equalTo(boolean value)

说明
创建一个等于的精确查询。

参数
value `String` `double` `boolean`。

返回值
Query 查询器类。

----

## limitToFirst()

定义
Query limitToFirst(int count)

说明
创建一个limit查询。从第一条开始获取指定数量的数据。

参数
count `int` 数量。

返回值
Query 查询器类。

----

## limitToLast()

定义
Query limitToLast(int count)

说明
创建一个limit查询。从最后一条开始获取指定数量的数据。

参数
count `int` 数量。

返回值
Query 查询器类。

----

## getRef()

定义
Wilddog getRef()

说明
获得当前的引用。

返回值
`Wilddog` 节点引用。

----

# DataSnapshot (*Methods*)

## child()

定义
Wilddog child(String node)

说明
根据相对路径，来获取当前节点下子节点的快照。

参数
node `String`  子节点名称。

返回值
`Snapshot` 

----

## exists()

定义
boolean exists()

说明
在快照中，判断当前节点是否包含数据。相当于`snapshot.getValue()!=null` 。

返回值
`boolean` 

----

## getChildren()

定义
Iterable<DataSnapshot> getChildren()

说明
获取当前快照中，所有子节点的迭代器。

返回值
`Iterable<DataSnapshot>` 子节点的迭代器。 

----

## getChildrenCount()

定义
long getChildrenCount()

说明
获得子节点的总数。

返回值
`long` 子节点总数 。

----

## getKey()

定义
String getKey()

说明
从快照中，获取当前节点的名称。

返回值
`String` 节点名称 。

----

## getPriority()

定义
Object getPriority()

说明
获取当前节点的优先级。

返回值
`Object`   `Stirng` , `Double` , `Null`。

----

## getRef()

定义
Wilddog getRef()。

说明
从快照中，获得当前节点的引用。

返回值
`Wilddog` 节点引用。

----

## getValue()

定义
Object getValue()

说明
从快照中获得当前节点的数据。

返回值
`Object` 如果是叶子节点，返回String、Boolean、Number类型；如果是非叶子节点，将返回 `Map<String, Object>`。

----

## hasChild()

定义
boolean hasChild(String key)

说明
判断在当前快照中，是否包含指定子节点。

参数
* key `String` 子节点名称。

返回值
`boolean` true为包含，false为不包含。

----

## hasChildren()

定义
boolean hasChildren()

说明
判断在当前快照中，是否存在子节点。

返回值
`boolean` true为存在子节点，false为不存在。

<!--

!#MutableData (*Methods*)


!## child()

!定义
MutableData child(String node)

!说明
根据相对路径，来获取当前节点下子节点的快照。

!参数
* node `String` 子节点名称。

!返回值
`MutableData`


!## getChildren()

!定义
Iterator<MutableData> getChildren()

!说明
用于对当前节点的即时子节点进行迭代。
!返回值
当前节点的即时子节点。


!## getChildrenCount()

!定义
long getChildrenCount()

!说明
获得子节点的总数。

!返回值
`long` 子节点总数 。


!## getKey()

!定义
String getKey()

!说明
获取当前节点的名称。

!返回值
`String` 节点名称 。


!## getParent()

!定义
MutableData getParent()

!说明 
获取一个节点的父节点数据，如果本身就是最顶端的节点，返回null。
!返回值
MutableData


!## getPriority()

!定义
Object getPriority()

!说明 
获得当前节点的优先级。
!返回值
`Object`   `Stirng` , `Double` , `Null`。

!## getValue()

!定义
Object getValue()

!说明
获得当前节点的数据。

!返回值
`Object` 如果是叶子节点，返回String、Boolean、Number类型；如果是非叶子节点，将返回 `Map<String, Object>`。


!## hasChild()

!定义
boolean hasChild(String key)

!说明
判断是否包含指定子节点。

!参数
* key `String` 子节点名称。

!返回值
`boolean` true为包含，false为不包含。


!## hasChildren()

!定义
boolean hasChildren()

!说明
判断在当前快照中，是否存在子节点。

!返回值
`boolean` true为存在子节点，false为不存在。


!## setPriority(Object)

!定义
void setPriority(Object)

!说明 
设置当前节点的优先级。

!参数
* priority `Object`。

!返回值
void


!## setValue()

!定义
void setValue(Object value)

!说明 
给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

!参数
* value `Object`。

!返回值
void
-->
----

# AuthData (*Methods*)

## getAuth()

定义
Map getAuth()

说明 
同步返回Token Auth状态,如果使用secret登录，返回null。

返回值
返回Token Auth状态,如果使用secret登录，返回null。

----

##  getExpires()

定义
long getExpires()

说明 
取得token的过期时间。

返回值
token的过期时间。

----

##  getProvider()

定义
String getProvider()

说明 
获取第三方平台认证的支持方式，如果没有，返回null。

返回值
返回第三方OAuth平台或者null。

----

##  getProviderData()

定义
Map<String,Object> getProviderData()

说明 
获取认证服务器返回的第三方平台数据。内容取决于支持方式，参考文档获取更多信息。
返回值
一个包含第三方OAuth平台信息的Map。

----

##  getToken()

定义
String getToken()

说明 
获取登录认证的Token,如果是通过secret登录，得到null。
返回值
登录认证的Token,如果是通过secret登录，返回null。

----

##  getUid()

定义
String getUid()

说明 
获取登录用户的uid，如果是以secret登录或者用没有uid的Token登录，返回null。
返回值
uid或者null。

----

# WilddogError (*Constants*)

## AUTHENTICATION_PROVIDER_DISABLED

说明 
要求的第三方OAuth平台认证方式不被当前app支持。

----

## DATA_STALE

说明 
内部使用。

----

## DENIED_BY_USER

说明 
用户不能登录认证应用。当用户取消OAuth认证请求时会造成这个错误。

----

## DISCONNECTED

说明 
因为网络连接失败导致操作不能执行。

----

## EMAIL_TAKEN

说明 
由于指定的邮箱地址已经被使用而不能建立新用户。

----

## EXPIRED_TOKEN

说明 
提供的auth Token已经过期。

----

## INVALID_AUTH_ARGUMENTS

说明 
指定的凭证不符合标准或者不完整。请参考错误信息，错误详情和Wilddog文档获得支持方auth登录认证的正确参数。

----

## INVALID_CONFIGURATION

说明 
被申请的登录认证提供方式没有配置，请求无法完成。请完成应用配置。

----

## INVALID_CREDENTIALS

说明 
指定的登录认证凭证不可用。当凭证不符合标准或者过期时会引发这个错误。

----

## INVALID_EMAIL

说明
 指定的邮箱不可用。

----

## INVALID_PASSWORD

说明 
指定的用户帐号密码不正确。

----

## INVALID_PROVIDER

说明 
申请的第三方OAuth平台认证方式不存在。请参阅Wilddog认证的相关文档获得支持的方式列表。

----

## INVALID_TOKEN

说明 
指定的登录认证Token不可用。如果token变形，过期或者用于生成token的secret已经被撤销，会引发此错误。

----

## LIMITS_EXCEEDED

说明 
超过限制，如果遇到此错误码，请联系support@Wilddog.com。

----

## MAX_RETRIES

说明 
事务有太多的重试。

----

## NETWORK_ERROR

说明 
因为网络原因导致操作不能执行。

----

## OPERATION_FAILED

说明 
服务器标示操作失败。

----

## OVERRIDDEN_BY_SET

说明 
事务被随后的集合覆盖。

----

## PERMISSION_DENIED

说明 
客户端不被许可执行此操作。

----

## PREEMPTED

说明 
活动的或者即将发生的auth登录认证被另一个auth登录取代。

----

## PROVIDER_ERROR

说明 
第三方OAuth平台错误。

----

## UNKNOWN_ERROR

说明 
未知的错误。

----

## USER_CODE_EXCEPTION

说明 
用户代码中发生的异常。

----

## USER_DOES_NOT_EXIST

说明 
指定的用户账户不存在。

----

# WilddogError (*Methods*)

## fromException()

定义
WilddogException fromException(Throwable e)

说明 
新建一个WilddogException异常。

返回值
WilddogException

----

## fromStatus()

定义
WilddogError fromStatus(String)

说明 
用WilddogError常量新建一个WilddogError实例。

参数
status `WilddogError` The status string。

返回值
void

----

## getCode()

定义
int getCode()

说明 
一个明确的状态码，取决于错误。
返回值
int。

----

## getMessage()

定义
String getMessage()

说明 
获取错误原因。

返回值
String

----

## getDetails()

定义
String getDetails()

说明
获取错误细节。

返回值
错误的细节。

----

## toException()

定义
WilddogExcepton toException()

说明 
如果第三方需要一个来自wilddog的异常，出于整合的目的可以使用此方法。

返回值
一个封装了error的异常类，包含了适当的信息，没有栈信息。

----

# Config (*Methods*)

## setLogger()

定义
void setLogger(Logger logger)

说明 
如果你想提供一个定制的日志，传递一个继承了Logger接口的对象。

参数
logger `Logger` 定制的日志。

返回值
void

----

## setEventTarget()

定义
void setEventTarget(EventTarget eventTarget)

说明 
在默认设置中，Wilddog库会创建一个线程来处理所有的回调。在安卓中，将试图采用main Looper。如果你想对如何触发回调有更多控制权，你可以提供一个对象，让他继承EventTarget，它将为每一个回调传递一个Runnable。

参数
eventTarget `EventTarget`  负责触发回调的对象。

返回值
void

----

## setLogLevel()

定义
void setLogLevel(Logger.Level logLevel)
说明 
默认的，这会被设置为INFO。log等级包括内部错误（ERROR）和任何客户端接收到的安全性debug信息（INFO），设置为DEBUG将会打开诊断日志，设置为NONE禁止所有日志。

参数
logLevel `Logger.Level` 所需最低的日志等级。

返回值
void

----

## setDebugLogComponents()

定义
void setDebugLogComponents(List<String> debugComponents)

说明 
主要用于debug调试.限制debug输出到指定组件。默认为null，允许所有组建的日志;  显式设置也会把等级设置为DEBUG。
参数
debugComponents `List<String> ` 一系列日志需要的组件，或者设置为null使所有组件可行。

返回值
void

----

## setAuthenticationServer()

定义
void setAuthenticationServer(String host)

说明 
设置主机可以被用户登录认证。如果你不确定，不要使用此设置。
参数
host `String` 用于认证的server。

返回值
void

----

## setSessionPersistenceKey()

定义
void setSessionPersistenceKey(String sessionKey)

说明 
为Ｗilddog连接设置session的标识符，使用session标识符可以使多个认证会话在一个设备上共存。如果一个设备上只有一个用户没有必要使用此方法。

参数
sessionKey `String` 用于标识session的标识符名称。

返回值
void




