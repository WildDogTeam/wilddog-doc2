title: Auth 的 `signOut` 方法是在做什么操作 ？
tag:身份认证
---
`signOut`方法是清除本地的 auth 信息。相当于本地的一个 token，这个 token 用于和野狗的服务器判断各种操作是否合法，一旦 token 丢失或者被清除，和野狗服务器进行的各种操作将会被禁止。

