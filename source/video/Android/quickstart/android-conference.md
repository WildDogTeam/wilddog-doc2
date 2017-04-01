
title: 视频会议
---
我们通过一个简单的 4 人视频会议示例来说明 Video SDK 的用法。[下载快速入门](https://github.com/WildDogTeam/video-demo-android-conference/archive/master.zip)

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> Android Studio 1.5 以上版本 </li>
        <li> JDK 7.0 及以上版本 </li>
        <li> Android 手机系统 4.1 以上版本， 即 Android SDK 16 以上版本 </li>
    </ul>
</div>


## 1. 创建应用并充值

- 首先，在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。
- 为防止恶意使用，使用Video 前用户需保证帐户余额大于 20元。充值请进入 [控制面板-财务-充值](https://www.wilddog.com/pay/recharge) 进行充值。

## 2. 开启匿名登录认证方式

应用创建成功后，进入 管理应用-身份认证-登录方式，开启匿名登录。

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

## 3. 开启实时视频通话服务

进入 管理应用-实时视频通话，填写表单，开启多人视频会议功能。

<img src='/images/video_quickstart_open_conference.jpg' alt="video_quickstart_open_conference">

## 4. 导入快速入门

Android 快速入门是使用 Android Studio 创建的 Android 工程，使用 `Android Studio File --> New --> Import Project` 导入快速入门。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  使用 Android Studio 导入安卓项目时，可能会在 Gradle build 时卡顿在 Building gradle project info 界面上，原因及解决方案请<a href='https://github.com/WildDogTeam/wilddog-doc2/blob/master/Android%20Studio%20Gradle%20%E9%85%8D%E7%BD%AE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.md'> 参考该文档 </a>。
</blockquote>

## 5. 建立和加入视频会议

### 5.1 运行快速入门

连接安卓手机（4.1 以上版本），运行快速入门。

### 5.2 登录快速入门

快速入门运行成功后，输入应用 ID。

<img src='/images/video_quickstart_android_conference_login.jpg' alt="video_quickstart_android_conference_login" width="300" >

应用 ID 为下图 `wilddogio` 之前的字段，然后点击匿名登录。

<img src='/images/video_quickstart_createApp.png' alt="video_quickstart_createApp" width="300" >

登录成功后，输入会议 ID。会议 ID 可以是别人创建后提供的 ID ，如果当前没有会议，可自己创建一个会议 ID 。

<img src='/images/video_quickstart_android_conference_join.jpg' alt="video_quickstart_android_conference_join" width="300" >

加入会议后，页面会显示本地视频画面、你的会议 ID 和操作按钮。

<img src='/images/video_quickstart_android_conference_mainUI.png' alt="video_quickstart_android_conference_mainUI" width="300" >

### 5.3 其他人加入会议


重复上述步骤，在其他手机端登录后，输入同一会议 ID， 加入会议。

<img src='/images/video_quickstart_android_conference_multi.png' alt="video_quickstart_android_conference_multi" width="300" >


更多详细信息请见 [完整指南](/video/Android/guide/core.html) 和  [API 文档](/video/Android/api/wilddog-video.html)。
