title: 使用 Server SDK 进行认证
---

你可以使用 Wilddog Server SDK 创建并认证用于在客户端应用与服务器之间对身份认证信息进行安全通信的令牌（Token）。

* 创建适用于集成自定义身份认证系统与 Wilddog 应用的自定义令牌。

* 认证 ID 令牌（用于从客户端应用向后端服务器传递已登录用户）。


注：Wilddog Server SDK 中包含的 ID 令牌认证方法不能认证你用 Wilddog Server SDK 创建的自定义令牌。

资源下载地址:
https://www.wilddog.com/download/

## 创建Custom Token

用户可以通过 Wilddog 的 Server SDK 对个人系统的用户生成 Custom Token。
我们将提供 java 和 Nodejs 两种语言的 Server SDK:

java:

```java
 //生成自定义token
 //自定义字段
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

 //生成admin token
 String secret = "<your-secret>";
 TokenOptions options = new TokenOptions();
 options.setExpires(new Date(System.currentTimeMillis() + 2 * 24 * 3600 * 1000L));
 String token = CustomTokenGenerator.createAdminToken(secret, options);
```

nodejs:

```javascript
 后续推出
```

在创建 Custom Token 后, 可以将该 token 发送给客户端应用, 进行 Wilddog 身份认证

```javascript
wilddog.auth.signInWithCustomToken(customToken).catch(function(error)){
    var errorCode = error.code;
    var errorMessage = error.message;
}
```

## 校验ID Token

如果你的 Wilddog 客户端 APP 与自己的后端服务器有业务关联，你也许需要在后端服务中校验当前登录用户的合法性。当客户端用户成功登陆后，将Wilddog服务返回的ID Token 使用 HTTPS 发送给自有后端服务器，在服务中，调用 Wilddog 提供的校验接口校验用户的合法性。

**在客户端获取用户ID Token**

```javascript
wilddog.auth().currentUser.getToken(
    /* forceRefresh */
    true).then(function(idToken) {
    // Send token to your backend via HTTPS 
    // ...
}).catch(function(error) {
    // Handle error
});
```

**使用 Wilddog SDK 校验 ID Token**

我们将提供 java 和 Nodejs 两种语言的 Server SDK:

java

```java
 VerifyResult result = IdTokenVerifier.verifyIdToken(idToken, appId);
 boolean isValid = result.isValid();
 Token token = result.getIdToken();

```

nodejs:

```javascript
后续推出

```

