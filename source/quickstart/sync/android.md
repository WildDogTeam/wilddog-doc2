
title: 快速入门
---
你可以通过编写一个简单的天气应用例子来了解实时数据同步的用法。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一

* **使用 Maven**

```xml
<dependency>
    <groupId>com.wilddog.client</groupId>
    <artifactId>wilddog-sync-android</artifactId>
    <version>2.0.0</version>
</dependency> 
```

* **使用 Gradle**

在build.gradle中添加

```java
dependencies {
    compile 'com.wilddog.client:wilddog-sync-android:2.0.0'
}
```

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
```

## 4. 初始化 Context

在创建 Wilddog 实例之前，必须先设置 Context，进行一次初始化。

你可以在 android.app.Application 或者 Activity的onCreate 方法中设置 Context

```java
@Override
public void onCreate() {
    super.onCreate();
    Wilddog.setAndroidContext(this);
}
```

## 5. 创建 Wilddog Sync 实例

```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com");//传入节点路径
```

## 6. 写入数据

`setValue()`方法可以写入数据。Sync 的数据存储格式采用 [JSON](http://json.org) 。

例如，在应用的根节点下写入天气数据 

```java
Map data = new HashMap();
data.put("beijing","rain");
data.put("shanghai","sunny");
child.setValue(data);
```

写入的数据如下图

<img src="/images/saveapp.png" alt="savedata" width="300" >

## 7. 读取与监听数据

`addValueEventListener()`方法可以读取并监听节点的数据。

```java
child.addValueEventListener(new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        if(dataSnapshot.getValue()!=null){
        Log.d("onDataChange",dataSnapshot.toString());
        }
    }
    @Override
    public void onCancelled(WilddogError wilddogError) {
        if(wilddogError!=null){
     Log.d("onCancelled",wilddogError.toString());}
    }
});
```

`snapshot` 里面的数据会一直与云端保持同步。如果你只想读取一次，不监听数据变化，那么你可以使用`addListenerForSingleValueEvent()`方法替代 `addValueEventListener()`方法。

更多的数据读取方式可以查看 [完整指南](/guide/sync/android/save-data.html) 和 [API 文档](/api/sync/android.html)。