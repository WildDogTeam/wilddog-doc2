
title: QQAuthProvider
---

QQAuthProvider 是 QQ 登录方式中provider类

## 构造器
### new QQAuthProvider()

**定义**

继承自[Provider](/api/auth/web/Provider.html)

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

| 参数名 | 说明 |
|---|---|
| arg1 | string 类型，accessToken的值 |
| arg2 | string 类型，openId的值 |

**返回值**

[wilddog.Credential](/api/auth/web/Credential.html)

</br>

------

### addScope

**定义**

```js
addScope(scope)
```

**参数**

| 参数名 | 说明 |
|---|---|
| scope| string 类型，QQ OAuth 的scope值 |

