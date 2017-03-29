
title: 快速入门
---

你可以通过以下教程快速了解 IM 的用法。同时，你可以通过 [IM Demo](https://github.com/WildDogTeam/demo-android-wilddogim) 进行体验。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上或者 Eclipse ADT 15.0.0 以上版本</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.0.3以上版本，即 Android SDK 15 以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

1.安装 Wilddog IM SDK

你可以直接下载 <a href='#' class='im-android-download' target="_blank">Android SDK</a> 进行安装。

2.工程配置

Wilddog IM 解决方案在 Android 上需要 android.permission.INTERNET 权限。你需要在 AndroidMainfest.xml 文件添加以下内容：
[xml 添加内容](https://cdn.wilddog.com/docs/android/android-xml.html)。


## 3. 引入SDK

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">'com.wilddog.wilddogim:wilddog-im:0.2.0'</span></div></pre></td></tr></tbody></table></figure>


## 4. 集成用户

IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/guide/auth/server/server.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

```java
 wilddogAuth.addAuthStateListener(new WilddogAuth.AuthStateListener() {
                     @Override
                     public void onAuthStateChanged(WilddogAuth wilddogAuth) {
                         Log.d("result",(wilddogAuth.getCurrentUser()==null)+"");
                         if(wilddogAuth.getCurrentUser()==null){
                             // 为空
                         }else {
                             //登录成功
                             Log.d("result",wilddogAuth.getCurrentUser().getUid());
                         }
                     }
                 });

```
<blockquote class="notice">
  <p><strong>提示：</strong></p>
  你可以在 控制面板 - 即时通讯 - 接口测试 中手动生成 Token 用于测试。
</blockquote> 

## 5.初始化

调用 `WilddogIM.newInstance()` 方法初始化 SDK。

```java
WilddogIM wilddogIM = WilddogIM.newInstance();
```

## 6. 发起聊天

发送消息前需要先创建会话和消息体。
```java
List<String> ids = new ArrayList<>();
ids.add("uid1");
ids.add("uid2");
ids.add("uid3");
WilddogIM.newConversation(ids, new WilddogIM.CompletionListener() {
     @Override
     public void onComplete(WilddogIMError error, Conversation wilddogConversation) {
          if(error==null){
          String messageText = "Hi! How are you";
          TextMessage textMessage = Message.newMessage(messageText);
          conversation.sendMessage(textMessage, new WildValueCallBack<String>() {
                     @Override
                     public void onSuccess(String s) {
                         Log.d("result","发送成功");
                     }

                     @Override
                     public void onFailed(int code, String des) {
                      Log.d("result",des);

                     }
                 });
           }else {
           Log.d("result","create conversation failure");
           }
      }
});
```
## 7. 接收消息

在 `WilddogIM.WilddogIMMessageListener` 的代理方法 `onNewMessage()` 中接收新消息。

```java
private WilddogIM.WilddogIMMessageListener listener=new WilddogIMClient.WilddogIMMessageListener() {
    @Override
    public void onNewMessage(List<com.wilddog.wildim.Message> messages) {
        for(com.wilddog.wildim.Message wildMessage:messages){
            switch (message.getMessageType()) {

            case TEXT:
            //文本消息
            TextMessage textMessage = (TextMessage)message;

            case IMAGE:
            //图片消息
            ImageMessage imageMessage = (ImageMessage)message;

            case VOICE:
            //语音消息
            VoiceMessage voiceMessage = (VoiceMessage)message;

           }
        }
    }
};
```
