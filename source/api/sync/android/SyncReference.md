title:  SyncReference
---
`SyncReference` 实例表示要操作的特定数据节点，可以通过 `SyncReference` 实例操作和读取数据。`SyncReference` 是 [Query](/api/sync/android/Query.html) 的子类。

## 方法


### child()

##### 定义

```java
public  SyncReference child(String path)
```

##### 说明
获得一个在当前节点下指定路径节点处的 `SyncReference` 实例。
根据相对路径 path，来获取当前节点下 path 子节点的引用。
相对路径可以是一个简单的节点路径（例如: "fred"），或者是一个更深的路径（例如: "fred/name/first"）。


##### 参数

参数名 | 说明
--- | ---
path | `String` path 为相对路径，深层路径多层级间需要使用 "/" 分隔，例如 "a/b" 。如果 path 为空字符串或 null 则返回当前引用。如果定位的 path 不存在，依然可以定位，将在后续数据操作时创建不存在的路径节点引用。


##### 返回值

`SyncReference` 子节点引用。

##### 示例

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

##### 定义

```java
   void setValue(Object value)
```

##### 说明

向指定节点写入数据。此方法会先清空指定节点，再写入数据。

支持的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
Wliddog Sync 没有对数组的原生支持，但是支持以数组下标作为 key ，数组元素作为 value 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 key（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 `ArrayList` 类型;
如果不满足条件，`Wilddog Sync` 处理数据时会将其转换为 `Map` 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null 当 value 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
  value |`value` 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
  

##### 示例

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

##### 定义

```java
   void setValue(Object value, SyncReference.CompletionListener listener)
```

##### 说明

向指定节点写入数据并设置操作完成监听。此方法会先清空指定节点，再写入数据。
`setValue` 操作执行完成后将触发操作完成监听 `listener` 的 `onComplete` 方法。

支持写入的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
`Wliddog Sync` 没有对数组的原生支持，但是支持以数组下标作为 `key` ，数组元素作为 `value` 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 `key`（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 `ArrayList` 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。

