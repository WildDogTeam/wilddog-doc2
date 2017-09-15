
title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-android-conference) 来快速了解 WilddogRoom SDK 的用法。


<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.4 以上，即 Android SDK 19 以上版本</li>
    </ul>
</div>

## 1. 创建应用

### 1.1 创建野狗应用
在控制面板中创建野狗应用。

### 1.2 配置应用

- 1 在 `身份认证` 标签页中，选择 `登陆方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；
- 2 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。

## 2. 安装 SDK

### 2.1 安装 WilddogRoom SDK

**使用 Gradle 安装 WilddogRoom SDK**
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-room-android:<span class="room_android_v">2.0.0-beta</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

### 2.2 安装 WilddogAuth SDK

Token（身份认证令牌）是用户在 WilddogRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。
WilddogRoom SDK 使用 WilddogAuth SDK 获取合法的 TOKEN。

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
### 4.2 初始化 WilddogRoom SDK
使用 WilddogAuth SDK 进行身份认证，身份认证成功后，初始化 WilddogRoom SDK。

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

## 5. 加入 Room
创建 `WilddogRoom` 实例并加入到 Room 中。


```java
	 WilddogRoom.Listener listener = new WilddogRoom.Listener() {
	     //Room 回调方法...
	 }
	 //room_id 由客户端生成的随机字符串
	 room = new WilddogRoom(room_id, listener);
	 room.connect();
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
在发布／订阅媒体流之前必须先连接到某个 Room。
</blockquote>

## 6. 发布／订阅媒体流
本地客户端会触发 `onConnected()` 事件通知用户已成功加入 Room 。
加入后即可发布或订阅当前 Room 中的媒体流。
### 发布本地媒体流
使用 `LocalStream.create()` 方法创建本地媒体流。

```java
    LocalStreamOptions options = new LocalStreamOptions.Builder().build();
    localStream = LocalStream.create(options);
```

使用 `publish()` 方法发布本地媒体流。

```java
	@Override
	public void onConnected(WilddogRoom wilddogRoom) {
	   wilddogRoom.publish(localStream);
	}
```
### 订阅媒体流
SDK 通过 `onStreamAdded ` 事件通知用户当前 Room 中已发布的媒体流，可以根据需要订阅感兴趣的媒体流。

```java
    @Override
    public void onStreamAdded(WilddogRoom wilddogRoom, RoomStream roomStream) {
        long streamId = roomStream.getStreamId();
        wilddogRoom.subscribe(roomStream);
    }
```
订阅成功后会触发本地客户端 `onStreamReceived` 事件返回远端媒体流。

使用 `attach()` 方法播放远端媒体流

```java
	@Override
	public void onStreamReceived(WilddogRoom wilddogRoom, RoomStream roomStream) {
	    roomStream.attach(wvvBig);
	}
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 发布媒体流需要在 WilddogRoom.Listener 的 onConnected 回调方法被触发后进行。
 </blockquote>

## 7. 更多使用

- 了解 WilddogRoom 更多使用方式，请参考 [完整指南](/conference/Android/guide/0-install-sdk.html) 和 [API 文档](/conference/Android/api/wilddog-video-initializer.html)。

