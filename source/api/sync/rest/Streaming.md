title: Streaming

---

Wilddog REST API支持 [EventSource \/ Server-Sent Events ](http://www.w3.org/TR/eventsource/)协议。在Wilddog数据库使用 Server-Sent Events（简写 SSE）， 你需要准备以下：

* １. 设置Accept = "text\/event-stream"
* ２. 支持HTTP转跳，HTTP code 307
* ３. 如果read操作有规则表达式， 需要设置auth参数

云端返回的数据的协议：

```
event: event name

data: JSON encoded data payload

```
---

## 云端返回的数据协议

### put

**说明**

data是json对象， 包含两个key： `path`和`data`。`path`是`data`相关的路径。客户端应该替换`path`的所有数据。

---

### patch

**说明**

data是json对象， 包含两个key： `path` 和 `data`。`path`是`data`相关的路径。对于data的每一个key，客户端应该替换这个key对应的数据。

---

### keep-alive

**说明**

event的data为null，即无任何操作。

---

### auth\_revoked

**说明**

此event的数据为一个字符串，该字符串表示该认证已过期。当提供的认证过期时，此event将被发送。

---

### 示例

先开启一个端口用于查看云端发送的event，下面是云端发送的event示例:

```
//  设置你整个数据
event: put
data: {"path": "/", "data": {"a": 1, "b": 2}}

//  推送key为c的新数据, 然后整个数据如下
// {"a": 1, "b": 2, "c": {"foo": true, "bar": false}}
event: put
data: {"path": "/c", "data": {"foo": true, "bar": false}}

// 在每个数据的key, 更新或添加数据，
// 然后整个数据如下
//  {"a": 1, "b": 2, "c": {"foo": 3, "bar": false, "baz": 4}}
event: patch
data: {"path": "/c", "data": {"foo": 3, "baz": 4}}

```

为了产生变化，可以再开启一个端口输入命令。

如：使用curl命令开启SSE

```
curl -X GET -H 'Accept:text/event-stream' 'https://<appId>.wilddogio.com/.json'

```

使用 curl 命令 put 数据

```
curl -X PUT -d '{"path": "/", "data": {"a": 1, "b": 2}}' 'https://<appId>.wilddogio.com/.json'
{"path":"/","data":{"a":1,"b":2}}

```
