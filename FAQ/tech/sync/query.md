title: 如何提高数据查询的效率？
tag:实时数据同步
---

首先需要理解 Wilddog Sync 数据结构类似 NoSQL 类型，数据以 JSON 为格式进行存储。没有传统关系型数据库中的表和记录等概念。

所以在设计数据结构时，可以添加必要的冗余，以提高查询的效率。

例如，你需要设计一个聊天室的数据结构，该结构包含两个对象: user 和 room。两者是双向关系: user 可以属于多个room，room 可以包含多个user 。

```
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

正确的做法如下，在 user 下存入所属 room 的信息:

```
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
 
 
这样只需要读取`/users/Chen/rooms/$room_id`，看它是否为` null` 就可以了。

但这样做需要注意，如果` user` 和 `room `的关系发生变化，就需要更新两个地方的数据。