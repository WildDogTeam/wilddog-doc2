
title: 快速入门
---

我们通过编写一个简单的天气应用例子来了解实时数据同步是如何使用的。

## 1. 创建应用

你首先需要在控制面板中创建应用，如果你还不知道如何创建应用，请先阅读[控制面板-创建应用](/console/creat.html)

创建好的应用如下图，地址为 **yourapp.wilddogio.com**。这个地址是该应用的根节点位置，“yourapp” 是该应用的 appId.

<img src="/images/demoapp.png" alt="yourApp" width="300">

## 2. 引入 SDK
首先应该在页面中引入我们的 Wilddog SDK，只需要在你的页面中加入一行 javascript 标签。

```javascript
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-sync.js" ></script>
```

## 3. 创建Wilddog 引用

引入 Wilddog SDK 之后我们需要创建 Wilddog引用，有了 Wilddog 引用才能对数据进行操作。
创建 Wilddog引用对象:

```javascript
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
```

ref 就是我们的 Wilddog 引用，你也可以换成你想要的命名。syncURL是你需要定位的节点所在的路径。

上面的路径定位在数据库的根节点，你也可以传入更具体的数据路径，路径与数据节点的关系如下图所示：

<img src="/images/routeapp.jpg" alt="yourApp" width="300">

比如我们想定位 Shanghai 的天气，那么我们可以将输入的 URL 定位在 Weather 的 Shanghai 节点下

```javascript
var childRef = ref.child("/weather/shanghai");
```



## 4. 保存数据

创建了 Wilddog 对象之后，就能利用它对数据进行操作了。让我们先从写入数据开始。
我们可以通过 Wilddog 提供的 set() 方法，写入 **JSON** 数据。wilddog 的数据是以 [JSON](http://json.org) 格式存储的，并没有传统关系型数据库中的表和记录的概念。 

**没有的节点将会新增，重复节点下的数据会覆盖。**

假设我们要存入北京和上海的天气信息：

- **可以定位在根节点下。**

``` javascript
syncURL : https://yourapp.wilddogio.com
```

存入整个结构的 JSON 数据

```javascript
ref.set({
  "weather":{
    "beijing" : "rain",
    "shanghai" : "sunny"    
  }
});
```

- **也可以定位在 weather 节点下**

```javascript
syncURL : https://yourapp.wilddogio.com/weather
```

只需要存入城市的天气信息

```javascript
ref.set({
   "beijing" : "rain",
   "shanghai" : "sunny"    
});
```

 这两者的存入的内容是一样的：

 <img src="/images/saveapp.png" alt="yourApp" width="300">

**删除数据**和**更新数据**等更多操作数据的用法于此类似，不过我们先不在此介绍，稍后你可以在开发者指南或者 API 文档中查看具体用法。

## 5. 读取与监听数据
你可以使用 on() 函数来读取并监听存入的信息。
例如我们要想获取天气信息，我们通过 on() 来读取：

```javascript
ref.on("value", function(snapshot) {
console.log(snapshot.val());
}
```


这样就能读出该节点下的所有数据。如果你想读取某个子节点的数据，比如只想看上海的天气，那么我们只需要在引用对象后面加上 child(节点名称)，就能够返回该节点的所有数据。

```javascript
ref.child("shanghai").on("value", function(snapshot) {
console.log(snapshot.val());
}
```

读取数据是通过绑定回调函数来实现的，我们使用 on()函数读取数据的时候使用了一个回调函数，回调函数的参数是一个 snapshot 对象类型，调用它的 val() 函数能够读取到返回的数据。

取出的数据会一直保持同步，当存储的数据更改的时候，不需要重新读取数据，终端的数据会自动更新。如果你只想读取一次，不监听数据变化，那么你可以使用once()函数替代on()函数。



## 6. 保护数据安全

到这一步，你已经可以完成基本的数据操作了，但是如果要将你的应用用于生产环境，你还需要注意应用的安全问题。每一个新创建的应用权限初始权限都为 **所有人都可以读写**，用于实际生产环境将会非常危险。

我们提供了强大的规则表达式来保障你的应用安全，规则表达式能够实现：

- 读写权限设置
- 用户授权
- 数据校验
- 提高查询效率

你可以在应用里的**实时数据同步—读写权限**中配置规则表达式。

![](http://ocpo37x5v.bkt.clouddn.com/2016-09-01-%E8%A7%84%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)











