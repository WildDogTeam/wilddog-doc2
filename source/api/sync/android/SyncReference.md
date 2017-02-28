title:  SyncReference
---
`SyncReference` 实例表示要操作的特定数据节点，可以通过 `SyncReference` 实例操作和读取数据。`SyncReference` 是 `wilddog.sync.Query` 的子类。

## 属性
### getSync()

**定义**

```java
public  WilddogSync getSync()
```

**说明**

获取创建当前 SyncReference 实例的 WilddogSync 实例。


**返回值**

`WilddogSync` 实例。
</br>

---
### getKey()

**定义**

```java
public  String getKey()
```

**说明**

获取当前节点的名称。


**返回值**

`String` 节点名称。

**示例**

```java

SyncReference ref = WilddogSync.getInstance().getReference("test");
//当前节点为 '/test/a/b'
SyncReference refChild = ref.child("a").child("b");
//获取当前节点的key值，key="b";
String key = refChild.getKey();

```
</br>

---
### getParent()

**定义**

```java
public  SyncReference getParent()
```

**说明**

获取当前节点的父节点引用。注意，如果当前节点是 root 节点（根节点），返回的依然是 root 节点（根节点）的引用。


**返回值**

`SyncReference` 父节点的引用。

**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("test/a");

// 获得 '/test' 路径的引用
SyncReference ref2 = ref.getParent();

// 到达 root
SyncReference ref3 = ref.getParent().getParent();

```

</br>

---
### getRoot()

**定义**

```java
public  SyncReference getRoot()
```

**说明**

获取当前节点的 root 节点（根节点）引用。使用此方法可以直接获取到当前子节点的根节点引用，等价于多次调用 `getParent()` 方法获取 root 节点（根节点）。

**返回值**

root 节点（根节点）的引用。
</br>

---



## 方法

### child()

**定义**

```java
public  SyncReference child(String path)
```

**说明**
获得一个在指定路径节点处的 SyncReference 对象。
根据相对路径 `path`，来获取当前节点下 `/path` 子节点的引用。
相对路径可以是一个简单的节点名字（例如: `fred`），或者是一个更深的路径（例如: `fred/name/first`）。


**参数**

参数名 | 描述
--- | ---
path | `String` path 为相对路径，多层级间需要使用 `/` 分隔，例如 `a/b` 。如果 path 为空或 null 则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如 `a`。如果定位的 path 不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。


**返回值**

`SyncReference` 子节点引用。

**示例**

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
//ref 表示 'https://<appId>.wilddogio.com/test' 节点
SyncReference ref = WilddogSync.getInstance().getReference("test");

// 定位到 '/test/a'
SyncReference ref2 = ref.child("a");

// 定位到 '/test/a/b'
SyncReference ref3 = ref.child("a/b");
SyncReference ref4 = ref.child("a").child("b");

```


</br>

---
### setValue(value)

**定义**

```java
   void setValue(Object value)
```

**说明**

将数据写入当前节点，覆盖当前节点的数据，包括所有子节点。如果当前是叶子节点，那么它的值会被改变成 `value`；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为 `value`。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述
 --- | ---
  value |value 的类型可以为 String、Number、Boolean、null、Map 或满足 JavaBean 规范的实体。当 value 为 String、Number、Boolean 时，等价于当前节点的 `updateChildren()` 操作。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作。当 value 为 Map 或 JavaBean 时，将 value 转为一颗子树替换当前 value。



**示例**

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
</br>

---
### setValue(value, listener)

**定义**

```java
   void setValue(Object value, SyncReference.CompletionListener listener)
```

**说明**

将数据写入当前节点，覆盖当前节点的数据，包括所有子节点。如果当前是叶子节点，那么它的值会被改变成 `value`；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为 `value`。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述
 --- | ---
  value |value 的类型可以为 String、Number、Boolean、null、Map 或满足 JavaBean 规范的实体。当 value 为 String、Number、Boolean 时，等价于当前节点的 `updateChildren()` 操作。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作。当 value 为 Map 或 JavaBean 时，将 value 转为一颗子树替换当前 value。
 listener | `CompletionListener` listener 包含一个 callback 函数，用户可以实现 `onComplete` 函数，如果某个 callback 函数没有响应的处理，接口实现为`{}`函数即可。`setValue(value)` 等价于 `setValue(value, null)`。


