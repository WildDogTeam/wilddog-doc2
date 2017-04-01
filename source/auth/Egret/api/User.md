
title: User
---

wilddog.User 对象包含所有维护帐户个人信息的接口，我们不能直接创建此对象，只能通过 `wilddog.auth().currentUser` 或者部分登录接口来获取 User 的实例。

## 属性

### displayName

**定义**

```js
nullable string
```

**说明**

帐户名称

</br>

------

### email

**定义**

```js
nullable string
```

**说明**

帐户主邮箱地址

</br>

------

### phone

**定义**

```js
nullable string
```

**说明**

帐户手机号

</br>

------

### emailVerified

**定义**

```js
boolean
```

**说明**

帐户的主邮箱是否被验证过

</br>

------

### phoneVerified

**定义**

```js
boolean
```

**说明**

帐户的手机号是否被验证过

</br>

------

### isAnonymous

**定义**

```js
boolean
```

**说明**

帐户是否是匿名帐户认证

</br>

------

### photoURL

**定义**

```js
nullable string
```

**说明**

帐户照片地址

</br>

------

### providerData

**定义**

```js
non-null Array of wilddog.UserInfo
```

**说明**

帐户下所有身份提供商信息

**返回值**

[wilddog.UserInfo](/auth/Web/api/UserInfo.html)

</br>

------

### providerId

**定义**

```js
string
```

**说明**

当前帐户登录使用的身份认证提供商名称，例如 weibo，weixin。

</br>

------

### uid

**定义**

```js
string
```

**说明**

Wilddog Id

</br>

------

## 方法

### getToken

**定义**

```js
getToken()
```

**说明**

获取当前账户的token

----

### link

**定义**

```js
link(credential)
```

**说明**

帐户使用令牌关联其他身份提供商信息。

**参数**


| 参数名       | 描述          |
| ---------- | ----------- |
| credential | [wilddog.auth.Credential](/auth/Web/api/Credential.html)特定登录方式的认证凭据 |

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[wilddog.User](/auth/Web/api/User.html)>

**参考**

可能发生的错误：

- provider_already_linked 表示尝试关联的登录方式的类型已经关联到此帐户。
- email_already_in_use 表示尝试关联的凭据(邮箱密码登录的凭据)已与另一个不同 Wilddog 帐户关联。
- authentication_disabled 表示要关联的登录方式没有打开，可以在野狗的控制面板中打开这个选项。

</br>

----

### linkWithPopup

**定义**

```js
linkWithPopup(provider)
```

**参数**

| 参数名      | 描述                                       |
| -------- | ---------------------------------------- |
| provider | [wilddog.auth.Provider](/auth/Web/api/Provider.html) 类型，特定登录方式的实例 |


**说明**

使用 popup 方式关联 OAuth 登录方式

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[wilddog.User](/auth/Web/api/User.html)>

**示例**

```js
// 关联微博登录
var provider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().currentUser
    .linkWithPopup(provider)
    .then(function (user) {
        console.info("link weibo->", user);
    })
    .catch(function (err) {
        console.info(err);
    });
```

**描述**

可能发生的错误：

- authentication_disabled 表示匿名方式没有打开，可以在野狗的控制面板中打开这个选项。

</br>

----
### linkWithRedirect

**定义**

```js
linkWithRedirect(provider)
```

**说明**

通过浏览器跳转的形式为用户关联新的 OAuth 登录方式。

**参数**

| 参数名      | 描述                                       |
| -------- | ---------------------------------------- |
| provider | [wilddog.auth.Provider](/auth/Web/api/Provider.html)类型，特定登录方式的实例 |

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[wilddog.User](/auth/Web/api/User.html)>

**示例**

```js
// 关联微博登录
var provider = new wilddog.auth.WeiboAuthProvider();
wilddog.auth().currentUser
    .linkWithRedirect(provider)
    .then(function (user) {
        console.info("link weibo->", user);
    })
    .catch(function (err) {
        console.info(err);
    });

```

**参考**

可能发生的错误：

- authentication_disabled 表示匿名方式没有打开，可以在野狗的控制面板中打开这个选项。

<br/>

----

### unlink

**定义**

```js
unlink(providerId)
```

**说明**

取消帐户的特定登录方式

**参数**

| 参数名        | 描述                                       |
| ---------- | ---------------------------------------- |
| providerId | providerId为特定身份提供商。野狗当前支持的各 Provider 的 ID : weibo、weixin、weixinmq、qq 和 password。 |

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[Void](/auth/Web/api/Void.html)>

**示例**：

```js
// 取消微博登录
wilddog.auth().currentUser
    .unlink('weibo')
    .then(function () {
        console.info("unlink weibo success");
    })
    .catch(function (err) {
        console.info(err);
    });

```

</br>

----

### delete

**定义**

```js
delete()
```

**说明**

删除当前用户，删除成功之后会退出登录

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[Void](/auth/Web/api/Void.html)>

</br>

----


### updateProfile

