
title:  QQ 登录
---

本篇文档介绍在 Wilddog Auth 中如何使用 QQ 对用户进行身份认证。


## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [QQ 互联](https://connect.qq.com)—我的应用 中获取应用的 **APP ID** 和 **APP KEY**。请参考 [网站接入流程](http://wiki.connect.qq.com/网站接入流程)。
3. 在 QQ 互联—我的应用 中，填写应用的回调地址:` https://auth.wilddog.com/v2/{wilddog-appId}/auth/qq/callback`。
4. 在控制面板 身份认证—登录方式 中打开 QQ 登录方式，配置 QQ 帐号 **APP ID** 和 **APP KEY**。

## 实现 QQ 登录
1.安装 Wilddog Auth SDK：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="auth_android_v">2.0.5</span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.创建 Wilddog Auth 实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
mAuth = WilddogAuth.getInstance();
```

3.Wilddog Auth 提供以下方式进行 QQ 登录：


```java
AuthCredential qqAuthCredential= QQAuthProvider.getCredential("access_token");
mauth.signInWithCredential(qqAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> task) {
         if(task.isSuccessful()){
                    Log.d("result","登录成功");
                }else {
                    Log.d("result","登录失败"+task.getException().toString());
                }
    }
});
```


## 退出登录

`signOut()` 方法用于用户退出登录：

```java
mAuth.signOut();
```

## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Android/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Android/index.html) 无缝集成：使用 QQ 登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Android/guide/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/sync/Android/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。


