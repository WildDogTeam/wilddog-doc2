title: 匿名身份认证
---

你可以在 Wilddog 身份认证中创建和使用临时匿名帐号来进行身份认证。如果你在应用中使用了规则表达式来保护数据的访问权限，即使用户未登录，使用临时匿名帐号也能正常访问数据。如果想长期保留临时匿名帐号，[可以绑定其它登录方式](/guide/auth/ios/link.html)。

## 开始前的准备工作
1. 将以下 pod 包含在你的 Podfile 中：
```
  pod 'Wilddog/Auth'
```
2. 在 Wilddog 控制面板中创建一个应用。

3. 打开匿名登录方式:

  * 在野狗控制面板中选择身份认证
  * 在｀登录方式｀标签中打开匿名登录方式
    
## 使用 Wilddog 匿名登录认证
当一个未登录的用户想想使用一个 Wilddog 必须登录才能使用的特性，可以利用匿名登录，完成下面步骤：
1、 导入 Wilddog Auth 模块:     
	
<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
@import WilddogAuth;
```
</div>
<div class="slide-content">
```swift
import WilddogAuth
```
</div>
</div>

2、 初始化 WDGApp:

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGOptions *option = [[WDGOptions alloc] initWithSyncURL:@"https://<your-wilddog-appid>.wilddogio.com"];
[WDGApp configureWithOptions:option];
```
</div>
<div class="slide-content">
```swift
let options = WDGOptions.init(syncURL: "https://<your-wilddog-appid>.wilddogio.com")
WDGApp.configureWithOptions(options)
```
</div>
</div>

3、 调用 `signInAnonymouslyWithCompletion:`方法：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth signInAnonymouslyWithCompletion:^(WDGUser *_Nullable user, NSError *_Nullable error) {
   // ...
}];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth?.signInAnonymouslyWithCompletion(){(user, error) in
   //...
}
```
</div>
</div>

4、 如果 signInAnonymouslyWithCompletion: 方法调用成功并且没有返回错误信息，你可以在 WDGUser 对象中获取用户数据：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
BOOL isAnonymous = user.anonymous;  // YES
NSString *uid = user.uid;
```
</div>
<div class="slide-content">
```swift
let isAnonymous = user!.anonymous  // true
let uid = user!.uid
```
</div>
</div>

## 将匿名帐号转变成永久帐号
当使用匿名登录时，你可能想下次在其它设备上还能登录这个帐号。比如你有一个新闻类的应用，用户在使用应用时，收藏了很多新闻，但是当换一个设备时，却访问不到这些数据。完成下面步骤可以将其转换为永久帐号：

1、 准备一个未在你的应用上登录过的邮箱或者第三方登录方式。
2、 通过一种登录方式获取 WDGAuthCredential：

##### QQ 登录

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = [WDGQQAuthProvider credentialWithAccessToken:qqOAuth.accessToken];
```
</div>
<div class="slide-content">
```swift
let credential = WDGQQAuthProvider.credentialWithAccessToken(qqOAuth.accessToken)

```
</div>
</div>

##### 微信登录

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = [WDGWeiXinAuthProvider credentialWithCode:weixinOAuth.code];
```
</div>
<div class="slide-content">
```swift
let credential = WDGWeiXinAuthProvider.credentialWithCode(weixinOAuth.code)

```
</div>
</div>

##### 微博登录

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential = [WDGSinaAuthProvider credentialWithAccessToken:sinaOAuth.accessToken 
                   userID:sinaOAuth.userID];
```
</div>
<div class="slide-content">
```swift
let credential = WDGSinaAuthProvider.credentialWithAccessToken(sinaOAuth.accessToken, userID: sinaOAuth.userID)

```
</div>
</div>

##### 邮箱登录

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential =
    [WDGEmailPasswordAuthProvider credentialWithEmail:email
                                             password:password];
```
</div>
<div class="slide-content">
```swift
let credential = WDGEmailPasswordAuthProvider.credentialWithEmail(email, password: password)

```
</div>
</div>

3、 使用 `linkWithCredential:completion:` 方法来完成完成链接：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth.currentUser linkWithCredential:credential completion:^(WDGUser *_Nullable user,NSError *_Nullable error) {
      // ...
}];
```
</div>
<div class="slide-content">
```swift
let auth = WDGAuth.auth()
auth!.currentUser?.linkWithCredential(credential) { (user, error) in
     // ...
}

```
</div>
</div>

如果调用 `linkWithCredential:completion:` 方法成功，被链接的帐号就可以访问这个匿名帐号的数据了。


>注： 这项技术可以链接任意两个类型的帐号。


## 后续步骤
现在我们已经学会了使用野狗进行用户认证，你可以配置 [规则表达式](/guide/sync/rules/introduce.html) 来控制野狗实时数据的访问权限。