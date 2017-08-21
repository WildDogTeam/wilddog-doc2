
title: 快速入门
---
我们通过一个简单的一对一视频通话示例来说明 Video SDK 的用法。[前往demo源码](https://github.com/WildDogTeam/video-demo-android-conversation)

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> Android Studio 1.5 以上版本 </li>
        <li> JDK 7.0 及以上版本 </li>
        <li> Android 手机系统 4.1 以上版本， 即 Android SDK 16 以上版本 </li>
    </ul>
</div>


## 1. 创建应用

首先，在控制面板中创建应用。

<img src='/images/video_quickstart_create.png' alt="video_quickstart_create">

## 2. 开启匿名登录

应用创建成功后，进入 管理应用-身份认证-登录方式，开启匿名登录。

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

## 3. 开启实时视频通话

进入 管理应用-实时视频通话，开启视频通话功能。此处注意记下配置页面的`VideoAppID`

<img src='/images/video_quickstart_openVideo.png' alt="video_quickstart_openVideo">

## 4. 导入快速入门

Android 快速入门是使用 Android Studio 创建的 Android 工程，使用 `Android Studio File --> New --> Import Project` 导入快速入门。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  使用 Android Studio 导入安卓项目时，可能会在 Gradle build 时卡顿在 Building gradle project info 界面上，原因及解决方案请<a href='https://github.com/WildDogTeam/wilddog-doc2/blob/master/Android%20Studio%20Gradle%20%E9%85%8D%E7%BD%AE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.md'> 参考该文档 </a>。
</blockquote>


## 5. 运行快速入门

连接安卓手机（4.1 以上版本），运行快速入门。

## 6. 登录快速入门

快速入门运行成功后，输入`VideoAppID`。

<img src='/images/video_quickstart_android_login.jpg' alt="video_quickstart_android_login" width="300" >

`VideoAppID`为下图所示，然后点击匿名登录。

<img src='/images/video_quickstart_videoappid.png' alt="video_quickstart_videoappid">

登录成功后，页面会显示本地视频画面、你的 Wilddog ID 和用户列表按钮。

<img src='/images/video_quickstart_android_mainUI.jpg' alt="video_quickstart_createApp" width="300" >

## 7. 邀请他人加入

在其他安卓手机上使用同一个`VideoAppID` 匿名登录，然后点击用户列表按钮，点击邀请按钮邀请对方加入视频通话。

<img src='/images/video_quickstart_android_userList.jpg' alt="video_quickstart_android_userList" width="300" >

## 8. 接受邀请

被邀请人会受到邀请提示，点击确认加入，视频通话建立。

<img src='/images/video_quickstart_android_conversation.jpg' alt="video_quickstart_android_conversation" width="300" >


更多详细信息请见 [完整指南](/conversation/Android/guide/0-concepts.html) 和  [API 文档](/conversation/Android/api/wilddog-video.html)。

