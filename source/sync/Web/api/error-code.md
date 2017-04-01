title:  错误码
---

| 错误码	| 错误信息 |描述   |
| --- | ----- | ------ |
| 26001 | The server indicated that this operation failed | 云端原因导致操作失败。 |
| 26002 | Wilddog server is busy now, please try again later | 服务器繁忙。 |
| 26003 | Server unavailable    | 服务不可用。 |
| 26101 | This client does not have permission to perform this operation | 客户端没有权限执行此操作 |
| 26102 | Quota limit exceeded. Please contact support@wilddog.com  | 超出套餐限制，请续费或者联系 support@wilddog.com。 |
| 26103 | QPS speeding, please reduce qps  | 操作数据超过 5 秒 120 次的限制（ 读操作不受此限制）。 |
| 26104 | Data requested exceeds the maximum size that can be accessed with a single request | 单次请求数据量过大。请参考 [数据限制](/sync/Web/guide/sync/data-limit.html) |
| 26105 |Size of the leaf node exceeds the limitation (1M bytes)  | 单个叶子节点的数据大小不能大于 1M。 |
| 26106 | 1. Path specified exceeds the maximum length that can be written (768 bytes) 2. Path specified exceeds the maximum depth that can be written (32) | 路径长度不能大于 768 个字节，路径深度不能大于 32 |
| 26201 | Transaction hash does not match | 事务操作时数据已被其他客户端修改。 |
| 26202 |	User code called from the SyncReference runloop threw an exception:\n | 客户端异常。 |
| 26203 | The transaction had too many retries | 事务操作重试次数超过限制。 |
| 26204 | The transaction was overridden by a subsequent set | 事务操作被随后的写操作覆盖。 |
|26301   |Could not set priority on non-existent node|不能给不存在的节点设置 priority|
| 26801 | The supplied auth token has expired   | token 过期。 |
| 26802 | The supplied auth token was invalid  | token 无效。 |
| 29999 |Unknown error 	 | 未知错误。 |
