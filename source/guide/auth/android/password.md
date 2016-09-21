title: 邮箱登录
---

你可以使用  Wilddog Auth  让你的用户使用电子邮件地址和密码进行 Wilddog 身份认证，并管理你的应用基于密码的帐户。

## 开始前的准备工作

1.将 WilddogAuth 添加至你的 Android 项目。

2.将 WilddogAuth 的依赖项添加至你的应用级 build.gradle 文件：
    
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>
3.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

4.在野狗应用控制面板中打开邮箱登录方式:

  *  在野狗控制面板中选择身份认证选项。
  *  在'登录方式'标签中打开邮箱登录方式。


## 创建基于密码的帐户  

 
 要用密码创建一个新用户帐户，请在你的应用登录 Activity 中完成以下步骤：

在你的注册 Activity 的 onCreate 方法中，获取 WilddogAuth 对象的分享实例：

```java
    private WilddogAuth mAuth;
    // 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
    
    mAuth = WilddogAuth.getInstance();
    设置一个响应用户的登录状态变化的 AuthStateListener：
    private WilddogAuth.AuthStateListener mAuthListener;

    // ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // ...
    mAuthListener = new WilddogAuth.AuthStateListener() {
        @Override
        public void onAuthStateChanged( WilddogAuth WilddogAuth) {
            WilddogUser user = WilddogAuth.getCurrentUser();
            if (user != null) {
                // User is signed in
                Log.d(TAG, "onAuthStateChanged:signed_in:" + user.getUid());
            } else {
                // User is signed out
                Log.d(TAG, "onAuthStateChanged:signed_out");
            }
            // ...
        }
    };
    // ...
    }

    @Override
    public void onStart() {
    super.onStart();
    mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    public void onStop() {
    super.onStop();
    if (mAuthListener != null) {
        mAuth.removeAuthStateListener(mAuthListener);
    }
    }
```    
在一个新用户使用你的应用注册表单注册时，完成你的应用所需的任何新帐户认证步骤，例如认证新帐户密码键入正确且符合你的复杂度要求。

通过将新用户的电子邮件地址和密码传递到 `createUserWithEmailAndPassword` 来创建新帐户：

```java
    mAuth.createUserWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete( Task<AuthResult> task) {
                Log.d(TAG, "createUserWithEmail:onComplete:" + task.isSuccessful());

                // If sign in fails, display a message to the user. If sign in succeeds
                // the auth state listener will be notified and logic to handle the
                // signed in user can be handled in the listener.
                if (!task.isSuccessful()) {
                    Toast.makeText(EmailPasswordActivity.this, "Authentication failed.",
                            Toast.LENGTH_SHORT).show();
                }

                // ...
            }
        });
```

如果新帐户创建成功，则也会使该用户登录，并且 AuthStateListener 运行 `onAuthStateChanged` 回调。在此回调中，你可以使用 `getCurrentUser` 方法获取用户的帐户数据。


## 用电子邮件地址和密码登录一个用户

用密码登录一个用户的步骤与创建新帐户的步骤相似。 在你的应用的登录 Activity 中，执行以下操作：

1.在登录 Activity 的 onCreate 方法中获取 WilddogAuth 对象的共享实例：

```java
    private WilddogAuth mAuth;
    // ...
    mAuth = WilddogAuth.getInstance();
```

2.设置一个响应用户的登录状态变化的 AuthStateListener：

```java
    private WilddogAuth.AuthStateListener mAuthListener;

    // ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // ...
    mAuthListener = new WilddogAuth.AuthStateListener() {
        @Override
        public void onAuthStateChanged( WilddogAuth WilddogAuth) {
            WilddogUser user = WilddogAuth.getCurrentUser();
            if (user != null) {
                // User is signed in
                Log.d(TAG, "onAuthStateChanged:signed_in:" + user.getUid());
            } else {
                // User is signed out
                Log.d(TAG, "onAuthStateChanged:signed_out");
            }
            // ...
        }
    };
    // ...
    }

    @Override
    public void onStart() {
    super.onStart();
    mAuth.addAuthStateListener(mAuthListener);
    }

    @Override
    public void onStop() {
    super.onStop();
    if (mAuthListener != null) {
        mAuth.removeAuthStateListener(mAuthListener);
    }
    }
```

当一个用户登录到你的应用时，将该用户的电子邮件地址和密码传递到 `signInWithEmailAndPassword`：

```java
    mAuth.signInWithEmailAndPassword(email, password)
        .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete( Task<AuthResult> task) {
                Log.d(TAG, "signInWithEmail:onComplete:" + task.isSuccessful());

                // If sign in fails, display a message to the user. If sign in succeeds
                // the auth state listener will be notified and logic to handle the
                // signed in user can be handled in the listener.
                if (!task.isSuccessful()) {
                    Log.w(TAG, "signInWithEmail", task.getException());
                    Toast.makeText(EmailPasswordActivity.this, "Authentication failed.",
                            Toast.LENGTH_SHORT).show();
                }

                // ...
            }
        });
```

如果登录成功，AuthStateListener 则会运行 `onAuthStateChanged` 回调。 在此回调中，你可以使用 `getCurrentUser` 方法获取该用户的帐户数据。



## 后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。

在您的应用中，您可以通过 `WilddogAuth.getCurrentUser()` 来获取用户的基本属性。参考 [管理用户](/guide/auth/android/manageuser.html)。

在您的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

您还可以通过 [链接多种登录方式](/guide/auth/android/link.html) 来实现不同的登录方式登录同一个帐号。
调用 signOut: 退出登录：

```java
mauth.SignOut();
```

可能发生的错误，请参考 处理错误。