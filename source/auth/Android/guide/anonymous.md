    
title:  匿名身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用临时匿名帐号来进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。

2. 在 控制面板 身份认证—登录方式 中打开匿名登录方式。

## 实现匿名身份认证

1.安装 Wilddog Auth SDK：
   <figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.创建 Wilddog Auth 实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
WilddogAuth mauth=WilddogAuth.getInstance();
```

3.调用 `signInAnonymously()`方法：
```java    
mauth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
        processResult(var1);
            if(var1.isSuccessful()){
       	        Log.d("success","Login success!");
        Log.d("Anonymous",String.valueOf(var1.getResult().getWilddogUser().isAnonymous()));
        }else {
        Log.d("failure","reason:"+var1.getException());
        }
    }
});
```

4.`signInAnonymously()`方法调用成功后，可以在当前用户对象中获取用户数据：

```java
 WilddogUser user = mauth.getCurrentUser();
 String uid = user.getUid();
 boolean isAnonymous = user.isAnonymous();
```
  ​
## 匿名帐号转成永久帐号

匿名登录的帐号数据将不会被保存，可以通过绑定邮箱认证或第三方认证方式将匿名帐号转成永久帐号。

### 绑定邮箱认证方式

绑定邮箱认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取邮箱认证方式的 credential。

```java
AuthCredential emailAuthCredential= EmailAuthProvider.getCredential("12345678@wilddog.com","password123");
```

3.使用邮箱认证方式绑定。

```java
 WilddogUser user = mauth.getCurrentUser();
user.linkWithCredential(emailAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(Task<AuthResult> task) {
                if(task.isSuccessful()){
                    Log.d("result","绑定成功");
                }else {
                    Log.d("result","绑定失败"+task.getException().toString());
                }
            }
        });
```

### 绑定第三方认证方式

绑定第三方认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取需要绑定认证方式的 credential。

```java
// QQ 认证
AuthCredential qqAuthCredential= QQAuthProvider.getCredential(jsonObject.getString("access_token"));

// 微博认证
AuthCredential weiboAuthCredential= WeiboAuthProvider.getCredential(access_token,openid);

// 微信认证
AuthCredential weiXinAuthCredential= WeiXinAuthProvider.getCredential(code);

```

3.使用第三方认证方式绑定。

例如，使用 linkWithCredential 进行绑定：

```java
user.linkWithCredential(authCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(Task<AuthResult> task) {
                if(task.isSuccessful()){
                    Log.d("result","绑定成功");
                }else {
                    Log.d("result","绑定失败"+task.getException().toString());
                }
            }
        });
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  若使用 customToken 登录时，若 customToken 中 admin 属性为 true，则不能进行关联操作。
</blockquote>


## 退出登录

`signOut` 方法用于用户退出登录：

```java
mauth.signOut()
```

## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [用户管理](/auth/Android/guide/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/sync/Android/index.html) 无缝集成：使用匿名登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/auth/Android/guide/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/sync/Android/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。