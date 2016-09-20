title:  操作数据
---

本篇文档介绍操作数据的方法。

以下四种方法用于操作数据：

方法 |  说明 
----|------
setValue() | 将数据写入到指定的路径，如果指定路径已存在数据，那么数据将会被覆盖。 
push() | 在当前路径下新增一个子节点, 并返回子节点的实例。这个子节点的 key 是利用服务端的当前时间生成的随机字符串, 与 setValue() 配合使用，用于将数据新增到此路径下。
updateChildren() | 对子节点进行合并操作。不存在的子节点将会被新增，存在的子节点将会被替换。
runTransaction() | 提供事务性更新，用于并发更新操作的场景。

## 写入数据

使用 `setValue()` 向某个节点写入数据。若节点已有数据，原有数据会被覆盖，包括其子节点的数据。
`setValue()`  可以传入数据类型有 `string`, `number`, `boolean`, `null`, `map` 或满足 JavaBean 规范的实体做为参数。
例如，存入 ｀Jone` 的 ｀name｀ 和 ｀age｀：

```java
    // 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    // 获取 SyncReference 实例
    SyncReference ref = WilddogSync.getInstance().getReference();
    // 创建 Map 对象
    HashMap<String, Object> jone = new HashMap<>();
    jone.put("name", "Jone");
    jone.put("age", "23");
    // child() 用来定位到某个节点。
    ref.child("Jone").setValue(jone);
```

你可以使用 setValue() 的第二个参数来获取操作的结果：

```java
    ref.child("Jone").setValue(jone, new SyncReference.CompletionListener() {
        @Override
        public void onComplete(SyncError error, SyncReference ref) {
            if (error != null) {
                Log.d("error", error.toString());
            } else {
                Log.d("success", "setValue success");
            }
        }
    });
```
## 追加子节点
多个用户同时在一个节点下新增子节点时，如果子节点的 key 已存在，之前的数据会被覆盖。可以通过 push() 解决这个问题。

`push` 生成唯一 ID 作为 key ，它保证每条数据的 key 一定不同。这个 key 基于时间戳和随机算法生成，即使生成在同一毫秒也不会重复，将按时间先后标明。

使用 `push` 追加内容：
```java
SyncReference postsRef = ref.child("posts");
HashMap<String, Object> aNews = new HashMap<>();
aNews.put("author", "gracehop");
aNews.put("title", "Announcing COBOL, a New Programming Language");
postsRef.push().setValue(aNews);
HashMap<String, Object> anotherNews = new HashMap<>();
anotherNews.put("author", "alanisawesome");
anotherNews.put("title", "The Turing Machine");
postsRef.push().setValue(anotherNews);
```
产生的数据如下：
```json
{

  "posts": {
    "-JRHTHaIs-jNPLXO": {
      "author": "gracehop",
      "title": "Announcing COBOL, a New Programming Language"
    },

    "-JRHTHaKuITFIhnj": {
      "author": "alanisawesome",
      "title": "The Turing Machine"
    }
  }
}
```
可以看到，每个数据都有一个唯一 ID 作为数据的 key 。

**获取唯一ID**

你可以通过调用 `getKey()` 来获取这个唯一 ID ：

```java
HashMap<String, Object> news = new HashMap<>();
news.put("author", "gracehop");
news.put("title", "Announcing COBOL, a New Programming Language");
SyncReference newPostsRef = postsRef.push().setValue(news);
// 获取 push() 生成的唯一 ID
String postID = newPostRef.getKey();
```

## 更新数据

如果想只更新指定子节点，而不影响其它的子节点，可以使用 `updateChildren()`方法:
```json
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}
```
```java
// 只更新 gracehop 的 nickname
SyncReference hopperRef = ref.child("gracehop");
HashMap<String, Object> user = new HashMap<>();
user.put("nickname", "Amazing grace");
hopperRef.updateChildren(user);
```
如果用 `setValue()` 而不是 `updateChildren()`，那么 `date_of_birth` 和 `full_name` 都会被删除。

**多路径更新**

`updateChildren` 也支持多路径更新，即可以同时更新不同路径下的数据。用法上有些特殊，举例如下:

```json
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}
```

```java
// 同时更新 b 节点下的 d，和 x 节点下的 z
HashMap<String, Object> map = new HashMap<>();
map.put("b/d", "updateD");
map.put("x/z", "updateZ");
ref.updateChildren(map);
```

可以看到，标识路径时，要用 `b/d`, 和 `x/z` ,而**不能**这样写：

```java
// 错误的多路径更新写法！！
Map<String,Map<String,String>> map = new HashMap<>();
Map<String,String> bMap = new HashMap<>();
Map<String,String> xMap = new HashMap<>();
map.put("b", bMap.put("d","updateD");
map.put("x", xMap.put("z","updateZ");
ref.updateChildren(map);
```
以上相当于 `setValue()` 操作，会覆盖以前数据。

## 删除数据

删除数据最简单的方法是调用 `removeValue()`。

```
HashMap<String, Object> map = new HashMap<>();
map.put("name", "Jone");
map.put("age", "23");
ref.setValue(map);

//删除上面写入的数据
ref.removeValue();
```

此外，还可以通过写入 null 值（例如，`setValue(null)` 或 `updateChildren(null)`）来删除数据。 

**注意**：Wilddog 不会保存值为 null 节点。如果某节点的值被设为 null，云端就会把这个节点删除。

## 事务操作

处理可能因并发更新而损坏的数据（例如，增量计数器）时，可以使用事务操作。你可以为此操作提供更新函数和完成后的回调（可选）。

比如要实现一个记录点赞数量的功能，可能存在多人同时点赞的情况，就可以这样写一个事务：

```java

SyncReference upvotesRef = WilddogSync.getInstance().getReference("/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");
upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }

        return Transaction.success(currentData); 
        // 也可以这样中止事务 Transaction.abort()
    }
    public void onComplete(SyncError error, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});