**示例**

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
</br>

---
### setValue(value, priority,listener)

**定义**

```java
   void setValue(Object value, Object priority, SyncReference.CompletionListener listener)
```

**说明**

将数据写入当前节点，覆盖当前节点的所有数据，同时为当前节点设置优先级。如果当前是叶子节点，那么它的值会被改变成 `value`；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为 `value`。

该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述
 --- | ---
  value |value 的类型可以为 String、Number、Boolean、null、Map 或满足 JavaBean 规范的实体。当 value 为 String、Number、Boolean 时，等价于当前节点的 `updateChildren()` 操作。当 value 为 null 时，等价于当前节点的 `removeValue()` 操作。当 value 为 Map 或 JavaBean 时，将 value 转为一颗子树替换当前 value。
priority |`Object` 指定节点的优先级。
 listener | `CompletionListener` listener 包含一个 callback 函数，用户可以实现 `onComplete` 函数，如果某个 callback 函数没有响应的处理，接口实现为`{}`函数即可。`setValue(value)` 等价于 `setValue(value, null)`。



**示例**

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
</br>

---
### push()

**定义**

```java
SyncReference push()
```

**说明**

在当前节点下生成一个 20 位的唯一 key 值（例如：-KdzI7I-AsBST9NlasJM）子节点，并返回子节点的引用。
子节点的 key 值使用服务端的当前时间生成，Wilddong Sync SDK 保证 key 值唯一且有序。

**返回值**

`SyncReference` 新生成子节点的引用对象。

**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("push");

// 添加一个数值，将生成一个新 ID， 返回的 path 为“/push/-KdzI7I-AsBST9NlasJM”
SyncReference newRef = ref.push();
//操作结果为在 'push' 节点下写入 {"-KdzI7I-AsBST9NlasJM":100}
newRef.setValue(100);

// 添加一个实体
DOTAHero hero = new DOTAHero();
hero.setName("Nevermore");
hero.setHp(435);
hero.setMp(234);
ref.child("heros").push().setValue(hero);

```
</br>

---
### updateChildren(value)

**定义**

```java
  void updateChildren(Map value)
```

**说明**

对当前节点进行数据合并操作，更新当前节点下的数据。与 `setValue` 方法覆盖当前节点下所有数据的方式不同，使用 `updateChildren` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述
 --- | ---
  value |`Map<String, Object>` 当 value 为 null 时，等价于 `removeValue()` 操作。


**示例**
```java
SyncReference ref = WilddogSync.getInstance().getReference("test");

// 更新子树
Map<String, String> children = new HashMap<String, String>();
children.put("c", "cval");
ref.child("a/b").updateChildren(children);
```
</br>

---
### updateChildren(value, listener)

**定义**

```java
void updateChildren(Map<String, Object> value, SyncReference.CompletionListener listener)
```

**说明**

对当前节点进行数据合并操作，更新当前节点下的数据。与 `setValue` 方法覆盖当前节点下所有数据的方式不同，使用 `updateChildren` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。修改完成后将会触发 'CompletionListener' 的 'onComplete' 方法。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述
 --- | ---
  value |`Map<String, Object>` 当 value 为 null 时，等价于 `removeValue()` 操作。
listener |`CompletionListener` listener 包含一个回调函数 `onComplete`，如果执行完成，`onComplete` 函数将会被调用。


**示例**
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
</br>

---
### setPriority(priority)

**定义**

```java
void setPriority(Object priority)
```

**说明**

   设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照 key 排序）。
   你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用 setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用 setPriority。

   节点按照如下规则排序：
   - 没有 priority 的排最先。
   - 有数字 priority 的次之，按照数值排序。
   - 有字符串 priority 的排最后，按照字母表的顺序排列。
   - 当两个子节点有相同的 priority（包括没有 priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

   注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，Key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。

**参数**

   参数名 | 描述
   --- | ---
   priority |`Object` 指定节点的优先级。

   </br>

   ---
### setPriority(object, listener)

**定义**

   ```java
