title: 快速入门
---

你可以通过快速入门教程快速了解 IM 的用法。

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

	pod 'Wilddog/IM'

最后安装 SDK：

	$ pod install
	$ open your-project.xcworkspace

</br>
- **手动集成** 
  </br>
1. 下载 Sync SDK <a href="#" class="ios-download-sync" target='_blank'>点此下载</a>。 
2. 下载 Core SDK <a href="#" class="ios-download-core" target='_blank'>点此下载</a>。  
3. 下载 Auth SDK <a href="#" class="ios-download-auth" target='_blank'>点此下载</a>。
4. 下载 IM SDK <a href="#" class="ios-download-im" target='_blank'>点此下载</a>。        
5. 把 WilddogSync.framework、WilddogCore.framework、WilddogAuth 和 WilddogIM 拖到工程目录中。  
6. 选中 Copy items if needed 、Create Groups，点击 Finish。  
7. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 JavaScriptCore.framework、 libsqlite3 加入列表中。

## 3. 初始化

1.引入头文件

```objc
＃import <WilddogIM/WilddogIM.h>
```

2.初始化

调用 `+clientWithAppID:delegate:` 方法初始化 SDK。

```objc
[WDGIMClient clientWithAppID:appID delegate:self];

```

## 4. 集成用户

IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/guide/auth/server/server.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。
具体流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  你可以在 `IM 控制面板`-`接口测试` 中手动生成 Token 用于测试。
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
