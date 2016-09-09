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
要使用在 Android application使用 Gradle 或 Maven 添加 WilddogAuth 的依赖。 在你的build.gradle添加：

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

需要在项目的 AndroidManifest.xml 中添加

```
<uses-permission android:name="android.permission.INTERNET"/>

```


## 创建 WilddogAuth 引用

引入 Wilddog Auth SDK 之后我们需要初始化 WilddogAuth 对象。

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
			Log.d("failure","reason:"+var1.getException().toString()); // 登录失败及错误信息
		}
	}
});
```

以上就是匿名登录的方式。

## 使用邮箱方式登录

1. 去野狗控制面板中打开邮箱登录开关：

![](/images/openemail.png)

2.生成合法用户的方式有两种：

* 将账号密码填写到用户列表中，生成新的用户。

![](/images/addemailuser.png)

* 通过Android WilddogAuth SDK生成

```
     wilddogAuth.createUserWithEmailAndPassword("123456789@qq.com","45678901").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> var1) {
		if(var1.isSuccessful()){
		}
		}
		}
```
	 
	 
3. 调用 `signInWithEmailAndPassword()` 方法：

```java
mAuth.signInWithEmailAndPassword("123456789@qq.com","45678901").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> var1) {
		if(var1.isSuccessful()){
			Log.d("success","Login success!");  // 登录成功
            Log.d("Anonymous",String.valueOf(var1.getResult().getWilddogUser().isAnonymous()));
		} else {
			Log.d("failure","reason:"+var1.getException().toString()); // 登录失败及错误信息
		}
	}
});
```

以上就是邮箱登录的方式，我们还提供了其他各种登录方式。

## 退出登出

你可以使用 `signOut:` 方法退出当前登录用户。例如：

mAuth.signOut();

具体请看下面对应的文档。