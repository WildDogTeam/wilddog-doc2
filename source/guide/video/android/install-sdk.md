title : 安装 SDK
---

本篇文档介绍如何安装 SDK。

Wilddog Video SDK 的实现依赖于 Wilddog Sync SDK 和 Wilddog Auth SDK，所以在使用 Widdog Video SDK 前需要引入 Sync 和 Auth SDK。

### 安装 Sync 和 Auth SDK

可以使用 Maven 或 Gradle 获得 Wilddog Sync 和 Auth Android SDK。

- **使用 Maven 安装 Sync 和 Auth SDK**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-sync-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-auth-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

- **使用 Gradle 安装 Sync 和 Auth SDK**

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:<span class="android-sync-version"></span>&apos;</span></div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

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

### 安装 Video SDK
<a href="" class="video-android-download">下载 Video SDK</a>，解压后将jniLibs文件夹拷贝到工程目录的main文件夹中，将`libs/wilddog-video-android-*.jar` 放入工程的 `app/libs` 中，右键点击 `addAsLibrary`，完成 jar 包引用。

