
title:  自定义身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用自定义身份认证。

## 原理

![](/images/customToken.png)

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板—创建应用](/console/creat.html#创建一个野狗应用)。
2. 在 控制面板—身份认证—登录方式—超级秘钥 中获取超级密钥。



## 实现自定义身份认证

1.安装 Wilddog Auth SDK：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="auth_android_v">2.0.5</span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.创建 Wilddog Auth 实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
WilddogAuth mauth=WilddogAuth.getInstance();
```

3.当用户成功登录你的用户系统时，服务器通过 [Server SDK 生成 Custom Token](/auth/Server/server.html)，并返回给客户端。

4.客户端收到 Custom Token 后，使用 `signInWithCustomToken()` 方法进行认证：

```java 
mauth.signInWithCustomToken("CUSTOMTOKEN").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
         if(task.isSuccessful()){
                    Log.d("result","认证成功");
                }else {
                    Log.d("result","认证失败"+task.getException().toString());
                }
    }
});
```

## 退出登录

`signOut()` 方法用于用户退出登录：

```java
mauth.signOut();
```

## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Android/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Android/index.html) 无缝集成：使用自定义身份认证登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Android/guide/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/sync/Android/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。