```

我们使用 `currentValue || 0` 来判断计数器是否为空或者是自增加。 如果上面的代码没有使用事务, 那么两个客户端同时试图累加时，结果可能是为数字 1 而非数字 2。

注意：`transaction()` 可能被多次被调用，必须处理 currentData 变量为 null 的情况。

当执行事务时，云端有数据存在，但是本地可能没有缓存，此时 currentData 为 null。

**事务操作原理**

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等。

如果相等，则更新数据为你提交的数据；如果不相等，则返回新的当前值。更新函数将使用新的当前值和你提交的数据重复尝试更新，直到成功为止。


更多使用，请参考 [transaction()](/api/sync/android.html#transaction)。

























































我们添加一些用户，为每个用户保存唯一的用户名，同时保存全名和出生日期。由于每个用户的用户名都是独一无二的，所以最好使用  `setValue()` 方法，而不是 `push()` 方法，因为我们已经有了独一无二的用户名作为 key 值，不需要在添加的时候重新生成唯一标识。










首先，我们编写 User 类代码，将 User 对象以用户名作为 key 值添加到 Map 中。然后，为用户数据所在路径创建引用，调用 `setValue()` 方法将 Map 中的每个用户添加到数据库中。

```java
public class User {
    private int birthYear;
    private String fullName;

    public User() {}

