
title:  微博登录
---


本篇文档介绍在 Wilddog Auth 中如何使用新浪微博对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 进入 [新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 **App Key** 和 **App Secret**。请参考 [新浪微博网站接入](http://open.weibo.com/connect)。
3. 在微博开放平台 我的应用—高级信息—OAuth2.0 授权设置中填写授权回调页地址`https://auth.wilddog.com/v2/[WILDDOG-APPID]/auth/weibo/callback`。
4. 在控制面板 身份认证—登录方式 中打开微博登录方式，配置 **App Key** 和 **App Secret**。



## 实现微博登录

1.安装 Wilddog Auth SDK：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.创建 Wilddog Auth 实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
mAuth = WilddogAuth.getInstance();
```
3.Wilddog Auth 提供以下方式进行微博认证：


```java
AuthCredential weiboAuthCredential = WeiboAuthProvider.getCredential(mAccessToken.getToken(), mAccessToken.getUid());
mauth.signInWithCredential(weiboAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
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

 `signOut()` 方法用于用户退出登录：

```java
mauth.signOut()
```

## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [管理用户](/guide/auth/android/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用微博登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。



