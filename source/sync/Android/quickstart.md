
title: 快速入门
---

你可以通过一个简单的 [评论墙示例](https://github.com/WildDogTeam/sync-quickstart-android) 来快速了解 Sync 的用法。


<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上或者 Eclipse ADT 15.0.0 以上版本</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.0.3 以上版本，即 Android SDK 15 以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

* **使用 Maven**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-sync-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

* **使用 Gradle**

在build.gradle中添加：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:<span class="android-sync-version"></span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packagingOptions：

```java
android {
    ...
    packagingOptions {
        exclude 'META-INF/services/com.fasterxml.jackson.core.ObjectCodec'
        exclude 'META-INF/services/com.fasterxml.jackson.core.JsonFactory'
        exclude 'META-INF/maven/com.squareup.okhttp/okhttp/pom.properties'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml'
        exclude 'META-INF/maven/com.squareup.okio/okio/pom.properties'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.properties'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.properties'
        exclude 'META-INF/maven/com.squareup.okio/okio/pom.xml'
        exclude 'META-INF/maven/com.squareup.okhttp/okhttp/pom.xml'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.properties'
        exclude 'META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml'
        exclude 'META-INF/maven/com.wilddog.client/wilddog-core-android/pom.xml'
        exclude 'META-INF/maven/com.wilddog.client/wilddog-core-android/pom.properties'
        exclude 'META-INF/maven/com.wilddog.client/wilddog-auth-android/pom.xml'
        exclude 'META-INF/maven/com.wilddog.client/wilddog-auth-android/pom.properties'
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
<uses-permission android:name="android.permission.INTERNET"/>
<application 
...
>
<receiver android:name="com.wilddog.client.receiver.WilddogAuthCastReceiver">
            <intent-filter>
                <action android:name="com.wilddog.wilddogauth.signinsuccess"/>
                <action android:name="com.wilddog.wilddogauth.signoutsuccess"/>
            </intent-filter>
        </receiver>
</application>		
```


## 4. 创建 Sync 实例

```java
// 初始化
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
SyncReference ref = WilddogSync.getInstance().getReference();
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>

 Wilddog Sync 允许同时创建多个实例。

</blockquote>

## 5. 写入数据

`setValue()` 用于向指定节点写入数据。Sync 的数据存储格式采用 [JSON](http://json.org/json-zh.html)。

例如，在应用的根节点下写入评论数据：

```java
 Comment comment = new Comment("Jack","Wilddog, Cool!");
ref.child("messageboard").child("message1").setValue(comment
);
```

写入的数据如下图：

 <img src="/images/saveapp.png" alt="yourApp" width="400">



## 6. 监听数据
 `addValueEventListener()`或 `addListenerForSingleValueEvent()` 方法用于监听 [节点](/guide/reference/term.html#节点) 的数据。

例如，从应用中获得评论数据：

```java
// dataSnapshot 里面的数据会一直和云端保持同步
myRef.addValueEventListener(new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        if(dataSnapshot.getValue()!=null){
        	Log.d("onDataChange",dataSnapshot.toString());
        }
    }
    @Override
    public void onCancelled(SyncError syncError) {
        if(syncError!=null){
     		Log.d("onCancelled",syncError.toString());}
        }
});

// 如果你只想监听一次，那么你可以使用addListenerForSingleValueEvent()

myRef.addListenerForSingleValueEvent(new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        if(dataSnapshot.getValue()!=null){
        	Log.d("onDataChange",dataSnapshot.toString());
        }
    }
    @Override
    public void onCancelled(SyncError syncError) {
        if(syncError!=null){
     		Log.d("onCancelled",syncError.toString());}
        }
});
```


## 7.数据安全

你可以在 Sync 中使用规则表达式进行数据访问权限的控制。规则表达式可以实现以下功能：

- 数据访问权限控制
- 用户访问权限控制
- 数据格式校验
- 数据索引

规则表达式的具体使用，请参考 [安全性与规则](/sync/Android/rules/introduce.html)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>

初始配置下，所有人都能读写你的应用数据，请及时在 实时通信引擎-读写权限 中更改规则表达式。

</blockquote>

## 8.更多使用

- 了解 Sync 更多使用方式，请参考 [完整指南](/sync/Android/guide/save-data.html) 和 [API 文档](/sync/Android/api/WilddogOptions.html)。
- 了解如何设计数据结构，请参考 [组织数据](/sync/Android/guide/bestpractice/structure-data.html)。