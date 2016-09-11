
title:  快速入门
---

快速入门以邮箱登录为例说明野狗身份认证的基本用法。



## 1. 创建应用

首先在控制面板中创建应用，请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

**使用 Maven 安装 Android SDK：**

```xml
<dependency>
    <groupId>com.wilddog.client</groupId>
    <artifactId>wilddog-auth-android</artifactId>
    <version>2.0.0</version>
</dependency> 
```

**使用 Gradle 安装 Auth SDK：**
 在build.gradle中添加：

```java
dependencies {
    compile 'com.wilddog.client:wilddog-auth-android:2.0.0'
}
```

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packingOptions：

```
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

## 4. 初始化 Wilddog Auth 实例

引入 Wilddog Auth SDK 之后需要初始化 WilddogAuth 实例。

```java
WilddogAuth mAuth = Wilddog.getInstance("<appId>",context);
```


## 5. 使用邮箱认证

1.首先确认应用的邮箱登录功能已激活（默认是关闭状态）：

![](/images/openemail.png)

2.创建用户的方式有两种：

* 将账号密码填写到用户列表中，创建新的用户。用户创建成功后会自动登录。

![](/images/addemailuser.png)

* 通过Android WilddogAuth SDK生成

```
     wilddogAuth.createUserWithEmailAndPassword("123456789@qq.com","45678901").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
	@Override
	public void onComplete(Task<AuthResult> var1) {
		if(var1.isSuccessful()){
		Log.d("result","Create user success")
		}
		else{
		Log.d("result","reason:"+var1.getException().toString())
		    }
	   }
	}	 
```
3.已存在的用户使用 `signInWithEmailAndPassword()` 方法登录:

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

4.你可以使用 `signOut()` 方法退出当前登录用户:

```
mAuth.signOut();
```

野狗还提供了匿名认证、第三方认证等其他认证方式，详细信息请见 [完整指南](/guide/auth/core/concept.html) 和  [API 文档](/api/auth/android.html)。