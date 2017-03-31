
title: WeixinmpAuthProvider
---

WeixinmpAuthProvider 是 微信公众账号登录方式中 provider 类

## 构造器
### new WeixinmpAuthProvider()

**定义**

继承自 [Provider](/auth/Web/api/Provider.html)

**返回值**

[wilddog.auth.Credential](/auth/Web/api/Credential.html)

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
credential(arg1, arg2)
```

**参数**

| 参数名  | 说明                       |
| ---- | ------------------------ |
| arg1 | string 类型，accessToken 的值 |
| arg2 | string 类型，openId 的值      |


</br>

------

### addScope

**定义**

```js
addScope(scope)
```

**参数**

| 参数名   | 说明                               |
| ----- | -------------------------------- |
| scope | string 类型，微信公众账号 OAuth 的 scope 值 |