    public User(String fullName, int birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    public long getBirthYear() {
        return birthYear;
    }

    public String getFullName() {
        return fullName;
    }
}

User alanisawesome = new User("Alan Turing", 1912);
User gracehop = new User("Grace Hopper", 1906);

Map<String, User> users = new HashMap<String, User>();
users.put("alanisawesome", alanisawesome);
users.put("gracehop", gracehop);

SyncReference usersRef = ref.child("users");

usersRef.setValue(users);
```
我们可以向setValue()方法传入自定义的Java对象作为参数，但需要**满足**如下条件：

- 对象所属的类中存在默认的构造方法;
- 类中所有需要写入数据库的属性都有getter方法。

我们使用 Map 将数据保存到数据库中，因为 Map 中的元素会自动映射成为 JSON 对象，并保存到指定路径。现在，我们再次访问示例应用的[数据预览](https://samplechat.wilddogio.com/android/saving-data/wildblog/users)来预览数据，就可以看到上面示例代码中保存的数据。

还有一种等价的操作方式，即直接保存数据到指定的路径，如下：
```java
SyncReference usersRef = WilddogSync.getInstance().getReference("https://samplechat.wilddogio.com/android/saving-data/wildblog/users");
// 使用父节点引用的child()方法，获得指向子数据节点的引用。
usersRef.child("alanisawesome").child("fullName").setValue("Alan Turing");
usersRef.child("alanisawesome").child("birthYear").setValue(1912);
// 也可以在child()方法的参数中使用 '/' 分隔多个子节点路径。
usersRef.child("gracehop/name").setValue("Grace Hopper");
usersRef.child("gracehop/birthYear").setValue(1906);

```
上面介绍的两种保存数据的方式，一种是使用Map将所有数据一次性保存到数据库，另一种是将数据分别保存到数据库的指定路径，最终的效果都是一样的：
```json
{
  "users": {
    "alanisawesome": {
      "birthYear": "1912",
      "fullName": "Alan Turing"
    },
    "gracehop": {
      "birthYear": "1906",
      "fullName": "Grace Hopper"
    }
  }
}
```
我们也可以不使用 User 对象，而使用 Map 来实现与上面相同的功能：

```java
SyncReference usersRef = WilddogSync.getInstance().getReference("https://samplechat.wilddogio.com/android/saving-data/wildblog/users");

Map<String, String> alanisawesomeMap = new HashMap<String, String>();
alanisawesomeMap.put("birthYear", "1912");
alanisawesomeMap.put("fullName", "Alan Turing");

Map<String, String> gracehopMap = new HashMap<String, String>();
gracehopMap.put("birthYear", "1906");
gracehopMap.put("fullName", "Grace Hopper");

Map<String, Map<String, String>> users = new HashMap<String, Map<String, String>>();
users.put("alanisawesome", alanisawesomeMap);
users.put("gracehop", gracehopMap);

usersRef.setValue(users);
```

野狗采用的是一个“数据同步”的架构。本地拥有数据副本。对数据的写入操作，首先写入本地副本，然后 SDK 去将数据与云端进行同步。
也就是说，当 `setValue()` 方法执行完的时候，数据可能还没有同步到云端。
若要确保同步到云端完成，需要使用 `setValue()` 方法的第二个参数，该参数是一个回调函数，代码示例如下：

```java
SyncReference ref = WilddogSync.getInstance().getReference("https://samplechat.wilddogio.com/android/saving-data");
ref.child("setValue").setValue("hello", new Wilddog.CompletionListener() {
  public void onComplete(SyncError error, SyncReference ref) {
    if (error == null) {
      System.out.println("数据已成功保存到云端");
    }
  }
});
```
绝大多数操作都可设置回调函数来确保操作的完成，具体使用参见 [API文档](/api/sync/android.html)。

## 更新数据

如果只更新指定子节点，而不覆盖其它的子节点，可以使用 `updateChildren()` 方法:

```java
//原数据如下
{
    "gracehop": {
        "nickname": "Nice Grace",
        "date_of_birth": "December 9, 1906",
        "full_name ": "Grace Lee"
    }
}
```
```js
// 只更新 gracehop 的 nickname
Wilddog hopperRef = usersRef.child("gracehop");
Map<String, Object> children = new HashMap<String, Object>();
children.put("name", "Amazing grace");
hopperRef.updateChildren(children);
```

这样会更新 gracehop 的 nickname 字段。如果我们用 `setValue()` 而不是 `updateChildren()`，那么 date_of_birth 和 full_name 都会被删除。

`updateChildren()` 也支持**多路径更新**，即同时更新不同路径下的数据且不影响其他数据，但用法上有些特殊，举例如下:
```json
//原数据如下
{
    "a": {
        "b": {
            "c": "cc",
            "d": "dd"
        },
        "x": {
            "y": "yy",
            "z": "zz"
        }
    }
}
```
```java
// 同时更新 b 节点下的 d，和 x 节点下的 z
SyncReference ref = WilddogSync.getInstance().getReference("https://<appId>.wilddogio.com/a");
Map<String, Object> children = new HashMap<String, Object>();

children.put("b/d", "vvv");
children.put("x/z", "vvv");

ref.updateChildren(children);
```
可以看到，标识路径的时候，这里必须要用 `b/d`, 和 `x/z` ,而**不能**这样写：
```java
// 错误的多路径更新写法！！！
SyncReference ref = WilddogSync.getInstance().getReference("https://<appId>.wilddogio.com/a");

Map<String, Object> children = new HashMap<String, Object>();
Map<String, Object> children1 = new HashMap<String, Object>();
Map<String, Object> children2 = new HashMap<String, Object>();

children1.put("d", "vvv");
children2.put("z", "vvv");

children.put("b", children1);
children.put("x", children2);

ref.updateChildren(children);
```
这样相当于 `setValue()` 操作，会把之前的数据覆盖掉。

## 追加新节点

当多个用户同时试图在同一个节点下新增一个子节点的时候，这时，数据就会被重写覆盖。
为了解决这个问题，Wilddog `push()` 采用了生成唯一ID 作为 key 的方式。通过这种方式，多个用户同时在一个节点下面 push 数据，他们的 key 一定是不同的。这个 key 是通过一个基于时间戳和随机算法生成的，即使在一毫秒内也不会相同，并且表明了时间的先后(可用来排序)，Wilddog 采用了足够多的位数保证唯一性。

用户可以用 `push` 向[博客应用](https://docs-examples.wilddogio.com/android/saving-data/wildblog)中写新内容：

```java
SyncReference ref = WilddogSync.getInstance().getReference("https://docs-examples.wilddogio.com/android/saving-data/wildblog/posts");

SyncReference newRef1 = ref.push();
newRef1.child("author").setValue("gracehop");
newRef1.child("title").setValue("Announcing COBOL, a New Programming Language");

SyncReference newRef2 = ref.push();
newRef2.child("author").setValue("alanisawesome");
newRef2.child("title").setValue("The Turing Machine");
```

产生的数据都有一个唯一ID,如下:
```json
{
  "posts": {
    "-JRHTHaIs-jNPLXO": {
      "author": "gracehop",
      "title": "Announcing COBOL, a New Programming Language"
    },

    "-JRHTHaKuITFIhnj": {
      "author": "alanisawesome",
      "title": "The Turing Machine"
    }
  }
}
```

**获取唯一ID**
调用 `push()` 会返回一个引用，这个引用指向新增数据所在的节点。你可以通过调用 `getKey()` 来获取这个唯一ID

```java
// 通过push()来获得一个新的数据库地址
SyncReference newRef1 = ref.push();

// 获取push()生成的唯一ID
String postID = newRef1.getKey();
```
## 删除数据
删除数据最简单的方法是在引用上对这些数据所处的位置调用 `removeValue()`,这会把该路径下的所有数据删除:
```java
SyncReference ref = WilddogSync.getInstance().getReference("https://<appId>.wilddogio.com/removeValue");
// 不带回调    
ref.removeValue();

// 或带回调，效果同上。
ref.removeValue(new SyncReference.CompletionListener(){

        public void onComplete(SyncError error, SyncReference ref) {
            if(error != null) {
                System.out.println(error.getCode());
            }
            System.out.println("Remove Success!");                
        }
    
});
```
此外，还可以通过将 null 指定为另一个写入操作（例如，`setValue()` 或 `updateChildren()`）的值来删除数据。 您可以结合使用此方法与 `updateChildren()`，在单一 API 调用中来删除多个子节点。

**注意**：Wilddog 不会保存空路径，即如果 /a/b/c 节点下的值被设为 null，这条路径下又没其他的含有非空值的子节点存在，那么云端就会把这条路径删除。

## 事务处理

处理可能因并发修改而损坏的数据（例如，增量计数器）时，可以使用事务处理操作。你可以为此操作提供更新函数和完成后的回调（可选）。

更新函数会获取当前值作为参数，当你的数据提交到服务端时，会判断你调用的更新函数传递的当前值是否与实际当前值相等，如果相等，则更新数据为你提交的数据，如果不相等，则返回新的当前值，更新函数使用新的当前值和你提交的数据重复尝试更新，直到成功为止。

举例说明，如果我们想在一个的博文上计算点赞的数量，可以这样写一个事务：

```java
SyncReference upvotesRef = WilddogSync.getInstance().getReference('https://docs-examples.wilddogio.com/saving-data/wildblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes');

upvotesRef.runTransaction(new Transaction.Handler() {
    public Transaction.Result doTransaction(MutableData currentData) {
        if(currentData.getValue() == null) {
            currentData.setValue(1);
        } else {
            currentData.setValue((Long) currentData.getValue() + 1);
        }

        return Transaction.success(currentData); 
        // 也可以这样中止事务 Transaction.abort()
    }
    public void onComplete(SyncError syncError, boolean committed, DataSnapshot currentData) {
        // 事务完成后调用一次，获取事务完成的结果
    }
});
```

我们使用 `currentData.getValue() != null` 来判断计数器是否为空或者是自增加。 如果上面的代码没有使用事务, 当两个客户端在同时试图累加，那结果可能是为数字 1 而非数字 2。

注意：doTransaction() 可能被多次被调用，必须处理currentData.getValue()为 null 的情况。当执行事务时，云端有数据存在，但是本地可能没有缓存，此时currentData.getValue()为 null。
更多使用参见 [transaction()](/api/sync/android.html#runTransaction-Transaction-Handler)。


