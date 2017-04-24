title: Webhook
---
本篇文档介绍如何使用 Webhook 实现服务端实时监听云端数据变化。

Webhook，俗称钩子，在 Wilddog Sync 中是可以由开发人员自定义的回调地址。

## 配置 Webhook
在控制面板中配置 Webhook ，具体方法请参考 [控制面板-管理应用-配置 Webhook](/console/administer.html#配置-Webhook)。

## 请求格式
Webhook 目前仅支持 `POST` 请求，请求中 `Header` 的`Content-type`类型为 `application/json`。

请求中还包含以下两个 Wilddog 自定义 `Header` 字段：

- `wilddog-webhook-request-id`由`appId`和一个与时间戳相关的递增数据组成，可以通过该字段完成请求的去重功能。

- `wilddog-webhook-signature`为请求签名，可以通过该字段验证请求是否被篡改或被伪造。签名生成方法，请参考 [安全性](/sync/Web/guide/webhook.html#安全性)。

请求中包含的 Payload 格式示例如下：

```json
{// action 部分的数据表示触发 Webhook 的操作行为和数据
    "action": {   
        // op 表示执行的操作
        "op": "PUT", 
        // path 表示操作的节点
        "path": "/a/b/c", 
        // data 表示操作的数据
        "data": { 
            "d": "ddd"
        }
    },
    // result 部分的数据表示 Webhook 所监听节点在操作之后的最新数据。
    "result": {
        // path 表示 Webhook 监听的节点
        "path": "/a/b/c",
        // data 表示监听节点操作之后的最新数据
        "data": { 
            "d": "ddd"
        }
    }
}
```

op 目前只有 `PUT` 和 `MERGE` ，`PUT` 表示覆盖当前的节点数据，`MERGE`表示在当前节点下新增或更新子节点数据。


## 安全性

为保证请求的安全性，你可以通过签名密钥对请求进行签名，防止请求被篡改或伪造。

签名密钥是每个 App 中一个唯一字符串。请求的 Header 中增加了签名，签名的计算公式如下：

```
sign = SHA256(payload + requestId + secret)。
```

验证签名需在服务端完成，示例代码如下：

```java
String signNew = DigestUtils.sha256String((payload + requestId + secret).getBytes());
         
if (signNew.equals(sign)) {
    System.out.println("验证签名成功");
} else {
    System.out.println("验证签名失败");
}
```
其中，进行 SHA256 计算的工具类代码如下：

```java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class DigestUtils {

    private final static String[] strDigits = { "0", "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

    public static String sha256String(byte[] input) {
        return byteArrayToString(sha256(input));
    }
	
	private static byte[] sha256(byte[] bytes) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return md.digest(bytes);
        } catch (NoSuchAlgorithmException ex) {
            ex.printStackTrace();
        }
        return null;
    }
	
	private static String byteArrayToString(byte[] bytes) {
        StringBuffer sBuffer = new StringBuffer();
        for (byte b : bytes) {
            int i = b;
            if (i < 0) {
                i = i + 256;
            }
            int index1 = i / 16;
            int index2 = i % 16;
            sBuffer.append(strDigits[index1]).append(strDigits[index2]);
        }
        return sBuffer.toString();
    }
	
}
```
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果更新签名密钥，旧签名密钥将会立即失效，需要更改已有的签名验证程序，否则会造成签名验证不通过。
</blockquote>

## 可靠性

### 请求重试机制

为了保证请求的到达率，Wilddog Sync 提供 3 次失败重试机制。

若重试 3 次之后仍然失败，则放弃此次回调，产生一条失败日志，并且当前 Webhook 记录一次异常。连续 5 次异常，该 Webhook 置为“异常停用”状态，之后不会再触发该 Webhook。

你可以通过 `控制台-实时通信引擎-Webhook` 中手动开启，重新启用。


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  请求重试会造成流量的消耗，请保证回调地址的有效性。
</blockquote>



### 请求失败日志
请求重试 3 次仍然失败时，当前 Webhook 触发结束，不再尝试发送请求，同时生成一条请求失败日志。

日志中包含以下内容：

- appId
- 失败类型
- 创建时间
- 数据路径
- 回调地址
- 如果服务端返回非 2xx 状态码，还会包含`http`状态码和相应内容

其中失败类型包含以下四种：

| 请求失败类型     | 说明                                       |
| -------- | ---------------------------------------- |
| URL 访问失败 | 域名无法访问|
| 连接超时  | 长时间没有响应  |    
| 返回非 2xx 的状态码 | 服务端未正常返回  |  
| 数据过大 | 监听节点数据大小超过 4K  |  


<blockquote class="notice">
  <p><strong>提示：</strong></p>
失败日志在 `控制台-实时通信引擎-Webhook` 中查看，可查询最近的 50 条记录。
</blockquote>


## 说明

### 已知问题
数据路径中有通配符时，`PUT`造成的隐式删除，不会触发 Webhook。

例如，监听 `/a/$b`，`/a` 节点下原本的数据为：

```json
{
	"b1":"111",
	"b2":"222"
}
```

在 `/a` 节点下执行 `PUT` 操作，新数据为 {"b":"000"}。操作完成后，原来的节点 `/a/b1` 和节点 `/a/b2` 会被删除，但是该情况不会触发 Webhook 。

### 流量说明

每次 Webhook 触发 `http` 请求，产生的流量包含以下两部分：

| 流量类型      | 说明                                       |
| -------- | ---------------------------------------- |
| 请求流量 | 包含请求头大小 + 请求体大小（即 payload 大小）|
| 响应流量    | 包含响应头大小 + 响应体大小。  |        



Webhook 产生的数据流量会计入套餐资源，从套餐流量中扣除。

推荐响应使用 `204 No Content` 状态码作为响应的状态码，减少响应的流量。