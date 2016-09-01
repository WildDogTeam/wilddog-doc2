title: 微信登录
---

通过集成微信登录，你可以让你的用户使用他们的微信帐号来进行 Wilddog 身份验证。

登录的用户可以访问野狗实时数据库中用户登录受限的数据。

### 开始前的准备工作

1.将 `WilddogAuth` 添加至你的 Android 项目。

2.将 `WilddogAuth` 的依赖项添加至你的应用级 build.gradle 文件：
    
    compile 'com.wilddog.wilddogauth:wilddog-auth:1.0.0'
3.如果你还没有创建Wilddog应用，请到官网控制面板去创建应用。

4.在微信开放平台管理中心，获取应用的 App ID 和 App Secret。

5.在野狗应用控制面板中打开微信登录方式:

  *  在野狗控制面板中选择 ”身份认证“->登录方式。
  *  点击微信登录开关，点击配置，输入 微信帐号 APP ID 和 App Secret。

### Wilddog 身份验证

1.参考 微信 `Android` 接入指南 将微信登录集成到你的应用中。

2.在微信的`WXEntryActivity`的 `onResp` 方法中获取微信和accessToken和openId

```java
public void onResp(BaseResp baseResp) {
   
    switch (baseResp.errCode){
        case BaseResp.ErrCode.ERR_OK:
            //成功
            if(ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX == baseResp.getType()){
                //成功分享到微信
                AlertMessageUtil.showShortToast("分享成功");
                AlertMessageUtil.dismissprogressbar();
            }else {
                //授权成功，获取token值
           
                String code = ((SendAuth.Resp) baseResp).code;
                // 进行WilddogAuth操作
               }
            break;
        case BaseResp.ErrCode.ERR_AUTH_DENIED:
            //拒绝
            if(ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX == baseResp.getType()){
                //取消分享到微信
                AlertMessageUtil.showShortToast("用户拒绝分享到微信");
                AlertMessageUtil.dismissprogressbar();
            }else {
                //用户拒绝授权
                AlertMessageUtil.showShortToast("用户拒绝授权");
            }

            break;
        case BaseResp.ErrCode.ERR_USER_CANCEL:
            if (ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX == baseResp.getType()) {
              AlertMessageUtil.showShortToast("取消分享到微信");
                AlertMessageUtil.dismissprogressbar();
            }else {
                AlertMessageUtil.showShortToast("取消授权");
            }

            break;
        default:
            if (ConstantsAPI.COMMAND_SENDMESSAGE_TO_WX == baseResp.getType()) {
              AlertMessageUtil.showShortToast("分享到微信出现未知错误");
       
            }
            break;
    }
}
```

3.微信授权登录成功后，获取微信 accessToken 和openId来生成 Wilddog 凭据：

```java
AuthCredential weixinAuthCredential= WeixinAuthProvider.getCredential(code);
```

4.最后，使用 Wilddog 凭据来进行 Wilddog 用户验证：

```java
mauth.signInWithCredential(weixinAuthCredential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
    @Override
    public void onComplete(Task<AuthResult> var1) {
        processResult(var1);
    }
});
```

### 后续步骤

无论你采用哪种登录方式，用户第一次登录后，野狗服务器都会生成一个唯一的 Wilddog ID 来标识这个帐户，使用这个 Wilddog ID，可以在你 APP 中确认每个用户的身份。配合 规则表达式，auth 还可以控制野狗实时数据库的用户访问权限。

在你的应用中，你可以通过 WilddogUser 来获取用户的基本属性。参考 管理用户。
在你的野狗实时数据库 规则表达式 中，你可以获取到这个登录后生成的唯一用户 Wilddog ID， 通过他可以实现控制用户对数据的访问权限。

你还可以通过 链接多种登录方式 来实现不同的登录方式登录同一个帐号。
调用 signOut: 退出登录：

    mauth.SignOut();
    

可能发生的错误，请参考 处理错误。