title: 安装和初始化
---

本篇文档介绍如何安装 SDK 并使用 `WilddogVideoInitializer` 初始化 WilddogRoom SDK。


## 安装 SDK
### 安装 Video SDK

- **使用 Gradle 安装 WilddogRoom SDK**
<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-room-android:<span class="room_android_v">2.0.0-beta</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

### 获取 Token
Token（身份认证令牌）是用户在 WilddogRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。

野狗提供了两种方式获取 Token ：
1. 在客户端通过 WilddogAuth SDK 获取。请参考：[WilddogAuth 快速入门](/auth/Android/quickstart.html)，
开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。
2. 在服务端通过 REST API 获取。请参考：[生成 Custom Token](/auth/Server/server.html#生成-Custom-Token)。

### 编译错误处理
如果出现由于文件重复导致的编译错误，可以在 build.gradle 中添加 packingOptions:

```
	android {
	    ...
	    packagingOptions {
	        exclude 'META-INF/LICENSE'
	        exclude 'META-INF/NOTICE'
	    }
	}
```

### 混淆处理
  如果需要混淆,请在混淆文件中添加以下代码:

```
	-keep class org.webrtc.**{*;}
	-keep class de.tavendo.autobahn.**{*;}
	-keep class com.wilddog.video.**{*;}
```

### 初始化 SDK

使用 [initialize](/conference/Android/api/wilddog-video-initializer.html#initialize-context-videoAppId-token) 方法初始化 WilddogRoom SDK。

```java
	WilddogVideoInitializer.initialize(context,videoAppId,token);
```






  

