title: 初始化
---

使用 Wilddog IM 首先需要初始化配置，初始化之后才可以进行创建对话、收发消息等一些操作。

* 1.初始化 SDK
* 2.监听连接状态
* 3.登录和监听用户登录状态

### 初始化 SDK
野狗 IM SDK 的主要入口为 WilddogIMClient，一切操作都从此入口开始。SDK 操作第一步需要创建 WilddogIMClient。例如:

```java
WilddogIMClient client=client.newInstance(this,"appId",null);

```
	
	

### 监听连接状态

这个方法可以监听 SDK 与 Wilddog的连接和断开状态。需要注意的是，WilddogIMClient 因某种原因导致的连接错误或者连接中断，SDK 内部都有相应的容错机制和重连机制，用户无需关心。

```java
client.connect();
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
	
### 登录和监听用户登录状态

通过 WilddogIMClient 中 signIn() 方法既可以进行登录，还可以监听用户的登录状态。

```java
 String token = "customtoken";
 client.signIn(token, new WildValueCallBack<WilddogUser>() {
        @Override
        public void onSuccess(WilddogUser wilddogUser) {
                if(wilddogUser==null){
                    // 为空
                   }else {
                    //登录成功
                   Log.d("result",user.getUid());
                        }
                    }

                @Override
                public void onFailed(int code, String des) {
                     Log.e("result",des);
                  }
             });
```


    
	
登录之后，就可以在 `  client.addMessageListener(listener)` 和 `client.addGroupChangeListener(groupChangeListener)` 协议方法中，接收到聊天消息和讨论组系统通知。
