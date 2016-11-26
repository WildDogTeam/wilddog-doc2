title: 快速入门
---

你可以通过以下教程快速了解 Wilddog IM 的用法。

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

1.安装 Wilddog IM SDK：
Android Studio 使用 Gradle 添加 Wilddog IM 的依赖。在你的 build.gradle 添加：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-IM-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>

2.工程配置
Wilddog IM 解决方案在 Android 上需要 android.permission.INTERNET 权限。你需要在 AndroidMainfest.xml 文件添加以下内容：
[xml 添加内容](http://ocpo37x5v.bkt.clouddn.com/im-android.html)


## 3. 初始化

**1.引入SDK**

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">compile <span class="string">&apos;com.wilddog.client:wilddog-IM-android:<span class="android-auth-version"></span>&apos;</span></div></pre></td></tr></tbody></table></figure>

**2.初始化**
调用 `WilddogIMClient.newInstance(context, "APP ID")` 方法初始化 SDK。

```java
WilddogIMClient wilddogIMClient = WilddogIMClient.newInstance(context, "APP ID");

```
## 4. 集成用户

Wilddog IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/guide/auth/server/server.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

也可以在 `IM 控制面板` -> `接口测试` 中生成 Token 用于测试。

Wilddog IM 解决方案会和野狗服务器建立一个长连接，以达到能实时接收消息的目的。你可以通过 addConnectionListener 方法来监听连接状态。调用 connect() 方法来建立连接。

```java
client.signIn(token, new WildValueCallBack<WilddogUser>() {
     @Override
     public void onSuccess(WilddogUser wilddogUser) {
          // 登陆成功后的操作
          }

          @Override
          public void onFailed(int code, String des) {
              Log.e("result",des);
          }
      });
 ```
## 5. 发起聊天
发送消息前需要先创建会话和消息体。
```java
List<String> ids = new ArrayList<>();
ids.add("uid1");
ids.add("uid2");
ids.add("uid3");
WilddogIMClient.newConversation(ids, new WilddogIMClient.CompletionListener() {
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
## 6. 接收消息

在 `WilddogIMClient.WilddogIMMessageListener` 的代理方法 `onNewMessage（）` 中接收新消息。

```java
private WilddogIMClient.WilddogIMMessageListener listener=new WilddogIMClient.WilddogIMMessageListener() {
    @Override
    public void onNewMessage(List<com.wilddog.wildim.message.Message> messages) {
        for(com.wilddog.wildim.message.Message wildMessage:messages){
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
