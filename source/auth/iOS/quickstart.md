
title: 快速入门
---

你可以通过邮箱登录的例子来了解身份认证的基本用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Xcode 7.0 及以上版本</li>
        <li>支持 iOS 7.0 及以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

- **使用 CocoaPods**

要将 Wilddog SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问 [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 


打开工程目录，新建一个 Podfile 文件

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句

	pod 'Wilddog/Auth'

最后安装 SDK

	$ pod install
	$ open your-project.xcworkspace

</br>
* **手动集成**
  </br>
1. 下载 Auth SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.7/WilddogAuth.framework-2.0.7.zip" id="auth_ios_d">点此下载</a>。 
2. 下载 Core SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.8/WilddogCore.framework-2.0.8.zip" id="sync_core_d">点此下载</a>。  
3. 把 WilddogAuth.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。 
5. 点击工程文件 -> TARGETS -> Build Settings，在 Other Linker Flags 中添加 -ObjC。
 

## 3. 创建 Auth 实例

使用 Wilddog Auth SDK 之前，需要先创建实例：

**1.引入头文件**

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
	@import Wilddog;
```
</div>
<div class="slide-content">
```swift
	import Wilddog
```
</div>
</div>

**2.初始化**

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
//初始化 WDGApp
WDGOptions *options = [[WDGOptions alloc] initWithSyncURL:@"https://your-wilddog-appid.wilddogio.com"];
[WDGApp configureWithOptions:options];

WDGAuth *auth = [WDGAuth auth];

```
</div>
<div class="slide-content">
```swift
//初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://your-wilddog-appid.wilddogio.com")
WDGApp.configure(with: options)

let auth = WDGAuth.auth()

```
</div>
</div>

## 4. 使用邮箱认证

**1.开启邮箱登录**

在 控制面板—身份认证—登录方式 中开启邮箱登录功能：

![](/images/openemail.png)

**2.创建新用户**

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
//创建一个基于密码的帐户，创建成功后会自动登录
[auth createUserWithEmail:@"user@example.com" password:@"password" completion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
   //...
}];
```
</div>
<div class="slide-content">
```swift
//创建一个基于密码的帐户，创建成功后会自动登录
auth?.createUser(withEmail: "user@example.com", password:"password", completion: { (user, error) in
    //...
})
```
</div>
</div>

**3.邮箱密码登录**

`signInWithEmail` 方法用于已创建的用户登录：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
[auth signInWithEmail:email
             password:password
           completion:^(WDGUser *user, NSError *error) {
           // ...
}];
```
</div>
<div class="slide-content">
```swift
auth?.signIn(withEmail: email, password: password) { (user, error) in
  // ...
}
```
</div>
</div>

## 5. 退出登录

`signOut` 方法用于退出当前登录用户：

<div class="slide">
<div class='slide-title'>
  <span class="slide-tab tab-current">Objective-C</span>
  <span class="slide-tab">Swift</span>
</div>
<div class="slide-content slide-content-show">
```objectivec
NSError *error;
[[WDGAuth auth] signOut:&error];
if (!error) {
    // 退出登录成功
}
```
</div>
<div class="slide-content">
```swift
try! WDGAuth.auth()!.signOut()

```
</div>
</div>

Auth 更多使用方式，请参考 [完整指南](/auth/iOS/guide/concept.html) 和  [API 文档](/auth/iOS/api/WDGAuth.html)。
