title: 快速入门
---

通过初始化、用户登录、收发消息等集成方法，快速了解和使用 Wilddog IM SDK。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Xcode 7.0 及以上版本</li>
        <li>支持 iOS 7.0 及以上版本</li>
    </ul>
</div>

## 1. 创建应用

Wilddog IM SDK 是以 Wilddog Sync 和 Wilddog Auth 为基础开发的，所以在集成 IM SDK 前，需要先创建 Wilddog 应用来获取 Wilddog AppID。

在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

- **使用 CocoaPods** 

要将 WilddogSync SDK 导入到你的工程中，推荐使用 [CocoaPods](https://cocoapods.org/)，如果没用过 CocoaPods，请先访问  [CocoaPods getting started](https://guides.cocoapods.org/using/getting-started.html)。 

打开工程目录，新建一个 Podfile 文件:

	$ cd your-project-directory
	$ pod init
	$ open -a Xcode Podfile # opens your Podfile in XCode

然后在 Podfile 文件中添加以下语句：

	pod 'Wilddog/Sync'

最后安装 SDK：

	$ pod install
	$ open your-project.xcworkspace

</br>
- **手动集成** 
  </br>
1. 下载 Sync SDK <a href="#" class="ios-download-sync" target='_blank'>点此下载</a>。 
2. 下载 Core SDK <a href="#" class="ios-download-core" target='_blank'>点此下载</a>。        
3. 把 WilddogSync.framework 和 WilddogCore.framework 拖到工程目录中。  
4. 选中 Copy items if needed 、Create Groups，点击 Finish。  
5. 点击工程文件 -> TARGETS -> General，在 Linked Frameworks and Libraries 选项中点击 '+'，将 JavaScriptCore.framework、 libsqlite3 加入列表中。

## 3. 初始化

**1.引入头文件**

```objc

```
**2.初始化**

在 IM 的一切操作之前，必须先进行一次初始化，设置 Wilddog AppID 和 delegate。可以在 `+ clientWithAppID: delegate:` 方法中设置。

```objc
[WDGIMClient clientWithAppID:appID delegate:self];

```
**3.建立连接** 

Wilddog IM SDK 会和 Wilddog 服务器建立一个长连接，以达到能实时接收消息的目的。你可以通过 `- connectWithCompletion:` 方法来建立连接和监听连接状态。

```
// 和 Wilddog 服务器建立连接
[[WDGIMClient defaultClient] connectWithCompletion:^(BOOL success, NSError * _Nullable error){
    // 监听连接状态
}];

```
**4.用户登录**  

在通常情况下，APP 都会有自己的用户系统，Wilddog 通过 JWT Token 的方式来集成 APP 的已有用户。更多信息请参考 [生成 Custom Token](https://docs.wilddog.com/guide/auth/server/server.html#创建Custom-Token)

```objc
// 用 Wilddog Auth Token 登录
[[WDGIMClient defaultClient] signInWithCustomToken:wilddogToken completion:^(WIMUser * _Nullable currentUser, NSError * _Nullable error) {
        
}];

## 4. 发起聊天
聊天分为单聊和讨论组，Wilddog IM SDK 不严格区分它们，当聊天人数超过两个人时则自动升级为讨论组，但是不可逆。

```
//创建会话，传入的数组中默认包含登录用户 ID
[[WDGIMClient defaultClient] newConversationWithMembers:@[@"UserID"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
     //发文字消息
     WDGIMMessageText *textMessage = [WDGIMMessage messageWithText:@"Hello, Wilddog!"];
     [conversation sendMessage:textMessage completion:^(WDGIMMessage * _Nullable msg, NSError * _Nullable err) {
         //msg 是发送成功后的消息
     }];
}];
```
## 5. 接收消息

接收消息需要调用 WDGIMClientDelegate 中的代理方法 `- wilddogClient:didRecieveMessages:` ，如果用户是登录状态，SDK 会通过此回调方法收到新消息。

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
