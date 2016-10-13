
title: Promise
---

Promise 对象表示一个事件（异步的）的值。Promsie 事件应当被完成（resovle）或者拒绝（reject），这个时候它会回调我们通过 then() 和 catch() 指派给它的回调函数。更多关于 Promise 编程规范的信息请 [参考这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 方法
### then

**定义**

```js
then(onResolved，[onReject])
```

**说明**

为当前 Promise 对象指定一个 resolved 之后的回调函数。

**参数**


| 参数名        | 说明                                       |
| ---------- | ---------------------------------------- |
| onResolved | function 类型，Promise resolved 时的回调函数，回传参数是 Promise 事件的返回值 |
| onReject   | function 类型，Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回值**

wilddog.Promise

</br>

----

### catch

**定义**

```js
catch(onReject)
```

**说明**

为当前 Promise 对象指定一个 rejected 或异常后的回调函数。

**参数**


| 参数名      | 说明                                       |
| -------- | ---------------------------------------- |
| onReject | function 类型，Promise rejected 时的回调函数，回传参数是一个 error 对象 |

**返回值**

[Void](/api/auth/web.html#Void)

</br>
