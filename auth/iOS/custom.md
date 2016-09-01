title: 自定义身份认证
---

你可以通过自定义身份认证系统来集成你的已有帐号系统，当用户登录到你的服务器时，生成 Custom Token 返回给客户端，Wilddog 身份认证系统利用它来进行身份认证。

## 开始前的准备工作
1. [创建野狗应用](https://www.wilddog.com/dashboard/)。
2. 将下面 pod 加到 `Podfile` 文件中：
```
pod 'Wilddog/Auth'
```
3. 使用野狗超级密钥生成 Custom Token (在“控制面板 - 身份认证 - 登录方式 - 登录方式设置”生成)。

## Wilddog 身份认证

1. 引入 WilddogAuth 模块：
```
@import WilddogAuth;
```
2. 初始化 WDGAuth 对象：
```
WDGAuth *auth = [WDGAuth authWithAppID:@"your-appid"];
```
3. 当用户登录你的应用时，发送他们的凭据（比如邮箱密码的方式）到你的服务器上。然后服务器检查凭据的正确性并返回 Custom Token。
4. 从服务器收到 Custom Token 后，传到 `signInWithCustomToken:` 方法中进行登录：
```
[auth signInWithCustomToken:customToken
                 completion:^(WDGUser *_Nullable user, NSError *_Nullable error) {
                        // ...
                 }];
```

## 后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](/sync/rules/introduce-rule.html)，`auth` 还可以控制野狗实时数据库的用户访问权限。

* 在您的应用中，您可以通过 WDGUser 来获取用户的基本属性。参考 [管理用户](/auth/ios/manageuser.html)。
* 在您的野狗实时数据库 [规则表达式](/sync/rules/introduce-rule.html) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

您还可以通过 [链接多种登录方式](/auth/ios/link.html) 来实现不同的登录方式登录同一个帐号。

调用 [signOut:](/auth/ios/api.html#WDGAuth-Methods#-signOut:) 退出登录：

```
NSError *error;
[[WDGAuth authWithAppID:@"your-appid"] signOut:&error];
if (!error) {
  // 退出登录成功
}
```
可能发生的错误，请参考 [处理错误](/auth/ios/errorcode.html)。