
title: 使用 Server SDK
---

本篇文档介绍如何使用 Server SDK 生成 Custom Token 以及认证 Wilddog ID Token。

首先，你需要在服务器中安装 Server SDK。[Server SDK(Java) 下载安装](https://www.wilddog.com/download/download-java-auth)

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
 String token = CustomTokenGenerator.createCustomToken("some-uid:", developerClaims, secret, options);
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

Server SDK 按照 [JWT]() 格式生成，生成的 Token 格式如下：

Custom Token payload：

```
    {
      "v": 1,
      "uid": "11111111",
      "iat": 1471347140,
      "exp": 1471357140,
      "claims": {
        "claims1": 112,
        "claims2": "自定义"
      }
    }
```

其中 uid 为不超过64位的字符串，字符串中只允许数字、大小写字母以及"-"。 claims 是固定字段 claims1,claims2 是动态自定义字段。

- <blockquote class="notice">
    <p><strong>提示：</strong></p>

  Custom Token 使用的是 SHA-256 HMAC签名方式
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

