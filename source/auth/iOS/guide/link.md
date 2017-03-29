
title:  绑定多种登录方式
---

本篇文档介绍在 Wilddog Auth 中如何给同一个帐号绑定多种登录方式。


## 前期准备

1. 在控制面板 身份认证—登录方式 中打开需要绑定的登录方式。
2. 配置需要绑定的登录方式。具体配置方法请参考对应文档。


## 实现绑定多种登录方式

### 绑定邮箱登录方式

绑定邮箱登录方式需要以下三个步骤：

1.以任意一种登录方式登录一个帐号。

2.获取邮箱登录方式的 credential。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuthCredential *credential =
    [WDGWilddogAuthProvider credentialWithEmail:email
                                            password:password];
```
</div>
<div class="slide-content">
```swift
let credential = WDGWilddogAuthProvider.credential(withEmail: email, password: password)

```
</div>
</div>



3.使用邮箱登录方式绑定。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGAuth *auth = [WDGAuth auth];
[auth.currentUser linkWithCredential:credential
                                      completion:^(WDGUser *_Nullable user,
                                                   NSError *_Nullable error) {
                                          // ...
                                        }];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.currentUser?.link(with: credential, completion: { (user, error) in
    // ...
})

```
</div>
</div>



### 绑定第三方登录方式

绑定第三方登录方式需要以下三个步骤：

1.以任意一种登录方式登录一个帐号。

2.获取需要绑定登录方式的 credential。

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
// QQ 登录
WDGAuthCredential *credential = [WDGQQAuthProvider credentialWithAccessToken:qqOAuth.accessToken];

// 微博登录
WDGAuthCredential *credential = [WDGSinaAuthProvider credentialWithAccessToken:sinaOAuth.accessToken 
                   userID:sinaOAuth.userID];

// 微信登录
WDGAuthCredential *credential = [WDGWeiXinAuthProvider credentialWithCode:weixinOAuth.code];

```
</div>
<div class="slide-content">
```swift
// QQ 登录
let credential = WDGQQAuthProvider.credential(withAccessToken: qqOAuth.accessToken)

// 微博登录
let credential = WDGSinaAuthProvider.credential(withAccessToken: sinaOAuth.accessToken, userID: sinaOAuth.userID)

// 微信登录
let credential = WDGWeiXinAuthProvider.credential(withCode: weixinOAuth.code)

```
</div>
</div>


3.使用第三方登录方式绑定。

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
auth!.currentUser?.link(with: credential) { (user, error) in
     // ...
}

```
</div>
</div>

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  若使用 customToken 登录时，若 customToken 中 admin 属性为 true，则不能进行关联操作。
</blockquote>


## 解除已绑定登录方式

`unlinkFromProvider:completion:` 方法用于解除已绑定登录方式。

例如，解除微信绑定：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
WDGUser *currentUser = [WDGAuth auth].currentUser;
[currentUser unlinkFromProvider:@"weixin"
                     completion:^(WDGUser *user, NSError *error) {
                       if (error == nil) {
                         // Provider unlinked from account
                       }
                     }];
```
</div>
<div class="slide-content">
```swift
WDGAuth.auth()?.currentUser?.unlink(fromProvider: "weixin", completion: { (user, error) in
    // ...
})

```
</div>
</div>
