title:  错误码
---

错误码	| 错误信息 |描述  
- | ----- | ------
-1|DATA_STALE | 内部使用。
-2|OPERATION_FAILED | 服务器标示操作失败。
-3|PERMISSION_DENIED | 客户端不被许可执行此操作。
-4|DISCONNECTED | 因为网络连接失败导致操作不能执行。
-8|MAX_RETRIES | 事务有太多的重试。
-9|OVERRIDDEN_BY_SET | 事务被随后的集合覆盖。
-10|UNAVAILABLE | 服务不可用。
-11|USER_CODE_EXCEPTION	 | 用户代码中发生的异常。
-23|LIMITS_EXCEEDED |超过限制，如果遇到此错误码，请联系support@wilddog.com。
-24|NETWORK_ERROR	| 因为网络原因导致操作不能执行。
-101|	REPETITIVE_OPERATION	| 重复操作。短时间内向云端进行相同的操作，后面的相同操作会被视为无效。
-102 |QPS_SPEEDING	 | 请求太过频繁。有5秒内最多100次的限制。
-999 |UNKNOWN_ERROR | 未知错误。


	

