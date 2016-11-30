
title: 快速入门
---

你可以通过一个简单的评论墙示例来快速了解规则表达式的用法。

## 1. 进入规则表达式面板

首先，你需要进入规则表达式面板。请参考 [控制面板－管理应用—配置规则表达式](/console/administer.html#配置规则表达式)。


![](/images/rule-overview.png)

## 2. 设置读写权限

通过 [.read](/api/sync/rule.html#read) [.write](/api/sync/rule.html#write) 你可以设置数据中任意节点的可读和可写性。

例如，在评论墙示例中，任何用户都可以查看评论，但是用户登录后才能写入评论。现数据结构如下图:

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

## 3.检验规则表达式

最后，你可以通过模拟器检验规则表达式是否有效，再正式使用。


![](/images/simulator.png)

## 4.更多使用

关于 Sync 规则表达式的更多使用，请参考 [完整指南](/guide/sync/rules/introduce.html)。