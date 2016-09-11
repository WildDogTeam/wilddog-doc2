
title: 快速入门
---
快速入门通过一个简单的天气应用例子来让你了解实时数据同步的用法。

## 1. 创建应用

首先在控制面板中创建应用，请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

**使用 Maven 安装 Sync SDK：**

```xml
<dependency>
    <groupId>com.wilddog.client</groupId>
    <artifactId>wilddog-sync-android</artifactId>
    <version>2.0.0</version>
</dependency> 
```

**使用 Gradle 安装 Sync SDK：**
 在build.gradle中添加：

```java
dependencies {
    compile 'com.wilddog.client:wilddog-sync-android:2.0.0'
}
```

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packingOptions：

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

在 AndroidMainfest.xml 文件中添加：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

## 4. 初始化 Context

在创建 Wilddog 实例之前，必须先设置 Context，进行一次初始化。

你可以在 android.app.Application 或者 Activity的onCreate 方法中设置 Context:

```java
@Override
public void onCreate() {
    super.onCreate();
    Wilddog.setAndroidContext(this);
}
```

## 5. 创建 Wilddog 实例

创建 Wilddog 实例的时候需要传入节点路径参数。

```java
Wilddog ref = new Wilddog("https://<appId>.wilddogio.com");//传入节点路径
```

实例的 child() 方法可以创建一个子节点实例。

例如在 ref 下创建`/weather`子节点：

```java
Wilddog child = ref.child("/weather")
```

## 6. 保存数据

setValue() 方法可以保存数据。Sync的数据存储格式采用 [JSON](http://json.org) 。

例如在应用中`/weather`节点下保存天气数据

```java
Map data = new HashMap();
data.put("beijing","rain");
data.put("shanghai","sunny");
child.setValue(data);
```

保存的数据如下图：

<img src="/images/saveapp.png" alt="savedata" width="300" >

## 7. 读取与同步数据

`addValueEventListener()`方法可以读取保存的数据。

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
取出的数据会一直和云端保持同步。如果你只想读取一次，不同步数据变化，那么你可以使用`addListenerForSingleValueEvent()`方法替代 `addValueEventListener()`方法。

更多的数据读取方式可以查看 [完整指南](/guide/sync/android/save-data.html)和 [API 文档](/api/sync/android.html)