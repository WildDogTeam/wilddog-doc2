
title: 快速入门
---

本篇文档介绍 Auth 引入 Egret 的方法。

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


## 5.更多使用

- 了解更多使用方式，请参考 [完整指南](/guide/auth/Egret/manageuser.html) 和 [API 文档](/api/auth/Egret/App.html)。





　
