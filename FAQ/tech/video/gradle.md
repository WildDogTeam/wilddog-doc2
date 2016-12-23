title: 使用 Android Studio 导入快速入门时，为什么总在 Gradle build 时卡顿在界面上？
tag: 实时视频通话
---
出现这个现象是因为被导入项目的 Gradle 构建工具版本与当前使用的版本不一致。网络原因使得 AS 在后台下载 Gradle 速度较慢，导致 AS 出现假死的现象。

实际上 AS 一直在后台下载 Gradle 工具，通过 Ubuntu 的终端可以看到下载的情况。你可以通过两种方式来解决该问题：

- 手动下载 Gradle 构建工具;
- 使用当前可用的 Gradle 构建工具。

完整方案请 [参考本篇文档](https://github.com/WildDogTeam/wilddog-doc2/blob/master/Android%20Studio%20Gradle%20%E9%85%8D%E7%BD%AE%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.md)。