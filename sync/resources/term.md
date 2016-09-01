title: 术语
---

### appId

作为野狗应用的唯一标识。创建野狗应用的时候必须设置一个appId。后续可直接通过 `https://<appId>.wilddogio.com/` 访问应用的后台控制面板。


### URL
统一资源定位， 参考文档 RFC 1738。通过appId组成的 URL - <appId>.wilddogio.com，可以访问你的应用数据。


### path
每个数据都有对应的path作为它的唯一标识。


### 控制面板
野狗官方提供的应用管理后台。


### JSON
参考网站 json.org


### 长连接
连接建立以后不会断开，后续将复用这个连接发送数据，减少重复建立连接的开销。同时实现了全双工通讯，服务端可以做到实时向客户端推送数据。

### websocket
通过 HTTP 协议与云端建立长连接，野狗的长连接就是基于 websocket 的。只有在握手过程时有 HTTP header，后续的数据的传输只有websocket的header，没有 HTTP header。参考 RFC 6455。

### WSS
websocket + HTTPS，保障数据传输过程的安全性，以及起到云端的身份认证。

### HTTPS
HTTP + TLS，参考 RFC 2818。

### TLS
用于实现的 TCP 通道加密。参考 RFC 5246。

### long-polling
payload
数据在网络传输过程中，除了协议头以外的 application 数据。

### session resume
TLS 握手优化，在连接重新建立后，减少 TLS 握手过程，通过 TLS sessionId 恢复 TLS 会话。参考 RFC 5077。

### AES-NI
AES-NI 指令集，可以提升 AES 加密8倍的效率。

### CoAP
用于物联网的数据通讯协议，参考 RFC 7252。

### 规则表达式
野狗提供的一套声明式的app数据读写权限控制方式。它的语法类似JSON，简单明了。
