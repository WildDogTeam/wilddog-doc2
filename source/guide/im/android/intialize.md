title: 初始化
---
本篇文档介绍如何初始化 Wilddog IM SDK。

初始化分为以下两个步骤：
1. 初始化 SDK
2. 监听连接状态

### 初始化 SDK

`newInstance(this,"appId")` 方法用于初始化 SDK：

```java
WilddogIMClient client=client.newInstance(this,"appId");

```
	
	

### 监听连接状态

`addConnectionListener(WilddogIMConnectionListener listener)` 代理方法可以用于监听 SDK 与服务器连接状况：

```java

client.addConnectionListener(new  WilddogIMClient.WilddogIMConnectionListener(){
    @Override
    public void onConnectionConnected(WilddogIMClient client) {
    Log.d("connectionListener","onConnectionConnected");
    }

    @Override
    public void onConnectionDisconnected(WilddogIMClient client) {
    Log.d("connectionListener","onConnectionDisconnected");
    }
} );

```
	

