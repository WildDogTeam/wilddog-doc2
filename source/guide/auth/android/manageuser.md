
title: 管理用户
---

## 创建用户

通过调用 `createUserWithEmailAndPassword` 方法或首次使用第三方登录方式（如 `signInWithCredential(qqAuthCredential)`等）登录一个用户，就可以在你的 Wilddog 项目中创建一个新用户。


你也可以从 Wilddog 控制面板的身份“认证部分”的“用户”页面中创建新的密码认证用户。


## 获取当前登录用户

获取当前用户的推荐方法是在 WilddogAuth 对象上设置一个侦听器：

```java
// 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
WilddogAuth auth=WilddogAuth.getInstance();
WilddogAuth.AuthStateListener authStateListener=new WilddogAuth.AuthStateListener(){
    @Override
    public void onAuthStateChanged(WilddogAuth wilddogAuth) {
        WilddogUser user=wilddogauth.getCurrentUser();
        if(user!=null){
         // User is signed in.
          Log.d(TAG, "onAuthStateChanged:signed_in:" + user.getUid());
        }else{
         // No user is signed in.
           Log.d(TAG, "onAuthStateChanged:signed_out");
        }
    }
};
auth.addAuthStateListener(authStateListener);
```

使用侦听器可保证在你获取当前用户时 `WilddogAuth` 对象不会处于中间状态如初始化。
你也可以使用 `getCurrentUser` 方法获取当前已登录的用户。 如果用户没有登录，`currentUser` 则为空：

```java
WilddogUser user=auth.getCurrentUser();
if(user!=null){
 // User is signed in.
}else{
 // No user is signed in.
}
```

注：getCurrentUser 可能为空，这是因为 auth 对象尚未完成初始化。 如果你使用侦听器跟踪用户登录状态，你将无需处理该情况。

## 获取个人资料

要获取用户的个人资料信息，请使用 `WilddogUser` 实例的访问器方法。 例如：

```java
WilddogUser user = auth.getCurrentUser();
if (user != null) {
    // User is signed in.
    // The uid properties and providerId will never be empty.
    // The user's ID, unique to the Wilddog
    // project. Do NOT use this value to
    // authenticate with your backend server, if
    // you have one. Use
    // user.getToken: instead.
    String uid = user.getUid();
    String providerId = user.getProviderId();
    // The displayName and photoUrl in QQ or Weichat login will not be
    // empty.
    String name = user.getDisplayName();
    Uri photoUrl = user.getPhotoUrl();
    // The email will not be empty only by email login.
    String email = user.getEmail();
} else {
    // No user is signed in.
}
```

## 获取第三方个人资料信息

要从已链接至用户的第三方登录中获取检索到的个人资料信息，请使用 providerData 属性。 例如：

```java
WilddogUser user = auth.getCurrentUser();
if (user != null) {
    // User is signed in.
    String uid = user.getUid();
    List<WilddogUser> userProviderInfos = user.getProviderData();
    for (UserInfo profile : userProviderInfos) {
        // Id of the provider (ex: qq)
        String providerId = profile.getProviderId();

        // UID specific to the provider
        String uid = profile.getUid();

        // Name, email address, and profile photo Url
        String name = profile.getDisplayName();
        String email = profile.getEmail();
        Uri photoUrl = profile.getPhotoUrl();
    }
    ;
} else {
    // No user is signed in.
}
```

## 更新个人资料

你可以使用 `updateProfile` 方法更新用户的基本个人资料信息—用户的显示名称和个人资料照片网址。 例如：

```java
WilddogUser user = auth.getCurrentUser();

UserProfileChangeRequest profileUpdates = new  UserProfileChangeRequest.Builder()
    .setDisplayName("xiaofei")
    .setPhotoUri(Uri.parse("https://example.com/jane-q-user/profile.jpg"))
    .build();

user.updateProfile(profileUpdates)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "User profile updated.");
            }

        }
    });
```

## 设置邮箱地址

你可以使用 `updateEmail` 方法设置用户的电子邮件地址。例如：

```java
WilddogUser user = auth.getCurrentUser();

user.updateEmail("user@example.com")
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "User email address updated.");
            }
        }
    });
```

重要说明：要设置用户的电子邮件地址，该用户必须最近登录过。请参阅对用户重新进行身份认证。

## 设置用户密码
你可以使用 'updatePassword' 方法设置用户密码。例如：

```java
WilddogUser user = auth.getCurrentUser();
String newPassword = "SOME-SECURE-PASSWORD";

user.updatePassword(newPassword)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "User password updated.");
            }
        }
    });
```

重要说明：要设置用户密码，该用户必须最近登录过。请参阅对用户重新进行身份认证。

## 发送重设密码邮件
你可以用 `sendPasswordResetEmail` 方法向用户发送一封重设密码电子邮件。 例如：

```java
String emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "Email sent.");
            }
        }
    });
```

你可以在 `Wilddog` 控制台 的“用户认证”部分的“邮件模板”页面中自定义使用的电子邮件模板。

你也可以从 `Wilddog` 控制面板中发送重设密码电子邮件。


## 删除用户
你可以使用 `delete` 方法删除用户帐户。例如：

```java
WilddogUser user = auth.getCurrentUser();

user.delete()
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "User account deleted.");
            }
        }
    });
```

重要说明：要删除用户，该用户必须最近登录过。请参阅对用户重新进行身份认证。

你可以从 Wilddog 控制面板的“用户认证”部分的“用户”页面中删除用户。


## 重新进行身份认证
有些安全敏感性操作—如删除帐户、设置主电子邮件地址和更改密码—需要用户最近登录过方可执行。

如果你执行一项这种操作，而该用户只是在很久以前登录过，该操作便会失败并引发 `WilddogAuthRecentLoginRequiredException`。发生这种错误时，请从用户获取新登录凭据并将该凭据传输至 `reauthenticate`，对该用户重新进行身份认证。

例如：

```java
WilddogUser user = auth.getCurrentUser();

// Get auth credentials from the user for re-authentication. The example below shows
// email and password credentials but there are multiple possible providers,
// such as QQAuthProvider or WeixinAuthProvider.
AuthCredential credential = EmailAuthProvider
    .getCredential("user@example.com", "password1234");

// Prompt the user to re-provide their sign-in credentials
user.reauthenticate(credential)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete( Task<Void> task) {
            Log.d(TAG, "User re-authenticated.");
        }
    });
```
