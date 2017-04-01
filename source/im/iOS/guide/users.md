title: 用户集成
---

本篇文档介绍如何集成用户系统，集成用户系统同 Auth 一样，有两种方式：第一种是集成开发者的已有用户系统，第二种是直接集成 Auth 的用户系统。

## 集成开发者的已有用户系统

### 获取 Token

Wilddog IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/auth/Server/introduction.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。
具体流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  你可以在 `IM 控制面板`-`接口测试` 中手动生成 Token 用于测试。
</blockquote>


### 登录

使用`- signInWithCustomToken:completion:` 方法用于将用户登录 Wilddog IM 服务：

```objc
// 用 customToken 登录
[[WDGAuth auth] signInWithCustomToken:wilddogToken completion:^(WIMUser * _Nullable currentUser, NSError * _Nullable error) {

}];

```

## 集成 Auth 的用户系统

### 登录

使用 `-signInWithEmail:password:completion:` 或者`-signInWithPhone:password:completion:` 或者 `-signInAnonymouslyWithCompletion:`等登录 Auth 方法去登录。例如，用邮箱登录方式：

```objc
// 用邮箱登录
[[WDGAuth auth] signInWithEmail:@"yourEmail@wilddog.com" password:@"password" completion:^(WIMUser * _Nullable currentUser, NSError * _Nullable error) {

}];


## 退出登录

使用 `unbindDeviceTokenWithCompletion`解绑用户，然后使用 WDGAuth 的`- signOut:` 方法退出登录：

```objc
[WDGIMNotify unbindDeviceTokenWithCompletion:^(NSError * _Nullable error) {
    if (!error) {
       [[WDGAuth auth] signOut:nil];
    }
}];

```
	
## 获取当前用户

`WDGIM` 成员方法 `currentUser` 用于获取当前登录用户：

```objc
WDGIMUser *currentUser = [WDGIM im].currentUser;

```


 