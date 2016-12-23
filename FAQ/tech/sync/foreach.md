title: 如何遍历野狗 push 之后数据？
tag:实时数据同步
---

在野狗的所有 API 中，所有数据返回结果都是 JSON 格式，如果要对返回的 JSON 进行遍历的话，可以使用野狗提供的 [forEach](https://docs.wilddog.com/api/sync/web/DataSnapshot.html#forEach) 方法，它可以自动帮助你处理 `push` 数据的 key。直接拿到 key下面的对象的属性和值。

