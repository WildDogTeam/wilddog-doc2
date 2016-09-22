
title: 快速入门
---
你可以通过编写一个简单的天气应用例子来了解实时数据同步的用法。


<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>Android Studio 1.4 以上或者 Eclipse ADT 15.0.0 以上</li>
        <li> JDK 版本为 7.0 以上</li>
        <li>Android 手机系统 4.0.3以上，即 Android SDK 15 以上</li>
    </ul>
</div>


## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一

* **使用 Maven**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-sync-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-sync-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

* **使用 Gradle**

在build.gradle中添加

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-sync-android:<span class="android-sync-version"></span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packingOptions

```java
android {
    ...
    packagingOptions {
        exclude 'META-INF/LICENSE'
        exclude 'META-INF/NOTICE'
    }
}
```

## 3. 配置 Android 权限

在 AndroidMainfest.xml 文件中添加

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

## 4. 创建 Wilddog Sync 实例
```java
// 初始化
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
SyncReference ref = WilddogSync.getInstance().getReference();
```

## 5. 写入数据

`setValue()`方法可以写入数据。Sync 的数据存储格式采用 [JSON](http://json.org/json-zh.html) 。

例如，在应用的根节点下写入天气数据 

```java
SyncReference myRef = WilddogSync.getInstance().getReference("weather")
Map data = new HashMap();
data.put("beijing","rain");
data.put("shanghai","sunny");
myRef.setValue(data);

```

写入的数据如下图

<img src="/images/saveapp.png" alt="savedata" width="300" >

## 6. 读取与监听数据

`addValueEventListener()`方法可以读取并监听节点的数据。

```java
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
```

`snapshot` 里面的数据会一直与云端保持同步。如果你只想读取一次，不监听数据变化，那么你可以使用 `addListenerForSingleValueEvent()` 方法替代 `addValueEventListener()` 方法。

更多的数据读取方式，请参考 [完整指南](/guide/sync/android/save-data.html) 和 [API 文档](/api/sync/android.html)。