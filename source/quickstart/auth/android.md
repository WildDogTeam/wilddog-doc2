title:  快速入门
---

快速入门可以让你快速掌握 Wilddog 身份认证的基本用法。

## 创建应用

快速入门之前，需要先创建你的应用，如果你还不知道如何创建应用，请先阅读[控制面板-创建应用](/console/creat.html)

现在我们创建了一个新的应用，地址为 **gzztztestapp.wilddogio.com**。这个地址是该应用的根节点。

<img src="/images/testApp.jpeg" alt="testApp" width="300">

## 引入 SDK

**使用Maven获得 Android SDK：**

```
<dependency>
    <groupId>com.wilddog.client</groupId>
    <artifactId>wilddog-auth-android</artifactId>
    <version>2.0.0</version>
</dependency> 
```

**使用Gradle获得 Android SDK：**
要使用在 Android application使用 Gradle 或 Maven 添加 Wilddog 的依赖。 在你的build.gradle添加：

```
dependencies {
    compile 'com.wilddog.client:wilddog-auth-android:2.0.0'
}
```

如果出现由于文件重复的导致的编译错误，可以选择在build.grade中添加packingOptions：

```
android {
    ...
    packagingOptions {
        exclude 'META-INF/LICENSE'
        exclude 'META-INF/NOTICE'
    }
}

```


## 创建 Wilddog 引用

引入 Wilddog Auth SDK 之后我们需要初始化 Wilddog 应用。

```java
WilddogAuth mAuth=Wilddog.getInstance("gzztztestapp",context);
```

## 使用匿名方式登录

1. 去野狗控制面板中打开匿名登录开关：
![](/images/openanonymous.png)
2. 调用 `signInAnonymously()` 方法：

```java
mAuth.signInAnonymously().addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> var1) {
		if(var1.isSuccessful()){
			Log.d("success","Login success!");  // 登录成功
            Log.d("Anonymous",String.valueOf(var1.getResult().getWilddogUser().isAnonymous()));
		} else {
			Log.d("failure","reason:"+var1.getException()); // 登录失败及错误信息
		}
	}
});
```

以上就是匿名登录的方式，我们还提供了其他各种登录方式。具体请看下面对应的文档。