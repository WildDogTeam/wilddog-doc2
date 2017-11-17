
title: 使用 Server SDK
---

本篇文档介绍如何使用 Server SDK 生成 Custom Token 以及认证 Wilddog ID Token。



## 安装 Server SDK

首先，你需要在服务器中安装 Server SDK，请参考 [Server SDK(Java) 下载安装](https://www.wilddog.com/download/auth-java-sdk)。
目前有 JDK1.7 及 JDK1.8 两个编译版本。


## 生成 Custom Token

生成 Custom Token：

```java
 // 生成 Custom Token
 // 自定义字段
 String secret = "<your-secret>"; 
 Map<String, Object> developerClaims = new HashMap<String, Object>();
 developerClaims.put("claims1", 112);
 developerClaims.put("claims2", true);
 Map<String, Object> developerClaims2 = new HashMap<String, Object>();
 developerClaims2.put("aaa", 212);
 developerClaims2.put("bbb", "bbb");
 developerClaims.put("claims3", developerClaims2);
 TokenOptions options = new TokenOptions();
 options.setExpires(new Date(System.currentTimeMillis() + 2 * 24 * 3600 * 1000L));
 String token = CustomTokenGenerator.createCustomToken("some-uid", developerClaims, secret, options);
```

生成 Admin Token：

```java
 // 生成 Admin Token
 // Admin Token 是管理员权限凭证。
 String secret = "<your-secret>";
 TokenOptions options = new TokenOptions();
 options.setExpires(new Date(System.currentTimeMillis() + 2 * 24 * 3600 * 1000L));
 String token = CustomTokenGenerator.createAdminToken(secret, options);
```

Custom Token 按照 [JWT](https://jwt.io/) 格式生成，格式如下：

Custom Token payload：

```
{
  "v": 1,
  "uid": "11111111",
  "iat": 1471347140,
  "exp": 1471357140,
  "claims": {
    "C": 112,
    "B": "自定义"
  }
}
```

你可以通过下表的字段来生成 Custom Token ：

| 必填字段 |                     描述                     |
|----------|----------------------------------------------|
| v        | token 的版本，默认为 1                       |
| iat      | token 的颁发时间，Unix 时间秒数              |
| uid      | 用户的 ID，在 Wilddog Auth 中作为 Wilddog ID |

其中 uid 为不超过64位的字符串，字符串中只允许数字、大小写字母以及"-"。

下面是可选字段：

| 可选字段   | 描述                                       |
| ------ | ---------------------------------------- |
| exp    | token 过期的时间戳，以秒为单位                       |
| admin  | 如果设置为 true，将获得完全的读写权限                    |
| claims | 用户自定义字段节点。claims 为固定字段，子节点为自定义字段。子节点不能为 JWT 保留字 |

<blockquote class="notice">
<p><strong>提示：</strong></p>

Custom Token 使用的是 SHA-256 HMAC 签名方式。
如果你使用非 Java 平台，可以使用第三方的 [JWT]()（JSON Web Token）库自己生成 Custom Token。

</blockquote>

服务器生成 Custom Token 之后需要发送给客户端。客户端收到 Custom Token 可以实现自定义身份认证。

例如，Web 端使用 Custom Token 进行身份认证：

```javascript
wilddog.auth.signInWithCustomToken(customToken).catch(function(error)){
    var errorCode = error.code;
    var errorMessage = error.message;
}
```



## 认证 Wilddog ID Token

在客户端获取用户 Wilddog ID Token：

```javascript
wilddog.auth().currentUser.getToken(
    /* 强制刷新 */
    true).then(function(idToken) {
    // 通过 HTTPS 发送 Token 给后端服务器
}).catch(function(error) {
    // 错误处理
});
```

使用 Wilddog SDK 校验 Wilddog ID Token：

```java
 VerifyResult result = IdTokenVerifier.verifyIdToken(idToken, appId);
 boolean isValid = result.isValid();
 Token token = result.getIdToken();
```

