title: WilddogAuth
---
WilddogAuth SDK 入口对象。进行登录认证操作。

首先通过调用 getInstance()获取一个WilddogAuth实例对象。
接着，可以使用一下方法进行用户登录认证：
    
*      createUserWithEmailAndPassword(email, password)
*      signInWithEmailAndPassword(email, password)
*      signInWithCredential(authCredential)
*      signInAnonymously()
*      signInWithCustomToken(token)

最后，调用 `getCurrentUser()`获取包含用户信息的WilddogUser对象.

## 方法

### addAuthStateListener (listener)

**定义**

```java
 public void addAuthStateListener (WilddogAuth.AuthStateListener listener)
```

**说明**

注册一个认证状态的监听。一个WilddogAuth对象可以设置多个监听对象，也可以为不同的WilddogAuth添加监听对象。
 
   当以下情况出现，会在UI线程中触发回调：
 
   * 在监听对象注册的时候
   * 在用户登录认证的时候
   * 在当前用户登出的时候
   * 在当前用户改变的时候
   * 在当前用户的Wilddog Id token 改变的时候

 推荐的做法总是监听注销事件，因为你可能要提示用户再次登录并且可能限制用户获取信息或者操作.
    
可以使用`removeAuthStateListener(AuthStateListener)`注销监听.

**参数**


参数名 | 描述|
--- | ---|
listener | 监听用户状态的AuthStateListener 实例。|
</br>

---

### createUserWithEmailAndPassword (email，password)

**定义**

```java
  public Task<AuthResult> createUserWithEmailAndPassword (String email, String password)  
```

**说明**

用给定的邮箱和密码创建一个用户账号，如果成功，这个用户也将登录成功。
  
然后可以通过`getCurrentUser()`访问用户信息和进行用户操作.
  
一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法

**参数**

参数名 | 描述|
--- | ---|
email | 要创建用户的邮箱地址。|
password | 要创建用户的密码。|
</br>
---  
### fetchProvidersForEmail (email)

**定义**

```java
public Task<ProviderQueryResult> fetchProvidersForEmail (String email)
```

**说明**

通过绑定的邮箱获取当前用户的所有登录方式。

**参数**

参数名 | 描述|
--- | ---|
email | 用户信息中设置的邮箱地址。|
</br>
---  
### getCurrentUser ()

**定义**

```java
public WilddogUser getCurrentUser ()
```

**说明**

如果有用户认证登录返回登录用户，如果没有登录，则返回为空。

可以通过 `getCurrentUser() != null` 来判断当前是否有用户登录

**参数**

参数名 | 描述|
--- | ---|
email | 用户信息中设置的邮箱地址。|

**返回值**

WilddogUser 对象。
</br>

--- 

### getInstance ()

**定义**

```java
public static WilddogAuth getInstance ()
```

**说明**

返回初始化之后，可以用本方法获取当前WilddogAuth实例对象


**返回值**

WilddogAuth 对象。
</br>

---  
### getInstance(wilddogapp)

**定义**

```java
public static WilddogAuth getInstance(WilddogApp wilddogapp)
```

**说明**

返回制定的WilddogAuth 实例对象。

**参数**

参数名 | 描述|
--- | ---|
wilddogapp | 包含特定appId的WilddogApp实例。|

**返回值**

WilddogAuth 对象。
</br>

--- 
### removeAuthStateListener(listener)

**定义**

```java
public void removeAuthStateListener (WilddogAuth.AuthStateListener listener)
```

**说明**

注销认证状态的监听

**参数**

参数名 | 描述|
--- | ---|
listener | 之前已经注册的监听对象。|
</br>

--- 
### sendPasswordResetEmail(email)

**定义**

```java
public Task<Void> sendPasswordResetEmail (String email)
```

**说明**

给当前应用中现有的绑定当前email的用户发送密码重置邮件.

**参数**

参数名 | 描述|
--- | ---|
email | 要重置密码的邮箱地址。|
</br>

--- 
### signInAnonymously ()

**定义**

```java
public Task<AuthResult> signInAnonymously ()
```

**说明**

使用匿名方法登录，不需要凭据，可以绑定其他认证方式.
   
这个操作将在Wilddog创建一个匿名的用户账号，其中通过`getCurrentUser()`获取用户信息包含uid。
   
一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.

</br>

--- 
### signInWithCredential (credential)

**定义**

```java
public Task<AuthResult> signInWithCredential (AuthCredential credential)
```

**说明**

通过给定的`AuthCredential`对象进行相应的认证登录。其中包含QQ，微信，新浪微博和密码认证登录。第三方第一次登录会创建用户账号。

所有`AuthCredential`都会创建一个用户账号。

**参数**

参数名 | 描述|
--- | ---|
credential | 要登录的特定的AuthRedential。|
</br>

---
### signInWithCustomToken(token)

**定义**

```java
public Task<AuthResult> signInWithCustomToken (String token)
```

**说明**

通过用户自定义的token进行用户认证。

从用户服务器首先获取到Wilddog Custom Token,然后登录到Wilddog服务器，进行数据操作，可以通过getCurrentUser获取当前登录认证用户信息。
  
一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
  
阅读[自定义Token](/guide/auth/core/concept.html#身份认证令牌)

**参数**

参数名 | 描述|
--- | ---|
token | 用户自定义的Wilddog Custom Token。|
</br>

--- 
### signInWithEmailAndPassword (email，password)

**定义**

```java
public Task<AuthResult> signInWithEmailAndPassword (String email, String password)
```

**说明**

通过邮箱和密码进行登录认证。

可以通过getCurrentUser获取当前登录认证用户信息。

一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.

这个方法和`signInWithCredential（）`的`EmailAuthCredential`登录认证方式是等效的。

**参数**

参数名 | 描述|
--- | ---|
email | 用户用来登录的邮箱地址。|
password | 用户用来登录的密码。|
</br>

---
### signOut ()

**定义**

```java
public void signOut ()
```

**说明**

登出当前用户，清除登录数据

一旦登出成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
</br>

---  