
title: 简介
---

野狗提供Java语言的Server SDK。非JAVA后端可以使用Token生成器来生成Custom Token:

* [Php版Token 生成器](https://github.com/WildDogTeam/wilddog-token-generator-php)
* [Node.js版Token 生成器](https://github.com/WildDogTeam/wilddog-token-generator-node)
* [Python版Token 生成器](https://github.com/WildDogTeam/wilddog-token-generator-python)

如果你的后端系统非以上语言，也可以使用支持JWT token 的工具按照上述格式来生成Custom Token。


本篇文档介绍自定义身份认证中 Server SDK 的作用。

你可以使用 Server SDK 实现自定义身份认证，把野狗服务接入到你的用户系统当中。

### Server SDK 的功能

Server SDK 包含以下两个功能：

- **生成 Custom Token**

  将野狗服务接入到你的用户系统时，需要通过 [Custom Token](/auth/Web/guide/concept.html#身份认证令牌) 进行认证。你可以使用 Server SDK 生成 Custom Token。

  生成 Cutom Token 时，你可以添加用户的自定义属性。自定义身份认证成功后，你在规则表达式中可以获取自定义属性，实现 [用户访问控制](/sync/Web/rules/auth.html)。

- **认证 Wilddog ID Token(可选)**

  经过野狗身份认证后，你可以使用 Server SDK 认证 [Wilddog ID Token](/auth/Web/guide/concept.html#身份认证令牌)，确认用户在 Wilddog Auth 中的身份。

  <blockquote class="warning">
    <p><strong>注意：</strong></p>
  Server SDK 中包含的 Wilddog ID Token 认证方法不能认证你 Server SDK 生成的 Custom Token。
  </blockquote>



### Server SDK 的工作机制

1. Server SDK 在用户系统认证成功之后会生成 Custom Token。
2. Server SDK 向 Wilddog Auth 发送验证请求，验证用户的合法性。

![](/images/serversdk.jpg)



Server SDK 的使用方法，请参考 [使用 Server SDK](/auth/Server/server.html)。