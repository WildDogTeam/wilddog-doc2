title: 自定义身份认证
---

你可以通过自定义身份认证系统来集成你的已有帐号系统，当用户登录到你的服务器时，生成 Custom Token 返回给客户端，Wilddog 身份认证系统利用它来进行身份认证。

### 开始前的准备工作
1.将 `WilddogAuth` 的依赖项添加至你的应用级 build.gradle 文件：
```
compile 'com.wilddog.wilddogauth:wilddog-auth:1.0.0'
```
2.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。


3.使用野狗超级密钥生成 Custom Token。

### Wilddog 身份认证

1.初始化WilddogAuth对象
```
WilddogAuth mauth=WilddogAuth.getInstance("YOURAPPID",context);
```
    
2.当用户登录你的应用时，发送他们的凭据（比如邮箱密码的方式）到你的服务器上。然后服务器检查凭据的正确性并返回 Custom Token。   
3.从服务器收到 Custom Token 后，传到 signInWithCustomToken: 方法中进行登录：

```java  
mauth.signInWithCustomToken("CUSTOMTOKEN").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
         processResult(var1);
    }
});
```
### 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 规则表达式，auth 还可以控制野狗实时数据库的用户访问权限。

在你的应用中，你可以通过 WilddogUser 来获取用户的基本属性。参考 管理用户。
在你的野狗实时数据库 规则表达式 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

你还可以通过 链接多种登录方式 来实现不同的登录方式登录同一个帐号。
调用 signOut: 退出登录：
```
mauth.SignOut();
```
可能发生的错误，请参考 处理错误。
