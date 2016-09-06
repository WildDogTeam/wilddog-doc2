title: 快速入门
---

快速入门可以让你快速掌握 Wilddog 身份认证的基本用法。

## 创建应用

快速入门之前，需要先创建你的应用，如果你还不知道如何创建应用，请先阅读[控制面板-创建应用](/console/creat.html)

现在我们创建了一个新的应用，地址为 **gzztztestapp.wilddogio.com**。这个地址是该应用的根节点。

<img src="/images/testApp.jpeg" alt="testApp" width="300">

## 引入 SDK

首先应该在页面中引入我们的 Wilddog Auth SDK
很简单，只需要在你的页面中加入一行 javascript 标签。

```javascript
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-auth.js"></script>
```

## 创建 Wilddog 引用

引入 Wilddog Auth SDK 之后我们需要初始化 Wilddog 应用。

```javascript
var config = {
  authDomain: "gzztztestapp.wilddog.com",
  syncURL: "https://gzztztestapp.wilddogio.com"
};
wilddog.initializeApp(config, "DEFAULT");
```

## 使用匿名方式登录

1. 去野狗控制面板中打开匿名登录开关：
![](/images/openanonymous.png)
2. 调用 `signInAnonymously()` 方法：
```js
wilddog.auth().signInAnonymously().then(function(res){
	console.log(res);
}).catch(function (error) {
      // Handle Errors here.
      console.log(error);
      // ...
});
```
如果登录成功，你可以在 `wilddog.auth().currentUser` 对象中获取登录用户的信息。
```js
var isAnonymous = user.anonymous; 
var uid = user.uid;
```
以上就是匿名登录的方式，我们还提供了各种登录方式。具体请看下面对应的文档。
