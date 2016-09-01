title: 链接多种登录方式
---

通过链接功能，你可以使用不同的登录方式来登录同一个帐号。不管采用哪种登录方式，用户都可以通过相同的 Wilddog ID 来标识身份。打个比方，一个用户使用邮箱登录然后链接 QQ 登录，那么他能使用这两种方式来登录这个帐号。或者一个匿名帐号链接微信登录方式，则可以使用微信登录方式来登录这个匿名帐号。

## 开始前的准备工作

在野狗控制面板中打开多种登录方式（可以是匿名登录）。

## 给帐号链接多种登录方式

完成以下步骤为已有帐号添加多种登录方式：
1.以任意一种登录方式登录一个帐号。

2.准备一个未在认证的应用上登录过的邮箱或者第三方登录方式。

3.通过一种登录方式获取 'AuthCredential'登录凭据。


## QQ 登录

```java
AuthCredential qqAuthCredential= QQAuthProvider.getCredential(jsonObject.getString("access_token"));
```

## 微信登录

```java
AuthCredential weiXinAuthCredential= WeiXinAuthProvider.getCredential(code);
```

## 微博登录

```java
AuthCredential weiboAuthCredential= WeiboAuthProvider.getCredential(access_token,openid);
```

## 邮箱登录

```java
AuthCredential emailAuthCredential= EmailAuthProvider.getCredential("12345678@qq.com","password123");
```

4.使用 `linkWithCredential` 方法来完成完成链接如果链接的凭据已经链接到其它帐号上，则会返回失败：

```java
user.linkWithCredential(authCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
     if(var1.isSuccessful()){
         Log.d("success","Link success");
     }else {
         Log.d("failure","Link failure"+var1.getException().toString());
     }
    }
});
```
 
如果调用 `linkWithCredential` 方法成功，被链接的帐号就可以访问这个匿名帐号的数据了。  

## 解除一种登录方式

如果不想再使用某种登录方式，你可以解除链接。
为帐号解除登录方式，通过传递参数 provider ID 给 `unlink` 方法，你可以从 providerData 属性中获取到 provider ID。

```java
user.unlink("providerId");
```    
    
    