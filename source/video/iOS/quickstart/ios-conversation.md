
title: 视频通话
---
我们通过一个简单的一对一视频通话示例来说明 Video SDK 的用法。[下载快速入门](https://github.com/WildDogTeam/video-demo-ios-conversation/archive/master.zip)

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> Xcode 7.0 及以上版本 </li>
        <li> iOS 8.0 及以上版本 </li>
    </ul>
</div>


## 1. 创建应用并充值

- 首先，在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。
- 为防止恶意使用，使用Video 前用户需保证帐户余额大于 20元。充值请进入 [控制面板-财务-充值](https://www.wilddog.com/pay/recharge) 进行充值。

## 2. 开启匿名登录认证方式

应用创建成功后，进入 管理应用-身份认证-登录方式，开启匿名登录。

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

## 3. 开启实时视频通话服务

进入 管理应用-实时视频通话，填写表单，开启视频通话功能。

<img src='/images/video_quickstart_openConversation.png' alt="video_quickstart_openConversation">

## 4. 安装快速入门

使用 Cocoapods 管理快速入门包。进入工程目录，执行以下命令，自动下载依赖并更新到最新版。

```shell

 $ pod install
 $ pod setup
 $ pod update

```

下载完毕后会自动创建 `WilddogVideoQuickStart.xcworkspace` ，打开：

```shell

 $ open WilddogVideoQuickStart.xcworkspace

```

在 Xcode 中编译运行快速入门，把快速入门安装到 iPhone 中。

## 5. 建立视频通话

### 5.1 运行快速入门

连接 iPhone，运行快速入门。

### 5.2 登录快速入门

快速入门运行成功后，输入应用 ID。

<img src='/images/video_quickstart_ios_login.png' alt="video_quickstart_ios_mainUI" width="300">

应用 ID 为下图 `wilddogio` 之前的字段，然后点击匿名登录。

<img src='/images/video_quickstart_createApp.png' alt="video_quickstart_createApp" width="300">

登录成功后，页面会显示本地视频画面、你的 Wilddog ID 和用户列表按钮。

<img src='/images/video_quickstart_ios_mainUI.png' alt="video_quickstart_ios_mainUI" width="300">

### 5.3 邀请他人加入视频通话

在其他 iPhone 上使用同一应用 ID 匿名登录，然后点击用户列表按钮，点击邀请按钮邀请对方加入视频通话。

<img src='/images/video_quickstart_ios_userList.png' alt="video_quickstart_ios_userList" width="300">

### 5.4 接受邀请

被邀请人收到邀请提示后，点击确认加入，视频通话建立。

<img src='/images/video_quickstart_ios_conversation.jpg' alt="video_quickstart_ios_conversation" width="300">


更多详细功能请见 [完整指南](/video/iOS/guide/core.html) 和  [API 文档](/video/iOS/api/WDGVideoClient.html)。
