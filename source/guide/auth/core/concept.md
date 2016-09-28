
title: 基础概念
---

## Wilddog ID
用户第一次登录后，Wilddog Auth 会生成一个唯一的标识，帮助你在应用中确认每个用户的身份，这个标识被称为 Wilddog ID。


## 用户属性

Wilddog Auth 中用户有一组基本属性：Wilddog ID、主邮箱地址、名称、照片地址。

你可以配合 Wilddog Sync 添加其他属性。



## Provider

Provider 是身份认证提供方，Wilddog Auth 目前支持以下 Provider：

- 电子邮件地址与密码
- QQ 
- 微信
- 微信公众号 
- 微博


## 当前用户

在 Wilddog 应用中，当一个用户注册或登录时，这个用户被称为当前用户。获取当前用户后，可以对其进行管理。


## 用户生命周期

用户生命周期是指用户从注册或登录到退出登录的变化过程。

用户生命周期包含以下三种状态

- 用户注册或登录成功
- 当前的 [Wilddog ID Token]() 已刷新
- 退出登录


## 身份认证令牌

身份认证令牌用于获取访问用户的权限

包含以下三种


| 令牌名称              | 描述                                       |
| ----------------- | ---------------------------------------- |
| Wilddog ID Token  | 用于获取 Wilddog Auth 用户的访问权限。用户登录 Wilddog 应用时由 Wilddog Auth 创建。该 Token 包含用户的用户属性。|
| OAuth accessToken | 用于获取 OAuth 提供商用户的访问权限，由 OAuth 提供商创建。|
| Wilddog CustomToken   | 用于获取已有账户体系中用户在 Wilddog 应用中的访问权限。CustomToken 采用 [JWT](https://jwt.io/introduction/) 签名格式。更多 Wilddog CustomToken 的信息，请参考  |


