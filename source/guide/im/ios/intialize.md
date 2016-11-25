
title: 初始化
---

本篇文档介绍使用 `WDGIMClient` 的方法来初始化 Wilddog IM SDK。

### 初始化 SDK

`- clientWithAppID: ` 方法用于初始化 SDK。

例如:

```objectivec
[WDGIMClient clientWithAppID:@"your appID" delegate:self];

```

### 监听连接状态

`- wilddogIMClientDidConnect:` 和 `- wilddogIMClientDidDisconnect:` 代理方法可以用于监听 SDK 与服务器连接状况。

例如：
```objectivec
- (void)wilddogIMClientDidConnect:(nonnull WDGIMClient *)client {
	// 与服务器建立连接。
}

- (void)wilddogIMClientDidDisconnect:(nonnull WDGIMClient *)client {
	// 与服务器断开连接。
}
  
```


