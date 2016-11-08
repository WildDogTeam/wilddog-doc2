
title:  邮箱登录
---

本篇文档介绍在 Wilddog Auth 中如何使用邮箱地址和密码对用户进行身份认证。

## 前期准备

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. 在控制面板 身份认证—登录方式 中打开邮箱登录方式。


## 创建用户

用邮箱密码创建一个新用户，需完成以下步骤：

1.安装 Wilddog Auth SDK：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>

2.初始化 Wilddog Auth 实例：

```java 
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
mAuth = WilddogAuth.getInstance();
```

3.使用 `createUserWithEmailAndPassword(email,password) ` 方法创建新用户：

```java
  mAuth.createUserWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete( Task<AuthResult> task) {
                if (task.isSuccessful()) {
                   // 获取用户
                 WilddogUser user = task.getResult().getWilddogUser();
                  Log.d("result",user.toString());
                }
				else{
                  // 错误处理
                 Log.d("result",task.getException().toString());
                  
				} 
            }
        });
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果新用户创建成功，默认会处于登录状态，并且你可以在回调方法中获取登录用户。
</blockquote>


## 登录用户

1.安装 Wilddog Auth SDK：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>


2.初始化 Wilddog Auth 实例：

```java 
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
mAuth = WilddogAuth.getInstance();
```

3.将该用户的电子邮件地址和密码传递到 `signInWithEmailAndPassword(email,password)`，即可在你应用中登录此用户：

```java
  mAuth.signInWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete( Task<AuthResult> task) {
                Log.d(TAG, "signInWithEmail:onComplete:" + task.isSuccessful());
                if (!task.isSuccessful()) {
                    Log.w(TAG, "signInWithEmail", task.getException());
                    Toast.makeText(EmailPasswordActivity.this, "Authentication failed.",
                            Toast.LENGTH_SHORT).show();
                }

            }
        });
```


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  如果用户成功登录，你可以在回调方法中获取登录用户。
</blockquote>


## 退出登录

 `signOut()` 方法用于用户退出登录：

```java
mauth.signOut();
```


## 更多使用

- 通过 `WilddogAuth.getInstance().getCurrentUser()` 获取当前用户并管理用户。详情请参考 [管理用户](/guide/auth/android/manageuser.html)。


- Wilddog Auth 可以将你的应用与 [Wilddog Sync](/overview/sync.html) 无缝集成：使用邮箱登录后，Wilddog Auth 将给用户生成 [Wilddog ID](/guide/auth/core/concept.html#Wilddog-ID)。Wilddog ID 结合 [规则表达式](/guide/sync/rules/introduce.html)，可以控制 Wilddog Sync 的用户访问权限。









