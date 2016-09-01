title: 基于密码进行身份认证身份认证
---

您可以使用 Wilddog Auth 让您的用户用电子邮件地址和密码进行 Wilddog 身份认证，而且可以通过他来管理您的应用帐户。

### 开始前的准备工作

1. 将 Wilddog 添加至您的 iOS 项目。将以下 pod 包含在您的 Podfile 中：
```
  pod 'Wilddog/Auth'
```
2. 在 Wilddog 控制面板中创建一个应用.
3. 在野狗应用控制面板中打开邮箱登录方式:

    * 在野狗控制面板中选择身份认证选项。
    * 在｀登录方式｀标签中打开邮箱登录方式。

### 创建基于密码的帐户

要用密码创建一个新用户帐户，请在您的应用登录模块中完成以下步骤：

1. 导入 Wilddog Auth 模块:
```
@import WilddogAuth;
```
2. 以 Wilddog AppId 初始化 WDGAuth。
```
WDGAuth *auth = [WDGAuth authWithAppID:@"your-appid"];
```
3. 通过将该新用户的电子邮件地址和密码传递到 createUserWithEmail:email:password:completion: 来创建新帐户。
```
[auth createUserWithEmail:email
                    password:password
                  completion:^(WDGUser *_Nullable user,
                          NSError *_Nullable error) {
                    // ...
                  }];
             ```
如果新帐户创建成功，默认会处于登录状态，并且您可以在回调方法中获取登录用户的数据。

### 用电子邮件地址和密码登录一个用户

用密码登录一个用户的步骤与创建新帐户的步骤相似。 在您应用的登录模块中，执行以下操作：

1. 导入 Wilddog Auth 模块:
```
@import WilddogAuth;
```
2. 以 Wilddog AppId 初始化 WDGAuth。
```
WDGAuth *auth = [WDGAuth authWithAppID:@"your-wilddog-appid"];
```
3. 将该用户的电子邮件地址和密码传递到 `signInWithEmail:email:password:completion:`,即可在您应用中登录此用户。
```
[[WDGAuth auth] signInWithEmail:_emailField.text
                       password:_passwordField.text
                     completion:^(FIRUser *user, NSError *error) {
                       // ...
                     }];
```
如果该用户成功登录，您就可以从回调方法的用户对象中获得该用户的帐户数据。

###后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](https://z.wilddog.com/rule/quickstart)，`auth` 还可以控制野狗实时数据库的用户访问权限。

* 在您的应用中，您可以通过 WDGUser 来获取用户的基本属性。参考 [管理用户](https://aoqishen.gitbooks.io/auth/content/iOS/guides/%E7%AE%A1%E7%90%86%E7%94%A8%E6%88%B7.html)。
* 在您的野狗实时数据库 [规则表达式](https://z.wilddog.com/rule/quickstart) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

您还可以通过 [链接多种登录方式](https://aoqishen.gitbooks.io/auth/content/iOS/guides/%E9%93%BE%E6%8E%A5%E5%A4%9A%E7%A7%8D%E7%99%BB%E5%BD%95%E6%96%B9%E5%BC%8F.html) 来实现不同的登录方式登录同一个帐号。

#####调用 [signOut:]() 退出登录：
```
NSError *error;
[[WDGAuth authWithAppID:@"your-appid"] signOut:&error];
if (!error) {
  // 退出登录成功
}
```
可能发生的错误，请参考 [处理错误](https://aoqishen.gitbooks.io/auth/content/iOS/guides/%E5%A4%84%E7%90%86%E9%94%99%E8%AF%AF.html)。