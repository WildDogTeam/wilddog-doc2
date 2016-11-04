
title: 用户管理
---

本篇文档介绍如何使用 Wilddog Auth 管理用户。它包括：创建用户、获取用户信息、获取用户属性、更新用户信息、删除用户等。

## 创建用户

创建用户包含以下三种方法：

- 通过 [手机号密码](/guide/auth/android/phone.html) 创建
- 通过 [邮箱密码](/guide/auth/android/password.html) 创建
- 通过第三方身份认证提供商授权创建
- 在 控制面板—身份认证—用户 中手动创建


## 获取用户信息

用户信息包含 [用户属性](/guide/auth/core/concept.html#用户属性) 及用户的登录信息。

### 获取当前登录用户

获取当前登录用户是管理用户的基础。

使用监听器：

```java
WilddogAuth auth = WilddogAuth.getInstance();

auth.addAuthStateListener(new WilddogAuth.AuthStateListener(){
    // 设置 Auth 监听器
    @Override
    public void onAuthStateChanged(WilddogAuth wilddogauth){
        WilddogUser user = wilddogauth.getCurrentUser();
        if (user != null) {
            // 用户已登录
        } else {
            // 没有用户登录
        }
    }
});
```


使用 `getCurrentUser ()` 方法获取当前登录：


```java
WilddogAuth auth = WilddogAuth.getInstance();
WilddogUser user = auth.getCurrentUser();
if (user != null) {
   // 用户已登录
} else {
   // 没有用户登录
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  推荐使用监听器，这样可以保证在你获取当前用户时 Auth 实例不会处于中间状态，如用户正在登录时。 用户可以在登陆后通过 WilddogAuth.getInstance().getCurrentUser() 在任何需要的时候获取到 WilddogUser 对象。
</blockquote>

### 获取用户属性

 `WilddogUser` 实例可以用于获取用户属性。

```java
WilddogUser user = auth.getCurrentUser();
if (user != null) {
    String uid = user.getUid();
    String providerId = user.getProviderId();
    String phone = user.getPhone();
    String name = user.getDisplayName();
    Uri photoUrl = user.getPhotoUrl();
    String email = user.getEmail();
} else {
    // 没有用户登录.
}
```

### 获取 Provider 的用户属性

 `providerData` 用于获取所有 [Provider](/guide/auth/core/concept.html#Provider) 的用户属性。

```java
WilddogUser user = auth.getCurrentUser();
    String uid = user.getUid();
    List<WilddogUser> userProviderInfos = user.getProviderData();
    for (UserInfo profile : userProviderInfos) {
        String providerId = profile.getProviderId();
        String uid = profile.getUid();
        String name = profile.getDisplayName();
        String email = profile.getEmail();
        Uri photoUrl = profile.getPhotoUrl();
    };

```

## 更新用户信息
 `WilddogUser` 实例用于更新 [用户属性](/guide/auth/core/concept.html#用户属性) 及用户的登录信息。

### 更新用户属性

`updateProfile()` 方法用于更新用户属性。

例如，更新用户的`displayName` 和 `photoURL` 属性：

```java
WilddogUser user = auth.getCurrentUser();

UserProfileChangeRequest profileUpdates = new  UserProfileChangeRequest.Builder()
    .setDisplayName("name")
  .setPhotoUri(Uri.parse("https://example.com/path/photo.jpg"))
    .build();

user.updateProfile(profileUpdates)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                // 更新成功
            }else{
               // 发生错误
            }
        }
    });
```
<blockquote class="warning">
  <p><strong>注意：</strong></p>
  使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户属性。
</blockquote>

### 更新用户手机号

`updatePhone()` 方法用于更新用户手机号。

```java
WilddogUser user = auth.getCurrentUser();
String phone = "12345678901";

user.updatePhone(phone)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                // 更新成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
            }
        }
    });
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  <ul>
    <li>要更新手机号，该用户必须最近登录过。请参考 [重新进行身份认证](/guide/auth/android/manageuser.html#重新进行身份认证)。</li>
    <li>使用 customToken 登录时，若该登录用户为 admin 用户，则不能更新用户手机号。</li>
  </ul>
</blockquote>


### 重置手机号认证密码

1.发送重置密码的手机验证码：

```java
String phone = "18888888888";

auth.sendPasswordResetSms(phone)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
             if (task.isSuccessful()) {
                // 发送成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
            }
        }
    });
```
2.确认重置密码手机验证码：

```java
String phone = "18888888888";
String code = "090909";
String newPass = "newpassword123";
auth.confirmPasswordResetSms(phone，code，newPass)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
             if (task.isSuccessful()) {
                // 重置成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
            }
        }
    });
```


### 更新邮箱地址

 `updateEmail()` 方法用于更新用户邮箱地址。

```java
WilddogUser user = auth.getCurrentUser();
user.updateEmail("12345678@gmail.com")
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
               // 更新成功
            }else{
              // 发生错误
              Log.d("result" ,task.getException().toString()) ;
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

### 更新用户邮箱或手机号认证密码

`updatePassword()` 方法用于更新用户邮箱或手机号认证密码。

```java
WilddogUser user = auth.getCurrentUser();
String newPassword = "12345678";
user.updatePassword(newPassword)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            if (task.isSuccessful()) {
                // 更新成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
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



### 发送重置密码邮件

`sendPasswordResetEmail()` 方法用于向用户发送重设密码邮件。

```java
String emailAddress = "12345678@gmail.com";
auth.sendPasswordResetEmail(emailAddress)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
             if (task.isSuccessful()) {
                // 更新成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
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
                // 删除成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
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

- 删除帐户
- 设置主邮箱地址
- 更改密码

此时需要重新对用户进行身份认证。

`reauthenticate(credential)` 方法用于对用户重新进行身份认证。

```java
WilddogUser user = auth.getCurrentUser();
AuthCredential credential = EmailAuthProvider
    .getCredential("12345678@gmail.com", "12345678");
user.reauthenticate(credential)
    .addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete( Task<Void> task) {
           if (task.isSuccessful()) {
                // 重新认证成功
            }else{
               // 发生错误
        Log.d("result",task.getException().toString()) ;
            }
        }
    });
```