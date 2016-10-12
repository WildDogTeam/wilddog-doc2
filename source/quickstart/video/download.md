title: 安装 SDKs
---

野狗实时视频通话提供了 Web, Android, iOS SDK。

SDK 根据 [语义化版本](http://semver.org/lang/zh-CN/#section) 规范进行更新，所以开发者需要同时关注 SDK 主版本号和次版本号，以保证代码和 API 兼容。

Wilddog Video 基于 Wilddog Sync 和 Auth SDK 开发，除了 Video SDK，还需要引入 Wilddog Sync SDK 以及 Wilddog Auth SDK。 

## Web SDK
Wilddog Web SDK 保存在野狗 CDN 上，可以直接引入。

### 引入 Sync 和 Auth SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

### 引入 Video SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/0.3.3/wilddog-video.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

## Andriod SDK

### 引入 Sync 和 Auth SDK

可以使用 Maven 或 Gradle 获得 Wilddog Sync 和 Auth Android SDK。

- **使用 Maven 安装 Sync 和 Auth SDK**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-sync-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-auth-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

- **使用 Gradle 安装 Sync 和 Auth SDK**

```
dependencies { 
    compile 'com.wilddog.client:wilddog-sync-android:2.0.1'
    compile 'com.wilddog.client:wilddog-auth-android:2.0.1'
}
```

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

### 引入 Video SDK
[下载 Video SDK](https://cdn.wilddog.com/sdk/android/0.3.1/wilddog-video-android-0.3.1.zip)，解压后将jniLibs文件夹拷贝到工程目录的main文件夹中，将`libs/wilddog-video-android-*.jar` 放入工程的 `app/libs` 中，右键点击 `addAsLibrary`，完成 jar 包引用。

## iOS SDK
通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Wilddog Sync 和 Auth SDK。

### 使用 CocoaPods 安装 SDK

在 Podfile 文件中添加以下语句，同时添加 Sync, Auth 和 Video SDK。

```shell
    pod 'Wilddog/Sync'
    pod 'Wilddog/Auth'
    pod 'WilddogVideo'
```

然后运行 `pod install` 将上述依赖安装到你的工程。
