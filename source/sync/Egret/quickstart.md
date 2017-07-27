
title: 快速入门
---

本篇文档介绍 Sync 引入 Egret 的方法。

<div class="env">

    <p class="env-title">环境准备</p>
    <ul>
        <li> 支持 Html 5 的主流浏览器环境 </li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 下载 Wilddog-Egret 项目

[下载该项目](https://github.com/WildDogTeam/wilddog-egret/archive/master.zip) 到本地某个路径下,下文用 `path-to-wildegret` 代替这个路径。


## 3. 执行 egret build
在此项目中执行 egret build，可以看到会在 bin 下生成几个文件。


## 4. 修改目标项目
在需要引入野狗的 Egret 项目（即目标项目）中修改`egretProperties.json`，在 modules 下增加一项，示例如下：

```
{
    "name":"wilddog",
    "path":"<path-to-wildegret>"
}

```


然后把 `wilddog.d.ts` 复制到目标项目的 `src`目录下，并稍做修改: 如果最后一行是 `export = wilddog; `把这行注释或删除。

<blockquote class="notice">
  <p><strong>提示：</strong></p>

此处删除`export = wilddog; `的原因为白鹭不支持 commonjs 以及 es6 模块化的语法。

</blockquote>

## 4. 使用野狗进行数据同步
示例如下：

```
//Main.ts
//...
wilddog.initializeApp({
    syncURL: "https://<appid>.wilddogio.com",
    authDomain:"<appid>.wilddog.com"
})
wilddog.sync().ref().on('child_added',function(snapshot){
    console.log(snapshot.val())
})

//...
```



## 5.数据安全

你可以在 Sync 中使用规则表达式进行数据访问权限的控制。规则表达式可以实现以下功能：

- 数据访问权限控制
- 用户访问权限控制
- 数据格式校验
- 数据索引

规则表达式的具体使用，请参考 [安全性与规则](/sync/Egret/rules/introduce.html)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>

初始配置下，所有人都能读写你的应用数据，请及时在 实时通信引擎-读写权限 中更改规则表达式。

</blockquote>

## 6.更多使用

- 了解 Sync 更多使用方式，请参考 [完整指南](/sync/Egret/guide/concept.html) 和 [API 文档](/sync/Egret/api/App.html)。
- 了解如何设计数据结构，请参考 [组织数据](/sync/Egret/guide/bestpractice/structure-data.html)。






　
