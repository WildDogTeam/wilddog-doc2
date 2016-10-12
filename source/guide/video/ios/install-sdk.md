title: 安装 SDK
---

本篇文档介绍如何安装 SDK。

Wilddog Video SDK 的实现依赖于 Wilddog Sync SDK 和 Wilddog Auth SDK，所以在使用 Widdog Video SDK 前需要引入 Sync 和 Auth SDK。

## 使用 CocoaPods 安装 SDK
通过 [Cocoapods](https://cocoapods.org/) 安装 Video iOS SDK 以及其依赖的 Wilddog Sync 和 Auth SDK。

在 Podfile 文件中添加以下语句，同时添加 Sync, Auth 和 Video SDK。

```ruby
pod 'WilddogVideo'
```

然后运行 `pod install` 将上述依赖安装到你的工程。
