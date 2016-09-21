
title:  邮箱登录
---

你可以使用 Wilddog Auth 让你的用户用电子邮件地址和密码进行 Wilddog 身份认证，而且可以通过他来管理你的应用帐户。


## 开始前的准备工作


1. 在 Wilddog 控制面板中创建一个应用.

2. 在野狗应用控制面板中打开邮箱登录方式:



* 在野狗控制面板中选择身份认证选项。

* 在`登录方式`标签中打开邮箱登录方式。



## 创建基于密码的帐户

要用密码创建一个新用户帐户，请在你的应用登录模块中完成以下步骤：


1. 导入 Wilddog Auth 模块:

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">type</span>=<span class="string">&quot;text/javascript&quot;</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

2. 以 Wilddog AppId 初始化 Wilddog应用。

```javascript
var config = {

 authDomain: "<appId>.wilddog.com",

 syncURL: "https://<appId>.wilddogio.com"

 };

 wilddog.initializeApp(config, "DEFAULT");
```

3. 通过将该新用户的电子邮件地址和密码传递到 createUserWithEmailAndPassword(email,password) 来创建新帐户。

```javascript
wilddog.auth().createUserWithEmailAndPassword("wangxiaoliang@wilddog.com", "12345678").catch(function (error) {
     // Handle Errors here.
     console.log(error)
 });
```

如果新帐户创建成功，默认会处于登录状态，并且你可以在回调方法中获取登录用户的数据。



## 用电子邮件和密码登录一个用户

用密码登录一个用户的步骤与创建新帐户的步骤相似。 在你应用的登录模块中，执行以下操作：



1. 导入 Wilddog Auth 模块:
    <figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">type</span>=<span class="string">&quot;text/javascript&quot;</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

2. 初始化 `Wilddog` 应用实例。
```javascript
    var config = {
     authDomain: "<appId>.wilddog.com",
     syncURL: "https://<appId>.wilddogio.com"
    };
    wilddog.initializeApp(config, "DEFAULT");
    ```

3. 将该用户的电子邮件地址和密码传递到 `signInWithEmailAndPassword(email:password)`,即可在你应用中登录此用户。

```javascript
wilddog.auth().signInWithEmailAndPassword("550690505@qq.com", "1234567").then(function(res){
     console.log(res);
 }).catch(function (error) {
     // Handle Errors here.
     console.log(error)
 });
```


如果该用户成功登录，你就可以从回调方法的用户对象中获得该用户的帐户数据。


## 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。



* 在你的应用中，你可以通过 Wilddog.auth().currentUser() 来获取用户的基本属性。参考 [管理用户](/guide/auth/web/manageuser.html)。

* 在你的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。



你还可以通过 [链接多种登录方式](/guide/auth/web/link.html) 来实现不同的登录方式登录同一个帐号。

调用 [signOut](/guide/auth/web/api.html#signout) 退出登录：

```javascript
 wilddog.auth().signOut().then(function() {
     // Sign-out successful.
     console.log("sign-out")
 }, function(error) {
     // An error happened.
     console.log("sign-out-error")
 });

```

