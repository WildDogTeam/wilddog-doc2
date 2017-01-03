title: 为什么使用 Auth SDK 时直接获取 `currentUser` 会报`undefined`？
tags:
- 身份认证
---
因为没有监听用户状态。

在获取 `currentUser`之前需要使用一个监听用户状态的方法：`onAuthStateChanged`。刷新页面的之后，浏览器要和服务器进行通信来进行用户身份是否合法的判断，这个时候本地没有 `currentUser` ；只有当浏览器和服务器确定该用户是合法用户时，才有 `currentUser`。
