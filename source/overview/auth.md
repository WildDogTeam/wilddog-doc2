
title: 身份认证 Sync
---

**野狗身份认证(Auth)** 是提供身份认证服务的全平台 SDK, 能够让你的应用快速集成安全、全面的身份认证功能。



## 多种认证方式

Auth 提供了多种认证方式，你可以使用在新系统上，也可以集成在已有系统上。根据不同情况快速接入所需的认证服务。用户经过 Auth 认证之后将会生成唯一的 Wilddog ID，不同的认证方式通过该 Wilddog ID 确认用户身份。

<img src="/images/manyway.png" alt="ways" >





### 使用Auth 作为用户系统



#### 邮箱认证

让用户使用邮件和密码进行认证。

用户发送邮箱、密码至 Auth 进行认证，Auth 认证成功后将会生该用户唯一的 Wilddog ID。

Auth 提供确认邮箱地址，重置账号密码、邮箱修改提醒服务。

<img src="/images/mail.png" alt="mail" >



#### 第三方认证 

使用微信、微信公众号、微博、QQ 等第三方进行认证。

用户在你的应用上登录第三方进行授权。授权完成后，第三方将会返回登录凭证。Auth可以凭借该登录凭证从第三方认证服务商获取用户信息，完成认证，并且生成用户的 Wilddog ID。

<img src="/images/thirdpart.png" alt="thirdpart" >



### 使用已有的用户系统

#### 自定义认证

基于已有的用户系统进行认证。

如果你已经有了用户系统并且想要用于Wilddog 的服务，那么你可以通过使用 Auth 集成你的用户系统。用户登录用户系统后，用户系统将会生成登录凭证，Auth 可以凭借该凭证确认用户身份，完成认证，并且生成用户的 Wilddog ID。

<img src="/images/custom.png" alt="costom">



### 实现匿名登录

#### 匿名登录

匿名登录允许一个未登录的用户获得登录用户的权限。

匿名登录的用户经过 Auth 认证之后同样会生成一个 Wilddog ID。如果该匿名用户想要继续登录应用，可以使用唯一的 Wilddog ID绑定其他的登录方式，将匿名用户账号转为永久账号。

<img src="/images/anonymous.png" alt="anonymous" >



### 多种认证方式绑定

一个用户可以绑定多种认证方式，Auth 凭借唯一的 Wilddog ID 确认用户的身份。

<img src="/images/wilddogid.png" alt="wilddogid" >



## 多平台支持

  <img src="/images/platfomlogo.png" alt="platfom" width="400" >

## 可拓展

Auth 是wilddog 提供的最基础的服务, 与其他 Wilddog 服务紧密相关，你可以轻松接入其他服务，例如实时数据同步(Sync)、推送(Notification)等等，这些服务与身份认证一样安全且易用。





