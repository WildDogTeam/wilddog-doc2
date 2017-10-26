title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-android-conversation) 来快速了解 WilddogVideoCall SDK 的用法。


<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.1 以上，即 Android SDK 16 以上版本</li>
    </ul>
</div>

## 1. 创建应用

### 1.1 创建野狗应用
在控制面板中创建野狗应用。

<img src='/images/video_quickstart_create.png' alt="video_quickstart_create">

### 1.2 配置应用

- 1 在 `身份认证` 标签页中，选择 `登录方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；
- 2 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

## 2. 安装 SDK

### 2.1 安装 WilddogVideoCall SDK

**使用 Gradle 安装 WilddogVideoCall SDK**
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-video-call-android:<span class="media_android_v">2.0.0-beta</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

### 2.2 安装 WilddogAuth SDK

Token（身份认证令牌）是用户在 WilddogVideo SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。
WilddogVideoCall SDK 使用 WilddogAuth SDK 获取合法的 TOKEN。

**使用 Gradle 安装 WilddogAuth SDK**
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="auth_android_v">2.0.6</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packagingOptions：

```java
android {
    ...
    packagingOptions {
        exclude 'META-INF/NOTICE'
        exclude 'META-INF/LICENSE'
        exclude 'META-INF/notice'
        exclude 'META-INF/notice.txt'
        exclude 'META-INF/license'
        exclude 'META-INF/license.txt'
    }
}
```


## 3. 配置 Android 权限

在 AndroidMainfest.xml 文件中添加：

```xml
<!--网络请求权限-->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<!--相机权限-->
<uses-permission android:name="android.permission.CAMERA" />
<!--麦克风权限-->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

```


## 4. 初始化 SDK

### 4.1 初始化 WilddogAuth SDK

```java
    //初始化 Auth SDK
    WilddogOptions.Builder builder = new WilddogOptions.Builder().setSyncUrl("http://" + APP_ID + ".wilddogio.com");
    WilddogOptions options = builder.build();
    WilddogApp.initializeApp(LoginActivity.this, options);
```
### 4.2 初始化 WilddogVideoCall SDK
使用 WilddogAuth SDK 进行身份认证，身份认证成功后，初始化 WilddogVideoCall SDK。

```java
    //使用匿名登录方式进行身份认证
    WilddogAuth.getInstance().signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
        @Override
        public void onComplete(Task<AuthResult> task) {
            if (task.isSuccessful()) {
                WilddogUser user = task.getResult().getWilddogUser();
                String token = user.getToken(false).getResult().getToken();
                //初始化 Room SDK
                WilddogVideoInitializer.initialize(this.getApplicationContext(),VIDEO_APP_ID,token);
            } else {
                Toast.makeText(context, "登录失败", Toast.LENGTH_SHORT).show();
            }
        }
    });
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 VIDEO_APP_ID 为应用实时视频通话标签页中的 VideoAppID 字段值，请勿与实时通信引擎 AppID 混淆。
 VideoAppID 为 wd 开头的随机字符串，例如：wd1234567890abcdef。

</blockquote>

## 5. 配置一对一视频通话

使用 `WilddogVideoCall.getInstance()` 方法获取 [WilddogVideoCall](/conversation/Android/api/wilddog-video-call.html) 单例，设置代理 <[WilddogVideoCall.Listener](/conversation/Android/api/wilddog-video-call-listener.html)> 用于监听通话请求：

```java
     video.setListener(new WilddogVideoCall.Listener() {
                @Override
                public void onCalled(Conversation conversation, String s) {
                    
                }
    
                @Override
                public void onTokenError(WilddogVideoError wilddogVideoError) {
    
                }
            });
```

开始一对一视频通话之前，使用 `LocalStream.create()` 方法创建本地媒体流。

```java
LocalStreamOptions.Builder builder = new LocalStreamOptions.Builder();
LocalStreamOptions options = builder.build();
LocalStream localStream = LocalStream.create(options);
```

## 6. 开始一对一视频通话

使用 WilddogAuth 登录成功后，用户会获得唯一的 `uid`，在 WilddogVideoCall SDK 中，使用 `uid` 作为用户的身份标识。

### 6.1 邀请一对一视频通话

使用 `call()` 来发起通话请求：

```java
mConversation = video.call(remoteUid,localStream,"conversationDemo");
```

### 6.2 接受一对一视频通话

被邀请的用户通过 [WilddogVideoCall.Listener](/conversation/Android/api/wilddog-video-call-listener.html) 的 `onCalled(Conversation conversation, String s)` 方法收到 [Conversation](/conversation/Android/api/conversation.html) 实例，使用 `accept()` 接收一对一视频通话：

```java
     video.setListener(new WilddogVideoCall.Listener() {
                @Override
                public void onCalled(Conversation conversation, String s) {
                    mConversation = conversation;
                    mConversation.accept();
                }
    
                @Override
                public void onTokenError(WilddogVideoError wilddogVideoError) {
    
                }
            });
```

### 6.3 播放媒体流

一对一视频通话链接成功后，通话双方会通过 [Conversation](/conversation/Android/api/conversation.html) 代理的 `onStreamReceived(RemoteStream remoteStream)` 方法收到 [RemoteStream](/conversation/Android/api/remote-stream.html) 实例，使用 `attach()` 方法播放远端媒体流：

```java
conversation.setConversationListener(new Conversation.Listener() {
    @Override
    public void onCallResponse(CallStatus callStatus) {
                       
    }

    @Override
    public void onStreamReceived(RemoteStream remoteStream) {
      WilddogVideoView remoteView = (WilddogVideoView)findViewById(R.id.wvv_remote);
      remoteStream.attach(remoteView);
    }

    @Override
    public void onClosed() {

    }

    @Override
    public void onError(WilddogVideoError wilddogVideoError) {

    }
});
```

## 7. 更多应用

更多详细信息请见 [完整指南](/conversation/Android/guide/0-concepts.html) 和  [API 文档](/conversation/Android/api/wilddog-video.html)。

