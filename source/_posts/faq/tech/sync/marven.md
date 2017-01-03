title: 为什么野狗 SDK 的 Maven 中心仓库下载的 jar 包集成到 eclipse 项目会报错？
tags:
- 实时数据同步
---
因为直接从 Maven 中心仓库下载 jar 包仅仅包含野狗 SDK 的核心包，相关的依赖包并没有下载，所以会报错。建议通过在项目中配置的方式安装野狗的 Android SDK，这样会把相关的依赖包都下载好。
