title : 安装 SDK
---

本篇文档介绍如何安装 SDK。

Wilddog Video SDK 的实现依赖于 Wilddog Sync SDK 和 Wilddog Auth SDK，所以在使用 Widdog Video SDK 前需要引入 Sync 和 Auth SDK。

### 引入 Sync 和 Auth SDK

可以使用 Maven 或 Gradle 获得 Wilddog Video Android SDK,Video SDK中已经包含了 Sync SDK 和 Auth Android SDK，无需重复引用。

- **使用 Maven 安装 Wilddog Video SDK**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-video-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span>0.4.1<span class="tag">&lt;/<span class="name">version</span>&gt;</span></div>    <span class="tag">&lt;<span class="name">type</span>&gt;</span>pom<span class="tag">&lt;/<span class="name">type</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>



- **使用 Gradle 安装 Wilddog Video SDK**

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies { </div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-video-android:0.4.1</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

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


