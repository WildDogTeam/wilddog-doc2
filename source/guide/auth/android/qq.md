title:  QQ 登录
---
通过集成 QQ 登录，你可以让你的用户使用他们的 QQ 帐号来进行 Wilddog 身份认证。
登录的用户可以访问野狗实时数据同步中用户登录受限的数据。


## 开始前的准备工作

1.将 WilddogAuth 添加至你的 Android 项目。

2.将 WilddogAuth 的依赖项添加至你的应用级 build.gradle 文件：
    
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>
3.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

4.在 [QQ 开放平台管理中心](http://op.open.qq.com/)，获取应用的 App ID 和 App Secret。

5.在野狗应用控制面板中打开QQ登录方式:

  *  在野狗控制面板中选择 ”身份认证“->登录方式。
  *  点击 QQ 登录开关，点击配置，输入 QQ 帐号 APP ID 和 App Secret。

## Wilddog 身份认证

1.参考[QQ API 调用说明](http://wiki.open.qq.com/wiki/Android_API%E8%B0%83%E7%94%A8%E8%AF%B4%E6%98%8E) 将 QQ 登录集成到你的应用中。 初始化Tencent对象，并且在
IUiListener对象中获取登录的token。


```java
Tencent mTencent = Tencent.createInstance("YOURTENCENTAPPID", getApplicationContext());
IUiListener loginListener = new IUiListener() {

    @Override
    public void onComplete(Object o) {
        JSONObject jsonObject = (JSONObject) o;

        try {
            Log.d("accesstoken", jsonObject.getString("access_token"));
            mTencent.setAccessToken(jsonObject.getString("access_token"), jsonObject.getString("expires_in"));
            mTencent.setOpenId(jsonObject.getString("openid"));
            // TODO WilddogQQLogin

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onError(UiError uiError) {
    }

    @Override
    public void onCancel() {
    }

};

// QQ登录方法
private void qqlogin() {
    mTencent = TestWilddogAuthApplication.getTencent();
    if (!mTencent.isSessionValid()) {
        mTencent.login(this, "all", loginListener);
    }
}

// QQ 处理回调
protected void onActivityResult(int requestCode, int resultCode, Intent data) {

    mTencent.onActivityResult(requestCode, resultCode, data);
    if (requestCode == Constants.REQUEST_LOGIN) {
        if (resultCode == Constants.ACTIVITY_OK) {
            Tencent.handleResultData(data, loginListener);
        } else if (resultCode == Constants.ACTIVITY_CANCEL) {

        }
    }
}
```

2.QQ 授权登录成功后，获取QQ access token 来生成 Wilddog 凭据：

```java
AuthCredential qqAuthCredential= QQAuthProvider.getCredential(jsonObject.getString("access_token"));
```

3.最后，使用 Wilddog 凭据来进行 Wilddog 用户认证：

```java
mauth.signInWithCredential(qqAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
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