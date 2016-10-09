
title: 用户管理
---

本篇文档介绍如何使用 Wilddog Auth 管理用户。它包括：创建用户、获取用户信息、获取用户属性、更新用户信息、删除用户等。

## 创建用户

创建用户包含以下三种方法

- 通过 [邮箱密码](/guide/auth/android/password.html) 创建
- 通过第三方身份认证提供商授权创建
- 在 控制面板—身份认证—用户 中手动创建


## 获取用户信息

用户信息包含 [用户属性](/guide/auth/core/concept.html#用户属性) 及用户的登录信息。

### 获取当前登录用户

获取当前登录用户是管理用户的基础。

获取当前登录用户包含以下一种方法
- 使用 `getCurrentUser（）` 方法

使用 `currentUser` 方法：


```javascript
WilddogAuth auth = WilddogAuth.getInstance()
WilddogUser user = auth.getCurrentUser();
if (user != null) {
     // 用户已登录
} else {
     // 没有用户登录
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  推荐使用监听器，这样可以保证在你获取当前用户时 Auth 实例不会处于中间状态，如用户正在登录时。
</blockquote>

### 获取用户属性

 `WilddogUser` 实例可以用于获取用户属性。

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

### 获取 Provider 的用户属性

 `providerData` 用于获取所有 [Provider](/guide/auth/core/concept.html#Provider) 的用户属性。

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
    };
} else {
    // No user is signed in.
}
```

## 更新用户信息
 `WilddogUser` 实例用于更新 [用户属性](/guide/auth/core/concept.html#用户属性) 及用户的登录信息。

### 更新用户属性

`updateProfile()` 方法用于更新用户属性。

例如，更新用户的`displayName` 和 `photoURL` 属性：

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
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户属性。
</blockquote>

### 更新邮箱地址

 `updateEmail()` 方法用于更新用户邮箱地址。

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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要更新用户的邮箱地址，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/android/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新邮箱地址。</li>
  </ul>
</blockquote>

### 更新用户密码

`updatePassword()` 方法用于更新用户密码。

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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要更新密码，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/android/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户密码。</li>
  </ul>
</blockquote>


### 发送重设密码邮件

`sendPasswordResetEmail()` 方法用于向用户发送重设密码邮件。

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

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  在控制面板 身份认证—登录方式—邮箱登录 中可以设置邮件自定义模板。
</blockquote>


## 删除用户

删除用户的方式有以下两种：

- 通过 `delete()` 方法删除
- 在控制面板**身份认证—用户** 中手动删除

使用 `delete()` 方法：

```java
auth.getCurrentUser().delete()
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                Log.d(TAG, "User account deleted.");
            }
        }
    });
```

使用控制面板：

 ![](/images/deleteuser.jpg)

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要删除用户，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/android/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户密码。</li>
  </ul>
</blockquote>



## 重新进行身份认证

用户长时间未登录的情况下进行下列安全敏感操作会失败：

- 删除账户
- 设置主邮箱地址
- 更改密码

此时需要重新对用户进行身份认证。

`reauthenticate(credential)` 方法用于对用户重新进行身份认证。

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