title: 用户集成
---

Wilddog IM SDK 不开发独立的用户系统，需要用户集成自己的用户系统。



## 获取 Token

Wilddog IM SDK 不开发独立的用户系统，为了集成 APP 已有的用户，我们通过自定义 Token 的方式。
开发者需要将 APP 已有的用户 ID、用户名称、用户头像等信息结合 Wilddog 的超级密钥生成 [JWT Token](https://jwt.io/) 登录需要的 Wilddog Token。
Wilddog Token 需要通过 APP Server 来获取。关于更多使用 APP Server 生成 Custom Token 以及认证 Wilddog ID Token 等信息请参考 [生成 Custom Token](https://docs.wilddog.com/guide/auth/server/server.html#创建Custom-Token)。

## 登录

获取 Token 后，调用登录接口就可以正常收发消息了。登录为异步过程，通过回调函数返回是否成功，成功后方能进行后续操作。

```java
// 用 Wilddog Auth Token 登录
String token = "customToken"
client.signIn(token, new WildValueCallBack<WilddogUser>() {
      @Override
      public void onSuccess(WilddogUser wilddogUser) {
           Log.d("result",wilddogUser.toString())
      }

       @Override
       public void onFailed(int code, String des) {
             Log.e("result",des);
       }
});

```

## 退出登录

当用户需要主动登出或进行用户切换的时候，需要调用登出操作：

```java
client.signOut();
```
	
## 获取当前用户

通过 WilddogIMClient 成员方法 `getCurrentUser()` 能获取当前登录用户：

```java
client.getCurrentUser();

```

## 设置登录监听

通过 WDGIMClient 的监听方法 `addMessageListener（）` 和 `addGroupChangeListener（）` 可以对登录状态进行监听。

 
 
 
 