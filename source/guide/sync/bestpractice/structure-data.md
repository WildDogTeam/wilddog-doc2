
title:  组织数据
---

本篇文档介绍如何恰当构建 Wilddog Sync 数据存储结构，以降低数据查询难度，提高查询速度。

### 理解数据结构

Wilddog Sync 数据结构类似 [NoSQL](http://baike.baidu.com/view/2677528.htm) 类型，数据以 [JSON](http://json.org/json-zh.html) 为格式进行存储。没有传统关系型数据库中的表和记录等概念。


```json
{
  "users": {
    "Mchen": {
      "friends": { "Jack": true },
      "name": "Mary Chen",
      "widgets": { "one": true, "three": true }
    },
    "Jack": { ... },
    "Harry": { ... }
  }
}
```

 

## 使数据扁平化

Wilddog Sync 的工作方式是当你查询某个节点时，将会返回这个节点下的**所有**子节点。所以，如果采取过多嵌套的数据结构，在查询时会返回很多冗余数据。

例如，你只想查询所有 room 的 name、type 信息，但下面的结构会返回不需要的 messages 列表。

```json
{
  // 一个非常差的充满嵌套的数据结构。请勿模仿。
    // 对"rooms"进行遍历查找来获得名字需要下载很多很多的 messages。
    "rooms": {
      "one": {
        "name": "room alpha",
        "type": "private",
        "messages": {
          "m1": { "sender": "mchen", "message": "foo" },
          "m2": { ... },
          // 非常长的 messages 列表
        }
      },
     "two":{...}
    }
}
```



正确的做法如下，应该尽量使数据**扁平化**，让数据分布到不同的路径下，提高查询效率。


```json
{
    // rooms数据节点下仅包含房间的基本信息和唯一ID。
    "rooms": {
      "one": {
        "name": "room alpha",
        "type": "private"
      },
      "two": { ... },
      "three": { ... }
    },

    //room成员可以很方便的的存取
    "members": {
      "one": {
        "Mchen": true,
        "Harry": true
      },
      "two": { ... },
      "three": { ... }

    },

    //消息数据与其他数据分离开，这样我们在查询其他数据时就不收消息数据的影响，从而提升性能。
    //消息数据可以通过room ID方便的分页和查询。
    "messages": {
      "one": {
        "m1": { "sender": "Mchen", "message": "foo" },
        "m2": { ... },
        "m3": { ... }
      },
      "two": { ... },
      "three": { ... }
    }

  }
```




## 使数据可扩展
在许多场景下，我们有双向查询数据的需求。此时需要在数据结构中添加必要的冗余，以提高查询的效率。

例如，你需要设计一个聊天室的数据结构，该结构包含两个对象: user 和  room。两者是双向关系，user 可以属于多个room，room 可以包含多个user 。


```json
{
    "users": {
      "Chen": { "name": "Mary Chen" },
      "Rinchen": { "name": "Byambyn Rinchen" },
      "Madi": { "name": "Hamadi Madi" }
    },
    "rooms": {
      "room1": {
         "name": "Alpha Tango",
         "members": {
            "user1": "mchen",
            "user2": "brinchen",
            "user3": "hamadi"
         }
      },
      "room2": { ... },
      "room3": { ... }
    }
  }
```

如上设计，当 user 需要查询自己属于哪个 room 时，该数据结构会遍历所有的 room，效率极低。更严重的是，如果 user 没有权限查看所有的 room，就不能实现需求。

正确的做法如下，在 user 下存入所属 room 的信息
```json
{
    "users": {
      "Chen": {
        "name": "Mary Chen",
        // 在Mary的数据下，建立他所属 room 的索引。
        "rooms": {
           "room1": true,
           "room2": true
        }
      },
      ...
    },
    "rooms": { ... } 
  }
```

只需要读取`/users/Chen/rooms/$room_id`，看它是否为 null 就可以了。

但这样做需要注意，如果 user 和 room 的关系发生变化，就需要更新两个地方的关系数据。



