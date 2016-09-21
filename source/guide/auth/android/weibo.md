title: 微博登录
---

通过集成新浪微博登录，你可以让你的用户使用他们的新浪微博帐号来进行 Wilddog 身份认证。

认证的用户可以访问野狗实时数据同步中用户登录受限的数据。

## 开始前的准备工作

1.将 `WilddogAuth` 的依赖项添加至你的应用级 build.gradle 文件：
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>
2.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

3.在[新浪微博开放平台管理中心](http://open.weibo.com/apps)，获取应用的 App Key 和 App Secret。

4.在野狗应用控制面板中打开新浪微博登录方式:

  *  在野狗控制面板中选择 ”身份认证“->登录方式。
  *  点击微博登录开关，点击配置，输入 微信帐号 APP ID 和 App Secret。


## Wilddog 身份认证

1 参考 [新浪微博 Android 接入指南](https://github.com/sinaweibosdk/weibo_android_sdk) 将新浪微博登录集成到你的应用中。

2. 在WeiboAuthListener的`onComplete`方法中可以获取到Oauth2AccessToken对象，然后从里面获取到token和openId。
    
```java
mAuthInfo = new AuthInfo(this, Constants.APP_KEY, Constants.REDIRECT_URL, Constants.SCOPE);
mSsoHandler = new SsoHandler(WBAuthActivity.this, mAuthInfo);

// SSO 授权, 仅客户端
findViewById(R.id.obtain_token_via_sso).setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        mSsoHandler.authorizeClientSso(new AuthListener());
    }
});
```
```java
/**
  * 微博认证授权回调类。
  * 1. SSO 授权时，需要在 {@link #onActivityResult} 中调用 {@link SsoHandler#authorizeCallBack} 后，
  *    该回调才会被执行。
  * 2. 非 SSO 授权时，当授权结束后，该回调就会被执行。
  * 当授权成功后，请保存该 access_token、expires_in、uid 等信息到 SharedPreferences 中。
  */
class AuthListener implements WeiboAuthListener {

    @Override
    public void onComplete(Bundle values) {
        // 从 Bundle 中解析 Token
        mAccessToken = Oauth2AccessToken.parseAccessToken(values);
        // token 和openId
        String token = mAccessToken.getToken();
        String Uid = mAccessToken.getUid();
        // 从这里获取用户输入的 电话号码信息

        if (mAccessToken.isSessionValid()) {
            // 进行WilddogAuth登录

        } else {
            // 以下几种情况，你会收到 Code：
            // 1. 当你未在平台上注册的应用程序的包名与签名时；
            // 2. 当你注册的应用程序包名与签名不正确时；
            // 3. 当你在平台上注册的包名和签名与你当前测试的应用的包名和签名不匹配时。
            String code = values.getString("code");
            String message = getString(R.string.weibosdk_demo_toast_auth_failed);
            if (!TextUtils.isEmpty(code)) {
                message = message + "\nObtained the code: " + code;
            }
            Toast.makeText(WBAuthActivity.this, message, Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public void onCancel() {
        Toast.makeText(WBAuthActivity.this, R.string.weibosdk_demo_toast_auth_canceled, Toast.LENGTH_LONG).show();
    }

    @Override
    public void onWeiboException(WeiboException e) {
        Toast.makeText(WBAuthActivity.this, "Auth exception : " + e.getMessage(), Toast.LENGTH_LONG).show();
    }
}
```

3.新浪微博登录成功后，在 didReceiveWeiboResponse: 方法中得到的 accessToken 和 userID 来生成 Wilddog 凭据：

```java
AuthCredential weiboAuthCredential = WeiboAuthProvider.getCredential(mAccessToken.getToken(), mAccessToken.getUid());
```
4.最后，使用 Wilddog 凭据来进行 Wilddog 用户认证：

```java
mauth.signInWithCredential(weiboAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
          processResult(var1);
      }
});
```

## 后续步骤

无论您采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在您 APP 中确认每个用户的身份。配合 [规则表达式](/guide/sync/rules/introduce.html)，`auth` 还可以控制野狗实时数据同步的用户访问权限。

在您的应用中，您可以通过 `WilddogAuth.getCurrentUser()` 来获取用户的基本属性。参考 [管理用户](/guide/auth/android/manageuser.html)。

在您的野狗实时数据同步 [规则表达式](/guide/sync/rules/introduce.html) 中，您可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

您还可以通过 [链接多种登录方式](/guide/auth/android/link.html) 来实现不同的登录方式登录同一个帐号。
调用 signOut: 退出登录：

```java
mauth.SignOut();
```

可能发生的错误，请参考 处理错误。