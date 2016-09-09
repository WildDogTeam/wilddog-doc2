
title: 身份认证 Auth
---
<h2 id='简介' class="article-heading top-heading">简介</h2>
**身份认证(Auth)** 能够让你的应用快速集成安全和全面的身份认证功能。


## Auth 能做什么

### 作为用户系统
如果应用没有用户系统，可以使用**邮箱认证**和**第三方认证**。

### 集成已有用户系统
如果应用已有用户系统，并想集成野狗其他服务，可以使用**自定义认证**。

### 匿名登录
如果应用允许用户以匿名方式登录，可以使用**匿名登录**。


<img src="/images/manyway.png" alt="ways" >


## Auth 解决的问题

### 改变单一认证方式
提供丰富的认证方式，支持绑定多种认证方式，满足更多用户需求。

### 简化用户系统开发
帮助开发者简化用户系统的搭建，快速接入身份认证系统，节省开发成本。

### 提供拓展服务
与野狗现有的 [实时数据同步 Sync](/overview/sync.html) 服务无缝集成。


## Auth 实现原理与优势

### 邮箱认证

用户使用邮箱和密码进行认证。

<img src="/images/authmail.jpg" alt="mail" >



### 第三方认证 

用户使用微信、微信公众号、微博、QQ 等第三方进行认证。

<img src="/images/thirdpart.jpg" alt="thirdpart" >



### 自定义认证

用户使用应用已有的用户系统进行认证。

<img src="/images/custom.jpg" alt="costom">



### 匿名登录

用户以匿名方式登录。

<img src="/images/anonymous.jpg" alt="anonymous" >



### 绑定多种认证方式

野狗 Auth 采用唯一 ID 来标识用户身份。用户通过认证后，会生成唯一的 ID 。通过该 ID ，用户可以绑定多种认证方式。

更多具体细节，请参考 [绑定多种登录方式](/guide/auth/web/link.html) 的文档。









