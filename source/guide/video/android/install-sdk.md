title : 安装 SDK
---

本篇文档介绍如何安装和初始化 SDK。

### 安装 SDK

#### 安装 Sync 和 Auth SDK

Video SDK 依赖于 Sync 和 Auth SDK，可以使用 Maven 或 Gradle 获得 Sync/Auth SDK。

- **使用 Maven 安装 Wilddog Sync/Auth SDK**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span>2.0.1<span class="tag">&lt;/<span class="name">version</span>&gt;</span></div>    <span class="tag">&lt;<span class="name">type</span>&gt;</span>pom<span class="tag">&lt;/<span class="name">type</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure><figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span>2.0.1<span class="tag">&lt;/<span class="name">version</span>&gt;</span></div>    <span class="tag">&lt;<span class="name">type</span>&gt;</span>pom<span class="tag">&lt;/<span class="name">type</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>



- **使用 Gradle 安装 Wilddog Sync/Auth SDK**

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:2.0.1&apos;</span></div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:2.0.1&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

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

#### 安装 Video SDK

[下载]() Video SDK 的 zip 压缩包。
解压后将 libs 文件夹下的 .jar 文件拷贝到工程的 /libs 目录下，添加为工程的依赖库。
将 jniLibs 文件夹下的 armeabi-v7a 文件夹拷贝到 /src/main/jniLibs 目录下，完成 Video SDK 的引用。


### 初始化 Video SDK

客户端在使用 Wilddog Video SDK 前需要初始化 `WilddogVideoClient` 来连接客户端和野狗服务器。

初始化 `WilddogVideoClient` 之前，要先经过 [野狗身份认证](/overview/auth.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。


例如，以匿名方式登录后初始化 `WilddogVideoClient` ：

```java

@Override

public void onCreate() { 

    super.onCreate(); 

    //初始化WilddogApp实例,初始化WilddogApp后，即可在项目任意位置获取数据库地址引用
    //mAppId即野狗应用ID

    WilddogOptions.Builder builder = new WilddogOptions.Builder().setSyncUrl("http://"+ mAppId +".wilddogio.com");

    WilddogOptions options = builder.build();

    WilddogApp.initializeApp(getApplicationContext(), options);

    //获取数据库地址引用

    SyncReference mRef = WilddogSync.getInstance().getReference();

    //获取Auth对象

    WilddogAuth auth = WilddogAuth.getInstance();

    //匿名登录系统

    auth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {

        @Override

        public void onComplete(Task<AuthResult> task) {

            if (task.isSuccessful()) {
                //...
                //完成身份认证 
            }else {
                 throw  new RuntimeException("auth 失败"+task.getException().getMessage());
            }
        }
    });

    String path = mRef.getRoot().toString();
    int startIndex = path.indexOf("https://") == 0 ? 8 : 7;
    //获取AppId
    String appid = path.substring(startIndex, path.length() - 14);
    //初始化 WilddogVideo SDK
    WilddogVideo.initializeWilddogVideo(getApplicationContext(), appid);
    //获取 WilddogVideo对象
    WilddogVideo video＝WilddogVideo.getInstance();
    //获取client对象
    WilddogVideoClient client = video.getClient();
    //....
}

```

