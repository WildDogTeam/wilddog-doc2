
title:  自定义身份认证
---

本篇文档介绍在 Wilddog Auth 中如何使用 QQ 对用户进行身份认证。



## 开始前的准备工作

1. 在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。
2. [使用野狗超级密钥生成 Custom Token](/guide/auth/server/server.html)
3. 使用 Wilddog 超级秘钥生成



## 实现自定义身份认证

1.安装 Wilddog Auth SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">type</span>=<span class="string">"text/javascript"</span> <span class="attr">src</span>=<span class="string">"<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js"</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

2.创建 Wilddog Auth 实例：

```javascript
 var config = {
     authDomain: "<appId>.wilddog.com",
     syncURL: "https://<appId>.wilddogio.com"
 };
 wilddog.initializeApp(config, "DEFAULT");
```

3. 当用户登录您的应用时，发送他们的凭据（比如邮箱密码的方式）到您的服务器上。然后服务器检查凭据的正确性并返回 Custom Token。

4. 从服务器收到 Custom Token 后，传到 `signInWithCustomToken:` 方法中进行登录：

```javascript
wilddog.auth().signInWithCustomToken(customToken).then(function (res){
     console.log(res);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error);
     // ...
 });
```

## 后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。



* 在您的应用中，您可以通过 wilddog.auth().currentUser 来获取用户的基本属性。参考 [管理用户](/guide/auth/web/manageuser.html)。

* 在您的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。



您还可以通过 [链接多种登录方式](/guide/auth/web/link.html) 来实现不同的登录方式登录同一个帐号。



### 调用 [signOut](/guide/auth/web/api.html#signout) 退出登录：

```javascript

 wilddog.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("sign-out")
 }, function(error) {
     // An error happened.
     console.log("sign-out-error")
 });

```

