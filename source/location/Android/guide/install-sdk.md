title: 安装与初始化
---

本篇文档介绍如何安装和初始化 SDK。


## 1.  安装 SDK
SDK 的安装方式有两种，你可以任选其一：

* **使用 Maven**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="sync_android_v">2.3.0</span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

* **使用 Gradle**

在build.gradle中添加：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:<span class="sync_android_v">2.3.0</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>


## 2. 初始化 Location SDK

初始化需要有高德的 API Key，以及野狗 AppID：

* 高德 App Key 在[高德开放平台](https://lbs.amap.com/)中创建应用获取。
* 野狗 AppID [野狗控制面板](https://www.wilddog.com/dashboard/)中创建应用获取。

### 1. 引入高德api：
在`build.gradle`中，引入：
```android
 compile 'com.amap.api:map2d:latest.integration'
```

### 2. 初始化 WilddogLocation 服务：


WilddogLocation SDK 依赖于 Wilddog Sync，所以也可以先初始化 Sync 的 App，再用 Sync App 的 Reference 来创建 WilddogLocation 服务：

```android
// 初始化
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
SyncReference ref = WilddogSync.getInstance().getReference();
Location location = new Location(ref);
```

