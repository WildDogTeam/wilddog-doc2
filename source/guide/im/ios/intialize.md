title: 初始化
---

本篇文档介绍如何初始化 Wilddog IM SDK。

初始化分为以下三个步骤：
1. 初始化 SDK
2. 监听连接状态

## 初始化 SDK

`- clientWithAppID: ` 方法用于初始化 SDK：

```objectivec
[WDGIMClient clientWithAppID:@"your appID" delegate:self];

```

## 监听连接状态

`- wilddogIMClientDidConnect:` 和 `- wilddogIMClientDidDisconnect:` 代理方法用于监听 SDK 与服务器连接状况：
```objectivec
- (void)wilddogIMClientDidConnect:(nonnull WDGIMClient *)client {
	// 与服务器建立连接。
}

- (void)wilddogIMClientDidDisconnect:(nonnull WDGIMClient *)client {
	// 与服务器断开连接。
}
  
```


