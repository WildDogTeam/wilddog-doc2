
title: 快速入门
---

你可以通过以下教程快速了解 IM 的用法。同时，你可以通过 [IM Demo](https://github.com/WildDogTeam/demo-ios-wilddogim) 进行体验。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Xcode 7.0 及以上版本</li>
        <li>支持 iOS 8.0 及以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。



## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

- **使用 CocoaPods** 

要将 Wilddog IM SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问  [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 

打开工程目录，新建一个 Podfile 文件:

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句：

	pod 'WilddogIM'

最后安装 SDK：

	$ pod install
	$ open your-project.xcworkspace

</br>
- **手动集成** 
  </br>
1. 下载 Sync SDK <a href="https://cdn.wilddog.com/sdk/ios/2.3.3/WilddogSync-2.3.3.zip" id="sync_ios_d">点此下载</a>。   
2. 下载 Core SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.8/WilddogCore.framework-2.0.8.zip" id="sync_core_d">点此下载</a>。    
3. 下载 Auth SDK <a href="https://cdn.wilddog.com/sdk/ios/2.0.7/WilddogAuth.framework-2.0.7.zip" id="auth_ios_d">点此下载</a>。  
4. 下载 IM SDK <a href="https://cdn.wilddog.com/sdk/ios/0.2.0/WilddogIM.framework-0.2.0.zip" id="im_ios_d">点此下载</a>。        
5. 把 WilddogSync.framework、WilddogCore.framework、WilddogAuth 和 WilddogIM 拖到工程目录中。  
6. 选中 Copy items if needed 、Create Groups，点击 Finish。  
7. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 JavaScriptCore.framework、 libsqlite3 加入列表中。

## 3. 引入头文件

```objc
＃import <WilddogIM/WilddogIM.h>
```

## 4. 集成用户和初始化

IM 的用户系统完全兼容 Wilddog Auth 产品的用户系统。你可以使用 Auth 的邮箱、电话、匿名等登录方式与 IM 结合使用，也可以使用 Auth 产品的 customToken 的方式来集成开发者的已有用户系统。
用 customToken 的方式，首先需要提供野狗 [Server SDK](/auth/Server/introduction.html) 生成的 customToken，开发者需要提供用户的 ID、昵称、头像。
具体流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

```objc
// 用 Wilddog Auth Token 登录
[[WDGAuth auth] signInWithCustomToken:wilddogToken completion:^(WDGIMUser * _Nullable currentUser, NSError * _Nullable error) {
     if(!error){
         // 初始化 SDK。
         [[WDGIM im] setDelegate:self];
     }   
}];
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
   你可以在 控制面板 - 即时通讯 - 接口测试 中手动生成 Token 用于测试。
</blockquote> 

## 5. 发起聊天
发起聊天需要三个步骤：
1. 创建会话
2. 创建消息体
3. 发送消息

例如，发送一条文本消息：

```objc
//创建会话，传入的数组中默认包含登录用户 ID
[[WDGIMClient defaultClient] newConversationWithMembers:@[@"UserID"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
     //创建文字消息
     WDGIMMessageText *textMessage = [WDGIMMessage messageWithText:@"Hello, Wilddog!"];
     //发送消息
     [conversation sendMessage:textMessage completion:^(WDGIMMessage * _Nullable msg, NSError * _Nullable err) {
         //msg 是发送成功后的消息
     }];
}];
```
## 6. 接收消息

WDGIMClientDelegate 的代理方法  `-wilddogClient:didRecieveMessages:` 用于接收新消息。

```objc

//实现监听消息的方法
- (void)wilddogClient:(WDGIMClient *)client didRecieveMessages:(NSArray<WDGIMMessage *> *)messages
{
    for (WDGIMMessage *msg in messages) {
        switch (msg.messageType) {
            //文本消息
            case WDGIMMessageTypeText:
                break;
                
            //图片消息
            case WDGIMMessageTypeImage:
                break;
                
            //语音消息
            case WDGIMMessageTypeVoice:
                break;
                
            default:
                break;
        }
    }
}
```
