title: 安装 SDK
---

以下文档将详细说明开发者在开发时可能涉及的常见情形，主要包括安装 SDK，建立会话、管理其他参与者、加入会话相关。

Wilddog Video SDK 的实现依赖于 Wilddog Sync SDK 和 Wilddog Auth SDK，所以在使用 Widdog Video SDK 前需要引入 Sync/Auth SDK。

通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Wilddog Sync 和 Auth SDK。

## 使用 CocoaPods 安装 SDK

在 Podfile 文件中添加以下语句，同时添加 Sync, Auth 和 Video SDK。

```shell
    pod 'Wilddog/Sync'
    pod 'Wilddog/Auth'
    pod 'WilddogVideo'
```

然后运行 `pod install` 将上述依赖安装到你的工程。
