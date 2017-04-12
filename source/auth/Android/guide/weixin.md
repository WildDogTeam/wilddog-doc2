
title:  微信登录
---

本篇文档介绍在 Wilddog Auth 中如何使用微信对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 [微信开放平台管理中心](https://open.weixin.qq.com/)，获取应用的 **AppID** 和 **AppSecret**。
3. 在 微信开放平台—网站应用—网站信息 中填写回调域名 `auth.wilddog.com`。
4. 在 控制面板 身份认证—登录方式 中打开微信登录方式，配置微信帐号 **AppID** 和 **AppSecret**。

## 实现微信登录

1.安装 Wilddog Auth SDK：
 <figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.创建 Wilddog Auth 实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
mAuth = WilddogAuth.getInstance();
```

3.Wilddog Auth 提供以下方式进行微信认证：



```java
AuthCredential weixinAuthCredential= WeixinAuthProvider.getCredential(code);
mauth.signInWithCredential(weixinAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
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

`signOut` 方法用于用户退出登录：

```java
 mauth.signOut();
```

## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Android/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Android/index.html) 无缝集成：使用微信登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Android/guide/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/sync/Android/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。