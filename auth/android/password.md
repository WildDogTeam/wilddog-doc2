title: 基于密码的身份认证
---

你可以使用  Wilddog Auth  让你的用户使用电子邮件地址和密码进行 Wilddog 身份认证，并管理你的应用基于密码的帐户。

## 开始前的准备工作

1.将 WilddogAuth 添加至你的 Android 项目。

2.将 WilddogAuth 的依赖项添加至你的应用级 build.gradle 文件：
    
    compile 'com.wilddog.wilddogauth:wilddog-auth:1.0.0'
3.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

4.在野狗应用控制面板中打开邮箱登录方式:

  *  在野狗控制面板中选择身份认证选项。
  *  在'登录方式'标签中打开邮箱登录方式。


## 创建基于密码的帐户  

 
 要用密码创建一个新用户帐户，请在你的应用登录 Activity 中完成以下步骤：

在你的注册 Activity 的 onCreate 方法中，获取 FirebaseAuth 对象的分享实例：

    private WilddogAuth mAuth;
    // ...
    mAuth = WilddogAuth.getInstance("YOURAPPID",this);
    设置一个响应用户的登录状态变化的 AuthStateListener：
    private WilddogAuth.AuthStateListener mAuthListener;

    // ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // ...
    mAuthListener = new WilddogAuth.AuthStateListener() {
        @Override
        public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
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
    
在一个新用户使用你的应用注册表单注册时，完成你的应用所需的任何新帐户认证步骤，例如认证新帐户密码键入正确且符合你的复杂度要求。

通过将新用户的电子邮件地址和密码传递到 `createUserWithEmailAndPassword` 来创建新帐户：

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
如果新帐户创建成功，则也会使该用户登录，并且 AuthStateListener 运行 `onAuthStateChanged` 回调。在此回调中，你可以使用 `getCurrentUser` 方法获取用户的帐户数据。


## 用电子邮件地址和密码登录一个用户

用密码登录一个用户的步骤与创建新帐户的步骤相似。 在你的应用的登录 Activity 中，执行以下操作：

1.在登录 Activity 的 onCreate 方法中获取 FirebaseAuth 对象的共享实例：

    private WilddogAuth mAuth;
    // ...
    mAuth = WilddogAuth.getInstance("YOURAPPID",this);
    
2.设置一个响应用户的登录状态变化的 AuthStateListener：

    private FirebaseAuth.AuthStateListener mAuthListener;

    // ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    // ...
    mAuthListener = new FirebaseAuth.AuthStateListener() {
        @Override
        public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
            FirebaseUser user = firebaseAuth.getCurrentUser();
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
当一个用户登录到你的应用时，将该用户的电子邮件地址和密码传递到 `signInWithEmailAndPassword`：

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
如果登录成功，AuthStateListener 则会运行 `onAuthStateChanged` 回调。 在此回调中，你可以使用 `getCurrentUser` 方法获取该用户的帐户数据。



## 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 规则表达式，auth 还可以控制野狗实时数据库的用户访问权限。

在你的应用中，你可以通过 WilddogUser 来获取用户的基本属性。参考 管理用户。
在你的野狗实时数据库 规则表达式 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

你还可以通过 链接多种登录方式 来实现不同的登录方式登录同一个帐号。
调用 signOut: 退出登录：

    mauth.SignOut();
    

可能发生的错误，请参考处理错误。