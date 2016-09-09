
title: 身份认证 Auth
---
<h2 id='简介' class="article-heading top-heading">简介</h2>
**身份认证(Auth)** 能够让你的应用快速集成安全和全面的身份认证功能。


## 多种认证方式

Auth 可以使用在新系统上，也可以集成在已有用户系统上。

- 如果你没有用户系统，你可以使用**邮箱认证**和**第三方认证**。
- 如果你已有用户系统并且想使用野狗的其它服务，你可以使用**自定义认证**。
- 如果你允许未登录用户获得登录用户的权限，你可以使用**匿名登录**。


<img src="/images/manyway.png" alt="ways" >



### 使用 Auth 作为用户系统

#### 邮箱认证

让用户使用邮件和密码进行认证。

<img src="/images/mail.png" alt="mail" >



#### 第三方认证 

使用微信、微信公众号、微博、QQ 等第三方进行认证。

<img src="/images/thirdpart.png" alt="thirdpart" >



### 使用已有的用户系统

#### 自定义认证

基于已有的用户系统进行认证。

<img src="/images/custom.png" alt="costom">



### 实现匿名登录

#### 匿名登录

匿名登录允许一个未登录的用户获得登录用户的权限。

<img src="/images/anonymous.png" alt="anonymous" >



### 多种认证方式绑定

一个用户可以绑定多种认证方式，Auth 凭借唯一的 Wilddog ID 确认用户的身份。

<img src="/images/wilddogid.png" alt="wilddogid" >



## 多平台支持

  <img src="/images/platfomlogo.png" alt="platfom" width="400" >

## 可拓展

Auth 是野狗提供的最基础的服务, 与野狗其他服务紧密相关，你可以轻松接入[实时数据同步(Sync)](/overview/sync.html)。





