
title:  绑定多种认证方式
---

本篇文档介绍在 Wilddog Auth 中如何给同一个账号绑定多种认证方式。


## 前期准备

1. 在控制面板 身份认证—登录方式 中打开需要绑定的登录方式。
2. 配置需要绑定的登录方式。具体配置方法请参考对应文档。


## 实现绑定多种认证方式

### 绑定邮箱认证方式

绑定邮箱认证方式需要以下三个步骤：

1.以任意一种认证方式登录一个帐号。

2.获取邮箱认证方式的 credential。

```java
AuthCredential authCredential= EmailAuthProvider.getCredential("12345678@wilddog.com","password123");
```

3.使用邮箱认证方式绑定。

```java
WilddogUser user = WilddogAuth.getInstance().getCurrentUser();

user.linkWithCredential(authCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
     if(var1.isSuccessful()){
         Log.d("success","Link success");
     }else {
         Log.d("failure","Link failure"+var1.getException().toString());
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
AuthCredential authCredential= QQAuthProvider.getCredential(access_token); 

// 微博认证
AuthCredential authCredential= WeiboAuthProvider.getCredential(access_token,openid);

// 微信认证
AuthCredential authCredential= WeiXinAuthProvider.getCredential(code);
```

3.使用第三方认证方式绑定。

例如，使用 linkWithCredential 进行绑定：

```java
WilddogUser user = WilddogAuth.getInstance().getCurrentUser();
user.linkWithCredential(authCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
     if(var1.isSuccessful()){
         Log.d("success","Link success");
     }else {
         Log.d("failure","Link failure"+var1.getException().toString());
     }
    }
});
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  若使用 customToken 登录时，若 customToken 中 admin 属性为 true，则不能进行关联操作。
</blockquote>


## 解除已绑定认证方式

`unlink()` 方法用于解除已绑定认证方式。

例如，解除微信绑定：

```java
WilddogUser user = WilddogAuth.getInstance().getCurrentUser();
user.unlink("weixin").addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(Task<AuthResult> task) {
                if(task.isSuccessful()){
                    Log.d("result","解绑成功");
                }else {
                    Log.d("result","解绑失败"+task.getException().toString());
                }
            }
        })
```
