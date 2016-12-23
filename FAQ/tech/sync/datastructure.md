title: Sync 采用什么样的数据结构?
tag: 实时数据同步
---
Sync 的数据采用 JSON 格式存储。它是一种轻量级的数据交换格式，具有良好的可读和便于快速编写的特性。

它是键值对 (Key-Value) 的集合，其中每一个键值对 (Key-Value) 都称之为节点。一个节点包含 key 和 value 。

例如，以下聊天室示例的数据结构中，name 是 key，username 1 是 name 对应的 value ，它们共同组成一个节点。

![](/images/group.png)

你可以通过 [本篇文档](https://docs.wilddog.com/guide/sync/bestpractice/structure-data.html) 学习如何组织你的数据结构。