title: 服务端身份认证
---

使用 Wilddog，你可以将你自己的已有服务与 Wilddog Auth 集成起来。
你可以使用 Wilddog 官方提供的 Server SDK 来操作用户认证 token, 或者你可以用第三方的 JWT（JSON Web Token）库自己实现。

Wilddog 服务端身份认证 SDK 主要帮助用户实现以下两个功能：

* **生成 Custom Token**

  **
  **你可以将已有用户系统与Wilddog集成，比如，你可能已经拥有一个用户数据库，或者你想要集成一个Wilddog不原生支持的第三方认证提供方（如Facebook）。
  你可以生成自定义 Token，并且你可以添加任意标识用户的信息。然后，这个custom token就可以被用来作为Wilddog API 中自定义登录的参数来登录 Wilddog, 完成操作实时数据同步等。

* **认证 ID Token**

  **
  **Wilddog Auth 主要用来认证你的 APP 用户，来限制用户对于 Wilddog 服务的权限。但是，你也可以在你自己的服务中认证用户。
  要做到这样，你需要在客户端获取登录 Wilddog 的用户的ID Token，然后作为参数调用 Wilddog 提供的接口获得用户是否合法。


