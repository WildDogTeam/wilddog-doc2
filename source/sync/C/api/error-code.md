
title:  错误码
---

| 错误码  | 错误信息                             | 描述                                       |
| ---- | -------------------------------- | ---------------------------------------- |
| 0    | WILDDOG_ERR_NOERR                | 无错误                                      |
| -1   | WILDDOG_ERR_NULL                 | 遇到空指针，往往是函数的指针入参传入了空值引起的。                |
| -2   | WILDDOG_ERR_INVALID              | 遇到非法值                                    |
| -3   | WILDDOG_ERR_SENDERR              | 发送出错                                     |
| -4   | WILDDOG_ERR_OBSERVEERR           | 监听错误                                     |
| -5   | WILDDOG_ERR_SOCKETERR            | socket 错误                                |
| -7   | WILDDOG_ERR_NOTAUTH              | 客户端未被认证，需要调用 wilddog_auth() 进行认证         |
| -8   | WILDDOG_ERR_QUEUEFULL            | 请求队列溢出，可以过一段时间等 sdk 处理完 queue 中的请求，再发起新的请求。也可以增大 wilddog_config.h 中 WILDDOG_REQ_QUEUE_NUM 的值 |
| -9   | WILDDOG_ERR_MAXRETRAN            | 重传错误                                     |
| -10   | WILDDOG_ERR_RECVTIMEOUT          | 传输超时，客户端未接收到云端的回应。有两方面引起该错误，一方面是客户端断网，请求没有发送出去，另一方面是网络环境差，传输中的数据包丢失。需要抓包确定 |
| -11  | WILDDOG_ERR_RECVNOMATCH          | 收到的数据不匹配。                           |
| -12  | WILDDOG_ERR_CLIENTOFFLINE        | 客户端离线                                    |
| -13  | WILDDOG_ERR_RECONNECT            | 重连提示，会话已经断线重连，并且重新获取监听数据，本次获取的数据可能是已经推送过的数据(重连后不能确定断线过程中监听的数据是否有过修改)，需要用户去甄别数据是已经推送过，还是新的数据。 |
| 200  | WILDDOG_HTTP_OK                  | 请求已成功                                    |
| 201  | WILDDOG_HTTP_CREATED             | 请求已经被实现，而且有一个新的资源已经依据请求的需要而创建            |
| 204  | WILDDOG_HTTP_NO_CONTENT          | 服务端成功处理了请求，但无需返回任何内容                     |
| 304  | WILDDOG_HTTP_NOT_MODIFIED        | 数据并没有修改                                  |
| 400  | WILDDOG_HTTP_BAD_REQUEST         | 服务端无法处理该请求                               |
| 401  | WILDDOG_HTTP_UNAUTHORIZED        | 客户端未认证，需要先调用 wilddog_auth() 发送 token，认证通过后，服务端才处理客户端的请求。 |
| 403  | WILDDOG_HTTP_FORBIDDEN           | 服务端已经收到请求，但是拒绝处理                         |
| 404  | WILDDOG_HTTP_NOT_FOUND           | 访问的 url 资源不存在                            |
| 405  | WILDDOG_HTTP_METHOD_NOT_ALLOWED  | url 对应的资源不支持该请求                          |
| 406  | WILDDOG_HTTP_NOT_ACCEPTABLE      | 服务端已经收到请求，但是拒绝处理                         |
| 412  | WILDDOG_HTTP_PRECONDITION_FAIL   | 资源(存储、流量或连接数)超出限制，请进入 Wilddog 的控制查看      |
| 413  | WILDDOG_HTTP_REQ_ENTITY_TOOLARGE | 请求的数据大小溢出                                |
| 415  | WILDDOG_HTTP_UNSUPPORT_MEDIA     | 请求的数据格式出错                                |
| 500  | WILDDOG_HTTP_INTERNAL_SERVER_ERR | 服务端出错，联系野狗工作人员                         |
| 501  | WILDDOG_HTTP_NOT_IMPLEMENTED     | 当服务器无法识别请求的方法，并且无法支持其对任何资源的请求            |
| 502  | WILDDOG_HTTP_BAD_GATEWAY         | 上游服务器接收到无效的响应                            |
| 503  | WILDDOG_HTTP_SERVICE_UNAVAILABLE | 当服务器无法识别请求的方法，并且无法支持其对任何资源的请求            |
| 504  | WILDDOG_HTTP_GATEWAY_TIMEOUT     | 中继超时                                     |
| 505  | WILDDOG_HTTP_PROXY_NOT_SUPPORT   | 服务器不支持，或者拒绝支持在请求中使用的协议版本                 |