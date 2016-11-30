title: 用户集成
---

本篇文档介绍如何集成开发者的已有用户系统。


## 获取 Token

Wilddog IM 使用 customToken 的方式来集成开发者的已有用户系统。野狗提供 [Server SDK](/guide/auth/server/server.html) 生成 customToken，开发者需要提供用户的 ID、昵称、头像。
具体流程如下：
1. 客户端向开发者服务器请求 customToken。
2. 开发者服务器使用野狗 Server SDK 生成 customToken 返回给客户端。
3. 客户端使用 customToken 登录 Wilddog IM 服务。

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  你可以在 `IM 控制面板`-`接口测试` 中手动生成 Token 用于测试。
</blockquote>

## 登录

`signIn()` 方法用于将用户登录 Wilddog IM 服务：

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
`signOut()` 方法用于用户退出登录 Wilddog IM 服务：

```java
client.signOut();
```
	
## 获取当前用户

`WilddogIMClient` 成员方法 `getCurrentUser()` 用于获取当前登录用户：

```java
client.getCurrentUser();

```

## 设置登录监听

`WilddogIMClient` 的代理方法 `addAuthStateListener()` 用于监听登录状态;

```java
client.addAuthStateListener(
    new WilddogIMClient.WilddogIMAuthStateListener() {
         @Override
         public void onAuthStateChanged(WilddogUser user) {
              if(user==null){
              // 为空
              }else {
              //登录成功
              Log.d("result",user.getUid());
              }
         }
});
```
 
 
 