title: WilddogAuth.AuthStateListener
---
当身份验证状态有一个变化的时候调用。使用`addAuthStateListener(AuthStateListener)`和`removeAuthStateListener(AuthStateListener)`来注册或者注销监听。

## 方法

### onAuthStateChanged（wilddogAuth）

**定义**

```java
 void onAuthStateChanged( WilddogAuth wilddogAuth);
```

**说明**
 当状态发生变化的时候，这个方法在UI线程中调用：

* 注册监听的时候
* 用户登录的时候
* 用户登出的时候
* 当前用户改变的时候
* 当前用户的token改变的时候


**参数**


参数名 | 描述
--- | ---
wilddogAuth | 当前 WilddogAuth 对象，用来进行 Auth 相关操作。

</br>

--- 