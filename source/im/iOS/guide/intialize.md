title: 初始化
---

本篇文档介绍如何初始化 Wilddog IM SDK。

初始化分为以下两个步骤：
1. 初始化 SDK
2. 监听连接状态

## 初始化 SDK

初始化 SDK 只需要在 Auth 登录完成之后，设置 WDGIM 的代理即可。

```objectivec
[[WDGIM im] setDelegate:self];

```

## 监听连接状态

`- wilddogIMDidConnect:` 和 `- wilddogIMDidDisconnect:` 代理方法用于监听 SDK 与服务器连接状况：
```objectivec
- (void)wilddogIMDidConnect:(nonnull WDGIM *)im {
	// 与服务器建立连接。
}

- (void)wilddogIMDidDisconnect:(nonnull WDGIM *)im {
	// 与服务器断开连接。
}
  
```


