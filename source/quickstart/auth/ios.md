
title: 快速入门
---

你可以通过邮箱登录的例子来了解身份认证的基本用法。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以选择下面方式的其中一种

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

* **手动集成**

1. 下载 Auth SDK [下载地址](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogAuth.framework-2.0.1.zip)。
2. 下载 Core SDK [下载地址](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogCore.framework-2.0.1.zip)。        
3. 把 WilddogAuth.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。  

## 3. 初始化 Wilddog Auth 实例
使用 Auth SDK 之前，需要先初始化实例。

1. 引入头文件

Objective-C

	@import Wilddog;
Swift:

	import Wilddog

2. 下载 Core SDK

Objective-C

```objectivec
//初始化 WDGApp
WDGOptions *options = [[WDGOptions alloc] initWithSyncURL:@"https://your-wilddog-appid.wilddogio.com"];
[WDGApp configureWithOptions:options];

WDGAuth *auth = [WDGAuth auth];

```

Swift

```swift
//初始化 WDGApp
let options = WDGOptions.init(syncURL: "https://your-wilddog-appid.wilddogio.com")
WDGApp.configureWithOptions(options)

let auth = WDGAuth.auth()

```

## 4. 使用邮箱认证

1.打开邮箱登录
首先确认应用的邮箱登录功能已激活（默认是关闭状态）

![](/images/openemail.png)

2.创建新用户

Objective-C

```objectivec
//创建一个基于密码的帐户，创建成功后会自动登录
[auth createUserWithEmail:@"user@example.com" password:@"password" completion:^(WDGUser * _Nullable user, NSError * _Nullable error) {
   //...
}];
```

Swift

```swift
//创建一个基于密码的帐户，创建成功后会自动登录
auth?.createUserWithEmail("user@example.com", password:"password", completion: { (user, error) in
    //...
})
```
3.邮箱密码登录

已存在用户可以使用 `signInWithEmail`方法登录

```objectivec
[auth signInWithEmail:email
             password:password
           completion:^(WDGUser *user, NSError *error) {
           // ...
}];
```

Swift

```swift
auth?.signInWithEmail(email, password: password) { (user, error) in
  // ...
}
```

## 5. 退出登录

你可以使用 `signOut` 方法退出当前登录用户

Objective-C

```objectivec
NSError *error;
[[WDGAuth auth] signOut:&error];
if (!error) {
    // 退出登录成功
}
```

Swift

```swift
try! WDGAuth.auth()!.signOut()

```

野狗还提供了匿名认证、第三方认证等其他认证方式，详细信息请见 [完整指南](/guide/auth/core/concept.html) 和  [API 文档](/api/auth/ios.html)。
