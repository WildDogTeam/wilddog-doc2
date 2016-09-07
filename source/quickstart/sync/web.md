
title: 快速入门
---

快速起步可以让你快速掌握 Wilddog 实时数据同步的基本用法。如果你要用于实际开发，还需要参照 [完整指南](/guide/sync/web/structure-data.html) 以及 [API 文档](/guide/sync/rules/introduce.html)了解更多，并且还需要掌握使用 [规则表达式](/guide/sync/rules/introduce.html) 来保证你的数据安全。

我们通过编写一个简单的天气应用例子来了解实时数据同步是如何使用的。
通过这个例子，你将会学到：

- 向数据库中保存数据。
- 读取并且实时监听数据。


## 1. 创建应用

快速起步之前，需要先创建你的应用，如果你还不知道如何创建应用，请先阅读[控制面板-创建应用](/console/creat.html)

现在我们创建了一个新的应用，地址为 **gzztztestapp.wilddogio.com**。这个地址是该应用的根节点。

<img src="/images/testApp.jpeg" alt="testApp" width="300">

## 2. 引入 SDK
首先应该在页面中引入我们的 Wilddog SDK
很简单，只需要在你的页面中加入一行 javascript 标签。

```html
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-sync.js" ></script>
```

## 3. 创建Wilddog 引用
引入 Wilddog SDK 之后我们需要创建 Wilddog引用。有了 Wilddog 引用我们才能对数据进行操作。
让我们来创建一个 Wilddog引用对象。

```javascript
var config = {
  authDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
```

这样就创建完成了。ref 就是我们的 Wilddog 引用，当然，你可以换成你想要的命名。

创建对象的时候，需要传入数据库的数据路径。上面的代码定位在数据库的根节点，
你也可以传入更具体的数据路径，Url与数据节点的关系如下图所示：

![](http://7u2r36.com1.z0.glb.clouddn.com/16-8-18/2316950.jpg)

比如我要在成都的天气下传入数据，那么我可以将输入的 Url定位为成都的 weather 节点下

```javascript
var childRef = ref.child("/成都/weather");
```

现在我们操作的数据都在 Weather 节点下了。

## 4. 保存数据

创建了 Wilddog 对象之后，我们就能利用它对数据进行操作了。让我们先从写入数据开始。
我们可以通过 Wilddog 提供的 set() 方法，写入**JSON**数据。

注意wilddog 的数据是以 [JSON](http://json.org) 格式存储的，并没有传统关系型数据库中的表和记录的概念。 

**没有的节点将会新增，重复节点下的数据会覆盖。**

假设我们要在数据库中的根节点下存入 成都的天气 信息：

```javascript
ref.set({
"city" : "成都",
"weather" : "晴天"
});
```

信息就直接存入数据库了，非常方便。

如果保存不成功的话，有可能是因为你更改了**规则表达式**。有关规则表达式的内容，我们会在后面提到。

**删除数据**和**更新数据**等更多操作数据的用法于此类似，不过我们先不在此介绍，稍后可以在开发者指南或者 API 文档中查看具体用法。



## 5. 读取与监听数据
我们上一步已经把 成都的天气 的信息存入了数据库，那么我们就可以使用 on() 函数来读取存入的信息。
例如我们要知道成都的天气信息，我们通过 on() 来读取 weather 字段：

```javascript
ref.on("value", function(snapshot) {
console.log(snapshot.val());
}
```


这样就能读出根节点下的所有数据了,snapshot.val()函数返回的就是取出的 json 数据。

如果你想读取某个节点的数据，比如只想看成都的天气，那么我们只需要在引用对象与 on() 之间后面加上 child(节点名称),就能够返回该节点的所有数据。

```javascript
ref.child("成都").on("value", function(snapshot) {
console.log(snapshot.val());
}
```

这样就能够从数据库中取出 weather 的数据了，并且保持监听着数据的变化，当存储的数据更改的时候，不需要重新读取数据，终端的数据会自动更新！

你可以试试下面的示例，一旦你修改了wilddog 中的数据，那么页面上显示的数据会随之变化。

#### 读取与监听数据


上边这个例子中，使用 on()函数读取数据，value 这个事件会在初次读取到数据的时候被触发一次，并且此后每当数据发生改变的时候都会被触发。如果你在数据库中修改了数据，其他平台的数据会同步更新。

![](/images/listen.gif)

读取数据是通过绑定回调函数来实现的，我们使用 on()函数读取数据的时候使用了一个回调函数，回调函数的参数是一个 snapshot 对象类型，调用它的 val() 函数能够读取到返回的数据。

如果你只想读取一次，以后每次数据发生变化的时候将不再同步，那么你可以使用once()函数替代on()函数。



## 6. 保护数据安全

到这一步，你已经可以完成基本的数据操作了，但是如果要将你的应用用于生产环境，你还需要注意应用的安全问题。每一个新创建的应用权限初始权限都为 **所有人都可以读写**，用于实际生产环境将会非常危险。

我们提供了强大的规则表达式来保障你的应用安全。规则表达式能够实现：

- 读写权限设置
- 用户授权
- 数据校验
- 提高查询效率

结合野狗提供的[身份认证服务](/overview/auth.html)，你可以实现多种认证方式，极大地提高你的应用安全。

你可以在应用中的实时数据同步配置规则表达式。虽然规则表达式配置灵活简单，但是要完全利用规则表达式的功能还需要一定的学习，你可以在[规则表达式简介](/guide/sync/rules/introduce.html)中开始学习如何配置规则表达式。

![](http://ocpo37x5v.bkt.clouddn.com/2016-09-01-%E8%A7%84%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)











