title:  错误码
---

错误信息	|	解释	|  描述
---- | -------- | ---
TOO_BIG | 数据量过大 | 试图获取的数据量超过了野狗实时数据同步服务所允许的最大值。	
LIMITS_EXCEEDED | 资源超出 | 当前 APP 使用的流量或连接数超过了它的套餐所允许的最大值。
PERMISSION_DENIED | 不允许的操作 | 根据 APP 所配置的 [规则表达式](/api/sync/rule.html)，当前的操作被禁止。 	
UNAVAILABLE | 服务不可用 | 服务器维护或其他原因暂停服务。 	
UNKNOWN_ERROR | 未知错误 | 发生了未知错误。请查阅详细错误信息。		
UNAVAILABLE | 服务不可用 | 服务器维护或其他原因暂停服务。 	
QPS_SPEEDING |  请求过于频繁 | 请求过于频繁，超过了5秒120次的限制（读操作不限）。	
			
