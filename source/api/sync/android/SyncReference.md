title:  SyncReference
---

## 方法

### child()

**定义**

```java
public  SyncReference child(String path)
```

**说明**

根据相对路径，来获取当前节点下子节点的引用。

**参数**

参数名 | 描述 |
--- | --- |
path | `String` path 为相对路径，多层级间需要使用"/"分隔，例如“a/b”。如果path为空或null则返回当前引用。如果直接选取下一级节点，可以使用无分隔符(/)的节点名称表示，例如“a”。如果定位的path不存在，依然可以定位，后续数据操作的时候，将延迟动态创建不存在的路径节点。
|

**返回值**

`SyncReference` 子节点引用。

**示例**

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


</br>

---
### getSync()

**定义**

```java
public  WilddogSync getSync()
```

**说明**

根据这个引用获得 WilddogSync 实例。


**返回值**

WilddogSync 实例。
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
</br>

---
### getParent()

**定义**

```java
public  SyncReference getParent()
```

**说明**

获取父节点的引用。如果当前节点就是root节点，方法执行后返回的依然是root节点的引用。


**返回值**

`SyncReference` 父节点的引用。

**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("test/a");

// 获得'/test' 路径的引用
SyncReference ref2 = ref.getParent();

// 到达root
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

获取根节点的引用。

**返回值**

根节点的引用。
</br>

---
### goOffline()

**定义**

```java
public  static void goOffline()
```

**说明**

手动关闭连接，关闭自动连接。
注意：调用此方法会影响到所有 Sync 连接。

</br>

---
### goOnline()

**定义**

```java
public  static void goOnline()
```

**说明**

手动建立连接，开启自动重连。
注意：调用此方法会影响到所有 Sync 连接。

</br>

---
### onDisconnect()

**定义**

```java
public  sOnDisconnect onDisconnect()
```

**说明**

当客户端断开连接后，保证在地址上的数据被设置到一个指定的值。

**返回值**

当前节点执行断开连接操作的对象。
</br>

---
### push()

**定义**

```java
SyncReference	 push()
```

**说明**

在当前节点下生成一个子节点，并返回子节点的引用。子节点的key利用服务端的当前时间生成，可作为排序使用。

**返回值**

`SyncReference` 新生成子节点的引用对象。

**示例**

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
</br>

---
### removeValue()

**定义**

```java
void removeValue()
```

**说明**

删除当前节点。 删除成功后将触发Change，ChildRemoved事件。
该函数是线程安全的，将阻塞其他的本地数据操作。


**示例**

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
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

删除当前节点。 删除成功后将触发Change，ChildRemoved事件。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

参数名 | 描述 |
--- | --- |
listener | listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。|



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

在当前路径下，自动修改数据。与 set() 不同，直接覆盖以前的数据，runTransaction() 能够确保不同客户端同时修改，没有冲突。

**参数**

参数名 | 描述 |
--- | --- |
handler |Transaction.Handler|



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
### setPriority(priority)

**定义**

```java
void setPriority(Object priority)
```

**说明**

   设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
   你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

   节点按照如下规则排序：
   - 没有priority的排最先。
   - 有数字priority的次之，按照数值排序。
   - 有字符串 priority的排最后，按照字母表的顺序排列。
   - 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

   注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

**参数**

   参数名 | 描述 |
   --- | --- |
   priority |`Object` 指定节点的优先级。|

   </br>

   ---
### setPriority(object, listener)

**定义**

   ```java
void setPriority(Object object, SyncReference.CompletionListener listener)
   ```

**说明**

设置 Wilddog Sync 当前节点的优先级。优先级被用来排序（如果没有指定优先级，子节点按照key排序）。
你不能对一个不存在的节点设置优先级。因此，当为新数据设置指定的优先级的时候，使用setValue(data, priority)； 当为已存在的数据指定优先级的时候，使用setPriority。

节点按照如下规则排序：
- 没有priority的排最先。
- 有数字priority的次之，按照数值排序。
- 有字符串 priority的排最后，按照字母表的顺序排列。
- 当两个子节点有相同的 priority（包括没有priority），它们按照名字进行排列，数字排在最先（按数值大小排序），其他的跟在后面(以字典序排序)。

注意：数值优先级被作为IEEE 754双精度浮点型数字进行解析和排序，Key以String类型进行存储，只有当它能被解析成32位整型数字时被当作数字来处理。

**参数**

参数名 | 描述 |
--- | --- |
priority |`Object` 指定节点的优先级。|
 listener |CompletionListener|

</br>

---
### setValue(value)

**定义**

```java
   void setValue(Object value)
```

**说明**

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述 |
 --- | --- |
  value |value的类型可以为String、Number、Boolean、null、Map或满足JavaBean规范的实体。
                当value为String、Number、Boolean时，等价于当前节点的`updateChildren()`操作。
                当value为null时，等价于当前节点的`removeValue()`操作。
                当value为Map或JavaBean时，将value转为一颗子树替换当前value。|



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

给当前节点赋值。如果当前是叶子节点，那么它的值会被改变成value；如果当前是非叶子节点，那么它的子节点将会被删除，当前节点将变成叶子节点，同时被赋值为value。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述 |
 --- | --- |
  value |`Object` value的类型可以为String、Number、Boolean、null、Map或满足JavaBean规范的实体。
         当value为String、Number、Boolean时，等价于Path对应的Node的`updateChildren()`操作。
         当value为null时，等价于Path对应的Node的`removeValue()`操作。
         当value为Map或JavaBean时，将value转为一颗子树替换当前value。|
 listener | `CompletionListener` listener包含一个callback函数，用户可以实现`onComplete`函数，如果某个callback函数没有响应的处理，接口实现为`{}`函数即可。`setValue(value)`等价于`setValue(value, null)`。 |


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

### updateChildren(value)

**定义**

```java
  void updateChildren(Map value)
```

**说明**

对子节点进行合并操作。不存在的子节点将会被新增，存在子节点将会被替换。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述 |
 --- | --- |
  value |`Map<String, Object>` 当value为null时，等价于`removeValue()`操作。|


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
### updateChildren(update, listener)

**定义**

```java
void updateChildren(Map<String, Object> update, SyncReference.CompletionListener listener)
```

**说明**

对子节点进行更新操作。不存在的子节点将会被新增，存在子节点将会被替换。
该函数是线程安全的，将阻塞其他的本地数据操作。

**参数**

 参数名 | 描述 |
 --- | --- |
  value |`Map<String, Object>` 当value为null时，等价于`removeValue()`操作。|
listener |`CompletionListener` listener包含一个回调函数`onComplete`，如果执行完成，`onComplete`函数将会被调用。|


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