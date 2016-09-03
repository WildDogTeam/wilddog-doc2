title: 实战教程
---

本部分内容将给出一些详尽的示例教程。一些基础教程如创建应用、读写数据这里不再重复，不了解的话请先阅读[快速入门](/quickstart/sync/web.html)。

# 弹幕

## 示例说明
示例的最终的展示效果如下：
![](/images/display.jpg)

与平常见到的弹幕一样，可多端互动。使用 Wilddog SDK，百余行代码即可完全实现。可见 Wilddog 在实时领域的简单与强大。

## 具体步骤

### 引入 Wilddog js SDK

```js
<script type="text/javascript" src="https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-sync.js"></script>
```
### “说点什么” 与 “发射”

这里用到 Wilddog 写入数据的一个 API [push()](/guide/sync/web/save-data.html#追加新节点), 它用来在当前节点下生成随机子节点，以保证键的不重复和有序。
```js
// 创建数据库引用。最好自己创建一个应用，把 danmu 即 `appId` 换成你自己的
var config = {
  authDomain: "danmu.wilddog.com",
  syncURL: "https://danmu.wilddogio.com"
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

// 获取输入框的数据
var text = $(".s_txt").val();
// 将数据写到云端 message 节点下，child 用来定位子节点
ref.child('message').push(text);
```
数据库中的数据结构就是这个样子的：
![](/images/data.jpg)

### “清屏”
就是删除数据，定位到节点下调用 API `remove()` 即可。

```js
ref.remove();
```
### 在窗口显示
即读取数据，Wilddog [获取数据](/guide/sync/web/retrieve-data.html)是先绑定监听事件，然后在回调函数中获取数据：

```js
// 绑定 'child_added' 事件，当 message 节点下有子节点新增时，就会触发回调，回调的 `snapshot` 对象包含了新增的数据
ref.child('message').on('child_added', function(snapshot) {
	var text = snapshot.val();
});
```
如果有人“清屏”了，如何获取这个事件呢？与上面的 `'child_added'` 类似，有个 `'child_removed'` 事件：
```js
ref.on('child_removed', function(snapshot) {

});
```
用到的相关 Wilddog API 就这么多，接下来就是弹幕相关的特定实现了。


### 画出页面轮廓
只是牵涉到 web 页面的基础知识，这里不再叙述，可直接到最下方查看源码。

### 滚动及逐行显示

```js
var arr = [];						// 此数组用来存放所有的消息元素
var topMin = $('.d_mask').offset().top; 	 // 显示框距顶部距离
var topMax = topMin + $('.d_mask').height(); // 显示框底部距顶部距离
var _top = topMin; // 每个滚动消息距顶部距离

var moveObj = function(obj) {
	var _left = $('.d_mask').width() - obj.width();
	_top = _top + 50;
	if (_top > (topMax - 50)) {
		_top = topMin;
	}
	obj.css({
		left : _left,
		top : _top,
		color : getReandomColor()  // 获取随机颜色，之后讲
	});
	var time = 20000 + 10000 * Math.random();
	// animate() 方法执行 CSS 属性集的自定义动画。逐渐改变的，这样就可以创建动画效果。
	obj.animate({								
		left : "-" + _left + "px"  // 让消息距左距离逐渐减小，产生右向左滚动动画。
	}, time, function() {
		obj.remove();
	});
}
```

### 每3s随机选取一条消息播放

```js
var getAndRun = function() {
	if (arr.length > 0) {
		var n = Math.floor(Math.random() * arr.length + 1) - 1;
		var textObj = $("<div>" + arr[n] + "</div>");
		$(".d_show").append(textObj);
		moveObj(textObj);
	}

	setTimeout(getAndRun, 3000);
}
```

### 生成随机颜色

```js
var getReandomColor = function() {
	return '#' + (function(h) {
		return new Array(7 - h.length).join("0") + h
	})((Math.random() * 0x1000000 << 0).toString(16))
}
```
## 获取源码
本示例只是弹幕的一种简单实现方式，你可以开动大脑，做出更优雅的实现。
点此查看[示例源码](https://github.com/WildDogTeam/demo-js-danmu)。



