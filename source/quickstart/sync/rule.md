
title: 规则表达式快速入门
---

本篇文档介绍 Sync 中的规则表达式，即基于资源数据访问控制列表(ACL)进行数据访问授权。访问控制列表(ACL)使用 JSON 格式的策略描述语言。这种方式使得数据授权灵活性高且扩展性强。



## 1. 配置规则表达式

你可以在 **控制面板－实时数据同步-读写权限** 中配置规则表达式。

设置读写权限

## 2. 进入规则表达式面板

首先，你需要进入规则表达式面板。请参考 [控制面板－管理应用—配置规则表达式]()。
![](/images/rule-overview.png)

## 3. 设置读写权限

通过 `.read` `.write` 你可以设置数据中任意节点的可读和可写性。

例如，在评论墙示例中，任何用户都可以查看评论，但是用户登录后才能写入评论。
现数据结构如下图:
 <img src="/images/saveapp.png" alt="yourApp" width="400">
根据上述数据结构配置规则表达式:允许所有请求读取 messageboard 节点数据,只允许用户登录后写入 messageboard 节点数据。

```javascript
{
  "rules": {
    "messageboard": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## 4.检验规则表达式

最后，你可以通过模拟器检验规则表达式是否有效，再正式使用。
![](/images/simulator.png)

## 5.更多使用

关于 Wilddog Sync 规则表达式的更多使用，请参考[完整指南](guide/rules/introduce.md)。