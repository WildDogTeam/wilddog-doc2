title:  绑定多种登录方式
---

通过链接功能，您可以使用不同的登录方式来登录同一个帐号。不管采用哪种登录方式，用户都可以通过相同的 Wilddog ID 来标识身份。打个比方，一个用户使用邮箱登录然后链接 QQ 登录，那么他能使用这两种方式来登录这个帐号。或者一个匿名帐号链接微信登录方式，则可以使用微信登录方式来登录这个匿名帐号。


## 开始前的准备工作

在野狗控制面板中打开多种登录方式。



## 给帐号链接多种登录方式

完成以下步骤为已有帐号添加多种登录方式：

1. 以任意一种登录方式登录一个帐号。

2. 准备一个未在您的应用上登录过的邮箱或者第三方登录方式。

3. 进行登录关联。

### 关联QQ登录
```
    var provider = new wilddog.auth.QQAuthProvider();

    popup关联

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {

         // Handle Errors here.

         console.log(errorCode);

         // ...

    });



    redirect关联

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

        console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });

```

### 关联微信登录


```
    var provider = new wilddog.auth.WeixinAuthProvider();
    popup

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {、
         // Handle Errors here. 
        console.log(errorCode);
         // ...
    });

    redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });



```

### 关联微博登录

```



    var provider = new wilddog.auth.WeiboAuthProvider();



    popup

    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) {、 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });



    redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { 
        // Handle Errors here. 
        console.log(errorCode); 
        // ...
    });
```
### 关联微信公众账号登录

```

    var provider = new wilddog.auth.WeixinmpAuthProvider();
    
    popup
    wilddog.auth().currentUser.linkWithPopup(provider).then(function (result) {
         console.log(result);
     }).catch(function (error) {、
          // Handle Errors here.
           console.log(errorCode);
           // ...

    });



    redirect

    wilddog.auth().currentUser.linkWithRedirect(provider).then(function (result) {

         console.log(result);

    }).catch(function (error) { // Handle Errors here. console.log(errorCode); // ...});

```

### 关联邮箱登录


```

     var credentialEmail = wilddog.auth.EmailAuthProvider.credential(email, password);

     var user = wilddog.auth().currentUser;

     user.link(credentialEmail).then(function (user) {

         console.log("Account linking1 success", user);

     }, function (error) {

         console.log("Account linking1 error", error);

     });



```

## 解除一种登录方式

如果不想再使用某种登录方式，您可以解除链接。

为帐号解除登录方式，通过传递参数 provider ID 给 `unlinkFromProvider:completion:` 方法，您可以从 `providerData` 属性中获取到 provider ID。

```
for example : unlink 微信登录方式
var user = wilddog.auth().currentUser;
     user.unlink("weixin").then(function () {
     console.log("unlink")
     console.log(provider);
 }, function (error) {
     console.log(error);
 });
```
