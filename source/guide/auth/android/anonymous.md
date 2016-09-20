title: 匿名用户身份认证
---
你可以在 Wilddog 身份认证中创建和使用临时匿名帐号来进行身份认证。如果你在应用中使用了规则表达式来保护数据的访问权限，即使用户未登录，使用临时匿名帐号也能正常访问数据。如果想长期保留临时匿名帐号，可以绑定其它登录方式。

## 开始前的准备工作

1.将 `WilddogAuth` 的依赖项添加至你的应用级 build.gradle 文件：
    
    compile 'com.wilddog.client:wilddog-auth-android:2.0.1'
    
2.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

3.打开匿名登录方式:

   * 在野狗控制面板中选择身份认证选项。
   * 在`登录方式`标签中打开匿名登录方式。


## 使用 Wilddog 匿名登录认证

当一个未登录的用户想想使用一个 `Wilddog` 必须登录才能使用的特性，可以利用匿名登录，完成下面步骤：

1.初始化WilddogAuth对象.

```java
// 初始化
    WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
    WilddogApp.initializeApp(this, options);
WilddogAuth mauth=WilddogAuth.getInstance();
```

2.调用匿名登录方法

```java    
mauth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
        processResult(var1);
            if(var1.isSuccessful()){
       Log.d("success","Login success!");
        Log.d("Anonymous",String.valueOf(var1.getResult().getWilddogUser().isAnonymous()));
        }else {
        Log.d("failure","reason:"+var1.getException());
        }
    }
});
```

## 将匿名帐号转变成永久帐号  
使用匿名登录时，你可能想下次在其它设备上还能登录这个帐号。比如你有一个新闻类的应用，用户在使用应用时，收藏了很多新闻，但是当换一个设备时，却访问不到这些数据。完成下面步骤可以将其转换为永久帐号：
准备一个未在你的应用上登录过的邮箱或者第三方登录方式。
通过一种登录方式获取 AuthCredential：

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

## 使用 `linkWithCredential` 方法来完成完成链接：

```java
user.linkWithCredential(authCredential);
```

如果调用 `linkWithCredential` 方法成功，被链接的帐号就可以访问这个匿名帐号的数据了。

注： 这项技术可以链接任意两个类型的帐号。
