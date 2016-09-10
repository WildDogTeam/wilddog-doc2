
title: 快速入门
---

## 1. 创建应用

首先在控制面板中创建应用，请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 引入 SDK

SDK 的导入方式有两种，你可以选择下面方式的其中一种：

** 第一种：使用 CocoaPods **
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

** 第二种：手动集成 **

1、下载 Auth SDK[下载地址](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogAuth.framework-2.0.1.zip)。
2、下载 Core SDK[下载地址](https://cdn.wilddog.com/sdk/ios/2.0.1/WilddogCore.framework-2.0.1.zip)。        
3、把 WilddogAuth.framework 和 WilddogCore.framework 拖到工程目录中。  
3、选中 Copy items if needed 、Create Groups，点击 Finish。  

## 3. 初始化
成功集成 SDK 之后，我们就可以开发应用了。

** 1、引入头文件 **

Objective-C 

	@import Wilddog;


Swift

	import Wilddog

** 2、初始化 Auth **

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

## 4. 使用邮箱密码方式认证

** 1、创建基于密码的帐户 **

我们可以选择创建基于邮箱密码方式的帐户，然后用其登录；也可以直接匿名登录、第三方登录（微信、QQ、微博）或者自定义身份登录。

下面我们先介绍下基于邮箱密码方式的创建用户和登录。创建邮箱账号或者用邮箱方式登录，首先要在控制面板中打开允许“邮箱登录”的权限，如图所示：  
![](/images/openemail.png)

示例代码如下：
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
** 2、邮箱密码登录 **

虽然上一个步骤中，创建账号成功时也默认该用户已登录。但是在下一次启动应用中，可能你的应用需要刚才注册的邮箱重新登录，那么你可以这样做：

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

你可以使用 `signOut:` 方法退出当前登录用户。例如：

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