##### 参数

 参数名 | 说明
 --- | ---
 value |`value` 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
 listener | [CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。`setValue` 操作完成回调。`setValue(value，null)` 等价于 `setValue(value)`。


##### 示例

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

##### 定义

```java
   void setValue(Object value, Object priority, SyncReference.CompletionListener listener)
```

##### 说明


向指定节点写入数据和[数据优先级](/api/sync/android/SyncReference.html#setPriority)，并设置数据完成监听。此方法会先清空指定节点，再写入数据。
`setValue` 操作执行完成后将触发 `listener` 的 `onComplete` 方法。

支持写入的数据类型：
 - String、 Number、 Boolean 等基本数据类型;
 - 数组 ArrayList;
`Wliddog Sync` 没有对数组的原生支持，但是支持以数组下标作为 `key` ，数组元素作为 `value` 的方式进行存储。
例如：
```java
        String[] strList = new String[6];
        strList[0] = "a";
        strList[2] = "b";
        strList[3] = "c";
        strList[5] = "d";
        //在数据库中存储为DataSnapshot { key = list, value = {0=a, 2=b, 3=c, 5=d} }
        ref.child("list").setValue(strList);
```
在数据监听中获取数据时，如果满足条件：当 0 到最大的 `key`（比如 n ） 之间，n+1 个元素中超过一半以上有值，数据将被转换为 `ArrayList` 类型;
如果不满足条件，Wilddog Sync 处理数据时会将其转换为 Map 类型。
 - 自定义数据类型，满足 JavaBean 规范的实体;
 - null，当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。


##### 参数

 参数名 | 说明
 --- | ---
 value |`value` 的类型可以为 null、String、Number、Boolean、List、Map 或满足 JavaBean 规范的实体。当 `value` 为 null 时，等价于当前节点的 `removeValue()` 操作，会删除当前节点。
priority |`Object` 指定节点的优先级，类型可以为 Boolean、Number 或 String。
listener |[CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。`setValue` 操作完成回调。`setValue(value，null)` 等价于 `setValue(value)`。




##### 示例

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

##### 定义

```java
SyncReference push()
```

##### 说明
向当前节点添加子节点。新增子节点的 `key` 自动生成并保证唯一（例如：“-KdzI7I-AsBST9NlasJM”）。 
 `key` 值基于时间戳和随机算法生成，并可以按照时间先后进行排序。

##### 返回值

`SyncReference` 新增子节点的引用。

##### 示例

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

##### 定义

```java
  void updateChildren(Map value)
```

##### 说明

对当前节点进行数据合并操作，更新当前节点下的数据。
与 `setValue` 方法覆盖当前节点下所有数据的方式不同，使用 `updateChildren` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。


##### 参数

 参数名 | 说明
 --- | ---
  value |`Map<String, Object>` 当 `value` 为 null 时，等价于 `removeValue` 操作。


##### 示例
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

##### 定义

```java
void updateChildren(Map<String, Object> value, SyncReference.CompletionListener listener)
```

##### 说明

对当前节点进行数据合并操作，更新当前节点下的数据。
与 `setValue` 方法覆盖当前节点下所有数据的方式不同，使用 `updateChildren` 方法，不存在的子节点将会被新增，存在的子节点将会被更新。
使用此方法可以对同一节点的子节点同时进行更新和删除操作。

##### 参数

 参数名 | 说明
 --- | ---
  value |`Map<String, Object>` 当 `value` 为 null 时，等价于 `removeValue` 操作。
listener | [CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。`setValue` 操作完成回调。`setValue(value，null)` 等价于 `setValue(value)`。


##### 示例
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

<div id="setPriority"></div>
### setPriority(priority)

##### 定义

```java
void setPriority(Object priority)
```

##### 说明

   设置当前节点的优先级，支持为每个节点设置优先级 (priority)，用于实现节点按优先级排序。优先级是节点的隐藏属性，默认为 null。
   不能为不存在的节点设置优先级。因此，新增数据需要设置优先级时，请使用 `setValue(data, priority)`；为已存在的数据设置优先级的时，使用 `setPriority(priority)`。

   节点按照如下优先级规则升序排列：null < Number < String。
 
   - priority 为 null 的排最先；
   - priority 为数值的次之，按照数值从小到大排序；
   - priority 为字符串的排最后，按照字典序排列。
   - 当两个子节点有相同的 priority（包括没有 priority），它们按照 `key` 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。

   注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，`Key` 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。

##### 参数

   参数名 | 说明
   --- | ---
   priority |`Object` 指定节点的优先级。

   </br>

   ---
### setPriority(object, listener)

##### 定义

   ```java
void setPriority(Object object, SyncReference.CompletionListener listener)
   ```

##### 说明

设置当前节点的优先级，支持为每个节点设置优先级 (priority)，用于实现节点按优先级排序。优先级是节点的隐藏属性，默认为 null。
   不能为不存在的节点设置优先级。因此，新增数据需要设置优先级时，请使用 `setValue(data, priority)`；为已存在的数据设置优先级的时，使用 `setPriority(priority)`。

   节点按照如下优先级规则升序排列：null < Number < String。
 
   - priority 为 null 的排最先；
   - priority 为数值的次之，按照数值从小到大排序；
   - priority 为字符串的排最后，按照字典序排列。
   - 当两个子节点有相同的 priority（包括没有 priority），它们按照 `key` 进行排列，数字优先（按数值从小到大排序），其余以字典序排序。

   注意：数值优先级被作为 IEEE 754 双精度浮点型数字进行解析和排序，`Key` 以 String 类型进行存储，只有当它能被解析成 32 位整型数字时被当作数字来处理。

##### 参数

参数名 | 说明
--- | ---
priority |`Object` 指定节点的优先级。
 listener |[CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。

</br>

---

### removeValue()

##### 定义

```java
void removeValue()
```

##### 说明

删除当前节点，等价于在当前节点下调用 `setValue(null)` 方法。


##### 示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("test");
//将删除路径 '/test/a/b' 下的所有数据，如果 'test/a' 节点下只有 '/b' 一个节点，则会连带删除 '/b' 节点
ref.child("a/b").removeValue();

```
</br>

---
### removeValue(listener)

##### 定义

```java
void removeValue(SyncReference.CompletionListener listener)
```

##### 说明

删除当前节点，等价于在当前节点下调用 `setValue(null)` 方法。

##### 参数

参数名 | 说明
--- | ---
listener |[CompletionListener](/api/sync/android/SyncReference.CompletionListener.html) 类型。`removeValue` 操作完成回调。



##### 示例

```java
        SyncReference ref = WilddogSync.getInstance().getReference("test");
        ref.child("a/b").removeValue(new SyncReference.CompletionListener() {
            @Override
            public void onComplete(SyncError syncError, SyncReference syncReference) {
                if (syncError != null) {
                    // 移除数据失败
                } else {
                    // 移除数据成功
                }
            }
        });

```
</br>

---
### runTransaction(handler)

##### 定义

```java
void runTransaction(Transaction.Handler handler)
```

##### 说明

用于多客户端并发写入操作时保证数据一致性，可以避免并发修改当前节点时的数据冲突。
与 `setValue()` 直接覆盖以前的数据不同，在不同客户端并发修改时，`runTransaction()` 不会单纯覆盖节点数据。
客户端提交事务至服务器，如果数据已被其他客户端修改，那么服务器会拒绝当前操作，并将新值返回到客户端，客户端使用新值再次运行事务处理。
在 `runTransaction()` 的执行过程中客户端可能会重复写入直到成功，也可以在执行过程中调用 `Transaction.abort()` 手动中止事务。
##### 参数

参数名 | 说明
--- | ---
handler |[Transaction.Handler](/api/sync/android/Transaction.Handler.html) 类型。



##### 示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("/android/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");

upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }

        return Transaction.success(currentData); // 向云端提交数据。也可以调用 Transaction.abort() 中止事务
    }

    public void onComplete(SyncError wilddogError, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});

```
</br>

---

### onDisconnect()

##### 定义

```java
public  OnDisconnect onDisconnect()
```

##### 说明

获取一个 `OnDisconnect` 的实例。
云端与客户端断开连接后，将在当前 `OnDisconnect` 实例上自动触发离线事件。
断开连接包括客户端主动断开连接，或者意外的网络中断。离线事件即执行特定的数据操作，支持离线写入、更新和删除数据。

##### 返回值

[OnDisconnect](/api/sync/android/OnDisconnect.html) 实例。

##### 示例

```java
SyncReference ref = WilddogSync.getInstance().getReference("onDisconnect");

// 断开连接后清除 ref 引用下的所有数据
ref.onDisconnect().removeValue();;

// 断开连接后将 ref 引用下的数据设置为 "onDisconnected."
ref.onDisconnect().setValue("onDisconnected.");

```

</br>

---

### getSync()

##### 定义

```java
public  WilddogSync getSync()
```

##### 说明

通过当前 `SyncReference` 实例获取相关的 `WilddogSync` 实例。


##### 返回值

[WilddogSync](/api/sync/android/WilddogSync.html) 实例。
</br>

---
### getKey()

##### 定义

```java
public  String getKey()
```

##### 说明

获取当前节点的 key 值。


##### 返回值

`String` 节点 key 值。

##### 示例

```java

SyncReference ref = WilddogSync.getInstance().getReference("test");
//当前节点为 '/test/a/b'
SyncReference refChild = ref.child("a").child("b");
//获取当前节点的 key 值，key = "b";
String key = refChild.getKey();

```
</br>

---
### getParent()

##### 定义

```java
public  SyncReference getParent()
```

##### 说明

获取当前节点的父节点引用。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果当前节点是根节点，返回的依然是根节点的引用。
</blockquote>



##### 返回值

`SyncReference` 父节点的引用。

##### 示例

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

##### 定义

```java
public  SyncReference getRoot()
```

##### 说明

获取根节点的引用。使用此方法可以直接获取到当前子节点的根节点引用，等价于多次调用 `getParent()` 方法获取根节点。

##### 返回值

`SyncReference` 根节点的引用。
</br>

---
### goOffline()

##### 定义

```java
public  static void goOffline()
```

##### 说明

手动断开与云端的连接。执行 `goOffline()` 操作后，会关闭自动重连机制，所有数据操作都在本地执行，不会影响到网络数据。
同时不会接收任何网络数据变化，直到恢复连接。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  调用此方法会影响到所有 `WilddogApp` 的 `WilddogSync` 连接。
</blockquote>

</br>

---
### goOnline()

##### 定义

```java
public  static void goOnline()
```

##### 说明

手动恢复与云端的连接，开启自动重连机制。在关闭连接期间发生的所有本地数据变化，都将在网络连接恢复后与网络数据比对，进行数据合并。
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  调用此方法会影响到所有 `WilddogApp` 的 `WilddogSync` 连接。
</blockquote>

</br>


