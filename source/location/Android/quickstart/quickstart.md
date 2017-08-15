
title: 快速入门
---

你可以通过一次简单的位置同步的来了解 Realtime Location 的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.0.3 以上版本，即 Android SDK 15 以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

* **使用 Maven**

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.location<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-location-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="location_android_v">0.1.0</span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

* **使用 Gradle**

在build.gradle中添加：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.location:wilddog-location-android:<span class="location_android_v">0.1.0</span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

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
    <!--用于进行网络定位-->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"></uses-permission>
    <!--用于访问GPS定位-->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"></uses-permission>
    <!--获取运营商信息，用于支持提供运营商信息相关的接口-->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
    <!--用于访问wifi网络信息，wifi信息会用于进行网络定位-->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"></uses-permission>
    <!--这个权限用于获取wifi的获取权限，wifi信息会用来进行网络定位-->
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"></uses-permission>
    <!--用于访问网络，网络定位需要上网-->
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    <!--用于读取手机当前的状态-->
    <uses-permission android:name="android.permission.READ_PHONE_STATE"></uses-permission>
    <!--写入扩展存储，向扩展卡写入数据，用于写入缓存定位数据-->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
    <!--用于申请调用A-GPS模块-->
    <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"></uses-permission>
    <!--用于申请获取蓝牙信息进行室内定位-->
    <uses-permission android:name="android.permission.BLUETOOTH"></uses-permission>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"></uses-permission>
<application
...
>
 <!-- 设置高德key -->
        <meta-data
            android:name="com.amap.api.v2.apikey"
            android:value="高德key" />
        <!-- 定位需要的服务 -->
        <service android:name="com.amap.api.location.APSService" >
        </service>
</application>
```


## 4. 初始化 Wilddog Location 服务

```java
// 初始化
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
SyncReference ref = WilddogSync.getInstance().getReference();
WilddogLocation location = new WilddogLocation(ref);
```

## 5. 位置上传
开启位置上传之后，你可以监听的 Key 的位置变化。
`startTracingPosition(String key)`方法可以根据 Key 向云端持续上传设备的位置，如果 Key 不存在，云端会自动创建。默认为 5s 上传一次位置数据。

```android
location.startTracingPosition("key");
```


## 6. 位置监听
 `addPositionListener(String key, PositionListener listener)` 用于实时获取指定 Key 的最新位置信息。

```android
location.addPositionListener("key", new Location.PositionListener() {

            @Override
            public void onDataChange(String key, Position position) {
                Log.e(TAG, "current position"+position );
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```