void setPriority(Object object, SyncReference.CompletionListener listener)
   ```

**说明**

设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照 key 排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用 setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用 setPriority。

节点按照如下规则排序：
- 没有 priority 的排最先。
- 有数字 priority 的次之，按照数值排序。
- 有字符串 priority 的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，Key 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。

**参数**

参数名 | 描述
--- | ---
priority |`Object` 指定节点的优先级。
 listener |`CompletionListener`

</br>

---

### removeValue()

**定义**

```java
void removeValue()
```

**说明**

删除当前节点，等价于在当前节点下调用 `setValue(null)` 方法。
如果设置了其他数据监听，删除成功后将触发 `ChildEventListener` 的 ChildRemoved 事件,触发 `ValueEventListener` 的 Change 事件。
该函数是线程安全的，将阻塞其他的本地数据操作。


**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
//将删除路径 '/test/a/b' 下的所有数据，如果 'test/a' 节点下只有 '/b' 一个节点，则会连带删除 '/b' 节点
ref.child("a/b").removeValue();

```
</br>

---
### removeValue(listener)

**定义**

```java
void removeValue(SyncReference.CompletionListener listener)
```

**说明**

删除当前节点，等同于在当前节点下调用 `setValue(null)` 方法，删除成功后将触发 `CompletionListener` 的 `onComplete` 事件。
如果设置了其他数据监听，删除成功后也会触发 `ChildEventListener` 的 `ChildRemoved` 事件,触发 `ValueEventListener` 的 `Change` 事件。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

参数名 | 描述
--- | ---
listener | listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。



**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
ref.child("a/b").removeValue(new SyncReference.CompletionListener() {
                                         @Override
                                         public void onComplete(SyncError syncError, SyncReference syncReference) {
                                             if(syncError!=null){
                                             // 移除数据失败
                                             }else{
                                               // 移除数据成功
                                             }
                                         }
                                     });

```
</br>

---
### runTransaction(handler)

**定义**

```java
void runTransaction(Transaction.Handler handler)
```

**说明**

使用事务解决并发修改当前节点数据冲突问题。
与 `setValue()` 直接覆盖以前的数据不同，`runTransaction()` 能够确保不同客户端并发修改时，防止数据冲突出错。 
如果事务处理被拒绝，则服务器会将当前值返回到客户端，然后客户端使用更新后的值再次运行事务处理。


**参数**

参数名 | 描述
--- | ---
handler |Transaction.Handler



**示例**

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
</br>

---

### onDisconnect()

**定义**

```java
public  OnDisconnect onDisconnect()
```

**说明**

获取一个 `OnDisconnect` 的实例对象。
当客户端断开连接后，将会触发设置在当前 `OnDisconnect` 实例上的 'setValue()/updateChildren()/removeValue()/cancel()' 等方法。

**返回值**


[OnDisconnect](/api/sync/android/OnDisconnect.html) 实例对象。

**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("onDisconnect");

// 断开连接后清除 ref 引用下的所有数据
ref.onDisconnect().removeValue();;

// 断开连接后将 ref 引用下的数据设置为 "onDisconnected."
ref.onDisconnect().setValue("onDisconnected.");

```

</br>

---
### goOffline()

**定义**

```java
public  static void goOffline()
```

**说明**

断开与 Wilddog Sync 后台服务器的连接。执行 `goOffline()` 操作后，会关闭自动重连机制，所有数据操作都在本地执行，不会影响到网络数据。
同时不会接收任何网络数据变化，直到恢复连接。
注意：调用此方法会影响到所有 Sync 连接。

</br>

---
### goOnline()

**定义**

```java
public  static void goOnline()
```

**说明**

恢复与 Wilddog Sync 后台服务器的连接，开启自动重连机制。在关闭连接期间发生的所有本地数据变化，都将在网络连接恢复后与网络数据比对，进行数据合并。
注意：调用此方法会影响到所有 Sync 连接。

</br>

---
