title: 错误码
---
| 错误码   | 错误信息                                     | 描述                                       |
| ----- | ---------------------------------------- | ---------------------------------------- |
| 60001 | IM Common Error:the parameter of 'token' is require | IM 通用错误：输入token参数无效。                     |
| 60020 | IM Server Error: persistence error       | IM服务器错误：持久化错误。                           |
| 60021 | IM Server Error: invoke sync rest api error | IM服务器错误：调用sync Rest API 错误, 请联系野狗support@wilddog.com。 |
| 60040 | Auth Error: Auth's secret is not found   | Auth错误：当前app没有发现Auth's secret, 请检查appId是否正确。 |
| 60051 | IM Custom Token Error: the parameter of 'uid' is require | 生成的自定义token缺少的uid， 请检查生成token逻辑， 或在jwt.io查看。 |
| 60400 | IM Common Error: bad request(400)        | IM 通用错误：请求格式错误。                          |
| 60404 | IM Common Error: not found(404)          | IM 通用错误：请求的接口不存在。                        |
| 60500 | IM Common Error: server error(500)       | IM 通用错误：服务端错误, 请联系野狗support@wilddog.com。 |
| 61001 | IM Group Error: the parameter of 'id' is require | IM 群错误: 参数id无效。                          |
| 61002 | IM Group Error: the parameter of 'name' is require | IM 群错误: 参数name无效。                        |
| 61005 | IM Group Error: the parameter of 'opUserId' is require | IM 群错误: 参数opUserId无效。                    |
| 61006 | IM Group Error: the parameter of 'userId' is require | IM 群错误: 参数userId无效。                      |
| 61007 | IM Group Error: the parameter of 'type' is require | IM 群错误: 参数type无效。                        |
| 61020 | IM Group Error: group is no exist        | IM 群错误: group不存在。                        |
| 62001 | IM SendMsg Error:  the parameter of 'message' is require | IM 发送错误: message参数无效。                    |
| 62002 | IM SendMsg Error: the parameter of 'lastMsgId' is no exist | IM 发送错误: lastMsgId参数无效。                  |
| 62010 | IM SendMsg Error: the format of message is incorrect | IM 发送错误: message的格式错误。                   |
| 62020 | IM SendMsg Error: the message is duplicate | IM 发送错误: 消息重复， 请加上reset标志， 重新发送。         |

