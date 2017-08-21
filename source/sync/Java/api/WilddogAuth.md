title: WilddogAuth
---
WilddogAuth SDK 入口对象。进行登录认证操作。

首先通过调用 getInstance()获取一个WilddogAuth实例对象。
接着，可以使用以下方法进行用户登录认证：
    
*      signInWithCustomToken(token)

最后，调用 `getCurrentUser()`获取包含用户信息的WilddogUser对象.

## 方法


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

参数名 | 描述
--- | ---
wilddogapp | 包含特定appId的WilddogApp实例。

**返回值**

WilddogAuth 对象。
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
  

**参数**

参数名 | 描述
--- | ---
token | 用户自定义的Wilddog Custom Token。

**返回值**

`Task`包含操作结果的任务对象。
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