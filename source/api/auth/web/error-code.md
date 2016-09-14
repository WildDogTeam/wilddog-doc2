
title:  错误码
---

本次Auth API中,关于 Auth 和 User 相关操作,回调中能够catch Error信息,下面简单列举了核心接口中错误信息。

## 通用错误错误码

| 错误信息                 | 描述             |
| -------------------- | -------------- |
| email_already_in_use | 邮箱已经被其他用户使用。   |
| user_not_found       | 用户没有找到。        |
| invalid_email        | 表示电子邮箱地址格式不正确。 |

## 特定错误错误码

### Auth

fetchProvidersForEmail(email)

| 错误信息          | 描述             |
| ------------- | -------------- |
| invalid_email | 表示电子邮件地址格式不正确。 |

signInWithEmailAndPassword(emai,password)

| 错误信息                    | 描述                                      |
| ----------------------- | --------------------------------------- |
| authentication_disabled | 表示邮箱登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用。 |
| invalid_email           | 表示电子邮件地址格式不正确。                          |
| invalid_password        | 表示用户尝试用错误密码登录。                          |

signInWithCredential(credential)


| 错误信息                    | 描述                                    |
| ----------------------- | ------------------------------------- |
| authentication_disabled | 表示登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用。 |
| invalid_email           | 表示电子邮件地址格式不正确。                        |
| invalid_password        | 表示用户尝试用错误密码登录。                        |

signInAnonymously()

| 错误信息                    | 描述                                      |
| ----------------------- | --------------------------------------- |
| authentication_disabled | 表示匿名登录方式未打开，请在 Wilddog 控制面板的“用户认证”部分启用。 |

signInWithCustomToken(token)

| 错误信息          | 描述           |
| ------------- | ------------ |
| invalid_token | 表示自定义令牌认证错误。 |

createUserWithEmailAndPassword(email,password)

| 错误信息                    | 描述                                       |
| ----------------------- | ---------------------------------------- |
| invalid_user            | 表示该电子邮件地址格式不正确。                          |
| email_already_in_use    | 表示用于尝试注册的电子邮件已经存在。请调用 fetchProvidersForEmail 检查该用户使用哪些登录机制并提示该用户以这些机制之一登录。 |
| authentication_disabled | 表示邮箱登录方式未打开, 请在Wilddog 的控制面板的'用户认证'部分开启  |

### User

User 操作常见错误

| 错误信息                           | 描述                         |
| ------------------------------ | -------------------------- |
| credential_too_old_login_again | token 失效，您必须提示该用户在此设备重新登录。 |

updateEmail(email)

| 错误信息                           | 描述                                       |
| ------------------------------ | ---------------------------------------- |
| email_already_in_use           | 表示该电子邮件已被另一个帐户使用。                        |
| invalid_email                  | 表示该电子邮件地址格式不正确。                          |
| credential_too_old_login_again | 更新用户电子邮件是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误,调用reauthenticate(credential),来对该用户重新进行身份认证。 |

updateProfile()

| 错误信息                      | 描述                             |
| ------------------------- | ------------------------------ |
| display-name-length-error | 更新名称时,名称过长,目前支持名称在20位之内        |
| photo-url-length-error    | 更新头像时,头像链接过长,目前头像链接最多支持1024个字符 |

updatePassword(password)

| 错误信息                           | 描述                                       |
| ------------------------------ | ---------------------------------------- |
| credential_too_old_login_again | 更新用户密码是一项安全相关操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误,调用reauthenticate(credential)，对该用户重新进行身份认证。 |

linkWithCredential(credential)

| 错误信息                    | 描述                                       |
| ----------------------- | ---------------------------------------- |
| provider_already_linked | 表示尝试关联的登录方式的类型已经关联到此帐户。                  |
| email_already_in_use    | 表示尝试关联的凭据已与另一个不同 Wilddog 帐户关联。           |
| authentication_disabled | 表示用该凭据表示的用户身份提供程序尚未启用。请在 Wilddog 控制面板的“用户认证”部分启用。 |

sendEmailVerification()

| 错误信息           | 描述          |
| -------------- | ----------- |
| user_not_found | 表示未找到该用户帐户。 |

delete()

| 错误信息                           | 描述                                       |
| ------------------------------ | ---------------------------------------- |
| credential_too_old_login_again | 敏感操作，需要该用户的最近一次登录。此错误表示该用户近期长时间没有登录过。要解决此错误，需要调用reauthenticate(credential)，对该用户重新进行身份认证。 |




