
title:  快速入门
---

你可以通过邮箱登录的例子来了解身份认证的基本用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li>支持 Android Studio 1.4 以上或者 Eclipse ADT 15.0.0 以上版本</li>
        <li>支持 JDK 7.0 以上版本</li>
        <li>支持 Android 手机系统 4.0.3以上版本，即 Android SDK 15 以上版本</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考  [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

SDK 的安装方式有两种，你可以任选其一：

- **使用 Maven **

<figure class="highlight xml"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">dependency</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">groupId</span>&gt;</span>com.wilddog.client<span class="tag">&lt;/<span class="name">groupId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">artifactId</span>&gt;</span>wilddog-auth-android<span class="tag">&lt;/<span class="name">artifactId</span>&gt;</span></div><div class="line">    <span class="tag">&lt;<span class="name">version</span>&gt;</span><span class="android-auth-version"></span><span class="tag">&lt;/<span class="name">version</span>&gt;</span></div><div class="line"><span class="tag">&lt;/<span class="name">dependency</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

- **使用 Gradle **

在build.gradle中添加：

<figure class="highlight java"><table><tbody><tr><td class="code"><pre><div class="line">dependencies {</div><div class="line">    compile <span class="string">&apos;com.wilddog.client:wilddog-auth-android:<span class="android-auth-version"></span>&apos;</span></div><div class="line">}</div></pre></td></tr></tbody></table></figure>

如果出现文件重复导致的编译错误，可以选择在build.grade中添加packagingOptions：

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

## 4. 创建 Wilddog Auth 实例

使用 Wilddog Auth SDK 之前，需要先创建实例：

```java
WilddogOptions options = new WilddogOptions.Builder().setSyncUrl("https://<wilddog appId>.wilddogio.com").build();
WilddogApp.initializeApp(this, options);
WilddogAuth wilddogAuth = WilddogAuth.getInstance();
```


## 5. 使用邮箱认证

**1.开启邮箱登录**

在 控制面板—身份认证—登录方式 中开启邮箱登录功能：

![](/images/openemail.png)

**2.创建新用户**

```java
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
**3.邮箱密码登录**

`signInWithEmailAndPassword()` 方法用于已创建的用户登录：

```java
wildoogAuth.signInWithEmailAndPassword("123456789@qq.com","45678901").addOnCompleteListener(new OnCompleteListener<AuthResult>() {
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

## 6. 退出登录

`signOut()` 方法用于退出当前登录用户：

```
wilddogAuth.signOut();
```

Wilddog Auth 更多使用方式，请参考 [完整指南](/guide/auth/core/concept.html) 和  [API 文档](/api/auth/android/AuthCredential.html)。