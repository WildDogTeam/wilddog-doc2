title: 用户集成
---

本篇文档介绍如何集成开发者的已有用户系统。

### 获取 Token

Wilddog IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/guide/auth/server/server.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

也可以在 `IM 控制面板` -> `接口测试` 中生成 Token 用于测试。


### 登录

`- signInWithCustomToken:completion:` 方法用于将用户登录 Wilddog IM 服务。

```objc
// 用 customToken 登录
[[WDGIMClient defaultClient] signInWithCustomToken:wilddogToken completion:^(WIMUser * _Nullable currentUser, NSError * _Nullable error) {
        
}];

```

### 退出登录

`- signOut:` 方法用于用户退出 Wilddog IM 服务登录状态。

```objc
NSError *error;
[[WDGIMClient defaultClient] signOut:&error];
if (!error) {
    // 退出登录成功
}

```
	
### 获取当前用户

WDGIMClient 成员方法 currentUser 能获取当前登录用户：

```objc
WDGIMUser *currentUser = [WDGIMClient defaultClient].currentUser;

```

### 设置登录监听

WDGIMClient 的代理方法 `- wilddogIMClient:didSignInAsUserID:` 和 `- wilddogIMClientDidSignOut:` 可以对登录状态进行监听。

 ```objc
- (void)wilddogIMClient:(nonnull WDGIMClient *)client didSignInAsUserID:(nonnull NSString *)userID {
	// 有用户登录
}

- (void)wilddogIMClientDidSignOut:(nonnull WDClient *)client {
   // 用户退出登录
}

```
 
 
 