**定义**

```js
updateProfile(profile)
```

**说明**

更新用户个人信息。

**参数**

| 参数名     | 描述                                       |
| ------- | ---------------------------------------- |
| profile | profile为object的类型，当前仅支持 `phototURL` 和 `displayName` **参数**，这两个参数至少需要有一个不为空。 |

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[wilddog.User](/auth/Web/api/User.html)>

**示例**

```js
wilddog.auth().currentUser
    .updateProfile({
     'photoURL': photoUrl,
     'displayName': displayName,
    })
    .then(function (user) {
        console.info('update user ->', user);
    })
    .catch(function (err) {
        console.info("update user info failed.", err);
    });
```

**参考**

可能发生的错误：

- display_name_length_error  更新名称时,名称过长,目前支持名称在20位之内
- photo_url_length_error 更新头像时,头像链接过长,目前头像链接最多支持1024个字符


</br>

----
### updateEmail

**定义**

```js
updateEmail(email)
```

 **说明**

修改当前用户的邮箱，修改成功之后会触发 [onAuthStateChanged](/auth/Web/api/Auth.html#onAuthStateChanged)

**参数**

| 参数名   | 描述     |
| ----- | ------ |
| email | 新邮箱地址。 |

**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[wilddog.User](/auth/Web/api/User.html)>


**参考**

可能发生的错误：

- email_already_in_use            表示该电子邮件已被另一个帐户使用。
- invalid_email                   表示该电子邮件地址格式不正确。
- credential_too_old_login_again  更新用户电子邮件是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误,调用 reauthenticate(credential),来对该用户重新进行身份认证。

</br>

----
### updatePhone

**定义**

```js
updatePhone(phone)
```

 **说明**

修改当前用户的手机号，修改成功之后会触发 [onAuthStateChanged](/auth/Web/api/Auth.html#onAuthStateChanged)

**参数**

| 参数名   | 描述     |
| ----- | ------ |
| phone | 新邮箱地址。 |

**返回值**

[wilddog.Promise](/api/auth/web/Promise.html).<[wilddog.User](/api/auth/web/User.html)>


**参考**

可能发生的错误：

- phone_already_in_use            表示该手机号已被另一个帐户使用。
- invalid_phone                   表示该手机号地址格式不正确。
- credential_too_old_login_again  更新用户手机号是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误,调用 reauthenticate(credential),来对该用户重新进行身份认证。

</br>

----

### updatePassword

**定义**

```js
updatePassword(password)
```

**说明**

修改当前用户的密码，修改成功之后会触发 [onAuthStateChanged](/auth/Web/api/Auth.html#onAuthStateChanged)

**参数**

| 参数名      | 描述   |
| -------- | ---- |
| password | 新密码。 |

**返回值**
[wilddog.Promise](/api/auth/web/Promise.html).<[wilddog.User](/api/auth/web/User.html)>


**参考**

可能发生的错误：
- credential_too_old_login_again 更新用户密码是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误,调用 reauthenticate(credential)，对该用户重新进行身份认证。

</br>

----

### reauthenticate

**定义**

```js
reauthenticate(credential)
```

**说明**

使用 [wilddog.auth.Credential](/auth/Web/api/Credential.html) 为用户重新认证，某些敏感操作（比如更新用户密码）对用户认证时间有较为严格的要求，这个时候你可以调用这个方法来刷新用户的认证信息。

**参数**

| 参数名        | 描述                                       |
| ---------- | ---------------------------------------- |
| credential | [wilddog.auth.Credential](/auth/Web/api/Credential.html) 类型，特定登录方式的认证凭据 |


**返回值**

[wilddog.Promise](/auth/Web/api/Promise.html).<[Void](/auth/Web/api/Void.html)>

**示例**

```js
// 根据用户邮箱和密码进行重新认证
wilddog.auth().currentUser
    .reauthenticate(wilddog.auth.EmailAuthProvider.credential(email, pwd))
    .then(function (user) {
        console.info("link email.", user);
    })
    .catch(function (err) {
        console.info("link email failed.", err.code, err);
    });
```

</br>

----

### sendEmailVerification

为当前用户的邮箱发送确认邮件。

**定义**

sendEmailVerification()

**返回**

 [wilddog.Promise](/api/auth/web/Promise.html).<[Void](/api/auth/web/Void.html)>

</br>

----

### sendPhoneVerification

为当前用户的手机号发送短信获取验证码。

**定义**

sendPhoneVerification()

**返回**

 [wilddog.Promise](/api/auth/web/Promise.html).<[Void](/api/auth/web/Void.html)>


</br>

----

### verifiyPhone

根据验证码确认手机号。

**定义**

verifiyPhone(code)

**参数**

| 参数名      | 描述       |
| -------- | -------- |
| code    | 用户的手机上收到的验证码。 |

**参考**

**返回**

 [wilddog.Promise](/api/auth/web/Promise.html).<[Void](/api/auth/web/Void.html)>
