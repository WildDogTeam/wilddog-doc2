title: 基础概念
---

### Sync 是什么？
Sync 是野狗的核心实时通信引擎。它为应用提供基础实时通信，实时数据分发，实时数据存储的能力。

Sync 有三个基础概念：**数据结构**，**事件监听** 和 **规则表达式**。


### Sync 的数据结构是什么？


#### Key-Value 结构
Sync 的数据以 [JSON](http://json.org/json-zh.html) 格式存储。它是键值对 (Key-Value) 的集合，其中每一个键值对 (Key-Value) 都称之为节点。一个节点包含 key 和 value 。

例如，一个聊天室的数据结构中。`name` 是一个 `key`。`username 1` 是 `name` 对应的 `value` ，它们共同组成一个节点。

<img src='/images/group.png' alt="/images/group.png" width="450">

其中每个节点都可以设置 [优先级(priority)](/guide/sync/web/save-data.html#设置节点优先级)，用于实现节点按优先级排序。

#### 子节点
某个节点下的所有节点，统称为该节点的子节点。

聊天室示例中 `user1` 是 `user` 的子节点。

#### 路径 (path)
路径用于标识数据在 Wilddog Sync 中存储的位置，你可以根据路径访问指定的数据。

聊天室示例中 `name` 的路径是 `users/user1/name`。


### 事件是什么？

Sync 中，数据在云端发生的任何变化都称为事件。根据数据的写入、删除和修改，将事件分为[五种](/guide/sync/web/retrieve-data.html#事件)。


### 事件监听能做什么？
通过对不同事件进行监听，获取云端的数据变化，在本地获取并处理这些数据，这是 Sync 实现数据实时同步的核心。

例如，通过事件监听来获取和处理：

- 聊天室里新加入了哪些用户？
- 哪位用户发布消息或撤回了消息？

具体相关信息，请参考：[事件监听](/guide/sync/web/retrieve-data.html)

### 规则表达式是什么？ 
规则表达式是 Wilddog Sync 中对数据访问控制的方法。它是一种 JSON 格式的策略描述语言，灵活性高且扩展性强。

例如，通过规则表达式控制：

- 聊天室中只允许登录的用户发送消息；
- 每条消息不可超过 100 个字符。

具体相关信息，请参考：[规则表达式](/guide/sync/rules/introduce.html)