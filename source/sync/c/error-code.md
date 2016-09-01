title:  错误码
---
在调用 C/嵌入式 SDK 提供的 api 时需要检查该接口的返回码，以检查该接口实际的调用情况，可以根据该返回码确定调用是否成功，以及错误产生的原因。同样在回调函数里，根据 err 确定服务端是否成功响应你的请求，以及出问题的原因。

## 错误码说明

方法 |  值    | 说明
---- | ------|------
    WILDDOG_ERR_NOERR | 0 | 无错误
    WILDDOG_ERR_NULL | -1| 遇到空指针，往往是函数的指针入参传入了空值引起的。
    WILDDOG_ERR_INVALID | -2| 遇到非法值
    WILDDOG_ERR_SENDERR | -3| 发送出错
    WILDDOG_ERR_OBSERVEERR |-4| 监听错误
    WILDDOG_ERR_SOCKETERR | -5| soketc 错误
    WILDDOG_ERR_NOTAUTH | -7| 客户端未被认证，需要调用 wilddog_auth() 进行认证
    WILDDOG_ERR_QUEUEFULL | -8| 请求队列溢出，可以过一段时间等 sdk 处理完 queue 中的请求，再发起新的请求。也可以增大 wilddog_config.h 中 WILDDOG_REQ_QUEUE_NUM 的值
    WILDDOG_ERR_MAXRETRAN | -9| 重传错误
    WILDDOG_ERR_RECVTIMEOUT | -10| 传输超时，客户端未接收到云端的回应。有两方面引起该错误，一方面是客户端断网，请求没有发送出去，另一方面是网络环境差，传输中的数据包丢失。需要抓包确定
    WILDDOG_ERR_RECVNOMATCH | -11| 接收超时，等待云端回复超时，超时时间可以在 wilddog_config.h 中设置。
    WILDDOG_ERR_CLIENTOFFLINE | -12| 客户端离线
    WILDDOG_ERR_RECONNECT | -13|  重连提示，会话已经断线重连，并且重新获取监听数据，本次获取的数据可能是已经推送过的数据(重连后不能确定断线过程中监听的数据是否有过修改)，需要用户去甄别数据是已经推送过，还是新的数据。
    WILDDOG_HTTP_OK | 200| 请求已成功
    WILDDOG_HTTP_CREATED | 201|  请求已经被实现，而且有一个新的资源已经依据请求的需要而创建
    WILDDOG_HTTP_NO_CONTENT | 204| 服务端成功处理了请求，但无需返回任何内容
    WILDDOG_HTTP_NOT_MODIFIED | 304| 数据并没有修改
    WILDDOG_HTTP_BAD_REQUEST | 400| 服务端无法处理该请求
    WILDDOG_HTTP_UNAUTHORIZED | 401| 客户端未认证，需要先调用 wilddog_auth() 发送 token，认证通过后，服务端才处理客户端的请求。
    WILDDOG_HTTP_FORBIDDEN | 403|  服务端已经收到请求，但是拒绝处理
    WILDDOG_HTTP_NOT_FOUND | 404|  访问的 url 资源不存在
    WILDDOG_HTTP_METHOD_NOT_ALLOWED | 405| url 对应的资源不支持该请求
    WILDDOG_HTTP_NOT_ACCEPTABLE | 406| 服务端已经收到请求，但是拒绝处理
    WILDDOG_HTTP_PRECONDITION_FAIL | 412| 资源(存储、流量或连接数)超出限制，请进入 Wilddog 的控制查看
    WILDDOG_HTTP_REQ_ENTITY_TOOLARGE | 413| 请求的数据大小溢出
    WILDDOG_HTTP_UNSUPPORT_MEDIA | 415|  请求的数据格式出错
    WILDDOG_HTTP_INTERNAL_SERVER_ERR | 500| 服务端出错，劳烦联系野狗工作人员
    WILDDOG_HTTP_NOT_IMPLEMENTED | 501| 当服务器无法识别请求的方法，并且无法支持其对任何资源的请求
    WILDDOG_HTTP_BAD_GATEWAY | 502| 上游服务器接收到无效的响应
    WILDDOG_HTTP_SERVICE_UNAVAILABLE | 503| 当服务器无法识别请求的方法，并且无法支持其对任何资源的请求
    WILDDOG_HTTP_GATEWAY_TIMEOUT | 504| 中继超时
    WILDDOG_HTTP_PROXY_NOT_SUPPORT | 505 | 服务器不支持，或者拒绝支持在请求中使用的协议版本