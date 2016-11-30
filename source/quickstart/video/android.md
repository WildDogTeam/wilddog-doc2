
title: 快速入门
---
我们通过一个简单的一对一视频聊天示例来说明 Video SDK 的用法。[下载快速入门](https://github.com/WildDogTeam/video-quickstart-android/archive/master.zip)

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> Android Studio 1.5 以上版本 </li>
        <li> JDK 7.0 及以上版本 </li>
        <li> Android 手机系统 4.1 以上版本， 即 Android SDK 16 以上版本 </li>
    </ul>
</div>


## 1. 创建应用


首先，在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 开启匿名登录认证方式

应用创建成功后，进入 管理应用-身份认证-登录方式，开启匿名登录。

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous" >

## 3. 开启实时视频通话服务

进入 管理应用-实时视频通话，开启视频通话功能。如果没有试用码，请提交申请，我们会在3个工作日内审核并发放试用码。

<img src='/images/video_quickstart_openConversation.png' alt="video_quickstart_openConversation">

## 4. 导入快速入门

Android 快速入门是使用 Android Studio 创建的 Android 工程，使用 "Android Studio File --> New --> Import Project" 导入快速入门。

## 5. 建立会话

### 5.1 运行快速入门

连接安卓手机（4.1 以上版本），运行快速入门。

### 5.2 登录快速入门

快速入门运行成功后，输入应用 ID。

<img src='/images/video_quickstart_android_login.jpg' alt="video_quickstart_android_login" width="300" >

应用 ID 为下图 `wilddogio` 之前的字段，然后点击匿名登录。

<img src='/images/video_quickstart_createApp.png' alt="video_quickstart_createApp" width="300" >

登录成功后，页面会显示本地视频画面、你的 Wilddog ID 和用户列表按钮。

<img src='/images/video_quickstart_android_mainUI.jpg' alt="video_quickstart_createApp" width="300" >

### 5.3 邀请他人加入会话

在其他安卓手机上使用同一个应用 ID 匿名登录，然后点击用户列表按钮，点击邀请按钮邀请对方加入会话。

<img src='/images/video_quickstart_android_userList.jpg' alt="video_quickstart_android_userList" width="300" >

### 5.4 接受邀请

被邀请人会受到邀请提示，点击确认加入，会话建立。

<img src='/images/video_quickstart_android_conversation.jpg' alt="video_quickstart_android_conversation" width="300" >


更多详细信息请见 [完整指南](/guide/video/core.html) 和  [API 文档](/api/video/android/video.html)。
