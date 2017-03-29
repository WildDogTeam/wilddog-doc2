
title: WeiboAuthProvider
---

WeiboAuthProvider 是新浪微博登录方式中 provider 类

## 构造器
### new WeiboAuthProvider()

**定义**

继承自 [Provider](/api/auth/web/Provider.html)

**返回值**

[wilddog.auth.Credential](/api/auth/web/Credential.html)

</br>

------

## 属性

### providerId

**定义**

```js
string
```
</br>

------

## 方法

### credential

**定义**

```js
credential(arg1,arg2)
```

**参数**

| 参数名  | 说明                       |
| ---- | ------------------------ |
| arg1 | string 类型，accessToken 的值 |
| arg2 | string 类型，uid 的值 |


</br>

------

### addScope

**定义**

```js
addScope(scope)
```

**参数**

| 参数名   | 说明                             |
| ----- | ------------------------------ |
| scope | string 类型，新浪微博 OAuth 的 scope 值 |

