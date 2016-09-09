# 新版文档

[![Build Status](https://travis-ci.org/WildDogTeam/wilddog-doc2.svg?branch=master)](https://travis-ci.org/WildDogTeam/wilddog-doc2)

* 正式版文档 https://docs.wilddog.com
* 预览版文档 https://wilddogteam.github.io

注意：预览版文档对应于当前项目的master分支，每当master有更新，预览版文档会自动更新（延迟2分钟以内）不要直接编辑[预览版的github](https://github.com/WildDogTeam/WildDogTeam.github.io)

## 简介

野狗在2016年 Q3 发布了 SDK 2.0。
这次的改版目标是为了开始新产品的发布以及将 API 设计的更加容易使用。

几个重大的改进:

1.	原实时数据库 Database 更名为实时数据同步 Sync。这更能表达 Sync 的原理和作用。
2.	Auth 与 Sync 分离。逐渐 Sync 将成为野狗的核心实时通信引擎。Auth 独立后将会增加例如短信验证码等功能。

如有意见和建议，可以联系 xudanyang@wilddog.com，或者直接提交 issues。

## 本地使用

本文档使用的展示模版工具为 **[hexo](https://hexo.io/)** 。

要有 node 环境

具体步骤：

1. clone 到本地
2. $ npm install hexo-cli -g
3. $ cd wilddog-doc2
4. $ npm install 
5. $ hexo server   (或自行指定端口: hexo server -p 3003)
6. 浏览器访问：  http://localhost:4000/ (默认端口为 4000)


